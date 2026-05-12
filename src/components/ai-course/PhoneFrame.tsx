import type { ReactNode, CSSProperties } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  time?: string;
  barColor?: string;
}

export function PhoneFrame({ children, time = '9:41', barColor = '#1a1a1a' }: PhoneFrameProps) {
  return (
    <div className="phone">
      <div className="phone-screen">
        <div className="phone-notch"></div>
        <div className="phone-statusbar" style={{ color: barColor } as CSSProperties}>
          <span>{time}</span>
          <span className="icons">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M1 7h2v2H1zM5 5h2v4H5zM9 3h2v6H9zM13 1h2v8h-2z" fill="currentColor" />
            </svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M7 2c2 0 3.7.8 5 2L7 9 2 4c1.3-1.2 3-2 5-2z" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="7" cy="7" r="1" fill="currentColor" />
            </svg>
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
              <rect x="0.5" y="1.5" width="18" height="7" rx="1.5" stroke="currentColor" fill="none" />
              <rect x="2" y="3" width="14" height="4" rx="0.5" fill="currentColor" />
              <rect x="19.5" y="3.5" width="1.5" height="3" rx="0.5" fill="currentColor" />
            </svg>
          </span>
        </div>
        <div className="phone-body">{children}</div>
      </div>
    </div>
  );
}
