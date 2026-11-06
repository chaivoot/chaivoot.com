// Patches the Vercel Build Output API function config to force the
// supported Node runtime. @astrojs/vercel@7.8.2 hardcodes nodejs18.x,
// which Vercel now rejects — this runs after `astro build` and rewrites
// the generated .vc-config.json.
import fs from 'node:fs';

const TARGET_RUNTIME = 'nodejs24.x';
const CONFIG_PATH = '.vercel/output/functions/_render.func/.vc-config.json';

if (!fs.existsSync(CONFIG_PATH)) {
  console.log(`[patch-vercel-runtime] ${CONFIG_PATH} not found; skipping`);
  process.exit(0);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const previous = config.runtime;
config.runtime = TARGET_RUNTIME;
fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));

console.log(`[patch-vercel-runtime] ${CONFIG_PATH}: ${previous} → ${TARGET_RUNTIME}`);
