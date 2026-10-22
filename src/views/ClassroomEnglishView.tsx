import React, { useState, useMemo } from 'react';
import { Search, Presentation, CheckCircle2, BookOpen } from 'lucide-react';
import { CLASSROOM_CATEGORIES, CLASSROOM_PHRASES } from '../data/classroomPhrases';
import { PhraseCard } from '../components/PhraseCard';
import { useLearning } from '../context/LearningContext';

export const ClassroomEnglishView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { completedIds } = useLearning();

  const filteredPhrases = useMemo(() => {
    return CLASSROOM_PHRASES.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.english.toLowerCase().includes(q) ||
        item.vietnamese.toLowerCase().includes(q) ||
        (item.contextNote?.toLowerCase().includes(q) ?? false);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const learnedCountInSection = CLASSROOM_PHRASES.filter((p) => completedIds.has(p.id)).length;
  const progressPercent = Math.round((learnedCountInSection / CLASSROOM_PHRASES.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-[#C9E9FF]/40 via-white to-[#BCEBD8]/40 rounded-3xl p-6 sm:p-8 border border-[#C9E9FF] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#245E59]">
              Mô-đun 02 · Kỹ năng sư phạm
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#245E59] tracking-tight">
              Classroom English – Tiếng Anh trong lớp học
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Tổng hợp các khẩu lệnh sư phạm tiêu chuẩn, lời hướng dẫn nhiệm vụ, kỹ năng ổn định trật tự và lời khen ngợi học sinh dễ nhớ, giàu tính động viên.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2 w-full">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Tiến độ khẩu lệnh lớp học</span>
                <span className="font-bold text-[#245E59] tabular-nums">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-[#245E59] h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between">
                <span>Đã thuộc: <strong className="text-[#245E59]">{learnedCountInSection}</strong>/{CLASSROOM_PHRASES.length} câu</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Pedagogical Tip Banner */}
      <div className="bg-[#FFF5D6]/80 rounded-2xl p-4 sm:p-5 border border-[#E6D385] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#245E59]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 text-[#1e4e79] shadow-xs">
            <Presentation className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block text-sm mb-0.5">Mẹo giảng dạy cho giáo viên tiểu học:</span>
            <span className="text-slate-700 leading-relaxed">
              Kết hợp cử chỉ tay (Body Language) cùng nét mặt vui tươi khi nói tiếng Anh. Trẻ em tiểu học tiếp thu ngôn ngữ qua ngữ điệu và hành động trực quan rất nhanh!
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm mẫu câu hướng dẫn lớp học..."
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

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CLASSROOM_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#245E59] text-white shadow-xs font-semibold'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 hover:text-[#245E59]'
                }`}
              >
                <span>{cat.labelVi}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phrase Cards */}
      {filteredPhrases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPhrases.map((phrase) => {
            const catObj = CLASSROOM_CATEGORIES.find((c) => c.id === phrase.category);
            return (
              <PhraseCard
                key={phrase.id}
                phrase={phrase}
                badgeCategoryName={catObj ? catObj.labelVi : phrase.category}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">
            Không tìm thấy khẩu lệnh lớp học phù hợp
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Vui lòng thử từ khóa khác hoặc chọn "Tất cả hoạt động".
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-medium bg-[#BCEBD8] text-[#245E59] rounded-xl hover:bg-[#a5e2cb] transition-colors"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};
