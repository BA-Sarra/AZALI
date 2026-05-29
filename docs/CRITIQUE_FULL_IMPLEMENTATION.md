# AZALI Critique Full Implementation Pass

This pass applies the PDF critique section by section, not only the first-priority items.

## Navigation
- Removed the ambiguous plus/logomark beside AZALI and kept the spaced serif wordmark.
- Shortened the artist nav item to `The Artist` / `L'artiste`.
- Removed the SaaS-style cart box and kept icon + text + count with a slim hover underline.
- Made the language switcher visually match the navigation system.
- Added active-page indigo underlines.
- Added a mobile horizontal nav so public navigation is accessible on small screens.

## Hero
- Kept the hero image/video full-bleed with a dark umber overlay.
- Reduced the hero from full viewport to approximately two thirds of the screen.
- Made the eyebrow a visible indigo-on-parchment label.
- Styled the secondary CTA as a proper ghost CTA.
- Added a ticker/marquee between hero and content.

## Homepage categories
- Replaced the symmetrical grid with editorial asymmetry: one large card plus two stacked smaller cards.
- Removed product-count badges.
- Rewrote category descriptions into evocative brand lines.
- Kept card hover states strongly garnet.

## Philosophy
- Turned the philosophy block into a real editorial section, not a card.
- Added the Arabic watermark and garnet vertical rule for visual anchoring.
- Enlarged and clarified the `Consume better` link.

## Product page
- Removed native product-select controls from the customer product flow.
- Extended pill-button interaction to colors, thread/options, notebook content, charm count, and Boolean choices.
- Styled text inputs and charm textarea with sand borders, parchment background, and controlled resize.
- Replaced quantity number input with garnet +/- controls.
- Made the image column sticky and added secondary image slots.
- Separated price, quantity, shipping policy, and add-to-cart into clear rows.
- Added the unrepeatable leather-drop notice below the color selector.
- Added visible shipping/returns info above Add to Cart.
- Kept notebook pricing based on the updated +10, +10, then +5 charm increment logic.

## Leather Ethics
- Kept the strong CTA title on the page: `Consume better. Choose true leather.`
- Kept the menu label as `Leather Ethics` / `Éthique`.
- Split the text into subheaded manifesto sections.
- Added alternating garnet/indigo left borders.
- Added oversized sand number watermarks.
- Added a related image to the first offcuts card.

## Meet the Artist
- Reworked into a dark, full-width hero with workshop imagery.
- Renamed the visual title away from generic CMS wording.
- Added alternating image/text story sections.
- Kept large italic pull quotes.
- Added a dark pull-quote moment.

## Contact
- Removed the developer/admin placeholder text.
- Added a human intro sentence.
- Added Instagram as a fourth contact card.
- Standardized card borders with the sand border system.

## Global system
- Established the color rule: labels/eyebrows are indigo; prices, CTAs, active states, and selected options are garnet.
- Added alternating off-white sections to reduce parchment monotony.
- Added Instagram/social proof previews before the footer.
- Added newsletter capture before the footer for limited drops.
- Preserved the dark umber footer for contrast.

## Functional follow-through
- Added a `NewsletterSubscriber` Prisma model.
- Added `/api/newsletter` to save newsletter emails to the database.
- Replaced the visual-only newsletter block with a functional client component.
