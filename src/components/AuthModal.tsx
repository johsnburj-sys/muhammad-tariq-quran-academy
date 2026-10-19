import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2, Lock, Mail, User as UserIcon, ShieldCheck, Eye, EyeOff, Info } from 'lucide-react';
import { GoogleSignInButton } from './GoogleSignInButton';
import { signInWithGoogle, isFirebaseConfigured } from '../services/firebase';
import { storage } from '../services/storage';
import { FirebaseSetupModal } from './FirebaseSetupModal';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onSuccess?: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [currentLevel, setCurrentLevel] = useState('Beginner (Noorani Qaida)');

  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cancellationMsg, setCancellationMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isUnconfigured, setIsUnconfigured] = useState(false);

  // Sync mode if initialMode changes
  React.useEffect(() => {
    setMode(initialMode);
    setErrorMsg(null);
    setCancellationMsg(null);
    setSuccessMsg(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const resetMessages = () => {
    setErrorMsg(null);
    setCancellationMsg(null);
    setSuccessMsg(null);
    setIsUnconfigured(false);
  };

  // 1. Google Authentication Flow
  const handleGoogleAuth = async () => {
    resetMessages();
    setIsGoogleLoading(true);

    try {
      const res = await signInWithGoogle();

      if (res.cancelled) {
        setCancellationMsg(
          'Google sign-in was cancelled. You closed the Google account selection window before finishing.'
        );
        setIsGoogleLoading(false);
        return;
      }

      if (!res.isConfigured) {
        setIsUnconfigured(true);
        setErrorMsg(
          res.error ||
            'Google Authentication is not yet configured with Firebase credentials.'
        );
        setIsGoogleLoading(false);
        return;
      }

      if (!res.success || !res.user) {
        setErrorMsg(res.error || 'Google sign-in failed. Please try again.');
        setIsGoogleLoading(false);
        return;
      }

      // Official profile retrieved: name, email, avatar
      const syncResult = storage.handleGoogleAuth({
        name: res.user.displayName,
        email: res.user.email,
        avatar: res.user.photoURL,
        uid: res.user.uid,
      });

      if (!syncResult.success || !syncResult.user) {
        setErrorMsg(syncResult.error || 'Could not initialize student session.');
        setIsGoogleLoading(false);
        return;
      }

      setSuccessMsg(
        syncResult.isNewUser
          ? `Welcome, ${syncResult.user.name}! Your student account has been created via Google.`
          : `Welcome back, ${syncResult.user.name}! Signed in successfully with Google.`
      );

      setTimeout(() => {
        setIsGoogleLoading(false);
        if (onSuccess && syncResult.user) {
          onSuccess(syncResult.user);
        }
        onClose();
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err?.message || 'An unexpected error occurred during Google Sign-In.');
      setIsGoogleLoading(false);
    }
  };

  // 2. Email/Password Authentication Flow
  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);

    if (mode === 'signin') {
      const result = storage.login(email, password);
      setIsLoading(false);
      if (!result.success || !result.user) {
        setErrorMsg(result.error || 'Invalid email or password.');
        return;
      }

      setSuccessMsg(`Welcome back, ${result.user.name}!`);
      setTimeout(() => {
        if (onSuccess && result.user) {
          onSuccess(result.user);
        }
        onClose();
      }, 1000);
    } else {
      // Registration
      if (!name.trim()) {
        setIsLoading(false);
        setErrorMsg('Please enter your full name.');
        return;
      }

      if (password.length < 6) {
        setIsLoading(false);
        setErrorMsg('Password should be at least 6 characters long.');
        return;
      }

      const result = storage.register({
        name,
        email,
        password,
        phone,
        currentLevel,
      });

      setIsLoading(false);
      if (!result.success || !result.user) {
        setErrorMsg(result.error || 'Registration failed.');
        return;
      }

      setSuccessMsg(`Welcome, ${result.user.name}! Your account has been created.`);
      setTimeout(() => {
        if (onSuccess && result.user) {
          onSuccess(result.user);
        }
        onClose();
      }, 1000);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fadeIn">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
          {/* Header Bar */}
          <div className="px-6 py-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo-transparent.png"
                alt="Online Quran Academy Logo"
                className="w-10 h-10 object-contain p-1 rounded-xl bg-white/10 border border-amber-400/30"
                onError={(e) => {
                  e.currentTarget.src = '/logo.png';
                }}
              />
              <div>
                <h3 className="font-cinzel text-base font-bold leading-tight">
                  {mode === 'signin' ? 'Sign In to Your Account' : 'Create Student Account'}
                </h3>
                <p className="text-[11px] text-emerald-200 font-sans">
                  Muhammad Tariq — Online Quran Academy
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 border-b border-stone-200 bg-stone-50 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                resetMessages();
              }}
              className={`py-3 text-center transition-colors cursor-pointer border-b-2 ${
                mode === 'signin'
                  ? 'border-emerald-800 text-emerald-950 bg-white font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                resetMessages();
              }}
              className={`py-3 text-center transition-colors cursor-pointer border-b-2 ${
                mode === 'signup'
                  ? 'border-emerald-800 text-emerald-950 bg-white font-bold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Create Account (Sign Up)
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto space-y-4 text-stone-700">
            {/* Status Notifications */}
            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{successMsg}</span>
              </div>
            )}

            {cancellationMsg && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2 animate-fadeIn">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{cancellationMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-2 animate-fadeIn">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMsg}</span>
                </div>
                {isUnconfigured && (
                  <button
                    type="button"
                    onClick={() => setShowSetupModal(true)}
                    className="ml-6 px-2.5 py-1 text-[11px] font-semibold bg-rose-100 hover:bg-rose-200 text-rose-950 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                  >
                    View Firebase Configuration Instructions →
                  </button>
                )}
              </div>
            )}

            {/* Official Google Account Chooser Action */}
            <div className="space-y-2 pt-1">
              <GoogleSignInButton
                onClick={handleGoogleAuth}
                isLoading={isGoogleLoading}
                disabled={isLoading}
                label="Continue with Google"
              />

              <div className="flex items-center gap-1.5 justify-center text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Google&apos;s official account chooser • We never see your password</span>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="grow border-t border-stone-200"></div>
              <span className="shrink mx-3 text-[11px] text-stone-400 font-medium uppercase tracking-wider">
                or continue with email
              </span>
              <div className="grow border-t border-stone-200"></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                    <UserIcon className="w-3.5 h-3.5 text-stone-400" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Abdullah Tariq"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Password *</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === 'signup' ? 'At least 6 characters' : 'Enter your password'}
                    className="w-full px-3 py-2 pr-9 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">
                      WhatsApp / Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">
                      Current Learning Level
                    </label>
                    <select
                      value={currentLevel}
                      onChange={(e) => setCurrentLevel(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-800 bg-white"
                    >
                      <option value="Beginner (Noorani Qaida)">Beginner (Noorani Qaida)</option>
                      <option value="Intermediate (Quran Reading / Nazra)">Intermediate (Quran Reading / Nazra)</option>
                      <option value="Advanced (Quran with Tajweed)">Advanced (Quran with Tajweed)</option>
                    </select>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-60"
              >
                {isLoading
                  ? 'Processing...'
                  : mode === 'signin'
                  ? 'Sign In to Account'
                  : 'Create Student Account'}
              </button>
            </form>

            {/* Toggle Link */}
            <div className="pt-2 text-center text-xs text-stone-500">
              {mode === 'signin' ? (
                <span>
                  Don&apos;t have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      resetMessages();
                    }}
                    className="text-emerald-900 font-semibold hover:underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </span>
              ) : (
                <span>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      resetMessages();
                    }}
                    className="text-emerald-900 font-semibold hover:underline cursor-pointer"
                  >
                    Sign In here
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Firebase Setup Modal for Google OAuth Configuration Guidance */}
      <FirebaseSetupModal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
      />
    </>
  );
};
