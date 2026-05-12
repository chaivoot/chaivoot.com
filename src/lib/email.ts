// Server-only email notifier. Sends registration alerts via Resend.
//
// Mirrors the supabase.ts pattern: lazy init, runtime env reads, custom
// error class. Email is treated as a soft signal — the caller in
// register.ts wraps notifyRegistration() in try/catch so the form
// response stays green even if Resend is misconfigured or down. The
// authoritative record is always the Supabase row.

import { Resend } from 'resend';

let _client: Resend | null = null;

export class EmailConfigError extends Error {
  missing: string[];
  constructor(missing: string[]) {
    super(`Missing email env vars: ${missing.join(', ')}`);
    this.name = 'EmailConfigError';
    this.missing = missing;
  }
}

function getResend(): Resend {
  if (_client) return _client;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new EmailConfigError(['RESEND_API_KEY']);
  _client = new Resend(apiKey);
  return _client;
}

export interface RegistrationPayload {
  name: string;
  phone: string | null;
  line_id: string | null;
  business: string | null;
  want: string | null;
  plan: 'group' | 'private';
  source?: string;
}

function fmtBangkokNow(): string {
  return new Date().toLocaleString('th-TH', {
    timeZone: 'Asia/Bangkok',
    dateStyle: 'full',
    timeStyle: 'short',
  });
}

function buildHtml(reg: RegistrationPayload, when: string): string {
  const planLabel = reg.plan === 'private' ? 'เรียนเดี่ยว (Private)' : 'เรียนกลุ่ม (Group)';
  const rows: [string, string][] = [
    ['ชื่อ', reg.name],
    ['เบอร์โทร', reg.phone || '—'],
    ['Line ID', reg.line_id || '—'],
    ['ธุรกิจ', reg.business || '—'],
    ['อยากทำเว็บแอป', reg.want || '—'],
    ['แผน', planLabel],
  ];
  const rowsHtml = rows
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding: 8px 12px; vertical-align: top; color: #6B6B6B; font-size: 13px; width: 130px;">${k}</td>
        <td style="padding: 8px 12px; vertical-align: top; color: #1a1a1a; font-size: 14px; font-weight: 500;">${escapeHtml(v)}</td>
      </tr>`,
    )
    .join('');

  return `<!doctype html>
<html lang="th">
<body style="margin: 0; background: #F7F6F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 560px; margin: 0 auto; padding: 24px 16px;">
    <div style="background: #fff; border-radius: 14px; padding: 24px; box-shadow: 0 2px 8px rgba(20,20,20,0.04);">
      <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.12em; color: #6E3F2A; text-transform: uppercase;">มีคนสมัครเรียน</div>
      <h1 style="margin: 6px 0 4px; font-size: 22px; font-weight: 600; letter-spacing: -0.01em; color: #1a1a1a;">${escapeHtml(reg.name)}</h1>
      <div style="font-size: 13px; color: #6B6B6B; margin-bottom: 18px;">${when}</div>

      <table style="width: 100%; border-collapse: collapse; border-top: 1px solid #F0EDE7;">
        ${rowsHtml}
      </table>

      <div style="margin-top: 20px; padding: 12px 14px; background: #F4EBE0; border-radius: 10px; font-size: 12px; color: #6E3F2A; line-height: 1.55;">
        คอมมิตเมนต์ที่ลูกค้าเห็นบนหน้าคอร์ส: <strong>ตอบกลับภายใน 24 ชั่วโมง</strong>
      </div>
    </div>
    <div style="text-align: center; font-size: 11px; color: #9A9A9A; margin-top: 16px;">
      ส่งจากแบบฟอร์ม chaivoot.com/ai-course · source: ${escapeHtml(reg.source || 'landing')}
    </div>
  </div>
</body>
</html>`;
}

function buildText(reg: RegistrationPayload, when: string): string {
  const planLabel = reg.plan === 'private' ? 'เรียนเดี่ยว (Private)' : 'เรียนกลุ่ม (Group)';
  return [
    `มีคนสมัครเรียน AI Web App — ${reg.name}`,
    when,
    '',
    `ชื่อ: ${reg.name}`,
    `เบอร์โทร: ${reg.phone || '—'}`,
    `Line ID: ${reg.line_id || '—'}`,
    `ธุรกิจ: ${reg.business || '—'}`,
    `อยากทำเว็บแอป: ${reg.want || '—'}`,
    `แผน: ${planLabel}`,
    '',
    `ส่งจากแบบฟอร์ม chaivoot.com/ai-course · source: ${reg.source || 'landing'}`,
    'คอมมิตเมนต์ตอบกลับภายใน 24 ชม.',
  ].join('\n');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function notifyRegistration(reg: RegistrationPayload): Promise<void> {
  // onboarding@resend.dev works without domain verification but only sends
  // to the Resend account owner's signup email — fine for personal use.
  // Switch RESEND_FROM to notify@chaivoot.com once the domain is verified.
  const from = process.env.RESEND_FROM || 'AI Web App Course <onboarding@resend.dev>';
  const to = process.env.NOTIFY_TO || 'gmail@chaivoot.com';
  const when = fmtBangkokNow();

  const client = getResend();
  const result = await client.emails.send({
    from,
    to,
    subject: `🎓 มีคนสมัครเรียน — ${reg.name}`,
    html: buildHtml(reg, when),
    text: buildText(reg, when),
  });

  if (result.error) {
    throw new Error(`Resend API error: ${result.error.message}`);
  }
}
