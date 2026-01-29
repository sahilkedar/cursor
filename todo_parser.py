from __future__ import annotations

from collections.abc import Iterable
import re

_TODO_RE = re.compile(r"\bTODO\b[:\-]?\s*(?P<text>.*)", re.IGNORECASE)
_COMMENT_PREFIXES = ("#", "//", "--", ";")


def extract_todos(lines: Iterable[str]) -> list[str]:
    """Extract TODO items from comment-only lines."""
    todos: list[str] = []
    for line in lines:
        comment = _extract_comment_text(line)
        if comment is None:
            continue
        match = _TODO_RE.search(comment)
        if not match:
            continue
        text = match.group("text").strip()
        todos.append(text if text else "TODO")
    return todos


def format_todo_report(todos: Iterable[str]) -> str:
    """Return a human-readable TODO report."""
    todo_list = [todo.strip() for todo in todos if todo.strip()]
    if not todo_list:
        return "No TODOs found."
    lines = ["TODOs:"]
    lines.extend(f"- {item}" for item in todo_list)
    return "\n".join(lines)


def _extract_comment_text(line: str) -> str | None:
    stripped = line.strip()
    if not stripped:
        return None
    for prefix in _COMMENT_PREFIXES:
        if stripped.startswith(prefix):
            return stripped[len(prefix):].strip()
    return None


def main(argv: list[str] | None = None) -> int:
    import sys

    args = sys.argv[1:] if argv is None else argv
    if not args:
        print("Usage: python todo_parser.py <path>", file=sys.stderr)
        return 2
    path = args[0]
    try:
        with open(path, "r", encoding="utf-8") as handle:
            todos = extract_todos(handle)
    except OSError as exc:
        print(f"Error reading {path}: {exc}", file=sys.stderr)
        return 1
    print(format_todo_report(todos))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
