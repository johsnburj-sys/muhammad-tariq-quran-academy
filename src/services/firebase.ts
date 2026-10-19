/**
 * Firebase Authentication Service for Muhammad Tariq Online Quran Teaching
 * Implements official Google Account Chooser flow using Firebase Auth SDK.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  Auth,
  User as FirebaseUser,
} from 'firebase/auth';

export interface GoogleUserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

export interface GoogleAuthResult {
  success: boolean;
  isConfigured: boolean;
  user?: GoogleUserProfile;
  cancelled?: boolean;
  error?: string;
}

export interface FirebaseConfigStatus {
  isConfigured: boolean;
  missingKeys: string[];
  currentDomain: string;
  config: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

// 1. Read environment variables configured via Vite (VITE_FIREBASE_*)
const rawConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY || '').trim(),
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '').trim(),
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID || '').trim(),
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '').trim(),
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '').trim(),
  appId: (import.meta.env.VITE_FIREBASE_APP_ID || '').trim(),
};

// Check if a value is a placeholder or empty
const isPlaceholder = (val?: string) => {
  if (!val) return true;
  const lower = val.toLowerCase();
  return (
    lower.includes('your-') ||
    lower.includes('my_') ||
    lower.includes('example') ||
    lower === 'undefined' ||
    val.length < 5
  );
};

// Check if Firebase has real configuration credentials
export const isFirebaseConfigured = (): boolean => {
  return (
    !isPlaceholder(rawConfig.apiKey) &&
    !isPlaceholder(rawConfig.authDomain) &&
    !isPlaceholder(rawConfig.projectId) &&
    !isPlaceholder(rawConfig.appId)
  );
};

export const getFirebaseConfigStatus = (): FirebaseConfigStatus => {
  const missingKeys: string[] = [];
  if (isPlaceholder(rawConfig.apiKey)) missingKeys.push('VITE_FIREBASE_API_KEY');
  if (isPlaceholder(rawConfig.authDomain)) missingKeys.push('VITE_FIREBASE_AUTH_DOMAIN');
  if (isPlaceholder(rawConfig.projectId)) missingKeys.push('VITE_FIREBASE_PROJECT_ID');
  if (isPlaceholder(rawConfig.appId)) missingKeys.push('VITE_FIREBASE_APP_ID');

  const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

  return {
    isConfigured: missingKeys.length === 0,
    missingKeys,
    currentDomain,
    config: rawConfig,
  };
};

// Lazy initialization of Firebase
let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let googleProviderInstance: GoogleAuthProvider | null = null;

const getFirebaseAuth = (): Auth | null => {
  if (!isFirebaseConfigured()) {
    return null;
  }

  if (!appInstance) {
    if (getApps().length > 0) {
      appInstance = getApp();
    } else {
      appInstance = initializeApp(rawConfig);
    }
  }

  if (!authInstance && appInstance) {
    authInstance = getAuth(appInstance);
  }

  return authInstance;
};

const getGoogleProvider = (): GoogleAuthProvider => {
  if (!googleProviderInstance) {
    googleProviderInstance = new GoogleAuthProvider();
    // Official Google Account Chooser: force the official account selection screen
    // so users can select an available signed-in Google account or choose another account.
    googleProviderInstance.setCustomParameters({
      prompt: 'select_account',
    });
    // Request only basic identity profile and email
    googleProviderInstance.addScope('profile');
    googleProviderInstance.addScope('email');
  }
  return googleProviderInstance;
};

/**
 * Initiates official Google Sign-In with popup.
 * Opens Google's account chooser so users can pick or switch Google accounts.
 * Returns profile details (displayName, email, photoURL) without touching passwords.
 */
export const signInWithGoogle = async (): Promise<GoogleAuthResult> => {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      isConfigured: false,
      error:
        'Firebase Google Authentication is not yet configured. Please supply your Firebase credentials in environment variables.',
    };
  }

  try {
    const auth = getFirebaseAuth();
    if (!auth) {
      return {
        success: false,
        isConfigured: false,
        error: 'Unable to initialize Firebase Authentication client.',
      };
    }

    const provider = getGoogleProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    if (!user.email) {
      return {
        success: false,
        isConfigured: true,
        error: 'Google account did not provide an email address.',
      };
    }

    return {
      success: true,
      isConfigured: true,
      user: {
        uid: user.uid,
        displayName: user.displayName || user.email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL || undefined,
      },
    };
  } catch (error: any) {
    // Gracefully handle known Firebase Auth error codes
    const errorCode = error?.code || '';

    if (errorCode === 'auth/popup-closed-by-user') {
      return {
        success: false,
        isConfigured: true,
        cancelled: true,
        error: 'Google sign-in was cancelled. You closed the Google account selection window.',
      };
    }

    if (errorCode === 'auth/cancelled-popup-request') {
      return {
        success: false,
        isConfigured: true,
        cancelled: true,
        error: 'A subsequent sign-in attempt was initiated. Previous request cancelled.',
      };
    }

    if (errorCode === 'auth/popup-blocked') {
      return {
        success: false,
        isConfigured: true,
        error:
          'The Google sign-in popup was blocked by your browser. Please allow popups for this site and try again.',
      };
    }

    if (errorCode === 'auth/unauthorized-domain') {
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'current domain';
      return {
        success: false,
        isConfigured: true,
        error: `This domain (${currentHost}) is not authorized in Firebase Console. Go to Firebase Console > Authentication > Settings > Authorized Domains and add "${currentHost}".`,
      };
    }

    if (errorCode === 'auth/operation-not-allowed') {
      return {
        success: false,
        isConfigured: true,
        error:
          'Google Sign-In is not enabled in Firebase Console. Go to Firebase Console > Authentication > Sign-in method and enable Google.',
      };
    }

    if (errorCode === 'auth/invalid-api-key') {
      return {
        success: false,
        isConfigured: false,
        error: 'The provided Firebase API Key is invalid. Please verify your VITE_FIREBASE_API_KEY.',
      };
    }

    if (errorCode === 'auth/network-request-failed') {
      return {
        success: false,
        isConfigured: true,
        error: 'Network connection failed. Please check your internet connection and try again.',
      };
    }

    return {
      success: false,
      isConfigured: true,
      error: error?.message || 'An unexpected error occurred during Google authentication.',
    };
  }
};

/**
 * Sign out from Firebase Auth session
 */
export const signOutFromFirebase = async (): Promise<void> => {
  try {
    const auth = getFirebaseAuth();
    if (auth) {
      await firebaseSignOut(auth);
    }
  } catch (err) {
    console.error('Error signing out from Firebase:', err);
  }
};
