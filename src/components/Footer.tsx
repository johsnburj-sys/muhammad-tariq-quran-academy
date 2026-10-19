import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { TEACHER_DATA } from '../data/content';
import { WhatsAppIcon } from './ContactSection';

interface FooterProps {
  onNavigate: (page: 'home' | 'courses' | 'admission' | 'admin', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-12 pb-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Col 1: Identity & Credentials */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo-transparent.png"
                alt="Online Quran Teaching Logo"
                className="h-11 w-auto max-w-[48px] object-contain shrink-0 rounded-lg p-0.5 bg-white/10 border border-emerald-500/30 shadow-xs"
                onError={(e) => {
                  e.currentTarget.src = '/logo.png';
                }}
              />
              <div>
                <span className="font-cinzel text-base font-bold text-white block">
                  Online Quran Teaching
                </span>
                <span className="text-xs text-amber-300/90 font-medium">
                  Muhammad Tariq — Online Quran Teacher
                </span>
              </div>
            </div>

            <div className="text-xs text-emerald-400 font-medium pt-1 space-x-2">
              <span>Qualification: Hafiz-e-Quran</span>
              <span>·</span>
              <span>Experience: 5 Years</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Quick Navigation
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home', 'class-timings')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Class Timings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('admission')}
                  className="hover:text-amber-300 text-emerald-400 font-semibold transition-colors cursor-pointer"
                >
                  Admission Portal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('courses', 'contact-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: WhatsApp Contact */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              WhatsApp Contact
            </div>
            <a
              href={TEACHER_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-white hover:text-emerald-400 transition-colors font-medium"
            >
              <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
              <span>+92 333 6163006</span>
              <ExternalLink className="w-3 h-3 text-stone-500" />
            </a>
            <p className="text-[11px] text-stone-500">
              Direct message to Muhammad Tariq for inquiries and timings.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Muhammad Tariq — Online Quran Teacher. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              className="text-[11px] text-stone-600 hover:text-stone-400 transition-colors cursor-pointer"
              title="Admin Portal Access"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
