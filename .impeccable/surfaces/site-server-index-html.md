---
version: 1
slug: "site-server-index-html"
primary_target: "site/server/index.html"
related_targets: ["site/bots/index.html"]
---

## Scope
Server (site/server/) and Bots (site/bots/), the technical guides of the launch site. Mode: Read.
Audience: people hosting griasdi for their crew on Linux; developers writing bots with spezl in Python or TypeScript.
Proof: real commands, config keys and defaults from griasdi's README and crates/griasdi-server; real SDK API, CLI and serve protocol from spezl's README.
Constraints: English; server and spezl builds "coming soon" (dashed release box with the terracotta stamp); spezl is closed source, binary only: no Rust crate, no source paths, no examples folder; SDK distribution unspecified beyond "comes with the spezl release".

## Direction contract
THESIS: Guides as the table's own mechanics: a scene from the hero (server node seeing hex, a bot answering a mention) above a reading column of steps, code wells and ruled reference rows; refuses the generic docs-site sidebar template.
OWN-WORLD: The launch page's world unchanged: night-plum ground, terracotta stamp and links, gold only for what the server holds, gsichtl faces and g-bubbles for people, mono only for code.
STORY: What it is; what you need; numbered setup; reference (config keys / CLI, events, SDK API); the hard truths (what the server sees, hidden is not secret).
FIRST VIEWPORT: Title, lede, coming-soon box; right: Server shows face → dashed gold server node → teal echo; Bots shows a mention and the bot's reply with its b07b id.
FORM: Privacy's document frame (doc.css: head, sticky contents rail, 46rem column) plus guide.css: steps with bubble-shaped numbers, labelled code wells, ruled .ref rows, protocol tables.
SIGNATURE: The relay scene and the HelloBot thread, both real behaviour.
seed: none (pages inside an established world, not rolled)
