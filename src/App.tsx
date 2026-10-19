/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { IslamicTopBar } from './components/IslamicTopBar';
import { Hero } from './components/Hero';
import { DailyInspiration } from './components/DailyInspiration';
import { AboutSection } from './components/AboutSection';
import { CoursesSection } from './components/CoursesSection';
import { ScheduleSection } from './components/ScheduleSection';
import { FaqSection } from './components/FaqSection';
import { HomeAdmissionBox } from './components/HomeAdmissionBox';
import { CoursesPage } from './components/CoursesPage';
import { AdmissionPortal } from './components/AdmissionPortal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { storage } from './services/storage';
import { User, AcademySettings } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'courses' | 'admission' | 'admin'>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(storage.getCurrentSession());
  const [settings, setSettings] = useState<AcademySettings>(storage.getSettings());
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Form autofill synchronization states
  const [preselectedCourse, setPreselectedCourse] = useState<string | undefined>(undefined);
  const [preselectedLevel, setPreselectedLevel] = useState<string | undefined>(undefined);
  const [preselectedTime, setPreselectedTime] = useState<string | undefined>(undefined);

  // Listen to storage changes
  useEffect(() => {
    const unsub = storage.subscribe(() => {
      setCurrentUser(storage.getCurrentSession());
      setSettings(storage.getSettings());
    });
    return unsub;
  }, []);

  // Sync with browser URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('admin')) {
        setCurrentPage('admin');
      } else if (hash.includes('portal') || hash.includes('admission-portal')) {
        setCurrentPage('admission');
      } else if (hash.includes('courses') || hash.includes('contact')) {
        setCurrentPage('courses');
        if (hash.includes('contact')) {
          setTimeout(() => {
            const el = document.getElementById('contact-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else {
        setCurrentPage('home');
        if (hash.includes('admission') || hash.includes('apply')) {
          setTimeout(() => {
            const el = document.getElementById('apply-admission');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else if (hash.includes('timing') || hash.includes('schedule')) {
          setTimeout(() => {
            const el = document.getElementById('class-timings');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'courses' | 'admission' | 'admin', sectionId?: string) => {
    setCurrentPage(page);
    window.location.hash =
      page === 'home'
        ? sectionId === 'apply-admission'
          ? 'apply-admission'
          : sectionId === 'class-timings'
          ? 'class-timings'
          : 'home'
        : page === 'admission'
        ? 'admission-portal'
        : page === 'admin'
        ? 'admin'
        : sectionId === 'contact-section'
        ? 'contact'
        : 'courses';

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCourseFromFinder = (courseName: string, level?: string) => {
    setPreselectedCourse(courseName);
    setPreselectedLevel(level);
    navigateTo('home', 'apply-admission');
  };

  const handleSelectScheduleFromSection = (scheduleText: string) => {
    setPreselectedTime(scheduleText);
    navigateTo('home', 'apply-admission');
  };

  const handleNavigateFromCoursesToAdmission = (
    courseName?: string,
    level?: string,
    time?: string
  ) => {
    if (courseName) setPreselectedCourse(courseName);
    if (level) setPreselectedLevel(level);
    if (time) setPreselectedTime(time);
    navigateTo('home', 'apply-admission');
  };

  const handleLogout = () => {
    storage.logout();
    setCurrentUser(null);
    navigateTo('home');
  };

  const handleOpenAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 bg-islamic-pattern">
      {/* 4. Premium Islamic Top Announcement Bar - Absolute Top of Every Public Page */}
      {currentPage !== 'admin' && (
        <IslamicTopBar
          enabled={settings.topAnnouncementBarEnabled ?? true}
          speed={settings.topAnnouncementSpeed || 'slow'}
        />
      )}

      {/* Top Bar Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuthModal={handleOpenAuthModal}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <div className="space-y-16 lg:space-y-24 pb-8">
            {/* Page One: Home & Teacher Profile */}
            <Hero
              onNavigateToCourses={() => navigateTo('courses')}
              onNavigateToContact={() => navigateTo('home', 'apply-admission')}
            />

            {/* Daily Islamic Inspiration */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <DailyInspiration />
            </div>

            {/* Teacher Profile, Credentials & Philosophy */}
            <AboutSection
              onNavigateToCourses={() => navigateTo('courses')}
              onNavigateToContact={() => navigateTo('home', 'apply-admission')}
            />

            {/* Courses Section with 3 Cards */}
            <CoursesSection onSelectCourseForAdmission={handleSelectCourseFromFinder} />

            {/* Class Schedule with Pakistan Standard Time & Local Time Assistance */}
            <ScheduleSection
              onSelectScheduleForAdmission={handleSelectScheduleFromSection}
              settings={settings}
            />

            {/* Frequently Asked Questions */}
            <FaqSection onNavigateToContact={() => navigateTo('home', 'apply-admission')} />

            {/* 2. Smart Admission Form (at the very bottom of the Home page, immediately before footer) */}
            <HomeAdmissionBox
              initialCourse={preselectedCourse}
              initialLevel={preselectedLevel}
              initialTime={preselectedTime}
            />
          </div>
        )}

        {currentPage === 'courses' && (
          /* Page Two: Courses, Instructions & Contact */
          <CoursesPage
            onNavigateToHomeAdmission={handleNavigateFromCoursesToAdmission}
          />
        )}

        {currentPage === 'admission' && (
          /* Dedicated Admission Portal */
          <AdmissionPortal
            onNavigateHome={() => navigateTo('home')}
            onNavigateCourses={() => navigateTo('courses')}
          />
        )}

        {currentPage === 'admin' && (
          /* Protected Admin Panel */
          <AdminPanel onNavigateHome={() => navigateTo('home')} />
        )}
      </main>

      {/* 5. Floating WhatsApp Button across all public pages */}
      {currentPage !== 'admin' && <FloatingWhatsApp />}

      {/* Footer across all pages */}
      <Footer onNavigate={navigateTo} />

      {/* Account Registration & Sign-In Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </div>
  );
}
