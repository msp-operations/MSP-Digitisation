"""Generate web derivatives for the MSP 15 site.

Reads the *-src.* files in assets/img, writes resized JPEG + WebP pairs with all
metadata (EXIF, GPS, photographer info) stripped. Source copies stay local; only
derivatives are committed (see .gitignore). Run with:  py tools/make_images.py
"""
from pathlib import Path
from PIL import Image

IMG = Path(__file__).resolve().parent.parent / "assets" / "img"
WIDTHS = (800, 1600)

JOBS = {
    "building-src.jpg": "building",
    "maastricht-src.jpg": "maastricht",
    "oldbuilding-src.jpg": "oldbuilding",
    "tapijn-src.jpg": "tapijn",
    "oldentrance-src.jpg": "oldentrance",
    "oldatrium-src.jpg": "oldatrium",
}

def strip(im: Image.Image) -> Image.Image:
    # Re-creating the image drops EXIF and other metadata blocks.
    clean = Image.new(im.mode, im.size)
    clean.putdata(list(im.getdata()))
    return clean

for src, stem in JOBS.items():
    path = IMG / src
    if not path.exists():
        print(f"skip {src} (not found)")
        continue
    im = Image.open(path).convert("RGB")
    for w in WIDTHS:
        if im.width < w:
            continue
        h = round(im.height * w / im.width)
        r = im.resize((w, h), Image.LANCZOS)
        r = strip(r)
        jpg = IMG / f"{stem}-{w}.jpg"
        webp = IMG / f"{stem}-{w}.webp"
        r.save(jpg, "JPEG", quality=82, optimize=True, progressive=True)
        r.save(webp, "WEBP", quality=80, method=6)
        print(f"{jpg.name} {jpg.stat().st_size//1024}KB · {webp.name} {webp.stat().st_size//1024}KB ({w}x{h})")

# Logo: one crisp mid-size PNG with transparency preserved.
logo = IMG / "msp-logo-src.png"
if logo.exists():
    im = Image.open(logo)
    for w in (480,):
        r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        out = IMG / f"msp-logo-{w}.png"
        r.save(out, "PNG", optimize=True)
        print(f"{out.name} {out.stat().st_size//1024}KB")
print("done")
