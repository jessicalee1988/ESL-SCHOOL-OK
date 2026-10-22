import React from 'react';
import { Heart, CheckCircle2, Volume2, Loader2 } from 'lucide-react';
import { Phrase } from '../types';
import { useLearning } from '../context/LearningContext';
import { useSpeech } from '../context/SpeechContext';

interface PhraseCardProps {
  phrase: Phrase;
  badgeCategoryName?: string;
}

export const PhraseCard: React.FC<PhraseCardProps> = ({ phrase, badgeCategoryName }) => {
  const { isFavorite, toggleFavorite, isLearned, toggleLearned } = useLearning();
  const { playPhrase, stop, speakingId, isSpeaking, isLoading } = useSpeech();

  const favorite = isFavorite(phrase.id);
  const learned = isLearned(phrase.id);
  const isCurrentActive = speakingId === phrase.id && (isSpeaking || isLoading);
  const isCurrentLoading = speakingId === phrase.id && isLoading;

  const handlePlayAudio = () => {
    if (isCurrentActive) {
      stop();
    } else {
      playPhrase(phrase);
    }
  };

  return (
    <div 
      className={`relative flex flex-col justify-between bg-white rounded-2xl p-4 sm:p-4.5 border transition-all duration-200 ${
        learned 
          ? 'border-[#BCEBD8] bg-[#F8FDFB] shadow-xs' 
          : 'border-slate-200/80 hover:border-[#BCEBD8] hover:shadow-xs'
      }`}
    >
      <div>
        {/* Unboxed Metadata row (Zero-pill discipline) */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="font-mono text-[11px] font-bold text-slate-400">{phrase.id}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-[#245E59] text-xs">{badgeCategoryName || phrase.category}</span>
            {phrase.difficulty && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="capitalize text-[11px]">{phrase.difficulty === 'beginner' ? 'Cơ bản' : 'Nâng cao'}</span>
              </>
            )}
          </div>

          {/* Quick status text */}
          {learned && (
            <span className="inline-flex items-center gap-1 text-emerald-700 text-[11px] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Đã ghi nhớ
            </span>
          )}
        </div>

        {/* English Phrase */}
        <h3 className="text-base sm:text-lg font-bold text-[#245E59] tracking-tight leading-snug mb-0.5">
          “{phrase.english}”
        </h3>

        {/* IPA Transcription */}
        {phrase.ipa && (
          <div className="text-xs font-mono text-emerald-800/80 mb-1.5 tracking-wide">
            {phrase.ipa}
          </div>
        )}

        {/* Vietnamese Translation */}
        <p className="text-sm font-medium text-slate-700 mb-2">
          {phrase.vietnamese}
        </p>

        {/* Short Usage Context */}
        {phrase.contextNote && (
          <div className="bg-[#FFF5D6]/70 rounded-xl px-2.5 py-1 text-[11px] text-slate-600 border border-[#FFF5D6] mb-2.5 leading-snug">
            <span className="font-semibold text-[#245E59] mr-1">Ngữ cảnh:</span>
            <span>{phrase.contextNote}</span>
          </div>
        )}
      </div>

      {/* Action Footer Bar */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        {/* Simple Listen Button */}
        <button
          onClick={handlePlayAudio}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            isCurrentActive
              ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300'
              : 'text-[#245E59] bg-[#C9E9FF]/75 hover:bg-[#C9E9FF] hover:shadow-2xs'
          }`}
          title={isCurrentActive ? 'Đang phát âm... Nhấn để dừng' : 'Nghe phát âm chuẩn tiếng Anh'}
          aria-label={`Nghe phát âm câu: ${phrase.english}`}
        >
          {isCurrentLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Đang tải...</span>
            </>
          ) : isCurrentActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-bounce" />
              <span>Đang phát...</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>Nghe phát âm</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5">
          {/* Mark as Learned Toggle */}
          <button
            onClick={() => toggleLearned(phrase.id)}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              learned
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
            title={learned ? 'Bỏ đánh dấu đã học' : 'Đánh dấu đã thuộc mẫu câu này'}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${learned ? 'text-emerald-700' : 'text-slate-400'}`} />
            <span>{learned ? 'Đã học' : 'Ghi nhớ'}</span>
          </button>

          {/* Favorite Toggle */}
          <button
            onClick={() => toggleFavorite(phrase.id)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              favorite
                ? 'bg-[#FFD9E5] text-rose-600 hover:bg-[#FFCCD9]'
                : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
            }`}
            title={favorite ? 'Bỏ lưu yêu thích' : 'Lưu vào mục yêu thích'}
            aria-label={favorite ? 'Bỏ thích' : 'Yêu thích'}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
