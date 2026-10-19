import React, { useState } from 'react';
import { ExternalLink, MessageSquare, ShieldCheck, Clock, Award, Sparkles } from 'lucide-react';
import { TEACHER_DATA } from '../data/content';

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const [quickQuestion, setQuickQuestion] = useState('');

  const defaultWaMessage =
    "Assalam-o-Alaikum Muhammad Tariq. I am interested in your online Quran classes. Please share the course details and available timings.";

  const getWaLink = () => {
    const text = quickQuestion.trim()
      ? `Assalam-o-Alaikum Muhammad Tariq,\n${quickQuestion.trim()}`
      : defaultWaMessage;
    return `https://wa.me/923336163006?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact-section" className="py-12 lg:py-20 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-lg overflow-hidden">
          {/* Emerald Top Panel */}
          <div className="bg-gradient-to-r from-emerald-950 via-[#064E3B] to-emerald-950 p-8 sm:p-12 text-white text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <span>Direct Communication</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight">
              Get in Touch
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto leading-relaxed">
              Have a question about Quran classes or admission? Contact Muhammad Tariq directly on WhatsApp.
            </p>
          </div>

          {/* Action Body */}
          <div className="p-8 sm:p-12 space-y-8">
            <div className="max-w-md mx-auto text-center space-y-6">
              {/* WhatsApp Card */}
              <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md">
                    <WhatsAppIcon className="w-6 h-6 fill-current" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                      WhatsApp Contact
                    </span>
                    <span className="text-lg font-bold font-mono text-emerald-950">
                      +92 333 6163006
                    </span>
                  </div>
                </div>

                {/* Optional Quick Message Input */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="quick-question" className="text-xs font-semibold text-stone-700">
                    Write your question (optional):
                  </label>
                  <textarea
                    id="quick-question"
                    rows={2}
                    value={quickQuestion}
                    onChange={(e) => setQuickQuestion(e.target.value)}
                    placeholder="e.g. Assalam-o-Alaikum, I'd like to ask about available timings for Noorani Qaida..."
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                {/* Main WhatsApp CTA Button */}
                <a
                  href={getWaLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da850] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>

                <p className="text-[11px] text-stone-500">
                  Opens directly in WhatsApp app or WhatsApp Web
                </p>
              </div>

              {/* Teacher Summary Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs text-stone-600">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-center gap-2">
                  <Award className="w-4 h-4 text-emerald-800" />
                  <span className="font-semibold text-emerald-950">Hafiz-e-Quran</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-800" />
                  <span className="font-semibold text-emerald-950">5 Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
