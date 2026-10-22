import React, { useState, useMemo } from 'react';
import { 
  ChartNoAxesColumn, 
  Heart, 
  CheckCircle2, 
  Trash2, 
  BookOpen, 
  ShieldAlert, 
  Info, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { EVERYDAY_PHRASES } from '../data/everydayPhrases';
import { CLASSROOM_PHRASES } from '../data/classroomPhrases';
import { SUBJECTS_DATA } from '../data/subjectPhrases';
import { PhraseCard } from '../components/PhraseCard';
import { Phrase, NavigationTab } from '../types';

interface ProgressViewProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onNavigateTab }) => {
  const { completedIds, favoriteIds, clearAllProgress } = useLearning();
  const [activeListTab, setActiveListTab] = useState<'learned' | 'favorites'>('learned');
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  // Consolidate all phrases across the app into one master map
  const allPhrases = useMemo<Phrase[]>(() => {
    const list: Phrase[] = [...EVERYDAY_PHRASES, ...CLASSROOM_PHRASES];
    SUBJECTS_DATA.forEach((s) => {
      list.push(...s.phrases);
    });
    return list;
  }, []);

  // Filtered lists (strictly matching the 160 learning phrases)
  const learnedPhrasesList = useMemo(() => {
    return allPhrases.filter((p) => completedIds.has(p.id));
  }, [allPhrases, completedIds]);

  const favoritePhrasesList = useMemo(() => {
    return allPhrases.filter((p) => favoriteIds.has(p.id));
  }, [allPhrases, favoriteIds]);

  const totalPhrasesCount = allPhrases.length;
  const learnedCount = learnedPhrasesList.length;
  const favoriteCount = favoritePhrasesList.length;
  const overallPercentage = totalPhrasesCount > 0 ? Math.round((learnedCount / totalPhrasesCount) * 100) : 0;

  // Breakdown statistics
  const everydayLearned = EVERYDAY_PHRASES.filter((p) => completedIds.has(p.id)).length;
  const classroomLearned = CLASSROOM_PHRASES.filter((p) => completedIds.has(p.id)).length;
  const subjectsLearned = SUBJECTS_DATA.reduce((acc, s) => {
    return acc + s.phrases.filter((p) => completedIds.has(p.id)).length;
  }, 0);
  const totalSubjectPhrases = SUBJECTS_DATA.reduce((acc, s) => acc + s.phrases.length, 0);

  const activeDisplayList = activeListTab === 'learned' ? learnedPhrasesList : favoritePhrasesList;

  const handleConfirmClear = () => {
    clearAllProgress();
    setConfirmClearOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-linear-to-r from-[#BCEBD8]/40 via-white to-[#C9E9FF]/40 rounded-3xl p-6 sm:p-8 border border-[#BCEBD8] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#245E59]">
              Quản lý học tập cục bộ
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#245E59] tracking-tight">
              My Learning Progress – Tiến độ học tập
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Theo dõi chính xác số lượng mẫu câu thầy/cô đã đánh dấu ghi nhớ và các câu được lưu vào mục yêu thích.
            </p>
          </div>

          {/* Reset progress action */}
          <div className="shrink-0">
            <button
              onClick={() => setConfirmClearOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Đặt lại tiến độ trên máy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Device Local Storage Notice */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-xs text-amber-900 shadow-2xs">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-sm block">Lưu ý về lưu trữ dữ liệu cá nhân:</span>
          <p className="leading-relaxed text-amber-800">
            Tiến độ học tập và danh sách câu yêu thích được lưu trực tiếp trên trình duyệt của thiết bị hiện tại (Local Storage) và không đồng bộ qua các máy khác. Khi đổi máy tính hoặc xóa dữ liệu duyệt web, tiến độ sẽ được đặt lại từ đầu.
          </p>
        </div>
      </div>

      {/* Real Statistics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* KPI 1: Total Learned */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Mẫu câu đã ghi nhớ</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#245E59] tabular-nums">
              {learnedCount}
            </span>
            <span className="text-xs text-slate-400">/ {totalPhrasesCount} câu</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500 text-right tabular-nums">
            Hoàn thành {overallPercentage}% tổng ngân hàng
          </div>
        </div>

        {/* KPI 2: Favorites Count */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Mục yêu thích đã lưu</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#245E59] tabular-nums">
              {favoriteCount}
            </span>
            <span className="text-xs text-slate-400">câu tâm đắc</span>
          </div>
          <p className="text-[11px] text-slate-500 pt-3">
            Những câu thường dùng bạn muốn tra cứu nhanh khi lên lớp.
          </p>
        </div>

        {/* KPI 3: Breakdown by Areas */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2.5">
          <div className="text-xs font-bold text-[#245E59] uppercase tracking-wider">
            Phân bổ theo khu vực
          </div>
          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span>Giao tiếp hằng ngày:</span>
              <span className="font-semibold text-slate-800 tabular-nums">{everydayLearned}/{EVERYDAY_PHRASES.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tiếng Anh lớp học:</span>
              <span className="font-semibold text-slate-800 tabular-nums">{classroomLearned}/{CLASSROOM_PHRASES.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>8 Môn học tích hợp:</span>
              <span className="font-semibold text-slate-800 tabular-nums">{subjectsLearned}/{totalSubjectPhrases}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Interactive List: Learned vs Favorites */}
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          {/* Segmented Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveListTab('learned')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeListTab === 'learned'
                  ? 'bg-[#245E59] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>Mẫu câu đã ghi nhớ ({learnedCount})</span>
            </button>

            <button
              onClick={() => setActiveListTab('favorites')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeListTab === 'favorites'
                  ? 'bg-[#245E59] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>Mục yêu thích ({favoriteCount})</span>
            </button>
          </div>

          <span className="text-xs text-slate-500 hidden sm:inline">
            Nhấn vào thẻ để cập nhật trạng thái
          </span>
        </div>

        {/* List of Phrases */}
        {activeDisplayList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeDisplayList.map((phrase) => (
              <PhraseCard
                key={phrase.id}
                phrase={phrase}
                badgeCategoryName={phrase.subjectId ? `Môn ${phrase.subjectId.toUpperCase()}` : phrase.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">
              {activeListTab === 'learned'
                ? 'Bạn chưa đánh dấu mẫu câu nào là đã học'
                : 'Bạn chưa lưu mẫu câu nào vào mục yêu thích'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {activeListTab === 'learned'
                ? 'Trong quá trình đọc các bài học, hãy nhấn vào nút "Đánh dấu học" trên mỗi thẻ câu để theo dõi tiến độ của bạn tại đây.'
                : 'Nhấn vào biểu tượng trái tim trên mỗi thẻ câu để lưu lại những câu bạn tâm đắc nhất.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('everyday')}
                className="px-4 py-2 text-xs font-semibold bg-[#BCEBD8] text-[#245E59] rounded-xl hover:bg-[#a5e2cb] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Khám phá Giao tiếp hằng ngày</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Clearing Progress */}
      {confirmClearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Xác nhận đặt lại tiến độ?
                </h3>
                <p className="text-xs text-slate-500">
                  Thao tác này sẽ xóa toàn bộ danh sách câu đã học và yêu thích trên máy này.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmClearOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmClear}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
