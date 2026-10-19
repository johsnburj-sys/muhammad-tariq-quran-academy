import React, { useState } from 'react';
import {
  FileText,
  CheckCircle,
  Calendar,
  Clock,
  Shield,
  BookOpen,
  User,
  Users,
  Phone,
  Globe,
  MessageSquare,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Info,
} from 'lucide-react';
import { WhatsAppIcon } from './ContactSection';
import { storage } from '../services/storage';

interface AdmissionPortalProps {
  onNavigateHome: () => void;
  onNavigateCourses: () => void;
}

interface FormState {
  studentName: string;
  parentName: string;
  whatsappNumber: string;
  country: string;
  course: string;
  ageGroup: string;
  learningLevel: string;
  preferredTiming: string;
  message: string;
}

export const AdmissionPortal: React.FC<AdmissionPortalProps> = ({
  onNavigateHome,
  onNavigateCourses,
}) => {
  const [step, setStep] = useState<'form' | 'review'>('form');
  const [whatsAppOpened, setWhatsAppOpened] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormState>({
    studentName: '',
    parentName: '',
    whatsappNumber: '',
    country: '',
    course: '',
    ageGroup: '',
    learningLevel: '',
    preferredTiming: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const coursesList = [
    {
      id: 'noorani-qaida',
      name: 'Noorani Qaida',
      arabic: 'القاعدة النورانية',
      category: 'Foundation Level',
      desc: 'Arabic alphabet, phonetics, and letter joining with a structured beginner-friendly approach.',
    },
    {
      id: 'nazra',
      name: 'Quran Reading (Nazra)',
      arabic: 'تلاوة القرآن الكريم (ناظرة)',
      category: 'Fluency Level',
      desc: 'Accurate Holy Quran recitation, continuous teacher guidance, and fluency practice.',
    },
    {
      id: 'tajweed',
      name: 'Quran with Tajweed',
      arabic: 'علم التجويد وإتقان التلاوة',
      category: 'Advanced Recitation',
      desc: 'Authentic Tajweed rules, proper Makharij articulation, and beautified recitation.',
    },
  ];

  const validate = () => {
    const errs: Partial<Record<keyof FormState, string>> = {};

    if (!formData.studentName.trim()) {
      errs.studentName = "Student's full name is required.";
    } else if (formData.studentName.trim().length < 2) {
      errs.studentName = 'Name must be at least 2 characters.';
    }

    if (!formData.whatsappNumber.trim()) {
      errs.whatsappNumber = 'WhatsApp number with country code is required.';
    } else if (formData.whatsappNumber.trim().replace(/\D/g, '').length < 7) {
      errs.whatsappNumber = 'Please enter a valid phone number with international country code.';
    }

    if (!formData.country.trim()) {
      errs.country = 'Country or Time Zone is required for scheduling.';
    }

    if (!formData.course) {
      errs.course = 'Please select a Quran course.';
    }

    if (!formData.ageGroup) {
      errs.ageGroup = 'Please select the student age category.';
    }

    if (!formData.learningLevel) {
      errs.learningLevel = 'Please indicate current learning level.';
    }

    if (!formData.preferredTiming) {
      errs.preferredTiming = 'Please select a preferred class session timing.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector('.admission-error-field');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setStep('review');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const constructWhatsAppMessage = () => {
    let msg = `*Online Quran Teaching — Admission Application*\n`;
    msg += `Teacher: Muhammad Tariq (Hafiz-e-Quran)\n\n`;
    msg += `• Student Name: ${formData.studentName.trim()}\n`;
    if (formData.parentName.trim()) {
      msg += `• Parent / Guardian: ${formData.parentName.trim()}\n`;
    }
    msg += `• Contact Number: ${formData.whatsappNumber.trim()}\n`;
    if (formData.country.trim()) {
      msg += `• Country / Time Zone: ${formData.country.trim()}\n`;
    }
    msg += `• Selected Course: ${formData.course}\n`;
    msg += `• Age Group: ${formData.ageGroup}\n`;
    msg += `• Current Learning Level: ${formData.learningLevel}\n`;
    msg += `• Preferred Class Timing: ${formData.preferredTiming}\n`;
    if (formData.message.trim()) {
      msg += `• Additional Message: ${formData.message.trim()}\n`;
    }
    msg += `\nAssalam-o-Alaikum, I would like to submit my admission application for online Quran classes. Please let me know about schedule confirmation and availability. JazakAllah Khair.`;
    return msg;
  };

  const handleSubmitToWhatsApp = () => {
    if (!validate()) {
      setStep('form');
      setTimeout(() => {
        const firstError = document.querySelector('.admission-error-field');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }

    try {
      storage.submitInquiry({
        name: formData.studentName.trim(),
        parentName: formData.parentName.trim() || undefined,
        phone: formData.whatsappNumber.trim(),
        country: formData.country.trim(),
        courseName: formData.course,
        ageGroup: formData.ageGroup,
        experience: formData.learningLevel,
        preferredTiming: formData.preferredTiming,
        message: formData.message.trim() || 'Admission application submitted via WhatsApp.',
      });
    } catch {
      // client-side storage fallback
    }

    const message = constructWhatsAppMessage();
    const waUrl = `https://wa.me/923336163006?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setWhatsAppOpened(true);
  };

  const scrollToForm = () => {
    const el = document.getElementById('admission-application-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Official Educational Header Badge */}
        <div className="bg-white rounded-3xl border-2 border-emerald-900/20 shadow-md overflow-hidden">
          {/* Government / Institutional Top Ribbon */}
          <div className="bg-emerald-950 text-white px-6 py-3 border-b-2 border-amber-400 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-300" />
              <span className="font-semibold tracking-wider uppercase">
                Official Educational Admission Registry
              </span>
            </div>
            <div className="flex items-center gap-3 text-stone-300 font-mono text-[11px]">
              <span>Academic Session: 2026–2027</span>
              <span>·</span>
              <span>Director: Muhammad Tariq (Hafiz-e-Quran)</span>
            </div>
          </div>

          {/* Institutional Banner */}
          <div className="p-8 sm:p-10 lg:p-12 text-center bg-gradient-to-b from-emerald-950 via-[#064E3B] to-[#022C22] text-white relative">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="font-arabic text-2xl sm:text-3xl text-amber-300 block select-none" dir="rtl">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>

              <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Online Quran Teaching Admission Portal
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
                Centralized application registry for personalized 1-on-1 Quranic education under the direct supervision of Muhammad Tariq, Hafiz-e-Quran.
              </p>

              {/* Apply for Admission Button */}
              {step === 'form' && (
                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-emerald-950 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Apply for Admission</span>
                  </button>

                  <a
                    href="https://wa.me/923336163006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 transition-colors flex items-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                    <span>Inquire on WhatsApp (+92 333 6163006)</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Formal Class Availability Strip */}
          <div className="bg-stone-50 border-t border-stone-200 px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-emerald-800 shrink-0" />
              <div>
                <span className="font-bold text-stone-900 block">Class Availability:</span>
                <span className="text-stone-600">Saturday to Thursday (Friday Off)</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-emerald-800 shrink-0" />
              <div>
                <span className="font-bold text-stone-900 block">Morning Session:</span>
                <span className="text-stone-600">After Fajr – 10:00 AM PKT</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-emerald-800 shrink-0" />
              <div>
                <span className="font-bold text-stone-900 block">Evening Session:</span>
                <span className="text-stone-600">After Maghrib – 10:00 PM PKT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Available Courses Summary Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-900" />
              <span>Available Courses in this Admission Cycle</span>
            </h2>
            <span className="text-xs text-stone-500">1-on-1 Personalized Classes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coursesList.map((course) => (
              <div
                key={course.id}
                className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {course.category}
                  </span>
                  <h3 className="font-cinzel font-bold text-base text-stone-900 mt-2">
                    {course.name}
                  </h3>
                  <p className="font-arabic text-sm text-emerald-900 font-semibold" dir="rtl">
                    {course.arabic}
                  </p>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {course.desc}
                  </p>
                </div>
                <div className="pt-2 text-[11px] text-stone-500 border-t border-stone-100">
                  Individual lessons · Tailored progression
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: ADMISSION FORM */}
        {step === 'form' && (
          <div id="admission-application-form" className="bg-white rounded-3xl border border-stone-200/90 shadow-lg overflow-hidden">
            {/* Form Title Bar */}
            <div className="p-6 bg-stone-100/80 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
                  Prescribed Admission Application Form
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Please complete all mandatory fields marked with an asterisk (<span className="text-red-500">*</span>).
                </p>
              </div>
              <div className="px-3 py-1 bg-emerald-900 text-amber-300 text-xs font-mono font-bold rounded-lg border border-amber-400/30">
                Step 1 of 2: Data Entry
              </div>
            </div>

            <form onSubmit={handleProceedToReview} className="p-6 sm:p-10 space-y-8">
              {/* Part A: Applicant Identity */}
              <div className="space-y-4">
                <div className="border-b border-stone-200 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-emerald-800" />
                    <span>Part I: Student & Guardian Identification</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Student Name */}
                  <div className={`space-y-1.5 ${errors.studentName ? 'admission-error-field' : ''}`}>
                    <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                      <span>Student's Full Name <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => {
                        setFormData({ ...formData, studentName: e.target.value });
                        if (errors.studentName) setErrors({ ...errors, studentName: undefined });
                      }}
                      placeholder="e.g. Abdullah Khan / Fatima Zahra"
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

                  {/* Parent / Guardian Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                      <span>Parent / Guardian Name <span className="text-xs font-normal text-stone-400">(Optional for Adults)</span></span>
                    </label>
                    <input
                      type="text"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 bg-stone-50/50 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 focus:outline-hidden transition-all"
                    />
                  </div>

                  {/* WhatsApp Number */}
                  <div className={`space-y-1.5 ${errors.whatsappNumber ? 'admission-error-field' : ''}`}>
                    <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                      <span>WhatsApp Contact Number <span className="text-red-500">*</span></span>
                      <span className="text-[11px] text-stone-400 font-mono">Include country code</span>
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

                  {/* Country or Timezone */}
                  <div className={`space-y-1.5 ${errors.country ? 'admission-error-field' : ''}`}>
                    <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                      <span>Country of Residence / Time Zone <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => {
                        setFormData({ ...formData, country: e.target.value });
                        if (errors.country) setErrors({ ...errors, country: undefined });
                      }}
                      placeholder="e.g. United Kingdom (GMT), USA (EST), UAE, Pakistan (PKT)"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-stone-50/50 text-stone-900 placeholder-stone-400 focus:bg-white transition-all ${
                        errors.country
                          ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                          : 'border-stone-300 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20'
                      } focus:outline-hidden`}
                    />
                    {errors.country && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.country}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Part B: Course & Academic Level */}
              <div className="space-y-4">
                <div className="border-b border-stone-200 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-emerald-800" />
                    <span>Part II: Course Selection & Learning Assessment</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Select Course */}
                  <div className={`space-y-1.5 ${errors.course ? 'admission-error-field' : ''}`}>
                    <label className="text-xs font-semibold text-stone-800">
                      Selected Quran Course <span className="text-red-500">*</span>
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
                      <option value="Noorani Qaida">Noorani Qaida (Beginner Level)</option>
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

                  {/* Student Age Group */}
                  <div className={`space-y-1.5 ${errors.ageGroup ? 'admission-error-field' : ''}`}>
                    <label className="text-xs font-semibold text-stone-800">
                      Student Age Group <span className="text-red-500">*</span>
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
                      <option value="">-- Select Age Category --</option>
                      <option value="Child (under 12 years)">Child (under 12 years)</option>
                      <option value="Teenager (13–18 years)">Teenager (13–18 years)</option>
                      <option value="Adult (18+ years)">Adult (18+ years)</option>
                    </select>
                    {errors.ageGroup && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.ageGroup}</span>
                      </p>
                    )}
                  </div>

                  {/* Current Learning Level */}
                  <div className={`space-y-1.5 ${errors.learningLevel ? 'admission-error-field' : ''}`}>
                    <label className="text-xs font-semibold text-stone-800">
                      Current Learning Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.learningLevel}
                      onChange={(e) => {
                        setFormData({ ...formData, learningLevel: e.target.value });
                        if (errors.learningLevel) setErrors({ ...errors, learningLevel: undefined });
                      }}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-stone-50/50 text-stone-900 focus:bg-white transition-all ${
                        errors.learningLevel
                          ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                          : 'border-stone-300 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20'
                      } focus:outline-hidden`}
                    >
                      <option value="">-- Select Current Level --</option>
                      <option value="Complete Beginner (Never studied Arabic)">Complete Beginner (Never studied Arabic)</option>
                      <option value="Basic Alphabet (Recognizes some letters)">Basic Alphabet (Recognizes some letters)</option>
                      <option value="Can Read Words (Needs guided practice)">Can Read Words (Needs guided practice)</option>
                      <option value="Fluent Reciter (Wants to master Tajweed)">Fluent Reciter (Wants to master Tajweed)</option>
                    </select>
                    {errors.learningLevel && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.learningLevel}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Part C: Class Timing Preferences */}
              <div className="space-y-4">
                <div className="border-b border-stone-200 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-800" />
                    <span>Part III: Scheduling & Class Session Preference</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className={`space-y-1.5 ${errors.preferredTiming ? 'admission-error-field' : ''}`}>
                    <label className="text-xs font-semibold text-stone-800">
                      Preferred Class Session <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.preferredTiming}
                      onChange={(e) => {
                        setFormData({ ...formData, preferredTiming: e.target.value });
                        if (errors.preferredTiming) setErrors({ ...errors, preferredTiming: undefined });
                      }}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-stone-50/50 text-stone-900 focus:bg-white transition-all ${
                        errors.preferredTiming
                          ? 'border-red-400 focus:ring-2 focus:ring-red-400'
                          : 'border-stone-300 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20'
                      } focus:outline-hidden`}
                    >
                      <option value="">-- Select Session --</option>
                      <option value="Morning Session (After Fajr – 10:00 AM PKT)">Morning Session (After Fajr – 10:00 AM PKT)</option>
                      <option value="Evening Session (After Maghrib – 10:00 PM PKT)">Evening Session (After Maghrib – 10:00 PM PKT)</option>
                      <option value="Flexible (Discuss with Muhammad Tariq on WhatsApp)">Flexible (Discuss with Muhammad Tariq on WhatsApp)</option>
                    </select>
                    {errors.preferredTiming && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.preferredTiming}</span>
                      </p>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Policy Note:</strong> Classes are conducted Saturday to Thursday. Friday is observed as a weekly off for Jumma Mubarak. Starting times depend on local prayer times in Pakistan and require confirmation by Muhammad Tariq.
                    </p>
                  </div>
                </div>

                {/* Additional Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-800 flex items-center justify-between">
                    <span>Additional Remarks or Special Requirements <span className="text-xs font-normal text-stone-400">(Optional)</span></span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide any prior learning history, specific goals, preferred days of the week, or questions..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 bg-stone-50/50 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 focus:outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
                >
                  ← Return to Home Page
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Review Application Details</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: REVIEW & SUBMIT APPLICATION */}
        {step === 'review' && (
          <div className="bg-white rounded-3xl border-2 border-emerald-900/30 shadow-xl overflow-hidden">
            {/* Review Title Bar */}
            <div className="p-6 bg-emerald-950 text-white flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">
                  Admission Review
                </span>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold">
                  Submit Your Admission Application
                </h2>
              </div>
              <div className="px-3 py-1 bg-amber-400 text-stone-950 text-xs font-mono font-bold rounded-lg shadow-xs">
                Step 2 of 2: Review & Submit
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-8">
              {/* Review Description */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
                <Info className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  Please review your admission details carefully. When you are ready, submit your application request directly to Muhammad Tariq through WhatsApp.
                </p>
              </div>

              {/* Review Table Docket */}
              <div className="border border-stone-300 rounded-2xl overflow-hidden divide-y divide-stone-200 bg-stone-50/60 shadow-2xs">
                <div className="p-4 bg-stone-100 flex items-center justify-between text-xs font-bold text-stone-800 uppercase tracking-wider">
                  <span>Application Field</span>
                  <span>Submitted Value</span>
                </div>

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-stone-500 font-medium">Student's Full Name:</span>
                  <span className="font-bold text-stone-900 text-sm">{formData.studentName}</span>
                </div>

                {formData.parentName && (
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <span className="text-stone-500 font-medium">Parent / Guardian:</span>
                    <span className="font-semibold text-stone-900">{formData.parentName}</span>
                  </div>
                )}

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-stone-500 font-medium">WhatsApp Contact Number:</span>
                  <span className="font-mono font-bold text-emerald-900 text-sm">{formData.whatsappNumber}</span>
                </div>

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-stone-500 font-medium">Country / Time Zone:</span>
                  <span className="font-semibold text-stone-900">{formData.country}</span>
                </div>

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-stone-500 font-medium">Applied Quran Course:</span>
                  <span className="font-bold text-emerald-950 bg-emerald-100/70 px-2.5 py-1 rounded-md border border-emerald-200">
                    {formData.course}
                  </span>
                </div>

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-stone-500 font-medium">Student Age Category:</span>
                  <span className="font-semibold text-stone-900">{formData.ageGroup}</span>
                </div>

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-stone-500 font-medium">Current Learning Level:</span>
                  <span className="font-semibold text-stone-900">{formData.learningLevel}</span>
                </div>

                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-stone-500 font-medium">Preferred Class Timing:</span>
                  <span className="font-semibold text-stone-900">{formData.preferredTiming}</span>
                </div>

                {formData.message && (
                  <div className="p-4 flex flex-col gap-1 text-xs">
                    <span className="text-stone-500 font-medium">Additional Message:</span>
                    <span className="text-stone-800 italic bg-white p-2.5 rounded-lg border border-stone-200">
                      "{formData.message}"
                    </span>
                  </div>
                )}
              </div>

              {/* WhatsApp Opened Status Notification */}
              {whatsAppOpened && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-1">
                  <p className="font-bold flex items-center gap-2 text-emerald-900">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    <span>WhatsApp Chat Opened</span>
                  </p>
                  <p className="leading-relaxed">
                    Your application message has been formatted and pre-filled in WhatsApp. Please review the details in your WhatsApp chat and press <strong>Send</strong> to submit your request directly to Muhammad Tariq (+92 333 6163006).
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Modify Information</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitToWhatsApp}
                  className="px-7 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da850] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                  <span>Submit Admission Application on WhatsApp</span>
                  <ExternalLink className="w-4 h-4 opacity-90" />
                </button>
              </div>

              {/* Submission Transparency Note */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 leading-relaxed text-center sm:text-left">
                <strong>Submission Note:</strong> Clicking the green button opens your WhatsApp application or web client with your details prefilled for Muhammad Tariq (+92 333 6163006). You will be able to review the message before pressing send. Opening WhatsApp does not automatically submit, save, or approve the application.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
