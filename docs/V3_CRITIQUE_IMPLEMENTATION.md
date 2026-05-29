# AZALI V3 Critique Implementation

This pass applies the remaining improvements from `azali_critique_v2.pdf`.

Implemented:

- Replaced the full garnet card flip with a calmer premium hover: lift, soft shadow, title turns garnet, image stays visible.
- Increased product color swatches to 18px with stronger borders and kept title tooltips.
- Changed public product grids from 4 columns to 3 columns on desktop.
- Updated active navigation state to garnet while keeping the indigo underline.
- Replaced the mobile horizontal nav bar with a hamburger drawer.
- Increased hero height to 78 to 80vh.
- Fixed hero secondary CTA hover so it fills garnet instead of fading.
- Removed `backdrop-blur` from the base `.card` class for better mobile scroll performance.
- Added an origin-label eyebrow to the related products section.
- Changed the price label in the add-to-cart panel to use the standard `.label` style.
- Moved the ethics image out of card 01 and placed it as a full-width visual between intro and cards.
- Made the Contact Instagram card a real clickable link and changed the contact grid to 2 columns on desktop.
- Added a dark “Why AZALI” / “Pourquoi AZALI” three-reason brand statement section on the homepage.
- Added an “All pieces” section to the products page so visitors can browse every product without entering each category.
- Removed the full Amiri font load and replaced the watermark styling with the existing display stack/system fallback.
- Added dynamic root `lang` handling through middleware request headers.
- Updated seed product descriptions, materials, dimensions, and lead-time copy to be less placeholder-like and more brand-aligned.
- Switched the Logo component to use the SVG assets from `/public/brand`.

Still dependent on owner assets:

- Real product photography.
- Final verified logo files, if the current SVGs are not final.
- Exact product dimensions and material details for each real product.
