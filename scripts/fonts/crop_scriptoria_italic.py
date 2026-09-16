#!/usr/bin/env python3
"""Crop Cormorant Garamond Italic → Scriptoria Italic (OFL derivative).

Lab behaviour:
- Before overwrite, archive current TTF/WOFF2 into public/fonts/_archive/
- Write/update manifest.json with version + checksums
- Append a machine-readable line to public/fonts/_archive/lab-log.jsonl
"""

from __future__ import annotations

import hashlib
import json
import shutil
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

SOURCE_URL = (
    "https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/"
    "CormorantGaramond-Italic%5Bwght%5D.ttf"
)
OFL_URL = (
    "https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/OFL.txt"
)

CHARS = (
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "abcdefghijklmnopqrstuvwxyz"
    "0123456789"
    " .,;:!?\"'`-–—()[]/&@#%*+=<>"
)

FAMILY = "Scriptoria Italic"
VERSION = "1.000"


def set_name(font: TTFont, name_id: int, string: str) -> None:
    name = font["name"]
    name.setName(string, name_id, 3, 1, 0x409)
    try:
        name.setName(string, name_id, 1, 0, 0)
    except Exception:
        pass


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def read_existing_version(out_dir: Path) -> str:
    """讀現行 manifest 版號；歸檔資料夾要用舊版號，唔好用即將覆寫嘅新版號。"""
    manifest = out_dir / "manifest.json"
    if not manifest.exists():
        return VERSION
    try:
        data = json.loads(manifest.read_text(encoding="utf-8"))
        found = data.get("version")
        if found:
            return str(found)
    except (OSError, json.JSONDecodeError, TypeError):
        pass
    return VERSION


def archive_current(out_dir: Path, root: Path, previous_version: str) -> Path | None:
    ttf = out_dir / "ScriptoriaItalic-Regular.ttf"
    woff2 = out_dir / "ScriptoriaItalic-Regular.woff2"
    if not ttf.exists() and not woff2.exists():
        return None

    stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    archive_dir = (
        root
        / "public"
        / "fonts"
        / "_archive"
        / "scriptoria-italic"
        / f"v{previous_version}-{stamp}"
    )
    archive_dir.mkdir(parents=True, exist_ok=True)

    copied: dict[str, str] = {}
    for src in (ttf, woff2, out_dir / "manifest.json", out_dir / "OFL.txt", out_dir / "README.md"):
        if src.exists():
            dest = archive_dir / src.name
            shutil.copy2(src, dest)
            copied[src.name] = str(dest.relative_to(root))

    meta = {
        "family": FAMILY,
        "version": previous_version,
        "archivedAt": datetime.now(timezone.utc).isoformat(),
        "status": "archived",
        "files": copied,
        "checksums": {
            name: sha256_file(archive_dir / name)
            for name in copied
            if (archive_dir / name).is_file() and name.endswith((".ttf", ".woff2"))
        },
        "notesZh": "建置前自動歸檔；/lab 可對比查驗。",
    }
    (archive_dir / "manifest.json").write_text(
        json.dumps(meta, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Archived previous build → {archive_dir}")
    return archive_dir


def append_lab_log(root: Path, entry: dict) -> None:
    log_path = root / "public" / "fonts" / "_archive" / "lab-log.jsonl"
    log_path.parent.mkdir(parents=True, exist_ok=True)
    with log_path.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


def write_manifest(out_dir: Path, version: str, ttf: Path, woff2: Path) -> None:
    manifest = {
        "family": FAMILY,
        "version": version,
        "status": "current",
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "source": "Cormorant Garamond Italic (OFL) subset",
        "license": "SIL Open Font License 1.1",
        "files": {
            "ttf": ttf.name,
            "woff2": woff2.name,
        },
        "checksums": {
            "ttf": sha256_file(ttf),
            "woff2": sha256_file(woff2),
        },
        "notesZh": "斜體細草示範用。改字體前會自動歸檔舊版到 public/fonts/_archive/。",
    }
    (out_dir / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def main() -> int:
    out_dir = Path(sys.argv[1] if len(sys.argv) > 1 else "public/fonts/scriptoria-italic")
    root = Path(__file__).resolve().parents[2]
    out_dir = out_dir if out_dir.is_absolute() else (root / out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    version = VERSION
    if len(sys.argv) > 2:
        version = sys.argv[2]

    previous_version = read_existing_version(out_dir)
    archived = archive_current(out_dir, root, previous_version)
    if archived is not None:
        append_lab_log(
            root,
            {
                "ts": datetime.now(timezone.utc).isoformat(),
                "kind": "font-archive",
                "family": FAMILY,
                "version": previous_version,
                "archivePath": str(archived.relative_to(root)),
                "noteZh": "覆寫前自動歸檔舊版字體。",
            },
        )

    cache = Path("/tmp/scriptoria-font-build")
    cache.mkdir(parents=True, exist_ok=True)

    vf_path = cache / "CormorantGaramond-Italic[wght].ttf"
    if not vf_path.exists():
        print("Downloading Cormorant Garamond Italic…")
        urllib.request.urlretrieve(SOURCE_URL, vf_path)

    ofl_path = out_dir / "OFL.txt"
    if not ofl_path.exists():
        urllib.request.urlretrieve(OFL_URL, ofl_path)

    print("Instancing wght=400…")
    vf = TTFont(str(vf_path), recalcBBoxes=False, recalcTimestamp=False)
    instanced = instantiateVariableFont(vf, {"wght": 400}, inplace=False)
    inst_path = cache / "CormorantGaramond-Italic-400.ttf"
    instanced.save(str(inst_path))

    print("Cropping glyphs…")
    font = TTFont(str(inst_path))
    options = subset.Options()
    options.layout_closure = True
    options.glyph_names = True
    options.name_IDs = ["*"]
    options.name_legacy = True
    options.name_languages = ["*"]
    options.notdef_outline = True
    options.recalc_bounds = True
    options.recalc_timestamp = True
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=CHARS)
    subsetter.subset(font)

    set_name(font, 1, FAMILY)
    set_name(font, 2, "Regular")
    set_name(font, 3, f"Scriptoria:Scriptoria Italic:{version}")
    set_name(font, 4, FAMILY)
    set_name(font, 5, f"Version {version}")
    set_name(font, 6, "ScriptoriaItalic-Regular")
    set_name(
        font,
        10,
        "Scriptoria Italic is a cropped subset derived from Cormorant Garamond Italic "
        "(SIL Open Font License) for Scriptoria atelier practice exemplars, "
        "with emphasis on minuscule teaching forms.",
    )
    set_name(font, 11, "https://github.com/ppgmmy/western-calligraphy")
    set_name(font, 13, "This Font Software is licensed under the SIL Open Font License, Version 1.1.")
    set_name(font, 14, "https://scripts.sil.org/OFL")

    orig = font["name"].getName(0, 3, 1, 0x409)
    if orig:
        set_name(
            font,
            0,
            orig.toUnicode()
            + " Scriptoria Italic subset prepared for Scriptoria atelier teaching use.",
        )

    ttf_path = out_dir / "ScriptoriaItalic-Regular.ttf"
    woff2_path = out_dir / "ScriptoriaItalic-Regular.woff2"
    font.flavor = None
    font.save(str(ttf_path))

    wfont = TTFont(str(ttf_path))
    wfont.flavor = "woff2"
    wfont.save(str(woff2_path))

    write_manifest(out_dir, version, ttf_path, woff2_path)

    check = TTFont(str(ttf_path))
    cmap = check.getBestCmap()
    missing = [c for c in "abcdefghijklmnopqrstuvwxyz" if ord(c) not in cmap]
    print(f"Wrote {ttf_path} ({ttf_path.stat().st_size} bytes)")
    print(f"Wrote {woff2_path} ({woff2_path.stat().st_size} bytes)")
    print(f"Glyphs: {len(check.getGlyphOrder())}; missing minuscules: {missing or 'none'}")

    append_lab_log(
        root,
        {
            "ts": datetime.now(timezone.utc).isoformat(),
            "kind": "font-release",
            "family": FAMILY,
            "version": version,
            "archivedFrom": str(archived) if archived else None,
            "ttfSha256": sha256_file(ttf_path),
            "woff2Sha256": sha256_file(woff2_path),
            "noteZh": "Scriptoria Italic 建置／覆寫；舊版已歸檔（如有）。",
        },
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
