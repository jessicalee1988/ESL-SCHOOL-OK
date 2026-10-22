import React, { useState, useMemo } from 'react';
import { Search, MessagesSquare, Filter, BookOpen, CheckCircle2 } from 'lucide-react';
import { EVERYDAY_CATEGORIES, EVERYDAY_PHRASES } from '../data/everydayPhrases';
import { FocusLearningCard } from '../components/FocusLearningCard';
import { useLearning } from '../context/LearningContext';

export const EverydayEnglishView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { completedIds } = useLearning();

  // Filter phrases
  const filteredPhrases = useMemo(() => {
    return EVERYDAY_PHRASES.filter((item) => {
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

  // Learned count in this section
  const learnedCountInSection = EVERYDAY_PHRASES.filter((p) => completedIds.has(p.id)).length;
  const progressPercent = Math.round((learnedCountInSection / EVERYDAY_PHRASES.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-[#1764C0] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F4C542]"></span>
              <span>Mô-đun 01 · Giao tiếp học đường</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#123A78] tracking-tight">
              Everyday English – Giao tiếp hằng ngày
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
              Các mẫu câu chuẩn bị cho các hoạt động chào đón học sinh đầu ngày, trao đổi cùng đồng nghiệp, tiếp khách đến thăm và xử lý công việc văn phòng trường học.
            </p>
          </div>

          {/* Progress Tracker Card */}
          <div className="bg-[#F5F8FD] rounded-2xl p-4 border border-blue-100 shadow-2xs min-w-56 space-y-2 shrink-0">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Tiến độ mô-đun này</span>
              <span className="font-black text-[#123A78] tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200/70 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-[#123A78] h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between font-medium">
              <span>Đã thuộc: <strong className="text-[#123A78]">{learnedCountInSection}</strong>/{EVERYDAY_PHRASES.length} câu</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1764C0]" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Category Filter Deck */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm mẫu câu tiếng Anh hoặc tiếng Việt..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#1764C0] focus:ring-1 focus:ring-[#1764C0] transition-all placeholder:text-slate-400 text-[#172B4D]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-[#123A78] p-1 cursor-pointer"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Category Tabs (Interactive Filter Controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {EVERYDAY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#123A78] text-[#F4C542] shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-[#F5F8FD] border border-slate-200 hover:text-[#123A78] hover:border-blue-200'
                }`}
              >
                <span>{cat.labelVi}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Focused Single-Expression Learning View */}
      {filteredPhrases.length > 0 ? (
        <FocusLearningCard
          phrases={filteredPhrases}
          categoryTitle={
            selectedCategory !== 'all'
              ? EVERYDAY_CATEGORIES.find((c) => c.id === selectedCategory)?.labelVi
              : 'Giao tiếp hằng ngày'
          }
        />
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-blue-200 p-8 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-[#123A78]">
            Không tìm thấy mẫu câu phù hợp
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Vui lòng thử tìm với từ khóa khác hoặc chọn xem "Tất cả chủ đề".
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-bold bg-[#FFF5D6] text-[#123A78] border border-[#F4C542] rounded-xl hover:bg-[#fdeaa8] transition-colors cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};
