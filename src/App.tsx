import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { QuizStats } from './components/QuizStats';
import { QuizCard } from './components/QuizCard';
import { ResultScreen } from './components/ResultScreen';
import { ModeSelectorModal } from './components/ModeSelectorModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { PasswordGate } from './components/PasswordGate';
import { ParticipantHistoryModal } from './components/ParticipantHistoryModal';
import { SocoeLogo } from './components/SocoeLogo';
import {
  MASTER_QUESTIONS,
  prepareQuizQuestions,
  SECTION_METADATA,
} from './data/questions';
import {
  MistakeRecord,
  QuizMode,
  QuizOption,
  QuizQuestion,
  QuizSection,
} from './types';
import { Shield, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  // Session password protection state & Participant email
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('socoe_genesis_auth') === 'unlocked';
  });
  const [participantEmail, setParticipantEmail] = useState<string>(() => {
    return sessionStorage.getItem('socoe_genesis_email') || '';
  });

  const [currentMode, setCurrentMode] = useState<QuizMode>('FULL');
  const [currentSection, setCurrentSection] = useState<QuizSection>('ALL');

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Time tracking
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Modals
  const [isModeModalOpen, setIsModeModalOpen] = useState<boolean>(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState<boolean>(false);
  const [isRosterModalOpen, setIsRosterModalOpen] = useState<boolean>(false);

  // Initialize Quiz helper
  const startQuiz = useCallback(
    (mode: QuizMode = 'FULL', section: QuizSection = 'ALL', customPool?: QuizQuestion[]) => {
      let limit: number | undefined;
      if (mode === 'SPRINT_30') {
        limit = 30;
      }

      const prepared = customPool
        ? prepareQuizQuestions(section, limit, customPool)
        : prepareQuizQuestions(section, limit);

      setQuestions(prepared);
      setCurrentIndex(0);
      setSelectedOptionIdx(null);
      setIsAnswered(false);
      setScore(0);
      setStreak(0);
      setMistakes([]);
      setIsComplete(false);
      setStartTime(Date.now());
      setElapsedSeconds(0);
      setCurrentMode(mode);
      setCurrentSection(section);
    },
    []
  );

  // Initial load
  useEffect(() => {
    startQuiz('FULL', 'ALL');
  }, [startQuiz]);

  // Timer loop
  useEffect(() => {
    if (isComplete) return;
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [isComplete, startTime]);

  // Handle Option Selection
  const handleSelectOption = (option: QuizOption, index: number) => {
    if (isAnswered) return;

    const currentQ = questions[currentIndex];
    setSelectedOptionIdx(index);
    setIsAnswered(true);

    if (option.correct) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
      const correctOpt = currentQ.options.find((o) => o.correct);
      const mistake: MistakeRecord = {
        questionId: currentQ.id,
        questionText: currentQ.text,
        section: currentQ.section,
        sectionTitle: currentQ.sectionTitle,
        selectedAnswer: option.text,
        correctAnswer: correctOpt ? correctOpt.text : 'Verified SOP Protocol',
        reason: option.reason,
      };
      setMistakes((prev) => [...prev, mistake]);
    }
  };

  // Next Question / Complete
  const handleNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, questions.length]);

  // Retest Missed Questions Only
  const handleRetestMissed = () => {
    if (mistakes.length === 0) return;
    const missedIds = new Set(mistakes.map((m) => m.questionId));
    const missedPool = MASTER_QUESTIONS.filter((q) => missedIds.has(q.id));
    startQuiz('FULL', 'ALL', missedPool);
  };

  // Lock Session Handler
  const handleLockSession = () => {
    sessionStorage.removeItem('socoe_genesis_auth');
    setIsUnlocked(false);
  };

  const handleUnlock = (email: string) => {
    setParticipantEmail(email);
    setIsUnlocked(true);
  };

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'Escape') {
        setIsModeModalOpen(false);
        setIsShortcutsModalOpen(false);
        return;
      }

      // During active quiz screen
      if (!isComplete && questions.length > 0) {
        const currentQ = questions[currentIndex];

        // Keys 1, 2, 3, 4 for selecting options
        if (!isAnswered) {
          const num = parseInt(e.key, 10);
          if (num >= 1 && num <= currentQ.options.length) {
            handleSelectOption(currentQ.options[num - 1], num - 1);
            return;
          }
        }

        // Space or Enter to proceed to next ticket when answered
        if (isAnswered && (e.key === 'Enter' || e.code === 'Space')) {
          e.preventDefault();
          handleNextQuestion();
          return;
        }

        // 'r' or 'R' to restart
        if ((e.key === 'r' || e.key === 'R') && !e.ctrlKey && !e.metaKey) {
          startQuiz(currentMode, currentSection);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isComplete,
    questions,
    currentIndex,
    isAnswered,
    handleNextQuestion,
    currentMode,
    currentSection,
    startQuiz,
  ]);

  const currentQ = questions[currentIndex];
  const liveAccuracy =
    currentIndex === 0 && !isAnswered
      ? 100.0
      : Number(((score / (currentIndex + (isAnswered ? 1 : 0))) * 100).toFixed(1));

  // If password gate is locked, render confidential password screen
  if (!isUnlocked) {
    return <PasswordGate onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden font-sans">
      {/* SOCOE Dynamic Aurora & Mesh Background (matching company website) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00c2cb 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Luminous Chevron / Aurora V-gradient inspired by website banner */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-b from-cyan-600/10 via-teal-500/5 to-transparent blur-3xl opacity-60" />
        <div className="absolute top-[25%] -left-[200px] w-[500px] h-[500px] rounded-full bg-cyan-700/8 blur-[120px]" />
        <div className="absolute top-[40%] -right-[200px] w-[500px] h-[500px] rounded-full bg-blue-700/8 blur-[120px]" />
      </div>

      {/* Top Navbar */}
      <Navbar
        currentMode={currentMode}
        currentSection={currentSection}
        onOpenModeSelector={() => setIsModeModalOpen(true)}
        onResetQuiz={() => startQuiz(currentMode, currentSection)}
        onOpenKeyboardShortcuts={() => setIsShortcutsModalOpen(true)}
        onLockSession={handleLockSession}
        onOpenRoster={() => setIsRosterModalOpen(true)}
        activeEmail={participantEmail}
        totalTickets={questions.length}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-center">
        {/* Sub-header / Brand Anchor */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/40">
                <Shield className="w-3 h-3" />
                SOCOE GENESIS Module Training
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading">
              GENESIS Process Flow & Nomenclature Challenge
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Strictly grounded in SANSOLS, JobSarawak, EXPRT, and HAVEN standard operating procedures.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>PASS MARK: 80%</span>
          </div>
        </div>

        {/* Live Quiz Flow vs Results */}
        {!isComplete && currentQ ? (
          <div id="quiz-active-session">
            {/* Telemetry Stats Bar */}
            <QuizStats
              currentIndex={currentIndex}
              totalTickets={questions.length}
              score={score}
              accuracy={liveAccuracy}
              streak={streak}
              currentSection={currentQ.section}
            />

            {/* Interactive Question Card */}
            <QuizCard
              question={currentQ}
              selectedOptionIdx={selectedOptionIdx}
              isAnswered={isAnswered}
              onSelectOption={handleSelectOption}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={currentIndex === questions.length - 1}
            />
          </div>
        ) : isComplete ? (
          /* Comprehensive Results Dashboard */
          <ResultScreen
            score={score}
            total={questions.length}
            mistakes={mistakes}
            timeSpentSeconds={elapsedSeconds}
            mode={currentMode}
            section={currentSection}
            participantEmail={participantEmail}
            onRestart={() => startQuiz(currentMode, currentSection)}
            onRetestMissed={handleRetestMissed}
            onOpenModeSelector={() => setIsModeModalOpen(true)}
          />
        ) : null}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-[#04060d] py-6 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-300">
            <SocoeLogo size="sm" showTagline={false} />
            <span className="text-slate-600 hidden sm:inline">&bull;</span>
            <span className="italic text-slate-400 hidden sm:inline">Architects of Tomorrow</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Procedural routing focus &bull; FWTA, SANSOLS, HAVEN, EXPRT, GENESIS & SAFHIS
          </div>
          <div className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} SOCOE. Internal Training & Assessment.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ModeSelectorModal
        isOpen={isModeModalOpen}
        onClose={() => setIsModeModalOpen(false)}
        currentMode={currentMode}
        currentSection={currentSection}
        onSelectMode={(mode, section) => startQuiz(mode, section || 'ALL')}
      />

      <KeyboardShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />

      <ParticipantHistoryModal
        isOpen={isRosterModalOpen}
        onClose={() => setIsRosterModalOpen(false)}
        currentEmail={participantEmail}
      />
    </div>
  );
}
