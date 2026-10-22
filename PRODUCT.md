# Product

<!-- impeccable:product-schema 1 -->

Paths outside `site/` (`design/`, `docs/`, `crates/`, `AGENTS.md`) are in the app repository `griasdi/griasdi`.

## Platform

web (the launch site in `site/`); the product itself is a native desktop app
(iced) for Linux, Windows and macOS on Apple Silicon.

## Stack

Launch site: static HTML, CSS and JavaScript without a build step, like the
join page (`web/join/` in `griasdi/griasdi`). GitHub Pages publishes `site/`
at https://griasdi.github.io/ on every push to `main`
(`.github/workflows/pages.yml`).

## Users

Gamers who sit in voice with their group for hours, technical people and IT
professionals who care what runs underneath, and long-time users of classic
self-hosted voice servers who want that again without giving up modern chat.

## Product Purpose

griasdi is end-to-end encrypted chat and voice for communities: a desktop app
and independent servers. Text channels, voice channels, calls, direct
messages, screen sharing and file transfers, all encrypted on the device;
the server stores and forwards ciphertext only.

## Positioning

- Security at the current state of the art as the only path: MLS (RFC 9420)
  for text, SFrame (RFC 9605) with MLS-derived keys for voice and screen,
  over QUIC (weida). No accounts: a user is a key pair on the device.
- Easy to use: set up, invited and talking with a link and a few clicks.
- On-device models in many places, run on griasdi's own inference engine
  (`griasdi-infer`): noise suppression (RNNoise, DPDFNet), speech detection
  (voice activity model), live transcripts (Nemotron ASR, opt-in, GPU),
  spoken cues (Supertonic 3, opt-in). Nothing runs on the server.
- Features for developers: MCP server for AI agents (local, token-protected,
  off by default), headless remote control of the real app.
- Self-hosted Linux server: exists in the codebase, not offered yet; the
  site may say "coming soon" and nothing more.

## Capabilities and Constraints

- Voice engine: 48 kHz mono, 10 ms blocks, 20 ms Opus frames, echo
  cancellation, adaptive gain, noise model, transmit gate, jitter buffers per
  speaker (`docs/audio.svg`).
- Screen sharing in AV1, with sound, into a call or a text channel
  (`docs/streaming.svg`); YouTube player; peer transfers for large files in
  1 MiB pieces from several members.
- Self-updating apps; pixel avatars (gsichtl) for everyone without a picture.
- Downloads: Linux (deb, rpm, AppImage, tar.gz), Windows (setup, zip), macOS
  Apple Silicon (dmg, macOS 14+). Download URLs are not decided: the site
  uses clearly marked placeholders.
- Proprietary software (LICENSE); never call it open source.

## Brand Commitments

- Name always lowercase: griasdi (Bavarian "Grüß dich", hello to you).
- Mark: the g bubble (`crates/griasdi-desktop/assets/logo/mark.svg`), terracotta
  `#D9572B` / dark `#A83E19` / light `#F08A5D`, near-black ground `#1F1F1F`
  (`design/logo/README.md`).
- Site copy in English.
- Never name or compare with another chat or voice product, never use another
  product's brand colors or marks (AGENTS.md).

## Evidence on Hand

- App screenshot: `design/hero.png` (WebP data, 2560x1600, synthetic demo
  community "Stammtisch").
- Audio stack diagram: `docs/audio.svg`.
- Screen streaming stack diagram: `docs/streaming.svg`.
- No testimonials, user numbers, benchmarks or press: do not invent them.

## Product Principles

1. Security and ease of use carry the same weight; the secure path is the
   only path.
2. The server never sees plaintext and runs no content features.
3. Intelligence runs on the user's device.
4. Show the real mechanism instead of claiming it.
