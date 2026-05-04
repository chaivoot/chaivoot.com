/* global React */
window.AboutPage = function AboutPage() {
  return (
    <div className="about fade-in">
      <img className="about-photo" src="../../assets/photos/chaivoot-mommam.jpg" alt="ชัยวุฒิและมอมแมม" />
      <h1>สวัสดีครับ ผมชัยวุฒิ</h1>
      <p className="lead">ผู้ชายวัย 50 ที่ใช้เวลาส่วนใหญ่กับสามเรื่อง — ธุรกิจ Amway, longevity และมอมแมมหมาของผม</p>
      <p>ผมเริ่มทำ Amway ตอนอายุ 48 — สิ้นเดือนนี้ครบ 2 ปีพอดี ไม่ใช่เพราะหวังรวยเร็ว แต่เพราะเชื่อว่าการมีรายได้หลายช่องทางคือสิ่งที่ทำให้ชีวิตมั่นคงในยุคที่ทุกอย่างเปลี่ยนเร็ว</p>
      <p>เรื่อง longevity สนใจมานาน — ไม่ได้เพราะรู้สึกว่าร่างกายไม่เหมือนเดิม แต่เพราะอยากรักษามันไว้ไปนานๆ ตอนนี้อายุ 50 BMI ยังอยู่ที่ 22 — ไม่ใช่ฟลุก แค่ผลของวินัยเล็กๆ ที่ทำซ้ำทุกวัน</p>
      <p>ส่วนมอมแมม — เธอเข้ามาในชีวิตผมตอนอายุ 48 และเปลี่ยนทุกอย่าง การฝึกเธอแบบ choice-based ทำให้ผมเข้าใจเรื่องความสัมพันธ์ลึกขึ้น ความจริงจังเรื่องอาหารหมาทำให้ผมเริ่ม dogevityfood.com</p>
      <p>ที่นี่คือบ้านของความคิดผม — ทักมาคุยทาง LINE ได้เลยครับ</p>
    </div>
  );
};

window.PillarPage = function PillarPage({ id, go }) {
  const p = window.PILLARS[id];
  return (
    <div className="fade-in">
      <div className="pillar-hero">
        <div className="pillar-hero-num"><span className="pillar-hero-stripe" style={{background:p.ink}}></span>{p.n}</div>
        <h1>{p.name}</h1>
        <p>{p.long}</p>
      </div>
      <window.Feed go={go} fixedPillar={id} />
    </div>
  );
};
