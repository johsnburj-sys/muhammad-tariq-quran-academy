import React from 'react';
import { X, ShieldAlert, Key, Globe, CheckCircle, ExternalLink, Copy, Check } from 'lucide-react';
import { getFirebaseConfigStatus } from '../services/firebase';

interface FirebaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseSetupModal: React.FC<FirebaseSetupModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const status = getFirebaseConfigStatus();

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const envSample = `# Firebase Client Configuration
VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="${status.currentDomain}.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789012"
VITE_FIREBASE_APP_ID="1:123456789012:web:abcdef"`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400/20 text-amber-300 rounded-lg border border-amber-400/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold">Google Authentication Configuration</h3>
              <p className="text-xs text-emerald-200">
                Official Firebase Authentication & OAuth Setup
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-700">
          {/* Important Disclosure */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-semibold text-amber-900 text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Real Google Authentication Policy</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Google authentication in this application utilizes the official{' '}
              <strong>Firebase Authentication SDK</strong> with Google&apos;s genuine Account
              Chooser. In accordance with platform security standards, authentication is never
              faked or mocked. To enable live Google Sign-In, follow the setup steps below.
            </p>
          </div>

          {/* Current Status Checklist */}
          <div className="space-y-3">
            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider text-stone-500">
              Current Environment Configuration Status
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between">
                <span className="font-medium text-stone-700">Client Host Domain:</span>
                <code className="px-1.5 py-0.5 bg-stone-200 text-stone-800 rounded font-mono text-[11px]">
                  {status.currentDomain}
                </code>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between">
                <span className="font-medium text-stone-700">Firebase Configured:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                    status.isConfigured
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {status.isConfigured ? 'Ready' : 'Pending Credentials'}
                </span>
              </div>
            </div>
          </div>

          {/* Setup Steps */}
          <div className="space-y-4">
            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider text-stone-500">
              Step-by-Step Configuration Guide
            </h4>

            <ol className="space-y-3 list-decimal list-inside text-xs leading-relaxed text-stone-600">
              <li className="p-3 bg-white border border-stone-200 rounded-lg space-y-1">
                <span className="font-semibold text-stone-900">
                  1. Create a Firebase Project
                </span>
                <p className="text-stone-600 pl-4">
                  Open{' '}
                  <a
                    href="https://console.firebase.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-800 hover:underline font-medium inline-flex items-center gap-1"
                  >
                    Firebase Console <ExternalLink className="w-3 h-3" />
                  </a>{' '}
                  and select or create a project for your academy website.
                </p>
              </li>

              <li className="p-3 bg-white border border-stone-200 rounded-lg space-y-1">
                <span className="font-semibold text-stone-900">
                  2. Enable Google Sign-In Provider
                </span>
                <p className="text-stone-600 pl-4">
                  Navigate to <strong>Build &gt; Authentication &gt; Sign-in method</strong>, click{' '}
                  <strong>Add new provider</strong>, select <strong>Google</strong>, enable it, and
                  save your project support email.
                </p>
              </li>

              <li className="p-3 bg-white border border-stone-200 rounded-lg space-y-1">
                <span className="font-semibold text-stone-900">
                  3. Add Authorized Domain
                </span>
                <p className="text-stone-600 pl-4">
                  In Firebase Authentication under the <strong>Settings &gt; Authorized domains</strong>{' '}
                  tab, add your current domain:
                </p>
                <div className="pl-4 pt-1 flex items-center gap-2">
                  <code className="px-2 py-1 bg-stone-100 text-emerald-950 font-mono text-[11px] rounded border border-stone-200">
                    {status.currentDomain}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopy(status.currentDomain, 'domain')}
                    className="p-1 text-stone-500 hover:text-emerald-800 transition-colors cursor-pointer"
                    title="Copy domain"
                  >
                    {copiedKey === 'domain' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </li>

              <li className="p-3 bg-white border border-stone-200 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900">
                    4. Add Environment Variables (.env)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(envSample, 'env')}
                    className="text-emerald-800 hover:text-emerald-900 flex items-center gap-1 text-[11px] font-medium cursor-pointer"
                  >
                    {copiedKey === 'env' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Template
                      </>
                    )}
                  </button>
                </div>
                <p className="text-stone-600 pl-4">
                  Go to <strong>Project Settings &gt; General &gt; Your apps &gt; Web App</strong>,
                  copy the configuration object, and define these variables in your root{' '}
                  <code className="text-stone-800 font-mono">.env</code> file:
                </p>
                <pre className="mx-4 p-3 bg-stone-900 text-emerald-300 rounded-lg font-mono text-[11px] overflow-x-auto">
                  {envSample}
                </pre>
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg transition-all cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
