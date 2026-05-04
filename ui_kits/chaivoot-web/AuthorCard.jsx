/* global React */
window.AuthorCard = function AuthorCard() {
  return (
    <div className="author">
      <img className="author-ava" src="../../assets/photos/chaivoot-avatar.png" alt="ชัยวุฒิ" />
      <div>
        <div className="author-name">ชัยวุฒิ</div>
        <div className="author-bio">บันทึกของผู้ชายวัย 50 — ธุรกิจ Longevity และมอมแมม</div>
      </div>
      <a className="btn btn-line" href="#" onClick={(e)=>e.preventDefault()}>LINE</a>
    </div>
  );
};

window.LineCTA = function LineCTA() {
  return (
    <div className="line-cta">
      <p className="line-cta-msg">มีอะไรอยากคุย? ทักมาทาง LINE ได้เลยครับ ผมตอบเอง</p>
      <a className="btn btn-line" href="#" onClick={(e)=>e.preventDefault()}>คุยกันทาง LINE</a>
      <p className="line-cta-sub">ไม่มี auto-reply ผมอ่านทุกข้อความ</p>
    </div>
  );
};
