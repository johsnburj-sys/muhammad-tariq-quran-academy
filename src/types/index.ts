export type UserRole = 'admin' | 'user';
export type AccountStatus = 'active' | 'deactivated';
export type InquiryStatus = 'pending' | 'contacted' | 'enrolled' | 'archived';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  avatar?: string;
  authProvider?: 'password' | 'google';
  phone?: string;
  currentLevel?: string;
  preferredTimings?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  arabicTitle: string;
  level: string;
  summary: string;
  bullets: string[];
  isPublished: boolean;
  order: number;
  image?: string;
  fees?: string;
  schedule?: string;
}

export interface AdmissionInquiry {
  id: string;
  name: string;
  parentName?: string;
  country?: string;
  email?: string;
  phone?: string;
  courseName: string;
  ageGroup?: string;
  experience?: string;
  preferredTiming?: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  notes?: string;
}

export interface AcademySettings {
  academyName: string;
  teacherName: string;
  teacherTitle: string;
  qualification: string;
  experience: string;
  aboutText: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  whatsappDefaultMessage: string;
  emailContact: string;
  // Class configuration
  classDuration: string;
  availableDays: string;
  classTimings: string;
  lessonType: string;
  courseFees: string;
  languagesSpoken: string;
  isPublished: boolean;
  topAnnouncementBarEnabled?: boolean;
  topAnnouncementSpeed?: 'slow' | 'normal' | 'static';
  educationalStripEnabled?: boolean;
  // Schedule & Availability custom configurations
  morningSessionTitle?: string;
  morningSessionTime?: string;
  morningSessionDesc?: string;
  eveningSessionTitle?: string;
  eveningSessionTime?: string;
  eveningSessionDesc?: string;
  weeklyDayOff?: string;
  scheduleNotice?: string;
  exceptionalClosure?: string;
  lastUpdated: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  category: 'content' | 'course' | 'user' | 'inquiry' | 'auth';
}
