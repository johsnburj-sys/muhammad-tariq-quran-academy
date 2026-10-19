import React from 'react';
import { BookOpen, BookmarkCheck, Sparkles, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './ContactSection';
import { TEACHER_DATA } from '../data/content';

interface CoursesSectionProps {
  onSelectCourseForAdmission: (courseTitle: string, level?: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  onSelectCourseForAdmission,
}) => {
  const courses = [
    {
      id: 'noorani-qaida',
      title: 'Noorani Qaida',
      arabicTitle: 'القاعدة النورانية',
      level: 'Beginner Level',
      description:
        'Learn Arabic letters, pronunciation, and letter joining with a structured beginner-friendly approach.',
      icon: BookOpen,
      admissionLevel: 'Beginner',
      badge: 'Beginners & Children',
    },
    {
      id: 'nazra',
      title: 'Quran Reading (Nazra)',
      arabicTitle: 'تلاوة القرآن الكريم (ناظرة)',
      level: 'Reading Fluency',
      description:
        'Develop accurate Quran reading, fluency, and confidence through guided recitation and regular practice.',
      icon: BookmarkCheck,
      admissionLevel: 'Basic Quran Reading',
      badge: 'All Age Groups',
    },
    {
      id: 'tajweed',
      title: 'Quran with Tajweed',
      arabicTitle: 'علم التجويد وإتقان التلاوة',
      level: 'Recitation Rules',
      description:
        'Learn the rules of Tajweed and improve pronunciation and recitation step by step.',
      icon: Sparkles,
      admissionLevel: 'Improving Tajweed',
      badge: 'Accurate Articulation',
    },
  ];

  const handleWhatsAppEnquiry = (courseName: string) => {
    const text = `Assalam-o-Alaikum Muhammad Tariq. I am inquiring about the *${courseName}* online Quran course. Please share your available timings.`;
    window.open(
      `https://wa.me/923336163006?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="courses" className="py-12 lg:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold uppercase tracking-wider">
            <span>Structured Online Curriculum</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Explore Our Quran Courses
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed text-balance">
            Personalized one-on-one lessons designed to help each student progress at their own pace with direct teacher guidance.
          </p>
        </div>

        {/* 3 Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => {
            const IconComponent = course.icon;
            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:border-emerald-800/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-7 space-y-4">
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200/80 flex items-center justify-center shadow-2xs group-hover:bg-emerald-900 group-hover:text-amber-300 transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                      {course.badge}
                    </span>
                  </div>

                  {/* Title & Arabic */}
                  <div>
                    <h3 className="font-cinzel text-xl font-bold text-stone-900 group-hover:text-emerald-950 transition-colors">
                      {course.title}
                    </h3>
                    <p className="font-arabic text-lg text-emerald-900 font-bold mt-0.5" dir="rtl">
                      {course.arabicTitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Card Action Buttons: Apply for Admission & Enquire on WhatsApp */}
                <div className="p-6 bg-stone-50/80 border-t border-stone-100 space-y-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectCourseForAdmission(course.title, course.admissionLevel)
                    }
                    className="w-full py-2.5 px-4 text-xs font-bold text-white bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply for Admission</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppEnquiry(course.title)}
                    className="w-full py-2 px-4 text-xs font-semibold text-emerald-950 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                    <span>Enquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
