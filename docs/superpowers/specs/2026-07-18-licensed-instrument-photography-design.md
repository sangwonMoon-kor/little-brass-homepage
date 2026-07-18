# Little Brass Licensed Instrument Photography Design

**Approved direction:** A안 — replace the four AI-generated instrument cards with a consistent set of real Yamaha product photographs, and use a real award-ceremony photograph as the temporary character-ready supporting image.

## Goals

- Remove every AI-generated instrument photograph from the homepage instrument cards.
- Present trumpet, French horn, trombone, and euphonium with real, clearly licensed photographs from one visual family.
- Preserve the current white, navy, and brass editorial system without adding decorative treatments.
- Replace the disliked secondary homepage education photograph with a warmer academy-owned image.
- Keep that secondary frame easy to replace with the future Little Brass character without another layout rebuild.

## Instrument Image Sources

Use these Wikimedia Commons files:

- Trumpet: `Yamaha Trumpet YTR-8335LA crop.jpg`
- French horn: `Yamaha Horn YHR-667V.png`
- Trombone: `Yamaha Tenor trombone YSL-891Z (re-crop).jpg`
- Euphonium: `Yamaha Euphonium YEP-621 transparent.png`

All four images depict real Yamaha instruments. Their source pages identify Yamaha Corporation as the author or original source and license the files under Creative Commons Attribution-ShareAlike 4.0.

Downloaded derivatives will be stored as optimized WebP files under `public/static/images/instruments/real/`. Conversion, resizing, and any framing crop will be documented as modifications. The resulting image derivatives remain available under CC BY-SA 4.0; this does not relicense unrelated site code or academy photography.

## Instrument Card Layout

- Keep the existing four-column desktop grid and navy information band.
- Give every image the same warm-white media frame.
- Use `object-fit: contain`; no instrument may be cropped or distorted.
- Normalize optical scale with per-instrument positioning or sizing tokens because trumpet and trombone are horizontal while euphonium is vertical.
- Remove the oversized empty strip currently visible above some cards.
- Preserve legible Korean labels, short descriptions, and English instrument names.
- On mobile, keep the existing responsive card order and ensure every complete instrument remains visible.

## Homepage Education Story

- Keep the neutralized ensemble lesson photograph as the primary image.
- Replace `display-02.webp` with the real academy asset `award-ceremony-01.webp` as the smaller supporting image.
- Crop the supporting frame around the director and student so it reads clearly at its smaller size.
- Keep the existing navy vertical rule and right-hand copy ledger.
- Maintain a stable frame and a single image source in the component so the future character can replace the award photograph without markup or layout changes.

## Attribution

- Add one compact `사진 출처` disclosure in the site footer, not inside the four cards.
- Its expanded content must link each of the four Wikimedia Commons source pages and the CC BY-SA 4.0 license, identify Yamaha Corporation, and state that the site versions were resized and converted to WebP.
- Do not add attribution to academy-owned photographs.

## Verification

- Asset tests must reject the four previous AI image paths and require the four new licensed image paths.
- Tests must require the award-ceremony asset in the homepage education story and reject `display-02.webp` there.
- Tests must require a visible Yamaha/CC BY-SA attribution link.
- Run type checking, the complete test suite, the production build, and `git diff --check`.
- Visually verify the homepage at desktop and mobile widths, checking full-instrument visibility, equal visual weight, supporting-image crop, and footer credit legibility.

## Constraints

- Do not use AI image generation or AI image editing for these four instrument assets.
- Do not use Lazyweb.
- Do not alter `.superpowers/`.
- Do not push unless the user explicitly requests it.
- Preserve the current white, navy, and brass palette and the editorial type hierarchy.
