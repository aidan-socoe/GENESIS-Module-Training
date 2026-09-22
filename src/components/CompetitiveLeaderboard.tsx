import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Clock,
  Flame,
  Zap,
  RotateCw,
  TrendingUp,
  Award,
  ChevronRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { LeaderboardEntry } from '../services/leaderboard';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentCandidateEmail?: string;
  currentAttemptPercentage?: number;
  currentAttemptTimeSeconds?: number;
  isNewPersonalBest?: boolean;
  improvedTime?: boolean;
  improvedPercentage?: boolean;
  userRank?: number;
}

export const CompetitiveLeaderboard: React.FC<LeaderboardProps> = ({
  entries,
  currentCandidateEmail,
  currentAttemptPercentage,
  currentAttemptTimeSeconds,
  isNewPersonalBest,
  improvedTime,
  improvedPercentage,
  userRank,
}) => {
  const [filterMode, setFilterMode] = useState<'ALL' | 'FULL' | 'SPRINT_30'>('ALL');

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}m ${remainder < 10 ? '0' : ''}${remainder}s`;
  };

  const filteredEntries = entries.filter((entry) => {
    if (filterMode === 'ALL') return true;
    return entry.mode === filterMode;
  });

  const getRankBadge = (rankIndex: number) => {
    if (rankIndex === 0) {
      return (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-amber-500/30 text-sm">
          <Trophy className="w-4 h-4 text-slate-950 fill-slate-950" />
        </div>
      );
    }
    if (rankIndex === 1) {
      return (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-200 to-slate-400 text-slate-950 font-black flex items-center justify-center shadow-md shadow-slate-300/20 text-xs">
          <Medal className="w-4 h-4 text-slate-950" />
        </div>
      );
    }
    if (rankIndex === 2) {
      return (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 font-black flex items-center justify-center text-xs border border-amber-600/40">
          <Medal className="w-4 h-4 text-amber-200" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 font-mono font-bold flex items-center justify-center text-xs">
        #{rankIndex + 1}
      </div>
    );
  };

  const currentUserClean = (currentCandidateEmail || '').trim().toLowerCase();

  return (
    <div className="bg-[#091122]/95 border border-cyan-500/30 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-cyan-950/40 space-y-5 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-bl from-amber-500/10 via-cyan-500/5 to-transparent blur-2xl pointer-events-none" />

      {/* Header & Personal Best banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0 shadow-lg shadow-amber-950/50">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white font-heading">
                Live Competitive Leaderboard
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300">
                Speed & Accuracy
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Ranked by <strong className="text-cyan-300">Highest Score %</strong> first, with ties broken by <strong className="text-amber-300">Fastest Completion Time</strong>.
            </p>
          </div>
        </div>

        {/* Mode filter pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setFilterMode('ALL')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              filterMode === 'ALL'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Modes
          </button>
          <button
            onClick={() => setFilterMode('FULL')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              filterMode === 'FULL'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            90 Master
          </button>
          <button
            onClick={() => setFilterMode('SPRINT_30')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              filterMode === 'SPRINT_30'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            30 Sprint
          </button>
        </div>
      </div>

      {/* Dynamic Feedback Card if user achieved a new record or updated their best */}
      {isNewPersonalBest && (
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/50 via-cyan-950/40 to-slate-950 border border-amber-500/40 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <Sparkles className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>NEW PERSONAL BEST RECORD!</span>
                {improvedPercentage && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-300">
                    +Higher Accuracy
                  </span>
                )}
                {improvedTime && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-500/50 text-cyan-300">
                    +Faster Pace
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-300">
                Your leaderboard standing has been promoted to <strong className="text-white font-mono">Rank #{userRank}</strong> with {currentAttemptPercentage}% in {formatTime(currentAttemptTimeSeconds || 0)}.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex text-[11px] font-semibold text-amber-300 uppercase tracking-wider px-2.5 py-1 rounded bg-amber-900/30 border border-amber-700/40">
            Updated
          </span>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
        <div className="grid grid-cols-12 px-4 py-2.5 bg-[#060b17] border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-4 sm:col-span-5">Candidate / Staff</div>
          <div className="col-span-3 sm:col-span-2 text-center">Accuracy</div>
          <div className="col-span-2 text-center">Best Pace</div>
          <div className="col-span-2 text-right">Retakes</div>
        </div>

        <div className="divide-y divide-slate-850 max-h-96 overflow-y-auto">
          {filteredEntries.map((entry, idx) => {
            const isCurrentUser =
              currentUserClean && entry.email.toLowerCase() === currentUserClean;

            return (
              <div
                key={entry.email}
                className={`grid grid-cols-12 px-4 py-3 items-center text-xs transition-colors ${
                  isCurrentUser
                    ? 'bg-cyan-950/40 border-l-2 border-l-cyan-400 text-white font-semibold'
                    : idx === 0
                    ? 'bg-amber-950/20 text-slate-200'
                    : 'text-slate-300 hover:bg-slate-900/40'
                }`}
              >
                {/* Rank Badge */}
                <div className="col-span-1 flex justify-center">
                  {getRankBadge(idx)}
                </div>

                {/* Candidate Email / Identifier */}
                <div className="col-span-4 sm:col-span-5 pl-2 truncate flex items-center gap-2">
                  <span className="truncate font-medium text-white">
                    {entry.email}
                  </span>
                  {isCurrentUser && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono shrink-0">
                      YOU
                    </span>
                  )}
                  {idx === 0 && (
                    <span className="hidden md:inline-flex text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold uppercase tracking-wider shrink-0">
                      Champion
                    </span>
                  )}
                </div>

                {/* Percentage & Score */}
                <div className="col-span-3 sm:col-span-2 text-center">
                  <div className="inline-flex items-center gap-1 font-bold text-white font-mono">
                    <span
                      className={`text-sm ${
                        entry.bestPercentage >= 90
                          ? 'text-emerald-400'
                          : entry.bestPercentage >= 80
                          ? 'text-cyan-300'
                          : 'text-rose-400'
                      }`}
                    >
                      {entry.bestPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <span className="block text-[10px] text-slate-500 font-mono">
                    {entry.bestScore}/{entry.totalQuestions}
                  </span>
                </div>

                {/* Pace / Time */}
                <div className="col-span-2 text-center">
                  <div className="inline-flex items-center gap-1 font-mono text-xs text-amber-300 font-semibold">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{formatTime(entry.bestTimeSeconds)}</span>
                  </div>
                  <span className="block text-[10px] text-slate-500">
                    {entry.mode === 'FULL' ? '90 Qs' : '30 Qs'}
                  </span>
                </div>

                {/* Retake count */}
                <div className="col-span-2 text-right">
                  <div className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <RotateCw className="w-3 h-3 text-cyan-400/80" />
                    <span>{entry.attemptsCount} {entry.attemptsCount === 1 ? 'try' : 'tries'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pro-tip banner */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Retake Strategy:</strong> Review your missed procedural SOPs below, then click <strong className="text-cyan-300">Retest Missed Only</strong> or <strong className="text-cyan-300">Restart Session</strong>. Each subsequent run automatically records your fastest pace and highest score!
          </span>
        </div>
      </div>
    </div>
  );
};
