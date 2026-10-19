import React from 'react';
import {
  BookOpen,
  BookmarkCheck,
  Sparkles,
  ArrowRight,
  Laptop,
  Check,
  HelpCircle,
} from 'lucide-react';
import { TEACHER_DATA } from '../data/content';
import { ContactSection, WhatsAppIcon } from './ContactSection';
import { CoursesSection } from './CoursesSection';
import { FaqSection } from './FaqSection';

interface CoursesPageProps {
  onNavigateToHomeAdmission?: (courseName?: string, level?: string, time?: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  onNavigateToHomeAdmission,
}) => {
  const handleApplyCourse = (courseTitle: string, level?: string) => {
    if (onNavigateToHomeAdmission) {
      onNavigateToHomeAdmission(courseTitle, level);
    } else {
      window.location.hash = 'apply-admission';
    }
  };

  return (
    <div className="py-12 lg:py-16 space-y-16 lg:space-y-20">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold uppercase tracking-wider">
            <span>Online Quran Classes</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Courses & Contact
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed text-balance">
            Explore Noorani Qaida, Quran Reading (Nazra), and Quran with Tajweed. Apply for admission or connect directly with Muhammad Tariq on WhatsApp.
          </p>
        </div>
      </section>

      {/* Courses Section with 3 Cards */}
      <CoursesSection onSelectCourseForAdmission={handleApplyCourse} />

      {/* Online Class Instructions & Requirements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs uppercase font-semibold tracking-widest text-emerald-900">
              Preparation & Etiquette
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900">
              Online Class Instructions
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Guidelines to ensure a smooth, productive, and respectful learning environment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEACHER_DATA.classInstructions.map((instruction, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  {idx + 1}
                </div>
                <span className="text-xs font-medium text-stone-700 leading-relaxed">
                  {instruction}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-emerald-950 text-emerald-50 text-xs flex items-center gap-3">
            <Laptop className="w-5 h-5 text-amber-300 shrink-0" />
            <span>
              Classes are conducted 1-on-1 via standard online conferencing tools. Links and timings are coordinated directly upon admission request.
            </span>
          </div>
        </div>
      </section>

      {/* Contact Section: Get in Touch */}
      <ContactSection />

      {/* Frequently Asked Questions */}
      <FaqSection />
    </div>
  );
};
