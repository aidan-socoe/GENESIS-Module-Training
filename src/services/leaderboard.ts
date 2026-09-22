export interface LeaderboardEntry {
  email: string;
  bestPercentage: number;
  bestScore: number;
  totalQuestions: number;
  bestTimeSeconds: number;
  attemptsCount: number;
  lastAttemptAt: string;
  mode: string;
  section: string;
  passed: boolean;
}

const LEADERBOARD_STORAGE_KEY = 'socoe_genesis_leaderboard_v1';

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (!raw) {
      // Seed with initial realistic training benchmarks if empty so the leaderboard is immediately exciting
      const initialBenchmarks: LeaderboardEntry[] = [
        {
          email: 'sarah.t@socoe.com',
          bestPercentage: 96.7,
          bestScore: 87,
          totalQuestions: 90,
          bestTimeSeconds: 520, // 8m 40s
          attemptsCount: 3,
          lastAttemptAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
          mode: 'FULL',
          section: 'ALL',
          passed: true,
        },
        {
          email: 'michael.k@socoe.com',
          bestPercentage: 93.3,
          bestScore: 84,
          totalQuestions: 90,
          bestTimeSeconds: 615, // 10m 15s
          attemptsCount: 2,
          lastAttemptAt: new Date(Date.now() - 3600 * 1000 * 9).toISOString(),
          mode: 'FULL',
          section: 'ALL',
          passed: true,
        },
        {
          email: 'chong.w@socoe.com',
          bestPercentage: 90.0,
          bestScore: 81,
          totalQuestions: 90,
          bestTimeSeconds: 710, // 11m 50s
          attemptsCount: 2,
          lastAttemptAt: new Date(Date.now() - 3600 * 1000 * 20).toISOString(),
          mode: 'FULL',
          section: 'ALL',
          passed: true,
        },
        {
          email: 'aisha.r@socoe.com',
          bestPercentage: 86.7,
          bestScore: 78,
          totalQuestions: 90,
          bestTimeSeconds: 795, // 13m 15s
          attemptsCount: 1,
          lastAttemptAt: new Date(Date.now() - 3600 * 1000 * 28).toISOString(),
          mode: 'FULL',
          section: 'ALL',
          passed: true,
        },
      ];
      localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(initialBenchmarks));
      return initialBenchmarks;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read leaderboard from localStorage', err);
    return [];
  }
}

/**
 * Competitive ranking comparator:
 * 1. Higher percentage first
 * 2. If percentages are tied, faster completion time (lower timeSeconds) wins!
 */
export function sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (b.bestPercentage !== a.bestPercentage) {
      return b.bestPercentage - a.bestPercentage;
    }
    return a.bestTimeSeconds - b.bestTimeSeconds;
  });
}

export interface RecordAttemptResult {
  isNewPersonalBest: boolean;
  improvedPercentage: boolean;
  improvedTime: boolean;
  previousBest?: {
    percentage: number;
    timeSeconds: number;
  };
  rank: number;
  totalCompetitors: number;
  leaderboard: LeaderboardEntry[];
}

/**
 * Records or updates a candidate's attempt:
 * - If candidate is retaking, their entry updates if:
 *   a) Their percentage improved, OR
 *   b) Their percentage tied their best, but their time got faster!
 * - Increments their attemptsCount
 */
export function recordLeaderboardAttempt(params: {
  email: string;
  percentage: number;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  mode: string;
  section: string;
  passed: boolean;
}): RecordAttemptResult {
  const cleanEmail = params.email.trim().toLowerCase();
  const all = getLeaderboard();
  const existingIdx = all.findIndex((e) => e.email.toLowerCase() === cleanEmail);

  let isNewPersonalBest = false;
  let improvedPercentage = false;
  let improvedTime = false;
  let prevBest: { percentage: number; timeSeconds: number } | undefined;

  if (existingIdx >= 0) {
    const prev = all[existingIdx];
    prevBest = {
      percentage: prev.bestPercentage,
      timeSeconds: prev.bestTimeSeconds,
    };

    const newPctIsHigher = params.percentage > prev.bestPercentage;
    const samePctFasterTime =
      params.percentage === prev.bestPercentage && params.timeSpentSeconds < prev.bestTimeSeconds;

    if (newPctIsHigher) {
      improvedPercentage = true;
      isNewPersonalBest = true;
    } else if (samePctFasterTime) {
      improvedTime = true;
      isNewPersonalBest = true;
    }

    all[existingIdx] = {
      email: cleanEmail,
      bestPercentage: Math.max(prev.bestPercentage, params.percentage),
      bestScore: newPctIsHigher
        ? params.score
        : prev.bestScore,
      totalQuestions: params.totalQuestions,
      bestTimeSeconds:
        newPctIsHigher
          ? params.timeSpentSeconds
          : Math.min(prev.bestTimeSeconds, params.timeSpentSeconds),
      attemptsCount: (prev.attemptsCount || 1) + 1,
      lastAttemptAt: new Date().toISOString(),
      mode: params.mode,
      section: params.section,
      passed: prev.passed || params.passed,
    };
  } else {
    isNewPersonalBest = true;
    improvedPercentage = true;
    improvedTime = true;
    all.push({
      email: cleanEmail,
      bestPercentage: params.percentage,
      bestScore: params.score,
      totalQuestions: params.totalQuestions,
      bestTimeSeconds: params.timeSpentSeconds,
      attemptsCount: 1,
      lastAttemptAt: new Date().toISOString(),
      mode: params.mode,
      section: params.section,
      passed: params.passed,
    });
  }

  const sorted = sortLeaderboard(all);
  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(sorted));
  } catch (err) {
    console.error('Failed to persist leaderboard', err);
  }

  const rank = sorted.findIndex((e) => e.email.toLowerCase() === cleanEmail) + 1;

  return {
    isNewPersonalBest,
    improvedPercentage,
    improvedTime,
    previousBest: prevBest,
    rank: rank > 0 ? rank : sorted.length,
    totalCompetitors: sorted.length,
    leaderboard: sorted,
  };
}
