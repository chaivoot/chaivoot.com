/* global React */
const { useState } = React;

window.Nav = function Nav({ route, go }) {
  const item = (id, label) => (
    <span className={'nav-link' + (route === id || (id === 'feed' && route === 'home') ? ' active' : '')}
      onClick={() => go(id)}>{label}</span>
  );
  return (
    <nav className="nav">
      <a className="nav-wm" onClick={() => go('home')}>
        <img src="../../assets/logo-mark-light.svg" alt="" width="28" height="28"/>
        <span>chaivoot</span>
      </a>
      <div className="nav-links">
        {item('home', 'บันทึก')}
        {item('about', 'เกี่ยวกับผม')}
        <a className="btn btn-line" href="#" onClick={(e)=>e.preventDefault()}>LINE</a>
      </div>
    </nav>
  );
};
