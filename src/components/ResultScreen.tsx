import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Award,
  AlertOctagon,
  Clock,
  Layers,
  Filter,
  Check,
  HelpCircle,
  FileCheck,
  Table,
  MailCheck,
  Send
} from 'lucide-react';
import { MistakeRecord, QuizMode, QuizQuestion, QuizSection } from '../types';
import { SECTION_METADATA } from '../data/questions';
import { getStoredWebhookUrl } from '../services/webhook';

interface ResultScreenProps {
  score: number;
  total: number;
  mistakes: MistakeRecord[];
  timeSpentSeconds: number;
  mode: QuizMode;
  section: QuizSection;
  questions?: QuizQuestion[];
  participantEmail?: string;
  onRestart: () => void;
  onRetestMissed: () => void;
  onOpenModeSelector: () => void;
  onOpenGoogleSheetSync?: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  total,
  mistakes,
  timeSpentSeconds,
  mode,
  section,
  questions = [],
  participantEmail,
  onRestart,
  onRetestMissed,
  onOpenModeSelector,
  onOpenGoogleSheetSync,
}) => {
  const percentage = Number(((score / total) * 100).toFixed(1));
  const passed = percentage >= 80.0;
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('ALL');
  const hasWebhook = !!getStoredWebhookUrl();

  // Compute detailed per-section statistics
  const sectionStats = React.useMemo(() => {
    const stats: Record<string, { total: number; mistakes: number; correct: number; percentage: number; label: string }> = {};

    // Determine all sections present in the current test
    questions.forEach((q) => {
      if (!stats[q.section]) {
        stats[q.section] = {
          total: 0,
          mistakes: 0,
          correct: 0,
          percentage: 0,
          label: SECTION_METADATA[q.section]?.label || q.section,
        };
      }
      stats[q.section].total += 1;
    });

    // Count mistakes by section
    mistakes.forEach((m) => {
      if (stats[m.section]) {
        stats[m.section].mistakes += 1;
      }
    });

    // Calculate correct and percentages
    Object.keys(stats).forEach((k) => {
      const s = stats[k];
      s.correct = Math.max(0, s.total - s.mistakes);
      s.percentage = s.total > 0 ? Number(((s.correct / s.total) * 100).toFixed(1)) : 0;
    });

    return stats;
  }, [questions, mistakes]);

  const sectionKeys = Object.keys(sectionStats);

  useEffect(() => {
    if (passed) {
      // Fire confetti celebrating achievement
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00c2cb', '#00f5d4', '#ffffff', '#38bdf8', '#d4b483'],
        });
      } catch (e) {
        // Fallback gracefully if canvas context fails
      }
    }
  }, [passed]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    if (mins === 0) return `${remainder}s`;
    return `${mins}m ${remainder}s`;
  };

  const filteredMistakes =
    selectedSectionFilter === 'ALL'
      ? mistakes
      : mistakes.filter((m) => m.section === selectedSectionFilter);

  const uniqueMistakeSections = Array.from(new Set(mistakes.map((m) => m.section)));

  return (
    <div id="quiz-result-dashboard" className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-12">
      {/* Hero Outcome Card */}
      <div
        className={`relative rounded-3xl p-6 sm:p-10 border overflow-hidden shadow-2xl backdrop-blur-md ${
          passed
            ? 'bg-gradient-to-br from-[#071d22] via-[#09182a] to-[#060e1d] border-emerald-500/40 shadow-emerald-500/10'
            : 'bg-gradient-to-br from-[#230d17] via-[#1a0e1c] to-[#0b0c16] border-rose-500/40 shadow-rose-500/10'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border mb-1">
              {passed ? (
                <span className="text-emerald-300 border-emerald-500/40 bg-emerald-950/60 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  GREAT WORK!
                </span>
              ) : (
                <span className="text-rose-300 border-rose-500/40 bg-rose-950/60 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  RETEST REQUIRED (TARGET &ge; 80%)
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              {passed ? 'SESSION PASSED' : 'SESSION FAILED'}
            </h1>
            {participantEmail && (
              <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-mono pt-0.5">
                <span className="text-slate-400">Candidate:</span>
                <span className="font-semibold underline decoration-cyan-500/50">{participantEmail}</span>
              </div>
            )}
            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              {passed
                ? 'Excellent work! You have satisfied the criteria for the GENESIS module framework.'
                : 'You scored below the 80% passing benchmark. Review the discrepancies below and retry.'}
            </p>
          </div>

          {/* Big Score Radial/Pill */}
          <div className="shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/10 min-w-[170px]">
            <span className="text-4xl sm:text-5xl font-black text-white font-heading">
              {percentage}%
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-1">
              Final Score
            </span>
            <span className="text-[11px] text-cyan-400 font-mono mt-1">
              {score} of {total} correct
            </span>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#0a1226]/80 border border-slate-800 rounded-xl p-4 flex flex-col">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Total Tickets
          </span>
          <span className="text-2xl font-bold text-white mt-1">{total}</span>
          <span className="text-[11px] text-slate-500 mt-1">Evaluated Scenarios</span>
        </div>

        <div className="bg-[#0a1226]/80 border border-slate-800 rounded-xl p-4 flex flex-col">
          <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
            Correct Answers
          </span>
          <span className="text-2xl font-bold text-emerald-300 mt-1">{score}</span>
          <span className="text-[11px] text-slate-500 mt-1">Grounded in SOP</span>
        </div>

        <div className="bg-[#0a1226]/80 border border-slate-800 rounded-xl p-4 flex flex-col">
          <span className="text-xs font-medium text-rose-400 uppercase tracking-wider">
            Mistakes Made
          </span>
          <span className="text-2xl font-bold text-rose-300 mt-1">{mistakes.length}</span>
          <span className="text-[11px] text-slate-500 mt-1">Actionable items</span>
        </div>

        <div className="bg-[#0a1226]/80 border border-slate-800 rounded-xl p-4 flex flex-col">
          <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
            Session Time
          </span>
          <span className="text-2xl font-bold text-cyan-300 mt-1">
            {formatTime(timeSpentSeconds)}
          </span>
          <span className="text-[11px] text-slate-500 mt-1">Active evaluation</span>
        </div>
      </div>

      {/* Section Performance Breakdown (Particularly for Full Exam & Sprint) */}
      {sectionKeys.length > 1 && (
        <div className="bg-[#091122]/90 border border-slate-800/80 rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Section & Module Breakdown</span>
              </h2>
              <p className="text-xs text-slate-400">
                Detailed domain-level scores recorded into your assessment report.
              </p>
            </div>
            <span className="text-[11px] font-mono text-cyan-400">
              {sectionKeys.length} Modules Assessed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sectionKeys.map((secKey) => {
              const item = sectionStats[secKey];
              const secPassed = item.percentage >= 80.0;
              return (
                <div
                  key={secKey}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-200 line-clamp-1">
                      {item.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        secPassed
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                          : 'bg-rose-950 text-rose-300 border border-rose-800/50'
                      }`}
                    >
                      {item.percentage}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full ${
                        secPassed ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}
                      style={{ width: `${Math.min(100, item.percentage)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      {item.correct} of {item.total} correct
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {item.mistakes} {item.mistakes === 1 ? 'error' : 'errors'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Google Sheet Webhook Sync Notification Banner */}
      <div className="p-4 rounded-2xl bg-[#09152b] border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0">
            <MailCheck className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">
              Automated Results Logging & Participant Email Dispatch
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {hasWebhook
                ? 'Your test metrics and section statistics are synced to Google Sheets and dispatched via email.'
                : 'Connect your Google Sheet webhook URL to automatically record all candidate scores and email results.'}
            </p>
          </div>
        </div>
        {onOpenGoogleSheetSync && (
          <button
            onClick={onOpenGoogleSheetSync}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-cyan-500/30 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Table className="w-3.5 h-3.5 text-cyan-400" />
            <span>{hasWebhook ? 'Manage Sheet Sync' : 'Setup Google Sheet'}</span>
          </button>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
        <button
          id="retry-full-btn"
          onClick={onRestart}
          className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RETRY SESSION (NEW RANDOMIZATION)</span>
        </button>

        {mistakes.length > 0 && (
          <button
            id="retest-missed-btn"
            onClick={onRetestMissed}
            className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 hover:border-rose-400 text-rose-200 font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>RETEST MISSED TICKETS ONLY ({mistakes.length})</span>
          </button>
        )}

        <button
          id="switch-module-btn"
          onClick={onOpenModeSelector}
          className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Switch Module / Mode</span>
        </button>
      </div>

      {/* Mistakes Review Section */}
      <div className="bg-[#091122]/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-heading">
              <FileCheck className="w-5 h-5 text-cyan-400" />
              <span>Diagnostic Review</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                {mistakes.length === 0 ? 'No Errors' : `${mistakes.length} Discrepancies`}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Review procedural rationales to reinforce correct SOP knowledge.
            </p>
          </div>

          {/* Filter Pills if multiple sections have mistakes */}
          {uniqueMistakeSections.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedSectionFilter('ALL')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedSectionFilter === 'ALL'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All ({mistakes.length})
              </button>
              {uniqueMistakeSections.map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSectionFilter(sec)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    selectedSectionFilter === sec
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mistakes List */}
        <div className="mt-6 space-y-4">
          {mistakes.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-300">Perfect Execution!</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mt-1">
                Zero procedural mistakes recorded in this session. You have demonstrated flawless
                knowledge of the GENESIS modules.
              </p>
            </div>
          ) : (
            filteredMistakes.map((m, idx) => (
              <div
                key={m.questionId || idx}
                className="rounded-xl border border-slate-800 bg-[#070d1c] p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-bold text-cyan-400 font-mono">
                    #{idx + 1} &bull; [{m.sectionTitle || m.section}]
                  </span>
                </div>

                <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                  {m.questionText}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Your Answer */}
                  <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-xs">
                    <span className="block font-bold text-rose-400 uppercase tracking-wider mb-1">
                      Your Selected Answer:
                    </span>
                    <span className="text-rose-200 font-medium">{m.selectedAnswer}</span>
                  </div>

                  {/* Correct Answer */}
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs">
                    <span className="block font-bold text-emerald-400 uppercase tracking-wider mb-1">
                      Official Correct Protocol:
                    </span>
                    <span className="text-emerald-200 font-medium">{m.correctAnswer}</span>
                  </div>
                </div>

                {/* SOP Rationale */}
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-cyan-300 mr-1.5">SOP Guideline:</span>
                    <span>{m.reason}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
