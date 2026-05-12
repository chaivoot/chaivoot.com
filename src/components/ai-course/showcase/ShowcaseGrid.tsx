import { useState } from 'react';
import { SHOWCASE_CASES, type ShowcaseCase } from '../../../lib/showcase-cases';
import { TourModal } from './TourModal';

export function ShowcaseGrid() {
  const [activeCase, setActiveCase] = useState<ShowcaseCase | null>(null);

  return (
    <>
      <div className="case-grid">
        {SHOWCASE_CASES.map((c) => (
          <article key={c.slug} className="case-card">
            <div className="case-icon" aria-hidden="true">{c.emoji}</div>
            <div className="case-audience">{c.audience}</div>
            <h2 className="case-title">{c.title}</h2>
            <p className="case-desc">{c.desc}</p>
            {c.tourReady ? (
              <button type="button" className="case-cta" onClick={() => setActiveCase(c)}>
                ดูตัวอย่าง <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button type="button" className="case-cta case-cta--soon" disabled>
                เร็วๆ นี้
              </button>
            )}
          </article>
        ))}
      </div>

      {activeCase && (
        <TourModal caseData={activeCase} onClose={() => setActiveCase(null)} />
      )}
    </>
  );
}
