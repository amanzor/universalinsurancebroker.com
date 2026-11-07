// Static export renders every page with the root layout's <html lang="en">.
// After `next build`, mark the Spanish pages (out/es/**) as lang="es" so
// search engines and screen readers see the right language.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "out");
let count = 0;

function fix(file) {
  const html = readFileSync(file, "utf8");
  const next = html.replace(/<html lang="en"/, '<html lang="es"');
  if (next !== html) {
    writeFileSync(file, next);
    count++;
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) fix(p);
  }
}

try {
  fix(join(root, "es.html"));
} catch {
  /* es.html may live at out/es/index.html instead */
}
try {
  walk(join(root, "es"));
} catch {
  /* no Spanish pages */
}
console.log(`set-es-lang: marked ${count} Spanish page(s) as lang="es"`);
