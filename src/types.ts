export type QuizSection =
  | 'ALL'
  | 'NOMENCLATURE'
  | 'JOBSARAWAK'
  | 'SANSOLS'
  | 'EXPRT'
  | 'HAVEN'
  | 'ACCOUNTS';

export interface QuizOption {
  text: string;
  correct: boolean;
  reason: string;
}

export interface RawScenario {
  text: string;
  options: QuizOption[];
}

export interface QuizQuestion {
  id: string;
  section: QuizSection;
  sectionTitle: string;
  text: string;
  options: QuizOption[];
  sourceNote?: string;
}

export interface MistakeRecord {
  questionId: string;
  questionText: string;
  section: QuizSection;
  sectionTitle: string;
  selectedAnswer: string;
  correctAnswer: string;
  reason: string;
}

export type QuizMode = 'FULL' | 'SPRINT_15' | 'SECTION';

export interface AssessmentParticipant {
  email: string;
  unlockedAt: string;
}

export interface QuizSessionSummary {
  total: number;
  score: number;
  accuracy: number;
  passed: boolean;
  mistakes: MistakeRecord[];
  timeSpentSeconds: number;
  mode: QuizMode;
  section?: QuizSection;
}
