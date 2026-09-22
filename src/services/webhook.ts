import { QuizMode, QuizSection, MistakeRecord } from '../types';

export interface WebhookMistakeItem {
  questionId: string;
  section: string;
  sectionTitle: string;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  reason: string;
}

export interface WebhookPayload {
  eventType: 'START' | 'FINISH' | 'ABANDON';
  candidateEmail: string;
  timestamp: string;
  mode: QuizMode;
  section: QuizSection;
  status: 'Finished' | 'Unfinished' | 'Started';
  score?: number;
  totalQuestions?: number;
  percentage?: number;
  passed?: boolean;
  timeSpentSeconds?: number;
  timeSpentFormatted?: string;
  // Section performance breakdown for full exam or multi-section
  sectionBreakdown?: Record<string, { correct: number; total: number; percentage: number }>;
  mistakesCount?: number;
  // Summary tags of weakest domains
  weakestModules?: string[];
  // Option 2: Full item analysis of every incorrect answer
  detailedMistakes?: WebhookMistakeItem[];
  clientIpOrUserAgent?: string;
}

// Default fallback webhook key or user configured in localStorage/env
export const DEFAULT_WEBHOOK_URL_KEY = 'socoe_google_sheet_webhook_url';

export function getStoredWebhookUrl(): string {
  if (typeof window === 'undefined') return '';
  const fromStorage = localStorage.getItem(DEFAULT_WEBHOOK_URL_KEY);
  if (fromStorage && fromStorage.trim()) return fromStorage.trim();
  // Check import.meta.env if provided
  const fromEnv = (import.meta as any).env?.VITE_GOOGLE_SHEET_WEBHOOK_URL;
  if (fromEnv && fromEnv.trim()) return fromEnv.trim();
  return '';
}

export function setStoredWebhookUrl(url: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DEFAULT_WEBHOOK_URL_KEY, url.trim());
}

/**
 * Dispatches an event payload to the Google Sheet Webhook (Google Apps Script Web App).
 * Uses fetch with keepalive and mode 'no-cors' option if needed, because Google Apps Script
 * redirects (302) to script.googleusercontent.com which standard CORS blocks on POST unless handled.
 */
export async function sendToGoogleSheetWebhook(payload: WebhookPayload, customUrl?: string): Promise<{ success: boolean; message: string }> {
  const url = customUrl || getStoredWebhookUrl();
  if (!url) {
    console.warn('[Webhook] No Google Sheet Webhook URL configured. Event saved locally.');
    saveLocalWebhookEvent(payload);
    return { success: false, message: 'No Google Sheet Webhook URL configured.' };
  }

  try {
    saveLocalWebhookEvent(payload);

    await fetch(url, {
      method: 'POST',
      mode: 'no-cors', // Essential for Google Apps Script 302 redirect responses!
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return { success: true, message: 'Recorded successfully in Google Sheet.' };
  } catch (err: any) {
    console.error('[Webhook] Failed to send webhook event:', err);
    return { success: false, message: err?.message || 'Network error reaching Google Sheet.' };
  }
}

/**
 * Local audit log of webhook events for resilience and verification
 */
export function saveLocalWebhookEvent(payload: WebhookPayload) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem('socoe_webhook_submissions');
    const list = raw ? JSON.parse(raw) : [];
    list.push(payload);
    localStorage.setItem('socoe_webhook_submissions', JSON.stringify(list.slice(-100)));
  } catch (e) {
    console.error('Failed to write to local webhook log', e);
  }
}

export function getLocalWebhookSubmissions(): WebhookPayload[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('socoe_webhook_submissions');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Option 2 Google Apps Script implementation:
 * - Tab 1: "Assessment Summary" (1 row per test session)
 * - Tab 2: "Mistakes Item Analysis" (1 row per question answered incorrectly)
 * Plus automated email dispatch with diagnostic details to the candidate.
 */
export const GOOGLE_APPS_SCRIPT_TEMPLATE = `
/**
 * SOCOE GENESIS Training - Google Sheet & Email Webhook Script (Option 2: Item Analysis)
 * 
 * Multi-Tab Architecture:
 * - Tab 1: "Assessment Summary" (Overview of each test session, score %, weakest domains)
 * - Tab 2: "Mistakes Item Analysis" (Detailed breakdown of each question answered incorrectly)
 * 
 * Setup Instructions:
 * 1. Open your Google Sheet, click Extensions > Apps Script
 * 2. Delete everything and paste this entire code
 * 3. Click "Deploy" > "New deployment"
 * 4. Select type: "Web app"
 * 5. Configuration:
 *    - Description: SOCOE GENESIS Challenge Webhook (Option 2)
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Click "Deploy", Authorize permissions, and copy the "Web app URL"
 * 7. Paste that Web app URL into the SOCOE Challenge Webhook Configuration modal!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // ==========================================
    // 1. TAB 1: ASSESSMENT SUMMARY
    // ==========================================
    var summarySheet = ss.getSheetByName("Assessment Summary");
    if (!summarySheet) {
      summarySheet = ss.insertSheet("Assessment Summary", 0);
    }

    if (summarySheet.getLastRow() === 0) {
      summarySheet.appendRow([
        "Timestamp",
        "Candidate Email",
        "Status",
        "Mode",
        "Section",
        "Score",
        "Total Questions",
        "Percentage",
        "Passed?",
        "Time Spent",
        "Total Mistakes",
        "Weakest Domain(s)",
        "Nomenclature %",
        "JobSarawak %",
        "SANSOLS %",
        "EXPRT %",
        "HAVEN %",
        "Accounts %",
        "Email Dispatched?"
      ]);
      summarySheet.getRange(1, 1, 1, 19).setFontWeight("bold").setBackground("#0f172a").setFontColor("#38bdf8");
      summarySheet.setFrozenRows(1);
    }

    // ==========================================
    // 2. TAB 2: MISTAKES ITEM ANALYSIS (Option 2)
    // ==========================================
    var itemAnalysisSheet = ss.getSheetByName("Mistakes Item Analysis");
    if (!itemAnalysisSheet) {
      itemAnalysisSheet = ss.insertSheet("Mistakes Item Analysis", 1);
    }

    if (itemAnalysisSheet.getLastRow() === 0) {
      itemAnalysisSheet.appendRow([
        "Timestamp",
        "Candidate Email",
        "Module Code",
        "Module Name",
        "Question ID",
        "Question Scenario / Prompt",
        "Candidate's Selected Answer",
        "Correct SOP Protocol",
        "Procedural SOP Reason",
        "Assessment Mode"
      ]);
      itemAnalysisSheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#1e1b4b").setFontColor("#c084fc");
      itemAnalysisSheet.setFrozenRows(1);
    }

    var ts = data.timestamp || new Date().toISOString();
    var email = data.candidateEmail || "Unknown";
    var status = data.status || (data.eventType === "FINISH" ? "Finished" : "Unfinished");
    var mode = data.mode || "FULL";
    var section = data.section || "ALL";
    var score = data.score != null ? data.score : "-";
    var total = data.totalQuestions != null ? data.totalQuestions : "-";
    var pct = data.percentage != null ? data.percentage + "%" : "-";
    var passed = data.passed != null ? (data.passed ? "PASS" : "FAIL") : "-";
    var timeSpent = data.timeSpentFormatted || (data.timeSpentSeconds ? Math.floor(data.timeSpentSeconds/60) + "m " + (data.timeSpentSeconds%60) + "s" : "-");
    var mistakes = data.mistakesCount != null ? data.mistakesCount : 0;
    var weakest = (data.weakestModules && data.weakestModules.length > 0) ? data.weakestModules.join(", ") : "None (<80%)";

    // Module breakdown percentages
    var b = data.sectionBreakdown || {};
    var nom = b["NOMENCLATURE"] ? b["NOMENCLATURE"].percentage + "%" : "-";
    var js = b["JOBSARAWAK"] ? b["JOBSARAWAK"].percentage + "%" : "-";
    var san = b["SANSOLS"] ? b["SANSOLS"].percentage + "%" : "-";
    var exp = b["EXPRT"] ? b["EXPRT"].percentage + "%" : "-";
    var hav = b["HAVEN"] ? b["HAVEN"].percentage + "%" : "-";
    var acc = b["ACCOUNTS"] ? b["ACCOUNTS"].percentage + "%" : "-";

    var emailSent = "N/A";

    // ------------------------------------------
    // Populate Tab 2: Mistakes Item Analysis
    // ------------------------------------------
    var itemsLogged = 0;
    if (data.detailedMistakes && data.detailedMistakes.length > 0) {
      var rowsToAppend = [];
      for (var i = 0; i < data.detailedMistakes.length; i++) {
        var m = data.detailedMistakes[i];
        rowsToAppend.push([
          ts,
          email,
          m.section || "-",
          m.sectionTitle || "-",
          m.questionId || "-",
          m.questionText || "-",
          m.selectedAnswer || "-",
          m.correctAnswer || "-",
          m.reason || "-",
          mode
        ]);
      }
      if (rowsToAppend.length > 0) {
        var startRow = itemAnalysisSheet.getLastRow() + 1;
        itemAnalysisSheet.getRange(startRow, 1, rowsToAppend.length, 10).setValues(rowsToAppend);
        itemsLogged = rowsToAppend.length;
      }
    }

    // ------------------------------------------
    // Send Automated Email to Candidate
    // ------------------------------------------
    if (data.eventType === "FINISH" && email && email.indexOf("@") !== -1) {
      try {
        var subject = "[SOCOE GENESIS Training] Assessment Results - " + passed + " (" + pct + ")";
        var htmlBody = 
          "<div style='font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;'>" +
          "<div style='background-color: #0f172a; padding: 18px; border-radius: 8px; text-align: center; margin-bottom: 20px;'>" +
          "<h2 style='color: #38bdf8; margin: 0;'>SOCOE GENESIS Training</h2>" +
          "<p style='color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;'>Assessment Completion Certificate & Diagnostic Report</p>" +
          "</div>" +
          "<p>Dear <strong>" + email + "</strong>,</p>" +
          "<p>Your submission for the <strong>GENESIS Process Flow & Nomenclature Assessment</strong> has been evaluated and logged into the central training registry.</p>" +
          "<table style='width: 100%; border-collapse: collapse; margin: 18px 0; font-size: 13px;'>" +
          "<tr style='background: #f8fafc;'><td style='padding: 10px; border: 1px solid #e2e8f0;'><strong>Assessment Status:</strong></td><td style='padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: " + (data.passed ? "#16a34a" : "#dc2626") + ";'>" + passed + "</td></tr>" +
          "<tr><td style='padding: 10px; border: 1px solid #e2e8f0;'><strong>Final Score:</strong></td><td style='padding: 10px; border: 1px solid #e2e8f0;'>" + score + " / " + total + " (" + pct + ")</td></tr>" +
          "<tr style='background: #f8fafc;'><td style='padding: 10px; border: 1px solid #e2e8f0;'><strong>Benchmark Passing Mark:</strong></td><td style='padding: 10px; border: 1px solid #e2e8f0;'>80.0%</td></tr>" +
          "<tr><td style='padding: 10px; border: 1px solid #e2e8f0;'><strong>Time Elapsed:</strong></td><td style='padding: 10px; border: 1px solid #e2e8f0;'>" + timeSpent + "</td></tr>" +
          "<tr style='background: #f8fafc;'><td style='padding: 10px; border: 1px solid #e2e8f0;'><strong>Total Discrepancies:</strong></td><td style='padding: 10px; border: 1px solid #e2e8f0;'>" + mistakes + "</td></tr>" +
          "<tr><td style='padding: 10px; border: 1px solid #e2e8f0;'><strong>Priority Focus Domain(s):</strong></td><td style='padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #d97706;'>" + weakest + "</td></tr>" +
          "</table>";

        // Module Breakdown table
        if (Object.keys(b).length > 0) {
          htmlBody += "<h3 style='color: #0f172a; margin-top: 22px; font-size: 15px;'>Module Performance Breakdown</h3>" +
            "<table style='width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 20px;'>" +
            "<tr style='background: #f1f5f9; text-align: left;'><th style='padding: 8px; border: 1px solid #cbd5e1;'>Module</th><th style='padding: 8px; border: 1px solid #cbd5e1;'>Score</th><th style='padding: 8px; border: 1px solid #cbd5e1;'>Status</th></tr>";
          
          var modKeys = ["NOMENCLATURE", "JOBSARAWAK", "SANSOLS", "EXPRT", "HAVEN", "ACCOUNTS"];
          for (var k = 0; k < modKeys.length; k++) {
            var mKey = modKeys[k];
            if (b[mKey]) {
              var mPassed = b[mKey].percentage >= 80;
              htmlBody += "<tr>" +
                "<td style='padding: 8px; border: 1px solid #e2e8f0;'><strong>" + mKey + "</strong></td>" +
                "<td style='padding: 8px; border: 1px solid #e2e8f0;'>" + b[mKey].correct + " / " + b[mKey].total + " (" + b[mKey].percentage + "%)</td>" +
                "<td style='padding: 8px; border: 1px solid #e2e8f0; color: " + (mPassed ? "#16a34a" : "#dc2626") + "; font-weight: bold;'>" + (mPassed ? "Pass" : "Review Needed") + "</td>" +
                "</tr>";
            }
          }
          htmlBody += "</table>";
        }

        // Summary of Mistakes for review
        if (data.detailedMistakes && data.detailedMistakes.length > 0) {
          htmlBody += "<h3 style='color: #0f172a; margin-top: 20px; font-size: 15px;'>Discrepancy Review (" + data.detailedMistakes.length + " Items)</h3>" +
            "<div style='background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 12px; margin-bottom: 20px;'>";
          
          for (var j = 0; j < Math.min(data.detailedMistakes.length, 8); j++) {
            var dm = data.detailedMistakes[j];
            htmlBody += "<div style='margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #fcd34d; font-size: 12px;'>" +
              "<strong>[" + dm.section + "] " + dm.questionText + "</strong><br/>" +
              "<span style='color: #dc2626;'>&bull; Your Selection: " + dm.selectedAnswer + "</span><br/>" +
              "<span style='color: #16a34a;'>&bull; Verified SOP Protocol: " + dm.correctAnswer + "</span><br/>" +
              "<span style='color: #64748b; font-style: italic;'>&bull; SOP Reason: " + dm.reason + "</span>" +
              "</div>";
          }
          if (data.detailedMistakes.length > 8) {
            htmlBody += "<p style='font-size: 11px; color: #78716c; margin: 0;'>+ " + (data.detailedMistakes.length - 8) + " additional items logged in the central portal.</p>";
          }
          htmlBody += "</div>";
        }

        htmlBody += "<p style='font-size: 11px; color: #64748b; margin-top: 26px; border-top: 1px solid #e2e8f0; padding-top: 12px;'>SOCOE Sdn Bhd &bull; Confidential GENESIS Training & Compliance System</p></div>";

        MailApp.sendEmail({
          to: email,
          subject: subject,
          htmlBody: htmlBody
        });
        emailSent = "Sent to " + email;
      } catch (mailErr) {
        emailSent = "Mail Error: " + mailErr.toString();
      }
    }

    // ------------------------------------------
    // Append row to Tab 1: Assessment Summary
    // ------------------------------------------
    summarySheet.appendRow([
      ts,
      email,
      status,
      mode,
      section,
      score,
      total,
      pct,
      passed,
      timeSpent,
      mistakes,
      weakest,
      nom,
      js,
      san,
      exp,
      hav,
      acc,
      emailSent
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      emailSent: emailSent,
      summaryLogged: true,
      mistakesLoggedCount: itemsLogged
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
`.trim();
