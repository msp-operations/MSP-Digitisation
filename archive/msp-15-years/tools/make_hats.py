"""Rebuild the hats-strip derivatives + HTML from the curated Hat Throw Photos folder.

Source of truth: Operations\Projects\MSP15 Anneversary\Hat Throw Photos (24 curated frames)
plus two extra burst frames found in the archive (SIEMCLERX 483/485). Outputs ordinal
hats-NN.jpg/webp (900w, EXIF-stripped) and rewrites the .hats-strip block in index.html.
Run: py tools/make_hats.py
"""
import re
from pathlib import Path
from PIL import Image

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "assets" / "img" / "hats"
HTP = Path(r"c:\dev\Operations\Projects\MSP15 Anneversary\Hat Throw Photos")
ARCH = Path(r"c:\dev\MSP\_Archive\2. Alumni Office MSP - MJ\Graduation Photos")

MANIFEST = [
    (HTP / "2014 - hat throw on stage [UNM 255].jpg", "The class of 2014 throwing their caps on the theatre stage"),
    (HTP / "2015 - hat throw burst 3 [175].jpg", "Peak of the 2015 toss, in black and white"),
    (HTP / "2016 Jan - OFFICIAL hat throw [2016 January Throw].jpg", "Caps against the winter graduation screen, January 2016"),
    (HTP / "2016 - OFFICIAL hat throw [2016 Hats].jpg", "The class of 2016 filling a gothic hall with caps"),
    (ARCH / "Graduation ceremony and reception Feb 2017" / "H4A2283A1.jpg", "A winter toss on the church steps, February 2017"),
    (HTP / "2017 - OFFICIAL hat throw [2017 Hats].jpg", "The class of 2017 outside Sint Janskerk in the summer sun"),
    (ARCH / "wetransfer-48aa29" / "H4A0833A1.jpg", "Caps in the church rafters, February 2018"),
    (HTP / "2018 - OFFICIAL hat throw [2018 Hats].jpg", "The class of 2018 against a summer sky"),
    (HTP / "2019 - OFFICIAL hat throw [2019 Hats].jpg", "The class of 2019 on the steps, caps everywhere"),
    (HTP / "2021 - hat throw group jump [H4A0595A1].jpg", "The 2021 cohort's group jump outside the faculty building"),
    (HTP / "2022 - OFFICIAL hat throw [2022 Hats].jpg", "Caps in front of the MSP globe, class of 2022"),
    (HTP / "2023 - OFFICIAL hat throw [2023 Hats].jpg", "The class of 2023 filling the auditorium with caps"),
    (ARCH / "Grad 24" / "SIEMCLERX 20240705 Graduation-MSP 483 HR.jpg", "A dense cloud of caps above the class of 2024"),
    (HTP / "2024 - mini ceremony hat throw [SIEMCLERX 20240705 Graduation-MSP 616 HR].jpg", "The mini-ceremony group's own toss, July 2024"),
]

# clean old derivatives and stale local source copies
for f in OUT.glob("hats-*"):
    f.unlink()

figures = []
for i, (src, alt) in enumerate(MANIFEST, 1):
    if not src.exists():
        raise SystemExit(f"MISSING: {src}")
    stem = f"hats-{i:02d}"
    im = Image.open(src).convert("RGB")
    w = 900
    h = round(im.height * w / im.width)
    r = im.resize((w, h), Image.LANCZOS)
    clean = Image.new("RGB", r.size)
    clean.paste(r)
    clean.save(OUT / f"{stem}.jpg", "JPEG", quality=84, optimize=True, progressive=True)
    clean.save(OUT / f"{stem}.webp", "WEBP", quality=80, method=6)
    figures.append(
        f'        <figure class="hat-card reveal">\n'
        f'          <picture>\n'
        f'            <source type="image/webp" srcset="assets/img/hats/{stem}.webp">\n'
        f'            <img src="assets/img/hats/{stem}.jpg" width="{w}" height="{h}" loading="lazy" decoding="async"\n'
        f'                 alt="{alt}">\n'
        f'          </picture>\n'
        f'        </figure>'
    )
    print(stem, f"{w}x{h}", (OUT / f"{stem}.jpg").stat().st_size // 1024, "KB", "-", src.name[:60])

html = REPO / "index.html"
text = html.read_text(encoding="utf-8")
block = "\n".join(figures)
new, n = re.subn(
    r'(<div class="hats-strip"[^>]*>\n).*?(\n      </div>)',
    lambda m: m.group(1) + block + m.group(2),
    text,
    flags=re.S,
)
if n != 1:
    raise SystemExit(f"strip block replacement failed (matches: {n})")
html.write_text(new, encoding="utf-8")
print(f"\nindex.html updated with {len(figures)} figures")
