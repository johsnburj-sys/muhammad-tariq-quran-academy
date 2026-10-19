import React, { useState, useEffect } from 'react';
import {
  User,
  Users,
  Phone,
  Globe,
  BookOpen,
  Clock,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import { WhatsAppIcon } from './ContactSection';
import { storage } from '../services/storage';

interface HomeAdmissionBoxProps {
  initialCourse?: string;
  initialLevel?: string;
  initialTime?: string;
}

export const HomeAdmissionBox: React.FC<HomeAdmissionBoxProps> = ({
  initialCourse,
  initialLevel,
  initialTime,
}) => {
  // Fields MUST start empty per instructions
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    whatsappNumber: '',
    country: '',
    course: initialCourse || '',
    ageGroup: '',
    learningLevel: initialLevel || '',
    preferredTime: initialTime || '',
    message: '',
  });

  const [errors, setErrors] = useState<{
    studentName?: string;
    whatsappNumber?: string;
    course?: string;
    ageGroup?: string;
  }>({});

  const [submittedLink, setSubmittedLink] = useState<string | null>(null);

  // Sync props changes if user clicks a course card or schedule
  useEffect(() => {
    if (initialCourse || initialLevel || initialTime) {
      setFormData((prev) => ({
        ...prev,
        course: initialCourse || prev.course,
        learningLevel: initialLevel || prev.learningLevel,
        preferredTime: initialTime || prev.preferredTime,
      }));
    }
  }, [initialCourse, initialLevel, initialTime]);

  const validate = () => {
    const errs: typeof errors = {};

    if (!formData.studentName.trim()) {
      errs.studentName = "Please enter the student's full name";
    } else if (formData.studentName.trim().length < 2) {
      errs.studentName = 'Name must be at least 2 characters';
    }

    if (!formData.whatsappNumber.trim()) {
      errs.whatsappNumber = 'Please enter WhatsApp number with country code';
    } else if (formData.whatsappNumber.trim().replace(/\D/g, '').length < 7) {
      errs.whatsappNumber = 'Please enter a valid phone number with country code';
    }

    if (!formData.course) {
      errs.course = 'Please select a course';
    }

    if (!formData.ageGroup) {
      errs.ageGroup = 'Please select the student age group';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const constructWhatsAppMessage = () => {
    let msg = `Assalam-o-Alaikum Muhammad Tariq,\nI would like to apply for online Quran classes:\n`;
    msg += `• Student Name: ${formData.studentName.trim()}\n`;
    if (formData.parentName.trim()) {
      msg += `• Parent/Guardian: ${formData.parentName.trim()}\n`;
    }
    msg += `• WhatsApp: ${formData.whatsappNumber.trim()}\n`;
    if (formData.country.trim()) {
      msg += `• Country / Timezone: ${formData.country.trim()}\n`;
    }
    msg += `• Course: ${formData.course}\n`;
    msg += `• Age Group: ${formData.ageGroup}\n`;
    if (formData.learningLevel) {
      msg += `• Learning Level: ${formData.learningLevel}\n`;
    }
    if (formData.preferredTime.trim()) {
      msg += `• Preferred Class Time: ${formData.preferredTime.trim()}\n`;
    }
    if (formData.message.trim()) {
      msg += `• Message: ${formData.message.trim()}\n`;
    }
    msg += `\nPlease discuss suitable class timings with me. JazakAllah Khair.`;
    return msg;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = constructWhatsAppMessage();
    const encodedUrl = `https://wa.me/923336163006?text=${encodeURIComponent(message)}`;

    // Store inquiry in local storage so Admin Panel maintains full visibility
    try {
      storage.submitInquiry({
        name: formData.studentName.trim(),
        parentName: formData.parentName.trim() || undefined,
        phone: formData.whatsappNumber.trim(),
        country: formData.country.trim() || undefined,
        courseName: formData.course,
        ageGroup: formData.ageGroup,
        experience: formData.learningLevel || undefined,
        preferredTiming: formData.preferredTime.trim() || undefined,
        message: formData.message.trim() || 'Online admission request',
      });
    } catch {
      // Non-fatal
    }

    setSubmittedLink(encodedUrl);

    // Direct user to WhatsApp
    const win = window.open(encodedUrl, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.href = encodedUrl;
    }
  };

  return (
    <section id="apply-admission" className="py-12 lg:py-16 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-950 via-[#064E3B] to-emerald-950 p-8 sm:p-10 text-white text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <span>Online Quran Admission</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Start Your Quran Learning Journey
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
              Interested in learning the Quran online? Share your details and preferred course. Muhammad Tariq will discuss suitable class timings with you on WhatsApp.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 1. Student's Full Name (Required) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Student's Full Name</span>
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => {
                    setFormData({ ...formData, studentName: e.target.value });
                    if (errors.studentName) setErrors({ ...errors, studentName: undefined });
                  }}
                  placeholder="Enter student's full name"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-stone-50/50 text-stone-900 placeholder-stone-400 focus:bg-white transition-all ${
                    errors.studentName
                      ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                      : 'border-stone-300 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20'
                  } focus:outline-hidden`}
                />
                {errors.studentName && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.studentName}</span>
                  </p>
                )}
              </div>

              {/* 2. Parent/Guardian Name (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Parent / Guardian Name</span>
                    <span className="text-stone-400 font-normal">(Optional)</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="For children or teen students"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 bg-stone-50/50 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 focus:outline-hidden transition-all"
                />
              </div>

              {/* 3. WhatsApp Number with Country Code (Required) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-800" />
                    <span>WhatsApp Number with Country Code</span>
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={(e) => {
                    setFormData({ ...formData, whatsappNumber: e.target.value });
                    if (errors.whatsappNumber) setErrors({ ...errors, whatsappNumber: undefined });
                  }}
                  placeholder="e.g. +44 7123 456789 or +92 300 1234567"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-stone-50/50 text-stone-900 placeholder-stone-400 focus:bg-white transition-all ${
                    errors.whatsappNumber
                      ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                      : 'border-stone-300 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20'
                  } focus:outline-hidden`}
                />
                {errors.whatsappNumber && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.whatsappNumber}</span>
                  </p>
                )}
              </div>

              {/* 4. Country or Time Zone (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Country or Time Zone</span>
                    <span className="text-stone-400 font-normal">(Optional)</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g. United Kingdom, USA (EST), UAE, Pakistan"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 bg-stone-50/50 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 focus:outline-hidden transition-all"
                />
              </div>

              {/* 5. Select Course (Required) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Select Course</span>
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => {
                    setFormData({ ...formData, course: e.target.value });
                    if (errors.course) setErrors({ ...errors, course: undefined });
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-stone-50/50 text-stone-900 focus:bg-white transition-all ${
                    errors.course
                      ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                      : 'border-stone-300 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20'
                  } focus:outline-hidden`}
                >
                  <option value="">-- Choose Course --</option>
                  <option value="Noorani Qaida">Noorani Qaida (Beginners)</option>
                  <option value="Quran Reading (Nazra)">Quran Reading (Nazra)</option>
                  <option value="Quran with Tajweed">Quran with Tajweed</option>
                </select>
                {errors.course && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.course}</span>
                  </p>
                )}
              </div>

              {/* 6. Student Age Group (Required) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Student Age Group</span>
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  value={formData.ageGroup}
                  onChange={(e) => {
                    setFormData({ ...formData, ageGroup: e.target.value });
                    if (errors.ageGroup) setErrors({ ...errors, ageGroup: undefined });
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-stone-50/50 text-stone-900 focus:bg-white transition-all ${
                    errors.ageGroup
                      ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                      : 'border-stone-300 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20'
                  } focus:outline-hidden`}
                >
                  <option value="">-- Select Age Group --</option>
                  <option value="Child (under 12)">Child (under 12)</option>
                  <option value="Teenager (13–18)">Teenager (13–18)</option>
                  <option value="Adult (18+)">Adult (18+)</option>
                </select>
                {errors.ageGroup && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.ageGroup}</span>
                  </p>
                )}
              </div>

              {/* 7. Current Learning Level (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                  <span>Current Learning Level</span>
                  <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <select
                  value={formData.learningLevel}
                  onChange={(e) => setFormData({ ...formData, learningLevel: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 bg-stone-50/50 text-stone-900 focus:bg-white focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 focus:outline-hidden transition-all"
                >
                  <option value="">-- Select Current Level --</option>
                  <option value="Complete Beginner (Never studied Arabic)">Complete Beginner (Never studied Arabic)</option>
                  <option value="Basic Alphabet (Recognizes some letters)">Basic Alphabet (Recognizes some letters)</option>
                  <option value="Can Read Slowly (Needs practice)">Can Read Slowly (Needs practice)</option>
                  <option value="Reads Quran (Wants to learn Tajweed)">Reads Quran (Wants to learn Tajweed)</option>
                </select>
              </div>

              {/* 8. Preferred Class Time (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Preferred Class Time</span>
                    <span className="text-stone-400 font-normal">(Optional)</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  placeholder="e.g. Morning (PKT), Evening (PKT), or specific hours"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 bg-stone-50/50 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 focus:outline-hidden transition-all"
                />
              </div>
            </div>

            {/* 9. Additional Message (Optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Additional Message</span>
                  <span className="text-stone-400 font-normal">(Optional)</span>
                </span>
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write any question, prior experience, or preferred days..."
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 bg-stone-50/50 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 focus:outline-hidden transition-all"
              />
            </div>

            {/* Submission Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da850] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Submit & Discuss on WhatsApp</span>
              </button>
              <p className="text-[11px] text-stone-500 text-center mt-2">
                This prepares your inquiry directly for Muhammad Tariq (+92 333 6163006) so you can review and send it manually on WhatsApp.
              </p>
            </div>

            {/* Submitted Notice Card */}
            {submittedLink && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp message prepared!</span>
                </div>
                <p className="text-stone-600">
                  If WhatsApp did not open automatically, click below to review and send your inquiry:
                </p>
                <a
                  href={submittedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-950 underline"
                >
                  <span>Open WhatsApp Chat (+92 333 6163006)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
