import React, { useState } from 'react';
import { Clock, Calendar, Sun, Moon, Info, ArrowRight, Globe } from 'lucide-react';
import { AcademySettings } from '../types';

export interface TimezoneOption {
  country: string;
  label: string;
  iana: string;
  flag?: string;
}

export const TIMEZONE_OPTIONS: TimezoneOption[] = [
  { country: 'Pakistan', label: 'Pakistan (PKT, UTC+5)', iana: 'Asia/Karachi', flag: '🇵🇰' },
  { country: 'United Kingdom', label: 'United Kingdom (GMT/BST)', iana: 'Europe/London', flag: '🇬🇧' },
  { country: 'USA Eastern', label: 'USA Eastern (EST/EDT)', iana: 'America/New_York', flag: '🇺🇸' },
  { country: 'USA Central', label: 'USA Central (CST/CDT)', iana: 'America/Chicago', flag: '🇺🇸' },
  { country: 'USA Pacific', label: 'USA Pacific (PST/PDT)', iana: 'America/Los_Angeles', flag: '🇺🇸' },
  { country: 'Canada Eastern', label: 'Canada Eastern (Toronto)', iana: 'America/Toronto', flag: '🇨🇦' },
  { country: 'UAE', label: 'UAE / Dubai (GST, UTC+4)', iana: 'Asia/Dubai', flag: '🇦🇪' },
  { country: 'Saudi Arabia', label: 'Saudi Arabia / Makkah (AST, UTC+3)', iana: 'Asia/Riyadh', flag: '🇸🇦' },
  { country: 'Central Europe', label: 'Central Europe (CET/CEST)', iana: 'Europe/Berlin', flag: '🇪🇺' },
  { country: 'Australia Eastern', label: 'Australia Eastern (Sydney)', iana: 'Australia/Sydney', flag: '🇦🇺' },
  { country: 'Malaysia', label: 'Malaysia (MYT, UTC+8)', iana: 'Asia/Kuala_Lumpur', flag: '🇲🇾' },
  { country: 'Singapore', label: 'Singapore (SGT, UTC+8)', iana: 'Asia/Singapore', flag: '🇸🇬' },
];

export const TIMEZONE_PRESETS = TIMEZONE_OPTIONS;

interface ScheduleSectionProps {
  onSelectScheduleForAdmission?: (scheduleText: string) => void;
  settings?: AcademySettings;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  onSelectScheduleForAdmission,
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('Asia/Karachi');

  // Compute local converted time for 10:00 AM PKT (05:00 UTC) and 10:00 PM PKT (17:00 UTC)
  const getConvertedTimes = (iana: string) => {
    try {
      const now = new Date();
      const morningUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 5, 0, 0));
      const eveningUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0));

      const timeFmt = new Intl.DateTimeFormat('en-US', {
        timeZone: iana,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      return {
        morning: timeFmt.format(morningUtc),
        evening: timeFmt.format(eveningUtc),
      };
    } catch {
      return { morning: '10:00 AM', evening: '10:00 PM' };
    }
  };

  const localTimes = getConvertedTimes(selectedZone);
  const isPakistan = selectedZone === 'Asia/Karachi';

  const handleSelectSlot = (slotText: string) => {
    if (onSelectScheduleForAdmission) {
      onSelectScheduleForAdmission(slotText);
    }
    const el = document.getElementById('apply-admission');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="class-timings" className="py-12 lg:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-emerald-800" />
            <span>Class Availability</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Online Class Timings
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed text-balance">
            Classes are conducted 1-on-1 with flexible schedule arrangements based on Pakistan Standard Time (PKT, UTC+5).
          </p>
        </div>

        {/* Clean, Simple 3-Column Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Available Days & Weekly Off */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-200/80 shadow-2xs">
                <Calendar className="w-6 h-6 text-emerald-900" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 block">
                  Weekly Schedule
                </span>
                <h3 className="font-cinzel text-xl font-bold text-stone-900">
                  Saturday to Thursday
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Regular classes are held 6 days a week with consistent attendance.
                </p>
              </div>
            </div>

            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs text-amber-950 font-medium">
              <span className="font-bold">Weekly Day Off:</span> Friday — Jumma Mubarak
            </div>
          </div>

          {/* Card 2: Morning Session */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6 group hover:border-emerald-800/40 hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center border border-amber-200/80 shadow-2xs">
                <Sun className="w-6 h-6 text-amber-700" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 block">
                  Morning Session
                </span>
                <h3 className="font-cinzel text-xl font-bold text-stone-900">
                  After Fajr – 10:00 AM PKT
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Recommended for early morning revision, Qaida practice, and students with daytime flexibility.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSelectSlot('Morning Session (After Fajr – 10:00 AM PKT)')}
              className="w-full py-2.5 px-4 text-xs font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Choose Morning Session</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-800" />
            </button>
          </div>

          {/* Card 3: Evening Session */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6 group hover:border-emerald-800/40 hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center shadow-2xs">
                <Moon className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 block">
                  Evening Session
                </span>
                <h3 className="font-cinzel text-xl font-bold text-stone-900">
                  After Maghrib – 10:00 PM PKT
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Convenient for school-age students, working adults, and international learners.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSelectSlot('Evening Session (After Maghrib – 10:00 PM PKT)')}
              className="w-full py-2.5 px-4 text-xs font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Choose Evening Session</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-800" />
            </button>
          </div>
        </div>

        {/* Note on Prayer Times & Confirmation */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/90 text-xs text-emerald-950 flex items-start gap-3">
          <Info className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Note:</strong> Session starting times depend on local prayer times in Pakistan. All class requests are subject to confirmation by Muhammad Tariq.
          </p>
        </div>

        {/* Compact, Optional Timezone Assistant */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs max-w-2xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900">
            <Globe className="w-4 h-4 text-emerald-800" />
            <span>International Students: Check Your Local Time</span>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="timezone-select" className="text-xs text-stone-600 font-medium block">
              Select your country or time zone:
            </label>
            <select
              id="timezone-select"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 bg-stone-50 text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
            >
              {TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz.iana} value={tz.iana}>
                  {tz.flag} {tz.label}
                </option>
              ))}
            </select>
          </div>

          {!isPakistan && (
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-700 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-stone-500 block text-[11px]">Morning Session in your local time:</span>
                <span className="font-bold text-emerald-950 text-sm">~{localTimes.morning}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Evening Session in your local time:</span>
                <span className="font-bold text-emerald-950 text-sm">~{localTimes.evening}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
