import { useState, type ReactNode } from 'react';

/* ============ Helpers ============ */

function PhoneShell({ children }: { children: ReactNode }) {
  return <div className="mock-screen">{children}</div>;
}

function AppHeader({
  title,
  back,
  onBack,
  action,
}: {
  title: string;
  back?: boolean;
  onBack?: () => void;
  action?: ReactNode;
}) {
  return (
    <div className="mock-app-head">
      <div className="mock-app-head-left">
        {back && (
          <button type="button" className="mock-app-back-btn" onClick={onBack} aria-label="กลับ">
            <span aria-hidden="true">‹</span>
          </button>
        )}
        <span className="mock-app-title">{title}</span>
      </div>
      {action && <div className="mock-app-head-right">{action}</div>}
    </div>
  );
}

interface RingProps {
  fraction: number;
  color?: string;
  stroke?: number;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  trackColor?: string;
}
function Ring({ fraction, color = 'var(--accent)', stroke = 9, children, size = 'md', trackColor = '#F0EDE7' }: RingProps) {
  const r = (100 - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, fraction));
  const offset = c * (1 - clamped);
  return (
    <div className={`mock-ring mock-ring--${size}`}>
      <svg viewBox="0 0 100 100" className="mock-ring-svg">
        <circle cx="50" cy="50" r={r} stroke={trackColor} strokeWidth={stroke} fill="none" />
        <circle
          cx="50" cy="50" r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="mock-ring-text">{children}</div>
    </div>
  );
}

function MiniSpark({ points, up }: { points: number[]; up?: boolean }) {
  if (points.length < 2) return null;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const w = 48; const h = 16;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(h - ((p - min) / range) * h).toFixed(1)}`)
    .join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`mock-spark ${up ? 'mock-spark--up' : 'mock-spark--down'}`}>
      <path d={path} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ============ Data ============ */

type Trend = 'down' | 'flat' | 'new' | 'warn';
interface Client {
  id: string;
  name: string;
  status: string;
  trend: Trend;
  initial: string;
  spark: number[];
}

const CLIENTS: Client[] = [
  { id: 'lisa',    name: 'ลิซ่า สุขใจ',     status: '−2.3 กก. · 6 สัปดาห์', trend: 'down', initial: 'ล', spark: [70, 69.5, 69, 68.5, 68, 67.5, 67.7] },
  { id: 'ann',     name: 'แอน จันทร์เจ้า',  status: '−1.1 กก. · 3 สัปดาห์', trend: 'down', initial: 'อ', spark: [62, 61.8, 61.5, 61.2, 61, 60.9] },
  { id: 'marisa',  name: 'มาริสา พงษ์เพชร', status: 'นัด 14 พ.ค.',        trend: 'flat', initial: 'ม', spark: [58, 58.1, 58, 58.2, 58, 58.1] },
  { id: 'nat',     name: 'นัท ฟ้าใส',       status: 'เริ่มวันนี้',         trend: 'new',  initial: 'น', spark: [72] },
  { id: 'ploy',    name: 'พลอย รัตนกุล',    status: '−3.8 กก. · 10 สัปดาห์', trend: 'down', initial: 'พ', spark: [78, 77, 76, 75, 74.5, 74.2] },
  { id: 'kae',     name: 'เก๋ ทองสุข',      status: 'หยุดมา 2 สัปดาห์',    trend: 'warn', initial: 'ก', spark: [66, 65.8, 65.5, 65.7, 66, 66.2] },
];

/* ============ List view ============ */

function ListView({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <>
      <AppHeader title="ลูกค้า" />

      <div className="mock-kpi-row">
        <div className="mock-kpi">
          <span className="mock-kpi-num">12</span>
          <span className="mock-kpi-label">ทั้งหมด</span>
        </div>
        <div className="mock-kpi mock-kpi--accent">
          <span className="mock-kpi-num">8</span>
          <span className="mock-kpi-label">กำลังลด</span>
        </div>
        <div className="mock-kpi mock-kpi--good">
          <span className="mock-kpi-num">3</span>
          <span className="mock-kpi-label">ถึงเป้า</span>
        </div>
      </div>

      <div className="mock-search">
        <span className="mock-search-icon" aria-hidden="true">⌕</span>
        <span className="mock-search-placeholder">ค้นหาชื่อลูกค้า…</span>
      </div>

      <ul className="mock-list">
        {CLIENTS.map((c) => (
          <li key={c.id}>
            <button type="button" className="mock-list-row mock-list-row--btn" onClick={() => onSelect(c.id)}>
              <span className={`mock-avatar mock-avatar--${c.trend}`}>{c.initial}</span>
              <span className="mock-list-text">
                <span className="mock-list-name">{c.name}</span>
                <span className={`mock-list-status mock-list-status--${c.trend}`}>{c.status}</span>
              </span>
              <MiniSpark points={c.spark} up={c.trend === 'warn'} />
              <span className="mock-list-chev" aria-hidden="true">›</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ============ Profile view ============ */

function ProfileView({ client }: { client: Client }) {
  const bmi = 24.9;
  const bmiFraction = Math.max(0, Math.min(1, (bmi - 18) / (35 - 18)));

  return (
    <div className="mock-scroll">
      <div className="mock-pill-row">
        <span className="mock-pill"><small>อายุ</small>32</span>
        <span className="mock-pill"><small>สูง</small>165</span>
        <span className="mock-pill"><small>นน.</small>65.7</span>
        <span className="mock-pill"><small>เพศ</small>ญ</span>
      </div>

      <div className="mock-ring-hero">
        <Ring fraction={bmiFraction} color="url(#gradBmi)" size="lg">
          <span className="mock-ring-big">{bmi.toFixed(1)}</span>
          <span className="mock-ring-label">BMI</span>
        </Ring>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <linearGradient id="gradBmi" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7AAE85" />
              <stop offset="55%" stopColor="#D9A05B" />
              <stop offset="100%" stopColor="#C56A4D" />
            </linearGradient>
          </defs>
        </svg>
        <span className="mock-zone-tag mock-zone-tag--warn">เริ่มเกิน · 25.0 = จุดเตือน</span>
      </div>

      <div className="mock-tile-row">
        <div className="mock-tile">
          <span className="mock-tile-label">BMR</span>
          <span className="mock-tile-num">1,480</span>
          <span className="mock-tile-unit">kcal/วัน</span>
        </div>
        <div className="mock-tile mock-tile--accent">
          <span className="mock-tile-label">ควรได้รับ</span>
          <span className="mock-tile-num">1,750</span>
          <span className="mock-tile-unit">kcal/วัน</span>
        </div>
      </div>
      <div className="mock-tip">ระบบคำนวณให้อัตโนมัติจากอายุ ส่วนสูง น้ำหนัก</div>
    </div>
  );
}

/* ============ Measure view ============ */

function MeasureView() {
  const cards = [
    { label: 'รอบเอว',    val: '76',   unit: 'ซม.', delta: '−2.0', up: false, spark: [80, 79, 78, 77.5, 76.5, 76] },
    { label: 'ต้นแขน',    val: '28',   unit: 'ซม.', delta: '−0.5', up: false, spark: [28.8, 28.6, 28.4, 28.2, 28, 28] },
    { label: 'ต้นขา',     val: '54',   unit: 'ซม.', delta: '−1.0', up: false, spark: [55.2, 55, 54.7, 54.4, 54.2, 54] },
    { label: 'กล้ามเนื้อ', val: '24.2', unit: 'กก.', delta: '+0.4', up: true,  spark: [23.7, 23.8, 23.9, 24.0, 24.1, 24.2] },
  ];
  return (
    <div className="mock-scroll">
      <div className="mock-meta-line">12 พ.ค. 2026 · ครั้งที่ 6</div>

      <div className="mock-card-grid">
        {cards.map((c) => (
          <div key={c.label} className="mock-meas-card">
            <span className="mock-meas-label">{c.label}</span>
            <span className="mock-meas-val">{c.val}<small>{c.unit}</small></span>
            <span className="mock-meas-row">
              <MiniSpark points={c.spark} up={c.up} />
              <span className={`mock-meas-delta ${c.up ? 'mock-meas-delta--up' : 'mock-meas-delta--down'}`}>{c.delta}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mock-bodyfat">
        <div className="mock-bodyfat-head">
          <span className="mock-meas-label">%ไขมัน</span>
          <span className="mock-bodyfat-val">28.5<small>%</small></span>
        </div>
        <div className="mock-bodyfat-bar" role="img" aria-label="แถบ %ไขมัน">
          <span className="mock-bodyfat-zone mock-bodyfat-zone--lean"></span>
          <span className="mock-bodyfat-zone mock-bodyfat-zone--ok"></span>
          <span className="mock-bodyfat-zone mock-bodyfat-zone--high"></span>
          <span className="mock-bodyfat-marker" style={{ left: '62%' }}></span>
        </div>
        <div className="mock-bodyfat-legend">
          <span>นักกีฬา</span>
          <span>ปกติ</span>
          <span>สูง</span>
        </div>
      </div>

      <button type="button" className="mock-btn mock-btn--primary mock-btn--full">บันทึกการวัดครั้งใหม่</button>
    </div>
  );
}

/* ============ Goal view ============ */

function GoalView() {
  const done = 2.3;
  const total = 6;
  const fraction = done / total;

  return (
    <div className="mock-scroll">
      <div className="mock-ring-hero">
        <Ring fraction={fraction} color="var(--accent)" size="lg">
          <span className="mock-ring-big">{Math.round(fraction * 100)}<small>%</small></span>
          <span className="mock-ring-label">ของเป้า</span>
        </Ring>
        <span className="mock-zone-tag mock-zone-tag--accent">ลดไปแล้ว 2.3 / 6.0 กก.</span>
      </div>

      <div className="mock-tile-row mock-tile-row--three">
        <div className="mock-tile">
          <span className="mock-tile-label">ตอนนี้</span>
          <span className="mock-tile-num">65.7</span>
          <span className="mock-tile-unit">กก.</span>
        </div>
        <div className="mock-tile mock-tile--accent">
          <span className="mock-tile-label">เป้า</span>
          <span className="mock-tile-num">62.0</span>
          <span className="mock-tile-unit">กก.</span>
        </div>
        <div className="mock-tile">
          <span className="mock-tile-label">เหลือ</span>
          <span className="mock-tile-num">3.7</span>
          <span className="mock-tile-unit">กก.</span>
        </div>
      </div>

      <div className="mock-plan-card">
        <div className="mock-plan-row">
          <span className="mock-plan-icon" aria-hidden="true">⚖</span>
          <span className="mock-plan-text">ลดสัปดาห์ละ <strong>~0.5 กก.</strong> ปลอดภัย ไม่หักโหม</span>
        </div>
        <div className="mock-plan-row">
          <span className="mock-plan-icon" aria-hidden="true">🍽</span>
          <span className="mock-plan-text">แคลอรี่วันละ <strong>1,250</strong> kcal (deficit 500)</span>
        </div>
      </div>
    </div>
  );
}

/* ============ Progress view ============ */

function CompositionDonut() {
  const segments = [
    { val: 38,   color: '#B5754D', label: 'กล้ามเนื้อ' },
    { val: 28.5, color: '#D9A05B', label: 'ไขมัน' },
    { val: 33.5, color: '#E8E1D3', label: 'น้ำ + อื่นๆ' },
  ];
  const r = 38; const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="mock-composition">
      <svg viewBox="0 0 100 100" className="mock-composition-svg">
        {segments.map((s) => {
          const len = (s.val / 100) * c;
          const dash = `${len} ${c - len}`;
          const offset = -acc;
          acc += len;
          return (
            <circle
              key={s.label}
              cx="50" cy="50" r={r}
              stroke={s.color} strokeWidth="14" fill="none"
              strokeDasharray={dash} strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
            />
          );
        })}
        <text x="50" y="48" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1a1a1a">38%</text>
        <text x="50" y="60" textAnchor="middle" fontSize="7" fill="#6B6B6B">กล้ามเนื้อ</text>
      </svg>
      <ul className="mock-composition-legend">
        {segments.map((s) => (
          <li key={s.label}>
            <span className="mock-comp-swatch" style={{ background: s.color }}></span>
            <span className="mock-comp-label">{s.label}</span>
            <span className="mock-comp-val">{s.val}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProgressView() {
  const [range, setRange] = useState<'7d' | '30d' | 'all'>('30d');
  return (
    <div className="mock-scroll">
      <div className="mock-tabs">
        <button type="button" className={`mock-tab ${range === '7d' ? 'mock-tab--on' : ''}`} onClick={() => setRange('7d')}>7 วัน</button>
        <button type="button" className={`mock-tab ${range === '30d' ? 'mock-tab--on' : ''}`} onClick={() => setRange('30d')}>30 วัน</button>
        <button type="button" className={`mock-tab ${range === 'all' ? 'mock-tab--on' : ''}`} onClick={() => setRange('all')}>ทั้งหมด</button>
      </div>

      <div className="mock-chart-wrap">
        <div className="mock-chart-title">
          <span>น้ำหนัก</span>
          <span className="mock-chart-delta">−2.3 กก.</span>
        </div>
        <svg viewBox="0 0 280 110" preserveAspectRatio="none" className="mock-chart-svg">
          <defs>
            <linearGradient id="gradFitness" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 50, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="#F0EDE7" strokeWidth="0.5" strokeDasharray="2 3" />
          ))}
          <path d="M0,110 L0,22 L40,28 L80,32 L120,48 L160,60 L200,72 L240,84 L280,94 L280,110 Z" fill="url(#gradFitness)" />
          <path d="M0,22 L40,28 L80,32 L120,48 L160,60 L200,72 L240,84 L280,94" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {[0, 40, 80, 120, 160, 200, 240, 280].map((x, i) => {
            const ys = [22, 28, 32, 48, 60, 72, 84, 94];
            return <circle key={x} cx={x} cy={ys[i]} r="2.5" fill="#fff" stroke="var(--accent)" strokeWidth="1.5" />;
          })}
        </svg>
        <div className="mock-chart-axis">
          <span>สัปดาห์ 1</span>
          <span>4</span>
          <span>8</span>
        </div>
      </div>

      <div className="mock-section-label mock-section-label--accent">องค์ประกอบร่างกาย</div>
      <CompositionDonut />
    </div>
  );
}

/* ============ Main interactive app ============ */

type ClientTab = 'profile' | 'measure' | 'goal' | 'progress';

const TABS: { id: ClientTab; label: string; icon: string }[] = [
  { id: 'profile',  label: 'โปรไฟล์',   icon: '👤' },
  { id: 'measure',  label: 'วัด',        icon: '📐' },
  { id: 'goal',     label: 'เป้า',       icon: '🎯' },
  { id: 'progress', label: 'คืบหน้า', icon: '📈' },
];

export function FitnessApp() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<ClientTab>('profile');

  const selected = CLIENTS.find((c) => c.id === selectedId) ?? null;

  return (
    <PhoneShell>
      {!selected ? (
        <ListView
          onSelect={(id) => {
            setSelectedId(id);
            setTab('profile');
          }}
        />
      ) : (
        <>
          <AppHeader title={selected.name} back onBack={() => setSelectedId(null)} />
          <div className="mock-app-body">
            {tab === 'profile'  && <ProfileView client={selected} />}
            {tab === 'measure'  && <MeasureView />}
            {tab === 'goal'     && <GoalView />}
            {tab === 'progress' && <ProgressView />}
          </div>
          <nav className="mock-tabbar" aria-label="แท็บลูกค้า">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`mock-tabbar-btn ${tab === t.id ? 'mock-tabbar-btn--on' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <span className="mock-tabbar-icon" aria-hidden="true">{t.icon}</span>
                <span className="mock-tabbar-label">{t.label}</span>
              </button>
            ))}
          </nav>
        </>
      )}
    </PhoneShell>
  );
}
