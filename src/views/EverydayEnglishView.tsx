import React, { useState, useMemo } from 'react';
import { Search, MessagesSquare, Filter, BookOpen, CheckCircle2 } from 'lucide-react';
import { EVERYDAY_CATEGORIES, EVERYDAY_PHRASES } from '../data/everydayPhrases';
import { PhraseCard } from '../components/PhraseCard';
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
      <div className="bg-linear-to-r from-[#BCEBD8]/40 via-white to-[#C9E9FF]/40 rounded-3xl p-6 sm:p-8 border border-[#BCEBD8] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#245E59]">
              Mô-đun 01 · Giao tiếp học đường
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#245E59] tracking-tight">
              Everyday English – Giao tiếp hằng ngày
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Các mẫu câu chuẩn bị cho các hoạt động chào đón học sinh đầu ngày, trao đổi cùng đồng nghiệp, tiếp khách đến thăm và xử lý công việc văn phòng trường học.
            </p>
          </div>

          {/* Progress Tracker Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs min-w-56 space-y-2 shrink-0">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Tiến độ mô-đun này</span>
              <span className="font-bold text-[#245E59] tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-[#245E59] h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between">
              <span>Đã thuộc: <strong className="text-[#245E59]">{learnedCountInSection}</strong>/{EVERYDAY_PHRASES.length} câu</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
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
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#245E59] focus:ring-1 focus:ring-[#245E59] transition-all placeholder:text-slate-400 text-slate-800"
          >
          </input>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Category Tabs (Interactive Filter Controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {EVERYDAY_CATEGORIES.map((cat) => {
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

      {/* Phrase Grid */}
      {filteredPhrases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPhrases.map((phrase) => {
            const catObj = EVERYDAY_CATEGORIES.find((c) => c.id === phrase.category);
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
            className="px-4 py-2 text-xs font-medium bg-[#BCEBD8] text-[#245E59] rounded-xl hover:bg-[#a5e2cb] transition-colors"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};
