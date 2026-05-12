import { useEffect } from 'react';
import type { ShowcaseCase } from '../../../lib/showcase-cases';
import { getPrototype } from './prototypes';

interface TourModalProps {
  caseData: ShowcaseCase;
  onClose: () => void;
  registerHref: string;
  lineUrl: string;
}

export function TourModal({ caseData, onClose, registerHref }: TourModalProps) {
  const prototype = getPrototype(caseData.slug);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="tour-modal" role="dialog" aria-modal="true" aria-label={`ตัวอย่าง: ${caseData.title}`}>
      <div className="tour-modal-body">
        <div className="tour-mockup-wrap">{prototype}</div>
      </div>

      <button type="button" className="tour-close-float" onClick={onClose} aria-label="ปิด">
        <span aria-hidden="true">×</span>
      </button>

      <a className="tour-cta-float" href={registerHref}>
        สมัครเรียน <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
