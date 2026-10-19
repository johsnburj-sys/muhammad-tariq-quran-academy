import React from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';

const EDUCATIONAL_MESSAGES = [
  'Learn the Holy Quran with Care and Understanding',
  'Build a Strong Foundation in Quran Reading',
  'Improve Quran Recitation and Tajweed',
  'Begin Your Quran Learning Journey Today',
  'Personalized Learning for Children and Adults',
];

interface EducationalRibbonProps {
  enabled?: boolean;
}

export const EducationalRibbon: React.FC<EducationalRibbonProps> = ({ enabled = true }) => {
  if (!enabled) return null;

  return (
    <div
      className="bg-emerald-900/90 text-white border-y border-emerald-800/80 py-3 relative overflow-hidden shadow-xs"
      role="region"
      aria-label="Educational Highlights"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="marquee-container flex overflow-hidden whitespace-nowrap">
          {/* Loop strip A */}
          <div className="flex items-center gap-8 shrink-0 animate-marquee-normal text-xs font-medium text-emerald-100">
            {EDUCATIONAL_MESSAGES.map((msg, index) => (
              <div key={`edu-a-${index}`} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{msg}</span>
              </div>
            ))}
          </div>

          {/* Loop strip B */}
          <div className="flex items-center gap-8 shrink-0 animate-marquee-normal text-xs font-medium text-emerald-100" aria-hidden="true">
            {EDUCATIONAL_MESSAGES.map((msg, index) => (
              <div key={`edu-b-${index}`} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
