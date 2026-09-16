#!/usr/bin/env python3
"""Crop Cormorant Garamond Italic → Scriptoria Italic (OFL derivative).

Lab rules (precise, still readable):
1. Read previous version + checksums from current manifest.
2. Before overwrite: archive only if glyph bytes are new vs latest archive.
3. Prefer bumping the lab version when glyphs change (warn if same version).
4. Always append machine log lines to public/fonts/_archive/lab-log.jsonl.
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
FONT_ID = "scriptoria-italic"
VERSION = "1.000"
ARCHIVE_ROOT_REL = Path("public/fonts/_archive/scriptoria-italic")


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


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def parse_version_parts(version: str) -> list[int]:
    parts: list[int] = []
    for piece in version.split("."):
        try:
            parts.append(int(piece))
        except ValueError:
            parts.append(0)
    return parts


def compare_versions(a: str, b: str) -> int:
    left, right = parse_version_parts(a), parse_version_parts(b)
    length = max(len(left), len(right))
    for i in range(length):
        diff = (left[i] if i < len(left) else 0) - (right[i] if i < len(right) else 0)
        if diff:
            return diff
    return 0


def read_manifest(path: Path) -> dict | None:
    if not path.exists():
        return None
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError, TypeError):
        return None
    return data if isinstance(data, dict) else None


def read_existing_state(out_dir: Path) -> tuple[str, dict[str, str]]:
    """Return (previous_version, checksums) from current manifest."""
    data = read_manifest(out_dir / "manifest.json")
    if not data:
        return VERSION, {}
    version = str(data.get("version") or VERSION)
    raw = data.get("checksums") or {}
    checksums = {
        str(k): str(v)
        for k, v in raw.items()
        if isinstance(k, str) and isinstance(v, str)
    }
    return version, checksums


def latest_archive_woff2_checksum(root: Path) -> str | None:
    archive_root = root / ARCHIVE_ROOT_REL
    if not archive_root.exists():
        return None

    newest: tuple[str, Path] | None = None
    for manifest_path in archive_root.glob("*/manifest.json"):
        data = read_manifest(manifest_path)
        if not data:
            continue
        stamp = str(data.get("archivedAt") or "")
        if newest is None or stamp > newest[0]:
            newest = (stamp, manifest_path)

    if newest is None:
        return None

    data = read_manifest(newest[1]) or {}
    checksums = data.get("checksums") or {}
    if isinstance(checksums, dict):
        # Prefer explicit woff2 key; fall back to filename key used by older manifests.
        for key in ("woff2", "ScriptoriaItalic-Regular.woff2"):
            value = checksums.get(key)
            if isinstance(value, str) and value:
                return value
    return None


def archive_current(
    out_dir: Path,
    root: Path,
    previous_version: str,
    previous_checksums: dict[str, str],
) -> Path | None:
    ttf = out_dir / "ScriptoriaItalic-Regular.ttf"
    woff2 = out_dir / "ScriptoriaItalic-Regular.woff2"
    if not ttf.exists() and not woff2.exists():
        return None

    current_woff2 = previous_checksums.get("woff2")
    if not current_woff2 and woff2.exists():
        current_woff2 = sha256_file(woff2)

    latest = latest_archive_woff2_checksum(root)
    if current_woff2 and latest and current_woff2 == latest:
        print("Skip archive: current woff2 already present in latest archive.")
        append_lab_log(
            root,
            {
                "ts": utc_now().isoformat(),
                "kind": "font-archive-skip",
                "fontId": FONT_ID,
                "family": FAMILY,
                "version": previous_version,
                "reason": "duplicate-checksum",
                "woff2Sha256": current_woff2,
                "noteZh": "現行字形與最近歸檔相同，跳過重複拷貝。",
            },
        )
        return None

    stamp = utc_now().strftime("%Y%m%d-%H%M%S")
    archive_dir = root / ARCHIVE_ROOT_REL / f"v{previous_version}-{stamp}"
    archive_dir.mkdir(parents=True, exist_ok=True)

    copied: dict[str, str] = {}
    for src in (
        ttf,
        woff2,
        out_dir / "manifest.json",
        out_dir / "OFL.txt",
        out_dir / "README.md",
    ):
        if src.exists():
            dest = archive_dir / src.name
            shutil.copy2(src, dest)
            copied[src.name] = str(dest.relative_to(root))

    checksums = {
        "ttf": sha256_file(archive_dir / "ScriptoriaItalic-Regular.ttf")
        if (archive_dir / "ScriptoriaItalic-Regular.ttf").exists()
        else None,
        "woff2": sha256_file(archive_dir / "ScriptoriaItalic-Regular.woff2")
        if (archive_dir / "ScriptoriaItalic-Regular.woff2").exists()
        else None,
    }
    checksums = {k: v for k, v in checksums.items() if v}

    meta = {
        "family": FAMILY,
        "fontId": FONT_ID,
        "version": previous_version,
        "archivedAt": utc_now().isoformat(),
        "status": "archived",
        "archiveKind": "pre-overwrite",
        "files": copied,
        "checksums": checksums,
        "notesZh": "建置前自動歸檔；/lab 用 checksum 對比。",
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


def write_manifest(
    out_dir: Path,
    version: str,
    ttf: Path,
    woff2: Path,
    previous_version: str | None,
) -> dict[str, str]:
    checksums = {
        "ttf": sha256_file(ttf),
        "woff2": sha256_file(woff2),
    }
    manifest = {
        "family": FAMILY,
        "fontId": FONT_ID,
        "version": version,
        "previousVersion": previous_version,
        "status": "current",
        "updatedAt": utc_now().isoformat(),
        "source": "Cormorant Garamond Italic (OFL) subset",
        "license": "SIL Open Font License 1.1",
        "files": {
            "ttf": ttf.name,
            "woff2": woff2.name,
        },
        "checksums": checksums,
        "notesZh": "斜體細草示範用。改字體前會自動歸檔舊版到 public/fonts/_archive/。",
    }
    (out_dir / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    return checksums


def main() -> int:
    out_dir = Path(sys.argv[1] if len(sys.argv) > 1 else "public/fonts/scriptoria-italic")
    root = Path(__file__).resolve().parents[2]
    out_dir = out_dir if out_dir.is_absolute() else (root / out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    version = VERSION
    if len(sys.argv) > 2:
        version = sys.argv[2]

    previous_version, previous_checksums = read_existing_state(out_dir)
    had_current = (out_dir / "ScriptoriaItalic-Regular.woff2").exists() or (
        out_dir / "ScriptoriaItalic-Regular.ttf"
    ).exists()

    if had_current and compare_versions(version, previous_version) == 0:
        print(
            f"Warning: rebuilding same lab version {version}. "
            "Bump (e.g. 1.001) when glyphs actually change."
        )
    elif had_current and compare_versions(version, previous_version) < 0:
        print(
            f"Warning: new version {version} is older than current {previous_version}."
        )

    archived = archive_current(out_dir, root, previous_version, previous_checksums)
    if archived is not None:
        append_lab_log(
            root,
            {
                "ts": utc_now().isoformat(),
                "kind": "font-archive",
                "fontId": FONT_ID,
                "family": FAMILY,
                "version": previous_version,
                "archiveKind": "pre-overwrite",
                "archivePath": str(archived.relative_to(root)),
                "woff2Sha256": previous_checksums.get("woff2"),
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

    checksums = write_manifest(
        out_dir,
        version,
        ttf_path,
        woff2_path,
        previous_version if had_current else None,
    )

    check = TTFont(str(ttf_path))
    cmap = check.getBestCmap()
    missing = [c for c in "abcdefghijklmnopqrstuvwxyz" if ord(c) not in cmap]
    print(f"Wrote {ttf_path} ({ttf_path.stat().st_size} bytes)")
    print(f"Wrote {woff2_path} ({woff2_path.stat().st_size} bytes)")
    print(f"Glyphs: {len(check.getGlyphOrder())}; missing minuscules: {missing or 'none'}")

    unchanged = (
        had_current
        and previous_checksums.get("woff2") == checksums["woff2"]
    )
    append_lab_log(
        root,
        {
            "ts": utc_now().isoformat(),
            "kind": "font-release",
            "fontId": FONT_ID,
            "family": FAMILY,
            "version": version,
            "previousVersion": previous_version if had_current else None,
            "archivedFrom": str(archived.relative_to(root)) if archived else None,
            "glyphsUnchanged": unchanged,
            "ttfSha256": checksums["ttf"],
            "woff2Sha256": checksums["woff2"],
            "noteZh": (
                "字形 checksum 未變（可能只係重跑建置）。"
                if unchanged
                else "Scriptoria Italic 建置／覆寫完成。"
            ),
        },
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
