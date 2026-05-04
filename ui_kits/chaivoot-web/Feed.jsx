/* global React */
const { useState: useStateF } = React;

window.Feed = function Feed({ go, fixedPillar }) {
  const [filter, setFilter] = useStateF(fixedPillar || 'all');
  const posts = window.POSTS.filter(p => filter === 'all' ? true : p.pillar === filter);
  const pill = (id, label, ink) => (
    <span key={id} className={'pill' + (filter===id?' on':'')} onClick={() => setFilter(id)}>
      {ink && <span className="dot" style={{background:ink}}></span>}
      {label}
    </span>
  );
  return (
    <div className="feed-wrap fade-in">
      {!fixedPillar && (
        <div className="filters">
          {pill('all','ทั้งหมด',null)}
          {pill('amway','Amway','#534AB7')}
          {pill('longevity','Longevity','#1D9E75')}
          {pill('dog','หมา','#D85A30')}
        </div>
      )}
      <div className="feed">
        {posts.map(p => <window.PostRow key={p.id} post={p} go={go} />)}
      </div>
    </div>
  );
};
