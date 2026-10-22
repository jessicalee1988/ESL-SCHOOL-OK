import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { APPROVED_PRERECORDED_AUDIO_MAP, PRERECORDED_WAV_IDS } from '../data/approvedAudioMap';

export { APPROVED_PRERECORDED_AUDIO_MAP, PRERECORDED_WAV_IDS };

export interface SpeechContextType {
  isSupported: boolean;
  isSpeaking: boolean;
  isLoading: boolean;
  speakingId: string | null;
  audioSource: 'prerecorded' | 'tts' | null;
  playPhrase: (phrase: { id: string; english: string }) => void;
  speak: (text: string, phraseId?: string) => void;
  stop: () => void;
  hasPrerecordedAudio: (phraseId: string) => boolean;
  englishVoiceAvailable: boolean;
  errorMessage: string | null;
  clearError: () => void;
  rate: number;
}

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

// Natural American English female voice selector
function pickBestAmericanFemaleVoice(allVoices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!allVoices || allVoices.length === 0) return null;

  // Filter strictly English voices, strictly exclude any Vietnamese voices
  const enVoices = allVoices.filter((v) => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    const name = (v.name || '').toLowerCase();
    if (lang.startsWith('vi') || name.includes('vietnam')) return false;
    return lang.startsWith('en');
  });

  if (enVoices.length === 0) return null;

  // Prefer high quality American English female voices (desktop & mobile)
  const preferredFemaleUS = [
    'microsoft jenny online (natural)',
    'microsoft jenny',
    'jenny',
    'microsoft aria online (natural)',
    'microsoft aria',
    'aria',
    'samantha', // macOS / iOS default US female
    'karen',    // iOS / macOS
    'victoria',
    'zira',     // Windows US female
    'google us english', // Chrome Android / desktop US female
    'female'
  ];

  // 1. Preferred en-US female voice names
  for (const nameKeyword of preferredFemaleUS) {
    const match = enVoices.find((v) => {
      const name = v.name.toLowerCase();
      const lang = v.lang.toLowerCase().replace('_', '-');
      return name.includes(nameKeyword) && (lang.startsWith('en-us') || lang === 'en');
    });
    if (match) return match;
  }

  // 2. Any en-US voice with 'female' in name
  const femaleUS = enVoices.find((v) => {
    const name = v.name.toLowerCase();
    const lang = v.lang.toLowerCase().replace('_', '-');
    return lang.startsWith('en-us') && name.includes('female');
  });
  if (femaleUS) return femaleUS;

  // 3. Any en-US voice with 'natural' or 'online'
  const naturalUS = enVoices.find((v) => {
    const name = v.name.toLowerCase();
    const lang = v.lang.toLowerCase().replace('_', '-');
    return lang.startsWith('en-us') && (name.includes('natural') || name.includes('online'));
  });
  if (naturalUS) return naturalUS;

  // 4. Any en-US voice
  const anyUS = enVoices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith('en-us'));
  if (anyUS) return anyUS;

  // 5. Any English voice with natural / female in name
  const naturalAny = enVoices.find((v) => {
    const name = v.name.toLowerCase();
    return name.includes('natural') || name.includes('female');
  });
  if (naturalAny) return naturalAny;

  // 6. First available English voice
  return enVoices[0];
}

export const SpeechProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isSpeechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [audioSource, setAudioSource] = useState<'prerecorded' | 'tts' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Prompt requirement: speaking rate = 0.9
  const rate = 0.9;

  // References to keep single authorative audio and utterance instances
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Asynchronously load SpeechSynthesis voices
  useEffect(() => {
    if (!isSpeechSupported) return;

    const loadVoices = () => {
      try {
        const voiceList = window.speechSynthesis.getVoices();
        if (voiceList && voiceList.length > 0) {
          setVoices(voiceList);
          const best = pickBestAmericanFemaleVoice(voiceList);
          setSelectedVoice(best);
        }
      } catch (err) {
        console.warn('Error loading speech voices:', err);
      }
    };

    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      // Clean up on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {
          console.warn('Error cancelling speech on unmount:', e);
        }
      }
    };
  }, [isSpeechSupported]);

  // Clean stop for all audio channels (prerecorded WAV + SpeechSynthesis)
  const stop = useCallback(() => {
    // 1. Stop WAV audio
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.removeAttribute('src');
        audioRef.current.onplay = null;
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current = null;
      } catch (e) {
        console.warn('Error stopping audio element:', e);
      }
    }

    // 2. Cancel active Web Speech synthesis
    if (isSpeechSupported && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.warn('Error cancelling speech synthesis:', e);
      }
    }

    setIsSpeaking(false);
    setIsLoading(false);
    setSpeakingId(null);
    setAudioSource(null);
  }, [isSpeechSupported]);

  // Browser Text-to-Speech fallback / 101 remaining phrases
  const speakTTS = useCallback((text: string, phraseId?: string) => {
    if (!isSpeechSupported) {
      setIsLoading(false);
      setIsSpeaking(false);
      setSpeakingId(null);
      setAudioSource(null);
      setErrorMessage(
        'Trình duyệt hiện tại chưa hỗ trợ Web Speech API. Vui lòng mở trang trên Google Chrome hoặc Microsoft Edge để nghe phát âm.'
      );
      return;
    }

    // Determine best voice
    let currentVoice = selectedVoice;
    if (!currentVoice) {
      const currentVoices = window.speechSynthesis.getVoices();
      currentVoice = pickBestAmericanFemaleVoice(currentVoices);
      if (currentVoice) {
        setSelectedVoice(currentVoice);
      }
    }

    // If still no English voice found
    const allEn = window.speechSynthesis
      .getVoices()
      .filter((v) => {
        const lang = (v.lang || '').toLowerCase();
        return lang.startsWith('en') && !lang.startsWith('vi');
      });

    if (!currentVoice && allEn.length === 0) {
      setIsLoading(false);
      setIsSpeaking(false);
      setSpeakingId(null);
      setAudioSource(null);
      setErrorMessage(
        'Thiết bị chưa có sẵn giọng đọc tiếng Anh (en-US). Vui lòng kiểm tra kết nối mạng hoặc bật Text-to-Speech trong cài đặt hệ thống.'
      );
      return;
    }

    const voiceToUse = currentVoice || allEn[0];

    // Strip quotation marks and clean text so TTS speaks only the exact sentence
    const cleanText = text.replace(/^["'“”‘’]+|["'“”‘’]+$/g, '').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.voice = voiceToUse;
    utterance.lang = voiceToUse ? voiceToUse.lang : 'en-US';
    utterance.rate = rate; // Fixed 0.9 as specified
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsLoading(false);
      setIsSpeaking(true);
      if (phraseId) {
        setSpeakingId(phraseId);
      }
      setAudioSource('tts');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsLoading(false);
      setSpeakingId(null);
      setAudioSource(null);
    };

    utterance.onerror = (event) => {
      // Ignore user-initiated cancellation or interrupts
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        console.warn('SpeechSynthesis error:', event);
        setErrorMessage('Không thể phát âm thanh. Vui lòng nhấn thử lại.');
      }
      setIsSpeaking(false);
      setIsLoading(false);
      setSpeakingId(null);
      setAudioSource(null);
    };

    activeUtteranceRef.current = utterance;

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Failed to trigger utterance:', err);
      setIsSpeaking(false);
      setIsLoading(false);
      setSpeakingId(null);
      setAudioSource(null);
      setErrorMessage('Lỗi khi kích hoạt giọng đọc. Vui lòng thử lại.');
    }
  }, [isSpeechSupported, selectedVoice, rate]);

  // Main hybrid play function
  const playPhrase = useCallback((phrase: { id: string; english: string }) => {
    const { id, english } = phrase;

    // If currently playing or loading this exact phrase, toggle to stop
    if (speakingId === id && (isSpeaking || isLoading)) {
      stop();
      return;
    }

    // 1. Stop any currently playing WAV audio
    // 2. Cancel any active speech synthesis
    stop();

    // 3. Check whether this phrase is in the 59 approved prerecorded WAV files
    const isPrerecorded = PRERECORDED_WAV_IDS.has(id);

    if (isPrerecorded) {
      // Safety check: Do not use prerecorded WAV files if displayed English text does not match approved text
      const approvedText = APPROVED_PRERECORDED_AUDIO_MAP[id];
      const normalize = (t: string) => (t || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const isVerified = approvedText && normalize(english) === normalize(approvedText);

      if (!isVerified) {
        console.warn(
          `Audio mapping warning: Phrase ${id} text "${english}" does not match approved prerecorded text "${approvedText}". Playing browser TTS to ensure accurate pronunciation.`
        );
        setErrorMessage(
          `Cảnh báo phát âm: Nội dung mẫu câu "${english}" không trùng khớp với tệp thu âm sẵn của mã ${id}. Hệ thống chuyển sang phát âm chuẩn tiếng Anh của trình duyệt để đảm bảo độ chính xác.`
        );
        setSpeakingId(id);
        setIsLoading(true);
        speakTTS(english, id);
        return;
      }

      // 4. Play WAV file with graceful fallback to TTS on error
      setSpeakingId(id);
      setIsLoading(true);
      setAudioSource('prerecorded');

      const audio = new Audio(`/audio/${id}.wav`);
      audioRef.current = audio;

      audio.onplay = () => {
        setIsLoading(false);
        setIsSpeaking(true);
      };

      audio.onended = () => {
        setIsSpeaking(false);
        setIsLoading(false);
        setSpeakingId(null);
        setAudioSource(null);
      };

      audio.onerror = (e) => {
        console.warn(`WAV file /audio/${id}.wav failed to load or play. Falling back to browser TTS.`, e);
        // Fallback to browser TTS immediately
        speakTTS(english, id);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn(`Audio play() rejected for ${id}:`, err);
          // If browser blocked audio or format error, fallback to TTS
          speakTTS(english, id);
        });
      }
    } else {
      // 5. For the 101 phrases without prerecorded WAV, immediately use browser TTS
      // (Do NOT repeatedly request missing WAV files for phrases that are known to have no prerecorded audio)
      setSpeakingId(id);
      setIsLoading(true);
      speakTTS(english, id);
    }
  }, [speakingId, isSpeaking, isLoading, stop, speakTTS]);

  // Legacy speak helper (for backward compatibility)
  const speak = useCallback((text: string, phraseId?: string) => {
    if (phraseId) {
      playPhrase({ id: phraseId, english: text });
    } else {
      stop();
      speakTTS(text);
    }
  }, [playPhrase, stop, speakTTS]);

  const hasPrerecordedAudio = useCallback((phraseId: string) => {
    return PRERECORDED_WAV_IDS.has(phraseId);
  }, []);

  const clearError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const englishVoiceAvailable =
    !!selectedVoice ||
    voices.some((v) => {
      const lang = (v.lang || '').toLowerCase();
      return lang.startsWith('en') && !lang.startsWith('vi');
    });

  return (
    <SpeechContext.Provider
      value={{
        isSupported: isSpeechSupported,
        isSpeaking,
        isLoading,
        speakingId,
        audioSource,
        playPhrase,
        speak,
        stop,
        hasPrerecordedAudio,
        englishVoiceAvailable,
        errorMessage,
        clearError,
        rate,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export function useSpeech() {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
}
