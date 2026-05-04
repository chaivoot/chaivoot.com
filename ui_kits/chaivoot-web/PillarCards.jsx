/* global React */
window.PillarCards = function PillarCards({ go }) {
  const list = ['amway','longevity','dog'].map(k => window.PILLARS[k]);
  return (
    <div className="pillars fade-in">
      {list.map(p => (
        <div key={p.id} className="pillar-card" onClick={() => go('pillar:' + p.id)}>
          <div className="pillar-stripe" style={{ background: p.ink }}></div>
          <div className="pillar-num">{p.n}</div>
          <div className="pillar-name">{p.name}</div>
          <div className="pillar-desc">{p.desc}</div>
          <span className="pillar-more">อ่านบันทึก →</span>
        </div>
      ))}
    </div>
  );
};
