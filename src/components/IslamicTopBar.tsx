import React from 'react';
import { Sparkles } from 'lucide-react';

export interface IslamicPhrase {
  id: string;
  arabic: string;
  meaning: string;
  reference?: string;
  note?: string;
}

export const VERIFIED_ISLAMIC_PHRASES: IslamicPhrase[] = [
  {
    id: 'p1',
    arabic: 'السَّلَامُ عَلَيْكُمْ',
    meaning: 'Peace be upon you.',
  },
  {
    id: 'p2',
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    meaning: 'My Lord, increase me in knowledge.',
    reference: 'Quran 20:114',
  },
  {
    id: 'p3',
    arabic: 'وَقُلْ رَبِّ زِدْنِي عِلْمًا',
    meaning: 'And say, "My Lord, increase me in knowledge."',
    reference: 'Quran 20:114',
  },
  {
    id: 'p4',
    arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    meaning: 'Indeed, with hardship comes ease.',
    reference: 'Quran 94:6',
  },
  {
    id: 'p5',
    arabic: 'وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ',
    meaning: 'And Allah loves those who do good.',
    reference: 'Quran 3:134',
  },
  {
    id: 'p6',
    arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    meaning: 'Read in the name of your Lord who created.',
    reference: 'Quran 96:1',
  },
  {
    id: 'p7',
    arabic: 'اللَّهُمَّ زِدْنَا عِلْمًا نَافِعًا',
    meaning: 'O Allah, increase us in beneficial knowledge.',
    note: 'Supplication (Du\'a)',
  },
];

interface IslamicTopBarProps {
  speed?: 'slow' | 'normal' | 'static';
  enabled?: boolean;
}

export const IslamicTopBar: React.FC<IslamicTopBarProps> = ({
  speed = 'slow',
  enabled = true,
}) => {
  if (!enabled) return null;

  const animationClass =
    speed === 'static'
      ? ''
      : speed === 'normal'
      ? 'animate-marquee-normal'
      : 'animate-marquee-slow';

  // Render a phrase block
  const renderPhraseItem = (item: IslamicPhrase, index: number, prefix: string) => (
    <div
      key={`${prefix}-${item.id}-${index}`}
      className="inline-flex items-center gap-3 px-4 py-1.5 select-none"
    >
      {/* Decorative Gold Star Ornament */}
      <span className="text-amber-400/90 text-xs shrink-0 select-none">
        ✦
      </span>

      {/* Arabic text with proper RTL font */}
      <span
        dir="rtl"
        className="font-arabic text-amber-200 font-bold text-base sm:text-lg tracking-wide leading-none whitespace-nowrap"
      >
        {item.arabic}
      </span>

      {/* English Meaning & Verified Quranic Reference */}
      <span className="text-stone-300 text-xs font-medium tracking-normal whitespace-nowrap flex items-center gap-1.5">
        <span className="text-stone-400">“</span>
        <span>{item.meaning}</span>
        <span className="text-stone-400">”</span>
        {item.reference && (
          <span className="text-[10px] text-amber-300/80 font-mono font-normal">
            ({item.reference})
          </span>
        )}
        {item.note && (
          <span className="text-[10px] text-emerald-300/80 italic">
            ({item.note})
          </span>
        )}
      </span>
    </div>
  );

  return (
    <div
      className="relative z-50 bg-[#022C22] text-white border-b border-amber-400/25 overflow-hidden shadow-xs"
      role="region"
      aria-label="Islamic Announcements and Quranic Verses"
    >
      {/* Subtle Islamic Geometric Pattern Background overlay */}
      <div className="absolute inset-0 bg-emerald-islamic-pattern opacity-30 pointer-events-none" />

      {/* Side Fade Gradient Scrims for smooth entry/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#022C22] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#022C22] to-transparent z-10 pointer-events-none" />

      {speed === 'static' ? (
        /* Static Centered Display */
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 overflow-x-auto text-xs">
          <span className="text-amber-400 text-xs">✦</span>
          <span dir="rtl" className="font-arabic text-amber-200 font-bold text-base">
            {VERIFIED_ISLAMIC_PHRASES[1].arabic}
          </span>
          <span className="text-stone-300">
            “{VERIFIED_ISLAMIC_PHRASES[1].meaning}”
          </span>
          <span className="text-[10px] text-amber-300/80 font-mono">
            ({VERIFIED_ISLAMIC_PHRASES[1].reference})
          </span>
          <span className="text-stone-500">·</span>
          <span dir="rtl" className="font-arabic text-amber-200 font-bold text-base">
            {VERIFIED_ISLAMIC_PHRASES[3].arabic}
          </span>
          <span className="text-stone-300">
            “{VERIFIED_ISLAMIC_PHRASES[3].meaning}”
          </span>
          <span className="text-[10px] text-amber-300/80 font-mono">
            ({VERIFIED_ISLAMIC_PHRASES[3].reference})
          </span>
        </div>
      ) : (
        /* Continuous Seamless Marquee (Right-to-Left feel with linear loop) */
        <div className="marquee-container flex overflow-hidden whitespace-nowrap cursor-default">
          <div className={`flex items-center shrink-0 ${animationClass}`}>
            {VERIFIED_ISLAMIC_PHRASES.map((item, idx) =>
              renderPhraseItem(item, idx, 'a')
            )}
          </div>
          <div className={`flex items-center shrink-0 ${animationClass}`} aria-hidden="true">
            {VERIFIED_ISLAMIC_PHRASES.map((item, idx) =>
              renderPhraseItem(item, idx, 'b')
            )}
          </div>
        </div>
      )}
    </div>
  );
};
