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
- Self-hosted Linux server: the site may say "coming soon" and nothing more.
- Site copy in English.
