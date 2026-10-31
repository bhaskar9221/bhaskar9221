#!/usr/bin/env node
// Generates the game-style SVG panels for the profile README.
// Usage: node assets/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const fontB64 = readFileSync(join(here, "pressstart2p.subset.woff2")).toString("base64");

const THEMES = {
  dark: {
    bg: "#0b0f1a",
    bg2: "#0f1626",
    border: "#3b4a6b",
    borderSoft: "#243049",
    headline: "#e2e8f0",
    body: "#cbd5e1",
    muted: "#8595b5",
    dim: "#5b6b8c",
    accent: "#5eead4",
    accent2: "#a78bfa",
    good: "#4ade80",
    warn: "#fbbf24",
    bad: "#fb7185",
    gold: "#fbbf24",
    silver: "#cbd5e1",
    panelHead: "#0e1a33",
    row: "#111a2e",
    rowAlt: "#0d1526",
    scanline: "#ffffff",
    pattern: "#ffffff",
    shadow: "#000000",
  },
  light: {
    bg: "#f7f5ee",
    bg2: "#efebdf",
    border: "#9a8f75",
    borderSoft: "#d8d0bb",
    headline: "#1c2434",
    body: "#2f3a4d",
    muted: "#5f6b80",
    dim: "#8a93a6",
    accent: "#0f766e",
    accent2: "#6d28d9",
    good: "#15803d",
    warn: "#b45309",
    bad: "#b91c1c",
    gold: "#b45309",
    silver: "#64748b",
    panelHead: "#ebe4d1",
    row: "#fdfbf5",
    rowAlt: "#f2ede0",
    scanline: "#1c2434",
    pattern: "#1c2434",
    shadow: "#c9c1ac",
  },
};

const PX = "PressStart, monospace";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function svg({ w, h, title, body, theme }) {
  const t = THEMES[theme];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<defs>
<style type="text/css"><![CDATA[
@font-face { font-family: 'PressStart'; src: url(data:font/woff2;base64,${fontB64}) format('woff2'); }
text { font-family: 'PressStart', monospace; }
.blink { animation: blink 1.1s steps(1) infinite; }
@keyframes blink { 0%,49% { opacity: 1 } 50%,100% { opacity: 0 } }
.glow { animation: glow 2.8s ease-in-out infinite; }
@keyframes glow { 0%,100% { opacity: .18 } 50% { opacity: .5 } }
]]></style>
<pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
<rect x="0" y="0" width="2" height="2" fill="${t.pattern}" opacity="0.07"/>
<rect x="12" y="12" width="2" height="2" fill="${t.pattern}" opacity="0.04"/>
</pattern>
<pattern id="scan" width="6" height="6" patternUnits="userSpaceOnUse">
<rect x="0" y="0" width="6" height="1" fill="${t.scanline}" opacity="0.045"/>
</pattern>
<linearGradient id="fade" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="${t.accent}" stop-opacity="0.16"/>
<stop offset="60%" stop-color="${t.accent2}" stop-opacity="0.04"/>
<stop offset="100%" stop-color="${t.accent2}" stop-opacity="0"/>
</linearGradient>
</defs>
<rect width="${w}" height="${h}" rx="14" fill="${t.bg}"/>
<rect width="${w}" height="${h}" rx="14" fill="url(#dots)"/>
<rect width="${w}" height="${h}" rx="14" fill="url(#fade)"/>
<rect width="${w}" height="${h}" rx="14" fill="url(#scan)"/>
<rect x="3.5" y="3.5" width="${w - 7}" height="${h - 7}" rx="11" fill="none" stroke="${t.border}" stroke-width="3"/>
<rect x="9.5" y="9.5" width="${w - 19}" height="${h - 19}" rx="7" fill="none" stroke="${t.borderSoft}" stroke-width="1"/>
${body}
</svg>
`;
}

// Small pixel-art portrait drawn from a character grid.
const SPRITE = {
  palette: {
    h: "#2f2417", H: "#4a3a26", s: "#e0b48c", S: "#c99468",
    g: "#10151f", e: "#5eead4", m: "#8f5f45", c: "#2b3648", C: "#3c4b63",
  },
  rows: [
    "..hh....hh....hh",
    ".hHHh..hHHh..hHH",
    ".hHHhhhhHHhhhhHH",
    ".hhhhhhhhhhhhhhh",
    ".hsssssssssssssh",
    ".hsssssssssssssh",
    ".hsssggggggggssh",
    ".hsssgessessgssh",
    ".hsssssssssssssh",
    ".hsssssSsssssssh",
    ".hssssmmsssssssh",
    "..hsssssssssssh.",
    "...ssssssssss...",
    "..cccccccccccc..",
    ".ccccccccccCCCC.",
    ".ccccccccccCCCC.",
    "ccccccccccccCCCC",
    "ccccccccccccCCCC",
  ],
};

function sprite(x, y, cell, theme) {
  const t = THEMES[theme];
  let out = `<rect x="${x - 8}" y="${y - 8}" width="${16 * cell + 16}" height="${SPRITE.rows.length * cell + 16}" fill="${t.bg2}" stroke="${t.border}" stroke-width="3"/>`;
  SPRITE.rows.forEach((row, ry) => {
    [...row].forEach((ch, rx) => {
      const fill = SPRITE.palette[ch];
      if (!fill) return;
      out += `<rect x="${x + rx * cell}" y="${y + ry * cell}" width="${cell}" height="${cell}" fill="${fill}"/>`;
    });
  });
  return out;
}

function panel({ w, h, title, tag, body, theme, titleColor }) {
  const t = THEMES[theme];
  const head = `
<rect x="12" y="12" width="${w - 24}" height="44" rx="6" fill="${t.panelHead}" stroke="${t.borderSoft}" stroke-width="1"/>
<text x="32" y="41" font-size="14" fill="${titleColor || t.accent}">${esc(title)}</text>
${tag ? `<text x="${w - 32}" y="41" font-size="11" fill="${t.dim}" text-anchor="end">${esc(tag)}</text>` : ""}`;
  return svg({ w, h, title, theme, body: head + body });
}

function rowBase({ w, y, theme, alt }) {
  const t = THEMES[theme];
  return `<rect x="28" y="${y}" width="${w - 56}" height="38" rx="4" fill="${alt ? t.rowAlt : t.row}" stroke="${t.borderSoft}" stroke-width="1"/>`;
}

function tagPill({ x, y, w, label, color, theme }) {
  const t = THEMES[theme];
  return `<rect x="${x}" y="${y}" width="${w}" height="22" rx="3" fill="${color}" opacity="0.14" stroke="${color}" stroke-width="1"/>
<text x="${x + 8}" y="${y + 15}" font-size="10" fill="${color}">${esc(label)}</text>`;
}

function diamond(x, y, size, filled, color, theme) {
  const t = THEMES[theme];
  return `<path d="M ${x} ${y - size} L ${x + size} ${y} L ${x} ${y + size} L ${x - size} ${y} Z" fill="${filled ? color : "none"}" stroke="${color}" stroke-width="2" opacity="${filled ? 1 : 0.45}"/>`;
}

function xpBar(x, y, cell, total, filled, theme, on) {
  const t = THEMES[theme];
  let out = "";
  for (let i = 0; i < total; i++) {
    out += `<rect x="${x + i * (cell + 3)}" y="${y}" width="${cell}" height="14" fill="${i < filled ? on : t.borderSoft}" opacity="${i < filled ? 1 : 0.55}"/>`;
  }
  return out;
}

function build(theme) {
  const t = THEMES[theme];
  const files = {};

  // ---------------------------------------------------------------- banner
  {
    const w = 1200;
    const h = 400;
    const body = `
${sprite(1000, 52, 8, theme)}
<text x="56" y="126" font-size="54" fill="${t.headline}">BHASKAR</text>
<text x="56" y="190" font-size="54" fill="${t.accent}">MONDAL</text>
<text x="58" y="232" font-size="12" fill="${t.muted}">MACHINE &amp; DEEP LEARNING ENGINEER</text>
<rect x="56" y="252" width="4" height="52" fill="${t.accent}"/>
<text x="76" y="272" font-size="15" fill="${t.body}">I DON'T CALL THE LIBRARY</text>
<text x="76" y="296" font-size="15" fill="${t.body}">UNTIL I'VE BUILT THE</text>
<text x="76" y="320" font-size="15" fill="${t.accent}">ALGORITHM.</text>
<rect x="76" y="328" width="11" height="16" fill="${t.accent}" class="blink"/>
<text x="56" y="378" font-size="9" fill="${t.dim}">FROM-SCRATCH ML · KAGGLE TOP 2%</text>
<text x="1144" y="378" font-size="9" fill="${t.dim}" text-anchor="end">PLAYER READY ▶</text>`;
    files["banner"] = svg({ w, h, title: "Bhaskar Mondal, Machine & Deep Learning Engineer", theme, body });
  }

  // ------------------------------------------------------- player stats
  {
    const w = 760;
    const h = 400;
    const ys = [72, 118, 164, 210, 256];
    const labelX = 48;
    const valX = 230;
    const hearts = (x, y, filled, total, color) => {
      let out = "";
      for (let i = 0; i < total; i++) out += diamond(x + i * 26, y, 8, i < filled, color, theme);
      return out;
    };
    const rows = [
      { label: "CLASS", value: `MACHINE &amp; DEEP LEARNING`, color: t.headline },
      { label: "FOCUS", value: "FIRST PRINCIPLES", color: t.headline },
      { label: "KAGGLE", value: "TOP 2% ×2", color: t.good },
      { label: "SHIPS", value: "", color: t.good, hearts: hearts(valX, 234, 3, 5, t.good) },
      { label: "RESEARCH", value: "", color: t.accent2, hearts: hearts(valX, 280, 5, 5, t.accent2) },
    ];
    const body = ys
      .map((y, i) => {
        const r = rows[i];
        return `${rowBase({ w, y, theme, alt: i % 2 === 0 })}
<text x="${labelX}" y="${y + 25}" font-size="11" fill="${t.muted}">${r.label}</text>
${r.hearts || ""}
${r.value ? `<text x="${valX}" y="${y + 25}" font-size="13" fill="${r.color}">${r.value}</text>` : ""}
${r.sub ? `<text x="${valX}" y="${y + 46}" font-size="9" fill="${t.dim}">${r.sub}</text>` : ""}`;
      })
      .join("\n");
    const quest = `
<rect x="28" y="312" width="${w - 56}" height="60" rx="4" fill="${t.row}" stroke="${t.warn}" stroke-width="1"/>
<text x="48" y="336" font-size="10" fill="${t.warn}">▶ ACTIVE QUEST</text>
<text x="48" y="358" font-size="12" fill="${t.body}">ANIMEGAN FROM SCRATCH</text>`;
    files["stats"] = panel({ w, h, theme, title: "PLAYER STATS", tag: "LV.2", body: body + quest });
  }

  // --------------------------------------------------------- achievements
  {
    const w = 760;
    const h = 400;
    const items = [
      ["ACADEMIC SUCCESS CLASSIFICATION", "TABULAR · 47 / 2,684", "TOP 2%", t.gold, "4"],
      ["IRRIGATION NEED PREDICTION", "TABULAR · 86 / 4,315", "TOP 2%", t.gold, "4"],
      ["CALORIE EXPENDITURE PREDICTION", "REGRESSION · 150 / 4,316", "TOP 4%", t.silver, "3"],
    ];
    const body = items
      .map(([name, meta, rare, color, n], i) => {
        const y = 72 + i * 96;
        return `<rect x="28" y="${y}" width="${w - 56}" height="84" rx="4" fill="${i % 2 === 0 ? t.row : t.rowAlt}" stroke="${t.borderSoft}" stroke-width="1"/>
<circle cx="74" cy="${y + 42}" r="22" fill="${color}" opacity="0.16"/>
<circle cx="74" cy="${y + 42}" r="22" fill="none" stroke="${color}" stroke-width="2"/>
<text x="74" y="${y + 50}" font-size="16" fill="${color}" text-anchor="middle">${n}</text>
<text x="112" y="${y + 24}" font-size="11" fill="${t.headline}">${name}</text>
<text x="112" y="${y + 44}" font-size="9" fill="${t.muted}">${meta}</text>
${tagPill({ x: 112, y: y + 54, w: 70, label: rare, color, theme })}
<text x="${w - 44}" y="${y + 50}" font-size="10" fill="${color}" text-anchor="end">UNLOCKED</text>`;
      })
      .join("\n");
    files["achievements"] = panel({ w, h, theme, title: "ACHIEVEMENTS", tag: "3 / 3 UNLOCKED", body });
  }

  // ------------------------------------------------------------ quest log
  {
    const w = 760;
    const h = 380;
    const quests = [
      ["BAREMETALML: LINEAR + LOGISTIC", "DONE", t.good, "x"],
      ["SPEECH EMOTION MODEL (~88%)", "DONE", t.good, "x"],
      ["RAG WITH HALLUCINATION CHECKS", "DONE", t.good, "x"],
      ["BAREMETALML: RANDOM FOREST", "ACTIVE", t.warn, ">"],
      ["ANIMEGAN FROM SCRATCH", "ACTIVE", t.warn, ">"],
    ];
    const body = quests
      .map(([name, status, color, mark], i) => {
        const y = 72 + i * 52;
        const active = status === "ACTIVE";
        return `<rect x="28" y="${y}" width="${w - 56}" height="42" rx="4" fill="${i % 2 === 0 ? t.row : t.rowAlt}" stroke="${active ? t.warn : t.borderSoft}" stroke-width="1"/>
<rect x="44" y="${y + 13}" width="16" height="16" rx="2" fill="${active ? "none" : color}" stroke="${color}" stroke-width="2"/>
${active ? `<text x="47" y="${y + 26}" font-size="10" fill="${color}">▶</text>` : `<text x="46" y="${y + 27}" font-size="12" fill="${t.bg}">✓</text>`}
<text x="76" y="${y + 26}" font-size="11" fill="${active ? t.headline : t.muted}">${name}</text>
<text x="${w - 44}" y="${y + 26}" font-size="9" fill="${color}" text-anchor="end">${status}</text>`;
      })
      .join("\n");
    files["quests"] = panel({ w, h, theme, title: "QUEST LOG", tag: "3 DONE · 2 ACTIVE", body });
  }

  // --------------------------------------------------------------- boss
  {
    const w = 760;
    const h = 230;
    const body = `
<rect x="28" y="72" width="${w - 56}" height="130" rx="4" fill="${t.row}" stroke="${t.bad}" stroke-width="1"/>
<text x="48" y="102" font-size="9" fill="${t.bad}">⚠ FEATURED COMPETITION</text>
<text x="48" y="134" font-size="14" fill="${t.headline}">LLM 20 QUESTIONS</text>
<text x="48" y="158" font-size="9" fill="${t.muted}">832 TEAMS · LLM AGENT</text>
<text x="48" y="184" font-size="9" fill="${t.body}">INFORMED BY PUBLISHED RESEARCH ON</text>
<text x="48" y="198" font-size="9" fill="${t.body}">QUESTION-ASKING AND INFORMATION ELIMINATION</text>
<text x="${w - 48}" y="134" font-size="10" fill="${t.bad}" text-anchor="end">BOSS FIGHT</text>`;
    files["boss"] = panel({ w, h, theme, title: "BOSS BATTLES", tag: "1 ENGAGED", body });
  }

  // ------------------------------------------------------------ loadout
  {
    const w = 760;
    const h = 470;
    const groups = [
      ["LANGUAGES", ["PYTHON", "SQL", "C/C++ (BASIC)"], t.accent],
      ["DEEP LEARNING", ["PYTORCH", "TENSORFLOW", "KERAS"], t.accent2],
      ["CLASSICAL ML", ["SCIKIT-LEARN", "XGBOOST", "LIGHTGBM", "CATBOOST"], t.good],
      ["GENAI", ["LANGCHAIN", "HUGGING FACE", "OPENAI", "OPENROUTER", "FAISS", "RAG"], t.warn],
      ["MLOPS", ["FASTAPI", "DOCKER", "MLFLOW", "GCP", "AWS", "GIT"], t.headline],
      ["INTERFACES", ["STREAMLIT", "GRADIO"], t.muted],
    ];
    let body = "";
    groups.forEach(([label, tags, color], gi) => {
      const y = 74 + gi * 64;
      body += `<text x="48" y="${y + 12}" font-size="10" fill="${t.muted}">${label}</text>`;
      let x = 48;
      tags.forEach((tag) => {
        const tw = tag.length * 6.6 + 20;
        body += `<rect x="${x}" y="${y + 22}" width="${tw}" height="24" rx="3" fill="${color}" opacity="0.12" stroke="${color}" stroke-width="1"/>
<text x="${x + 10}" y="${y + 38}" font-size="8.5" fill="${color}">${tag}</text>`;
        x += tw + 8;
      });
    });
    files["loadout"] = panel({ w, h, theme, title: "INVENTORY", tag: "EQUIPPED", body });
  }

  // ------------------------------------------------------------ divider
  {
    const w = 1200;
    const h = 36;
    const cx = w / 2;
    const body = `
<rect x="0" y="17" width="${cx - 70}" height="2" fill="${t.border}" opacity="0.7"/>
<rect x="${cx + 70}" y="17" width="${cx - 70}" height="2" fill="${t.border}" opacity="0.7"/>
<path d="M ${cx - 22} 18 L ${cx - 12} 8 L ${cx - 2} 18 L ${cx - 12} 28 Z" fill="${t.accent}"/>
<path d="M ${cx + 2} 18 L ${cx + 12} 8 L ${cx + 22} 18 L ${cx + 12} 28 Z" fill="${t.accent2}"/>`;
    files["divider"] = svg({ w, h, title: "Section divider", theme, body });
  }

  return files;
}

mkdirSync(here, { recursive: true });
for (const theme of Object.keys(THEMES)) {
  const files = build(theme);
  for (const [name, content] of Object.entries(files)) {
    const suffix = theme === "dark" ? "" : "_light";
    writeFileSync(join(here, `${name}${suffix}.svg`), content);
    console.log(`wrote ${name}${suffix}.svg (${(content.length / 1024).toFixed(1)} KB)`);
  }
}
