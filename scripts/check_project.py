#!/usr/bin/env python3
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

REQUIRED_DIRS = [
    "docs",
    "prompts",
    "agents",
    "data",
    "content",
    "scripts",
    "workflows",
]

REQUIRED_FILES = [
    "README.md",
    "AGENTS.md",
    "project-rules.md",
    "roadmap.md",
    "docs/ip-operating-system.md",
    "docs/brand-positioning.md",
    "docs/content-system.md",
    "docs/ai-native-workflow.md",
    "docs/metrics-framework.md",
    "prompts/topic-intake.md",
    "prompts/article-drafting.md",
    "agents/topic-editor.md",
    "agents/structure-editor.md",
    "workflows/content-production.md",
    "workflows/publishing.md",
    "data/metrics/weekly-review.md",
    "content/calendar/2026-05.md",
]


def main() -> int:
    failures = []

    for dirname in REQUIRED_DIRS:
        path = ROOT / dirname
        if not path.is_dir():
            failures.append(f"missing directory: {dirname}")

    for filename in REQUIRED_FILES:
        path = ROOT / filename
        if not path.is_file():
            failures.append(f"missing file: {filename}")

    for directory in [ROOT / item for item in REQUIRED_DIRS]:
        if directory.is_dir() and not (directory / "README.md").is_file():
            failures.append(f"missing directory README: {directory.relative_to(ROOT)}")

    markdown_files = [
        path
        for path in ROOT.rglob("*")
        if path.is_file()
        and ".git" not in path.parts
        and path.suffix.lower() in {".md", ".markdown"}
    ]

    empty_markdown = [path.relative_to(ROOT) for path in markdown_files if not path.read_text(encoding="utf-8").strip()]
    for path in empty_markdown:
        failures.append(f"empty markdown file: {path}")

    if failures:
        print("Project check failed:")
        for item in failures:
            print(f"- {item}")
        return 1

    print("Project check passed.")
    print(f"Checked {len(REQUIRED_DIRS)} core directories and {len(markdown_files)} markdown files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

