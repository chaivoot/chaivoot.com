/* global React */
window.Hero = function Hero() {
  return (
    <section className="hero fade-in">
      <h1>บันทึกของชายวัย 50 กับหมา 1 ตัว ที่สนใจ Longevity และธุรกิจ Amway</h1>
      <p className="hero-sub">เขียนสิ่งที่คิด สิ่งที่ทำ สิ่งที่อยากจำไว้ — บางวันสั้น บางวันยาว ไม่มีตารางบังคับ</p>
      <div className="hero-ctas">
        <a className="btn btn-line" href="#" onClick={(e)=>e.preventDefault()}>คุยกันทาง LINE</a>
        <a className="btn btn-outline" href="#" onClick={(e)=>{e.preventDefault(); window.__go && window.__go('about')}}>ทำความรู้จัก</a>
      </div>
    </section>
  );
};
