// Pillar metadata — single source of truth.
// Add/edit a pillar here and every page picks it up.

export type PillarId = 'ai' | 'amway' | 'longevity' | 'dogs';

export const PILLARS: Record<PillarId, {
  id: PillarId;
  num: string;
  name: string;
  ink: string;
  wash: string;
  deep: string;
  desc: string;
  long: string;
}> = {
  ai: {
    id: 'ai',
    num: '01',
    name: 'AI & Tech',
    ink:  '#4A6FA5',
    wash: '#E8EEF5',
    deep: '#2C4A78',
    desc: 'AI, tools และวิธีใช้เทคโนโลยีให้ทำงานแทนเรา',
    long: 'ผมสนใจเรื่อง AI ไม่ใช่ในฐานะนักพัฒนา แต่ในฐานะผู้ใช้ที่อยากให้เทคโนโลยีช่วยขยายเวลาและความสามารถ — บันทึกที่นี่คือเครื่องมือที่ผมใช้จริง วิธีที่ใช้ และสิ่งที่เรียนรู้ระหว่างทาง',
  },
  amway: {
    id: 'amway',
    num: '02',
    name: 'Amway',
    ink:  '#5E5C82',
    wash: '#ECEAF1',
    deep: '#3D3B5C',
    desc: 'โอกาส มุมมอง และคนที่ผมเจอระหว่างทาง',
    long: 'ที่นี่ผมเก็บบันทึกเรื่องธุรกิจ Amway — ไม่ใช่การชวนสมัคร แต่เป็นมุมมองของคนที่ทำมาหลายปี เจอคนหลายแบบ และยังเรียนรู้อยู่ทุกวัน',
  },
  longevity: {
    id: 'longevity',
    num: '03',
    name: 'Longevity',
    ink:  '#647C66',
    wash: '#ECEFE9',
    deep: '#3F5142',
    desc: 'Longevity — nutrition, lifestyle, mindset เพื่อชีวิตที่มีคุณภาพ',
    long: 'Longevity สำหรับผมไม่ใช่เรื่องของวิตามินยี่ห้อไหน แต่เป็นเรื่องของวินัยเล็กๆ ที่ทำซ้ำทุกวัน บันทึกที่นี่คือสิ่งที่ผมลองและสิ่งที่ผมเรียนรู้',
  },
  dogs: {
    id: 'dogs',
    num: '04',
    name: 'หมา',
    ink:  '#9F6147',
    wash: '#F2E7DF',
    deep: '#6E3F2A',
    desc: 'Choice-based training และโภชนาการหมา',
    long: 'มอมแมมเปลี่ยนวิธีที่ผมมองความสัมพันธ์กับสัตว์ — ฝึกแบบ choice-based ไม่ใช่การลงโทษ และอาหารคือเรื่องที่ผมจริงจังจนเริ่ม dogevityfood.com',
  },
};

export const PILLAR_ORDER: PillarId[] = ['ai', 'amway', 'longevity', 'dogs'];
