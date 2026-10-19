import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  HelpCircle,
} from 'lucide-react';

interface SmartCourseFinderProps {
  onSelectCourse: (courseName: string, level: string) => void;
}

export const SmartCourseFinder: React.FC<SmartCourseFinderProps> = ({ onSelectCourse }) => {
  // Answers state
  // Q1: Starting from the beginning? (true/false/null)
  // Q2: Can you already read the Quran? (true/false/null)
  // Q3: Do you want to improve Tajweed? (true/false/null)
  const [q1, setQ1] = useState<boolean | null>(null);
  const [q2, setQ2] = useState<boolean | null>(null);
  const [q3, setQ3] = useState<boolean | null>(null);

  // Compute recommendation
  const getRecommendation = () => {
    if (q1 === null && q2 === null && q3 === null) return null;

    // If starting from the beginning -> Noorani Qaida
    if (q1 === true) {
      return {
        course: 'Noorani Qaida',
        arabic: 'القاعدة النورانية',
        level: 'Beginner',
        subtitle: 'Foundational Arabic Phonetics & Alphabet',
        reason:
          'Because you are starting from the beginning, Noorani Qaida is the foundational starting point. You will master Arabic letters, their sounds (Makharij), and how to connect letters before reading full Quranic verses.',
        duration: 'Beginner Level · Tailored to student pace',
      };
    }

    // If cannot read the Quran yet -> Noorani Qaida or Nazra depending on letters
    if (q2 === false) {
      if (q1 === false) {
        return {
          course: 'Quran Reading (Nazra)',
          arabic: 'تلاوة القرآن الكريم (ناظرة)',
          level: 'Basic Quran Reading',
          subtitle: 'Step-by-step Guided Quran Reading',
          reason:
            'Since you already recognize Arabic letters but need to practice reading continuous sentences, Nazra will guide you smoothly from single words to full Surahs with steady teacher guidance.',
          duration: 'Intermediate Level · One-on-one sessions',
        };
      }
      return {
        course: 'Noorani Qaida',
        arabic: 'القاعدة النورانية',
        level: 'Beginner',
        subtitle: 'Foundational Arabic Reading Course',
        reason:
          'Noorani Qaida will give you complete confidence in identifying Arabic letters and joining words correctly.',
        duration: 'Beginner Level · Tailored to student pace',
      };
    }

    // If can read the Quran and wants Tajweed
    if (q3 === true) {
      return {
        course: 'Quran with Tajweed',
        arabic: 'علم التجويد وإتقان التلاوة',
        level: 'Improving Tajweed',
        subtitle: 'Recitation Mastery, Rules & Articulation',
        reason:
          'Because you can already read the Holy Quran and want to improve your Tajweed, this course will focus on precise articulation points (Makharij), Noon Sakinah rules, Ghunnah, Madd, and beautified recitation.',
        duration: 'All Levels & Advanced · Individual mentoring',
      };
    }

    // If can read and wants to read with fluency first
    if (q2 === true && q3 === false) {
      return {
        course: 'Quran Reading (Nazra)',
        arabic: 'تلاوة القرآن الكريم (ناظرة)',
        level: 'Basic Quran Reading',
        subtitle: 'Fluency, Revision & Guided Recitation',
        reason:
          'Quran Reading (Nazra) will help you build recitation speed, eliminate hesitation, and recite the Holy Quran smoothly under regular teacher supervision.',
        duration: 'Intermediate Level · Continuous progress',
      };
    }

    // Default if questions partially answered
    if (q1 === false && q2 === true) {
      return {
        course: 'Quran with Tajweed',
        arabic: 'علم التجويد وإتقان التلاوة',
        level: 'Improving Tajweed',
        subtitle: 'Art of Tajweed & Fluency',
        reason:
          'Recommended for readers looking to polish their recitation and align with classical Tajweed principles.',
        duration: 'Intermediate to Advanced',
      };
    }

    return null;
  };

  const recommendation = getRecommendation();

  const handleReset = () => {
    setQ1(null);
    setQ2(null);
    setQ3(null);
  };

  const handleApplyRecommended = () => {
    if (!recommendation) return;
    onSelectCourse(recommendation.course, recommendation.level);
  };

  return (
    <section className="bg-gradient-to-br from-emerald-950 via-[#033526] to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-amber-400/25 shadow-xl relative overflow-hidden">
      {/* Background Islamic Pattern Accent */}
      <div className="absolute inset-0 bg-emerald-islamic-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Course Recommendation</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Smart Quran Course Finder
          </h2>
          <p className="text-stone-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Answer three quick questions about your current experience to find the perfect learning path for you or your child.
          </p>
        </div>

        {/* 3 Interactive Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Question 1 */}
          <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-amber-400/30 transition-all">
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">
                Question 1
              </span>
              <h3 className="font-semibold text-sm text-white">
                Are you starting from the beginning?
              </h3>
              <p className="text-xs text-stone-300">
                New to Arabic alphabet, letters, or sounds.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setQ1(true);
                  // Auto-suggest subsequent answers
                  setQ2(false);
                  setQ3(false);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all text-center border ${
                  q1 === true
                    ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-xs'
                    : 'bg-white/5 text-stone-200 border-white/10 hover:bg-white/10'
                }`}
              >
                Yes, beginner
              </button>
              <button
                type="button"
                onClick={() => setQ1(false)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all text-center border ${
                  q1 === false
                    ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-xs'
                    : 'bg-white/5 text-stone-200 border-white/10 hover:bg-white/10'
                }`}
              >
                No, know basics
              </button>
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-amber-400/30 transition-all">
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">
                Question 2
              </span>
              <h3 className="font-semibold text-sm text-white">
                Can you already read the Quran?
              </h3>
              <p className="text-xs text-stone-300">
                Able to recite verses from the Mushaf.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setQ2(true);
                  if (q1 === null) setQ1(false);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all text-center border ${
                  q2 === true
                    ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-xs'
                    : 'bg-white/5 text-stone-200 border-white/10 hover:bg-white/10'
                }`}
              >
                Yes, can read
              </button>
              <button
                type="button"
                onClick={() => setQ2(false)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all text-center border ${
                  q2 === false
                    ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-xs'
                    : 'bg-white/5 text-stone-200 border-white/10 hover:bg-white/10'
                }`}
              >
                Not fluently
              </button>
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-amber-400/30 transition-all">
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">
                Question 3
              </span>
              <h3 className="font-semibold text-sm text-white">
                Do you want to improve your Tajweed?
              </h3>
              <p className="text-xs text-stone-300">
                Focus on rules, articulation points & beautification.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setQ3(true);
                  if (q1 === null) setQ1(false);
                  if (q2 === null) setQ2(true);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all text-center border ${
                  q3 === true
                    ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-xs'
                    : 'bg-white/5 text-stone-200 border-white/10 hover:bg-white/10'
                }`}
              >
                Yes, master Tajweed
              </button>
              <button
                type="button"
                onClick={() => setQ3(false)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all text-center border ${
                  q3 === false
                    ? 'bg-amber-400 text-stone-950 border-amber-400 font-bold shadow-xs'
                    : 'bg-white/5 text-stone-200 border-white/10 hover:bg-white/10'
                }`}
              >
                Fluency first
              </button>
            </div>
          </div>
        </div>

        {/* Recommendation Box */}
        {recommendation ? (
          <div className="bg-white/10 backdrop-blur-md border-2 border-amber-400/60 rounded-2xl p-6 sm:p-8 space-y-5 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold shrink-0 shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">
                    Recommended Course for You
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white flex items-center gap-3 flex-wrap">
                    <span>{recommendation.course}</span>
                    <span className="font-arabic text-amber-300 text-base font-normal" dir="rtl">
                      ({recommendation.arabic})
                    </span>
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-1.5 text-xs text-stone-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset questions</span>
                </button>
              </div>
            </div>

            <p className="text-sm text-stone-200 leading-relaxed font-normal">
              {recommendation.reason}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="text-xs text-amber-200/90 font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Level: {recommendation.level} · One-on-one personalized pace</span>
              </div>

              <button
                type="button"
                onClick={handleApplyRecommended}
                className="px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-stone-950 font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Select & Auto-fill Admission Form</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-xs text-stone-300 flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-300" />
            <span>Select options above to see your recommended Quran course and auto-fill your admission form.</span>
          </div>
        )}
      </div>
    </section>
  );
};
