"""Freeze the verified Astro studies as static public files for Next.js.

Run before removing the Astro build toolchain. Does not touch the root landing.
"""

from collections import deque
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import shutil


ROOT = Path(__file__).resolve().parents[3]
ARCHIVE = Path(__file__).resolve().parent
SOURCE = ROOT / "dist" / "estudo"
TARGET = ROOT / "public" / "estudo"
ASSETS = TARGET / "assets"
PUBLIC = ROOT / "public"


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    html_sources = sorted(SOURCE.rglob("*.html"))
    assert len(html_sources) == 4, "Expected the panel and three complete studies"
    ASSETS.mkdir(parents=True, exist_ok=True)
    queue = deque()
    manifest = []
    for source in html_sources:
        content = source.read_text(encoding="utf-8")
        assert 'content="noindex, nofollow"' in content, source
        queue.extend(re.findall(r'/\_astro/([^"\s<>]+)', content))
        target = TARGET / source.relative_to(SOURCE)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content.replace("/_astro/", "/estudo/assets/"), encoding="utf-8")
        manifest.append({"source": source.relative_to(ROOT).as_posix(), "sourceSha256": sha256(source), "path": target.relative_to(ROOT).as_posix(), "sha256": sha256(target), "bytes": target.stat().st_size})
    visited = set()
    while queue:
        name = queue.popleft()
        if name in visited:
            continue
        visited.add(name)
        source = ROOT / "dist" / "_astro" / name
        assert source.is_file(), f"Missing Astro asset: {name}"
        target = ASSETS / name
        target.parent.mkdir(parents=True, exist_ok=True)
        if source.suffix in {".js", ".css"}:
            content = source.read_text(encoding="utf-8")
            queue.extend(re.findall(r'(?:from|import)\s*["\']\./([^"\']+)["\']', content))
            queue.extend(re.findall(r'/\_astro/([^"\s\)<>]+)', content))
            target.write_text(content.replace("/_astro/", "/estudo/assets/"), encoding="utf-8")
        else:
            shutil.copy2(source, target)
        manifest.append({"source": source.relative_to(ROOT).as_posix(), "sourceSha256": sha256(source), "path": target.relative_to(ROOT).as_posix(), "sha256": sha256(target), "bytes": target.stat().st_size})
    checked = 0
    for html in TARGET.rglob("*.html"):
        content = html.read_text(encoding="utf-8")
        assert "/_astro/" not in content, html
        for ref in re.findall(r'(?:src|href)="([^"#]+)"', content):
            if not ref.startswith("/") or ref.startswith("//"):
                continue
            if ref == "/":
                # The live root is provided by the new Next.js App Router.
                continue
            path = PUBLIC / ref.lstrip("/").split("?", 1)[0]
            assert path.is_file() or (path / "index.html").is_file(), f"Missing local reference: {html} -> {ref}"
            checked += 1
    result = {"createdUtc": datetime.now(timezone.utc).isoformat(), "htmlCount": len(html_sources), "assetCount": len(visited), "checkedLocalReferences": checked, "frameworkRoutes": ["/"], "allStudiesNoindex": True, "rootLandingCopied": False, "files": manifest}
    (ARCHIVE / "static-studies-manifest.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: value for key, value in result.items() if key != "files"}, indent=2))


if __name__ == "__main__":
    main()
