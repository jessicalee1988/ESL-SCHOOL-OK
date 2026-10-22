import React from 'react';
import { 
  School, 
  GraduationCap, 
  Heart, 
  MapPin, 
  BookOpen, 
  Award, 
  Sparkles, 
  Users, 
  Layers, 
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FFF5D6] text-[#123A78] border border-[#F4C542]/50 rounded-full text-xs font-bold shadow-2xs">
          <School className="w-4 h-4 text-[#1764C0]" />
          <span>Sáng kiến kinh nghiệm & Chuyển đổi số giáo dục</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#123A78] tracking-tight">
          Về ứng dụng Co Do 2 - ESL primary school
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          English for Primary School Teachers – Đề án tự học và thực hành tiếng Anh thiết thực dành cho cán bộ quản lý, giáo viên và nhân viên Trường Tiểu học Cổ Đô 2, xã Cổ Đô, Thành phố Hà Nội.
        </p>
      </div>

      {/* Mission & Purpose Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-100/90 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FFF5D6] border border-[#F4C542]/50 flex items-center justify-center text-[#123A78] shrink-0 shadow-2xs">
            <BookOpen className="w-6 h-6 text-[#123A78]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#123A78]">
              Mục tiêu & Ý nghĩa đề án
            </h2>
            <div className="text-xs text-slate-500 font-semibold">
              English for Primary School Teachers – Tiếng Anh thiết thực cho giáo viên tiểu học
            </div>
          </div>
        </div>

        <div className="space-y-4 text-sm text-[#172B4D] leading-relaxed font-medium">
          <p>
            Trong bối cảnh hội nhập quốc tế và triển khai Đề án dạy và học ngoại ngữ trong hệ thống giáo dục quốc dân, việc xây dựng môi trường sử dụng tiếng Anh trong nhà trường tiểu học là một nhiệm vụ có ý nghĩa sâu sắc và thiết thực.
          </p>
          <p>
            Tuy nhiên, nhiều thầy cô giáo không chuyên tiếng Anh (giáo viên chủ nhiệm, giáo viên bộ môn Toán, Khoa học, Mỹ thuật, Âm nhạc...) cũng như cán bộ quản lý, nhân viên văn phòng, thư viện, y tế và bảo vệ thường gặp tâm lý rụt rè, e ngại khi bắt đầu học hoặc sử dụng tiếng Anh.
          </p>
          <div className="p-5 rounded-2xl bg-[#F5F8FD] border border-blue-100 space-y-2">
            <span className="font-black text-[#123A78] block">
              Sứ mệnh của "Co Do 2 - ESL primary school":
            </span>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700 font-medium">
              <li>Cung cấp hệ thống mẫu câu ngắn gọn, chuẩn mực, dễ nhớ gắn liền trực tiếp với hoạt động giảng dạy và quản lý hàng ngày tại nhà trường.</li>
              <li>Hỗ trợ giáo viên đưa các hiệu lệnh, lời khen và hướng dẫn tiếng Anh vào 8 môn học phổ thông một cách tự nhiên.</li>
              <li>Giúp cán bộ, nhân viên tự tin chào đón các đoàn khách, đối tác và phụ huynh khi đến thăm trường.</li>
              <li>Tạo phong trào tự học nhẹ nhàng, vui tươi, không gây áp lực về bằng cấp hay điểm số.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Meet Ms Jessica – Developer Introduction */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-100/90 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-black uppercase tracking-wider text-[#1764C0] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F4C542]"></span>
            <span>Meet Ms Jessica – Giới thiệu tác giả</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#123A78] tracking-tight">
            Lê Thị Thanh Huyền (Jessica)
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-600 font-bold pt-0.5">
            <span className="text-[#1764C0]">Giáo viên Tiếng Anh</span>
            <span className="text-slate-300">·</span>
            <span>Trường Tiểu học Cổ Đô 2</span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Xã Cổ Đô, Thành phố Hà Nội</span>
            </span>
          </div>
        </div>

        {/* Desktop: Photo on the left, Text on the right / Mobile: Photo above text */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8 pt-2">
          {/* Photograph: Rounded corners, subtle shadow, aspect ratio preserved */}
          <div className="w-full sm:w-[260px] md:w-[280px] lg:w-[320px] shrink-0">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border-2 border-blue-100 bg-white group">
              <img
                src="/ms_jessica.png"
                alt="Cô giáo Lê Thị Thanh Huyền (Jessica) – Tác giả ứng dụng Co Do 2 - ESL primary school"
                className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Developer Introduction Text */}
          <div className="flex-1 space-y-3.5 text-sm sm:text-base text-slate-700 leading-relaxed text-justify sm:text-left font-medium">
            <p>
              "Tôi là <strong className="text-[#123A78] font-bold">Lê Thị Thanh Huyền (Jessica)</strong>, giáo viên Tiếng Anh tại Trường Tiểu học Cổ Đô 2, Hà Nội.
            </p>
            <p>
              Với mong muốn xây dựng môi trường sử dụng tiếng Anh gần gũi, thiết thực trong nhà trường, tôi phát triển ứng dụng <strong className="text-[#123A78] font-bold">Co Do 2 - ESL primary school</strong> nhằm hỗ trợ thầy cô tiếp cận các mẫu câu giao tiếp thông dụng, nghe phát âm mẫu và tự tin vận dụng tiếng Anh trong công việc hằng ngày.
            </p>
            <p>
              Tôi hy vọng ứng dụng sẽ trở thành một người bạn đồng hành hữu ích, giúp mỗi giáo viên từng bước đưa tiếng Anh vào môi trường giáo dục tiểu học."
            </p>
          </div>
        </div>
      </section>

      {/* Institutional Unit Card with Official Logo */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white border border-blue-100 shadow-sm shrink-0 flex items-center justify-center p-1">
            <img
              src="/codo2_logo.jpg"
              alt="Logo Trường Tiểu học Cổ Đô 2"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Đơn vị công tác & Áp dụng
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#123A78]">
              Trường Tiểu học Cổ Đô 2
            </h3>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Xã Cổ Đô, Thành phố Hà Nội, Việt Nam</span>
            </div>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-slate-500 sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 font-medium">
          <span>Dành cho tập thể cán bộ giáo viên nhà trường</span>
        </div>
      </section>

      {/* Visual Identity Note */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FFF5D6] border border-[#F4C542]/50 text-[#123A78] flex items-center justify-center shrink-0 shadow-2xs">
          <School className="w-8 h-8 sm:w-10 sm:h-10 text-[#123A78]" />
        </div>
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-lg font-black text-[#123A78]">
            Không gian học tập thân thiện & sư phạm
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Với thiết kế đồ họa giao diện chuẩn mực kết hợp hai gam màu chủ đạo Xanh hải quân (Navy Blue #123A78) và Vàng kim (Golden Yellow #F4C542) đồng bộ cùng logo nhà trường, ứng dụng mang đến không gian học tập trực quan, trang trọng và truyền cảm hứng tự tin cho mỗi giáo viên.
          </p>
        </div>
      </section>

      {/* Development Roadmap */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#123A78]">
          <Calendar className="w-4 h-4 text-[#1764C0]" />
          <span>Lộ trình phát triển đề án</span>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-[#F5F8FD] border border-blue-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#1764C0] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-black text-[#123A78] text-sm block">Phiên bản hiện tại: 3 Danh mục học tập · 160 Mẫu câu chuẩn mực</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                Hoàn thiện 3 danh mục thực hành trọng tâm gồm Giao tiếp hằng ngày (40 câu), Khẩu lệnh lớp học (40 câu), Ngân hàng 8 môn học tích hợp (80 câu), tích hợp 100% trọn bộ 160 tệp âm thanh thu sẵn chuẩn WAV chất lượng cao (hỗ trợ điều chỉnh tốc độ 0.75x và 1x) và lưu tiến độ học tập trên thiết bị.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
