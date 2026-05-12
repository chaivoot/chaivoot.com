import { useState, type CSSProperties } from 'react';
import { Ico } from './icons';

type Mode = 'form' | 'line';
type FormData = { name: string; phone: string; lineId: string; biz: string; want: string };

interface RegisterFormProps {
  initialPlan?: 'group' | 'private';
  lineUrl?: string;
}

export default function RegisterForm({ initialPlan = 'group', lineUrl = '#' }: RegisterFormProps) {
  const [mode, setMode] = useState<Mode>('form');
  const [data, setData] = useState<FormData>({ name: '', phone: '', lineId: '', biz: '', want: '' });
  const [err, setErr] = useState<Record<string, string | undefined>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onChange = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [k]: e.target.value });
    if (err[k]) setErr({ ...err, [k]: undefined });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErr: Record<string, string | undefined> = {};
    if (!data.name.trim()) nextErr.name = 'กรุณากรอกชื่อ';
    if (!data.phone.trim() && !data.lineId.trim()) {
      nextErr.phone = 'กรอกอย่างน้อย 1 ช่อง (เบอร์โทร หรือ Line ID)';
    }
    setErr(nextErr);
    if (Object.keys(nextErr).length > 0) return;

    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch('/ai-course/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          phone: data.phone.trim() || undefined,
          line_id: data.lineId.trim() || undefined,
          business: data.biz.trim() || undefined,
          want: data.want.trim() || undefined,
          plan: initialPlan,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body.ok === false) {
        if (body.errors) {
          const mapped: Record<string, string> = {};
          if (body.errors.name) mapped.name = body.errors.name;
          if (body.errors.contact) mapped.phone = body.errors.contact;
          setErr(mapped);
        } else {
          setServerError('ส่งข้อมูลไม่สำเร็จ ลองใหม่อีกครั้ง หรือทักทาง Line');
        }
        return;
      }
      setSent(true);
    } catch {
      setServerError('เชื่อมต่อไม่ได้ ลองใหม่อีกครั้ง หรือทักทาง Line');
    } finally {
      setSubmitting(false);
    }
  };

  const tabBtn = (active: boolean): CSSProperties => ({
    padding: '8px 14px',
    borderRadius: 999,
    background: active ? 'var(--bg)' : 'transparent',
    color: active ? 'var(--fg)' : 'var(--fg-muted)',
    boxShadow: active ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 13,
  });

  return (
    <>
      <div style={{ borderTop: '1px solid var(--border-faint)', textAlign: 'center', padding: '16px 0 0' }}>
        <div className="wrap">
          <div style={{ display: 'inline-flex', gap: 8, padding: 4, background: 'var(--bg-alt)', borderRadius: 999, fontSize: 13 }}>
            <button type="button" style={tabBtn(mode === 'form')} onClick={() => setMode('form')}>กรอกฟอร์ม</button>
            <button type="button" style={tabBtn(mode === 'line')} onClick={() => setMode('line')}>คุยทาง Line</button>
          </div>
        </div>
      </div>

      <section id="register">
        <div className="wrap">
          {mode === 'line' ? (
            <>
              <div className="section-head" style={{ textAlign: 'center' }}>
                <div className="eyebrow-mono">สมัครเรียน</div>
                <h2>สนใจเรียน ทักมาทาง Line ได้เลย</h2>
                <p>ผมตอบเอง — เล่ามาคร่าวๆ ว่าธุรกิจคุณเป็นแบบไหน อยากทำเว็บแอปแบบไหน เดี๋ยวคุยกัน</p>
              </div>
              <div className="form-mode-line">
                <div className="line-icon-lg">{Ico.line}</div>
                <h3>คุยกับผู้สอนทาง Line</h3>
                <p>กดปุ่มข้างล่างเพื่อเพิ่มเพื่อน Line OA — ทีมงานจะติดต่อกลับภายใน 24 ชม.</p>
                <a className="btn btn-line btn-lg" href={lineUrl} target="_blank" rel="noopener" style={{ marginTop: 8 }}>
                  {Ico.line} เพิ่มเพื่อนใน Line Official
                </a>
                <div style={{ fontSize: 12, color: 'var(--fg-faint)', fontFamily: 'var(--font-mono)', marginTop: 8 }}>
                  หรือสแกน QR ที่หน้าร้าน
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="section-head" style={{ textAlign: 'center' }}>
                <div className="eyebrow-mono">สมัครเรียน</div>
                <h2>สนใจเรียน ลงทะเบียนเลย</h2>
                <p>เล่าให้ผมฟังหน่อยว่าคุณทำธุรกิจอะไร อยากสร้างเว็บแอปแบบไหน — ทีมงานจะติดต่อกลับภายใน 24 ชม.</p>
              </div>
              <div className="form-wrap">
                {sent ? (
                  <div className="form-success">
                    <div className="check-lg">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="5 12 10 17 19 7" />
                      </svg>
                    </div>
                    <h3>รับข้อมูลแล้วครับ</h3>
                    <p>ขอบคุณ {data.name} ที่สนใจ — ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง ระหว่างนี้ลองทักผมทาง Line ได้เลย</p>
                    <a className="btn btn-line" href={lineUrl} target="_blank" rel="noopener" style={{ marginTop: 12 }}>
                      {Ico.line} เพิ่ม Line OA
                    </a>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <div className="form-row">
                      <label htmlFor="rf-name">ชื่อ</label>
                      <input id="rf-name" type="text" value={data.name} onChange={onChange('name')} placeholder="เช่น ลิซ่า" />
                      {err.name && <div className="form-err">{err.name}</div>}
                    </div>
                    <div className="form-row form-row-split">
                      <div className="form-col">
                        <label htmlFor="rf-phone">เบอร์โทร</label>
                        <input id="rf-phone" type="tel" value={data.phone} onChange={onChange('phone')} placeholder="08x-xxx-xxxx" />
                      </div>
                      <div className="form-col">
                        <label htmlFor="rf-line">Line ID</label>
                        <input id="rf-line" type="text" value={data.lineId} onChange={onChange('lineId')} placeholder="@lineid หรือ lineid" />
                      </div>
                      {err.phone && <div className="form-err" style={{ gridColumn: '1 / -1' }}>{err.phone}</div>}
                    </div>
                    <div className="form-hint" style={{ fontSize: 12, color: 'var(--fg-faint)', marginTop: -8 }}>
                      กรอกอย่างน้อย 1 ช่อง ทีมงานจะติดต่อกลับช่องทางที่สะดวก
                    </div>
                    <div className="form-row">
                      <label htmlFor="rf-biz">ธุรกิจ / อาชีพ <span className="opt">(ไม่บังคับ)</span></label>
                      <input id="rf-biz" type="text" value={data.biz} onChange={onChange('biz')} placeholder="เช่น ร้านอาหาร, ร้านยา, คลินิก" />
                    </div>
                    <div className="form-row">
                      <label htmlFor="rf-want">อยากสร้างเว็บแอปแบบไหน? <span className="opt">(ไม่บังคับ)</span></label>
                      <textarea id="rf-want" value={data.want} onChange={onChange('want')} placeholder="เล่าคร่าวๆ ก็พอ ไม่ต้องคิดให้ออกหมด" rows={3}></textarea>
                    </div>
                    {serverError && (
                      <div className="form-err" style={{ marginBottom: 12 }}>{serverError}</div>
                    )}
                    <div className="form-submit">
                      <button className="btn btn-primary btn-lg" type="submit" disabled={submitting}>
                        {submitting ? 'กำลังส่ง...' : <>ส่งข้อมูล รอติดต่อกลับ {Ico.arrow}</>}
                      </button>
                      <span style={{ fontSize: 12, color: 'var(--fg-faint)' }}>หรือ ทักมาทาง Line ก็ได้</span>
                    </div>
                    <div className="form-note">ทีมงานจะติดต่อกลับภายใน 24 ชม.</div>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
