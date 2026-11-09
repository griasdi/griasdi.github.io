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
- Self-hosted Linux server: builds are "coming soon"; `site/server/` documents
  installing, setting up, configuring and updating it, from the app
  repository's README and `crates/griasdi-server`.
- Bots: spezl (the `spezl` repository, checked out next to this one as `../spezl`) is
  closed source and released as a binary only, "coming soon". `site/bots/`
  documents the Python and TypeScript SDKs and the `spezl serve` JSON-RPC
  protocol; never the Rust crate or the spezl source. How the SDKs are
  distributed is open: the site says only that they come with the spezl
  release.
- Site copy in English.
