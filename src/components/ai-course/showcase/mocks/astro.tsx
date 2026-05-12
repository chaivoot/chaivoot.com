import { useEffect, useState } from 'react';
import { PhoneShell, AppHeader, type Brand } from './shared';

const BRAND: Brand = { letter: 'ด', name: 'ดวงดี', sub: 'by อาจารย์ภานุ' };

/* ============ Data ============ */

type Trend = 'down' | 'flat' | 'new' | 'warn';
interface Customer {
  id: string;
  name: string;
  zodiac: string;       // ราศี
  zodiacEmoji: string;
  chineseYear: string;  // ปีนักษัตร
  status: string;
  trend: Trend;
  birthDate: string;
  birthTime: string;
}

const CUSTOMERS: Customer[] = [
  { id: 'pui',  name: 'คุณปุ้ย พรพิมล',  zodiac: 'กรกฎ',  zodiacEmoji: '♋', chineseYear: 'เถาะ', status: 'ดูครั้งล่าสุด 5 พ.ค.',  trend: 'down', birthDate: '14 ก.ค. 2530', birthTime: '03:45 น.' },
  { id: 'too',  name: 'คุณตู้ ภาคภูมิ',  zodiac: 'สิงห์',  zodiacEmoji: '♌', chineseYear: 'วอก',  status: 'นัด 14 พ.ค.',          trend: 'flat', birthDate: '22 ส.ค. 2535', birthTime: '11:20 น.' },
  { id: 'oey',  name: 'คุณเอ๋ย ภัทรพร',  zodiac: 'มีน',   zodiacEmoji: '♓', chineseYear: 'ฉลู',  status: 'ดูครั้งล่าสุด 28 เม.ย.', trend: 'down', birthDate: '7 มี.ค. 2528', birthTime: '07:10 น.' },
  { id: 'kong', name: 'คุณก้อง อนุชา',  zodiac: 'กันย์', zodiacEmoji: '♍', chineseYear: 'ระกา', status: 'นัด 18 พ.ค.',          trend: 'flat', birthDate: '11 ก.ย. 2524', birthTime: '20:55 น.' },
  { id: 'pop',  name: 'คุณป๊อบ ปรัชญา',  zodiac: 'พิจิก', zodiacEmoji: '♏', chineseYear: 'กุน',  status: 'ดูครั้งล่าสุด 12 มี.ค.', trend: 'down', birthDate: '3 พ.ย. 2533', birthTime: '14:30 น.' },
  { id: 'fern', name: 'คุณเฟิร์น สุภาพร', zodiac: 'มังกร', zodiacEmoji: '♑', chineseYear: 'จอ',   status: 'เริ่มดูวันนี้',          trend: 'new',  birthDate: '29 ธ.ค. 2537', birthTime: '06:00 น.' },
];

/* ============ List ============ */

function ListView({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <>
      <AppHeader title="ลูกค้า" />

      <div className="mock-kpi-row">
        <div className="mock-kpi">
          <span className="mock-kpi-num">24</span>
          <span className="mock-kpi-label">ทั้งหมด</span>
        </div>
        <div className="mock-kpi mock-kpi--accent">
          <span className="mock-kpi-num">12</span>
          <span className="mock-kpi-label">เดือนนี้</span>
        </div>
        <div className="mock-kpi mock-kpi--good">
          <span className="mock-kpi-num">3</span>
          <span className="mock-kpi-label">รอนัด</span>
        </div>
      </div>

      <div className="mock-search">
        <span className="mock-search-icon" aria-hidden="true">⌕</span>
        <span className="mock-search-placeholder">ค้นหาชื่อหรือราศี…</span>
      </div>

      <ul className="mock-list">
        {CUSTOMERS.map((c) => (
          <li key={c.id}>
            <button type="button" className="mock-list-row mock-list-row--btn" onClick={() => onSelect(c.id)}>
              <span className="mock-avatar mock-avatar--zodiac" aria-hidden="true">{c.zodiacEmoji}</span>
              <span className="mock-list-text">
                <span className="mock-list-name">{c.name}</span>
                <span className="mock-list-status">ราศี{c.zodiac} · ปี{c.chineseYear} · {c.status}</span>
              </span>
              <span className="mock-list-chev" aria-hidden="true">›</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ============ Profile ============ */

function ProfileView({ customer }: { customer: Customer }) {
  return (
    <div className="mock-scroll">
      <div className="mock-zodiac-hero">
        <span className="mock-zodiac-symbol" aria-hidden="true">{customer.zodiacEmoji}</span>
        <div className="mock-zodiac-info">
          <span className="mock-zodiac-label">ราศี</span>
          <span className="mock-zodiac-name">{customer.zodiac}</span>
        </div>
        <div className="mock-zodiac-divider" aria-hidden="true"></div>
        <div className="mock-zodiac-info">
          <span className="mock-zodiac-label">ปีนักษัตร</span>
          <span className="mock-zodiac-name">{customer.chineseYear}</span>
        </div>
      </div>

      <div className="mock-section-label">ข้อมูลเกิด</div>
      <div className="mock-tile-row">
        <div className="mock-tile">
          <span className="mock-tile-label">วันเกิด</span>
          <span className="mock-tile-num mock-tile-num--md">{customer.birthDate}</span>
        </div>
        <div className="mock-tile mock-tile--accent">
          <span className="mock-tile-label">เวลาเกิด</span>
          <span className="mock-tile-num mock-tile-num--md">{customer.birthTime}</span>
        </div>
      </div>

      <div className="mock-section-label">ธาตุประจำตัว</div>
      <div className="mock-info-card">
        ธาตุน้ำ · เป็นคนเงียบลึก เก็บอารมณ์ดี เหมาะกับงานที่ใช้ความเข้าใจคน
      </div>

      <div className="mock-tip">ระบบสร้างผลดูดวงรายบุคคลจากข้อมูลข้างต้น</div>
    </div>
  );
}

/* ============ Reading ============ */

function StarRow({ label, score, note }: { label: string; score: number; note: string }) {
  return (
    <div className="mock-star-row">
      <span className="mock-star-label">{label}</span>
      <span className="mock-stars" aria-label={`${score} จาก 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`mock-star ${i <= score ? 'mock-star--on' : ''}`} aria-hidden="true">★</span>
        ))}
      </span>
      <span className="mock-star-note">{note}</span>
    </div>
  );
}

function ReadingView() {
  return (
    <div className="mock-scroll">
      <div className="mock-banner mock-banner--accent">
        <span className="mock-banner-icon" aria-hidden="true">🔮</span>
        <span className="mock-banner-text">
          <strong>ดวงประจำเดือน พ.ค. 2026</strong> — ดวงเด่นด้านการงานและความรัก
        </span>
      </div>

      <div className="mock-section-label">ดวงไทย</div>
      <div className="mock-reading-card">
        <StarRow label="การงาน"   score={4} note="มีโอกาสใหม่เข้ามา ทำเต็มที่จะเห็นผล" />
        <StarRow label="การเงิน"  score={3} note="รายรับเสมอตัว ระวังของแพง" />
        <StarRow label="ความรัก" score={5} note="เด่นมาก คนโสดมีคนถูกใจเข้ามา" />
        <StarRow label="สุขภาพ"  score={3} note="ระวังเรื่องนอนดึก พักให้พอ" />
        <StarRow label="โชคลาภ"  score={4} note="เลขเด่น 2 · 7 · 9" />
      </div>

      <div className="mock-section-label">ดวงจีน — ปี{ /* placeholder */ }เถาะ</div>
      <div className="mock-reading-card">
        <StarRow label="ภาพรวม"   score={4} note="ราบรื่น มีคนช่วยเหลือ" />
        <StarRow label="ทิศมงคล"  score={5} note="ทิศตะวันออกเฉียงเหนือ" />
        <StarRow label="ระวัง"    score={2} note="เรื่องเอกสาร อย่ารีบเซ็น" />
      </div>
    </div>
  );
}

/* ============ Lucky ============ */

const LUCKY_COLORS = [
  { name: 'ฟ้าคราม',  hex: '#5B8FB9' },
  { name: 'เขียวมิ้นต์', hex: '#A8C9A0' },
  { name: 'เหลืองทอง', hex: '#E6B85C' },
  { name: 'ครีม',     hex: '#EFE6D2' },
  { name: 'ม่วงอ่อน',  hex: '#B79EC9' },
];

const WEEKDAY_COLORS = [
  { day: 'จันทร์',   color: 'เหลือง',      hex: '#F4D03F' },
  { day: 'อังคาร',   color: 'ชมพูอมส้ม',   hex: '#F19895' },
  { day: 'พุธ',      color: 'เขียวมรกต',   hex: '#5DBB63' },
  { day: 'พฤหัสฯ',   color: 'ส้มอิฐ',       hex: '#D17B40' },
  { day: 'ศุกร์',     color: 'ฟ้าคราม',     hex: '#5B8FB9' },
  { day: 'เสาร์',    color: 'ม่วงเข้ม',     hex: '#7E5A9B' },
  { day: 'อาทิตย์',  color: 'แดงเลือดหมู', hex: '#9B3340' },
];

const JEWELRY = [
  { icon: '💎', name: 'หินมูนสโตน',  reason: 'เสริมความรัก เพิ่มเสน่ห์' },
  { icon: '🪙', name: 'ทองคำแท่งเล็ก', reason: 'เสริมการเงิน ใส่ติดตัว' },
  { icon: '📿', name: 'ลูกประคำหินดำ', reason: 'กันสิ่งไม่ดี ใส่ออกงาน' },
];

function LuckyView() {
  // Detect today's weekday client-side so the prototype always feels alive.
  // SSR runs at build time so we defer detection to useEffect — avoids
  // 'วันนี้วัน[stale]' if the build happened on a different day.
  const [todayIdx, setTodayIdx] = useState<number | null>(null);
  useEffect(() => {
    const d = new Date().getDay(); // 0=Sun ... 6=Sat
    // WEEKDAY_COLORS is จันทร์-first (0..6 = Mon..Sun)
    setTodayIdx(d === 0 ? 6 : d - 1);
  }, []);
  const today = todayIdx !== null ? WEEKDAY_COLORS[todayIdx] : null;

  return (
    <div className="mock-scroll">
      {today && (
        <div className="mock-today-card">
          <span className="mock-today-eyebrow">วันนี้ · วัน{today.day}</span>
          <div className="mock-today-row">
            <span className="mock-today-swatch" style={{ background: today.hex }} aria-hidden="true"></span>
            <div className="mock-today-text">
              <span className="mock-today-name">{today.color}</span>
              <span className="mock-today-hint">สีเสื้อที่ควรใส่</span>
            </div>
          </div>
        </div>
      )}

      <div className="mock-section-label">สีถูกโฉลก 5 สี</div>
      <ul className="mock-color-grid">
        {LUCKY_COLORS.map((c) => (
          <li key={c.name} className="mock-color-cell">
            <span className="mock-color-dot" style={{ background: c.hex }} aria-hidden="true"></span>
            <span className="mock-color-name">{c.name}</span>
          </li>
        ))}
      </ul>

      <div className="mock-section-label mock-section-label--accent">สีเสื้อทั้ง 7 วัน</div>
      <ul className="mock-weekday-list">
        {WEEKDAY_COLORS.map((d, i) => (
          <li key={d.day} className={`mock-weekday-row ${i === todayIdx ? 'mock-weekday-row--today' : ''}`}>
            <span className="mock-weekday-name">{d.day}</span>
            <span className="mock-weekday-swatch" style={{ background: d.hex }} aria-hidden="true"></span>
            <span className="mock-weekday-color">{d.color}</span>
            {i === todayIdx && <span className="mock-weekday-today">วันนี้</span>}
          </li>
        ))}
      </ul>

      <div className="mock-section-label">เครื่องประดับแนะนำ</div>
      <ul className="mock-jewel-list">
        {JEWELRY.map((j) => (
          <li key={j.name} className="mock-jewel-row">
            <span className="mock-jewel-icon" aria-hidden="true">{j.icon}</span>
            <span className="mock-jewel-text">
              <span className="mock-jewel-name">{j.name}</span>
              <span className="mock-jewel-reason">{j.reason}</span>
            </span>
          </li>
        ))}
      </ul>

      <button type="button" className="mock-btn mock-btn--primary mock-btn--full">ส่งผลให้ลูกค้าทาง Line</button>
    </div>
  );
}

/* ============ History ============ */

interface Reading {
  date: string;
  topic: string;
  result: string;
}

const READINGS: Reading[] = [
  { date: '5 พ.ค. 2026',  topic: 'ดวงประจำเดือน',  result: 'การงานเด่น มีโอกาสใหม่' },
  { date: '8 เม.ย. 2026', topic: 'ปรึกษาเรื่องงาน', result: 'รับงานที่เสนอมาได้ ดวงสนับสนุน' },
  { date: '14 มี.ค. 2026', topic: 'ดวงปี 2569',     result: 'ปีทองเรื่องความรัก ระวังการเงิน Q3' },
  { date: '22 ม.ค. 2026',  topic: 'ฤกษ์ย้ายบ้าน',   result: '15 ก.พ. เวลา 09:09 น. ทิศ NE' },
];

function HistoryView() {
  return (
    <div className="mock-scroll">
      <div className="mock-section-label">ประวัติการดู</div>
      <ul className="mock-timeline">
        {READINGS.map((r, i) => (
          <li key={i} className="mock-timeline-row">
            <span className="mock-timeline-dot" aria-hidden="true"></span>
            <span className="mock-timeline-content">
              <span className="mock-timeline-date">{r.date}</span>
              <span className="mock-timeline-title">{r.topic}</span>
              <span className="mock-timeline-meta">{r.result}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============ App ============ */

type AstroTab = 'profile' | 'reading' | 'lucky' | 'history';

const TABS: { id: AstroTab; label: string; icon: string }[] = [
  { id: 'profile', label: 'ข้อมูล',  icon: '👤' },
  { id: 'reading', label: 'ดวง',     icon: '🔮' },
  { id: 'lucky',   label: 'สีโชค',   icon: '🎨' },
  { id: 'history', label: 'ประวัติ', icon: '📜' },
];

export function AstroApp() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<AstroTab>('profile');

  const selected = CUSTOMERS.find((c) => c.id === selectedId) ?? null;

  return (
    <PhoneShell brand={BRAND}>
      {!selected ? (
        <ListView onSelect={(id) => { setSelectedId(id); setTab('profile'); }} />
      ) : (
        <>
          <AppHeader title={`${selected.zodiacEmoji} ${selected.name}`} back onBack={() => setSelectedId(null)} />
          <div className="mock-app-body">
            {tab === 'profile' && <ProfileView customer={selected} />}
            {tab === 'reading' && <ReadingView />}
            {tab === 'lucky'   && <LuckyView />}
            {tab === 'history' && <HistoryView />}
          </div>
          <nav className="mock-tabbar" aria-label="แท็บลูกค้า">
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
