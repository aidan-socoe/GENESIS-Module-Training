import React from 'react';
import { Target, Award, Flame, CheckCircle2, AlertCircle } from 'lucide-react';
import { QuizSection } from '../types';
import { SECTION_METADATA } from '../data/questions';

interface QuizStatsProps {
  currentIndex: number;
  totalTickets: number;
  score: number;
  accuracy: number;
  streak: number;
  currentSection: QuizSection;
}

export const QuizStats: React.FC<QuizStatsProps> = ({
  currentIndex,
  totalTickets,
  score,
  accuracy,
  streak,
  currentSection,
}) => {
  const currentStep = currentIndex + 1;
  const progressPercent = Math.min(100, Math.round((currentStep / totalTickets) * 100));

  const sectionMeta = SECTION_METADATA[currentSection] || SECTION_METADATA.ALL;

  const getAccuracyColor = () => {
    if (accuracy >= 80) return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
    if (accuracy >= 60) return 'text-amber-400 bg-amber-950/40 border-amber-500/30';
    return 'text-rose-400 bg-rose-950/40 border-rose-500/30';
  };

  return (
    <div id="quiz-stats-panel" className="w-full bg-[#0a1020]/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl shadow-black/40 backdrop-blur-md mb-6">
      {/* Top row: Section tag and metrics */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        {/* Active System Section Pill */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Current Module:
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${sectionMeta.badgeColor} shadow-sm shadow-cyan-500/20`}
          >
            {sectionMeta.label}
          </span>
        </div>

        {/* Live Metrics Group */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Streak Indicator */}
          {streak >= 2 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{streak} Streak!</span>
            </div>
          )}

          {/* Accuracy Badge */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold ${getAccuracyColor()}`}
            title="Passing threshold is 80.0%"
          >
            <Target className="w-3.5 h-3.5" />
            <span>ACCURACY: {accuracy.toFixed(1)}%</span>
          </div>

          {/* Score Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              SCORE: <span className="text-white">{score}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Progress Line & Ticket Counter */}
      <div>
        <div className="flex justify-between items-center text-xs font-semibold mb-2">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            TICKET <span className="text-white text-sm font-bold">#{currentStep}</span> of {totalTickets}
          </span>
          <span className="text-cyan-400 font-mono text-xs">{progressPercent}% COMPLETED</span>
        </div>

        {/* Progress Bar with Cyan-to-Teal SOCOE Glow */}
        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-teal-300 shadow-[0_0_12px_rgba(0,194,203,0.7)] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
