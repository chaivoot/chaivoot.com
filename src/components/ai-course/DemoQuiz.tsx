import { useState, type CSSProperties } from 'react';
import { PhoneFrame } from './PhoneFrame';

type PersonaKey = 'explorer' | 'maker' | 'storyteller' | 'organizer';

const PERSONAS: Record<PersonaKey, { key: PersonaKey; label: string; color: string; emoji: string; tagline: string; rec: string }> = {
  explorer:    { key: 'explorer',    label: 'นักทดลอง',    color: '#E89B4C', emoji: '🧪', tagline: 'ลองก่อน คิดทีหลัง',           rec: 'เริ่มจากเล่น ChatGPT/Claude แบบไม่จำกัด แล้วต่อยอดเป็นเว็บแอปที่ไอเดียดิบๆ ของคุณกลายเป็นจริง' },
  maker:       { key: 'maker',       label: 'นักสร้าง',     color: '#D4B26A', emoji: '🔨', tagline: 'สร้างของจริงเสมอ',          rec: 'คุณคือคนที่คอร์สนี้ออกแบบมาเพื่อ — จบใน 1 วัน คุณจะมีเว็บแอปแรกขึ้นจริงพร้อมใช้งาน' },
  storyteller: { key: 'storyteller', label: 'นักเล่าเรื่อง', color: '#B585D8', emoji: '✍️', tagline: 'ทุกอย่างมีเรื่องเล่า',         rec: 'AI ช่วยคุณเขียน content / โพสต์ขาย / เว็บโชว์ผลงาน ได้เร็วกว่าเดิม 10 เท่า' },
  organizer:   { key: 'organizer',   label: 'นักจัดระบบ',   color: '#6FA5D0', emoji: '📋', tagline: 'ระบบดี ชีวิตดี',             rec: 'เริ่มจากเว็บแอปจัดการงานในร้าน/ออฟฟิศ — ระบบจอง, สะสมแต้ม, dashboard ลูกค้า' },
};

const QUIZ_QS: Array<{ q: string; opts: Array<{ label: string; desc: string; w: [number, number, number, number] }> }> = [
  {
    q: 'เวลาเจอ AI ตัวใหม่ คุณ...',
    opts: [
      { label: 'กดเข้าไปลองทันที',         desc: 'ดูว่ามันทำอะไรได้บ้าง',          w: [3, 1, 0, 0] },
      { label: 'คิดก่อนว่าจะเอามาทำอะไร',  desc: 'วางแผนก่อนลงมือ',              w: [0, 3, 0, 1] },
      { label: 'เปิดคลิปรีวิวก่อน',         desc: 'ดูคนอื่นใช้ก่อน',                 w: [0, 0, 2, 2] },
      { label: 'เซฟลิงก์ไว้ก่อน',          desc: 'รอเวลาที่ใช่',                   w: [0, 0, 0, 3] },
    ],
  },
  {
    q: 'ถ้ามี AI ฟรี 1 ชม. คุณจะ...',
    opts: [
      { label: 'ถามคำถามแปลกๆ',         desc: 'อะไรก็ได้ที่อยากรู้',               w: [3, 0, 1, 0] },
      { label: 'ให้ช่วยทำของจริง',         desc: 'เว็บ แอป ระบบ ของใช้ได้',        w: [1, 3, 0, 0] },
      { label: 'ให้ช่วยเขียน',             desc: 'โพสต์ บทความ คำขาย',             w: [0, 0, 3, 1] },
      { label: 'ให้ช่วยวางแผน/สรุปงาน',    desc: 'ทำตารางและ to-do list',          w: [0, 1, 0, 3] },
    ],
  },
  {
    q: 'สิ่งที่อยากให้ AI ช่วยที่สุด',
    opts: [
      { label: 'ไอเดียที่ไม่เคยคิดมาก่อน',  desc: 'ทลายกรอบเดิม',                  w: [3, 1, 1, 0] },
      { label: 'สร้างเว็บ/แอป/ของจริง',    desc: 'ทำให้มี ทำให้เป็น',              w: [0, 3, 0, 1] },
      { label: 'เขียน content ขายของ',     desc: 'ให้ลูกค้าเข้ามาเอง',              w: [0, 1, 3, 0] },
      { label: 'งานประจำที่ใช้เวลามาก',     desc: 'ตอบลูกค้า / สรุปข้อมูล',          w: [0, 0, 1, 3] },
    ],
  },
];

const styles: Record<string, CSSProperties> = {
  app: { padding: '12px 14px', display: 'flex', flexDirection: 'column', height: '100%', background: '#0F0A1F', color: '#EFE7D6' },
  brandRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  brand: { display: 'inline-flex', alignItems: 'center', gap: 6, color: '#D4B26A', fontSize: 14, fontWeight: 500 },
  brandDot: { width: 7, height: 7, borderRadius: 999, background: '#D4B26A', boxShadow: '0 0 8px #D4B26A' },
  brandAccent: { fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#E6CB87', fontWeight: 500 },
  menu: { width: 26, height: 26, borderRadius: 999, border: '1px solid rgba(212,178,106,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4B26A', fontSize: 12 },
  progress: { display: 'flex', gap: 3, marginBottom: 14 },
  progSeg: { flex: 1, height: 2, background: 'rgba(212,178,106,0.2)', borderRadius: 2, transition: 'background 0.3s' },
  progSegOn: { flex: 1, height: 2, background: '#D4B26A', borderRadius: 2 },
  step: { fontSize: 9, color: '#9C8554', fontFamily: 'var(--font-mono)', letterSpacing: '0.18em', marginBottom: 6 },
  q: { fontSize: 17, fontWeight: 500, color: '#EFE7D6', lineHeight: 1.3, marginBottom: 14, letterSpacing: '-0.01em' },
  opts: { display: 'flex', flexDirection: 'column', gap: 7 },
  opt: { padding: '9px 11px', border: '1px solid rgba(212,178,106,0.2)', background: 'rgba(255,255,255,0.02)', borderRadius: 10, cursor: 'pointer', transition: 'all 0.18s' },
  optTitle: { fontSize: 12.5, fontWeight: 500, color: '#EFE7D6', marginBottom: 1 },
  optDesc: { fontSize: 10, color: 'rgba(239,231,214,0.55)', lineHeight: 1.3 },
  introWrap: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '0 4px' },
  introBadge: { display: 'inline-flex', alignSelf: 'center', alignItems: 'center', gap: 6, padding: '4px 10px', border: '1px solid rgba(212,178,106,0.3)', borderRadius: 999, fontSize: 10, color: '#D4B26A', fontFamily: 'var(--font-mono)', letterSpacing: '0.16em', marginBottom: 14 },
  introTitle: { fontSize: 22, fontWeight: 500, color: '#EFE7D6', lineHeight: 1.25, marginBottom: 8, letterSpacing: '-0.01em' },
  introTitleAccent: { fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#D4B26A', fontWeight: 500 },
  introSub: { fontSize: 12, color: 'rgba(239,231,214,0.6)', lineHeight: 1.5, marginBottom: 22 },
  introBtn: { background: '#D4B26A', color: '#0F0A1F', padding: '11px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.01em' },
  introMeta: { fontSize: 10, color: 'rgba(239,231,214,0.4)', marginTop: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em' },
  resWrap: { flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 2, overflow: 'auto', paddingBottom: 6 },
  resStep: { fontSize: 9, color: '#9C8554', fontFamily: 'var(--font-mono)', letterSpacing: '0.18em', marginBottom: 3, textAlign: 'center' },
  resTitle: { fontSize: 11, color: 'rgba(239,231,214,0.65)', textAlign: 'center', marginBottom: 2, lineHeight: 1.2 },
  resPersona: { fontSize: 19, fontWeight: 600, textAlign: 'center', marginBottom: 0, letterSpacing: '-0.01em', lineHeight: 1.15 },
  resTag: { fontSize: 10, color: 'rgba(239,231,214,0.5)', textAlign: 'center', marginBottom: 4, fontFamily: 'var(--font-serif)', fontStyle: 'italic' },
  donutWrap: { position: 'relative', width: 108, height: 108, margin: '0 auto 4px' },
  donutCenter: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 },
  legendGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 10px', padding: '0 2px', marginBottom: 4 },
  legendRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10 },
  legendLeft: { display: 'flex', alignItems: 'center', gap: 5, minWidth: 0 },
  legendDot: { width: 7, height: 7, borderRadius: 2, flexShrink: 0 },
  legendName: { color: '#EFE7D6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  legendPct: { fontFamily: 'var(--font-mono)', color: 'rgba(239,231,214,0.7)', fontSize: 9.5, flexShrink: 0 },
  recBox: { background: 'rgba(212,178,106,0.08)', border: '1px solid rgba(212,178,106,0.25)', borderRadius: 9, padding: '7px 10px', marginTop: 4, fontSize: 10.5, lineHeight: 1.4, color: '#EFE7D6' },
  recLabel: { fontSize: 9, color: '#D4B26A', fontFamily: 'var(--font-mono)', letterSpacing: '0.18em', marginBottom: 2 },
  ctaRow: { display: 'flex', gap: 6, marginTop: 7 },
  ctaPrimary: { flex: 1, background: '#D4B26A', color: '#0F0A1F', padding: '8px', borderRadius: 8, fontSize: 11, fontWeight: 600, textAlign: 'center', cursor: 'pointer' },
  ctaGhost: { background: 'transparent', color: 'rgba(239,231,214,0.7)', padding: '8px 10px', borderRadius: 8, fontSize: 10.5, border: '1px solid rgba(239,231,214,0.2)', cursor: 'pointer', whiteSpace: 'nowrap' },
};

function QuizDonut({ totals, persona }: { totals: Record<PersonaKey, number>; persona: PersonaKey }) {
  const sum = totals.explorer + totals.maker + totals.storyteller + totals.organizer || 1;
  const order: PersonaKey[] = ['explorer', 'maker', 'storyteller', 'organizer'];
  const R = 44, r = 28, cx = 54, cy = 54;
  let angle = -Math.PI / 2;
  const arcs = order.map((k) => {
    const frac = totals[k] / sum;
    const start = angle;
    const end = angle + frac * Math.PI * 2;
    angle = end;
    if (frac < 0.001) return null;
    const large = end - start > Math.PI ? 1 : 0;
    const x1 = cx + R * Math.cos(start), y1 = cy + R * Math.sin(start);
    const x2 = cx + R * Math.cos(end),   y2 = cy + R * Math.sin(end);
    const xi1 = cx + r * Math.cos(end),  yi1 = cy + r * Math.sin(end);
    const xi2 = cx + r * Math.cos(start), yi2 = cy + r * Math.sin(start);
    const d = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${xi1} ${yi1} A ${r} ${r} 0 ${large} 0 ${xi2} ${yi2} Z`;
    return <path key={k} d={d} fill={PERSONAS[k].color} opacity={k === persona ? 1 : 0.45} />;
  });
  return (
    <svg width="108" height="108" viewBox="0 0 108 108">
      <circle cx={cx} cy={cy} r={R + 1} fill="rgba(212,178,106,0.06)" />
      {arcs}
    </svg>
  );
}

export default function DemoQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const reset = () => { setStep(0); setAnswers([]); };
  const pick = (optIdx: number) => {
    setAnswers([...answers, optIdx]);
    setStep(step + 1);
  };

  const totals: Record<PersonaKey, number> = { explorer: 0, maker: 0, storyteller: 0, organizer: 0 };
  answers.forEach((optIdx, qIdx) => {
    const w = QUIZ_QS[qIdx].opts[optIdx].w;
    totals.explorer    += w[0];
    totals.maker       += w[1];
    totals.storyteller += w[2];
    totals.organizer   += w[3];
  });
  const sumT = totals.explorer + totals.maker + totals.storyteller + totals.organizer || 1;
  const winner = (['explorer', 'maker', 'storyteller', 'organizer'] as PersonaKey[]).reduce(
    (a, b) => (totals[a] >= totals[b] ? a : b),
  );

  const scrollToRegister = () => {
    const el = document.getElementById('register');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PhoneFrame barColor="#EFE7D6">
      <div style={styles.app}>
        <div style={styles.brandRow}>
          <span style={styles.brand}>
            <span style={styles.brandDot}></span> AI <span style={styles.brandAccent}>Persona</span>
          </span>
          <span style={styles.menu}>≡</span>
        </div>

        {step === 0 && (
          <div style={styles.introWrap}>
            <div style={styles.introBadge}>● 3 ข้อ · 30 วินาที</div>
            <div style={styles.introTitle}>
              คุณเป็น<br />
              <span style={styles.introTitleAccent}>ผู้ใช้ AI</span> แบบไหน?
            </div>
            <div style={styles.introSub}>
              ตอบ 3 คำถามสั้นๆ
              <br />
              เพื่อค้นหาวิธีที่ AI จะช่วยคุณได้มากที่สุด
            </div>
            <div style={styles.introBtn} onClick={() => setStep(1)}>เริ่มเลย →</div>
            <div style={styles.introMeta}>EMBEDDED DEMO · LIVE</div>
          </div>
        )}

        {step >= 1 && step <= 3 && (() => {
          const qIdx = step - 1;
          const q = QUIZ_QS[qIdx];
          return (
            <>
              <div style={styles.progress}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={i < step ? styles.progSegOn : styles.progSeg} />
                ))}
              </div>
              <div style={styles.step}>คำถามที่ {String(step).padStart(2, '0')} / 03</div>
              <h3 style={styles.q}>{q.q}</h3>
              <div style={styles.opts}>
                {q.opts.map((o, i) => (
                  <div
                    key={i}
                    style={styles.opt}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#D4B26A';
                      e.currentTarget.style.background = 'rgba(212,178,106,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(212,178,106,0.2)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    }}
                    onClick={() => pick(i)}
                  >
                    <div style={styles.optTitle}>{o.label}</div>
                    <div style={styles.optDesc}>{o.desc}</div>
                  </div>
                ))}
              </div>
            </>
          );
        })()}

        {step === 4 && (
          <div style={styles.resWrap}>
            <div style={styles.resStep}>— ผลลัพธ์ —</div>
            <div style={styles.resTitle}>คุณคือ</div>
            <div style={{ ...styles.resPersona, color: PERSONAS[winner].color }}>
              {PERSONAS[winner].label}
            </div>
            <div style={styles.resTag}>"{PERSONAS[winner].tagline}"</div>
            <div style={styles.donutWrap}>
              <QuizDonut totals={totals} persona={winner} />
            </div>
            <div style={styles.legendGrid}>
              {(['explorer', 'maker', 'storyteller', 'organizer'] as PersonaKey[]).map((k) => (
                <div key={k} style={styles.legendRow}>
                  <span style={styles.legendLeft}>
                    <span style={{ ...styles.legendDot, background: PERSONAS[k].color, opacity: k === winner ? 1 : 0.5 }}></span>
                    <span style={{ ...styles.legendName, fontWeight: k === winner ? 600 : 400 }}>{PERSONAS[k].label}</span>
                  </span>
                  <span style={styles.legendPct}>{Math.round((totals[k] / sumT) * 100)}%</span>
                </div>
              ))}
            </div>
            <div style={styles.recBox}>
              <div style={styles.recLabel}>เหมาะกับคุณ</div>
              {PERSONAS[winner].rec}
            </div>
            <div style={styles.ctaRow}>
              <div style={styles.ctaPrimary} onClick={scrollToRegister}>สมัครเรียน →</div>
              <div style={styles.ctaGhost} onClick={reset}>↻ เริ่มใหม่</div>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
