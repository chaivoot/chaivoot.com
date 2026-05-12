export interface ShowcaseCase {
  slug: string;
  emoji: string;
  audience: string;
  title: string;
  desc: string;
  tourReady: boolean;
}

export const SHOWCASE_CASES: ShowcaseCase[] = [
  {
    slug: 'fitness',
    emoji: '🏃‍♀️',
    audience: 'สำหรับ PT / โค้ช / nutritionist',
    title: 'ระบบลูกค้าฟิตเนส / โค้ชลดน้ำหนัก',
    desc: 'บันทึกข้อมูลลูกค้า คำนวณ BMI/BMR อัตโนมัติ ติดตามความคืบหน้าด้วยกราฟ',
    tourReady: true,
  },
  {
    slug: 'pet',
    emoji: '🐶',
    audience: 'สำหรับคนรักสัตว์เลี้ยง / คลินิกสัตว์',
    title: 'ระบบบันทึกสุขภาพสัตว์เลี้ยง',
    desc: 'บันทึกน้ำหนัก ฉีดวัคซีน ประวัติสุขภาพ — เตือนวัคซีนรอบถัดไปอัตโนมัติ',
    tourReady: false,
  },
  {
    slug: 'astro',
    emoji: '🔮',
    audience: 'สำหรับหมอดู / ร้านดูดวง',
    title: 'บันทึกลูกค้าดูดวง',
    desc: 'เก็บข้อมูลลูกค้า สร้างผลลัพธ์เฉพาะตัวอัตโนมัติ — สีถูกโฉลก เครื่องประดับแนะนำ',
    tourReady: false,
  },
  {
    slug: 'elder',
    emoji: '👴',
    audience: 'สำหรับลูกที่ดูแลพ่อแม่',
    title: 'ข้อมูลสุขภาพผู้สูงอายุในบ้าน',
    desc: 'ติดตามการกินยา ความดัน น้ำตาล — สรุปวันนี้ส่งให้ลูกใน Line',
    tourReady: false,
  },
];
