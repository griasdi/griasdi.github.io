// Shared by every page: the gsichtl faces (faces.js), their blinking, and the nav hairline.
(() => {
  "use strict";

  const FACES = (window.GSICHTL && window.GSICHTL.faces) || [];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const SVG = "http://www.w3.org/2000/svg";
  const EYE = new Set(["#ffffff", "#11151c"]);

  // ---------- faces (real gsichtl cells, see faces.js) ----------

  function faceElement(index) {
    const data = FACES[((index % FACES.length) + FACES.length) % FACES.length];
    const wrap = document.createElement("span");
    wrap.className = "face";
    if (!data) return wrap;
    const s = data.s;
    const svg = document.createElementNS(SVG, "svg");
    svg.setAttribute("viewBox", `-1 -1 ${s + 2} ${s + 2}`);
    svg.setAttribute("aria-hidden", "true");
    const bg = document.createElementNS(SVG, "rect");
    bg.setAttribute("x", "-1"); bg.setAttribute("y", "-1");
    bg.setAttribute("width", String(s + 2)); bg.setAttribute("height", String(s + 2));
    bg.setAttribute("fill", data.bg);
    svg.appendChild(bg);
    const colorAt = (x, y) => {
      const ch = data.g[y * s + x];
      return ch === "." || ch === undefined ? data.bg : data.p[ch.charCodeAt(0) - 97];
    };
    const eyes = [];
    for (let y = 0; y < s; y++) {
      for (let x = 0; x < s; x++) {
        const ch = data.g[y * s + x];
        if (ch === ".") continue;
        const fill = data.p[ch.charCodeAt(0) - 97];
        const r = document.createElementNS(SVG, "rect");
        r.setAttribute("x", String(x)); r.setAttribute("y", String(y));
        r.setAttribute("width", "1.02"); r.setAttribute("height", "1.02");
        r.setAttribute("fill", fill);
        svg.appendChild(r);
        if (EYE.has(fill)) {
          // A closed eye takes the colour above it (the brow or skin).
          let lid = data.bg;
          for (let yy = y - 1; yy >= 0; yy--) {
            const c = colorAt(x, yy);
            if (!EYE.has(c)) { lid = c; break; }
          }
          eyes.push([r, fill, lid]);
        }
      }
    }
    wrap.appendChild(svg);
    wrap._blink = () => {
      if (!eyes.length) return;
      eyes.forEach(([r, , lid]) => r.setAttribute("fill", lid));
      setTimeout(() => eyes.forEach(([r, open]) => r.setAttribute("fill", open)), 140);
    };
    return wrap;
  }

  function fillSlot(slot, index) {
    slot.replaceChildren(faceElement(index));
    slot.dataset.face = String(index);
  }

  document.querySelectorAll(".face-slot[data-face]").forEach((slot) => fillSlot(slot, Number(slot.dataset.face)));
  document.querySelectorAll(".dl-cast .face-slot").forEach((el, i) => el.style.setProperty("--i", String(i)));

  // Everyone blinks now and then, never all at once.
  setInterval(() => {
    if (document.hidden || reduced.matches) return;
    const all = document.querySelectorAll(".face");
    const f = all[Math.floor(Math.random() * all.length)];
    if (f && f._blink) f._blink();
  }, 700);

  // ---------- nav hairline ----------

  const top = document.querySelector(".top");
  if (top) {
    const onScroll = () => top.classList.toggle("scrolled", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  Object.assign(window.GSICHTL = window.GSICHTL || { faces: [] }, { face: faceElement, fill: fillSlot });
})();
