import React, { useState } from 'react';
import { WhatsAppIcon } from './ContactSection';
import { TEACHER_DATA } from '../data/content';
import { X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage =
    "Assalam-o-Alaikum Muhammad Tariq. I am interested in your online Quran classes. Please share the course details and available timings.";
  const waUrl = `https://wa.me/923336163006?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      className="fixed bottom-6 right-6 z-50 flex items-end gap-3 group"
      aria-label="Contact Muhammad Tariq via WhatsApp"
    >
      {/* Speech bubble / Tooltip for Desktop and Mobile */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-stone-800 text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-stone-200/90 relative animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex flex-col">
            <span className="font-bold text-emerald-950 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Online Quran Inquiry
            </span>
            <span className="text-[11px] text-stone-500">
              Message Muhammad Tariq (+92 333 6163006)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-stone-600 p-0.5 rounded-full transition-colors ml-1 cursor-pointer"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Triangle arrow on right */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-t border-r border-stone-200/90 pointer-events-none" />
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-emerald-400 border-2 border-white/60 relative cursor-pointer"
        aria-label="Open WhatsApp chat with Muhammad Tariq"
        title="Contact Muhammad Tariq on WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7 fill-current" />
        {/* Pulsing indicator ring */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-ping" />
        </span>
      </a>
    </aside>
  );
};
