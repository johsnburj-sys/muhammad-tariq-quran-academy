import React, { useState } from 'react';
import { ArrowRight, MessageSquareQuote, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';
import { QuranQualificationIcon, TeachingExperienceIcon } from './Icons';
import { TEACHER_DATA } from '../data/content';

// Generated image assets
import heroStudyImg from '../assets/images/teacher_study_setting_1791962724642.jpg';
import quranRehalImg from '../assets/images/hero_quran_study_1791962724280.jpg';

interface HeroProps {
  onNavigateToCourses: () => void;
  onNavigateToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigateToCourses,
  onNavigateToContact,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-[#FAF8F5] to-stone-100/60 border-b border-stone-200/80 py-12 lg:py-20">
      {/* Decorative Subtle Corner Arabesque Motif */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-emerald-900/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Bismillah Calligraphy Banner */}
        <div className="text-center mb-6">
          <p className="font-arabic text-2xl sm:text-3xl text-emerald-900/90 tracking-wide select-none" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Description, Trust Cards & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-[1.18] text-balance">
                Learn the Holy Quran Online with{' '}
                <span className="text-emerald-900">
                  Muhammad Tariq
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                Learn Noorani Qaida, Quran Reading (Nazra), and Tajweed through personalized online lessons with patient guidance and a focus on correct pronunciation.
              </p>
            </div>

            {/* Three Concise Trust Cards */}
            <div className="border-y border-stone-200/80 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200/80 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <QuranQualificationIcon className="w-5 h-5 text-emerald-950" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                    Qualification
                  </div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">
                    Hafiz-e-Quran
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200/80 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <TeachingExperienceIcon className="w-5 h-5 text-emerald-950" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                    Experience
                  </div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5 tabular-nums">
                    5 Years
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200/80 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Globe className="w-5 h-5 text-emerald-900" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                    Learning Mode
                  </div>
                  <div className="text-sm font-bold text-stone-900 mt-0.5">
                    Online Classes
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Primary Apply for Admission + Secondary Explore Courses */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onNavigateToContact}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 rounded-md transition-all shadow-md hover:shadow-lg flex items-center gap-2 group whitespace-nowrap cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onNavigateToCourses}
                className="px-6 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 active:bg-stone-100 border border-stone-300 rounded-md transition-all shadow-xs hover:shadow flex items-center gap-2 whitespace-nowrap cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-400"
              >
                <span>Explore Courses</span>
              </button>
            </div>

            {/* Verified Trust Markers */}
            <div className="flex items-center gap-4 text-xs text-stone-500 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>1-on-1 Dedicated Lessons</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Kids & Adult Beginners Welcome</span>
              </div>
            </div>
          </div>

          {/* Right Column: Teacher Portrait / Islamic Study Setting Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative Islamic arch frame */}
              <div className="relative rounded-2xl p-2 bg-gradient-to-b from-amber-400/30 via-emerald-800/20 to-stone-300/40 shadow-xl">
                <div className="relative overflow-hidden rounded-xl bg-stone-900 aspect-4/3 sm:aspect-4/3 lg:aspect-5/4">
                  {!imageError ? (
                    <img
                      src={heroStudyImg}
                      alt="Online Quran Teacher Muhammad Tariq conducting an online Quran lesson in a serene Islamic study room"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    /* High fidelity CSS/SVG fallback per Zero-Broken-Image Policy */
                    <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 p-8 flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                        <span className="font-arabic text-2xl text-amber-300">اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ</span>
                        <QuranQualificationIcon className="w-8 h-8 text-amber-300/80" />
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs uppercase tracking-widest text-amber-300 font-medium">
                          Hafiz-e-Quran
                        </div>
                        <h2 className="font-cinzel text-2xl font-bold">Muhammad Tariq</h2>
                        <p className="text-xs text-stone-300">Online Quran Teacher · 5 Years Teaching</p>
                      </div>
                    </div>
                  )}

                  {/* Gentle gradient scrim at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/10 pointer-events-none" />

                  {/* Caption badge overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-stone-900/85 backdrop-blur-md rounded-lg border border-amber-400/20 text-white flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                        <span>Muhammad Tariq</span>
                      </div>
                      <div className="text-[11px] text-stone-300">
                        Hafiz-e-Quran · 5 Years Experience
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-medium block">
                        Online Class
                      </span>
                      <span className="text-[11px] text-stone-300">
                        Interactive Setup
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quran Rehal Mini Inset Card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-2.5 rounded-xl shadow-lg border border-stone-200/90 items-center gap-3 max-w-xs">
                <img
                  src={quranRehalImg}
                  alt="Holy Quran on Rehal"
                  className="w-14 h-14 rounded-lg object-cover shrink-0 border border-stone-100"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs">
                  <div className="font-semibold text-stone-900">Holy Quran Guidance</div>
                  <div className="text-stone-500 text-[11px]">Noorani Qaida · Nazra · Tajweed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
