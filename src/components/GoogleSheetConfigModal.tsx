import React, { useState } from 'react';
import { Table, Copy, Check, ExternalLink, X, Save, AlertCircle, Send, CheckCircle2 } from 'lucide-react';
import {
  getStoredWebhookUrl,
  setStoredWebhookUrl,
  GOOGLE_APPS_SCRIPT_TEMPLATE,
  sendToGoogleSheetWebhook,
} from '../services/webhook';

interface GoogleSheetConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeEmail: string;
}

export const GoogleSheetConfigModal: React.FC<GoogleSheetConfigModalProps> = ({
  isOpen,
  onClose,
  activeEmail,
}) => {
  const [webhookUrl, setWebhookUrl] = useState(() => getStoredWebhookUrl());
  const [isCopied, setIsCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    setStoredWebhookUrl(webhookUrl);
    setSaveStatus('Webhook URL saved successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSendTestPayload = async () => {
    setIsTesting(true);
    setTestResult(null);

    const result = await sendToGoogleSheetWebhook(
      {
        eventType: 'FINISH',
        candidateEmail: activeEmail || 'test.participant@socoe.com',
        timestamp: new Date().toISOString(),
        mode: 'FULL',
        section: 'ALL',
        status: 'Finished',
        score: 85,
        totalQuestions: 90,
        percentage: 94.4,
        passed: true,
        timeSpentSeconds: 420,
        timeSpentFormatted: '7m 0s',
        sectionBreakdown: {
          NOMENCLATURE: { correct: 14, total: 15, percentage: 93.3 },
          JOBSARAWAK: { correct: 15, total: 15, percentage: 100.0 },
          SANSOLS: { correct: 13, total: 15, percentage: 86.7 },
          EXPRT: { correct: 14, total: 15, percentage: 93.3 },
          HAVEN: { correct: 15, total: 15, percentage: 100.0 },
          ACCOUNTS: { correct: 14, total: 15, percentage: 93.3 },
        },
        mistakesCount: 5,
        mistakeTopics: ['SANSOLS site inspection photo rules', 'EXPRT key post advertisement exception'],
      },
      webhookUrl
    );

    setIsTesting(false);
    setTestResult(result);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#091122] border border-cyan-500/30 p-6 sm:p-7 shadow-2xl shadow-cyan-950/60 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-heading">
                Google Sheet & Email Webhook Sync
              </h2>
              <p className="text-xs text-slate-400">
                Log assessment statistics directly into Google Sheets and dispatch result emails.
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

        {/* Step 1: Webhook URL Input */}
        <div className="space-y-2">
          <label htmlFor="webhook-url-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-200">
            Google Apps Script Webhook URL
          </label>
          <div className="flex gap-2">
            <input
              id="webhook-url-input"
              type="url"
              placeholder="https://script.google.com/macros/s/AKfycb.../exec"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-xs font-mono text-slate-100 placeholder-slate-600 outline-none"
            />
            <button
              onClick={handleSave}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
          </div>
          {saveStatus && (
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>{saveStatus}</span>
            </p>
          )}
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Every test started or finished will transmit a comprehensive JSON packet to this URL containing: candidate email, completion status, score, percentage, elapsed time, and per-module breakdown.
          </p>
        </div>

        {/* Test Trigger Button */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-slate-200 block">Test Webhook Connectivity</span>
            <span className="text-[11px] text-slate-400">
              Sends a sample 94.4% pass record to verify sheet row creation and test-taker email delivery.
            </span>
          </div>
          <button
            onClick={handleSendTestPayload}
            disabled={isTesting || !webhookUrl.trim()}
            className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 font-semibold text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            {isTesting ? <span className="animate-pulse">Transmitting...</span> : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send Test Row & Email</span>
              </>
            )}
          </button>
        </div>

        {testResult && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              testResult.success
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
            }`}
          >
            {testResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{testResult.message} Check your Google Sheet to verify the new row!</span>
          </div>
        )}

        {/* Step 2: Google Apps Script Setup Guide */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Apps Script Code (Copy into Google Sheets)
            </span>
            <button
              onClick={handleCopyScript}
              className="flex items-center gap-1 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-cyan-300 transition-colors cursor-pointer"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Apps Script'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-2">
            <p className="font-semibold text-cyan-400">Quick 2-minute setup instructions:</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Open your Google Sheet, click <strong className="text-white">Extensions &gt; Apps Script</strong>.</li>
              <li>Delete any boilerplate code in the editor, click <strong className="text-white">Copy Apps Script</strong> above, and paste it.</li>
              <li>Click the blue <strong className="text-white">Deploy &gt; New deployment</strong> button.</li>
              <li>Select <strong className="text-white">Web app</strong>, set <strong className="text-white">Who has access</strong> to <strong className="text-white">&quot;Anyone&quot;</strong>, and click Deploy.</li>
              <li>Copy the resulting Web App URL and paste it into the field above!</li>
            </ol>
          </div>

          <div className="max-h-48 overflow-y-auto rounded-lg bg-black/60 p-3 border border-slate-800/80 font-mono text-[10px] text-slate-400 select-all">
            <pre className="whitespace-pre-wrap">{GOOGLE_APPS_SCRIPT_TEMPLATE}</pre>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
          <span>Google Apps Script automatically uses <code className="text-cyan-400">MailApp.sendEmail</code> to email test takers.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
