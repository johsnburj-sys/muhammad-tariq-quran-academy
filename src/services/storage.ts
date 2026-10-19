import {
  User,
  Course,
  AdmissionInquiry,
  AcademySettings,
  ActivityItem,
} from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'tariq_quran_settings',
  COURSES: 'tariq_quran_courses',
  USERS: 'tariq_quran_users',
  INQUIRIES: 'tariq_quran_inquiries',
  LOGS: 'tariq_quran_logs',
  SESSION: 'tariq_quran_session',
};

// Initial default settings strictly conforming to PRD verified details
export const DEFAULT_SETTINGS: AcademySettings = {
  academyName: 'Muhammad Tariq — Online Quran Teacher',
  teacherName: 'Muhammad Tariq',
  teacherTitle: 'Online Quran Teacher',
  qualification: 'Hafiz-e-Quran',
  experience: '5 years of Quran teaching experience',
  aboutText:
    'I am Muhammad Tariq, a Hafiz-e-Quran with five years of teaching experience. I teach Noorani Qaida, Quran reading (Nazra), and Tajweed. My aim is to help students develop their Quran reading skills through clear instruction, regular practice, and guidance suited to their learning level.',
  whatsappNumber: '923336163006',
  whatsappDisplay: '+92 333 6163006',
  whatsappDefaultMessage:
    'Assalam-o-Alaikum Muhammad Tariq. I am interested in your online Quran classes. Please share the course details, fees, and available timings.',
  emailContact: '[Email Address Required]',
  classDuration: '[To be provided]',
  availableDays: '[To be provided]',
  classTimings: '[To be provided]',
  lessonType: '[To be provided]',
  courseFees: '[To be provided]',
  languagesSpoken: '[To be provided]',
  topAnnouncementBarEnabled: true,
  topAnnouncementSpeed: 'slow',
  educationalStripEnabled: true,
  morningSessionTitle: 'Morning Session',
  morningSessionTime: 'After Fajr – 10:00 AM PKT',
  morningSessionDesc: 'Ideal for early morning Quran learning, memorization review, and beginner recitation.',
  eveningSessionTitle: 'Evening Session',
  eveningSessionTime: 'After Maghrib – 10:00 PM PKT',
  eveningSessionDesc: "A convenient option for school-age learners, adults, and international students whose local time aligns with the teacher's availability.",
  weeklyDayOff: 'Friday',
  scheduleNotice: 'Personalized 1-on-1 Quran classes are conducted Saturday through Thursday according to Pakistan Standard Time (PKT). Friday is reserved as the weekly day off for Jumma Mubarak.',
  exceptionalClosure: '',
  isPublished: true,
  lastUpdated: new Date().toISOString(),
};

// Initial default courses
export const DEFAULT_COURSES: Course[] = [
  {
    id: 'noorani-qaida',
    title: 'Noorani Qaida',
    arabicTitle: 'القاعدة النورانية',
    level: 'Beginner Level',
    summary:
      'Foundational course designed to build solid Arabic phonetics and reading skills from scratch.',
    bullets: [
      'Suitable for beginners.',
      'Learn Arabic letters and their sounds.',
      'Practice letter recognition and joining letters.',
      'Progress gradually toward Quran reading.',
    ],
    isPublished: true,
    order: 1,
  },
  {
    id: 'nazra',
    title: 'Quran Reading (Nazra)',
    arabicTitle: 'تلاوة القرآن الكريم (ناظرة)',
    level: 'Intermediate Level',
    summary:
      'Comprehensive reading of the Holy Quran with continuous teacher guidance and fluency development.',
    bullets: [
      'Learn to read the Holy Quran.',
      'Practice fluency and correct pronunciation.',
      'Improve reading through guided lessons and revision.',
    ],
    isPublished: true,
    order: 2,
  },
  {
    id: 'tajweed',
    title: 'Tajweed',
    arabicTitle: 'علم التجويد وإتقان التلاوة',
    level: 'All Levels & Advanced',
    summary:
      'Mastering the rules of Tajweed to recite the Holy Quran with beautified, accurate articulation.',
    bullets: [
      'Learn the rules of Quran recitation.',
      'Practice correct pronunciation and articulation.',
      'Improve recitation through teacher guidance.',
    ],
    isPublished: true,
    order: 3,
  },
];

// Initial default users (Authorized Academy Administrators)
const DEFAULT_USERS: (User & { passwordHash: string })[] = [
  {
    id: 'usr-admin-01',
    name: 'Muhammad Tariq (Lead Teacher & Admin)',
    email: 'admin@tariqquran.com',
    role: 'admin',
    status: 'active',
    phone: '+92 333 6163006',
    passwordHash: 'admin123',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'usr-admin-02',
    name: 'Academy Coordinator (Staff Admin)',
    email: 'coordinator@tariqquran.com',
    role: 'admin',
    status: 'active',
    phone: '+92 333 6163006',
    passwordHash: 'staff123',
    createdAt: '2026-02-15T00:00:00.000Z',
  },
];

// Initial default inquiries
const DEFAULT_INQUIRIES: AdmissionInquiry[] = [
  {
    id: 'inq-101',
    name: 'Brother Omar Khan',
    email: 'omar.khan@example.com',
    phone: '+44 7700 900123',
    courseName: 'Noorani Qaida',
    ageGroup: 'Children (5-9 years)',
    preferredTiming: 'Afternoon',
    message: 'Looking for Quran reading classes for my 7-year-old son.',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    notes: 'Father requested weekend trial lesson.',
  },
  {
    id: 'inq-102',
    name: 'Sister Maryam',
    email: 'maryam.s@example.com',
    phone: '+1 415 555 2671',
    courseName: 'Tajweed',
    ageGroup: 'Adults (18+ years)',
    preferredTiming: 'Evening',
    message: 'Want to perfect Makharij and recitation rules with teacher Tariq.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    notes: 'Contacted via WhatsApp, confirmed time slot.',
  },
];

class StorageService {
  private subscribers: (() => void)[] = [];

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(DEFAULT_COURSES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(DEFAULT_INQUIRIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LOGS)) {
      const initialLogs: ActivityItem[] = [
        {
          id: 'log-1',
          action: 'Academy website initialized with verified teacher profile',
          actor: 'System',
          timestamp: new Date().toISOString(),
          category: 'content',
        },
      ];
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(initialLogs));
    }
  }

  public subscribe(callback: () => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== callback);
    };
  }

  private notify() {
    this.subscribers.forEach((fn) => fn());
  }

  private log(action: string, actor: string, category: ActivityItem['category']) {
    try {
      const logs = this.getLogs();
      const newLog: ActivityItem = {
        id: 'log-' + Date.now(),
        action,
        actor,
        timestamp: new Date().toISOString(),
        category,
      };
      logs.unshift(newLog);
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs.slice(0, 50)));
    } catch (e) {
      console.error('Failed to write log', e);
    }
  }

  // --- Settings & Content ---
  public getSettings(): AcademySettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public updateSettings(newSettings: Partial<AcademySettings>, actorName = 'Admin'): boolean {
    try {
      const current = this.getSettings();
      const updated: AcademySettings = {
        ...current,
        ...newSettings,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      this.log(`Updated website content & settings`, actorName, 'content');
      this.notify();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public resetToDefaultContent(actorName = 'Admin'): boolean {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(DEFAULT_COURSES));
      this.log('Restored default website content & courses', actorName, 'content');
      this.notify();
      return true;
    } catch {
      return false;
    }
  }

  // --- Courses ---
  public getCourses(onlyPublished = false): Course[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COURSES);
      const courses: Course[] = data ? JSON.parse(data) : DEFAULT_COURSES;
      const sorted = [...courses].sort((a, b) => a.order - b.order);
      return onlyPublished ? sorted.filter((c) => c.isPublished) : sorted;
    } catch {
      return DEFAULT_COURSES;
    }
  }

  public saveCourse(courseData: Partial<Course> & { title: string }, actorName = 'Admin'): Course | null {
    try {
      const courses = this.getCourses();
      if (courseData.id) {
        // Edit existing
        const idx = courses.findIndex((c) => c.id === courseData.id);
        if (idx === -1) return null;
        courses[idx] = { ...courses[idx], ...courseData };
        localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
        this.log(`Updated course "${courseData.title}"`, actorName, 'course');
        this.notify();
        return courses[idx];
      } else {
        // Create new
        const newCourse: Course = {
          id: 'course-' + Date.now(),
          title: courseData.title,
          arabicTitle: courseData.arabicTitle || '',
          level: courseData.level || 'All Levels',
          summary: courseData.summary || '',
          bullets: courseData.bullets || [],
          isPublished: courseData.isPublished ?? true,
          order: courses.length + 1,
          fees: courseData.fees,
          schedule: courseData.schedule,
        };
        courses.push(newCourse);
        localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
        this.log(`Created new course "${newCourse.title}"`, actorName, 'course');
        this.notify();
        return newCourse;
      }
    } catch {
      return null;
    }
  }

  public toggleCoursePublish(courseId: string, actorName = 'Admin'): boolean {
    try {
      const courses = this.getCourses();
      const c = courses.find((x) => x.id === courseId);
      if (!c) return false;
      c.isPublished = !c.isPublished;
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
      this.log(`${c.isPublished ? 'Published' : 'Unpublished'} course "${c.title}"`, actorName, 'course');
      this.notify();
      return true;
    } catch {
      return false;
    }
  }

  public deleteCourse(courseId: string, actorName = 'Admin'): boolean {
    try {
      const courses = this.getCourses();
      const target = courses.find((c) => c.id === courseId);
      if (!target) return false;
      const filtered = courses.filter((c) => c.id !== courseId);
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(filtered));
      this.log(`Deleted course "${target.title}"`, actorName, 'course');
      this.notify();
      return true;
    } catch {
      return false;
    }
  }

  public reorderCourse(courseId: string, direction: 'up' | 'down', actorName = 'Admin'): boolean {
    try {
      const courses = this.getCourses();
      const idx = courses.findIndex((c) => c.id === courseId);
      if (idx === -1) return false;
      if (direction === 'up' && idx === 0) return false;
      if (direction === 'down' && idx === courses.length - 1) return false;

      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      const temp = courses[idx];
      courses[idx] = courses[targetIdx];
      courses[targetIdx] = temp;

      courses.forEach((c, i) => {
        c.order = i + 1;
      });

      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
      this.notify();
      return true;
    } catch {
      return false;
    }
  }

  // --- Admission Inquiries ---
  public getInquiries(): AdmissionInquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return data ? JSON.parse(data) : DEFAULT_INQUIRIES;
    } catch {
      return DEFAULT_INQUIRIES;
    }
  }

  public submitInquiry(inquiryData: Omit<AdmissionInquiry, 'id' | 'status' | 'createdAt'>): AdmissionInquiry {
    const inquiries = this.getInquiries();
    const newInquiry: AdmissionInquiry = {
      ...inquiryData,
      id: 'inq-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    inquiries.unshift(newInquiry);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    this.log(`New admission inquiry from ${inquiryData.name} for ${inquiryData.courseName}`, inquiryData.name, 'inquiry');
    this.notify();
    return newInquiry;
  }

  public updateInquiryStatus(inquiryId: string, status: AdmissionInquiry['status'], notes?: string, actorName = 'Admin'): boolean {
    try {
      const inquiries = this.getInquiries();
      const inq = inquiries.find((i) => i.id === inquiryId);
      if (!inq) return false;
      inq.status = status;
      if (notes !== undefined) inq.notes = notes;
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
      this.log(`Updated inquiry #${inquiryId} status to "${status}"`, actorName, 'inquiry');
      this.notify();
      return true;
    } catch {
      return false;
    }
  }

  public deleteInquiry(inquiryId: string, actorName = 'Admin'): boolean {
    try {
      const inquiries = this.getInquiries();
      const filtered = inquiries.filter((i) => i.id !== inquiryId);
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(filtered));
      this.log(`Deleted inquiry #${inquiryId}`, actorName, 'inquiry');
      this.notify();
      return true;
    } catch {
      return false;
    }
  }

  // --- Users & Authentication ---
  public getUsers(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      const raw = data ? JSON.parse(data) : DEFAULT_USERS;
      return raw.map(({ passwordHash, ...user }: any) => user);
    } catch {
      return DEFAULT_USERS.map(({ passwordHash, ...user }) => user);
    }
  }

  public login(email: string, password: string): { success: boolean; user?: User; error?: string } {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      const users: (User & { passwordHash: string })[] = data ? JSON.parse(data) : DEFAULT_USERS;
      const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

      if (!found) {
        return { success: false, error: 'No account found with this email address.' };
      }

      if (found.status === 'deactivated') {
        return { success: false, error: 'This account has been deactivated by the administrator.' };
      }

      if (found.passwordHash !== password) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }

      const { passwordHash, ...safeUser } = found;
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(safeUser));
      this.log(`User logged in: ${safeUser.name} (${safeUser.role})`, safeUser.name, 'auth');
      this.notify();
      return { success: true, user: safeUser };
    } catch {
      return { success: false, error: 'Login service encountered an unexpected error.' };
    }
  }

  public register(
    data: { name: string; email: string; password: string; phone?: string; currentLevel?: string; preferredTimings?: string }
  ): { success: boolean; user?: User; error?: string } {
    try {
      const usersData = localStorage.getItem(STORAGE_KEYS.USERS);
      const users: (User & { passwordHash: string })[] = usersData ? JSON.parse(usersData) : DEFAULT_USERS;

      if (users.some((u) => u.email.toLowerCase() === data.email.trim().toLowerCase())) {
        return { success: false, error: 'An account with this email already exists.' };
      }

      const newUser: User & { passwordHash: string } = {
        id: 'usr-' + Date.now(),
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        role: 'user', // Ordinary users can NEVER register as admin
        status: 'active',
        phone: data.phone?.trim(),
        currentLevel: data.currentLevel || 'Beginner',
        preferredTimings: data.preferredTimings || 'Flexible',
        passwordHash: data.password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      const { passwordHash, ...safeUser } = newUser;
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(safeUser));
      this.log(`New student registered: ${safeUser.name}`, safeUser.name, 'auth');
      this.notify();
      return { success: true, user: safeUser };
    } catch {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }

  public handleGoogleAuth(googleUser: {
    name: string;
    email: string;
    avatar?: string;
    uid?: string;
  }): { success: boolean; user?: User; error?: string; isNewUser?: boolean } {
    try {
      const usersData = localStorage.getItem(STORAGE_KEYS.USERS);
      const users: (User & { passwordHash?: string })[] = usersData ? JSON.parse(usersData) : DEFAULT_USERS;
      const cleanEmail = googleUser.email.trim().toLowerCase();

      const existingIndex = users.findIndex((u) => u.email.toLowerCase() === cleanEmail);

      if (existingIndex >= 0) {
        const existing = users[existingIndex];
        if (existing.status === 'deactivated') {
          return { success: false, error: 'This account has been deactivated by the administrator.' };
        }
        if (googleUser.avatar && !existing.avatar) {
          existing.avatar = googleUser.avatar;
        }
        existing.authProvider = 'google';
        users[existingIndex] = existing;
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

        const { passwordHash, ...safeUser } = existing;
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(safeUser));
        this.log(`User logged in with Google: ${safeUser.name} (${safeUser.role})`, safeUser.name, 'auth');
        this.notify();
        return { success: true, user: safeUser, isNewUser: false };
      }

      // New user registration via Google
      const newUser: User & { passwordHash?: string } = {
        id: googleUser.uid ? `usr-g-${googleUser.uid.slice(0, 8)}` : `usr-g-${Date.now()}`,
        name: googleUser.name.trim() || cleanEmail.split('@')[0],
        email: cleanEmail,
        avatar: googleUser.avatar,
        role: 'user', // Security: Google sign-in registers as user
        status: 'active',
        authProvider: 'google',
        currentLevel: 'Beginner',
        preferredTimings: 'Flexible',
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      const { passwordHash, ...safeUser } = newUser;
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(safeUser));
      this.log(`New student registered via Google: ${safeUser.name}`, safeUser.name, 'auth');
      this.notify();
      return { success: true, user: safeUser, isNewUser: true };
    } catch {
      return { success: false, error: 'Google authentication could not be completed.' };
    }
  }

  public getCurrentSession(): User | null {
    try {
      const session = localStorage.getItem(STORAGE_KEYS.SESSION);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  }

  public logout(): void {
    const user = this.getCurrentSession();
    if (user) {
      this.log(`User logged out: ${user.name}`, user.name, 'auth');
    }
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    this.notify();
  }

  public updateUserProfile(userId: string, data: Partial<Pick<User, 'name' | 'phone' | 'currentLevel' | 'preferredTimings'>>): boolean {
    try {
      const usersData = localStorage.getItem(STORAGE_KEYS.USERS);
      const users: (User & { passwordHash: string })[] = usersData ? JSON.parse(usersData) : DEFAULT_USERS;
      const target = users.find((u) => u.id === userId);
      if (!target) return false;

      // Update only permitted fields (cannot change role or email here)
      if (data.name) target.name = data.name.trim();
      if (data.phone !== undefined) target.phone = data.phone;
      if (data.currentLevel) target.currentLevel = data.currentLevel;
      if (data.preferredTimings) target.preferredTimings = data.preferredTimings;

      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      // Update active session if it matches
      const session = this.getCurrentSession();
      if (session && session.id === userId) {
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({ ...session, ...data }));
      }

      this.log(`Updated profile for ${target.name}`, target.name, 'user');
      this.notify();
      return true;
    } catch {
      return false;
    }
  }

  public changePassword(userId: string, currentPass: string, newPass: string): { success: boolean; error?: string } {
    try {
      const usersData = localStorage.getItem(STORAGE_KEYS.USERS);
      const users: (User & { passwordHash: string })[] = usersData ? JSON.parse(usersData) : DEFAULT_USERS;
      const target = users.find((u) => u.id === userId);
      if (!target) return { success: false, error: 'User not found.' };

      if (target.passwordHash !== currentPass) {
        return { success: false, error: 'Current password does not match.' };
      }

      target.passwordHash = newPass;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      this.log(`Changed password for account ${target.email}`, target.name, 'auth');
      return { success: true };
    } catch {
      return { success: false, error: 'Could not change password.' };
    }
  }

  public toggleUserStatus(userId: string, actorName = 'Admin'): boolean {
    try {
      const usersData = localStorage.getItem(STORAGE_KEYS.USERS);
      const users: (User & { passwordHash: string })[] = usersData ? JSON.parse(usersData) : DEFAULT_USERS;
      const target = users.find((u) => u.id === userId);
      if (!target) return false;

      // Prevent deactivating the primary admin
      if (target.email === 'admin@tariqquran.com') return false;

      target.status = target.status === 'active' ? 'deactivated' : 'active';
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      this.log(`Changed status of ${target.name} to ${target.status}`, actorName, 'user');
      this.notify();
      return true;
    } catch {
      return false;
    }
  }

  public changeUserRole(userId: string, newRole: 'admin' | 'user', actorName = 'Admin'): boolean {
    try {
      const usersData = localStorage.getItem(STORAGE_KEYS.USERS);
      const users: (User & { passwordHash: string })[] = usersData ? JSON.parse(usersData) : DEFAULT_USERS;
      const target = users.find((u) => u.id === userId);
      if (!target) return false;

      // Cannot revoke main admin
      if (target.email === 'admin@tariqquran.com' && newRole !== 'admin') return false;

      target.role = newRole;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      this.log(`Changed role of ${target.name} to ${newRole}`, actorName, 'user');
      this.notify();
      return true;
    } catch {
      return false;
    }
  }

  public deleteUser(userId: string, actorName = 'Admin'): boolean {
    try {
      const usersData = localStorage.getItem(STORAGE_KEYS.USERS);
      const users: (User & { passwordHash: string })[] = usersData ? JSON.parse(usersData) : DEFAULT_USERS;
      const target = users.find((u) => u.id === userId);
      if (!target) return false;
      if (target.email === 'admin@tariqquran.com') return false; // Protected

      const filtered = users.filter((u) => u.id !== userId);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
      this.log(`Deleted user account ${target.email}`, actorName, 'user');
      this.notify();
      return true;
    } catch {
      return false;
    }
  }

  // --- Logs & Stats ---
  public getLogs(): ActivityItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LOGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public getDashboardStats() {
    const users = this.getUsers();
    const courses = this.getCourses();
    const inquiries = this.getInquiries();
    const pendingInquiries = inquiries.filter((i) => i.status === 'pending');
    return {
      totalUsers: users.length,
      totalStudents: users.filter((u) => u.role === 'user').length,
      totalCourses: courses.length,
      publishedCourses: courses.filter((c) => c.isPublished).length,
      totalInquiries: inquiries.length,
      pendingInquiries: pendingInquiries.length,
    };
  }
}

export const storage = new StorageService();
