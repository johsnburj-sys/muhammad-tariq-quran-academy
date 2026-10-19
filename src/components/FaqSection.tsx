import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { TEACHER_DATA } from '../data/content';
import { WhatsAppIcon } from './ContactSection';

interface FaqSectionProps {
  onNavigateToContact?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onNavigateToContact }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-12 lg:py-16 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Essential information regarding teacher qualifications, class format, and admissions.
          </p>
        </div>

        {/* Expandable Accordion List */}
        <div className="space-y-3">
          {TEACHER_DATA.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-emerald-800/40 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-hidden cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-cinzel text-sm sm:text-base font-bold text-stone-900 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-900 text-xs flex items-center justify-center shrink-0 font-sans font-bold">
                      {idx + 1}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-emerald-900 text-amber-300 rotate-180'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Clean Inquiry Note */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-950">
          <span>Have another question? Contact Muhammad Tariq directly on WhatsApp:</span>
          <a
            href={TEACHER_DATA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-[#25D366] text-white font-semibold flex items-center gap-1.5 shrink-0 hover:bg-[#20bd5a] transition-colors"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
            <span>+92 333 6163006</span>
          </a>
        </div>
      </div>
    </section>
  );
};
