import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  FlaskConical, 
  Landmark, 
  Globe2, 
  Music2, 
  Palette, 
  Dumbbell, 
  Monitor, 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  BookOpen
} from 'lucide-react';
import { SUBJECTS_DATA } from '../data/subjectPhrases';
import { SubjectItem } from '../types';
import { PhraseCard } from '../components/PhraseCard';
import { useLearning } from '../context/LearningContext';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Calculator,
  FlaskConical,
  Landmark,
  Globe2,
  Globe: Globe2,
  Music2,
  Music: Music2,
  Palette,
  Dumbbell,
  Activity: Dumbbell,
  Monitor,
};

interface SubjectBankViewProps {
  initialSubjectId?: string | null;
  onClearInitialSubject?: () => void;
}

export const SubjectBankView: React.FC<SubjectBankViewProps> = ({ 
  initialSubjectId,
  onClearInitialSubject 
}) => {
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(initialSubjectId || null);
  const [situationFilter, setSituationFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { completedIds } = useLearning();

  React.useEffect(() => {
    if (initialSubjectId) {
      setActiveSubjectId(initialSubjectId);
    }
  }, [initialSubjectId]);

  const activeSubject = useMemo(() => {
    return SUBJECTS_DATA.find((s) => s.id === activeSubjectId) || null;
  }, [activeSubjectId]);

  // Filtered phrases in active subject
  const filteredPhrases = useMemo(() => {
    if (!activeSubject) return [];
    return activeSubject.phrases.filter((phrase) => {
      const matchSituation = situationFilter === 'all' || phrase.category === situationFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        phrase.english.toLowerCase().includes(q) ||
        phrase.vietnamese.toLowerCase().includes(q) ||
        (phrase.contextNote?.toLowerCase().includes(q) ?? false);
      return matchSituation && matchSearch;
    });
  }, [activeSubject, situationFilter, searchQuery]);

  const handleSelectSubject = (id: string) => {
    setActiveSubjectId(id);
    setSituationFilter('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSubjectList = () => {
    setActiveSubjectId(null);
    setSituationFilter('all');
    setSearchQuery('');
    if (onClearInitialSubject) onClearInitialSubject();
  };

  // If a subject is selected, render the dedicated Subject Page
  if (activeSubject) {
    const IconComponent = ICON_MAP[activeSubject.iconName] || BookOpen;
    const learnedInSubject = activeSubject.phrases.filter((p) => completedIds.has(p.id)).length;
    const progressPercent = Math.round((learnedInSubject / activeSubject.phrases.length) * 100);

    return (
      <div className="space-y-8 animate-in fade-in">
        {/* Back navigation button */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToSubjectList}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#245E59] bg-white border border-slate-200/90 rounded-xl hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại tất cả bộ môn</span>
          </button>

          <span className="text-xs text-slate-500 font-medium">
            Bộ môn {SUBJECTS_DATA.findIndex((s) => s.id === activeSubject.id) + 1} / {SUBJECTS_DATA.length}
          </span>
        </div>

        {/* Dedicated Subject Banner */}
        <div 
          className="rounded-3xl p-6 sm:p-8 border shadow-xs transition-colors"
          style={{ 
            backgroundColor: `${activeSubject.accentColor}40`,
            borderColor: activeSubject.borderColor 
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center shrink-0 border"
                style={{ borderColor: activeSubject.borderColor }}
              >
                <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-[#245E59]" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#245E59]/80">
                  Ngân hàng thuật ngữ & tình huống
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#245E59] tracking-tight">
                  {activeSubject.nameEn} – {activeSubject.nameVi}
                </h1>
                <p className="text-xs sm:text-sm text-slate-700 max-w-xl">
                  {activeSubject.descriptionVi}
                </p>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-slate-200/80 shadow-xs min-w-52 space-y-2 shrink-0">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Tiến độ môn học</span>
                <span className="font-bold text-[#245E59] tabular-nums">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-[#245E59] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between">
                <span>Đã ghi nhớ: <strong>{learnedInSubject}</strong>/{activeSubject.phrases.length} câu</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar for this Subject */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Tìm câu hỏi hoặc khẩu lệnh môn ${activeSubject.nameVi}...`}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#245E59] focus:ring-1 focus:ring-[#245E59] transition-all placeholder:text-slate-400 text-slate-800"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1"
                >
                  Xóa
                </button>
              )}
            </div>

            <span className="text-xs text-slate-500 self-end sm:self-center">
              Hiển thị <strong className="text-[#245E59]">{filteredPhrases.length}</strong> câu
            </span>
          </div>

          {/* Situational Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSituationFilter('all')}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                situationFilter === 'all'
                  ? 'bg-[#245E59] text-white shadow-xs font-semibold'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 hover:text-[#245E59]'
              }`}
            >
              Tất cả tình huống ({activeSubject.phrases.length})
            </button>
            {activeSubject.situations.map((sit) => {
              const isSelected = situationFilter === sit;
              const countInSit = activeSubject.phrases.filter((p) => p.category === sit).length;
              return (
                <button
                  key={sit}
                  onClick={() => setSituationFilter(sit)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#245E59] text-white shadow-xs font-semibold'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 hover:text-[#245E59]'
                  }`}
                >
                  <span>{sit}</span>
                  {countInSit > 0 && (
                    <span className="ml-1.5 opacity-75 tabular-nums">({countInSit})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Phrases List */}
        {filteredPhrases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPhrases.map((phrase) => (
              <PhraseCard
                key={phrase.id}
                phrase={phrase}
                badgeCategoryName={phrase.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">
              Không tìm thấy mẫu câu trong môn học này
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc tình huống.
            </p>
            <button
              onClick={() => {
                setSituationFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium bg-[#BCEBD8] text-[#245E59] rounded-xl hover:bg-[#a5e2cb] transition-colors"
            >
              Xem tất cả mẫu câu môn {activeSubject.nameVi}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Otherwise, render the Grid of 8 Illustrated Subject Cards
  return (
    <div className="space-y-8">
      {/* Subject Bank Overview Banner */}
      <div className="bg-linear-to-r from-[#FFF5D6]/70 via-white to-[#C9E9FF]/40 rounded-3xl p-6 sm:p-8 border border-[#E6D385] shadow-xs">
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#245E59]">
            Mô-đun 03 · Giảng dạy tích hợp
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#245E59] tracking-tight">
            Subject English Bank – Ngân hàng tiếng Anh bộ môn
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Hỗ trợ giáo viên đưa tiếng Anh vào từng tiết học chuyên môn một cách tự nhiên và sinh động. Chọn một trong 8 bộ môn bên dưới để mở kho mẫu câu chuyên biệt:
          </p>
        </div>
      </div>

      {/* Grid of 8 Subjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUBJECTS_DATA.map((subject) => {
          const IconComponent = ICON_MAP[subject.iconName] || BookOpen;
          const learnedCount = subject.phrases.filter((p) => completedIds.has(p.id)).length;
          const isFinished = learnedCount === subject.phrases.length && subject.phrases.length > 0;

          return (
            <div
              key={subject.id}
              onClick={() => handleSelectSubject(subject.id)}
              className="group flex flex-col justify-between p-6 rounded-3xl border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-1 bg-white hover:border-[#245E59]/40"
              style={{
                borderTopColor: subject.borderColor,
                borderTopWidth: '4px',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#245E59] group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: `${subject.accentColor}80` }}
                  >
                    <IconComponent className="w-6 h-6 text-[#245E59]" />
                  </div>

                  <span className="text-[11px] font-medium text-slate-500 tabular-nums">
                    {learnedCount}/{subject.phrases.length} đã học
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#245E59] tracking-tight group-hover:text-[#1a4642] mb-0.5">
                  {subject.nameVi}
                </h3>
                <div className="text-xs font-semibold text-slate-500 mb-2.5">
                  {subject.nameEn}
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {subject.descriptionVi}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#245E59]">
                <span>Vào học bộ môn</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
