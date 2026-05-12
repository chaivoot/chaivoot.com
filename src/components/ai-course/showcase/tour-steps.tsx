import type { ReactNode } from 'react';
import { FitnessList, FitnessProfile, FitnessMeasurements, FitnessGoal, FitnessProgress } from './mocks/fitness';

export interface TourStep {
  title: string;
  desc: string;
  mockup: ReactNode;
}

const fitnessSteps: TourStep[] = [
  {
    title: 'หน้า list ลูกค้าทั้งหมด',
    desc: 'เห็นภาพรวมลูกค้าทุกคนในที่เดียว — ใครกำลังลด ใครหยุดมานาน แตะเพื่อดูรายละเอียด',
    mockup: <FitnessList />,
  },
  {
    title: 'Profile + คำนวณอัตโนมัติ',
    desc: 'กรอกแค่อายุ ส่วนสูง น้ำหนัก — ระบบคำนวณ BMI, BMR และแคลอรี่ที่ควรได้รับต่อวันให้เลย ไม่ต้องเปิดเครื่องคิดเลข',
    mockup: <FitnessProfile />,
  },
  {
    title: 'บันทึกการวัดรอบเอวและสัดส่วน',
    desc: 'เก็บรอบเอว ต้นแขน ต้นขา มวลกล้ามเนื้อ และ %ไขมัน ทุกครั้งที่นัด — ทุกตัวเลขย้อนดูได้',
    mockup: <FitnessMeasurements />,
  },
  {
    title: 'ตั้งเป้าหมายของลูกค้า',
    desc: 'เป้าน้ำหนัก เป้าระยะเวลา ระบบช่วยคำนวณว่าต้องลดสัปดาห์ละกี่กก. ถึงจะถึงเป้าแบบไม่หักโหม',
    mockup: <FitnessGoal />,
  },
  {
    title: 'กราฟความคืบหน้า เห็นผลชัด',
    desc: 'น้ำหนัก รอบเอว %ไขมัน — ทุกตัวมีกราฟ timeline ให้ลูกค้าเห็นว่าความพยายามให้ผลจริง',
    mockup: <FitnessProgress />,
  },
];

const STEP_MAP: Record<string, TourStep[]> = {
  fitness: fitnessSteps,
};

export function getTourSteps(slug: string): TourStep[] {
  return STEP_MAP[slug] ?? [];
}
