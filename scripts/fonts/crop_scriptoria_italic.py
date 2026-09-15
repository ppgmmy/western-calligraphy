#!/usr/bin/env python3
"""Crop Cormorant Garamond Italic → Scriptoria Italic (OFL derivative)."""

from __future__ import annotations

import sys
import urllib.request
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


def set_name(font: TTFont, name_id: int, string: str) -> None:
    name = font["name"]
    name.setName(string, name_id, 3, 1, 0x409)
    try:
        name.setName(string, name_id, 1, 0, 0)
    except Exception:
        pass


def main() -> int:
    out_dir = Path(sys.argv[1] if len(sys.argv) > 1 else "public/fonts/scriptoria-italic")
    out_dir.mkdir(parents=True, exist_ok=True)
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

    family = "Scriptoria Italic"
    set_name(font, 1, family)
    set_name(font, 2, "Regular")
    set_name(font, 3, "Scriptoria:Scriptoria Italic:2026")
    set_name(font, 4, family)
    set_name(font, 5, "Version 1.000")
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

    check = TTFont(str(ttf_path))
    cmap = check.getBestCmap()
    missing = [c for c in "abcdefghijklmnopqrstuvwxyz" if ord(c) not in cmap]
    print(f"Wrote {ttf_path} ({ttf_path.stat().st_size} bytes)")
    print(f"Wrote {woff2_path} ({woff2_path.stat().st_size} bytes)")
    print(f"Glyphs: {len(check.getGlyphOrder())}; missing minuscules: {missing or 'none'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
