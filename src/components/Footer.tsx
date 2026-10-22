import React from 'react';
import { School, MapPin } from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-10 py-6 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Top Row: School & Developer Credits + Quick Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          {/* Identity & Credits */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#BCEBD8] flex items-center justify-center text-[#245E59]">
                <School className="w-3.5 h-3.5 text-[#245E59]" />
              </div>
              <span className="font-bold text-[#245E59]">
                Na Duong – ESL Primary School
              </span>
            </div>

            {/* Exact Developer Credits */}
            <div className="text-slate-600 space-y-0.5">
              <div>
                <strong className="text-[#245E59]">Nguyễn Thị Ánh</strong> – Giáo viên Tiếng Anh
              </div>
              <div>
                <strong className="text-[#245E59]">Triệu Thu Hà</strong> – Giáo viên tiểu học
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-0.5">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span>Trường Tiểu học Na Dương, xã Na Dương, tỉnh Lạng Sơn.</span>
              </div>
            </div>
          </div>

          {/* Clean Quick Nav Links */}
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 font-medium">
            <button
              onClick={() => onSelectTab('home')}
              className="hover:text-[#245E59] transition-colors cursor-pointer"
            >
              Trang chủ
            </button>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              onClick={() => onSelectTab('everyday')}
              className="hover:text-[#245E59] transition-colors cursor-pointer"
            >
              Giao tiếp hằng ngày
            </button>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              onClick={() => onSelectTab('classroom')}
              className="hover:text-[#245E59] transition-colors cursor-pointer"
            >
              Tiếng Anh lớp học
            </button>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              onClick={() => onSelectTab('subjects')}
              className="hover:text-[#245E59] transition-colors cursor-pointer"
            >
              Ngân hàng bộ môn
            </button>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              onClick={() => onSelectTab('progress')}
              className="hover:text-[#245E59] transition-colors cursor-pointer"
            >
              Tiến độ
            </button>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              onClick={() => onSelectTab('about')}
              className="hover:text-[#245E59] transition-colors cursor-pointer"
            >
              Giới thiệu
            </button>
          </nav>
        </div>

        {/* Bottom Row: Minimal Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-1.5">
          <div>
            © {new Date().getFullYear()} Na Duong – ESL Primary School.
          </div>
          <div>
            Learn · Listen · Remember
          </div>
        </div>
      </div>
    </footer>
  );
};
