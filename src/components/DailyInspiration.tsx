import React from 'react';

export const DailyInspiration: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-950 via-[#064E3B] to-emerald-950 text-white rounded-2xl p-6 sm:p-7 border border-amber-400/25 shadow-sm text-center relative overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto space-y-2">
        <span className="font-arabic text-2xl sm:text-3xl text-amber-300 font-bold block" dir="rtl">
          وَقُل رَّبِّ زِدْنِي عِلْمًا
        </span>
        <p className="text-sm text-stone-200 italic">
          “And say: My Lord, increase me in knowledge.”
        </p>
        <span className="text-[11px] font-mono text-amber-200/80 block">
          — Surah Ta-Ha (20:114)
        </span>
      </div>
    </div>
  );
};
