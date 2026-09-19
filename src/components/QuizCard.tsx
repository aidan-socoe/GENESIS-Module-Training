import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { QuizOption, QuizQuestion } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  selectedOptionIdx: number | null;
  isAnswered: boolean;
  onSelectOption: (option: QuizOption, index: number) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedOptionIdx,
  isAnswered,
  onSelectOption,
  onNextQuestion,
  isLastQuestion,
}) => {
  const selectedOption = selectedOptionIdx !== null ? question.options[selectedOptionIdx] : null;
  const isCorrect = selectedOption?.correct ?? false;

  return (
    <div id="quiz-question-card" className="relative w-full rounded-2xl bg-gradient-to-b from-[#0d162c] to-[#090f20] border border-cyan-500/20 p-6 sm:p-8 shadow-2xl shadow-black/60 overflow-hidden">
      {/* Decorative SOCOE Ambient Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      {/* Question Header & Prompt */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
            {question.sectionTitle}
          </span>
          <span className="text-xs text-slate-400">CX Verification Scenario</span>
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-relaxed font-heading">
          {question.text}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="relative z-10 space-y-3 mb-6">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionIdx === idx;
          const isThisCorrect = option.correct;

          // Determine styling based on answered state
          let buttonStyles =
            'border-slate-800/90 bg-slate-900/60 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-850/80';
          let badgeStyles = 'bg-slate-800 text-slate-400 border-slate-700';

          if (isAnswered) {
            if (isSelected) {
              if (isThisCorrect) {
                buttonStyles =
                  'border-emerald-500/80 bg-emerald-950/40 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/40';
                badgeStyles = 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold';
              } else {
                buttonStyles =
                  'border-rose-500/80 bg-rose-950/40 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.2)] ring-1 ring-rose-500/40';
                badgeStyles = 'bg-rose-500 text-white border-rose-400 font-bold';
              }
            } else if (isThisCorrect) {
              // Highlight the correct answer that the user missed
              buttonStyles =
                'border-emerald-500/50 bg-emerald-950/20 text-emerald-200/90 ring-1 ring-emerald-500/30';
              badgeStyles = 'bg-emerald-600/50 text-emerald-100 border-emerald-500';
            } else {
              buttonStyles = 'border-slate-900 bg-slate-950/40 text-slate-500 opacity-60';
              badgeStyles = 'bg-slate-900 text-slate-600 border-slate-800';
            }
          }

          const optionKeys = ['A', 'B', 'C', 'D'];
          const keyboardNumber = idx + 1;

          return (
            <motion.button
              key={idx}
              id={`option-btn-${idx}`}
              whileHover={!isAnswered ? { scale: 1.008, x: 2 } : {}}
              whileTap={!isAnswered ? { scale: 0.995 } : {}}
              onClick={() => !isAnswered && onSelectOption(option, idx)}
              disabled={isAnswered}
              className={`w-full text-left p-4 sm:p-4.5 rounded-xl border transition-all duration-200 flex items-start gap-3.5 group cursor-pointer disabled:cursor-default ${buttonStyles}`}
            >
              {/* Option Key / Shortcut Badge */}
              <div
                className={`shrink-0 w-7 h-7 rounded-lg border text-xs flex items-center justify-center font-mono transition-colors ${badgeStyles}`}
              >
                {isAnswered && isThisCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                ) : isAnswered && isSelected && !isThisCorrect ? (
                  <XCircle className="w-4 h-4 text-rose-200" />
                ) : (
                  <span>{optionKeys[idx] || keyboardNumber}</span>
                )}
              </div>

              {/* Option Text */}
              <div className="flex-1 pt-0.5">
                <span className="text-sm sm:text-base font-normal leading-relaxed">
                  {option.text}
                </span>

                {/* Tag for missed correct answer */}
                {isAnswered && !isSelected && isThisCorrect && (
                  <span className="block mt-1.5 text-xs font-semibold text-emerald-400">
                    Official Correct Protocol
                  </span>
                )}
              </div>

              {/* Keyboard Shortcut Hint for desktop */}
              {!isAnswered && (
                <span className="hidden sm:inline-block shrink-0 px-2 py-0.5 text-[10px] font-mono text-slate-500 rounded bg-slate-950/60 border border-slate-800 group-hover:border-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                  Key {keyboardNumber}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback Accordion / Notice */}
      <AnimatePresence>
        {isAnswered && selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            id="feedback-box"
            className={`relative z-10 p-4 sm:p-5 rounded-xl border mb-6 ${
              isCorrect
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                {isCorrect ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {isCorrect ? 'Verified Correct' : 'Compliance Discrepancy'}
                  </span>
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-100">
                  {selectedOption.reason}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Navigation Footer */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
        <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span>Source: SANSOLS/ALIANCE Framework & Standard Process Guides</span>
        </div>

        {isAnswered && (
          <motion.button
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            id="next-step-btn"
            onClick={onNextQuestion}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>{isLastQuestion ? 'FINISH & VIEW RESULTS' : 'NEXT CX TICKET'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
