import type { ReactElement } from 'react';

export const Ico: Record<string, ReactElement> = {
  money: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 14c0 1 1 2 3 2s3-1 3-2-1-1.5-3-2-3-1-3-2 1-2 3-2 3 1 3 2M12 6v2M12 16v2" />
    </svg>
  ),
  repeat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
    </svg>
  ),
  question: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 015 0c0 2-2.5 2-2.5 4" />
      <circle cx="12" cy="17" r=".8" fill="currentColor" />
    </svg>
  ),
  spark: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2.5 7.5 5.5 10.5 11.5 4" />
    </svg>
  ),
  line: (
    <svg width="18" height="18" viewBox="0 0 36 36" fill="none">
      <path
        d="M18 6c-7.2 0-13 4.6-13 10.3 0 5.2 4.6 9.5 10.9 10.2.4 0 1 .3 1.1.6.1.3.1.7 0 1l-.2 1c-.1.3-.3 1.2 1.1.7 1.4-.6 7.4-4.4 10-7.5 1.8-2 2.7-4 2.7-6 0-5.7-5.8-10.3-13-10.3z"
        fill="currentColor"
      />
    </svg>
  ),
  arrow: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  kid: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v3" />
      <circle cx="12" cy="9" r="4" />
      <path d="M5 22v-3a4 4 0 014-4h6a4 4 0 014 4v3" />
    </svg>
  ),
  brain: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3a3 3 0 00-3 3v1a3 3 0 00-2 3 3 3 0 002 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3z" />
      <path d="M15 3a3 3 0 013 3v1a3 3 0 012 3 3 3 0 01-2 3 3 3 0 01-3 3 3 3 0 01-3-3V6a3 3 0 013-3z" />
    </svg>
  ),
};
