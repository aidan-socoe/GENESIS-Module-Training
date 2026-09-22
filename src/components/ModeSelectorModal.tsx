import React from 'react';
import { X, Layers, Zap, BookOpen, Check } from 'lucide-react';
import { QuizMode, QuizSection } from '../types';
import { SECTION_METADATA } from '../data/questions';

interface ModeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: QuizMode;
  currentSection: QuizSection;
  onSelectMode: (mode: QuizMode, section?: QuizSection) => void;
}

export const ModeSelectorModal: React.FC<ModeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentMode,
  currentSection,
  onSelectMode,
}) => {
  if (!isOpen) return null;

  const sections: QuizSection[] = [
    'NOMENCLATURE',
    'JOBSARAWAK',
    'SANSOLS',
    'EXPRT',
    'HAVEN',
    'ACCOUNTS',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0b1328] border border-cyan-500/30 p-6 sm:p-7 shadow-2xl shadow-cyan-950/50 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-heading">Select Challenge Mode</h2>
              <p className="text-xs text-slate-400">
                Tailor your training session length and curriculum focus.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Modes */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Session Lengths
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Full 68 questions */}
            <button
              onClick={() => {
                onSelectMode('FULL', 'ALL');
                onClose();
              }}
              className={`p-4 rounded-xl border text-left transition-all relative ${
                currentMode === 'FULL'
                  ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">Full Master Exam</span>
                {currentMode === 'FULL' && <Check className="w-4 h-4 text-cyan-400" />}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                All 90 comprehensive scenarios across all GENESIS workforce modules.
              </p>
              <div className="mt-2.5 inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-700/40">
                90 CX Tickets
              </div>
            </button>

            {/* Quick 30 Sprint */}
            <button
              onClick={() => {
                onSelectMode('SPRINT_30', 'ALL');
                onClose();
              }}
              className={`p-4 rounded-xl border text-left transition-all relative ${
                currentMode === 'SPRINT_30'
                  ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>30-Ticket Sprint</span>
                </div>
                {currentMode === 'SPRINT_30' && <Check className="w-4 h-4 text-cyan-400" />}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Focused 10-minute training with 30 randomized scenarios selected across all modules.
              </p>
              <div className="mt-2.5 inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-700/40">
                30 Random Tickets
              </div>
            </button>
          </div>
        </div>

        {/* Section specific drills */}
        <div className="space-y-3 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Module Specific Drills
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
            {sections.map((sec) => {
              const meta = SECTION_METADATA[sec];
              const isSelected = currentMode === 'SECTION' && currentSection === sec;

              return (
                <button
                  key={sec}
                  onClick={() => {
                    onSelectMode('SECTION', sec);
                    onClose();
                  }}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-cyan-950/50 border-cyan-400 text-white ring-1 ring-cyan-400'
                      : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="truncate">
                    <div className="text-xs font-bold text-white truncate">{meta.label}</div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {meta.description}
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
