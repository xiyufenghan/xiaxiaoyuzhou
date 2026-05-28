# Content Production Workflow

## 目标

把一个想法变成可发布、可复盘、可沉淀的内容资产。

## 流程

1. 捕捉素材：放入 `data/research/` 或临时草稿。
2. 生成选题卡：使用 `prompts/topic-intake.md`。
3. 判断栏目：选择浴缸速记、老A的判断、世界正在变化或奇闻浴场。
4. 搭结构：调用 `agents/structure-editor.md`。
5. 写初稿：使用 `prompts/article-drafting.md`。
6. 改语气：调用 `agents/style-editor.md`。
7. 查事实：调用 `agents/fact-checker.md`。
8. 定稿：存入 `content/published/`。
9. 排版：使用 `prompts/wechat-publishing.md` 或公众号发布包提示词。
10. 发布后复盘：更新 `data/metrics/weekly-review.md`。

## 完成标准

- 有主判断
- 有栏目归属
- 有发布稿
- 有待核查处理
- 有复盘入口

