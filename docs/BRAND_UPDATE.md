# AZALI brand update

## Palette

Final refined palette:

| Token | Hex | Usage |
|---|---:|---|
| Parchment | `#F2EBD6` | Base background |
| Sand | `#C4A06E` | Warm secondary surface |
| Leather | `#896038` | Body contrast, leather notes |
| Garnet | `#871A3B` | Primary accent, desire, calls to action |
| Indigo | `#2C1268` | Secondary accent, origin labels, identity moments |
| Umber | `#271509` | Deep text, footer, grounding |

Garnet carries the commercial warmth. Indigo is intentionally used more sparingly for category/origin cues and identity storytelling.

## Typography

Chosen set: Legacy & Luxury.

- Headings: Playfair Display
- Body/UI: Montserrat
- Arabic fallback: Amiri

These are implemented through `next/font/google` in `src/app/layout.tsx` and wired in `tailwind.config.ts`.

## Corners

The previous very rounded style was reduced to smaller radii:

- Cards: `rounded-xl`
- Inputs: `rounded-lg`
- Buttons: `rounded-md`
- True circular elements only where needed, such as logo mark, color swatches, and cart count.
