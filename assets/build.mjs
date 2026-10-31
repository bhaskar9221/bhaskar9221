#!/usr/bin/env node
// Generates the research-flow figure for the profile README (light + dark).
// Usage: node assets/build.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const font = (name) => readFileSync(join(here, "fonts", name)).toString("base64");

const FONTS = {
  regular: font("serif-regular.woff2"),
  semibold: font("serif-semibold.woff2"),
};

const THEMES = {
  light: {
    paper: "#fbfaf6",
    ink: "#1c2129",
    muted: "#5c6673",
    faint: "#9aa3ae",
    rule: "#cfc9ba",
    accent: "#0b5d63",
    marker: "#fbfaf6",
  },
  dark: {
    paper: "#0e1116",
    ink: "#f1ede2",
    muted: "#a7aeb8",
    faint: "#5f6772",
    rule: "#2c323b",
    accent: "#5eead4",
    marker: "#0e1116",
  },
};

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function figure(theme) {
  const t = THEMES[theme];
  const w = 1160;
  const h = 250;
  const pad = 60;
  const lineY = 112;

  const stages = [
    { title: "First principles", one: "derive the math", two: "before the API" },
    { title: "From scratch", one: "reimplement it", two: "in NumPy" },
    { title: "Evaluation", one: "benchmark against", two: "baselines" },
    { title: "Generative models", one: "GANs, representation", two: "learning" },
    { title: "Systems", one: "compress, serve,", two: "measure" },
  ];

  const step = (w - pad * 2) / (stages.length - 1);

  const rule = `<line x1="${pad}" y1="${lineY}" x2="${w - pad}" y2="${lineY}" stroke="${t.rule}" stroke-width="1"/>`;

  const marks = stages
    .map((s, i) => {
      const x = pad + step * i;
      const anchor = i === 0 ? "start" : "middle";
      return `
<path d="M ${x} ${lineY - 5} L ${x + 5} ${lineY} L ${x} ${lineY + 5} L ${x - 5} ${lineY} Z" fill="${t.marker}" stroke="${t.accent}" stroke-width="1.4"/>
<text x="${x}" y="${lineY + 40}" font-size="21" font-weight="600" fill="${t.ink}" text-anchor="${anchor}">${esc(s.title)}</text>
<text x="${x}" y="${lineY + 65}" font-size="16" fill="${t.muted}" text-anchor="${anchor}">${esc(s.one)}</text>
<text x="${x}" y="${lineY + 86}" font-size="16" fill="${t.muted}" text-anchor="${anchor}">${esc(s.two)}</text>`;
    })
    .join("");

  // iteration loop above the rule: evaluation feeds back into rebuilding
  const loopY = 66;
  const midY = 34;
  const x1 = pad + step * 2;
  const x2 = pad + step * 1;
  const loop = `
<path d="M ${x1} ${lineY - 9} L ${x1} ${loopY} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${loopY}" fill="none" stroke="${t.faint}" stroke-width="1" stroke-dasharray="4 4"/>
<path d="M ${x2} ${loopY - 7} l 4 8 l -8 0 Z" fill="${t.faint}"/>
<text x="${(x1 + x2) / 2}" y="${midY + 2}" font-size="14" fill="${t.faint}" text-anchor="middle">iterate</text>`;

  const caption = `
<text x="${pad}" y="${h - 20}" font-size="14" fill="${t.faint}">Fig. 1</text>
<text x="${pad + 52}" y="${h - 20}" font-size="14" fill="${t.muted}">How I work: understand it, rebuild it, measure it, then ship it.</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Research workflow: first principles, from scratch, evaluation, generative models, systems, with an iteration loop from evaluation back to rebuilding.">
<defs>
<style type="text/css"><![CDATA[
@font-face { font-family: 'SSerif'; font-weight: 400; src: url(data:font/woff2;base64,${FONTS.regular}) format('woff2'); }
@font-face { font-family: 'SSerif'; font-weight: 600; src: url(data:font/woff2;base64,${FONTS.semibold}) format('woff2'); }
text { font-family: 'SSerif', Georgia, 'Times New Roman', serif; }
]]></style>
</defs>
<rect width="${w}" height="${h}" fill="${t.paper}"/>
${rule}
${marks}
${loop}
${caption}
</svg>
`;
}

writeFileSync(join(here, "research-map.svg"), figure("light"));
writeFileSync(join(here, "research-map-dark.svg"), figure("dark"));
console.log("wrote research-map.svg and research-map-dark.svg");
