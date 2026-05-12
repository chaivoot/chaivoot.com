import { useState } from 'react';
import { PhoneShell, AppHeader, Ring, LineChart, type Brand } from './shared';

const BRAND: Brand = { letter: 'C', name: 'CareNote', sub: 'บ้านลิ้มศิริ' };

/* ============ Data ============ */

interface Elder {
  id: string;
  name: string;
  relation: string;
  age: number;
  emoji: string;
  conditions: string[];
  statusTag: 'good' | 'warn';
  statusText: string;
}

const ELDERS: Elder[] = [
  { id: 'father', name: 'สมชาย ลิ้มศิริ', relation: 'คุณพ่อ', age: 78, emoji: '👴', conditions: ['ความดันสูง', 'เบาหวาน'], statusTag: 'warn', statusText: 'ความดัน 142/88 · เช้านี้' },
  { id: 'mother', name: 'มาลี ลิ้มศิริ',  relation: 'คุณแม่',  age: 72, emoji: '👵', conditions: ['ข้อเข่าเสื่อม'],          statusTag: 'good', statusText: 'ปกติทุกอย่างวันนี้' },
];

/* ============ List ============ */

function ListView({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <>
      <AppHeader title="ผู้สูงอายุในบ้าน" />

      <div className="mock-kpi-row">
        <div className="mock-kpi">
          <span className="mock-kpi-num">2</span>
          <span className="mock-kpi-label">ในบ้าน</span>
        </div>
        <div className="mock-kpi mock-kpi--accent">
          <span className="mock-kpi-num">6/8</span>
          <span className="mock-kpi-label">ยาวันนี้</span>
        </div>
        <div className="mock-kpi mock-kpi--warn">
          <span className="mock-kpi-num">1</span>
          <span className="mock-kpi-label">ต้องดูแล</span>
        </div>
      </div>

      <ul className="mock-list">
        {ELDERS.map((e) => (
          <li key={e.id}>
            <button type="button" className="mock-list-row mock-list-row--btn" onClick={() => onSelect(e.id)}>
              <span className="mock-avatar mock-avatar--big" aria-hidden="true">{e.emoji}</span>
              <span className="mock-list-text">
                <span className="mock-list-name">{e.relation} {e.name}</span>
                <span className={`mock-list-status mock-list-status--${e.statusTag === 'warn' ? 'warn' : 'down'}`}>
                  {e.age} ปี · {e.statusText}
                </span>
              </span>
              <span className="mock-list-chev" aria-hidden="true">›</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mock-section-label mock-section-label--accent">สรุปวันนี้ (ส่งเข้า Line อัตโนมัติ)</div>
      <div className="mock-info-card mock-info-card--ribbon">
        🌅 09:00 · คุณพ่อทานยาเช้าครบ · ความดัน 142/88 (สูงเล็กน้อย)<br />
        🌞 12:30 · คุณแม่ทานยากลางวันครบ · น้ำตาล 102 (ปกติ)<br />
        🌙 รอ · ยาเย็น 18:00 น.
      </div>
    </>
  );
}

/* ============ Summary (Dashboard) ============ */

function SummaryView({ elder }: { elder: Elder }) {
  const isDad = elder.id === 'father';
  return (
    <div className="mock-scroll">
      <div className="mock-pill-row">
        <span className="mock-pill"><small>อายุ</small>{elder.age}</span>
        <span className="mock-pill"><small>โรค</small>{elder.conditions.length}</span>
        <span className="mock-pill"><small>ยา</small>{isDad ? '5' : '3'}</span>
        <span className="mock-pill"><small>นัด</small>22 พ.ค.</span>
      </div>

      <div className="mock-section-label">โรคประจำตัว</div>
      <div className="mock-chip-row">
        {elder.conditions.map((c) => (
          <span key={c} className="mock-chip">{c}</span>
        ))}
      </div>

      <div className="mock-section-label mock-section-label--accent">สรุปวันนี้</div>
      <div className="mock-summary-grid">
        <div className="mock-summary-card mock-summary-card--good">
          <span className="mock-summary-icon" aria-hidden="true">💊</span>
          <span className="mock-summary-num">{isDad ? '3/5' : '2/3'}</span>
          <span className="mock-summary-label">ยาวันนี้</span>
        </div>
        <div className={`mock-summary-card ${isDad ? 'mock-summary-card--warn' : 'mock-summary-card--good'}`}>
          <span className="mock-summary-icon" aria-hidden="true">🩺</span>
          <span className="mock-summary-num">{isDad ? '142/88' : '118/76'}</span>
          <span className="mock-summary-label">ความดัน (เช้านี้)</span>
        </div>
        <div className="mock-summary-card mock-summary-card--good">
          <span className="mock-summary-icon" aria-hidden="true">🍬</span>
          <span className="mock-summary-num">{isDad ? '128' : '102'}</span>
          <span className="mock-summary-label">น้ำตาล (ก่อนเที่ยง)</span>
        </div>
        <div className="mock-summary-card">
          <span className="mock-summary-icon" aria-hidden="true">📞</span>
          <span className="mock-summary-num">3</span>
          <span className="mock-summary-label">วันก่อนพบหมอ</span>
        </div>
      </div>

      <div className="mock-tip">สรุปนี้ส่งเข้า Line ของลูกอัตโนมัติทุกเย็น</div>
    </div>
  );
}

/* ============ Meds (interactive checklist) ============ */

interface Med {
  id: string;
  name: string;
  dose: string;
  time: string;
  period: 'เช้า' | 'กลางวัน' | 'เย็น' | 'ก่อนนอน';
  taken: boolean;
}

const INIT_MEDS: Med[] = [
  { id: 'm1', name: 'Amlodipine 5 mg',  dose: '1 เม็ด', time: '07:30', period: 'เช้า',     taken: true },
  { id: 'm2', name: 'Metformin 500 mg', dose: '1 เม็ด', time: '08:00', period: 'เช้า',     taken: true },
  { id: 'm3', name: 'Simvastatin 20 mg', dose: '1 เม็ด', time: '12:30', period: 'กลางวัน', taken: true },
  { id: 'm4', name: 'Metformin 500 mg', dose: '1 เม็ด', time: '18:00', period: 'เย็น',     taken: false },
  { id: 'm5', name: 'Aspirin 81 mg',    dose: '1 เม็ด', time: '21:00', period: 'ก่อนนอน', taken: false },
];

function MedsView() {
  const [meds, setMeds] = useState(INIT_MEDS);
  const toggle = (id: string) => setMeds(meds.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m)));

  const takenCount = meds.filter((m) => m.taken).length;
  const fraction = takenCount / meds.length;

  // Group by period
  const periods: Med['period'][] = ['เช้า', 'กลางวัน', 'เย็น', 'ก่อนนอน'];

  return (
    <div className="mock-scroll">
      <div className="mock-ring-hero">
        <Ring fraction={fraction} color="var(--accent)" size="md">
          <span className="mock-ring-big">{takenCount}<small>/{meds.length}</small></span>
          <span className="mock-ring-label">ยาวันนี้</span>
        </Ring>
        <span className="mock-zone-tag mock-zone-tag--accent">12 พ.ค. 2026</span>
      </div>

      {periods.map((p) => {
        const items = meds.filter((m) => m.period === p);
        if (items.length === 0) return null;
        return (
          <div key={p}>
            <div className="mock-section-label">{p}</div>
            <ul className="mock-list mock-list--inline">
              {items.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    className={`mock-list-row mock-list-row--btn mock-med-row ${m.taken ? 'mock-med-row--done' : ''}`}
                    onClick={() => toggle(m.id)}
                  >
                    <span className={`mock-check ${m.taken ? 'mock-check--on' : ''}`} aria-hidden="true">
                      {m.taken ? '✓' : ''}
                    </span>
                    <span className="mock-list-text">
                      <span className="mock-list-name">{m.name}</span>
                      <span className="mock-list-status">{m.dose} · {m.time} น.</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ============ BP ============ */

function BPView() {
  const [range, setRange] = useState<'7d' | '30d'>('30d');
  const sys = [138, 136, 142, 134, 140, 138, 136, 142];
  return (
    <div className="mock-scroll">
      <div className="mock-tabs">
        <button type="button" className={`mock-tab ${range === '7d' ? 'mock-tab--on' : ''}`} onClick={() => setRange('7d')}>7 วัน</button>
        <button type="button" className={`mock-tab ${range === '30d' ? 'mock-tab--on' : ''}`} onClick={() => setRange('30d')}>30 วัน</button>
      </div>

      <div className="mock-vital-hero">
        <div className="mock-vital-num">142<small>/88</small></div>
        <div className="mock-vital-meta">
          <span>ความดัน · mmHg</span>
          <span className="mock-zone-tag mock-zone-tag--warn">สูงเล็กน้อย</span>
        </div>
        <div className="mock-vital-extra">ชีพจร 76 ครั้ง/นาที · วันนี้ 08:15</div>
      </div>

      <div className="mock-chart-wrap">
        <div className="mock-chart-title">
          <span>ความดันบน (Systolic)</span>
          <span className="mock-chart-delta mock-chart-delta--up">+4 mmHg</span>
        </div>
        <LineChart values={sys} gradientId="gradBP" />
        <div className="mock-chart-axis">
          <span>สัปดาห์ 1</span>
          <span>2</span>
          <span>4</span>
        </div>
      </div>

      <div className="mock-section-label">โซน</div>
      <ul className="mock-zone-list">
        <li><span className="mock-zone-bar mock-zone-bar--good"></span><span>ปกติ &lt; 120/80</span></li>
        <li><span className="mock-zone-bar mock-zone-bar--watch"></span><span>เริ่มสูง 120–139 / 80–89</span></li>
        <li><span className="mock-zone-bar mock-zone-bar--warn"></span><span>สูง ≥ 140 / 90</span></li>
      </ul>

      <button type="button" className="mock-btn mock-btn--primary mock-btn--full">บันทึกความดันใหม่</button>
    </div>
  );
}

/* ============ Sugar ============ */

function SugarView() {
  const [range, setRange] = useState<'7d' | '30d'>('30d');
  const pre = [108, 112, 115, 120, 118, 122, 125, 128];
  return (
    <div className="mock-scroll">
      <div className="mock-tabs">
        <button type="button" className={`mock-tab ${range === '7d' ? 'mock-tab--on' : ''}`} onClick={() => setRange('7d')}>7 วัน</button>
        <button type="button" className={`mock-tab ${range === '30d' ? 'mock-tab--on' : ''}`} onClick={() => setRange('30d')}>30 วัน</button>
      </div>

      <div className="mock-vital-hero">
        <div className="mock-vital-num">128<small> mg/dL</small></div>
        <div className="mock-vital-meta">
          <span>น้ำตาล · ก่อนอาหาร</span>
          <span className="mock-zone-tag mock-zone-tag--accent">เริ่มสูง</span>
        </div>
        <div className="mock-vital-extra">วันนี้ 11:45 · ก่อนเที่ยง</div>
      </div>

      <div className="mock-tile-row">
        <div className="mock-tile">
          <span className="mock-tile-label">เฉลี่ย ก่อนอาหาร</span>
          <span className="mock-tile-num">118</span>
          <span className="mock-tile-unit">mg/dL · 30 วัน</span>
        </div>
        <div className="mock-tile mock-tile--accent">
          <span className="mock-tile-label">เฉลี่ย หลังอาหาร</span>
          <span className="mock-tile-num">168</span>
          <span className="mock-tile-unit">mg/dL · 30 วัน</span>
        </div>
      </div>

      <div className="mock-chart-wrap">
        <div className="mock-chart-title">
          <span>น้ำตาล (ก่อนอาหาร)</span>
          <span className="mock-chart-delta mock-chart-delta--up">+12</span>
        </div>
        <LineChart values={pre} gradientId="gradSugar" />
        <div className="mock-chart-axis">
          <span>สัปดาห์ 1</span>
          <span>2</span>
          <span>4</span>
        </div>
      </div>

      <button type="button" className="mock-btn mock-btn--primary mock-btn--full">บันทึกน้ำตาลใหม่</button>
    </div>
  );
}

/* ============ App ============ */

type ElderTab = 'summary' | 'meds' | 'bp' | 'sugar';

const TABS: { id: ElderTab; label: string; icon: string }[] = [
  { id: 'summary', label: 'สรุป',     icon: '📊' },
  { id: 'meds',    label: 'ยา',       icon: '💊' },
  { id: 'bp',      label: 'ความดัน',  icon: '🩺' },
  { id: 'sugar',   label: 'น้ำตาล',   icon: '🍬' },
];

export function ElderApp() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<ElderTab>('summary');

  const selected = ELDERS.find((e) => e.id === selectedId) ?? null;

  return (
    <PhoneShell brand={BRAND}>
      {!selected ? (
        <ListView onSelect={(id) => { setSelectedId(id); setTab('summary'); }} />
      ) : (
        <>
          <AppHeader title={`${selected.emoji} ${selected.relation}`} back onBack={() => setSelectedId(null)} />
          <div className="mock-app-body">
            {tab === 'summary' && <SummaryView elder={selected} />}
            {tab === 'meds'    && <MedsView />}
            {tab === 'bp'      && <BPView />}
            {tab === 'sugar'   && <SugarView />}
          </div>
          <nav className="mock-tabbar" aria-label="แท็บผู้สูงอายุ">
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
