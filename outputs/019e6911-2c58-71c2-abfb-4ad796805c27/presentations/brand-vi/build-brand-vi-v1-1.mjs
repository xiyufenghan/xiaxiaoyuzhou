import pptxgen from "/Users/alex/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pptxgenjs/dist/pptxgen.cjs.js";
import path from "node:path";

const ROOT = "/Users/alex/Documents/小宇宙/outputs/019e6911-2c58-71c2-abfb-4ad796805c27/presentations/brand-vi";
const LOGO_ROOT = "/Users/alex/Documents/小宇宙/outputs/019e6911-2c58-71c2-abfb-4ad796805c27/brand-vi-logos/assets";
const HERO = path.join(ROOT, "assets", "bathtub-night-hero.png");
const OUT = path.join(ROOT, "output", "浴缸里的小宇宙-品牌手册-VI-v1.1.pptx");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "老A / Codex";
pptx.company = "浴缸里的小宇宙";
pptx.subject = "Brand Guideline v1.1";
pptx.title = "浴缸里的小宇宙 品牌手册 VI v1.1";
pptx.lang = "zh-CN";
pptx.theme = { headFontFace: "PingFang SC", bodyFontFace: "PingFang SC", lang: "zh-CN" };

const W = 13.333;
const H = 7.5;
const C = {
  navy: "0B1020",
  navy2: "0F172A",
  amber: "FBBF24",
  blue: "2563EB",
  sky: "38BDF8",
  gold: "FDE68A",
  white: "F8FAFC",
  muted: "CBD5E1",
  dim: "64748B",
  line: "334155",
  green: "22C55E",
  red: "EF4444",
  ink: "0F172A",
};

const logos = {
  notes: path.join(LOGO_ROOT, "bathtub-notes-transparent.png"),
  strange: path.join(LOGO_ROOT, "strange-bathhouse-transparent.png"),
  world: path.join(LOGO_ROOT, "world-changing-transparent.png"),
  judge: path.join(LOGO_ROOT, "laoa-judgement-transparent.png"),
  preview: path.join(LOGO_ROOT, "logo-system-preview.png"),
};

function bg(slide, color = C.navy) {
  slide.background = { color };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color }, line: { color } });
}

function text(slide, value, x, y, w, h, opt = {}) {
  slide.addText(value, {
    x, y, w, h,
    margin: opt.margin ?? 0,
    fontFace: opt.fontFace || "PingFang SC",
    fontSize: opt.size || 14,
    bold: opt.bold ?? false,
    color: opt.color || C.white,
    align: opt.align || "left",
    valign: opt.valign || "mid",
    fit: "shrink",
    paraSpaceAfterPt: 0,
    breakLine: false,
    ...opt,
  });
}

function header(slide, section, title, page) {
  text(slide, section, 0.58, 0.42, 3.2, 0.18, { size: 8, bold: true, color: C.amber, charSpace: 1.4 });
  text(slide, title, 0.58, 0.68, 7.3, 0.35, { size: 18, bold: true });
  slide.addShape(pptx.ShapeType.line, { x: 0.58, y: 1.16, w: 12.15, h: 0, line: { color: C.line, width: 0.7 } });
  text(slide, String(page).padStart(2, "0"), 12.18, 0.48, 0.55, 0.16, { size: 8, color: C.dim, align: "right" });
}

function footer(slide) {
  text(slide, "浴缸里的小宇宙 Brand Guideline v1.1", 0.58, 7.12, 2.65, 0.12, { size: 6.5, color: C.dim });
}

function card(slide, x, y, w, h, title, body, accent = C.amber) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.04, fill: { color: "111827" }, line: { color: C.line, width: 0.8 } });
  slide.addShape(pptx.ShapeType.rect, { x, y, w: 0.07, h, fill: { color: accent }, line: { color: accent } });
  text(slide, title, x + 0.22, y + 0.16, w - 0.4, 0.17, { size: 8, bold: true, color: accent, charSpace: 1.1 });
  text(slide, body, x + 0.22, y + 0.46, w - 0.42, h - 0.55, { size: 14, bold: true, valign: "top", breakLine: false });
}

function logoMark(slide, pathName, x, y, w) {
  slide.addImage({ path: pathName, x, y, w, h: w * 0.3125 });
}

// 1 Cover
{
  const s = pptx.addSlide();
  s.addImage({ path: HERO, x: 0, y: 0, w: W, h: H });
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: "020617", transparency: 22 }, line: { color: "020617", transparency: 100 } });
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 7.3, h: H, fill: { color: "020617", transparency: 6 }, line: { color: "020617", transparency: 100 } });
  logoMark(s, logos.notes, 0.55, 0.48, 3.2);
  text(s, "浴缸里的小宇宙", 0.65, 2.72, 6.2, 0.7, { size: 40, bold: true });
  text(s, "A man from the private-domain golden era observing the AI age.", 0.7, 3.58, 5.65, 0.34, { size: 14, color: C.gold });
  s.addShape(pptx.ShapeType.line, { x: 0.7, y: 4.12, w: 1.25, h: 0, line: { color: C.amber, width: 2 } });
  text(s, "Brand Guideline v1.1\nBy 老A", 10.75, 6.52, 1.9, 0.48, { size: 10, color: C.gold, align: "right" });
}

// 2 Brand DNA
{
  const s = pptx.addSlide(); bg(s); header(s, "BRAND DNA", "身份不是人设，是判断的来源", 2);
  s.addShape(pptx.ShapeType.arc, { x: 0.85, y: 1.55, w: 4.2, h: 4.2, adjustPoint: 0.15, line: { color: C.amber, width: 1.2, transparency: 8 } });
  s.addShape(pptx.ShapeType.ellipse, { x: 2.24, y: 2.05, w: 0.78, h: 0.78, fill: { color: C.gold }, line: { color: C.gold } });
  s.addShape(pptx.ShapeType.trapezoid, { x: 2.02, y: 2.84, w: 1.25, h: 2.25, fill: { color: "020617" }, line: { color: C.line } });
  s.addShape(pptx.ShapeType.arc, { x: 1.5, y: 4.72, w: 2.25, h: 0.72, adjustPoint: 0.18, line: { color: C.amber, width: 1.1 } });
  text(s, "人物剪影 / 浴缸边", 1.62, 5.78, 2.0, 0.2, { size: 9, color: C.dim, align: "center" });
  card(s, 5.25, 1.55, 3.12, 1.22, "WHO", "老A", C.amber);
  card(s, 8.76, 1.55, 3.28, 1.22, "FROM", "完美日记 → colorkey\n腾讯 → AI / Agent", C.blue);
  card(s, 5.25, 3.08, 3.12, 1.22, "ROLE", "判断型 IP", C.gold);
  card(s, 8.76, 3.08, 3.28, 1.22, "MISSION", "在 AI 时代\n重新观察世界", C.amber);
  text(s, "不教方法，只记录判断。", 5.25, 5.28, 6.6, 0.42, { size: 25, bold: true });
  text(s, "品牌可信度来自经历过增长、平台、组织和技术周期之后的再观察。", 5.28, 5.9, 5.9, 0.23, { size: 10, color: C.muted });
  footer(s);
}

// 3 Logo System
{
  const s = pptx.addSlide(); bg(s); header(s, "LOGO SYSTEM", "四个栏目使用同一套手写识别规则", 3);
  const items = [
    [logos.notes, "浴缸速记", "尚无答案 / 值得思考的小念头"],
    [logos.strange, "奇闻浴场", "历史奇闻 / 都市传说 / 人类行为"],
    [logos.world, "世界正在变化", "正在发生 / 容易被忽略的变化"],
    [logos.judge, "老A的判断", "长期问题 / 阶段性判断"],
  ];
  items.forEach((it, i) => {
    const x = 0.75 + (i % 2) * 6.0;
    const y = 1.52 + Math.floor(i / 2) * 2.42;
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.25, h: 1.92, rectRadius: 0.04, fill: { color: "111827" }, line: { color: C.line } });
    logoMark(s, it[0], x + 0.24, y + 0.18, 3.75);
    text(s, it[1], x + 0.28, y + 1.25, 1.45, 0.18, { size: 9, color: C.amber, bold: true });
    text(s, it[2], x + 0.28, y + 1.53, 3.2, 0.14, { size: 7.5, color: C.muted });
  });
  text(s, "Logo 规范", 6.82, 6.17, 1.1, 0.18, { size: 9, bold: true, color: C.amber });
  text(s, "手写字统一使用 HanziPen SC / 翩翩体风格；底部说明只写栏目定位，不写商业标签；Vol.x 胶囊保留为期数资产。", 7.68, 6.13, 4.65, 0.28, { size: 10, color: C.white, breakLine: false });
  footer(s);
}

// 4 Visual System
{
  const s = pptx.addSlide(); bg(s); header(s, "VISUAL SYSTEM", "深夜、暖光、手写感与判断感", 4);
  const swatches = [["深夜蓝", "#0B1020", C.navy], ["浴缸暖黄", "#FBBF24", C.amber], ["思考蓝", "#2563EB", C.blue], ["浅暖金", "#FDE68A", C.gold]];
  swatches.forEach((a, i) => {
    const x = 0.75 + (i % 2) * 2.52, y = 1.62 + Math.floor(i / 2) * 2.12;
    s.addShape(pptx.ShapeType.rect, { x, y, w: 2.05, h: 1.28, fill: { color: a[2] }, line: { color: a[2] } });
    text(s, a[0], x, y + 1.48, 1.3, 0.16, { size: 9, bold: true });
    text(s, a[1], x, y + 1.72, 1.2, 0.12, { size: 7, color: C.dim });
  });
  s.addShape(pptx.ShapeType.line, { x: 6.2, y: 1.55, w: 0, h: 4.7, line: { color: C.line, width: 1 } });
  logoMark(s, logos.notes, 6.75, 1.72, 4.0);
  text(s, "标题字体", 6.82, 3.18, 1.0, 0.16, { size: 8, bold: true, color: C.amber });
  text(s, "主标题：HanziPen SC / 翩翩体-简，加粗描边\n正文：PingFang SC / 思源黑体，保持克制", 6.82, 3.55, 4.5, 0.52, { size: 13, color: C.white, breakLine: false });
  text(s, "我的电子马长大了", 6.82, 4.5, 3.9, 0.38, { size: 22, bold: true, color: C.gold });
  text(s, "平台正在自己拆掉入口", 6.82, 5.18, 4.35, 0.34, { size: 20, bold: true });
  footer(s);
}

// 5 Content Universe
{
  const s = pptx.addSlide(); bg(s); header(s, "CONTENT UNIVERSE", "栏目不是分类，是观察世界的四个入口", 5);
  s.addShape(pptx.ShapeType.ellipse, { x: 4.75, y: 2.25, w: 3.65, h: 1.1, fill: { color: C.amber }, line: { color: C.amber } });
  text(s, "🛁 浴缸里的小宇宙", 5.05, 2.6, 3.0, 0.28, { size: 18, bold: true, color: C.ink });
  const nodes = [
    [logos.notes, "尚无答案的小念头", 0.8, 1.45, C.amber],
    [logos.strange, "从故事进入现实", 9.0, 1.45, C.sky],
    [logos.world, "被忽略的变化", 0.8, 5.0, C.blue],
    [logos.judge, "长期问题的判断", 9.0, 5.0, C.gold],
  ];
  nodes.forEach(([img, desc, x, y, col]) => {
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 3.25, h: 1.18, rectRadius: 0.04, fill: { color: "111827" }, line: { color: col } });
    logoMark(s, img, x + 0.12, y + 0.1, 2.45);
    text(s, desc, x + 0.18, y + 0.86, 1.6, 0.12, { size: 7.5, color: C.muted });
  });
  for (let i = 0; i < 36; i++) {
    const x = 0.8 + (i * 1.73) % 11.8;
    const y = 1.3 + ((i * 0.91) % 5.3);
    s.addShape(pptx.ShapeType.ellipse, { x, y, w: 0.025, h: 0.025, fill: { color: i % 3 ? C.gold : C.blue, transparency: 18 }, line: { color: C.gold, transparency: 100 } });
  }
  footer(s);
}

// 6 Column Rules
{
  const s = pptx.addSlide(); bg(s); header(s, "COLUMN RULES", "四个栏目说明进入 VI，后续可直接作为出图依据", 6);
  const rules = [
    ["浴缸速记", "洗澡、散步和深夜发呆时冒出来的问题。\n记录尚无答案、但值得思考的小念头。", C.amber],
    ["老A的判断", "事实、推演、修正与判断。\n记录长期问题，以及我对世界变化的阶段性判断。", C.gold],
    ["奇闻浴场", "历史、奇闻、都市传说与人类行为。\n从故事进入现实，看看世界为什么会变成这样。", C.sky],
    ["世界正在变化", "记录 AI、商业、社会现象与世界变化。\n观察那些正在发生、但容易被忽略的变化。", C.blue],
  ];
  rules.forEach((r, i) => {
    const x = 0.72 + (i % 2) * 6.05;
    const y = 1.45 + Math.floor(i / 2) * 2.38;
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 5.25, h: 1.9, rectRadius: 0.04, fill: { color: "111827" }, line: { color: C.line } });
    s.addShape(pptx.ShapeType.rect, { x, y, w: 0.1, h: 1.9, fill: { color: r[2] }, line: { color: r[2] } });
    text(s, r[0], x + 0.28, y + 0.2, 2.0, 0.2, { size: 15, bold: true });
    text(s, r[1], x + 0.28, y + 0.68, 4.55, 0.62, { size: 11.5, color: C.muted, breakLine: false });
  });
  footer(s);
}

// 7 Cover System
{
  const s = pptx.addSlide(); bg(s); header(s, "COVER SYSTEM", "每期封面 = 栏目 Logo + 一句判断 + 期数资产", 7);
  const covers = [
    [logos.notes, "我的电子马长大了", "AI 陪伴从工具变成关系"],
    [logos.world, "平台正在自己拆掉入口", "入口消失之后，判断重新定价"],
    [logos.judge, "长期问题正在浮出水面", "把事实、推演与修正放在一起"],
  ];
  covers.forEach((c, i) => {
    const x = 0.95 + i * 3.35;
    s.addShape(pptx.ShapeType.roundRect, { x, y: 1.55, w: 2.62, h: 4.08, rectRadius: 0.03, fill: { color: "111827" }, line: { color: C.line } });
    logoMark(s, c[0], x + 0.15, 1.76, 2.28);
    text(s, c[1], x + 0.22, 3.2, 2.02, 0.7, { size: 19, bold: true, valign: "top" });
    text(s, c[2], x + 0.22, 4.36, 1.88, 0.36, { size: 8.5, color: C.muted, breakLine: false });
    text(s, "—— 老A", x + 1.42, 5.18, 0.76, 0.12, { size: 7.5, color: C.gold, align: "right" });
  });
  text(s, "统一规范", 10.55, 1.72, 1.0, 0.18, { size: 10, bold: true, color: C.amber });
  ["顶部使用栏目 Logo", "中部一句判断（8-12 字）", "底部副标题解释观察对象", "右下保留 —— 老A", "禁止堆素材、堆 Logo、堆卖点"].forEach((sp, i) => {
    text(s, `0${i + 1}  ${sp}`, 10.4, 2.16 + i * 0.42, 2.25, 0.18, { size: 9.3, color: i === 4 ? C.red : C.white });
  });
  footer(s);
}

// 8 Homepage
{
  const s = pptx.addSlide(); bg(s); header(s, "HOMEPAGE SYSTEM", "日更节奏要被设计成品牌资产", 8);
  s.addShape(pptx.ShapeType.roundRect, { x: 0.88, y: 1.42, w: 4.3, h: 5.35, rectRadius: 0.08, fill: { color: "020617" }, line: { color: C.line } });
  text(s, "20:18", 1.18, 1.8, 0.6, 0.18, { size: 11, bold: true, color: C.amber });
  [["Vol.1", "浴缸速记"], ["Vol.2", "世界正在变化"], ["Vol.3", "老A的判断"], ["Vol.21", "阶段复盘"]].forEach((it, i) => {
    const y = 2.25 + i * 0.9;
    s.addShape(pptx.ShapeType.ellipse, { x: 1.42, y: y + 0.02, w: 0.12, h: 0.12, fill: { color: i < 2 ? C.amber : C.line }, line: { color: i < 2 ? C.amber : C.line } });
    if (i < 3) s.addShape(pptx.ShapeType.line, { x: 1.48, y: y + 0.17, w: 0, h: 0.7, line: { color: C.line, width: 1 } });
    text(s, it[0], 1.78, y - 0.03, 0.65, 0.16, { size: 8, bold: true, color: i < 2 ? C.gold : C.dim });
    text(s, it[1], 2.38, y - 0.05, 1.75, 0.2, { size: 12, bold: true, color: i < 2 ? C.white : C.dim });
  });
  text(s, "持续日更 = 品牌资产沉淀", 6.25, 2.2, 4.8, 0.52, { size: 30, bold: true });
  text(s, "固定发布时间、固定栏目 Logo、固定封面语法，会让用户对“今天的判断”形成期待。首页不是目录，是长期判断的时间轴。", 6.3, 3.03, 4.85, 0.66, { size: 13, color: C.muted, breakLine: false });
  card(s, 6.3, 4.35, 1.75, 0.92, "RHYTHM", "20:18", C.amber);
  card(s, 8.35, 4.35, 1.75, 0.92, "UNIT", "Vol.x", C.blue);
  card(s, 10.4, 4.35, 1.75, 0.92, "ASSET", "Logo 库", C.gold);
  footer(s);
}

// 9 AI Visual Rules
{
  const s = pptx.addSlide(); bg(s); header(s, "AI VISUAL RULES", "生成图片时先判断气质，再写画面", 9);
  text(s, "Allowed", 1.0, 1.5, 1.2, 0.24, { size: 17, bold: true, color: C.green });
  ["深夜", "暖光", "城市", "浴缸", "克制", "高级感"].forEach((v, i) => {
    const x = 1.05 + (i % 2) * 2.0, y = 2.02 + Math.floor(i / 2) * 0.72;
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 1.48, h: 0.42, rectRadius: 0.04, fill: { color: "052E16" }, line: { color: C.green } });
    text(s, `✓ ${v}`, x + 0.15, y + 0.12, 1.0, 0.14, { size: 10, bold: true, color: "BBF7D0" });
  });
  text(s, "Forbidden", 7.0, 1.5, 1.35, 0.24, { size: 17, bold: true, color: C.red });
  ["廉价 AI 海报", "科幻机甲", "蓝光污染", "大量 Logo", "电商风"].forEach((v, i) => {
    const x = 7.05 + (i % 2) * 2.15, y = 2.02 + Math.floor(i / 2) * 0.72;
    s.addShape(pptx.ShapeType.roundRect, { x, y, w: 1.72, h: 0.42, rectRadius: 0.04, fill: { color: "450A0A" }, line: { color: C.red } });
    text(s, `× ${v}`, x + 0.15, y + 0.12, 1.25, 0.14, { size: 10, bold: true, color: "FECACA" });
  });
  text(s, "像一张深夜写下的判断，而不是一张想让人点击的广告。人物可以缺席，情绪必须存在；科技可以出现，但不能抢走“观察者”的位置。", 1.0, 5.45, 10.7, 0.45, { size: 14, bold: true });
  footer(s);
}

// 10 Prompt Template
{
  const s = pptx.addSlide(); bg(s); header(s, "PROMPT TEMPLATE", "后续给 GPT / 图像模型的统一输入格式", 10);
  const prompt = `栏目：{浴缸速记 / 奇闻浴场 / 世界正在变化 / 老A的判断}
期数：Vol.{x}
栏目说明：{使用本手册对应栏目说明}
标题：{8-12 字判断句}
副标题：{一句解释观察对象}
画面：深夜、城市、暖光、浴缸 / 对应栏目视觉语法
气质：克制、冷静、像一份私人判断 memo
色彩：#0B1020 深夜蓝为底，#FBBF24 暖黄点亮，#2563EB 谨慎使用
版式：顶部栏目 Logo，中部判断句，底部副标题，右下 —— 老A
禁止：廉价 AI 海报、科幻机甲、蓝光污染、大量 Logo、电商风`;
  s.addShape(pptx.ShapeType.roundRect, { x: 0.86, y: 1.55, w: 6.65, h: 4.95, rectRadius: 0.04, fill: { color: "020617" }, line: { color: C.line } });
  text(s, prompt, 1.12, 1.85, 6.1, 4.2, { size: 14.3, color: C.muted, breakLine: false });
  text(s, "出图前自检", 8.15, 1.75, 1.15, 0.2, { size: 10, bold: true, color: C.amber });
  ["栏目 Logo 是否正确？", "标题是不是一句判断？", "画面是否保留负空间？", "科技元素是否被克制处理？", "是否一眼属于同一账号？"].forEach((v, i) => {
    text(s, `${i + 1}. ${v}`, 8.15, 2.25 + i * 0.52, 3.0, 0.2, { size: 12.5 });
  });
  footer(s);
}

// 11 Applications
{
  const s = pptx.addSlide(); bg(s); header(s, "APPLICATIONS", "公众号、社群、长图与播客封面统一一套识别", 11);
  [["公众号头图", "16:9 / 2.35:1"], ["朋友圈分享卡", "1:1"], ["社群预告图", "4:5"], ["播客 / 小宇宙封面", "1:1"]].forEach((a, i) => {
    const x = 0.88 + i * 3.05;
    s.addShape(pptx.ShapeType.roundRect, { x, y: 1.68, w: 2.35, h: 3.45, rectRadius: 0.04, fill: { color: "111827" }, line: { color: C.line } });
    s.addShape(pptx.ShapeType.rect, { x: x + 0.22, y: 2.03, w: 1.88, h: i === 0 ? 1.05 : i === 1 || i === 3 ? 1.45 : 1.75, fill: { color: i % 2 ? C.blue : C.amber, transparency: 8 }, line: { color: i % 2 ? C.blue : C.amber } });
    text(s, a[0], x + 0.22, 4.0, 1.7, 0.22, { size: 13, bold: true });
    text(s, a[1], x + 0.22, 4.38, 1.2, 0.14, { size: 8, color: C.gold });
    text(s, "Logo 可缩放，但不改变手写字、图标、Vol.x 关系。", x + 0.22, 4.68, 1.75, 0.28, { size: 8.2, color: C.muted, breakLine: false });
  });
  text(s, "应用原则：识别资产只减不加。不同尺寸可以删副标题、删背景细节，但不要改变栏目 Logo、标题语气和主色比例。", 0.9, 6.0, 10.7, 0.38, { size: 13, bold: true });
  footer(s);
}

// 12 Do / Don't
{
  const s = pptx.addSlide(); bg(s); header(s, "DO / DON'T", "用最少规则保持长期一致", 12);
  const dos = ["用栏目 Logo 作为第一识别", "用判断句做主标题", "用夜色和暖光建立私密观察感", "每个栏目使用自己的视觉语法", "保留大片负空间"];
  const donts = ["把封面做成课程海报", "把 AI 做成机甲、赛博、蓝光", "每期换一种 Logo 或版式", "堆叠热点词和平台 Logo", "让标题像广告卖点"];
  text(s, "Do", 1.05, 1.45, 0.55, 0.24, { size: 18, bold: true, color: C.green });
  text(s, "Don’t", 7.0, 1.45, 0.75, 0.24, { size: 18, bold: true, color: C.red });
  dos.forEach((d, i) => text(s, `✓ ${d}`, 1.05, 2.03 + i * 0.62, 3.9, 0.22, { size: 14, bold: true }));
  donts.forEach((d, i) => text(s, `× ${d}`, 7.0, 2.03 + i * 0.62, 3.9, 0.22, { size: 14, bold: true }));
  s.addShape(pptx.ShapeType.line, { x: 6.2, y: 1.55, w: 0, h: 4.2, line: { color: C.line, width: 1 } });
  text(s, "一句话总纲", 1.05, 6.05, 1.1, 0.18, { size: 9, bold: true, color: C.amber });
  text(s, "浴缸里的小宇宙 = 深夜私人观察 + 商业周期判断 + AI 时代注脚。", 1.05, 6.4, 8.55, 0.34, { size: 21, bold: true, color: C.gold });
  footer(s);
}

await pptx.writeFile({ fileName: OUT });
console.log(OUT);
