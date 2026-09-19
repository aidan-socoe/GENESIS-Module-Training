import React from 'react';
import { SocoeLogo } from './SocoeLogo';
import { BookOpen, RefreshCw, Layers, Keyboard } from 'lucide-react';
import { QuizMode, QuizSection } from '../types';
import { SECTION_METADATA } from '../data/questions';

interface NavbarProps {
  currentMode: QuizMode;
  currentSection: QuizSection;
  onOpenModeSelector: () => void;
  onResetQuiz: () => void;
  onOpenKeyboardShortcuts: () => void;
  totalTickets: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  currentSection,
  onOpenModeSelector,
  onResetQuiz,
  onOpenKeyboardShortcuts,
  totalTickets,
}) => {
  const getModeLabel = () => {
    if (currentMode === 'SPRINT_15') return '15-Ticket Sprint';
    if (currentMode === 'SECTION') return SECTION_METADATA[currentSection].label;
    return 'Full Master Challenge';
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-950/60 bg-[#060a14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: SOCOE Branding */}
        <div className="flex items-center gap-4">
          <SocoeLogo size="md" showTagline={false} />
          <div className="hidden md:flex flex-col border-l border-slate-800 pl-4">
            <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase font-heading">
              GENESIS Modules
            </span>
            <span className="text-[11px] text-cyan-400/90 font-medium">
              Procedural & Nomenclature Training
            </span>
          </div>
        </div>

        {/* Center / Right: Interactive Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Active Mode Pill / Button */}
          <button
            id="mode-selector-btn"
            onClick={onOpenModeSelector}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/60 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all text-xs font-medium text-slate-200"
            title="Switch quiz focus or question count"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline text-slate-400">Mode:</span>
            <span className="text-cyan-300 font-semibold truncate max-w-[140px] sm:max-w-none">
              {getModeLabel()}
            </span>
            <span className="px-1.5 py-0.5 text-[10px] rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
              {totalTickets}
            </span>
          </button>

          {/* Keyboard Shortcuts Helper */}
          <button
            id="shortcuts-btn"
            onClick={onOpenKeyboardShortcuts}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            title="Keyboard shortcuts (1-3, Space/Enter)"
            aria-label="Keyboard shortcuts"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Reset / Restart Session */}
          <button
            id="nav-restart-btn"
            onClick={onResetQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-300 text-xs font-semibold transition-all"
            title="Shuffle and start fresh"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Shuffle & Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
