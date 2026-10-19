import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { TEACHER_DATA } from '../data/content';
import quranArtImg from '../assets/images/quran_illumination_art_1791962723371.jpg';

interface AboutSectionProps {
  onNavigateToCourses: () => void;
  onNavigateToContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onNavigateToCourses,
  onNavigateToContact,
}) => {
  return (
    <section id="about" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Visual Column: Islamic Illumination / Quran Emblem */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-sm w-full">
                <div className="relative bg-stone-50 p-3 rounded-2xl border border-stone-200/80 shadow-md overflow-hidden">
                  <img
                    src={quranArtImg}
                    alt="Holy Quran study and Islamic illumination"
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                  <div className="mt-4 px-3 py-2 text-center bg-white rounded-lg border border-stone-100">
                    <span className="font-arabic text-xl text-emerald-950 font-bold block" dir="rtl">
                      خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
                    </span>
                    <p className="text-xs text-stone-600 italic mt-1">
                      "The best among you are those who learn the Quran and teach it."
                    </p>
                    <span className="text-[11px] font-mono text-stone-400 block mt-0.5">
                      (Sahih al-Bukhari)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column: Meet Your Quran Teacher */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-xs uppercase font-semibold tracking-widest text-emerald-900">
                  Teacher Profile
                </div>
                <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                  Meet Your Quran Teacher
                </h2>
              </div>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal">
                I am Muhammad Tariq, a Hafiz-e-Quran with five years of teaching experience. I teach Noorani Qaida, Quran Reading (Nazra), and Tajweed through structured online lessons tailored to each student's learning level.
              </p>

              {/* Teaching Approach */}
              <div className="pt-2 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Teaching Approach:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
                    <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-stone-900 block">
                        Patient, step-by-step guidance
                      </span>
                      <span className="text-xs text-stone-500">
                        Calm and encouraging pace tailored to the student.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
                    <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-stone-900 block">
                        Attention to correct pronunciation
                      </span>
                      <span className="text-xs text-stone-500">
                        Focus on proper letter articulation (Makharij).
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
                    <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-stone-900 block">
                        Regular practice and revision
                      </span>
                      <span className="text-xs text-stone-500">
                        Systematic review to build long-term retention.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
                    <CheckCircle2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-stone-900 block">
                        Personalized learning support
                      </span>
                      <span className="text-xs text-stone-500">
                        1-on-1 instruction adapted to every age group.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onNavigateToContact}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 rounded-md transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                </button>
                <button
                  type="button"
                  onClick={onNavigateToCourses}
                  className="px-5 py-2.5 text-xs font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors cursor-pointer"
                >
                  <span>View Courses</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
