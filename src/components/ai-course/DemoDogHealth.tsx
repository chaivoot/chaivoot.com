import type { CSSProperties } from 'react';
import { PhoneFrame } from './PhoneFrame';

const styles: Record<string, CSSProperties> = {
  app: { display: 'flex', flexDirection: 'column', height: '100%', background: '#E7F4EE', color: '#1B2A22' },
  chrome: { padding: '10px 12px 8px', background: '#15171B', color: '#fff', display: 'flex', alignItems: 'center', gap: 8 },
  home: { color: '#fff', fontSize: 14 },
  url: { flex: 1, background: '#2A2D32', borderRadius: 999, padding: '5px 12px', fontSize: 10, color: '#D0D2D6', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6 },
  chromeBtn: { fontSize: 14, color: '#fff' },
  scroll: { flex: 1, overflowY: 'auto', padding: '12px 14px 8px' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  dash: { fontSize: 18, fontWeight: 600, color: '#1B2A22' },
  petChip: { display: 'inline-flex', alignItems: 'center', gap: 6, background: '#CDEEDE', borderRadius: 999, padding: '4px 10px 4px 4px', border: '1px solid #A8DCC4' },
  petAva: { width: 22, height: 22, borderRadius: 999, background: '#2A2D32', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 },
  petName: { fontSize: 12, fontWeight: 500, color: '#15715A' },
  gear: { width: 30, height: 30, borderRadius: 8, background: '#CDEEDE', border: '1px solid #A8DCC4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15715A' },
  card: { background: '#fff', borderRadius: 14, padding: 12, marginBottom: 10, boxShadow: '0 1px 2px rgba(20,40,30,0.04)' },
  cardTitle: { fontSize: 13, fontWeight: 600, color: '#1B2A22', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 },
  metricsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },
  metric: { background: '#fff', borderRadius: 12, padding: '10px 8px', textAlign: 'center', boxShadow: '0 1px 2px rgba(20,40,30,0.04)' },
  metricLabel: { fontSize: 11, fontWeight: 600, color: '#1B2A22' },
  metricSub: { fontSize: 9, color: '#6B7B73', marginBottom: 6 },
  ringWrap: { position: 'relative', width: 64, height: 64, margin: '0 auto' },
  ringVal: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  ringNum: { fontSize: 14, fontWeight: 700, color: '#1B2A22', lineHeight: 1 },
  ringUnit: { fontSize: 8, color: '#6B7B73', marginTop: 1 },
  bottomNav: { display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', padding: '6px 4px 8px', borderTop: '1px solid #D7E8DE', background: '#fff' },
  navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, fontSize: 9, color: '#6B7B73' },
  navItemOn: { color: '#1D9E75', fontWeight: 600 },
};

function DogRing({ pct, color, value, unit }: { pct: number; color: string; value: string; unit: string }) {
  const R = 26, C = 2 * Math.PI * R;
  const off = C - (C * pct) / 100;
  return (
    <div style={styles.ringWrap}>
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={R} fill="none" stroke="#D7E8DE" strokeWidth="5" />
        <circle cx="32" cy="32" r={R} fill="none" stroke={color} strokeWidth="5" strokeDasharray={C} strokeDashoffset={off} strokeLinecap="round" transform="rotate(-90 32 32)" />
      </svg>
      <div style={styles.ringVal}>
        <div style={styles.ringNum}>{value}</div>
        <div style={styles.ringUnit}>{unit}</div>
      </div>
    </div>
  );
}

export default function DemoDogHealth() {
  const pts: Array<[number, number]> = [
    [10, 18], [40, 24], [70, 30], [100, 36], [130, 40], [160, 46], [190, 50], [220, 54],
  ];
  const path = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p.join(',')).join(' ');
  const area = path + ` L 220 84 L 10 84 Z`;
  return (
    <PhoneFrame barColor="#EFE7D6">
      <div style={styles.app}>
        <div style={styles.chrome}>
          <span style={styles.home}>⌂</span>
          <span style={styles.url}><span style={{ opacity: 0.6 }}>🔒</span> dogevityfood.com</span>
          <span style={styles.chromeBtn}>+</span>
        </div>
        <div style={styles.scroll}>
          <div style={styles.topRow}>
            <span style={styles.dash}>Dashboard</span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={styles.petChip}>
                <span style={styles.petAva}>🐶</span>
                <span style={styles.petName}>มอมแมม</span>
              </span>
              <span style={styles.gear}>⚙</span>
            </div>
          </div>

          <div style={styles.card}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 999, background: '#CDEEDE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, border: '2px solid #A8DCC4' }}>🐕</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>มอมแมม</div>
                <div style={{ fontSize: 10, color: '#6B7B73' }}>Shetland Sheepdog · 3 ปี · ทำหมัน</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
              {[
                { l: 'น้ำหนัก',  v: '13.4 กก.',     c: '#1B2A22' },
                { l: 'BCS',     v: '5/9',          c: '#1D9E75' },
                { l: 'สถานะ',   v: 'อุดมสมบูรณ์',   c: '#1D9E75' },
              ].map((m, i) => (
                <div key={i} style={{ background: '#F1F8F4', borderRadius: 8, padding: '6px 4px', textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: '#6B7B73' }}>{m.l}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: m.c, marginTop: 2 }}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>📈 กราฟน้ำหนัก</div>
            <svg width="100%" viewBox="0 0 230 96" style={{ display: 'block' }}>
              <defs>
                <linearGradient id="dogarea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1D9E75" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#1D9E75" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="10" y1="84" x2="220" y2="84" stroke="#E2E8E4" strokeWidth="0.5" />
              <line x1="10" y1="14" x2="220" y2="14" stroke="#E2E8E4" strokeWidth="0.5" strokeDasharray="2,2" />
              <path d="M 10 60 L 220 60" stroke="#D4A53A" strokeWidth="1" strokeDasharray="3,3" />
              <path d={area} fill="url(#dogarea)" />
              <path d={path} fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              {pts.map((p, i) => (
                <circle key={i} cx={p[0]} cy={p[1]} r="2" fill="#fff" stroke="#1D9E75" strokeWidth="1.2" />
              ))}
              <text x="14" y="12" fontSize="6" fill="#6B7B73" fontFamily="ui-monospace">14.8</text>
              <text x="200" y="58" fontSize="6" fill="#6B7B73" fontFamily="ui-monospace">13.4</text>
            </svg>
            <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 9, color: '#6B7B73' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 2, background: '#1D9E75' }}></span>น้ำหนักจริง
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 0, borderTop: '1.5px dashed #D4A53A' }}></span>เป้าหมาย
              </span>
            </div>
          </div>

          <div style={styles.metricsGrid}>
            <div style={styles.metric}>
              <div style={styles.metricLabel}>RER</div>
              <div style={styles.metricSub}>พลังงานขณะพัก</div>
              <DogRing pct={62} color="#1D9E75" value="490" unit="kcal/วัน" />
            </div>
            <div style={styles.metric}>
              <div style={styles.metricLabel}>DER</div>
              <div style={styles.metricSub}>พลังงานต่อวัน</div>
              <DogRing pct={88} color="#D4A53A" value="784" unit="kcal/วัน" />
            </div>
          </div>
        </div>

        <div style={styles.bottomNav}>
          {[
            { l: 'Home',     i: '⌂',  on: true },
            { l: 'โปรไฟล์',   i: '🐕' },
            { l: 'สูตรอาหาร', i: '🍲' },
            { l: 'น้ำหนัก',   i: '📊' },
            { l: 'สุขภาพ',    i: '💉' },
          ].map((n, i) => (
            <div key={i} style={{ ...styles.navItem, ...(n.on ? styles.navItemOn : {}) }}>
              <span style={{ fontSize: 14 }}>{n.i}</span>
              <span>{n.l}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
