// Site-wide config. lineUrl is a personal LINE add-friend link (not an OA);
// visitors must accept the friend request before chatting.
export const SITE = {
  title: 'บันทึกของชายวัย 50 กับหมา 1 ตัว ที่สนใจ Longevity และ AI',
  description: 'รวมบันทึกและบทความจากประสบการณ์จริงของชัยวุฒิ — AI & เทคโนโลยี, ธุรกิจ Amway, Longevity และการเลี้ยงหมา',
  authorName: 'ชัยวุฒิ',
  authorBio: 'บันทึกของผู้ชายวัย 50 — ธุรกิจ Longevity และมอมแมม',
  copyrightLine: '© 2026 · บันทึกของชัยวุฒิ',
  lineUrl: 'https://line.me/ti/p/zcsfWQiMW4',
  // LINE Official Account add-friend URL used on /ai-course. Kept separate
  // from `lineUrl` (personal LINE) so course visitors land on the OA.
  courseLineUrl: 'https://lin.ee/ozM0HAD',
  email:   'chaivoot@gmail.com',
  igUrl:   'https://www.instagram.com/chaivoot/',
  fbUrl:   'https://www.facebook.com/chaivoot',
  // Google Maps Local Guide contributor profile (permanent Google short
  // link). Added to schema.org `sameAs`.
  googleMapsUrl: 'https://maps.app.goo.gl/BzLoBBvxahDDGCZj7',
  // Approximate, city-level location for schema.org Person (no exact
  // street address) — helps search engines disambiguate the entity.
  addressLocality: 'กรุงเทพมหานคร',
  addressCountry:  'TH',
  // Google Analytics 4 Measurement ID. '' disables GA.
  gaId:    'G-JC562PTP4L',
  // Google Search Console verification token (the value of the
  // <meta name="google-site-verification" content="..."> tag).
  // '' disables the meta tag.
  gscVerify: '',
};
