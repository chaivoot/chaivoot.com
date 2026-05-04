/* global React, ReactDOM */
const { useState, useEffect } = React;

function App() {
  const [route, setRoute] = useState('home');
  const go = (r) => { setRoute(r); window.scrollTo({ top: 0, behavior: 'instant' }); };
  useEffect(() => { window.__go = go; }, []);

  let body;
  if (route === 'home') {
    body = (
      <>
        <window.Hero />
        <window.PillarCards go={go} />
        <div className="feed-wrap" style={{paddingTop:'8px'}}>
          <h2 style={{fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--fg-faint)', marginBottom:'var(--s-3)'}}>บันทึกล่าสุด</h2>
        </div>
        <window.Feed go={go} />
        <window.LineCTA />
      </>
    );
  } else if (route === 'about') {
    body = (<><window.AboutPage /><window.LineCTA /></>);
  } else if (route.startsWith('post:')) {
    body = <window.PostDetail id={route.split(':')[1]} go={go} />;
  } else if (route.startsWith('pillar:')) {
    body = <window.PillarPage id={route.split(':')[1]} go={go} />;
  }

  return (
    <>
      <window.Nav route={route} go={go} />
      <main className="page">{body}</main>
      <footer className="foot">
        <div className="foot-wm">
          <img src="../../assets/logo-mark-light.svg" alt="" width="20" height="20"/>
          <span>chaivoot</span>
        </div>
        <div>© 2026 · บันทึกของชัยวุฒิ</div>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
