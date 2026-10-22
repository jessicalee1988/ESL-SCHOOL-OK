import React from 'react';
import { 
  MessagesSquare, 
  Presentation, 
  BookOpen, 
  ArrowRight, 
  School,
  Sparkles,
  ChevronRight,
  Calculator,
  FlaskConical,
  Landmark,
  Globe2,
  Music2,
  Palette,
  Dumbbell,
  Monitor
} from 'lucide-react';
import { NavigationTab, UserRoleId } from '../types';
import { useLearning } from '../context/LearningContext';
import { SUBJECTS_DATA } from '../data/subjectPhrases';

interface HomeViewProps {
  onSelectTab: (tab: NavigationTab) => void;
  onSelectSubject?: (subjectId: string) => void;
}

const SUBJECT_ICONS: Record<string, React.FC<{ className?: string }>> = {
  math: Calculator,
  science: FlaskConical,
  history: Landmark,
  geography: Globe2,
  music: Music2,
  art: Palette,
  pe: Dumbbell,
  it: Monitor,
};

interface RoleRecommendation {
  roleId: UserRoleId;
  roleTitleVi: string;
  recommendedTab: NavigationTab;
  moduleTitleVi: string;
  noteVi: string;
}

const ROLE_RECOMMENDATIONS: Record<UserRoleId, RoleRecommendation> = {
  homeroom: {
    roleId: 'homeroom',
    roleTitleVi: 'Giáo viên chủ nhiệm',
    recommendedTab: 'classroom',
    moduleTitleVi: 'Tiếng Anh trong lớp học (Classroom English)',
    noteVi: 'Ưu tiên 40 khẩu lệnh ổn định nề nếp, tổ chức hoạt động và câu khen ngợi tạo hứng khởi cho học sinh.',
  },
  subject: {
    roleId: 'subject',
    roleTitleVi: 'Giáo viên bộ môn',
    recommendedTab: 'subjects',
    moduleTitleVi: 'Ngân hàng tiếng Anh bộ môn (Subject English Bank)',
    noteVi: 'Ưu tiên từ vựng chuyên môn và khẩu lệnh hướng dẫn thao tác thực hành cho môn học phụ trách.',
  },
  leadership: {
    roleId: 'leadership',
    roleTitleVi: 'Ban giám hiệu',
    recommendedTab: 'everyday',
    moduleTitleVi: 'Giao tiếp hằng ngày (Everyday English)',
    noteVi: 'Ưu tiên các mẫu câu ngoại giao đón tiếp khách, đối tác giáo dục và giao tiếp lịch thiệp trong nhà trường.',
  },
  staff: {
    roleId: 'staff',
    roleTitleVi: 'Cán bộ, nhân viên',
    recommendedTab: 'everyday',
    moduleTitleVi: 'Giao tiếp hằng ngày (Everyday & School Office)',
    noteVi: 'Ưu tiên các mẫu câu chỉ dẫn vị trí phòng ban, hỗ trợ thủ tục hồ sơ và đón tiếp khách tại trường.',
  },
};

export const HomeView: React.FC<HomeViewProps> = ({ onSelectTab, onSelectSubject }) => {
  const { userRole, selectedSubjectId, setSelectedSubjectId } = useLearning();

  // Active role recommendation
  const activeRec = (userRole && ROLE_RECOMMENDATIONS[userRole]) || ROLE_RECOMMENDATIONS.homeroom;
  const currentSubject = SUBJECTS_DATA.find((s) => s.id === selectedSubjectId) || SUBJECTS_DATA[0];

  // Exactly THREE Prominent Learning Module Cards
  const mainModules = [
    {
      id: 'everyday' as NavigationTab,
      nameVi: 'Giao tiếp hằng ngày',
      nameEn: 'Everyday English',
      description: 'Mẫu câu chào hỏi, đón tiếp khách và giao tiếp nhà trường hằng ngày.',
      phraseCount: '40 phrases',
      countBadge: '40 mẫu câu',
      icon: MessagesSquare,
      bgClass: 'bg-[#BCEBD8]/35 hover:bg-[#BCEBD8]/55 border-[#BCEBD8]',
      iconBg: 'bg-[#BCEBD8] text-[#245E59]',
      btnClass: 'text-[#245E59]',
    },
    {
      id: 'classroom' as NavigationTab,
      nameVi: 'Tiếng Anh trong lớp học',
      nameEn: 'Classroom English',
      description: 'Khẩu lệnh ổn định nề nếp, giao nhiệm vụ, nhận xét và khen ngợi học sinh.',
      phraseCount: '40 phrases',
      countBadge: '40 mẫu câu',
      icon: Presentation,
      bgClass: 'bg-[#C9E9FF]/35 hover:bg-[#C9E9FF]/55 border-[#C9E9FF]',
      iconBg: 'bg-[#C9E9FF] text-[#1e4e79]',
      btnClass: 'text-[#1e4e79]',
    },
    {
      id: 'subjects' as NavigationTab,
      nameVi: 'Ngân hàng tiếng Anh bộ môn',
      nameEn: 'Subject English Bank',
      description: 'Từ vựng và mẫu câu giảng dạy thực hành cho 8 môn học tích hợp tiểu học.',
      phraseCount: '80 phrases across 8 subjects',
      countBadge: '80 câu · 8 môn',
      icon: BookOpen,
      bgClass: 'bg-[#FFF5D6]/60 hover:bg-[#FFF5D6]/85 border-[#E6D385]',
      iconBg: 'bg-[#FFF5D6] border border-[#E6D385] text-[#7d5f13]',
      btnClass: 'text-[#7d5f13]',
    },
  ];

  const handleGoToRecommendation = () => {
    if (userRole === 'subject') {
      if (onSelectSubject && selectedSubjectId) {
        onSelectSubject(selectedSubjectId);
      } else {
        onSelectTab('subjects');
      }
    } else {
      onSelectTab(activeRec.recommendedTab);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* 1. COMPACT WELCOME BANNER (Reduced height ~25-30%, single "Bắt đầu học" button) */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#BCEBD8]/35 via-[#F8FDFB] to-[#FFF5D6]/45 border border-slate-200/80 p-4 sm:p-5 lg:p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-center">
          {/* Left Text Zone */}
          <div className="md:col-span-8 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#245E59]">
              <School className="w-3.5 h-3.5 text-[#245E59]" />
              <span>Trường Tiểu học Na Dương</span>
            </div>

            <div className="space-y-0.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#245E59] tracking-tight">
                Hello, Teachers!
              </h1>
              <p className="text-sm sm:text-base font-semibold text-slate-700">
                Cùng học tiếng Anh mỗi ngày!
              </p>
            </div>

            <p className="text-xs font-semibold text-[#245E59]/85 tracking-wide">
              Learn · Listen · Remember
            </p>

            {/* Single Prominent Button */}
            <div className="pt-1">
              <button
                onClick={() => onSelectTab('everyday')}
                className="px-4 py-2 bg-[#245E59] hover:bg-[#1a4642] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Bắt đầu học</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Mascot Illustration */}
          <div className="md:col-span-4 flex items-center justify-center md:justify-end">
            <div className="relative w-full max-w-[190px] sm:max-w-[210px] aspect-4/3 rounded-2xl overflow-hidden shadow-xs border-2 border-white shrink-0">
              <img
                src="/src/assets/images/hero_school_mascot_1792557964603.jpg"
                alt="Chú Cú Thông Thái cầm sách tiếng Anh trước cổng Trường Tiểu học Na Dương"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-white/95 backdrop-blur-xs rounded-lg px-2 py-0.5 text-[10px] text-[#245E59] font-medium flex items-center justify-between shadow-2xs">
                <span className="font-bold">Cú Thông Thái</span>
                <span className="text-slate-500">Na Duong ESL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE LEARNING MODULES DIRECTLY BELOW THE HERO */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#245E59] tracking-tight">
              3 Mô-đun học tập thực hành
            </h2>
            <p className="text-xs text-slate-500">
              160 mẫu câu được biên soạn chuẩn mực cho cán bộ, giáo viên và nhân viên
            </p>
          </div>
        </div>

        {/* 3 Equal-height cards on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {mainModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => onSelectTab(mod.id)}
                className={`group flex flex-col justify-between p-5 rounded-3xl border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-1 ${mod.bgClass}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectTab(mod.id);
                  }
                }}
              >
                <div>
                  {/* Top: Large Prominent Icon & Count Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform ${mod.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-white/85 rounded-xl text-slate-700 shadow-2xs">
                      {mod.countBadge}
                    </span>
                  </div>

                  {/* Bilingual Title */}
                  <h3 className="text-base font-bold text-[#245E59] group-hover:text-[#1a4642] mb-0.5 leading-snug">
                    {mod.nameVi}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 mb-2">
                    {mod.nameEn}
                  </div>

                  {/* One-line Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {mod.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className={`pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold ${mod.btnClass}`}>
                  <span>Vào học</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. OPTIONAL SHORT LEARNING RECOMMENDATION (Compact panel based on active header role) */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#BCEBD8] flex items-center justify-center text-[#245E59] shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-[#245E59]" />
              </span>
              <span className="text-xs font-bold text-[#245E59] uppercase tracking-wider">
                Gợi ý cho {activeRec.roleTitleVi}
              </span>
              {userRole === 'subject' && currentSubject && (
                <span className="text-xs font-bold text-amber-800 bg-[#FFF5D6] px-2 py-0.5 rounded-md border border-amber-300">
                  {currentSubject.nameVi}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {userRole === 'subject' && currentSubject
                ? `Thầy/cô môn ${currentSubject.nameVi} nên bắt đầu với 10 câu khẩu lệnh và thuật ngữ môn học chuyên biệt.`
                : activeRec.noteVi}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              onClick={handleGoToRecommendation}
              className="px-3.5 py-2 bg-[#245E59] hover:bg-[#1a4642] text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Vào học theo gợi ý</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* If Subject Teacher, show a quick inline subject switcher */}
        {userRole === 'subject' && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1 text-xs">
            <span className="text-[11px] font-semibold text-slate-500 mr-1">
              Đổi môn:
            </span>
            {SUBJECTS_DATA.map((sub) => {
              const SubIcon = SUBJECT_ICONS[sub.id] || BookOpen;
              const isSelected = selectedSubjectId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubjectId(sub.id);
                  }}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFF5D6] text-amber-950 font-bold border border-amber-300'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <SubIcon className="w-3 h-3 text-[#245E59]" />
                  <span>{sub.nameVi}</span>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
