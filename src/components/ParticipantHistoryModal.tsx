import React, { useState } from 'react';
import { Users, X, Download, Trash2, Mail, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { AssessmentParticipant } from '../types';

interface ParticipantHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail: string;
}

export const ParticipantHistoryModal: React.FC<ParticipantHistoryModalProps> = ({
  isOpen,
  onClose,
  currentEmail,
}) => {
  const [records, setRecords] = useState<AssessmentParticipant[]>(() => {
    try {
      const stored = localStorage.getItem('socoe_genesis_participants');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  if (!isOpen) return null;

  const handleExportCSV = () => {
    if (records.length === 0) return;
    const header = 'Email,Timestamp (UTC),Local Time\n';
    const rows = records
      .map((r) => {
        const d = new Date(r.unlockedAt);
        return `"${r.email}","${r.unlockedAt}","${d.toLocaleString()}"`;
      })
      .join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `socoe_genesis_participants_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    if (window.confirm('Clear all local participant login records on this device?')) {
      localStorage.removeItem('socoe_genesis_participants');
      setRecords([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0b1328] border border-cyan-500/30 p-6 sm:p-7 shadow-2xl shadow-cyan-950/50 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-heading">Assessment Access Log</h2>
              <p className="text-xs text-slate-400">
                Audit trail of staff emails logged during passcode authentication.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Session */}
        {currentEmail && (
          <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-700/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 block font-semibold">
                  Active Participant Session
                </span>
                <span className="text-sm font-semibold text-white">{currentEmail}</span>
              </div>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium">
              Authenticated
            </span>
          </div>
        )}

        {/* Roster Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              Stored Records ({records.length})
            </span>
            <div className="flex items-center gap-2">
              {records.length > 0 && (
                <>
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={handleClear}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Clear history"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-800/40">
            {records.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 rounded-xl bg-slate-900/30 border border-slate-800">
                No participant records logged yet.
              </div>
            ) : (
              [...records].reverse().map((r, i) => (
                <div key={i} className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-200">{r.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-mono">
                    <Clock className="w-3 h-3 text-slate-600" />
                    <span>{new Date(r.unlockedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
          <span>Records are securely stored on client local persistence.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
