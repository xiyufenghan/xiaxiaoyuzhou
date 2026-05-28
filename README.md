# 浴缸里的小宇宙 IP 运营系统

这是《浴缸里的小宇宙》的长期 IP 运营 repo，用来沉淀品牌定位、内容生产、AI 协作、数据复盘、资产管理和发布流程。

这个项目的目标不是做一次性的内容文件夹，而是把公众号与后续多平台运营变成一个可以持续迭代的系统：每次选题、写作、排版、发布、复盘，都能留下结构化资产，让下一次更快、更准、更像我们。

## 当前定位

《浴缸里的小宇宙》是一个以个人判断、时代观察、商业变化和奇闻故事为核心的长期内容 IP。

核心气质：

- 清醒但不端着
- 有判断，但保留修正空间
- 对平台、商业、技术、人性变化敏感
- 像在浴缸里想事情：私密、松弛、带一点荒诞感

## Repo 结构

- `docs/`：IP 顶层设计、内容系统、运营规则、协作说明
- `prompts/`：可复用 AI 提示词，用于选题、写作、改稿、排版、复盘
- `agents/`：AI Agent 角色定义，适配 Codex / Cursor / Claude 协作
- `data/`：指标、选题素材、资料源、实验记录
- `content/`：草稿、发布稿、内容日历和内容资产
- `scripts/`：自动化脚本与项目校验工具
- `workflows/`：从选题到发布、复盘、月度迭代的标准流程
- `公众号发布包/`：已有公众号模板、Logo 资产和发布说明
- `outputs/`：历史生成产物与视觉资产沉淀

## 快速开始

1. 先读 [AGENTS.md](/Users/alex/Documents/小宇宙/AGENTS.md)，确认 AI 协作方式。
2. 再读 [project-rules.md](/Users/alex/Documents/小宇宙/project-rules.md)，确认长期运营规则。
3. 写新内容时，从 [workflows/content-production.md](/Users/alex/Documents/小宇宙/workflows/content-production.md) 开始。
4. 排版公众号文章时，使用 [公众号发布包/给Codex或ChatGPT的排版提示词.md](/Users/alex/Documents/小宇宙/公众号发布包/给Codex或ChatGPT的排版提示词.md)。
5. 每周复盘时，更新 [data/metrics/weekly-review.md](/Users/alex/Documents/小宇宙/data/metrics/weekly-review.md)。

## 核心栏目

- 浴缸速记：短判断、灵感、临时观察
- 老A的判断：结构化商业、平台、技术和行业判断
- 世界正在变化：周报、月报、变化信号合集
- 奇闻浴场：故事、怪谈、历史奇闻、人类行为样本

## AI Native 工作方式

这个 repo 默认由人类主理人和多个 AI 工具共同维护。

- Codex：项目结构、文档体系、自动化脚本、长期运营维护
- Cursor：内容工具、脚本、数据处理和工作台开发
- Claude：长文推演、风格打磨、复杂判断讨论
- ChatGPT：选题发散、内容初稿、发布辅助、多格式改写

所有 AI 生成内容都要经过人类主理人的判断校准。AI 可以提速，但不能替代最终判断。

## 维护节奏

- 每日：记录选题和素材
- 每周：发布与复盘至少一次
- 每月：更新路线图、栏目表现和内容策略
- 每季度：复查 IP 定位、视觉资产、平台策略和商业化假设

