import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Menu, X, MessageSquareQuote, User as UserIcon, LogOut, Shield, ChevronDown } from 'lucide-react';
import { TEACHER_DATA } from '../data/content';
import { WhatsAppIcon } from './ContactSection';
import { User } from '../types';

interface NavbarProps {
  currentPage: 'home' | 'courses' | 'admission' | 'admin';
  onNavigate: (page: 'home' | 'courses' | 'admission' | 'admin', sectionId?: string) => void;
  currentUser?: User | null;
  onLogout?: () => void;
  onOpenAuthModal?: (mode?: 'signin' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onLogout,
  onOpenAuthModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (page: 'home' | 'courses' | 'admission' | 'admin', sectionId?: string) => {
    onNavigate(page, sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-shadow duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single clean line) */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-sm cursor-pointer"
          >
            <img
              src="/logo-transparent.png"
              alt="Online Quran Teaching Logo"
              className="h-11 sm:h-12 w-auto max-w-[48px] sm:max-w-[54px] object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = '/logo.png';
              }}
            />
            <div className="flex flex-col">
              <span className="font-cinzel text-base sm:text-lg font-bold tracking-tight text-emerald-950 group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                Muhammad Tariq
              </span>
              <span className="text-xs text-stone-500 font-medium tracking-wide">
                Online Quran Teacher
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium">
            <button
              onClick={() => handleLinkClick('home')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
                currentPage === 'home'
                  ? 'text-emerald-900 border-emerald-800 font-semibold'
                  : 'text-stone-600 border-transparent hover:text-emerald-900 hover:border-stone-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('courses')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
                currentPage === 'courses'
                  ? 'text-emerald-900 border-emerald-800 font-semibold'
                  : 'text-stone-600 border-transparent hover:text-emerald-900 hover:border-stone-300'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => handleLinkClick('home', 'class-timings')}
              className="whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 border-transparent text-stone-600 hover:text-emerald-900 hover:border-stone-300"
            >
              Class Timings
            </button>
            <button
              onClick={() => handleLinkClick('admission')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
                currentPage === 'admission'
                  ? 'text-emerald-900 border-emerald-800 font-semibold'
                  : 'text-stone-600 border-transparent hover:text-emerald-900 hover:border-stone-300'
              }`}
            >
              Admission Portal
            </button>
            <button
              onClick={() => handleLinkClick('courses', 'contact-section')}
              className="whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 border-transparent text-stone-600 hover:text-emerald-900 hover:border-stone-300"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Secondary WhatsApp, Account/Login & Primary Apply for Admission Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Secondary Contact Option: WhatsApp */}
            <a
              href={TEACHER_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 rounded-md transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5 whitespace-nowrap"
              title="Chat with Muhammad Tariq on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* Account / Sign In Option */}
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-md transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                  aria-expanded={userDropdownOpen}
                >
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-5 h-5 rounded-full object-cover border border-stone-300"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-[10px]">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-semibold text-stone-900 max-w-[100px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-semibold">
                    {currentUser.role === 'admin' ? 'Admin' : 'Student'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 py-2 z-50 animate-fadeIn">
                    <div className="px-3.5 py-2 border-b border-stone-100">
                      <p className="text-xs font-semibold text-stone-900 truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
                    </div>

                    {currentUser.role === 'admin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          handleLinkClick('admin');
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                      >
                        <Shield className="w-3.5 h-3.5 text-emerald-800" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-rose-700 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onOpenAuthModal?.('signin')}
                className="px-3 py-2 text-xs font-medium text-stone-700 hover:text-emerald-950 bg-white hover:bg-stone-50 border border-stone-300 rounded-md transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <UserIcon className="w-3.5 h-3.5 text-stone-500" />
                <span>Sign In</span>
              </button>
            )}

            {/* Primary Action Button: Apply for Admission */}
            <button
              onClick={() => handleLinkClick('admission')}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 rounded-md transition-all shadow-sm hover:shadow flex items-center gap-2 whitespace-nowrap cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <span>Apply for Admission</span>
            </button>
          </div>

          {/* Mobile Actions & hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            {!currentUser && (
              <button
                type="button"
                onClick={() => onOpenAuthModal?.('signin')}
                className="p-2 text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md text-xs font-medium flex items-center gap-1"
                aria-label="Sign In"
              >
                <UserIcon className="w-4 h-4" />
                <span className="text-[11px]">Sign In</span>
              </button>
            )}

            <a
              href={TEACHER_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white bg-[#25D366] rounded-md sm:hidden flex items-center justify-center"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {/* User state in mobile */}
          {currentUser && (
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover border border-stone-300"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-stone-900 truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-stone-500 truncate">{currentUser.email}</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold shrink-0">
                  {currentUser.role === 'admin' ? 'Admin' : 'Student'}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60">
                {currentUser.role === 'admin' && (
                  <button
                    type="button"
                    onClick={() => handleLinkClick('admin')}
                    className="flex-1 py-1 text-center text-xs font-medium text-emerald-950 bg-emerald-50 rounded"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="flex-1 py-1 text-center text-xs font-medium text-rose-700 bg-rose-50 rounded"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-1.5">
            <button
              onClick={() => handleLinkClick('home')}
              className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-emerald-50 text-emerald-900 font-semibold'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('courses')}
              className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'courses'
                  ? 'bg-emerald-50 text-emerald-900 font-semibold'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => handleLinkClick('home', 'class-timings')}
              className="text-left px-3 py-2.5 rounded-md text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Class Timings
            </button>
            <button
              onClick={() => handleLinkClick('admission')}
              className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'admission'
                  ? 'bg-emerald-50 text-emerald-900 font-semibold'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              Admission Portal
            </button>
            <button
              onClick={() => handleLinkClick('courses', 'contact-section')}
              className="text-left px-3 py-2.5 rounded-md text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Contact
            </button>
          </div>
          <div className="pt-3 border-t border-stone-100 space-y-2">
            {!currentUser && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal?.('signin');
                  }}
                  className="py-2 text-center text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal?.('signup');
                  }}
                  className="py-2 text-center text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-md"
                >
                  Create Account
                </button>
              </div>
            )}
            <button
              onClick={() => handleLinkClick('admission')}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white bg-emerald-900 hover:bg-emerald-800 rounded-md shadow-sm flex items-center justify-center gap-2"
            >
              <span>Apply for Admission</span>
            </button>
            <a
              href={TEACHER_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-xs font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md shadow-2xs flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
              <span>WhatsApp: {TEACHER_DATA.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
