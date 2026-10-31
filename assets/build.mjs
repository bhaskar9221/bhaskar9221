#!/usr/bin/env node
// Generates the Tron-styled SVG assets for the profile README.
// Usage: node assets/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const fontB64 = readFileSync(join(here, "pressstart2p.subset.woff2")).toString("base64");

export const PALETTE = {
  void: "#05070d",
  panel: "#080d18",
  panelSoft: "#0a1120",
  line: "#1c2b45",
  lineSoft: "#121d31",
  cyan: "#22d3ee",
  blue: "#3b82f6",
  text: "#dbe7f6",
  body: "#aab8cf",
  muted: "#6b7c99",
  dim: "#45536b",
};

const P = PALETTE;
const PX = "PressStart, monospace";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function svg({ w, h, title, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<defs>
<style type="text/css"><![CDATA[
@font-face { font-family: 'PressStart'; src: url(data:font/woff2;base64,${fontB64}) format('woff2'); }
text { font-family: 'PressStart', monospace; }
.flicker { animation: flicker 4s steps(1) infinite; }
@keyframes flicker { 0%,92%,100% { opacity: 1 } 93% { opacity: .35 } 94%,97% { opacity: 1 } 98% { opacity: .55 } }
]]></style>
<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
<path d="M 40 0 L 0 0 0 40" fill="none" stroke="${P.line}" stroke-width="0.6" opacity="0.45"/>
</pattern>
<pattern id="gridfine" width="10" height="10" patternUnits="userSpaceOnUse">
<path d="M 10 0 L 0 0 0 10" fill="none" stroke="${P.lineSoft}" stroke-width="0.4" opacity="0.35"/>
</pattern>
<linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stop-color="${P.cyan}" stop-opacity="0.14"/>
<stop offset="55%" stop-color="${P.blue}" stop-opacity="0.05"/>
<stop offset="100%" stop-color="${P.void}" stop-opacity="0"/>
</linearGradient>
<linearGradient id="horizon" x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stop-color="${P.cyan}" stop-opacity="0"/>
<stop offset="100%" stop-color="${P.cyan}" stop-opacity="0.22"/>
</linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="${P.void}"/>
<rect width="${w}" height="${h}" fill="url(#gridfine)"/>
<rect width="${w}" height="${h}" fill="url(#grid)"/>
<rect width="${w}" height="${h}" fill="url(#glow)"/>
<rect x="1.5" y="1.5" width="${w - 3}" height="${h - 3}" rx="8" fill="none" stroke="${P.line}" stroke-width="2"/>
${body}
</svg>
`;
}

function corners(x, y, w, h, len, color) {
  return `<path d="M ${x} ${y + len} L ${x} ${y} L ${x + len} ${y}" fill="none" stroke="${color}" stroke-width="2"/>
<path d="M ${x + w - len} ${y} L ${x + w} ${y} L ${x + w} ${y + len}" fill="none" stroke="${color}" stroke-width="2"/>
<path d="M ${x} ${y + h - len} L ${x} ${y + h} L ${x + len} ${y + h}" fill="none" stroke="${color}" stroke-width="2"/>
<path d="M ${x + w - len} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y + h - len}" fill="none" stroke="${color}" stroke-width="2"/>`;
}

function segmented(x, y, cell, gap, total, filled, on, off) {
  let out = "";
  for (let i = 0; i < total; i++) {
    out += `<rect x="${x + i * (cell + gap)}" y="${y}" width="${cell}" height="12" fill="${i < filled ? on : off}" opacity="${i < filled ? 1 : 0.6}"/>`;
  }
  return out;
}

const files = {};

// --------------------------------------------------------- avatar frame
// Placeholder slot. Swap the rectangle content later, or point the README at a PNG.
{
  const w = 232;
  const h = 264;
  const boxY = 24;
  const boxH = 168;
  const body = `
<rect x="36" y="${boxY}" width="${w - 72}" height="${boxH}" rx="2" fill="${P.panelSoft}" fill-opacity="0.55" stroke="${P.line}" stroke-width="1.5" stroke-dasharray="6 6"/>
<text x="${w / 2}" y="${boxY + boxH / 2 + 4}" font-size="6" fill="${P.dim}" text-anchor="middle" letter-spacing="2">LOGO</text>
<text x="${w / 2}" y="${h - 38}" font-size="6" fill="${P.dim}" text-anchor="middle" letter-spacing="1">SLOT</text>`;
  files["avatar"] = svg({ w, h, title: "Reserved logo slot", body });
}

// --------------------------------------------------------- character sheet
{
  const w = 760;
  const h = 122;
  const cols = [
    { label: "DEEP LEARNING", lv: 9, color: P.cyan },
    { label: "FIRST PRINCIPLES", lv: 10, color: P.cyan },
    { label: "EST. CAPABILITY", lv: 8, color: P.blue },
  ];
  const colW = (w - 56) / 3;
  const body = cols
    .map((c, i) => {
      const x = 28 + colW * i;
      return `<text x="${x + 14}" y="46" font-size="8" fill="${P.muted}">${c.label}</text>
${segmented(x + 14, 60, 9, 3, 10, c.lv, c.color, P.line)}
<text x="${x + 14}" y="96" font-size="7" fill="${P.dim}">${c.lv} / 10</text>
${i < 2 ? `<rect x="${x + colW - 8}" y="30" width="1" height="62" fill="${P.line}"/>` : ""}`;
    })
    .join("\n");
  const head = `
<text x="28" y="24" font-size="9" fill="${P.cyan}">CHARACTER SHEET</text>
<text x="${w - 28}" y="24" font-size="7" fill="${P.dim}" text-anchor="end">ENGINEER &#183; RESEARCH-MINDED</text>`;
  files["sheet"] = svg({ w, h, title: "Character sheet: deep learning 9/10, first principles 10/10, estimated capability 8/10", body: head + body });
}

// --------------------------------------------------------------- divider
{
  const w = 1200;
  const h = 28;
  const cx = w / 2;
  const body = `
<rect x="24" y="13" width="${cx - 70}" height="1" fill="${P.line}"/>
<rect x="${cx + 70}" y="13" width="${cx - 70}" height="1" fill="${P.line}"/>
<text x="${cx}" y="17" font-size="7" fill="${P.cyan}" text-anchor="middle" letter-spacing="3">SYSTEM</text>`;
  files["divider"] = svg({ w, h, title: "Section divider", body });
}

// ---------------------------------------------------------------- footer
{
  const w = 1200;
  const h = 190;
  const cx = w / 2;
  const horizonY = 116;
  // perspective floor
  const floor = Array.from({ length: 13 }, (_, i) => {
    const x1 = 24 + ((w - 48) / 12) * i;
    return `<line x1="${cx}" y1="${horizonY}" x2="${x1}" y2="${h - 10}" stroke="${P.line}" stroke-width="0.8" opacity="0.7"/>`;
  }).join("");
  const rails = Array.from({ length: 5 }, (_, i) => {
    const t = Math.pow((i + 1) / 5, 2.1);
    const y = horizonY + (h - 10 - horizonY) * t;
    return `<line x1="20" y1="${y}" x2="${w - 20}" y2="${y}" stroke="${P.line}" stroke-width="0.8" opacity="${0.25 + t * 0.5}"/>`;
  }).join("");
  const body = `
<rect x="20" y="${horizonY}" width="${w - 40}" height="1" fill="${P.cyan}" opacity="0.55"/>
<rect x="20" y="${horizonY + 1}" width="${w - 40}" height="26" fill="url(#horizon)"/>
${rails}
${floor}
<rect x="0" y="0" width="${w}" height="${horizonY}" fill="${P.void}" opacity="0.55"/>
<text x="${cx}" y="58" font-size="14" fill="${P.cyan}" text-anchor="middle" class="flicker">PRESS START</text>
<text x="${cx}" y="84" font-size="8" fill="${P.muted}" text-anchor="middle">DERIVE IT. TRAIN IT. SHIP IT.</text>`;
  files["footer"] = svg({ w, h, title: "Press start", body });
}

mkdirSync(here, { recursive: true });
for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(here, `${name}.svg`), content);
  console.log(`wrote ${name}.svg (${(content.length / 1024).toFixed(1)} KB)`);
}
