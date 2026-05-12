import { useState } from 'react';
import { PhoneShell, AppHeader, Ring, MiniSpark, LineChart, type Brand } from './shared';

const BRAND: Brand = { letter: 'P', name: 'PawCare', sub: 'by คลินิกหางทอง' };

/* ============ Data ============ */

type Trend = 'down' | 'flat' | 'new' | 'warn';
interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  sex: 'ผู้' | 'เมีย';
  weight: number; // kg
  idealWeight: number;
  status: string;
  trend: Trend;
  emoji: string;
  spark: number[];
}

const PETS: Pet[] = [
  { id: 'mhee',    name: 'เจ้าหมี',  breed: 'โกลเด้น รีทรีฟเวอร์', age: '5 ปี',  sex: 'ผู้',  weight: 28.4, idealWeight: 27.0, status: '−1.2 กก. · 2 เดือน',    trend: 'down', emoji: '🐶', spark: [30.2, 29.8, 29.4, 29.0, 28.7, 28.4] },
  { id: 'khanun',  name: 'ขนุน',    breed: 'พุดเดิ้ลทอย',         age: '3 ปี',  sex: 'เมีย', weight: 4.2,  idealWeight: 4.0,  status: 'วัคซีนครบกำหนด',        trend: 'warn', emoji: '🐩', spark: [4.0, 4.1, 4.1, 4.2, 4.2, 4.2] },
  { id: 'som',     name: 'ส้ม',     breed: 'แมวเปอร์เซีย',        age: '2 ปี',  sex: 'ผู้',  weight: 3.8,  idealWeight: 4.0,  status: 'นัด 18 พ.ค.',           trend: 'flat', emoji: '🐱', spark: [3.7, 3.7, 3.8, 3.8, 3.8, 3.8] },
  { id: 'bua',     name: 'ดอกบัว',  breed: 'ชิวาวา',              age: '7 ปี',  sex: 'เมีย', weight: 2.9,  idealWeight: 2.8,  status: 'เริ่มดูแลวันนี้',         trend: 'new',  emoji: '🐕', spark: [2.9] },
  { id: 'namtan',  name: 'น้ำตาล',  breed: 'บีเกิล',              age: '1 ปี',  sex: 'เมีย', weight: 9.2,  idealWeight: 11.0, status: '+1.4 กก. · กำลังโต',     trend: 'down', emoji: '🐶', spark: [7.8, 8.2, 8.5, 8.8, 9.0, 9.2] },
  { id: 'mungkaw', name: 'มันแกว',  breed: 'สก็อตติชโฟลด์',       age: '4 ปี',  sex: 'ผู้',  weight: 5.2,  idealWeight: 4.5,  status: 'เลยกำหนดวัคซีน',         trend: 'warn', emoji: '🐈', spark: [5.0, 5.0, 5.1, 5.1, 5.2, 5.2] },
];

/* ============ List ============ */

function ListView({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <>
      <AppHeader title="สัตว์เลี้ยงทั้งหมด" />

      <div className="mock-kpi-row">
        <div className="mock-kpi">
          <span className="mock-kpi-num">8</span>
          <span className="mock-kpi-label">ทั้งหมด</span>
        </div>
        <div className="mock-kpi mock-kpi--warn">
          <span className="mock-kpi-num">2</span>
          <span className="mock-kpi-label">ครบวัคซีน</span>
        </div>
        <div className="mock-kpi mock-kpi--good">
          <span className="mock-kpi-num">5</span>
          <span className="mock-kpi-label">น้ำหนักดี</span>
        </div>
      </div>

      <div className="mock-search">
        <span className="mock-search-icon" aria-hidden="true">⌕</span>
        <span className="mock-search-placeholder">ค้นหาชื่อหรือสายพันธุ์…</span>
      </div>

      <ul className="mock-list">
        {PETS.map((p) => (
          <li key={p.id}>
            <button type="button" className="mock-list-row mock-list-row--btn" onClick={() => onSelect(p.id)}>
              <span className={`mock-avatar mock-avatar--${p.trend} mock-avatar--emoji`} aria-hidden="true">{p.emoji}</span>
              <span className="mock-list-text">
                <span className="mock-list-name">{p.name} <span className="mock-list-sub">· {p.breed}</span></span>
                <span className={`mock-list-status mock-list-status--${p.trend}`}>{p.status}</span>
              </span>
              {p.spark.length > 1 && <MiniSpark points={p.spark} up={p.trend === 'warn'} />}
              <span className="mock-list-chev" aria-hidden="true">›</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ============ Profile (info + RER/DER) ============ */

function calcRer(kg: number) {
  return Math.round(70 * Math.pow(kg, 0.75));
}

function ProfileView({ pet }: { pet: Pet }) {
  const rer = calcRer(pet.weight);
  const der = Math.round(rer * 1.6); // adult neutered factor
  const weightFraction = Math.max(0, Math.min(1, pet.weight / (pet.idealWeight * 1.4)));
  const weightStatus = pet.weight > pet.idealWeight * 1.1 ? 'over' : pet.weight < pet.idealWeight * 0.9 ? 'under' : 'ok';

  return (
    <div className="mock-scroll">
      <div className="mock-pill-row">
        <span className="mock-pill"><small>อายุ</small>{pet.age}</span>
        <span className="mock-pill"><small>เพศ</small>{pet.sex}</span>
        <span className="mock-pill"><small>นน.</small>{pet.weight}</span>
        <span className="mock-pill"><small>เป้า</small>{pet.idealWeight}</span>
      </div>

      <div className="mock-section-label">สายพันธุ์</div>
      <div className="mock-info-card">{pet.breed}</div>

      <div className="mock-ring-hero">
        <Ring fraction={der / 1500} color="var(--accent)" size="lg">
          <span className="mock-ring-big">{der.toLocaleString()}</span>
          <span className="mock-ring-label">kcal / วัน</span>
        </Ring>
        <span className="mock-zone-tag mock-zone-tag--accent">DER — พลังงานที่ควรได้รับ</span>
      </div>

      <div className="mock-tile-row">
        <div className="mock-tile">
          <span className="mock-tile-label">RER</span>
          <span className="mock-tile-num">{rer.toLocaleString()}</span>
          <span className="mock-tile-unit">kcal/วัน · พื้นฐาน</span>
        </div>
        <div className={`mock-tile ${weightStatus === 'ok' ? 'mock-tile--good' : 'mock-tile--accent'}`}>
          <span className="mock-tile-label">น้ำหนัก</span>
          <span className="mock-tile-num">{pet.weight}<small> กก.</small></span>
          <span className="mock-tile-unit">
            {weightStatus === 'over' ? `เกิน ${(pet.weight - pet.idealWeight).toFixed(1)} กก.` :
             weightStatus === 'under' ? `น้อยกว่าเป้า ${(pet.idealWeight - pet.weight).toFixed(1)} กก.` :
             'อยู่ในช่วงเหมาะสม'}
          </span>
        </div>
      </div>
      <div className="mock-tip">RER/DER คำนวณจากน้ำหนักตามสูตรมาตรฐาน × ปัจจัยอายุและสภาวะ</div>
    </div>
  );
}

/* ============ Weight ============ */

function WeightView({ pet }: { pet: Pet }) {
  const [range, setRange] = useState<'7d' | '30d' | '1y'>('1y');
  const series = pet.spark.length > 1 ? pet.spark : [pet.weight, pet.weight];
  const delta = (series[series.length - 1] - series[0]).toFixed(1);
  const deltaNum = parseFloat(delta);

  return (
    <div className="mock-scroll">
      <div className="mock-tabs">
        <button type="button" className={`mock-tab ${range === '7d' ? 'mock-tab--on' : ''}`} onClick={() => setRange('7d')}>7 วัน</button>
        <button type="button" className={`mock-tab ${range === '30d' ? 'mock-tab--on' : ''}`} onClick={() => setRange('30d')}>30 วัน</button>
        <button type="button" className={`mock-tab ${range === '1y' ? 'mock-tab--on' : ''}`} onClick={() => setRange('1y')}>1 ปี</button>
      </div>

      <div className="mock-chart-wrap">
        <div className="mock-chart-title">
          <span>น้ำหนัก (กก.)</span>
          <span className={`mock-chart-delta ${deltaNum > 0 ? 'mock-chart-delta--up' : ''}`}>
            {deltaNum > 0 ? '+' : ''}{delta} กก.
          </span>
        </div>
        <LineChart values={series} gradientId="gradPetWeight" />
        <div className="mock-chart-axis">
          <span>เดือน 1</span>
          <span>3</span>
          <span>6</span>
        </div>
      </div>

      <div className="mock-tile-row mock-tile-row--three">
        <div className="mock-tile">
          <span className="mock-tile-label">ตอนนี้</span>
          <span className="mock-tile-num">{pet.weight}</span>
          <span className="mock-tile-unit">กก.</span>
        </div>
        <div className="mock-tile mock-tile--accent">
          <span className="mock-tile-label">เป้า</span>
          <span className="mock-tile-num">{pet.idealWeight}</span>
          <span className="mock-tile-unit">กก.</span>
        </div>
        <div className="mock-tile">
          <span className="mock-tile-label">ต่าง</span>
          <span className="mock-tile-num">{(pet.weight - pet.idealWeight > 0 ? '+' : '') + (pet.weight - pet.idealWeight).toFixed(1)}</span>
          <span className="mock-tile-unit">กก.</span>
        </div>
      </div>

      <button type="button" className="mock-btn mock-btn--primary mock-btn--full">บันทึกน้ำหนักวันนี้</button>
    </div>
  );
}

/* ============ Vaccine ============ */

type VacStatus = 'done' | 'upcoming' | 'overdue';
interface Vaccine {
  name: string;
  last: string;
  next: string;
  status: VacStatus;
}

const VACCINES: Vaccine[] = [
  { name: 'พิษสุนัขบ้า (Rabies)', last: '12 มี.ค. 2026',  next: 'มี.ค. 2027',   status: 'done' },
  { name: 'DHPP (รวม 5 โรค)',   last: '5 ม.ค. 2026',    next: 'ม.ค. 2027',    status: 'done' },
  { name: 'Leptospirosis',     last: '20 มิ.ย. 2025',   next: '20 มิ.ย. 2026', status: 'upcoming' },
  { name: 'Bordetella (ไอเรื้อรัง)', last: '18 ก.ค. 2024', next: '18 ก.ค. 2025', status: 'overdue' },
];

const STATUS_LABEL: Record<VacStatus, string> = {
  done: 'ครบ',
  upcoming: 'ใกล้ครบ',
  overdue: 'เลยกำหนด',
};

function VaccineView() {
  const upcomingNext = VACCINES.find((v) => v.status === 'upcoming');
  return (
    <div className="mock-scroll">
      {upcomingNext && (
        <div className="mock-banner mock-banner--accent">
          <span className="mock-banner-icon" aria-hidden="true">💉</span>
          <span className="mock-banner-text">
            <strong>{upcomingNext.name}</strong> ครบกำหนดวันที่ <strong>{upcomingNext.next}</strong>
          </span>
        </div>
      )}

      <div className="mock-section-label">ตารางวัคซีน</div>
      <ul className="mock-list mock-list--inline">
        {VACCINES.map((v) => (
          <li key={v.name} className="mock-list-row">
            <span className={`mock-vac-badge mock-vac-badge--${v.status}`}>{STATUS_LABEL[v.status]}</span>
            <span className="mock-list-text">
              <span className="mock-list-name">{v.name}</span>
              <span className="mock-list-status">
                ฉีดล่าสุด {v.last} · ครั้งถัดไป {v.next}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <button type="button" className="mock-btn mock-btn--primary mock-btn--full">นัดฉีดวัคซีนถัดไป</button>
    </div>
  );
}

/* ============ History ============ */

interface VisitRow {
  date: string;
  reason: string;
  vet: string;
  note?: string;
}

const VISITS: VisitRow[] = [
  { date: '12 มี.ค. 2026', reason: 'ตรวจประจำปี + วัคซีน Rabies', vet: 'หมอลูกตาล', note: 'สุขภาพดี ฟันมีคราบเล็กน้อย' },
  { date: '5 ม.ค. 2026',   reason: 'วัคซีน DHPP',               vet: 'หมอลูกตาล' },
  { date: '18 ส.ค. 2025',  reason: 'รักษาตาอักเสบ',             vet: 'หมอกอล์ฟ', note: 'หยอดตา 7 วัน หาย' },
  { date: '14 มี.ค. 2025', reason: 'ตรวจประจำปี',               vet: 'หมอลูกตาล' },
];

function HistoryView() {
  return (
    <div className="mock-scroll">
      <div className="mock-section-label">ประวัติการพบสัตวแพทย์</div>
      <ul className="mock-timeline">
        {VISITS.map((v, i) => (
          <li key={i} className="mock-timeline-row">
            <span className="mock-timeline-dot" aria-hidden="true"></span>
            <span className="mock-timeline-content">
              <span className="mock-timeline-date">{v.date}</span>
              <span className="mock-timeline-title">{v.reason}</span>
              <span className="mock-timeline-meta">โดย {v.vet}{v.note && ` · ${v.note}`}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============ App ============ */

type PetTab = 'profile' | 'weight' | 'vaccine' | 'history';

const TABS: { id: PetTab; label: string; icon: string }[] = [
  { id: 'profile', label: 'ข้อมูล',  icon: '🐾' },
  { id: 'weight',  label: 'น้ำหนัก', icon: '⚖️' },
  { id: 'vaccine', label: 'วัคซีน',  icon: '💉' },
  { id: 'history', label: 'ประวัติ', icon: '📋' },
];

export function PetApp() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<PetTab>('profile');

  const selected = PETS.find((p) => p.id === selectedId) ?? null;

  return (
    <PhoneShell brand={BRAND}>
      {!selected ? (
        <ListView onSelect={(id) => { setSelectedId(id); setTab('profile'); }} />
      ) : (
        <>
          <AppHeader title={`${selected.emoji} ${selected.name}`} back onBack={() => setSelectedId(null)} />
          <div className="mock-app-body">
            {tab === 'profile' && <ProfileView pet={selected} />}
            {tab === 'weight'  && <WeightView pet={selected} />}
            {tab === 'vaccine' && <VaccineView />}
            {tab === 'history' && <HistoryView />}
          </div>
          <nav className="mock-tabbar" aria-label="แท็บสัตว์เลี้ยง">
            {TABS.map((t) => (
              <button key={t.id} type="button"
                className={`mock-tabbar-btn ${tab === t.id ? 'mock-tabbar-btn--on' : ''}`}
                onClick={() => setTab(t.id)}>
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
