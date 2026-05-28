import fs from "node:fs/promises";
import path from "node:path";
import sharp from "/Users/alex/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/lib/index.js";

const ROOT = "/Users/alex/Documents/小宇宙/outputs/019e6911-2c58-71c2-abfb-4ad796805c27/brand-vi-logos";
const ASSET_DIR = path.join(ROOT, "assets");

const logos = [
  {
    slug: "bathtub-notes",
    name: "浴缸速记",
    icon: "bath",
    accent: "#FBBF24",
    text: ["浴", "缸", "速", "记"],
    note: "尚无答案 / 值得思考的小念头",
  },
  {
    slug: "strange-bathhouse",
    name: "奇闻浴场",
    icon: "satellite",
    accent: "#38BDF8",
    text: ["奇", "闻", "浴", "场"],
    note: "历史奇闻 / 都市传说 / 人类行为",
  },
  {
    slug: "world-changing",
    name: "世界正在变化",
    icon: "orbit",
    accent: "#2563EB",
    text: ["世", "界", "正", "在", "变", "化"],
    note: "正在发生 / 容易被忽略的变化",
  },
  {
    slug: "laoa-judgement",
    name: "老A的判断",
    icon: "pin",
    accent: "#FDE68A",
    text: ["老", "A", "的", "判", "断"],
    note: "长期问题 / 阶段性判断",
    xOffsets: [410, 542, 657, 832, 992],
  },
];

function esc(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]);
}

function iconSvg(kind, x, y, accent, scale = 1) {
  if (kind === "bath") {
    return `
      <g transform="translate(${x} ${y}) scale(${scale})">
        <path d="M28 62 C30 44 45 36 70 38 L174 38 C196 38 212 48 216 66 C211 99 189 116 78 116 C47 116 31 98 28 62Z" fill="#F8FAFC" stroke="#0B1220" stroke-width="7" stroke-linejoin="round"/>
        <path d="M54 38 C54 18 69 12 82 22" fill="none" stroke="#CBD5E1" stroke-width="8" stroke-linecap="round"/>
        <path d="M42 66 C83 76 144 77 204 66" fill="none" stroke="#CBD5E1" stroke-width="6" stroke-linecap="round"/>
        <circle cx="162" cy="8" r="18" fill="#38BDF8" stroke="#0B1220" stroke-width="5"/>
        <circle cx="199" cy="21" r="8" fill="#38BDF8" stroke="#0B1220" stroke-width="4"/>
        <circle cx="183" cy="-13" r="7" fill="#38BDF8" stroke="#0B1220" stroke-width="4"/>
      </g>`;
  }
  if (kind === "satellite") {
    return `
      <g transform="translate(${x} ${y}) scale(${scale}) rotate(-9)">
        <circle cx="95" cy="48" r="40" fill="#0F172A" stroke="${accent}" stroke-width="8"/>
        <path d="M31 98 C72 129 134 128 178 92" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round" opacity=".8"/>
        <rect x="44" y="12" width="32" height="24" rx="5" fill="#F8FAFC" stroke="#0B1220" stroke-width="5"/>
        <rect x="118" y="18" width="36" height="22" rx="5" fill="#F8FAFC" stroke="#0B1220" stroke-width="5"/>
        <path d="M77 26 L117 31" stroke="#F8FAFC" stroke-width="8" stroke-linecap="round"/>
        <circle cx="97" cy="29" r="12" fill="${accent}" stroke="#0B1220" stroke-width="5"/>
        <path d="M162 54 C191 62 211 79 223 106" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round"/>
      </g>`;
  }
  if (kind === "orbit") {
    return `
      <g transform="translate(${x} ${y}) scale(${scale})">
        <circle cx="98" cy="58" r="48" fill="none" stroke="#F8FAFC" stroke-width="7"/>
        <path d="M44 58 C74 25 125 25 153 58 C124 92 75 92 44 58Z" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
        <path d="M96 11 C79 47 80 75 98 107 C118 78 118 44 96 11Z" fill="none" stroke="#FDE68A" stroke-width="5" opacity=".95"/>
        <path d="M25 103 C78 126 149 119 197 81" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
        <path d="M185 73 L210 74 L198 95" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="98" cy="58" r="8" fill="#FBBF24"/>
      </g>`;
  }
  return `
    <g transform="translate(${x} ${y}) scale(${scale}) rotate(-6)">
      <path d="M80 6 C117 15 139 45 134 83 C128 127 83 147 47 123 C12 100 10 50 38 23 C49 12 63 7 80 6Z" fill="${accent}" stroke="#0B1220" stroke-width="7"/>
      <path d="M71 40 L101 74 L46 80 Z" fill="#0F172A"/>
      <path d="M73 122 L53 174" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
      <path d="M37 166 L91 152" stroke="#F8FAFC" stroke-width="6" stroke-linecap="round"/>
    </g>`;
}

function logoSvg(logo, variant = "dark") {
  const isDark = variant !== "positive";
  const textColor = isDark ? "#F8FAFC" : "#0F172A";
  const strokeColor = textColor;
  const noteColor = isDark ? "#CBD5E1" : "#475569";
  const bg = variant === "dark"
    ? `<rect x="0" y="0" width="1600" height="500" rx="42" fill="#0B1020"/>`
    : "";
  const textStart = 410;
  const chars = logo.text.map((ch, i) => {
    const baseX = logo.xOffsets?.[i] ?? (textStart + i * (logo.text.length > 4 ? 104 : 132));
    const y = 230 + (i % 2 ? 7 : -6);
    const rot = [-5, 2, -3, 3, -2, 3][i] ?? 0;
    const size = ch === "A" ? 130 : 142;
    return `<text x="${baseX}" y="${y}" transform="rotate(${rot} ${baseX} ${y})" class="word" font-size="${size}">${esc(ch)}</text>`;
  }).join("\n");
  const lastX = logo.xOffsets?.at(-1) ?? (textStart + (logo.text.length - 1) * (logo.text.length > 4 ? 104 : 132));
  const lineEnd = lastX + (logo.text.length > 4 ? 150 : 140);
  const iconX = lineEnd + 18;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="500" viewBox="0 0 1600 500">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="3" dy="4" stdDeviation="2.2" flood-color="#000000" flood-opacity=".45"/>
    </filter>
    <style>
      .word {
        font-family: "HanziPen SC", "翩翩体-简", "Hannotate SC", "手札体-简", "PingFang SC", sans-serif;
        font-weight: 800;
        fill: ${textColor};
        stroke: ${strokeColor};
        stroke-width: 7px;
        paint-order: stroke fill;
        letter-spacing: 0;
        filter: url(#shadow);
      }
      .meta {
        font-family: "Avenir Next", "Helvetica Neue", Arial, sans-serif;
        font-weight: 800;
      }
    </style>
  </defs>
  ${bg}
  <g>
    ${chars}
    <g transform="translate(78 116)" filter="url(#shadow)">
      <rect x="0" y="0" width="250" height="108" rx="48" fill="#FBBF24" stroke="#6B4E00" stroke-width="6"/>
      <text x="125" y="73" class="meta" text-anchor="middle" font-size="58" fill="#0F172A">Vol.x</text>
    </g>
    <path d="M${textStart} 292 C${textStart + 100} 281 ${textStart + 230} 288 ${textStart + 330} 291 C${textStart + 430} 294 ${textStart + 530} 283 ${lineEnd} 286" fill="none" stroke="${textColor}" stroke-width="8" stroke-linecap="round" filter="url(#shadow)"/>
    <path d="M${textStart} 312 C${textStart + 130} 303 ${textStart + 250} 312 ${textStart + 390} 306 C${textStart + 500} 301 ${textStart + 600} 307 ${lineEnd - 8} 300" fill="none" stroke="${logo.accent}" stroke-width="4" stroke-linecap="round" opacity=".92"/>
    ${iconSvg(logo.icon, iconX, 136, logo.accent, 0.78)}
    <text x="${textStart + 10}" y="390" class="meta" font-size="34" fill="${noteColor}" letter-spacing="3">${esc(logo.note)}</text>
  </g>
</svg>`;
}

function lockupSvg() {
  const rows = logos.map((logo, i) => {
    const y = 130 + i * 245;
    return `
      <g transform="translate(90 ${y}) scale(.58)">
        ${logoSvg(logo, "transparent")
          .replace(/<\?xml[^>]*>\s*/, "")
          .replace(/<svg[^>]*>/, "<g>")
          .replace("</svg>", "</g>")}
      </g>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200">
  <rect width="1600" height="1200" fill="#0B1020"/>
  <text x="90" y="78" fill="#FDE68A" font-family="PingFang SC, sans-serif" font-weight="700" font-size="36">浴缸里的小宇宙 / 栏目 Logo 系统 v1.1</text>
  ${rows}
</svg>`;
}

await fs.mkdir(ASSET_DIR, { recursive: true });
for (const logo of logos) {
  for (const variant of ["dark", "transparent", "positive"]) {
    const svg = logoSvg(logo, variant);
    const basename = `${logo.slug}-${variant}`;
    const svgPath = path.join(ASSET_DIR, `${basename}.svg`);
    const pngPath = path.join(ASSET_DIR, `${basename}.png`);
    await fs.writeFile(svgPath, svg, "utf8");
    await sharp(Buffer.from(svg)).png().toFile(pngPath);
  }
}
const sheet = lockupSvg();
await fs.writeFile(path.join(ASSET_DIR, "logo-system-preview.svg"), sheet, "utf8");
await sharp(Buffer.from(sheet)).png().toFile(path.join(ASSET_DIR, "logo-system-preview.png"));
console.log(ASSET_DIR);
