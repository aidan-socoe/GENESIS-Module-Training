import React, { useState } from 'react';
import { ShieldCheck, Lock, ArrowRight, AlertCircle, KeyRound, Mail, CheckCircle2 } from 'lucide-react';
import { SocoeLogo } from './SocoeLogo';

interface PasswordGateProps {
  onUnlock: (email: string) => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [emailInput, setEmailInput] = useState(() => {
    return localStorage.getItem('socoe_genesis_last_email') || '';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPassword = passwordInput.trim();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setError('Please enter a valid staff email address to register your assessment.');
      return;
    }

    setIsSubmitting(true);

    // The authorized secret passcode
    const EXPECTED = 'SOCOE_GENESIS_module1';

    setTimeout(() => {
      if (cleanPassword === EXPECTED) {
        // Record participant session
        sessionStorage.setItem('socoe_genesis_auth', 'unlocked');
        sessionStorage.setItem('socoe_genesis_email', cleanEmail);
        localStorage.setItem('socoe_genesis_last_email', cleanEmail);

        // Append to tracked assessments log in localStorage
        try {
          const stored = localStorage.getItem('socoe_genesis_participants');
          const list = stored ? JSON.parse(stored) : [];
          list.push({
            email: cleanEmail,
            unlockedAt: new Date().toISOString(),
          });
          localStorage.setItem('socoe_genesis_participants', JSON.stringify(list));
        } catch {
          // Ignore local storage error if restricted
        }

        onUnlock(cleanEmail);
      } else {
        setError('Incorrect passcode. Please verify with your module lead.');
        setIsSubmitting(false);
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden font-sans">
      {/* Background Aurora / Mesh Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00c2cb 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-gradient-to-b from-cyan-600/15 via-teal-500/5 to-transparent blur-3xl opacity-70" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-cyan-700/10 blur-3xl" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-700/10 blur-3xl" />
      </div>

      {/* Top Brand Bar */}
      <header className="relative z-10 w-full border-b border-cyan-950/60 bg-[#060a14]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <SocoeLogo size="md" showTagline={false} />
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 px-3 py-1 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span>CONFIDENTIAL &bull; RESTRICTED</span>
          </div>
        </div>
      </header>

      {/* Center Gate Form */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-[#090e1c]/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Top Cyan Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

            {/* Icon Header */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-700/50 flex items-center justify-center shadow-lg shadow-cyan-950/50">
                  <KeyRound className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-cyan-800 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white tracking-tight font-heading">
                SOCOE GENESIS Training
              </h2>
              <p className="text-xs text-cyan-400 font-medium tracking-wide uppercase mt-1">
                Module 1 Assessment Sign-In
              </p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Provide your staff email to track your completion record, then enter the module passcode to begin.
              </p>
            </div>

            {/* Sign-in Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Staff Email Field */}
              <div>
                <label
                  htmlFor="staff-email-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  Staff Email Address
                </label>
                <div className="relative">
                  <input
                    id="staff-email-input"
                    type="email"
                    required
                    autoFocus={!emailInput}
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="name@socoe.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 text-sm text-slate-100 placeholder-slate-500 border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Used to attribute your test score & completion record
                </span>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="passcode-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  Access Passcode
                </label>
                <div className="relative">
                  <input
                    id="passcode-input"
                    type="password"
                    autoFocus={!!emailInput}
                    required
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter training passcode..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/90 text-sm text-slate-100 placeholder-slate-500 border transition-all outline-none font-mono ${
                      error
                        ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30'
                        : 'border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                    }`}
                  />
                </div>

                {error && (
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 px-3 py-2 rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                id="submit-passcode-btn"
                disabled={isSubmitting || !passwordInput.trim() || !emailInput.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-950/40 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <span>Sign In & Start Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800/60 text-center">
              <span className="text-[11px] text-slate-500">
                Authorized SOCOE Personnel Only &bull; SANSOLS, JobSarawak, EXPRT, HAVEN
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-4 text-center text-[11px] text-slate-500">
        &copy; {new Date().getFullYear()} SOCOE Sdn Bhd. Internal Training & Assessment.
      </footer>
    </div>
  );
};
