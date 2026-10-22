---
name: griasdi launch page
description: A night-plum room where pixel faces talk across a table, terracotta owns the action, and the server only ever sees noise.
colors:
  night: "#1c131d"
  night-raised: "#241926"
  night-lifted: "#2f2131"
  night-line: "#453248"
  ink: "#f6efe6"
  ink-soft: "#c3b9c9"
  ink-faint: "#9d93a6"
  terracotta: "#d9572b"
  terracotta-deep: "#a83e19"
  terracotta-light: "#f08a5d"
  on-terracotta: "#1b0c06"
  teal-voice: "#4fa3a5"
  teal-voice-light: "#7cc6c7"
  on-teal: "#0b1d1e"
  gold-taps: "#e0b04c"
  on-gold: "#2a1d05"
  lavender-model: "#9b8ac4"
  lavender-model-light: "#bcaee0"
  on-lavender: "#17121f"
  bubble-paper: "#f6efe6"
  bubble-text: "#241c2c"
  bubble-body-text: "#4a3f52"
  bubble-peach: "#f3d9cc"
  bubble-mint: "#d6ecec"
  code-well: "#0f0d14"
  code-well-line: "#2a2433"
typography:
  hero-word:
    fontFamily: "Baloo 2, Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "clamp(4.2rem, 9.2vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  display:
    fontFamily: "Baloo 2, Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 5vw, 3.9rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Baloo 2, Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Baloo 2, Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  lede:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "clamp(1.08rem, 1.35vw, 1.22rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 700
    lineHeight: 1.6
  button:
    fontFamily: "Baloo 2, Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.01em"
  speech:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.25
  measurement:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.82rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.02em"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.88rem"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "28px"
  face: "26%"
  full: "50%"
  speech: "1.1em"
  speech-tail: "0.3em"
spacing:
  xs: "0.45rem"
  sm: "0.6rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.2rem"
  gap: "clamp(1rem, 2.4vw, 2rem)"
  section: "clamp(5rem, 11vw, 9rem)"
  wrap: "1180px"
components:
  button-primary:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.on-terracotta}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0.72em 1.25em"
  button-primary-hover:
    backgroundColor: "{colors.terracotta-light}"
    textColor: "{colors.on-terracotta}"
  button-small:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.on-terracotta}"
    typography: "{typography.button}"
    rounded: "13px"
    padding: "0.55em 1em"
  button-big:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.on-terracotta}"
    typography: "{typography.button}"
    rounded: "20px"
    padding: "0.85em 1.5em"
  button-ghost:
    backgroundColor: "{colors.night-lifted}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0.72em 1.25em"
  button-ghost-hover:
    backgroundColor: "{colors.night-line}"
    textColor: "{colors.ink}"
  hero-word:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.on-terracotta}"
    typography: "{typography.hero-word}"
    rounded: "0.42em 0.42em 0.42em 0.1em"
    padding: "0.08em 0.32em 0.14em"
  speech-bubble:
    backgroundColor: "{colors.bubble-paper}"
    textColor: "{colors.bubble-text}"
    typography: "{typography.speech}"
    rounded: "{rounded.speech}"
    padding: "0.55em 0.85em"
  feature-bubble:
    backgroundColor: "{colors.bubble-paper}"
    textColor: "{colors.bubble-body-text}"
    typography: "{typography.body}"
    rounded: "1.3em"
    padding: "1rem 1.2rem 1.1rem"
  feature-bubble-peach:
    backgroundColor: "{colors.bubble-peach}"
    textColor: "{colors.bubble-body-text}"
  feature-bubble-mint:
    backgroundColor: "{colors.bubble-mint}"
    textColor: "{colors.bubble-body-text}"
  echo-bubble:
    backgroundColor: "{colors.teal-voice}"
    textColor: "{colors.on-teal}"
    rounded: "0.9em"
    padding: "0.3em 0.6em"
  face-tile:
    rounded: "{rounded.face}"
    size: "60px"
  server-node:
    backgroundColor: "{colors.night-lifted}"
    textColor: "{colors.ink-faint}"
    rounded: "22px"
    padding: "0.9rem 0.6rem 0.8rem"
    width: "9.5rem"
  ciphertext-packet:
    backgroundColor: "{colors.gold-taps}"
    textColor: "{colors.on-gold}"
    typography: "{typography.measurement}"
    rounded: "0.5em"
    padding: "0.18em 0.45em"
  sticker-voice:
    backgroundColor: "{colors.teal-voice}"
    textColor: "{colors.on-teal}"
    rounded: "1em 1em 1em 0.25em"
    padding: "0.5em 0.9em"
  sticker-share:
    backgroundColor: "{colors.gold-taps}"
    textColor: "{colors.on-gold}"
    rounded: "1em 1em 1em 0.25em"
    padding: "0.5em 0.9em"
  sticker-face:
    backgroundColor: "{colors.lavender-model}"
    textColor: "{colors.on-lavender}"
    rounded: "1em 1em 1em 0.25em"
    padding: "0.5em 0.9em"
  segmented-control:
    backgroundColor: "{colors.night-lifted}"
    textColor: "{colors.ink-soft}"
    rounded: "14px"
    padding: "4px"
  segmented-option-selected:
    backgroundColor: "{colors.lavender-model}"
    textColor: "{colors.on-lavender}"
    rounded: "{rounded.sm}"
    padding: "0.5em 0.95em"
  terminal-card:
    backgroundColor: "{colors.night}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  code-well:
    backgroundColor: "{colors.code-well}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "14px"
    padding: "1rem 1.1rem"
  tool-chip:
    backgroundColor: "{colors.night-lifted}"
    textColor: "{colors.gold-taps}"
    typography: "{typography.measurement}"
    rounded: "{rounded.sm}"
    padding: "0.35em 0.7em"
  vault-card:
    backgroundColor: "{colors.night-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "1.25rem"
  platform-card:
    backgroundColor: "{colors.night}"
    textColor: "{colors.ink}"
    rounded: "26px"
    padding: "1.5rem"
  file-tile:
    backgroundColor: "{colors.night-lifted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.8rem 1rem"
  file-tile-hover:
    backgroundColor: "#322a3e"
    textColor: "{colors.ink}"
  tape-mark:
    backgroundColor: "{colors.gold-taps}"
    textColor: "{colors.on-gold}"
    rounded: "3px"
    padding: "0.3em 0.8em"
  stamp:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.on-terracotta}"
    rounded: "8px"
    padding: "0.2em 0.55em"
  download-band:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.on-terracotta}"
---

# Design System: griasdi launch page

## Overview

**Creative North Star: "The Pixel Stammtisch"**

A Stammtisch is the regulars' table in a Bavarian pub: the same faces, the same chairs, talk that stays in the room. The page is that table at night. The ground is plum-black, the cast is the app's own 8x8 pixel faces (gsichtl 0.4.0, real generated data), and the people talk in speech bubbles cut from the same bubble-with-a-tail shape as the g mark. The server sits in the middle of the table and only ever sees scrambled hex; everything the page claims, it shows as a mechanism you can poke.

Three decisions carry the world. Terracotta (the g mark's colour) is the single action colour and is allowed to own whole bands, not just buttons. The three informational colours are borrowed from the product's audio diagram and keep their meaning on every surface: teal is voice, gold is taps and ciphertext, lavender is on-device models. Type is heavy and round for the voice of the cast (Baloo 2), humanist and highly legible for everything read at length (Atkinson Hyperlegible), and monospace only where the content is code, a measurement or ciphertext (JetBrains Mono).

Depth is physical but quiet: tonal night layers, soft dark drops with negative spread, and buttons that sit on a visible lip and press down. Motion is one shared stage clock (the hero table), spring pops for anything that arrives, and a rule that every animation is decoration over content that is already visible.

**Key Characteristics:**
- Plum-black ground (#1c131d), warm cream ink (#f6efe6), terracotta (#d9572b) as the only action colour.
- Semantic accents: teal = voice, gold = taps and ciphertext, lavender = on-device models. Never decorative.
- Pixel faces at integer scale, always square pixels, rounded to 26%.
- Speech bubbles as the universal container for human words; features are lines the cast says.
- Heavy rounded display (Baloo 2, 800), legible body (Atkinson Hyperlegible), mono for code and measurements only.
- Tilted stickers, tape and a stamp as small hand-placed marks; everything else sits on a calm grid.

## Colors

A night-plum room with one warm lamp: cream ink on dark plum, terracotta as the action, three small accent lights that always mean the same thing.

### Primary
- **Terracotta Mark** (terracotta): the g mark and the action colour: primary buttons, the greeting word, the stickers, text selection and caret, the download band as a full-bleed ground. Light and deep variants are the hover face and the button lip (terracotta-light, terracotta-deep). Text on it is the near-black brown on-terracotta, never ink.

### Secondary
- **Voice Teal** (teal-voice, teal-voice-light): voice. The speaking ring around a face, the echo bubbles, the voice lines and pulses in the pipeline diagram, the voice fact icons, the waveform's kept speech. The light variant is for text and pulses on dark.

### Tertiary
- **Tap Gold** (gold-taps): transcripts, taps and what the server holds. The ciphertext packets, the "server sees" readout, the encrypted-state toggle, the key section's headline and icons, the MCP tool chips, the dashed server node, the "your system" tape.
- **Model Lavender** (lavender-model, lavender-model-light): on-device models. The ruled model list and its headline, the noise-level selector, the model node in the diagram, code keywords. Light variant for text.

### Neutral
- **Night** (night): page ground, deep cards (terminal, platform, noise panel).
- **Night Raised** (night-raised): alternate bands, the table face, the vault card.
- **Night Lifted** (night-lifted): server node, ghost button, file tiles, segmented control and chip grounds.
- **Night Line** (night-line): 1-2px borders, dashed table ring, scrollbar thumb, tick rim.
- **Ink** (ink): headlines and primary text. **Ink Soft** (ink-soft): body copy. **Ink Faint** (ink-faint): captions, pronunciation, code comments.
- **Bubble Paper / Bubble Text / Bubble Body Text** (bubble-paper, bubble-text, bubble-body-text): the light surface of a speech bubble and its two dark plum text colours.
- **Bubble Peach / Bubble Mint** (bubble-peach, bubble-mint): the two tinted bubble variants used in feature chat lines.
- **Code Well / Code Well Line** (code-well, code-well-line): the sunken ground and hairline of code blocks.
- **On-teal / On-gold / On-lavender**: the near-black tinted text colours that sit on each accent's fill.

### Named Rules
**The Audio Diagram Rule.** The accent colours keep the roles they have in the product's audio diagram: teal voice, gold taps and ciphertext, lavender on-device models. A new element picks its accent by what it is, never by what looks good beside it.

**The Terracotta Owns Bands Rule.** Terracotta is the action colour and may fill a whole band (the download section) or a whole object (button, greeting word, sticker). It is never a thin line, a border accent or a text highlight on a dark section; on dark ground its light variant carries links and small text.

**The Dark Ink Rule.** Text on a bright fill (terracotta, teal, gold, lavender, bubble paper) uses that fill's own near-black on-colour, never pure black and never cream.

## Typography

**Display Font:** Baloo 2 (fallback Atkinson Hyperlegible, system-ui, sans-serif), variable 400-800, self-hosted woff2.
**Body Font:** Atkinson Hyperlegible (fallback system-ui, sans-serif), 400, 400 italic, 700, self-hosted woff2.
**Label/Mono Font:** JetBrains Mono (fallback ui-monospace, monospace), 400-700, self-hosted woff2.

**Character:** Baloo 2 is the voice of the cast: fat, round, friendly at 800. Atkinson Hyperlegible carries every sentence a person has to read, chosen for its distinct letterforms. All three are SIL OFL 1.1 (fonts/OFL.txt).

### Hierarchy
- **Hero word** (800, clamp(4.2rem, 9.2vw, 6rem), 0.9, -0.035em): the lowercase "griasdi" in a terracotta bubble, tilted -2deg, once.
- **Display** (800, clamp(2.3rem, 5vw, 3.9rem), 1.05, -0.02em): section headings (h2); balanced wrap.
- **Headline** (800, clamp(1.7rem, 3.2vw, 2.6rem), 1.08): the hero's spoken line, max 14ch.
- **Title** (800, 1.3rem, 1.2, -0.01em): h3 inside bubbles, model rows, terminals; platform names go to 1.7rem.
- **Body** (400, 1.0625rem, 1.6): running copy in ink-soft; section lead 1.15rem, up to 62ch; model descriptions 58ch; bubble copy 46ch.
- **Label** (700, 0.98rem): navigation links and segmented options in Atkinson; button text is Baloo 2 at 800, 1.05rem, 0.01em.
- **Speech** (700, 1rem, 1.25): the text inside a hero or echo bubble.
- **Measurement** (JetBrains Mono 600, 0.82rem, 0.02em): the "server sees" hex readout, ciphertext packets, tool chips, diagram specs.
- **Code** (JetBrains Mono 400, 0.88rem, 1.65): real CLI and MCP snippets only.

### Named Rules
**The Mono Is Evidence Rule.** Monospace appears only where the content is code, a measurement or ciphertext. Prose, labels and headings are never set in mono to look technical.

**The Hello Rule.** The product name is always lowercase, in Baloo 2, and the pronunciation note beneath it is quiet (ink-faint, 0.95rem).

## Layout

One calm 1180px column (--wrap) inside a fluid side gap (clamp(1rem, 2.4vw, 2rem)); the nav and hero widen to 1320px. Sections are separated by --section (clamp(5rem, 11vw, 9rem)) of vertical air, and alternate between the plain night ground and a night-raised band bounded by hairlines. The first viewport is a two-column hero, greeting and offer on the left (1fr) and the table on the right (1.08fr); below 900px it stacks with the table second.

Inside sections the layouts are asymmetric by content: a sticky heading beside a ruled list (models, 0.9fr / 1.1fr), a heading beside a vault card (keys, 1fr / 1fr), a two-column chat-line grid that alternates face side (features), two terminal cards side by side (developers, 1.25fr / 1fr), and three platform cards (1.35fr / 1fr / 1fr). Gaps cluster at .6, 1, 1.5 and 2.2rem; sections use clamp-based gaps up to 5rem. Breakpoints: 900px (hero, smarts, keys, platforms stack, nav links hide), 860px (developers), 820px (voice facts), 760px (feature grid), 700px (diagram swaps to vertical, stickers hide, download head stacks), 520px (selector tightens).

The hero table is a square (max 660px, never taller than 100svh minus 12rem) with five faces seated on a ring around a central server node; the ring, rim ticks and seat positions are all percentages of the square.

### Face sizing
A gsichtl face is 10 units across (8 cells plus a margin). Faces are always rendered at multiples of 10 px so every pixel is square: 40px (chat lines), 60px (feature lines), 70px (peek, download cast), 90px (roll-a-face), and hero seats between 70 and 120px in steps of 10, set by script from the table's width. The one exception is the 50px download cast on narrow screens.

## Elevation & Depth

A hybrid of tonal layering and soft physical drops. Surfaces step up through night, night-raised and night-lifted; shapes that sit on the table cast a soft, dark, negatively spread shadow straight down (for example `0 10px 22px -10px #000` under a face, `0 10px 24px -12px #000` under a bubble, `0 40px 70px -40px #000` under the vault and screenshot frames). On the terracotta band, cards use a warm brown drop (`0 30px 50px -28px #3b1205`). Active states are shown by state-as-mark, not by lighting: a gold ring on the busy server, a teal ring on the speaking face. The sticky nav is a translucent dark plum (82% opacity) with a 12px blur and gains a hairline on scroll.

### Named Rules
**The Soft Drop Rule.** Resting depth is a dark, blurred, negatively spread drop or a tonal step, nothing else. Do not add glows, coloured halos or gradients as depth.

**The Pressable Lip Rule.** Only buttons carry a visible lip (a deeper-colour edge under the key) and they move toward it when pressed. Cards, bubbles and panels do not get a lip.

## Shapes

The form language is the g mark's bubble: a rounded body with one tighter corner and a small triangular tail. Every human word sits in that shape: speech bubbles (1.1em radius, 0.3em on the tail corner), feature bubbles (1.3em / 0.35em), the hero word (0.42em / 0.1em), the stickers (1em / 0.25em). Tails are CSS triangles (`clip-path: polygon`) in the same colour as the bubble. Containers are generously rounded: 10px chips and nav links, 16px buttons and tiles, 20-28px for cards and panels. Faces are 26% rounded squares with crisp pixel edges. Dashed outlines mark things that are not real yet or not readable by the server (the table ring, the server node in the diagram, the "coming soon" box).

## Components

### Buttons (pressable lip)
Chunky keys that sit on a lip and press down.
- **Shape:** 16px radius (13px small, 20px big); Baloo 2 800, 1.05rem, 0.01em; icon gap .55em.
- **Primary:** terracotta key, on-terracotta text, padding .72em 1.25em, lip of terracotta-deep 5px high.
- **Hover:** lifts 2px, face becomes terracotta-light, lip grows to 7px. **Active:** travels 4px down onto a 1px lip. **Focus:** 3px terracotta-light outline at 3px offset.
- **Ghost:** night-lifted key with ink text and a near-black lip; hover brightens to night-line.
- **Small (nav) / Big (hero):** .55em 1em at .95rem / .85em 1.5em at clamp(1.15rem, 1.6vw, 1.35rem).

### Speech bubbles (g-bubble)
Cream paper bubble with bubble-text ink and a tail at the lower corner; a right-seated speaker mirrors the tail. They pop in with a spring (scale .2, rotate -8deg, overshoot 1.06) and leave with a 200ms shrink. The echo bubble is the same shape in teal with on-teal text and shows what the receiving face hears.

### Face tiles (gsichtl)
Inline SVG with `shape-rendering: crispEdges`, 26% radius, soft drop. Sizes in multiples of 10 px (see Layout). Blinking is eyes swapping to the lid colour for 140ms. Clicking a hero face makes it talk; the roll button in the key section tumbles a new face in with a spring.

### Stickers and marks
- **Stickers:** terracotta, teal, gold and lavender bubble-shaped labels on the screenshot, tilted -3 to 3deg, straightening and growing on hover; hidden below 700px.
- **Tape:** a small gold rectangle (3px radius, tilted 4deg) pinned to the top edge of the visitor's platform card.
- **Stamp:** a bordered, uppercase terracotta label tilted -14deg on the "coming soon" box, 3px on-terracotta border, 8px radius, .08em tracking.

### Cast chat-line features
Each feature is a line said by a face: a 60px face beside a feature bubble, alternating sides in a 4-item rhythm, every third bubble tinted peach or mint, faces tilted -4 and 4deg alternately. The bubble holds an h3 title and a short paragraph in bubble-body-text.

### Ruled model list
Models are not cards: rows separated by 2px lavender rules (40% alpha) with a lavender title and ink-soft description. A tap-type entry takes gold titles. The heading is lavender and sticks beside the list on wide screens; a peek line (70px face plus bubble) closes the intro.

### Terminal cards and code
24px night cards with a terracotta-light icon, ink title and a sunken code well (14px, JetBrains Mono .88rem, syntax colours: faint comments, terracotta-light prompt, lavender-light keywords, teal-light strings). MCP tool names are gold mono chips.

### Controls
- **Segmented control:** night-lifted track, 14px radius, 4px padding; the selected option is lavender with on-lavender text.
- **Toggle switch:** 2.8rem track; on, it turns gold with the knob sprung across (.35s spring). The chat beneath flips between readable text and gold mono ciphertext.

### Table, server node and packets
The server node is a night-lifted 22px card with the server icon and a gold mono "sees" readout; it gets a gold ring and halo while busy. Ciphertext packets are gold mono chips travelling from a speaker to the node and on to each listener.

### Navigation
Sticky, 4.25rem high, a slightly darker plum (rgb(22 19 29) at 82%, not exactly night) with a 12px blur; brand mark rotates -12deg and scales on hover with a spring; links are 700 .98rem ink-soft with a night-lifted hover chip; links hide below 900px, leaving the small primary button.

### Download band
The terracotta band is a whole section: on-terracotta text, links underlined in on-terracotta, a row of the five cast faces hopping in sequence, and three night platform cards (primary system first, 1.35fr) holding file tiles (night-lifted, 1.5px night-line border, terracotta-light border on hover) with a checksum line beneath.

### Motion
- **Easing tokens:** ease-out `cubic-bezier(.16, 1, .3, 1)` for settling movement; spring `cubic-bezier(.34, 1.56, .64, 1)` for anything that pops, tilts or presses.
- **Hero table:** one shared conversation clock. A face speaks (teal ring pulses at .5s), its bubble springs in (420ms), a gold packet travels to the server (hex readout, gold ring) and onward to the listeners who nod (.5s spring), then everything fades after about 2.6 to 2.9s. Idle faces bob (3.2s). The table talks on its own every 3.6s while visible, and on click.
- **Arrivals:** the hero word waves in (1.6s spring), the hero copy rises with blur over .9s staggered by .12s; sections reveal with a 26px rise over .8s once seen.
- **Ambient:** the download cast hops every 2.4s staggered .18s; the dashed ciphertext line in the pipeline marches; the waveform runs a looping synthetic signal.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, hero entry, reveal rises, the download hop and smooth scrolling are off; content is visible by default and only hidden when script and motion are both allowed, so nothing depends on animation to be readable. Script-driven bubbles leave in 1ms.

## Do's and Don'ts

### Do:
- **Do** use terracotta (#d9572b) for the action and let it fill whole bands and objects; put on-terracotta (#1b0c06) text on it.
- **Do** colour by meaning: teal for voice, gold for taps and ciphertext, lavender for on-device models.
- **Do** put words that a person or the product "says" in the g-bubble shape with a tail, and give features a face to speak them.
- **Do** render gsichtl faces at multiples of 10 px with `crispEdges` and 26% radius.
- **Do** set Baloo 2 at 800 for display, buttons and names; Atkinson Hyperlegible for everything read; JetBrains Mono only for code, measurements and ciphertext.
- **Do** make pressable things travel on their lip and pop with the spring easing; keep every animation optional.
- **Do** use ink-soft (#c3b9c9) for body copy and ink-faint (#9d93a6) only for captions and comments.

### Don't:
- **Don't** use pure black or pure white; the darkest is night (#1c131d), the lightest is ink (#f6efe6).
- **Don't** use a card for every list: models are ruled rows, features are chat lines.
- **Don't** put a lip or a hard edge under anything but a button, and don't reuse a button's lip as a card shadow.
- **Don't** colour decoratively with teal, gold or lavender; each belongs to its meaning.
- **Don't** set prose, labels or headings in monospace to look technical.
- **Don't** hide content behind an animation: everything must be readable with scripts off or motion reduced.
- **Don't** scale faces to arbitrary sizes or smooth their pixels.
