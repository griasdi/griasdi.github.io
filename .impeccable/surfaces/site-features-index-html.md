---
version: 1
slug: "site-features-index-html"
primary_target: "site/features/index.html"
related_targets: []
---

## Scope
Features in detail (site/features/), the launch site's spec page. Mode: Read.
Audience: game streamers deciding whether griasdi carries their stream and their crew; developers checking what runs underneath.
Proof: real numbers from the app's code and docs (encoder.rs, limits.rs, docs/ARCHITECTURE.md, docs/streaming.svg, README, spezl/README.md); one illustrative stats overlay labelled as example values.
Constraints: English; short per feature, not a manual; limits named openly where they touch streamers (30 fps ceiling, media sender proof); proprietary; no product comparisons; links to the server and bot guides for depth.
Site navigation: one global nav on every page (Features, Server, Bots, Download); About and Privacy in the footer; below 900px the links sit in a second row.

## Direction contract
THESIS: Every feature speaks twice: a face says what you get in one bubble, and beside it the ruled spec rows say how. Refuses the icon-card feature grid and the endless comparison table.
OWN-WORLD: The launch page's world unchanged: night-plum ground, cream bubbles with tails, gsichtl faces at 60px, ruled rows in night-line, mono only for measurements, accents by meaning (teal voice, gold ciphertext and the server, lavender models).
STORY: What griasdi does, feature by feature; the numbers behind each; what it doesn't do yet; where to go deeper (server, bots, download).
FIRST VIEWPORT: Title and lede left, a screen-share frame with the viewer's stats overlay right (example values); below, the contents rail and the first feature, Screen sharing.
FORM: The guides' document frame (doc.css head, sticky contents rail) with a wider body: each section is an h2 above a split, bubble left (0.8fr), spec rows right (1.2fr); stacks below 1000px.
SIGNATURE: The stats overlay in the head, the same readout a viewer opens in the app.
seed: 53101dfac035d22cbdd2f58c13694ae9 (structure "two voices per feature")
