import { useEffect, useState } from 'react';
import type { ShowcaseCase } from '../../../lib/showcase-cases';
import { getTourSteps } from './tour-steps';

interface TourModalProps {
  caseData: ShowcaseCase;
  onClose: () => void;
  registerHref: string;
  lineUrl: string;
}

export function TourModal({ caseData, onClose, registerHref, lineUrl }: TourModalProps) {
  const steps = getTourSteps(caseData.slug);
  const [stepIdx, setStepIdx] = useState(0);
  const total = steps.length;
  const step = steps[stepIdx];
  const isLast = stepIdx === total - 1;
  const isFirst = stepIdx === 0;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && !isFirst) setStepIdx((i) => i - 1);
      if (e.key === 'ArrowRight' && !isLast) setStepIdx((i) => i + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isFirst, isLast, onClose]);

  return (
    <div className="tour-modal" role="dialog" aria-modal="true" aria-label={`ตัวอย่าง: ${caseData.title}`}>
      <header className="tour-modal-head">
        <button type="button" className="tour-close" onClick={onClose} aria-label="ปิด">
          <span aria-hidden="true">×</span>
        </button>
        <div className="tour-step-count" aria-live="polite">
          {stepIdx + 1} / {total}
        </div>
      </header>

      <div className="tour-modal-body" key={stepIdx}>
        <div className="tour-mockup-wrap">{step.mockup}</div>
        <div className="tour-step-text">
          <h3 className="tour-step-title">{step.title}</h3>
          <p className="tour-step-desc">{step.desc}</p>
        </div>
      </div>

      <footer className="tour-modal-foot">
        <button
          type="button"
          className="tour-nav tour-nav--back"
          onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
          disabled={isFirst}
        >
          <span aria-hidden="true">←</span> ย้อน
        </button>
        {isLast ? (
          <a className="tour-nav tour-nav--cta" href={registerHref}>
            สมัครเรียน — ทำของแบบนี้เอง
          </a>
        ) : (
          <button
            type="button"
            className="tour-nav tour-nav--next"
            onClick={() => setStepIdx((i) => Math.min(total - 1, i + 1))}
          >
            ถัดไป <span aria-hidden="true">→</span>
          </button>
        )}
      </footer>
    </div>
  );
}
