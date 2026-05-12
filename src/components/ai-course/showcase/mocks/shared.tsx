import type { ReactNode } from 'react';

export interface Brand {
  letter: string;
  name: string;
  sub: string;
}

export function PhoneShell({ children, brand }: { children: ReactNode; brand: Brand }) {
  return (
    <div className="mock-screen">
      <div className="mock-brand-bar">
        <span className="mock-brand-logo" aria-hidden="true">{brand.letter}</span>
        <span className="mock-brand-text">
          <span className="mock-brand-name">{brand.name}</span>
          <span className="mock-brand-sub">{brand.sub}</span>
        </span>
      </div>
      {children}
    </div>
  );
}

export function AppHeader({
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
export function Ring({
  fraction,
  color = 'var(--accent)',
  stroke = 9,
  children,
  size = 'md',
  trackColor = '#F0EDE7',
}: RingProps) {
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

export function MiniSpark({ points, up }: { points: number[]; up?: boolean }) {
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

interface LineChartProps {
  /** values normalized later; just provide the raw numbers in order */
  values: number[];
  /** width in viewBox units */
  width?: number;
  /** height in viewBox units */
  height?: number;
  /** number of grid lines */
  gridLines?: number;
  color?: string;
  gradientId?: string;
}
export function LineChart({
  values,
  width = 280,
  height = 110,
  gridLines = 3,
  color = 'var(--accent)',
  gradientId = 'lineGrad',
}: LineChartProps) {
  if (values.length < 2) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const padY = 12;
  const usableH = height - padY * 2;

  const pts = values.map((v, i) => ({
    x: i * step,
    y: padY + usableH - ((v - min) / range) * usableH,
  }));

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const fillPath = `M0,${height} L0,${pts[0].y.toFixed(1)} ${linePath.slice(1)} L${width},${height} Z`;

  const grids = Array.from({ length: gridLines }).map((_, i) => padY + (usableH / (gridLines - 1)) * i);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="mock-chart-svg">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {grids.map((y, i) => (
        <line key={i} x1="0" y1={y} x2={width} y2={y} stroke="#F0EDE7" strokeWidth="0.5" strokeDasharray="2 3" />
      ))}
      <path d={fillPath} fill={`url(#${gradientId})`} />
      <path d={linePath} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#fff" stroke={color} strokeWidth="1.5" />
      ))}
    </svg>
  );
}
