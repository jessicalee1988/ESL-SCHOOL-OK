import React, { useState, useEffect, useCallback, useId } from 'react';
import { 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  ListFilter, 
  X, 
  Search,
  Check
} from 'lucide-react';
import { Phrase } from '../types';
import { useSpeech } from '../context/SpeechContext';

interface FocusLearningCardProps {
  phrases: Phrase[];
  categoryTitle?: string;
  initialIndex?: number;
}

export const FocusLearningCard: React.FC<FocusLearningCardProps> = ({
  phrases,
  categoryTitle,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isJumpModalOpen, setIsJumpModalOpen] = useState<boolean>(false);
  const [jumpSearchQuery, setJumpSearchQuery] = useState<string>('');

  const {
    playPhrase,
    stop,
    speakingId,
    isSpeaking,
    isLoading,
    playbackSpeed,
    togglePlaybackSpeed,
  } = useSpeech();

  // Keep index within bounds whenever phrases list updates (e.g. filter changes)
  useEffect(() => {
    setCurrentIndex(0);
    stop();
  }, [phrases, stop]);

  const total = phrases.length;
  const currentPhrase: Phrase | undefined = phrases[currentIndex];

  const isCurrentActive = currentPhrase && speakingId === currentPhrase.id && (isSpeaking || isLoading);
  const isCurrentLoading = currentPhrase && speakingId === currentPhrase.id && isLoading;

  const handlePlayAudio = () => {
    if (!currentPhrase) return;
    if (isCurrentActive) {
      stop();
    } else {
      playPhrase(currentPhrase);
    }
  };

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      stop();
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex, stop]);

  const handleNext = useCallback(() => {
    if (currentIndex < total - 1) {
      stop();
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, total, stop]);

  const handleJumpTo = (index: number) => {
    if (index >= 0 && index < total) {
      stop();
      setCurrentIndex(index);
      setIsJumpModalOpen(false);
      setJumpSearchQuery('');
    }
  };

  // Keyboard navigation for desktop teachers: Left/Right arrows for prev/next, Space for audio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (currentPhrase) {
          if (isCurrentActive) {
            stop();
          } else {
            playPhrase(currentPhrase);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, currentPhrase, isCurrentActive, playPhrase, stop]);

  if (!currentPhrase || total === 0) {
    return null;
  }

  // Display number: e.g. 04 / 40
  const formattedCurrent = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  // Filtered phrases for quick jump modal
  const jumpFilteredPhrases = phrases.map((p, idx) => ({ phrase: p, index: idx })).filter(({ phrase }) => {
    const q = jumpSearchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      phrase.english.toLowerCase().includes(q) ||
      phrase.vietnamese.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full max-w-[850px] mx-auto space-y-4">
      {/* Centred Focus Learning Card */}
      <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12 transition-all">
        {/* Top Header Row: Category Badge & Expression Counter & Quick Jump */}
        <div className="flex items-center justify-between gap-3 pb-6 border-b border-slate-100">
          {/* Category / Topic Name */}
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-[#FFF5D6] border border-[#F4C542]/40 text-[#123A78] text-xs sm:text-sm font-bold tracking-tight">
              {categoryTitle || currentPhrase.category}
            </span>
          </div>

          {/* Right: Expression Position & Jump Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsJumpModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#123A78] hover:text-[#1764C0] hover:bg-blue-50/60 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-blue-100"
              title="Mở danh sách để chọn câu nhanh"
              aria-label="Chọn câu nhanh"
            >
              <ListFilter className="w-4 h-4 text-[#1764C0]" />
              <span className="hidden sm:inline">Chọn câu</span>
            </button>

            {/* Position Display: 04 / 40 */}
            <div className="px-3.5 py-1.5 rounded-xl bg-[#F5F8FD] border border-blue-100/60 font-mono text-xs sm:text-sm font-extrabold text-[#123A78] tabular-nums">
              <span>{formattedCurrent}</span>
              <span className="text-slate-400 mx-1">/</span>
              <span className="text-slate-500">{formattedTotal}</span>
            </div>
          </div>
        </div>

        {/* Center Expression Content: English, IPA, Vietnamese */}
        <div className="py-8 sm:py-12 lg:py-14 text-center space-y-4 sm:space-y-6">
          {/* 1. English Sentence: Desktop 36-40px, Mobile 28-32px, Bold, Navy Blue #123A78, Centred */}
          <h2 className="text-[28px] sm:text-[34px] md:text-[38px] lg:text-[40px] font-black text-[#123A78] tracking-tight leading-tight sm:leading-snug break-words">
            “{currentPhrase.english}”
          </h2>

          {/* 2. IPA Pronunciation: Desktop 22px, Mobile 18-20px, Royal Blue #1764C0, Centred */}
          {currentPhrase.ipa && (
            <div className="text-[18px] sm:text-[20px] lg:text-[22px] font-mono text-[#1764C0] font-semibold tracking-wide">
              {currentPhrase.ipa}
            </div>
          )}

          {/* 3. Vietnamese Translation: Desktop 24px, Mobile 20-22px, Dark Readable #172B4D, Centred */}
          <p className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold text-[#172B4D] leading-relaxed max-w-2xl mx-auto pt-2 sm:pt-4">
            {currentPhrase.vietnamese}
          </p>
        </div>

        {/* Primary Audio Playback Section */}
        <div className="pt-2 pb-6 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {/* Prominent Large Audio Playback Button: Golden Yellow #F4C542 with Navy Blue #123A78 text & 44-48px icon */}
          <button
            onClick={handlePlayAudio}
            className={`w-full sm:w-auto min-w-[260px] sm:min-w-[300px] min-h-[64px] py-4 px-8 rounded-2xl font-black text-base sm:text-lg tracking-wide uppercase transition-all duration-200 cursor-pointer shadow-md inline-flex items-center justify-center gap-3.5 ${
              isCurrentActive
                ? 'bg-[#123A78] text-[#F4C542] ring-4 ring-[#F4C542]/40 shadow-xl scale-[1.01]'
                : 'bg-[#F4C542] hover:bg-[#eab92b] text-[#123A78] hover:shadow-lg active:scale-[0.98]'
            }`}
            title={isCurrentActive ? 'Đang phát âm... Nhấn để dừng' : 'Nghe phát âm chuẩn (WAV)'}
            aria-label={`Nghe phát âm: ${currentPhrase.english}`}
          >
            {isCurrentLoading ? (
              <>
                <Loader2 className="w-11 h-11 animate-spin text-[#123A78]" />
                <span className="font-extrabold">ĐANG TẢI...</span>
              </>
            ) : isCurrentActive ? (
              <>
                <Volume2 className="w-11 h-11 animate-pulse text-[#F4C542]" />
                <span className="font-extrabold text-[#F4C542]">ĐANG PHÁT...</span>
              </>
            ) : (
              <>
                <Volume2 className="w-11 h-11 text-[#123A78] shrink-0" />
                <span className="font-black">NGHE PHÁT ÂM</span>
              </>
            )}
          </button>

          {/* Compact Playback Speed Selector: 0.75x and 1x */}
          <div className="inline-flex items-center bg-[#F5F8FD] p-1.5 rounded-2xl border border-blue-100 shrink-0 h-[64px]">
            <button
              onClick={() => togglePlaybackSpeed()}
              className={`px-3.5 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer ${
                playbackSpeed === 1
                  ? 'bg-white text-[#123A78] shadow-xs border border-blue-100'
                  : 'text-slate-500 hover:text-[#123A78]'
              }`}
              title="Tốc độ bình thường (1x)"
            >
              1.0x
            </button>
            <button
              onClick={() => togglePlaybackSpeed()}
              className={`px-3.5 py-2.5 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer ${
                playbackSpeed === 0.75
                  ? 'bg-[#FFF5D6] text-[#123A78] border border-[#F4C542]/60 shadow-xs'
                  : 'text-slate-500 hover:text-[#123A78]'
              }`}
              title="Tốc độ chậm luyện phát âm (0.75x)"
            >
              0.75x
            </button>
          </div>
        </div>

        {/* Expression Navigation Footer: "Câu trước" & "Câu tiếp" */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-white hover:bg-[#F5F8FD] text-[#123A78] hover:text-[#1764C0] border border-slate-200/90 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer'
            }`}
            aria-label="Chuyển đến câu trước"
          >
            <ChevronLeft className="w-5 h-5 text-[#123A78]" />
            <span>Câu trước</span>
          </button>

          {/* Center Subtle Keyboard Hint */}
          <div className="text-xs font-semibold text-slate-400 hidden sm:flex items-center gap-1.5 select-none">
            <span>Dùng phím</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">→</kbd>
            <span>để chuyển câu</span>
          </div>

          {/* Next Button: Navy Blue #123A78 with subtle gold chevron */}
          <button
            onClick={handleNext}
            disabled={currentIndex === total - 1}
            className={`inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              currentIndex === total - 1
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-[#123A78] hover:bg-[#1764C0] text-white shadow-sm hover:shadow-md active:scale-95 cursor-pointer'
            }`}
            aria-label="Chuyển đến câu tiếp theo"
          >
            <span>Câu tiếp</span>
            <ChevronRight className="w-5 h-5 text-[#F4C542]" />
          </button>
        </div>
      </div>

      {/* Optional Compact Quick-Jump Modal */}
      {isJumpModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl border border-blue-100 overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#F5F8FD]">
              <div>
                <h3 className="text-base font-black text-[#123A78]">Danh sách mẫu câu</h3>
                <p className="text-xs text-slate-500">
                  Chọn câu để chuyển nhanh ({phrases.length} mẫu câu)
                </p>
              </div>
              <button
                onClick={() => {
                  setIsJumpModalOpen(false);
                  setJumpSearchQuery('');
                }}
                className="p-1.5 text-slate-400 hover:text-[#123A78] hover:bg-white rounded-xl transition-colors cursor-pointer"
                aria-label="Đóng danh sách"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Search */}
            <div className="p-4 border-b border-slate-100 bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={jumpSearchQuery}
                  onChange={(e) => setJumpSearchQuery(e.target.value)}
                  placeholder="Lọc nhanh câu tiếng Anh hoặc tiếng Việt..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#F5F8FD] border border-blue-100 rounded-xl focus:outline-hidden focus:border-[#1764C0] text-[#172B4D] placeholder:text-slate-400"
                  autoFocus
                />
              </div>
            </div>

            {/* Phrase List */}
            <div className="overflow-y-auto p-2 divide-y divide-slate-100 flex-1">
              {jumpFilteredPhrases.length > 0 ? (
                jumpFilteredPhrases.map(({ phrase, index }) => {
                  const isCurrent = index === currentIndex;
                  const itemNumber = String(index + 1).padStart(2, '0');
                  return (
                    <button
                      key={phrase.id}
                      onClick={() => handleJumpTo(index)}
                      className={`w-full text-left p-3 rounded-xl transition-colors flex items-start gap-3 cursor-pointer ${
                        isCurrent
                          ? 'bg-[#FFF5D6] text-[#123A78]'
                          : 'hover:bg-[#F5F8FD] text-slate-700'
                      }`}
                    >
                      <span className={`font-mono text-xs font-bold shrink-0 mt-0.5 ${isCurrent ? 'text-[#123A78]' : 'text-slate-400'}`}>
                        {itemNumber}
                      </span>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className={`text-xs sm:text-sm font-bold truncate ${isCurrent ? 'text-[#123A78]' : 'text-slate-800'}`}>
                          {phrase.english}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {phrase.vietnamese}
                        </div>
                      </div>
                      {isCurrent && (
                        <Check className="w-4 h-4 text-[#123A78] shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  Không tìm thấy mẫu câu phù hợp
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
