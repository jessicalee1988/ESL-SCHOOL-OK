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
import { OwlMascotBadge } from '../components/OwlMascotBadge';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#BCEBD8]/50 text-[#245E59] rounded-full text-xs font-semibold">
          <School className="w-3.5 h-3.5" />
          <span>Sáng kiến kinh nghiệm & Chuyển đổi số giáo dục</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#245E59] tracking-tight">
          Về ứng dụng Na Duong – ESL Primary School
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Đề án tự học và thực hành tiếng Anh thiết thực dành cho cán bộ quản lý, giáo viên và nhân viên Trường Tiểu học Na Dương, xã Na Dương, tỉnh Lạng Sơn.
        </p>
      </div>

      {/* Mission & Purpose Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFF5D6] flex items-center justify-center text-[#7d5f13] shrink-0">
            <BookOpen className="w-5 h-5 text-[#7d5f13]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#245E59]">
              Mục tiêu & Ý nghĩa đề án
            </h2>
            <div className="text-xs text-slate-500">
              English for Everyone at School – Tiếng Anh cho mọi vị trí trong trường học
            </div>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            Trong bối cảnh hội nhập quốc tế và triển khai Đề án dạy và học ngoại ngữ trong hệ thống giáo dục quốc dân, việc xây dựng môi trường sử dụng tiếng Anh trong nhà trường tiểu học là một nhiệm vụ có ý nghĩa sâu sắc và thiết thực.
          </p>
          <p>
            Tuy nhiên, nhiều thầy cô giáo không chuyên tiếng Anh (giáo viên chủ nhiệm, giáo viên bộ môn Toán, Khoa học, Mỹ thuật, Âm nhạc...) cũng như cán bộ quản lý, nhân viên văn phòng, thư viện, y tế và bảo vệ thường gặp tâm lý rụt rè, e ngại khi bắt đầu học hoặc sử dụng tiếng Anh.
          </p>
          <div className="p-4 rounded-2xl bg-[#F8FDFB] border border-[#BCEBD8] space-y-2">
            <span className="font-bold text-[#245E59] block">
              Sứ mệnh của "Na Duong – ESL Primary School":
            </span>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700">
              <li>Cung cấp hệ thống mẫu câu ngắn gọn, chuẩn mực, dễ nhớ gắn liền trực tiếp với hoạt động giảng dạy và quản lý hàng ngày tại nhà trường.</li>
              <li>Hỗ trợ giáo viên đưa các hiệu lệnh, lời khen và hướng dẫn tiếng Anh vào 8 môn học phổ thông một cách tự nhiên.</li>
              <li>Giúp cán bộ, nhân viên tự tin chào đón các đoàn khách, đối tác và phụ huynh khi đến thăm trường.</li>
              <li>Tạo phong trào tự học nhẹ nhàng, vui tươi, không gây áp lực về bằng cấp hay điểm số.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Author & Institutional Credits */}
      <section className="bg-linear-to-br from-[#FFF5D6]/40 via-white to-[#BCEBD8]/30 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-[#245E59]">
            Tác giả sáng kiến & Đơn vị thực hiện
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#245E59]">
            Đội ngũ nghiên cứu & Phát triển
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Author 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#BCEBD8] flex items-center justify-center text-[#245E59] font-bold text-lg">
                NA
              </div>
              <div>
                <h3 className="text-base font-bold text-[#245E59]">
                  Nguyễn Thị Ánh
                </h3>
                <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                  English Teacher (Giáo viên Tiếng Anh)
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Phụ trách biên soạn nội dung ngôn ngữ chuyên môn, thẩm định tính chuẩn xác của mẫu câu tiếng Anh và thiết kế lộ trình thực hành phù hợp với đặc thù trường tiểu học.
            </p>
          </div>

          {/* Author 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#C9E9FF] flex items-center justify-center text-[#1e4e79] font-bold text-lg">
                TH
              </div>
              <div>
                <h3 className="text-base font-bold text-[#245E59]">
                  Triệu Thu Hà
                </h3>
                <span className="text-xs text-blue-800 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
                  Primary School Teacher (Giáo viên Tiểu học)
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Phụ trách khảo sát nhu cầu thực tế của giáo viên đứng lớp, đề xuất các tình huống sư phạm cốt lõi trong các môn học văn hóa và kiểm nghiệm ứng dụng trong sinh hoạt tổ chuyên môn.
            </p>
          </div>
        </div>

        {/* Institutional Unit Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Đơn vị công tác & Áp dụng
            </div>
            <h4 className="text-base font-bold text-[#245E59]">
              Trường Tiểu học Na Dương
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Xã Na Dương, tỉnh Lạng Sơn, Việt Nam</span>
            </div>
          </div>

          <div className="text-xs text-slate-500 sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0">
            <span>Dành cho tập thể cán bộ giáo viên nhà trường</span>
          </div>
        </div>
      </section>

      {/* Mascot & Visual Identity Note */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <OwlMascotBadge size="lg" className="shrink-0" />
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-lg font-bold text-[#245E59]">
            Gặp gỡ chú Cú Thông Thái (The Friendly Wise Owl)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Biểu tượng chú Cú đeo kính cầm cuốn sách tiếng Anh đại diện cho tinh thần hiếu học, kiên trì và niềm vui khám phá tri thức mỗi ngày. Với giao diện tranh vẽ 2D ấm áp cùng các gam màu phấn nhẹ (Pastel Mint, Sky Blue, Warm Cream, Pastel Pink, Lavender), ứng dụng mong muốn mang đến cảm giác thân thiện, xua tan cảm giác căng thẳng khi học ngoại ngữ.
          </p>
        </div>
      </section>

      {/* Development Roadmap */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#245E59]">
          <Calendar className="w-4 h-4 text-[#245E59]" />
          <span>Lộ trình phát triển đề án</span>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-emerald-950 text-sm block">Phiên bản hiện tại: 3 Mô-đun cốt lõi · 160 Mẫu câu chuẩn mực</span>
              <p className="text-emerald-900 leading-relaxed">
                Hoàn thiện 3 mô-đun thực hành trọng tâm gồm Giao tiếp hằng ngày (40 câu), Khẩu lệnh lớp học (40 câu), Ngân hàng 8 môn học tích hợp (80 câu), hệ thống âm thanh kết hợp (Hybrid Audio: giọng thu sẵn chuẩn WAV và Web Speech API en-US tốc độ 0.9x) và lưu tiến độ học tập trên thiết bị.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
