# Product

<!-- impeccable:product-schema 1 -->

griasdi's product truth (users, purpose, positioning, operating context,
capabilities, brand commitments, evidence, principles, accessibility) is the
app repository's `PRODUCT.md` (`griasdi/griasdi`, checked out next to this
repository as `../griasdi`). Read it first; this file holds only what is
specific to the launch site. Paths outside `site/` (`design/`, `docs/`,
`crates/`, `AGENTS.md`) are in the app repository.

## Platform

web

## Stack

Static HTML, CSS and JavaScript without a build step. The join page is
`site/join/`, the app's `JOIN_PAGE` (https://griasdi.github.io/join).
GitHub Pages publishes `site/` at https://griasdi.github.io/ on every push to
`main` (`.github/workflows/pages.yml`).

## Capabilities and Constraints

- Downloads: Linux (AppImage and tar.gz, x86_64 and ARM64), Windows (setup,
  zip), macOS Apple Silicon (dmg, macOS 14+). Downloads are the newest build of
  the update files, read live from `griasdi.doodleshnookie.net/updates`
  (`site/downloads.js`).
- Self-hosted Linux server: `site/server/` offers its tar.gz (x86_64, ARM64)
  from the newest build of the update files (`site/release.js`) and documents
  installing, setting up, configuring and updating it, from the app
  repository's README and `crates/griasdi-server`.
- Bots: spezl lives in `spezl/` of the griasdi repository and is published as
  a binary for Linux (x86_64, ARM64) with every griasdi build, through the
  update manifest's `tools`; `site/bots/` offers it from there
  (`site/downloads.js`) and through `site/bots/install.sh` (`curl … | sh`,
  newest build, SHA-256 checked, into `~/.local`, no system packages; the
  page lists those per distribution). The Python and TypeScript SDKs are
  MIT-licensed packages on PyPI (`spezl`) and npm (`@griasdilabs/spezl`);
  their source and the example bots are public in griasdi/spezl-sdk on
  GitHub; `site/bots/` links it, documents the SDKs and the `spezl serve`
  JSON-RPC protocol (the public protocol reference), never the Rust crate or
  the spezl source.
- Features: `site/features/` explains every feature with its specs (codecs,
  bitrates, buffers, keys, models, local API), taken from the app's code and
  docs, and names what griasdi doesn't do yet. Every page carries the same
  nav (Features, Server, Bots, Download); About and Privacy are in the footer.
- Site copy in English.
