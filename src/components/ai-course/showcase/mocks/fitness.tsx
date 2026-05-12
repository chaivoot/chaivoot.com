import type { ReactNode } from 'react';

function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="mock-phone">
      <div className="mock-phone-screen">
        <div className="mock-statusbar">
          <span>9:41</span>
          <span className="mock-statusbar-icons">
            <span className="mock-sb-dot"></span>
            <span className="mock-sb-dot"></span>
            <span className="mock-sb-dot"></span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

function AppHeader({ title, back, action }: { title: string; back?: boolean; action?: ReactNode }) {
  return (
    <div className="mock-app-head">
      <div className="mock-app-head-left">
        {back && <span className="mock-app-back" aria-hidden="true">←</span>}
        <span className="mock-app-title">{title}</span>
      </div>
      {action && <div className="mock-app-head-right">{action}</div>}
    </div>
  );
}

const CLIENTS = [
  { name: 'ลิซ่า สุขใจ', status: '−2.3 กก. ใน 6 สัปดาห์', trend: 'down', initial: 'ล' },
  { name: 'แอน จันทร์เจ้า', status: '−1.1 กก. ใน 3 สัปดาห์', trend: 'down', initial: 'อ' },
  { name: 'มาริสา พงษ์เพชร', status: 'นัดถัดไป 14 พ.ค.', trend: 'flat', initial: 'ม' },
  { name: 'นัท ฟ้าใส', status: 'เริ่มวันนี้', trend: 'new', initial: 'น' },
  { name: 'พลอย รัตนกุล', status: '−3.8 กก. ใน 10 สัปดาห์', trend: 'down', initial: 'พ' },
  { name: 'เก๋ ทองสุข', status: 'หยุดมา 2 สัปดาห์', trend: 'warn', initial: 'ก' },
  { name: 'แพร พิมพ์ใจ', status: '−0.6 กก. ใน 2 สัปดาห์', trend: 'down', initial: 'พ' },
  { name: 'มินท์ สีคราม', status: 'นัดถัดไป 13 พ.ค.', trend: 'flat', initial: 'ม' },
];

export function FitnessList() {
  return (
    <PhoneShell>
      <AppHeader title="ลูกค้า (12)" action={<span className="mock-icon-btn">+</span>} />
      <div className="mock-search">
        <span className="mock-search-icon" aria-hidden="true">⌕</span>
        <span className="mock-search-placeholder">ค้นหาชื่อลูกค้า…</span>
      </div>
      <ul className="mock-list">
        {CLIENTS.map((c) => (
          <li key={c.name} className="mock-list-row">
            <span className={`mock-avatar mock-avatar--${c.trend}`}>{c.initial}</span>
            <span className="mock-list-text">
              <span className="mock-list-name">{c.name}</span>
              <span className={`mock-list-status mock-list-status--${c.trend}`}>{c.status}</span>
            </span>
            <span className="mock-list-chev" aria-hidden="true">›</span>
          </li>
        ))}
      </ul>
    </PhoneShell>
  );
}

export function FitnessProfile() {
  return (
    <PhoneShell>
      <AppHeader title="ลิซ่า สุขใจ" back />
      <div className="mock-section-label">ข้อมูลพื้นฐาน</div>
      <div className="mock-row-grid">
        <div className="mock-data-cell">
          <span className="mock-data-label">อายุ</span>
          <span className="mock-data-value">32 <small>ปี</small></span>
        </div>
        <div className="mock-data-cell">
          <span className="mock-data-label">เพศ</span>
          <span className="mock-data-value">หญิง</span>
        </div>
        <div className="mock-data-cell">
          <span className="mock-data-label">ส่วนสูง</span>
          <span className="mock-data-value">165 <small>ซม.</small></span>
        </div>
        <div className="mock-data-cell">
          <span className="mock-data-label">น้ำหนัก</span>
          <span className="mock-data-value">68 <small>กก.</small></span>
        </div>
      </div>

      <div className="mock-section-label mock-section-label--accent">คำนวณอัตโนมัติ</div>
      <div className="mock-calc-card">
        <div className="mock-calc-row">
          <span className="mock-calc-label">BMI</span>
          <span className="mock-calc-value">24.9</span>
          <span className="mock-calc-tag mock-calc-tag--warn">เริ่มเกิน</span>
        </div>
        <div className="mock-calc-row">
          <span className="mock-calc-label">BMR</span>
          <span className="mock-calc-value">1,480</span>
          <span className="mock-calc-unit">kcal/วัน</span>
        </div>
        <div className="mock-calc-row mock-calc-row--hi">
          <span className="mock-calc-label">ควรได้รับ</span>
          <span className="mock-calc-value">1,750</span>
          <span className="mock-calc-unit">kcal/วัน</span>
        </div>
      </div>
    </PhoneShell>
  );
}

export function FitnessMeasurements() {
  const rows = [
    { label: 'รอบเอว', val: '76', unit: 'ซม.', delta: '−2.0' },
    { label: 'ต้นแขน', val: '28', unit: 'ซม.', delta: '−0.5' },
    { label: 'ต้นขา', val: '54', unit: 'ซม.', delta: '−1.0' },
    { label: 'มวลกล้ามเนื้อ', val: '24.2', unit: 'กก.', delta: '+0.4', up: true },
    { label: '%ไขมัน', val: '28.5', unit: '%', delta: '−1.5' },
  ];
  return (
    <PhoneShell>
      <AppHeader title="บันทึกการวัด" back />
      <div className="mock-meta-line">12 พ.ค. 2026 — ครั้งที่ 6</div>
      <ul className="mock-measure-list">
        {rows.map((r) => (
          <li key={r.label} className="mock-measure-row">
            <span className="mock-measure-label">{r.label}</span>
            <span className="mock-measure-val">
              {r.val} <small>{r.unit}</small>
            </span>
            <span className={`mock-measure-delta ${r.up ? 'mock-measure-delta--up' : 'mock-measure-delta--down'}`}>
              {r.delta}
            </span>
          </li>
        ))}
      </ul>
      <div className="mock-btn-row">
        <span className="mock-btn mock-btn--primary">บันทึก</span>
      </div>
    </PhoneShell>
  );
}

export function FitnessGoal() {
  return (
    <PhoneShell>
      <AppHeader title="ตั้งเป้าหมาย" back />
      <div className="mock-goal-block">
        <div className="mock-goal-row">
          <span className="mock-goal-label">น้ำหนักปัจจุบัน</span>
          <span className="mock-goal-num">68 <small>กก.</small></span>
        </div>
        <div className="mock-goal-arrow" aria-hidden="true">↓</div>
        <div className="mock-goal-row mock-goal-row--target">
          <span className="mock-goal-label">เป้าหมาย</span>
          <span className="mock-goal-num">62 <small>กก.</small></span>
        </div>
        <div className="mock-goal-row">
          <span className="mock-goal-label">ภายใน</span>
          <span className="mock-goal-num">12 <small>สัปดาห์</small></span>
        </div>
      </div>

      <div className="mock-section-label mock-section-label--accent">แผนที่ระบบช่วยคำนวณ</div>
      <div className="mock-plan-card">
        <div className="mock-plan-row">
          <span className="mock-plan-icon" aria-hidden="true">⚖</span>
          <span className="mock-plan-text">ลดสัปดาห์ละ <strong>~0.5 กก.</strong> (ปลอดภัย ไม่หักโหม)</span>
        </div>
        <div className="mock-plan-row">
          <span className="mock-plan-icon" aria-hidden="true">🍽</span>
          <span className="mock-plan-text">ลดแคลอรี่วันละ <strong>−500</strong> จาก 1,750 → 1,250</span>
        </div>
        <div className="mock-plan-row">
          <span className="mock-plan-icon" aria-hidden="true">🏃</span>
          <span className="mock-plan-text">เพิ่ม cardio <strong>3×/สัปดาห์</strong> เพื่อ deficit ยั่งยืน</span>
        </div>
      </div>
    </PhoneShell>
  );
}

export function FitnessProgress() {
  return (
    <PhoneShell>
      <AppHeader title="ความคืบหน้า — ลิซ่า" back />
      <div className="mock-tabs">
        <span className="mock-tab mock-tab--on">น้ำหนัก</span>
        <span className="mock-tab">รอบเอว</span>
        <span className="mock-tab">%ไขมัน</span>
      </div>
      <div className="mock-chart-wrap">
        <svg viewBox="0 0 280 140" preserveAspectRatio="none" className="mock-chart-svg">
          <defs>
            <linearGradient id="gradFitness" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,140 L0,30 L40,38 L80,42 L120,58 L160,70 L200,82 L240,96 L280,108 L280,140 Z" fill="url(#gradFitness)" />
          <path d="M0,30 L40,38 L80,42 L120,58 L160,70 L200,82 L240,96 L280,108" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {[0, 40, 80, 120, 160, 200, 240, 280].map((x, i) => {
            const ys = [30, 38, 42, 58, 70, 82, 96, 108];
            return <circle key={x} cx={x} cy={ys[i]} r="3" fill="#fff" stroke="var(--accent)" strokeWidth="2" />;
          })}
        </svg>
        <div className="mock-chart-axis">
          <span>สัปดาห์ 1</span>
          <span>4</span>
          <span>8</span>
        </div>
      </div>
      <div className="mock-stat-row">
        <div className="mock-stat-cell">
          <span className="mock-stat-num">−2.3<small>กก.</small></span>
          <span className="mock-stat-label">น้ำหนัก</span>
        </div>
        <div className="mock-stat-cell">
          <span className="mock-stat-num">−3<small>ซม.</small></span>
          <span className="mock-stat-label">รอบเอว</span>
        </div>
        <div className="mock-stat-cell">
          <span className="mock-stat-num">−1.5<small>%</small></span>
          <span className="mock-stat-label">ไขมัน</span>
        </div>
      </div>
    </PhoneShell>
  );
}
