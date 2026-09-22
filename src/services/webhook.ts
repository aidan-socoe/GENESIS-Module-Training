import { QuizMode, QuizSection, MistakeRecord } from '../types';

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
  // Optional summary of mistakes for audit
  mistakeTopics?: string[];
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
    // Save to local submission history so it is never lost
    saveLocalWebhookEvent(payload);
    return { success: false, message: 'No Google Sheet Webhook URL configured.' };
  }

  try {
    saveLocalWebhookEvent(payload);

    // Google Apps Script Web Apps handle POST requests. To avoid browser CORS preflight blocking,
    // sending as text/plain or urlencoded is standard for Apps Script doPost(e).
    // e.postData.contents will contain the valid JSON string.
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
    localStorage.setItem('socoe_webhook_submissions', JSON.stringify(list.slice(-100))); // Keep last 100
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
 * Prepares the Google Apps Script code snippet for the user to copy-paste into Extensions > Apps Script in Google Sheets.
 * This script will automatically append the row to the active sheet and compute the formatted columns,
 * plus automatically send an email to the test-taker via MailApp.sendEmail!
 */
export const GOOGLE_APPS_SCRIPT_TEMPLATE = `
/**
 * SOCOE GENESIS Training - Google Sheet & Email Webhook Script
 * 
 * Setup Instructions:
 * 1. In your Google Sheet, click Extensions > Apps Script
 * 2. Delete everything and paste this entire code
 * 3. Click "Deploy" > "New deployment"
 * 4. Select type: "Web app"
 * 5. Configuration:
 *    - Description: SOCOE GENESIS Challenge Webhook
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (allows applet to send POST)
 * 6. Click "Deploy", Authorize permissions, and copy the "Web app URL".
 * 7. Paste that Web app URL into the SOCOE Challenge Webhook Configuration modal!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Assessment Results") || ss.getActiveSheet();

    // Auto-create headers if sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Candidate Email",
        "Status",
        "Mode",
        "Section",
        "Score",
        "Total",
        "Percentage",
        "Passed?",
        "Time Spent",
        "Mistakes",
        "Nomenclature %",
        "JobSarawak %",
        "SANSOLS %",
        "EXPRT %",
        "HAVEN %",
        "Accounts %",
        "Email Dispatched?"
      ]);
      sheet.getRange(1, 1, 1, 18).setFontWeight("bold").setBackground("#0f172a").setFontColor("#38bdf8");
      sheet.setFrozenRows(1);
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
    var mistakes = data.mistakesCount != null ? data.mistakesCount : "-";

    // Section Breakdown values
    var b = data.sectionBreakdown || {};
    var nom = b["NOMENCLATURE"] ? b["NOMENCLATURE"].percentage + "%" : "-";
    var js = b["JOBSARAWAK"] ? b["JOBSARAWAK"].percentage + "%" : "-";
    var san = b["SANSOLS"] ? b["SANSOLS"].percentage + "%" : "-";
    var exp = b["EXPRT"] ? b["EXPRT"].percentage + "%" : "-";
    var hav = b["HAVEN"] ? b["HAVEN"].percentage + "%" : "-";
    var acc = b["ACCOUNTS"] ? b["ACCOUNTS"].percentage + "%" : "-";

    var emailSent = "N/A";

    // If test is finished, email results directly to the test-taker!
    if (data.eventType === "FINISH" && email && email.indexOf("@") !== -1) {
      try {
        var subject = "[SOCOE GENESIS Training] Assessment Results - " + passed + " (" + pct + ")";
        var htmlBody = 
          "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;'>" +
          "<div style='background-color: #0f172a; padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 20px;'>" +
          "<h2 style='color: #38bdf8; margin: 0;'>SOCOE GENESIS Training</h2>" +
          "<p style='color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;'>Assessment Completion Certificate & Report</p>" +
          "</div>" +
          "<p>Dear <strong>" + email + "</strong>,</p>" +
          "<p>Thank you for completing the <strong>GENESIS Process Flow & Nomenclature Assessment</strong>.</p>" +
          "<table style='width: 100%; border-collapse: collapse; margin: 20px 0;'>" +
          "<tr style='background: #f8fafc;'><td style='padding: 10px; border: 1px solid #e2e8f0;'><strong>Assessment Status:</strong></td><td style='padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: " + (data.passed ? "#16a34a" : "#dc2626") + ";'>" + passed + "</td></tr>" +
          "<tr><td style='padding: 10px; border: 1px solid #e2e8f0;'><strong>Score:</strong></td><td style='padding: 10px; border: 1px solid #e2e8f0;'>" + score + " / " + total + " (" + pct + ")</td></tr>" +
          "<tr style='background: #f8fafc;'><td style='padding: 10px; border: 1px solid #e2e8f0;'><strong>Benchmark Passing Mark:</strong></td><td style='padding: 10px; border: 1px solid #e2e8f0;'>80.0%</td></tr>" +
          "<tr><td style='padding: 10px; border: 1px solid #e2e8f0;'><strong>Time Elapsed:</strong></td><td style='padding: 10px; border: 1px solid #e2e8f0;'>" + timeSpent + "</td></tr>" +
          "<tr style='background: #f8fafc;'><td style='padding: 10px; border: 1px solid #e2e8f0;'><strong>Discrepancies / Mistakes:</strong></td><td style='padding: 10px; border: 1px solid #e2e8f0;'>" + mistakes + "</td></tr>" +
          "</table>";

        if (Object.keys(b).length > 0) {
          htmlBody += "<h3 style='color: #0f172a; margin-top: 24px;'>Module Breakdown</h3><ul style='line-height: 1.6;'>";
          if (b["NOMENCLATURE"]) htmlBody += "<li><strong>Nomenclature:</strong> " + b["NOMENCLATURE"].correct + "/" + b["NOMENCLATURE"].total + " (" + b["NOMENCLATURE"].percentage + "%)</li>";
          if (b["JOBSARAWAK"]) htmlBody += "<li><strong>JobSarawak:</strong> " + b["JOBSARAWAK"].correct + "/" + b["JOBSARAWAK"].total + " (" + b["JOBSARAWAK"].percentage + "%)</li>";
          if (b["SANSOLS"]) htmlBody += "<li><strong>SANSOLS:</strong> " + b["SANSOLS"].correct + "/" + b["SANSOLS"].total + " (" + b["SANSOLS"].percentage + "%)</li>";
          if (b["EXPRT"]) htmlBody += "<li><strong>EXPRT:</strong> " + b["EXPRT"].correct + "/" + b["EXPRT"].total + " (" + b["EXPRT"].percentage + "%)</li>";
          if (b["HAVEN"]) htmlBody += "<li><strong>HAVEN:</strong> " + b["HAVEN"].correct + "/" + b["HAVEN"].total + " (" + b["HAVEN"].percentage + "%)</li>";
          if (b["ACCOUNTS"]) htmlBody += "<li><strong>Accounts & Escalation:</strong> " + b["ACCOUNTS"].correct + "/" + b["ACCOUNTS"].total + " (" + b["ACCOUNTS"].percentage + "%)</li>";
          htmlBody += "</ul>";
        }

        htmlBody += "<p style='font-size: 12px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 12px;'>SOCOE Sdn Bhd &bull; Confidential GENESIS Training & Compliance System</p></div>";

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

    // Append row to Google Sheet
    sheet.appendRow([
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
      nom,
      js,
      san,
      exp,
      hav,
      acc,
      emailSent
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: "success", emailSent: emailSent }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
`.trim();
