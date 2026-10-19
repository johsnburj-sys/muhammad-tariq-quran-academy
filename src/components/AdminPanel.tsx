import React, { useState, useEffect } from 'react';
import {
  Shield,
  LayoutDashboard,
  FileText,
  BookOpen,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Save,
  Lock,
  Phone,
  Mail,
  Search,
  Check,
  X,
  UserCheck,
  UserX,
  MessageCircle,
} from 'lucide-react';
import { storage } from '../services/storage';
import {
  User,
  Course,
  AdmissionInquiry,
  AcademySettings,
  ActivityItem,
} from '../types';
import { WhatsAppIcon } from './ContactSection';
import { GoogleSignInButton } from './GoogleSignInButton';
import { signInWithGoogle } from '../services/firebase';
import { FirebaseSetupModal } from './FirebaseSetupModal';

interface AdminPanelProps {
  onNavigateHome: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigateHome }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(storage.getCurrentSession());
  const [loginEmail, setLoginEmail] = useState('admin@tariqquran.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleNotice, setGoogleNotice] = useState<{ type: 'error' | 'warning' | 'info'; text: string } | null>(null);
  const [showFirebaseModal, setShowFirebaseModal] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'content' | 'courses' | 'inquiries' | 'users' | 'settings'
  >('dashboard');

  // Live state from storage
  const [settings, setSettings] = useState<AcademySettings>(storage.getSettings());
  const [courses, setCourses] = useState<Course[]>(storage.getCourses());
  const [inquiries, setInquiries] = useState<AdmissionInquiry[]>(storage.getInquiries());
  const [users, setUsers] = useState<User[]>(storage.getUsers());
  const [logs, setLogs] = useState<ActivityItem[]>(storage.getLogs());
  const [stats, setStats] = useState(storage.getDashboardStats());

  // Form states for Content tab
  const [contentForm, setContentForm] = useState<AcademySettings>(settings);
  const [contentSavedAlert, setContentSavedAlert] = useState(false);

  // Course Modal state
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [courseModalOpen, setCourseModalOpen] = useState(false);

  // Delete Confirmation Modal state
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    type: 'course' | 'inquiry' | 'user';
    id: string;
    name: string;
  }>({ open: false, type: 'course', id: '', name: '' });

  // Inquiries filter
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'pending' | 'contacted' | 'enrolled'>('all');

  // Sync with storage events
  useEffect(() => {
    const unsubscribe = storage.subscribe(() => {
      const s = storage.getSettings();
      setSettings(s);
      setContentForm(s);
      setCourses(storage.getCourses());
      setInquiries(storage.getInquiries());
      setUsers(storage.getUsers());
      setLogs(storage.getLogs());
      setStats(storage.getDashboardStats());
      setCurrentUser(storage.getCurrentSession());
    });
    return unsubscribe;
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = storage.login(loginEmail, loginPassword);
    if (res.success && res.user) {
      if (res.user.role !== 'admin') {
        setLoginError('Access denied. Administrator privileges are required.');
        storage.logout();
        return;
      }
      setCurrentUser(res.user);
    } else {
      setLoginError(res.error || 'Authentication failed.');
    }
  };

  const handleGoogleAdminLogin = async () => {
    setLoginError(null);
    setGoogleNotice(null);
    setIsGoogleLoading(true);

    try {
      const res = await signInWithGoogle();
      setIsGoogleLoading(false);

      if (res.cancelled) {
        setGoogleNotice({
          type: 'warning',
          text: 'Google sign-in was cancelled. You closed the Google account selection window.',
        });
        return;
      }

      if (!res.isConfigured) {
        setGoogleNotice({
          type: 'error',
          text:
            res.error ||
            'Google Authentication is not yet configured. Please configure Firebase credentials in your environment variables.',
        });
        return;
      }

      if (!res.success || !res.user) {
        setLoginError(res.error || 'Google authentication failed.');
        return;
      }

      const sync = storage.handleGoogleAuth({
        name: res.user.displayName,
        email: res.user.email,
        avatar: res.user.photoURL,
        uid: res.user.uid,
      });

      if (!sync.success || !sync.user) {
        setLoginError(sync.error || 'Failed to initialize user session.');
        return;
      }

      if (sync.user.role !== 'admin') {
        setLoginError(
          `Access denied. The Google account (${sync.user.email}) does not have administrator privileges. Only authorized academy administrators can access the administration dashboard.`
        );
        return;
      }

      setCurrentUser(sync.user);
    } catch (err: any) {
      setIsGoogleLoading(false);
      setLoginError(err?.message || 'Google sign-in encountered an error.');
    }
  };

  const handleLogout = () => {
    storage.logout();
    setCurrentUser(null);
  };

  // Content save handler
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    storage.updateSettings(contentForm, currentUser?.name);
    setContentSavedAlert(true);
    setTimeout(() => setContentSavedAlert(false), 3000);
  };

  // Course handlers
  const handleOpenAddCourse = () => {
    setEditingCourse({
      title: '',
      arabicTitle: '',
      level: 'Beginner Level',
      summary: '',
      bullets: ['', '', ''],
      isPublished: true,
      fees: '',
      schedule: '',
    });
    setCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course: Course) => {
    setEditingCourse({ ...course, bullets: [...course.bullets] });
    setCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse?.title) return;
    const cleanBullets = (editingCourse.bullets || []).filter((b) => b.trim().length > 0);
    storage.saveCourse(
      {
        ...editingCourse,
        title: editingCourse.title.trim(),
        bullets: cleanBullets,
      } as any,
      currentUser?.name
    );
    setCourseModalOpen(false);
    setEditingCourse(null);
  };

  const confirmDelete = () => {
    if (!deleteModal.id) return;
    if (deleteModal.type === 'course') {
      storage.deleteCourse(deleteModal.id, currentUser?.name);
    } else if (deleteModal.type === 'inquiry') {
      storage.deleteInquiry(deleteModal.id, currentUser?.name);
    } else if (deleteModal.type === 'user') {
      storage.deleteUser(deleteModal.id, currentUser?.name);
    }
    setDeleteModal({ open: false, type: 'course', id: '', name: '' });
  };

  // If user is not authenticated as admin, show clean Admin Login
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
          <div className="p-8 bg-emerald-950 text-white text-center space-y-2">
            <img
              src="/logo-transparent.png"
              alt="Online Quran Academy Logo"
              className="w-16 h-16 mx-auto object-contain p-1.5 rounded-2xl bg-white/10 border border-amber-400/40 shadow-md"
              onError={(e) => {
                e.currentTarget.src = '/logo.png';
              }}
            />
            <h2 className="font-cinzel text-2xl font-bold">Admin Portal</h2>
            <p className="text-xs text-emerald-200">
              Muhammad Tariq — Online Quran Academy
            </p>
          </div>

          <div className="p-8 space-y-5">
            {/* Continue with Google Option */}
            <div className="space-y-2">
              <GoogleSignInButton
                onClick={handleGoogleAdminLogin}
                isLoading={isGoogleLoading}
                label="Continue with Google"
              />

              <div className="text-[11px] text-center text-stone-400">
                Official Google Account Chooser • Administrator verification required
              </div>
            </div>

            {googleNotice && (
              <div
                className={`p-3 rounded-lg text-xs space-y-1.5 ${
                  googleNotice.type === 'error'
                    ? 'bg-rose-50 border border-rose-200 text-rose-800'
                    : 'bg-amber-50 border border-amber-200 text-amber-800'
                }`}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{googleNotice.text}</span>
                </div>
                {googleNotice.type === 'error' && (
                  <button
                    type="button"
                    onClick={() => setShowFirebaseModal(true)}
                    className="ml-6 px-2.5 py-1 text-[11px] font-semibold bg-rose-100 hover:bg-rose-200 text-rose-950 rounded transition-colors cursor-pointer"
                  >
                    View Firebase Configuration Guide →
                  </button>
                )}
              </div>
            )}

            <div className="relative flex py-1 items-center">
              <div className="grow border-t border-stone-200"></div>
              <span className="shrink mx-3 text-[11px] text-stone-400 font-medium uppercase tracking-wider">
                or sign in with credentials
              </span>
              <div className="grow border-t border-stone-200"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">Administrator Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Sign In to Admin Panel
              </button>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-emerald-900 hover:underline cursor-pointer"
                >
                  ← Back to Public Website
                </button>
                <span className="font-mono text-[11px] text-stone-400">admin123</span>
              </div>
            </form>
          </div>
        </div>

        <FirebaseSetupModal
          isOpen={showFirebaseModal}
          onClose={() => setShowFirebaseModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100/60 pb-16">
      {/* Admin Top Bar */}
      <div className="bg-emerald-950 text-white border-b border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo-transparent.png"
              alt="Online Quran Academy Logo"
              className="w-9 h-9 object-contain rounded-lg p-0.5 bg-white/10 border border-amber-400/30 shadow-xs"
              onError={(e) => {
                e.currentTarget.src = '/logo.png';
              }}
            />
            <div>
              <span className="font-cinzel text-sm sm:text-base font-bold text-white block">
                Quran Academy Control Panel
              </span>
              <span className="text-[11px] text-amber-300">
                Logged in: {currentUser.name} (Administrator)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Website</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-950/80 hover:bg-red-900 text-red-200 hover:text-white rounded text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t border-emerald-900/60 pt-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 px-3.5 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'dashboard'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-emerald-200 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`py-3 px-3.5 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'content'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-emerald-200 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Website Content</span>
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-3 px-3.5 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'courses'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-emerald-200 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses ({courses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-3.5 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'inquiries'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-emerald-200 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquiries ({stats.pendingInquiries} new)</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-3 px-3.5 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'users'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-emerald-200 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Admin Accounts ({users.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-3.5 text-xs font-semibold whitespace-nowrap border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-emerald-200 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-xs uppercase font-semibold text-stone-500">Registered Students</span>
                <div className="text-3xl font-bold text-stone-900 mt-2 tabular-nums">
                  {stats.totalStudents}
                </div>
                <div className="text-[11px] text-stone-400 mt-1">Active student accounts</div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-xs uppercase font-semibold text-stone-500">Total Courses</span>
                <div className="text-3xl font-bold text-stone-900 mt-2 tabular-nums">
                  {stats.totalCourses}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-1">
                  {stats.publishedCourses} published on public site
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-xs uppercase font-semibold text-stone-500">Admission Inquiries</span>
                <div className="text-3xl font-bold text-stone-900 mt-2 tabular-nums">
                  {stats.totalInquiries}
                </div>
                <div className="text-[11px] text-amber-700 font-medium mt-1">
                  {stats.pendingInquiries} awaiting response
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-xs uppercase font-semibold text-stone-500">WhatsApp Status</span>
                <div className="text-sm font-bold text-stone-900 mt-2 flex items-center gap-1.5">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] fill-current" />
                  <span>+92 333 6163006</span>
                </div>
                <div className="text-[11px] text-stone-400 mt-1">Active direct link ready</div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Quick Actions */}
              <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
                <h3 className="font-cinzel text-lg font-bold text-stone-900">
                  Quick Actions
                </h3>
                <div className="space-y-2.5">
                  <button
                    onClick={() => setActiveTab('content')}
                    className="w-full p-3 text-left rounded-lg border border-stone-200 hover:border-emerald-800 hover:bg-emerald-50/50 transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900">Edit Teacher Information</div>
                      <div className="text-[11px] text-stone-500">Update qualification, bio, and WhatsApp number</div>
                    </div>
                    <FileText className="w-4 h-4 text-emerald-800" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('courses');
                      handleOpenAddCourse();
                    }}
                    className="w-full p-3 text-left rounded-lg border border-stone-200 hover:border-emerald-800 hover:bg-emerald-50/50 transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900">Add New Quran Course</div>
                      <div className="text-[11px] text-stone-500">Create a new course with learning objectives</div>
                    </div>
                    <Plus className="w-4 h-4 text-emerald-800" />
                  </button>

                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="w-full p-3 text-left rounded-lg border border-stone-200 hover:border-emerald-800 hover:bg-emerald-50/50 transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900">Review Admission Inquiries</div>
                      <div className="text-[11px] text-stone-500">{stats.pendingInquiries} inquiries need follow up</div>
                    </div>
                    <MessageSquare className="w-4 h-4 text-emerald-800" />
                  </button>
                </div>
              </div>

              {/* Recent Activity Log */}
              <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
                <h3 className="font-cinzel text-lg font-bold text-stone-900">
                  Recent Activity Audit
                </h3>
                <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto">
                  {logs.map((log) => (
                    <div key={log.id} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                      <div>
                        <span className="font-medium text-stone-800">{log.action}</span>
                        <div className="text-[10px] text-stone-400">By {log.actor}</div>
                      </div>
                      <span className="text-[10px] text-stone-400 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WEBSITE CONTENT MANAGEMENT */}
        {activeTab === 'content' && (
          <form onSubmit={handleSaveContent} className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-stone-200">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-stone-900">
                  Website Content & Teacher Profile
                </h3>
                <p className="text-xs text-stone-500">
                  Control all public details for teacher Muhammad Tariq. Changes appear immediately on the public website.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset content to initial PRD verified defaults?')) {
                      storage.resetToDefaultContent(currentUser.name);
                    }
                  }}
                  className="px-3.5 py-2 text-xs text-stone-600 hover:text-stone-900 border border-stone-300 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-900 hover:bg-emerald-800 rounded-md shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5 text-amber-300" />
                  <span>Save & Publish</span>
                </button>
              </div>
            </div>

            {contentSavedAlert && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>Content successfully published! The public website has been updated in real-time.</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Teacher Identity & Qualifications */}
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
                <h4 className="font-cinzel text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
                  1. Teacher Identity & Credentials
                </h4>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">Teacher Full Name</label>
                  <input
                    type="text"
                    value={contentForm.teacherName}
                    onChange={(e) => setContentForm({ ...contentForm, teacherName: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 text-sm rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">Teacher Professional Title</label>
                  <input
                    type="text"
                    value={contentForm.teacherTitle}
                    onChange={(e) => setContentForm({ ...contentForm, teacherTitle: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 text-sm rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">Quran Qualification</label>
                    <input
                      type="text"
                      value={contentForm.qualification}
                      onChange={(e) => setContentForm({ ...contentForm, qualification: e.target.value })}
                      required
                      className="w-full px-3.5 py-2 text-sm rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">Teaching Experience</label>
                    <input
                      type="text"
                      value={contentForm.experience}
                      onChange={(e) => setContentForm({ ...contentForm, experience: e.target.value })}
                      required
                      className="w-full px-3.5 py-2 text-sm rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">Teacher Biography (About Me)</label>
                  <textarea
                    rows={4}
                    value={contentForm.aboutText}
                    onChange={(e) => setContentForm({ ...contentForm, aboutText: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 text-sm rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  />
                </div>
              </div>

              {/* WhatsApp & Contact Details */}
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
                <h4 className="font-cinzel text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
                  2. WhatsApp & Contact Settings
                </h4>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    WhatsApp Number (International format, numbers only)
                  </label>
                  <input
                    type="text"
                    value={contentForm.whatsappNumber}
                    onChange={(e) => {
                      const cleanNum = e.target.value.replace(/[^0-9]/g, '');
                      setContentForm({
                        ...contentForm,
                        whatsappNumber: cleanNum,
                        whatsappDisplay: `+${cleanNum.slice(0, 2)} ${cleanNum.slice(2, 5)} ${cleanNum.slice(5)}`,
                      });
                    }}
                    required
                    className="w-full px-3.5 py-2 text-sm font-mono rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">Display Formatted Number</label>
                  <input
                    type="text"
                    value={contentForm.whatsappDisplay}
                    onChange={(e) => setContentForm({ ...contentForm, whatsappDisplay: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 text-sm font-mono rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">Default WhatsApp Pre-filled Message</label>
                  <textarea
                    rows={3}
                    value={contentForm.whatsappDefaultMessage}
                    onChange={(e) => setContentForm({ ...contentForm, whatsappDefaultMessage: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 text-sm rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <WhatsAppIcon className="w-4 h-4 fill-current text-[#25D366]" />
                    <span className="font-mono text-[11px]">https://wa.me/{contentForm.whatsappNumber}</span>
                  </div>
                  <a
                    href={`https://wa.me/${contentForm.whatsappNumber}?text=${encodeURIComponent(contentForm.whatsappDefaultMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Class Timings & Fees Configuration */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
                <h4 className="font-cinzel text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
                  3. Class Schedules & Fee Configuration (Shown when confirmed)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">Class Duration</label>
                    <input
                      type="text"
                      value={contentForm.classDuration}
                      onChange={(e) => setContentForm({ ...contentForm, classDuration: e.target.value })}
                      placeholder="e.g. 30 minutes / 45 minutes"
                      className="w-full px-3.5 py-2 text-sm rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">Available Days</label>
                    <input
                      type="text"
                      value={contentForm.availableDays}
                      onChange={(e) => setContentForm({ ...contentForm, availableDays: e.target.value })}
                      placeholder="e.g. Monday to Friday / Flexible"
                      className="w-full px-3.5 py-2 text-sm rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">Class Timings</label>
                    <input
                      type="text"
                      value={contentForm.classTimings}
                      onChange={(e) => setContentForm({ ...contentForm, classTimings: e.target.value })}
                      placeholder="e.g. Flexible / Morning & Evening"
                      className="w-full px-3.5 py-2 text-sm rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">Lesson Type</label>
                    <input
                      type="text"
                      value={contentForm.lessonType}
                      onChange={(e) => setContentForm({ ...contentForm, lessonType: e.target.value })}
                      placeholder="e.g. 1-on-1 Individual Sessions"
                      className="w-full px-3.5 py-2 text-sm rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">Course Fees</label>
                    <input
                      type="text"
                      value={contentForm.courseFees}
                      onChange={(e) => setContentForm({ ...contentForm, courseFees: e.target.value })}
                      placeholder="e.g. Affordable monthly / Contact for quote"
                      className="w-full px-3.5 py-2 text-sm rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">Languages Spoken</label>
                    <input
                      type="text"
                      value={contentForm.languagesSpoken}
                      onChange={(e) => setContentForm({ ...contentForm, languagesSpoken: e.target.value })}
                      placeholder="e.g. English, Urdu, Arabic"
                      className="w-full px-3.5 py-2 text-sm rounded-md border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>
                </div>
              </div>

              {/* Islamic Announcement Bar & Educational Ribbon Controls */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
                <h4 className="font-cinzel text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
                  4. Top Islamic Announcement Bar & Educational Strip Settings
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Enable Top Bar */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-700 block">
                      Top Arabic Announcement Bar
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="top-bar-enable"
                        checked={contentForm.topAnnouncementBarEnabled ?? true}
                        onChange={(e) =>
                          setContentForm({ ...contentForm, topAnnouncementBarEnabled: e.target.checked })
                        }
                        className="rounded text-emerald-900 focus:ring-emerald-800"
                      />
                      <label htmlFor="top-bar-enable" className="text-xs text-stone-600">
                        Display bar at top of public pages
                      </label>
                    </div>
                  </div>

                  {/* Scrolling Speed */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-700 block">
                      Announcement Display Mode
                    </label>
                    <select
                      value={contentForm.topAnnouncementSpeed || 'slow'}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          topAnnouncementSpeed: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-md border border-stone-300 bg-white"
                    >
                      <option value="slow">Slow Smooth Scrolling (Recommended)</option>
                      <option value="normal">Standard Scrolling</option>
                      <option value="static">Static Display (No Motion)</option>
                    </select>
                  </div>

                  {/* Secondary Educational Ribbon */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-700 block">
                      Sub-Hero Educational Strip
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="edu-strip-enable"
                        checked={contentForm.educationalStripEnabled ?? true}
                        onChange={(e) =>
                          setContentForm({ ...contentForm, educationalStripEnabled: e.target.checked })
                        }
                        className="rounded text-emerald-900 focus:ring-emerald-800"
                      />
                      <label htmlFor="edu-strip-enable" className="text-xs text-stone-600">
                        Show promotional learning strip
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 space-y-1">
                  <div className="font-semibold text-emerald-950">Active Islamic Phrases:</div>
                  <div className="text-[11px] text-stone-500">
                    Includes 7 verified Arabic phrases with Quranic references (e.g. Quran 20:114, Quran 94:6, Quran 3:134, Quran 96:1) and the Du'a supplication, rendered with pause-on-hover and reduced-motion support.
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: COURSE MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-stone-200">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-stone-900">
                  Course Management
                </h3>
                <p className="text-xs text-stone-500">
                  Add, edit, reorder, publish, and manage Quran curriculum items.
                </p>
              </div>
              <button
                onClick={handleOpenAddCourse}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-900 hover:bg-emerald-800 rounded-md shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Add New Course</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs divide-y divide-stone-100">
              {courses.map((course, idx) => (
                <div key={course.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-400">0{idx + 1}</span>
                      <h4 className="font-cinzel text-lg font-bold text-stone-900">{course.title}</h4>
                      {course.arabicTitle && (
                        <span className="font-arabic text-emerald-900 text-sm font-bold" dir="rtl">
                          {course.arabicTitle}
                        </span>
                      )}
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          course.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {course.isPublished ? 'Published' : 'Draft / Unpublished'}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600">{course.summary}</p>

                    <div className="text-[11px] text-stone-500 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                      <span><strong>Level:</strong> {course.level}</span>
                      {course.fees && <span><strong>Fees:</strong> {course.fees}</span>}
                      {course.schedule && <span><strong>Schedule:</strong> {course.schedule}</span>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => storage.reorderCourse(course.id, 'up', currentUser.name)}
                      disabled={idx === 0}
                      className="p-1.5 rounded border border-stone-200 text-stone-500 hover:text-stone-900 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => storage.reorderCourse(course.id, 'down', currentUser.name)}
                      disabled={idx === courses.length - 1}
                      className="p-1.5 rounded border border-stone-200 text-stone-500 hover:text-stone-900 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => storage.toggleCoursePublish(course.id, currentUser.name)}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                        course.isPublished
                          ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      }`}
                    >
                      {course.isPublished ? 'Unpublish' : 'Publish'}
                    </button>

                    <button
                      onClick={() => handleOpenEditCourse(course)}
                      className="p-2 rounded text-stone-600 hover:text-emerald-900 hover:bg-stone-50 transition-colors"
                      title="Edit Course"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() =>
                        setDeleteModal({
                          open: true,
                          type: 'course',
                          id: course.id,
                          name: course.title,
                        })
                      }
                      className="p-2 rounded text-stone-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ADMISSION INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-stone-200">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-stone-900">
                  Admission Inquiries ({inquiries.length})
                </h3>
                <p className="text-xs text-stone-500">
                  Manage student inquiries and contact parents directly via WhatsApp.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                {(['all', 'pending', 'contacted', 'enrolled'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setInquiryFilter(filter)}
                    className={`px-3 py-1.5 rounded-md font-medium uppercase tracking-wider text-[11px] transition-colors ${
                      inquiryFilter === filter
                        ? 'bg-emerald-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {inquiries
                .filter((inq) => inquiryFilter === 'all' || inq.status === inquiryFilter)
                .map((inq) => (
                  <div key={inq.id} className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-stone-900">{inq.name}</h4>
                          <span
                            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                              inq.status === 'pending'
                                ? 'bg-amber-100 text-amber-900'
                                : inq.status === 'contacted'
                                ? 'bg-blue-100 text-blue-900'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5 flex flex-wrap gap-x-3 gap-y-1">
                          <span><strong>Course:</strong> {inq.courseName}</span>
                          {inq.ageGroup && <span><strong>Age:</strong> {inq.ageGroup}</span>}
                          {inq.experience && <span><strong>Experience:</strong> {inq.experience}</span>}
                          {inq.parentName && <span><strong>Parent/Guardian:</strong> {inq.parentName}</span>}
                          {inq.country && <span><strong>Country/Timezone:</strong> {inq.country}</span>}
                          {inq.preferredTiming && <span><strong>Timing:</strong> {inq.preferredTiming}</span>}
                          <span><strong>Submitted:</strong> {new Date(inq.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Direct WhatsApp Action for Teacher */}
                      <div className="flex items-center gap-2">
                        {inq.phone && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Assalam-o-Alaikum ${inq.name}, this is teacher Muhammad Tariq replying to your Quran class inquiry for ${inq.courseName}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                            <span>WhatsApp Student</span>
                          </a>
                        )}

                        <select
                          value={inq.status}
                          onChange={(e) =>
                            storage.updateInquiryStatus(inq.id, e.target.value as any, undefined, currentUser.name)
                          }
                          className="px-2.5 py-1.5 text-xs rounded border border-stone-300 bg-white"
                        >
                          <option value="pending">Mark: Pending</option>
                          <option value="contacted">Mark: Contacted</option>
                          <option value="enrolled">Mark: Enrolled</option>
                          <option value="archived">Mark: Archived</option>
                        </select>

                        <button
                          onClick={() =>
                            setDeleteModal({
                              open: true,
                              type: 'inquiry',
                              id: inq.id,
                              name: `${inq.name} (${inq.courseName})`,
                            })
                          }
                          className="p-1.5 text-stone-400 hover:text-red-600 rounded"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-100">
                      <span className="font-semibold text-stone-500 block mb-1">Inquiry Message:</span>
                      <p>{inq.message}</p>
                    </div>

                    {inq.notes && (
                      <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded border border-amber-200">
                        <strong>Teacher Notes:</strong> {inq.notes}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 5: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <h3 className="font-cinzel text-xl font-bold text-stone-900">
                Administrator & Staff Accounts
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Manage authorized administrator and staff accounts for website and course management.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs divide-y divide-stone-100">
              {users.map((u) => (
                <div key={u.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900">{u.name}</span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          u.role === 'admin' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {u.role}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          u.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {u.status}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5 flex flex-wrap gap-x-3">
                      <span>{u.email}</span>
                      {u.phone && <span>{u.phone}</span>}
                      {u.currentLevel && <span>Level: {u.currentLevel}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {u.email !== 'admin@tariqquran.com' && (
                      <>
                        <button
                          onClick={() => storage.toggleUserStatus(u.id, currentUser.name)}
                          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                            u.status === 'active'
                              ? 'bg-red-50 text-red-700 hover:bg-red-100'
                              : 'bg-green-50 text-green-700 hover:bg-green-100'
                          }`}
                        >
                          {u.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>

                        <button
                          onClick={() =>
                            setDeleteModal({
                              open: true,
                              type: 'user',
                              id: u.id,
                              name: u.name,
                            })
                          }
                          className="p-1.5 text-stone-400 hover:text-red-700"
                          title="Delete Account"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS & DATABASE */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <h3 className="font-cinzel text-xl font-bold text-stone-900">
                Academy System Settings
              </h3>
              <p className="text-xs text-stone-500">
                General configurations, security policies, and database connection instructions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Database / Supabase Setup Documentation */}
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
                <h4 className="font-cinzel text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
                  Database & Storage Architecture
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  The website currently utilizes persistent structured storage with role-based policies.
                  To synchronize with an external Supabase PostgreSQL instance:
                </p>
                <div className="font-mono text-[11px] bg-stone-900 text-stone-200 p-3 rounded-lg overflow-x-auto space-y-1">
                  <div className="text-amber-300">-- Supabase SQL Schema for Muhammad Tariq Academy:</div>
                  <div>CREATE TABLE users (id UUID PRIMARY KEY, name TEXT, email TEXT UNIQUE, role TEXT);</div>
                  <div>CREATE TABLE courses (id TEXT PRIMARY KEY, title TEXT, is_published BOOLEAN);</div>
                  <div>CREATE TABLE inquiries (id TEXT PRIMARY KEY, student_name TEXT, status TEXT);</div>
                </div>
                <div className="text-xs text-stone-500">
                  Provide your Supabase URL & Key in <code>.env</code> when ready.
                </div>
              </div>

              {/* Security & Access Controls */}
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
                <h4 className="font-cinzel text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
                  Security Policies (Active)
                </h4>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Ordinary users cannot grant themselves administrator privileges.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Primary administrator account cannot be accidentally deleted or deactivated.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Public visitors can browse all published courses without requiring an account.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Audit activity log records all content edits and user actions.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Course Create/Edit Modal */}
      {courseModalOpen && editingCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
            <div className="p-6 bg-emerald-950 text-white flex items-center justify-between">
              <h3 className="font-cinzel text-lg font-bold">
                {editingCourse.id ? 'Edit Quran Course' : 'Add New Quran Course'}
              </h3>
              <button onClick={() => setCourseModalOpen(false)} className="text-stone-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Course Title *</label>
                <input
                  type="text"
                  value={editingCourse.title || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  required
                  placeholder="e.g. Advanced Tajweed Rules"
                  className="w-full px-3 py-2 text-sm rounded border border-stone-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Arabic Title (Optional)</label>
                <input
                  type="text"
                  value={editingCourse.arabicTitle || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, arabicTitle: e.target.value })}
                  placeholder="e.g. علم التجويد"
                  className="w-full px-3 py-2 text-sm rounded border border-stone-300 text-right"
                  dir="rtl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Level</label>
                <input
                  type="text"
                  value={editingCourse.level || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value })}
                  placeholder="e.g. Beginner Level / All Levels"
                  className="w-full px-3 py-2 text-sm rounded border border-stone-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Summary</label>
                <textarea
                  rows={2}
                  value={editingCourse.summary || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, summary: e.target.value })}
                  placeholder="Short description of the course..."
                  className="w-full px-3 py-2 text-sm rounded border border-stone-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Learning Objectives / Bullet Points (One per line)
                </label>
                <textarea
                  rows={4}
                  value={(editingCourse.bullets || []).join('\n')}
                  onChange={(e) => setEditingCourse({ ...editingCourse, bullets: e.target.value.split('\n') })}
                  placeholder="Learn Arabic letters and their sounds.&#10;Practice letter recognition.&#10;Progress gradually."
                  className="w-full px-3 py-2 text-sm rounded border border-stone-300 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Fees (Optional)</label>
                  <input
                    type="text"
                    value={editingCourse.fees || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, fees: e.target.value })}
                    placeholder="e.g. Discuss upon inquiry"
                    className="w-full px-3 py-2 text-sm rounded border border-stone-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Schedule (Optional)</label>
                  <input
                    type="text"
                    value={editingCourse.schedule || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, schedule: e.target.value })}
                    placeholder="e.g. 3 days a week"
                    className="w-full px-3 py-2 text-sm rounded border border-stone-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publish-check"
                  checked={editingCourse.isPublished ?? true}
                  onChange={(e) => setEditingCourse({ ...editingCourse, isPublished: e.target.checked })}
                  className="rounded text-emerald-900"
                />
                <label htmlFor="publish-check" className="text-xs font-semibold text-stone-700">
                  Publish this course immediately on the public website
                </label>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCourseModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase text-white bg-emerald-900 hover:bg-emerald-800 rounded-md"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Safeguard Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-cinzel text-lg font-bold text-stone-900">
                Confirm Deletion Safeguard
              </h3>
              <p className="text-xs text-stone-600">
                Are you sure you want to permanently delete:
              </p>
              <div className="p-2.5 bg-stone-100 rounded font-semibold text-stone-900 text-sm">
                "{deleteModal.name}"
              </div>
              <p className="text-[11px] text-red-600 pt-1">
                This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteModal({ open: false, type: 'course', id: '', name: '' })}
                className="w-1/2 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="w-1/2 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-red-700 hover:bg-red-800 rounded-lg"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
