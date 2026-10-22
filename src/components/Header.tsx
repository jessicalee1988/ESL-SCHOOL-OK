import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  GraduationCap, 
  Check, 
  ChevronDown, 
  MessagesSquare, 
  Presentation, 
  BookOpen, 
  ChartNoAxesColumn, 
  Info,
  Home,
  UserCheck,
  Users,
  Award,
  Briefcase
} from 'lucide-react';
import { NavigationTab, UserRoleId } from '../types';
import { useLearning } from '../context/LearningContext';
import { SUBJECTS_DATA } from '../data/subjectPhrases';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onSelectSubject?: (subjectId: string) => void;
}

const ROLE_OPTIONS: { id: UserRoleId; labelVi: string; labelEn: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'homeroom', labelVi: 'GV Chủ nhiệm', labelEn: 'Homeroom', icon: Users },
  { id: 'subject', labelVi: 'GV Bộ môn', labelEn: 'Subject', icon: BookOpen },
  { id: 'leadership', labelVi: 'Ban giám hiệu', labelEn: 'Leadership', icon: Award },
  { id: 'staff', labelVi: 'Cán bộ, nhân viên', labelEn: 'Staff', icon: Briefcase },
];

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, onSelectSubject }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [modulesDropdownOpen, setModulesDropdownOpen] = useState(false);
  
  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const modulesDropdownRef = useRef<HTMLDivElement>(null);
  
  const { completedIds, userRole, setUserRole, selectedSubjectId, setSelectedSubjectId } = useLearning();

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setRoleDropdownOpen(false);
      }
      if (modulesDropdownRef.current && !modulesDropdownRef.current.contains(event.target as Node)) {
        setModulesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (tab: NavigationTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    setModulesDropdownOpen(false);
  };

  const currentRole = ROLE_OPTIONS.find((r) => r.id === userRole) || null;
  const currentRoleIcon = currentRole ? currentRole.icon : UserCheck;

  const isModuleActive = currentTab === 'everyday' || currentTab === 'classroom' || currentTab === 'subjects';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-16">
          {/* Left: School Logo & Title */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Về trang chủ Na Duong ESL"
          >
            <div className="w-9 h-9 rounded-xl bg-[#BCEBD8] flex items-center justify-center text-[#245E59] shadow-xs group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-[#245E59]" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-[#245E59] block leading-tight">
                Na Duong – ESL
              </span>
              <span className="text-[11px] font-medium text-slate-500 block leading-none">
                Primary School
              </span>
            </div>
          </button>

          {/* Center/Right Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {/* Home */}
            <button
              onClick={() => handleNav('home')}
              className={`py-1 transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'home' ? 'text-[#245E59] font-bold border-b-2 border-[#245E59]' : 'hover:text-[#245E59]'
              }`}
            >
              Trang chủ
            </button>

            {/* Learning Modules Dropdown */}
            <div className="relative" ref={modulesDropdownRef}>
              <button
                onClick={() => setModulesDropdownOpen(!modulesDropdownOpen)}
                className={`inline-flex items-center gap-1 py-1 transition-colors whitespace-nowrap cursor-pointer ${
                  isModuleActive ? 'text-[#245E59] font-bold border-b-2 border-[#245E59]' : 'hover:text-[#245E59]'
                }`}
                aria-expanded={modulesDropdownOpen}
              >
                <span>Chương trình học</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${modulesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {modulesDropdownOpen && (
                <div className="absolute left-0 mt-2.5 w-68 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    3 Mô-đun thực hành (160 câu)
                  </div>
                  <button
                    onClick={() => handleNav('everyday')}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                      currentTab === 'everyday' ? 'bg-[#BCEBD8]/40 text-[#245E59] font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#BCEBD8]/50 flex items-center justify-center text-[#245E59] shrink-0">
                      <MessagesSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold">Giao tiếp hằng ngày</div>
                      <div className="text-[11px] text-slate-500">Everyday English · 40 câu</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('classroom')}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                      currentTab === 'classroom' ? 'bg-[#C9E9FF]/40 text-[#1e4e79] font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#C9E9FF]/60 flex items-center justify-center text-[#1e4e79] shrink-0">
                      <Presentation className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold">Tiếng Anh trong lớp học</div>
                      <div className="text-[11px] text-slate-500">Classroom English · 40 câu</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('subjects')}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                      currentTab === 'subjects' ? 'bg-[#FFF5D6] text-[#7d5f13] font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#FFF5D6] border border-[#E6D385] flex items-center justify-center text-[#7d5f13] shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold">Ngân hàng bộ môn</div>
                      <div className="text-[11px] text-slate-500">Subject English · 80 câu / 8 môn</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Progress */}
            <button
              onClick={() => handleNav('progress')}
              className={`py-1 inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'progress' ? 'text-[#245E59] font-bold border-b-2 border-[#245E59]' : 'hover:text-[#245E59]'
              }`}
            >
              <ChartNoAxesColumn className="w-4 h-4 text-emerald-700" />
              <span>Tiến độ</span>
              <span className="text-[11px] font-bold px-1.5 py-0.2 bg-[#BCEBD8] text-[#245E59] rounded-full tabular-nums">
                {completedIds.size}/160
              </span>
            </button>

            {/* About */}
            <button
              onClick={() => handleNav('about')}
              className={`py-1 transition-colors whitespace-nowrap cursor-pointer ${
                currentTab === 'about' ? 'text-[#245E59] font-bold border-b-2 border-[#245E59]' : 'hover:text-[#245E59]'
              }`}
            >
              Giới thiệu
            </button>
          </nav>

          {/* Right Action: Compact User Role Selector + Hamburger */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Compact Role Selector Dropdown */}
            <div className="relative" ref={roleDropdownRef}>
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white text-xs font-semibold text-[#245E59] hover:border-[#BCEBD8] transition-all cursor-pointer shadow-2xs"
                title="Thay đổi vai trò công tác"
                aria-expanded={roleDropdownOpen}
              >
                {React.createElement(currentRoleIcon, { className: "w-3.5 h-3.5 text-[#245E59]" })}
                <span className="hidden sm:inline">
                  {currentRole ? currentRole.labelVi : 'Chọn vai trò'}
                </span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                    Vai trò của bạn tại trường
                  </div>
                  {ROLE_OPTIONS.map((opt) => {
                    const isSelected = userRole === opt.id;
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setUserRole(opt.id);
                          if (opt.id === 'subject' && !selectedSubjectId) {
                            setSelectedSubjectId('math');
                          }
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#BCEBD8]/40 text-[#245E59] font-bold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-[#245E59]" />
                          <div>
                            <div>{opt.labelVi}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{opt.labelEn}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />}
                      </button>
                    );
                  })}

                  {/* Quick subject selector if Subject Teacher */}
                  {userRole === 'subject' && (
                    <div className="mt-2 pt-2 border-t border-slate-100 px-3">
                      <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-1.5">
                        Môn đang phụ trách:
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[11px]">
                        {SUBJECTS_DATA.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => {
                              setSelectedSubjectId(s.id);
                              setRoleDropdownOpen(false);
                              if (onSelectSubject) onSelectSubject(s.id);
                            }}
                            className={`px-2 py-1 rounded-md text-left truncate transition-colors ${
                              selectedSubjectId === s.id
                                ? 'bg-amber-100 text-amber-900 font-bold'
                                : 'hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                            {s.nameVi}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-[#245E59] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          {/* Main Modules */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
              Chương trình học
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleNav('home')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  currentTab === 'home' ? 'bg-[#BCEBD8]/40 text-[#245E59]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Home className="w-4 h-4 text-[#245E59]" />
                <span>Trang chủ</span>
              </button>

              <button
                onClick={() => handleNav('everyday')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  currentTab === 'everyday' ? 'bg-[#BCEBD8]/40 text-[#245E59]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessagesSquare className="w-4 h-4 text-[#245E59]" />
                  <span>Giao tiếp hằng ngày</span>
                </div>
                <span className="text-[11px] text-slate-400">40 câu</span>
              </button>

              <button
                onClick={() => handleNav('classroom')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  currentTab === 'classroom' ? 'bg-[#C9E9FF]/40 text-[#1e4e79]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Presentation className="w-4 h-4 text-[#1e4e79]" />
                  <span>Tiếng Anh trong lớp học</span>
                </div>
                <span className="text-[11px] text-slate-400">40 câu</span>
              </button>

              <button
                onClick={() => handleNav('subjects')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  currentTab === 'subjects' ? 'bg-[#FFF5D6] text-[#7d5f13]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#7d5f13]" />
                  <span>Ngân hàng tiếng Anh bộ môn</span>
                </div>
                <span className="text-[11px] text-slate-400">80 câu / 8 môn</span>
              </button>
            </div>
          </div>

          {/* Progress & About */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
              Tiến độ & Giới thiệu
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleNav('progress')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  currentTab === 'progress' ? 'bg-[#BCEBD8]/40 text-[#245E59]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ChartNoAxesColumn className="w-4 h-4 text-emerald-700" />
                  <span>Tiến độ học tập</span>
                </div>
                <span className="text-[11px] font-bold px-1.5 py-0.5 bg-[#BCEBD8] text-[#245E59] rounded-md tabular-nums">
                  {completedIds.size}/160
                </span>
              </button>

              <button
                onClick={() => handleNav('about')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  currentTab === 'about' ? 'bg-[#BCEBD8]/40 text-[#245E59]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Info className="w-4 h-4 text-[#245E59]" />
                <span>Giới thiệu đề án</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
