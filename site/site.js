// Shared by every page: the gsichtl faces (faces.js), their blinking, the nav hairline, the guide tabs and the contents rail.
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

  // ---------- tabs (server guide): groups sharing data-tabs switch together ----------

  function selectTab(group, value, anchor) {
    const before = anchor ? anchor.getBoundingClientRect().top : 0;
    document.querySelectorAll(`.tabs[data-tabs="${group}"] [role="tab"]`).forEach((tab) => {
      const on = tab.dataset.tab === value;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
    });
    if (anchor) scrollBy({ top: anchor.getBoundingClientRect().top - before, behavior: "instant" });
  }

  document.querySelectorAll(".tabs[data-tabs]").forEach((box) => {
    const group = box.dataset.tabs;
    const list = box.querySelector('[role="tablist"]');
    if (!list) return;
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    list.hidden = false;
    box.classList.add("is-on");
    const current = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
    selectTab(group, current.dataset.tab);
    list.addEventListener("click", (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (tab) selectTab(group, tab.dataset.tab, list);
    });
    list.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const to = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      selectTab(group, tabs[to].dataset.tab, list);
      tabs[to].focus();
    });
  });

  // ---------- contents rail (document pages): mark the section being read ----------

  const tocLinks = [...document.querySelectorAll('.toc a[href^="#"]')];
  const tocTargets = tocLinks.map((a) => document.getElementById(a.hash.slice(1)));
  if (tocLinks.length && tocTargets.every(Boolean)) {
    let current = -1;
    // A clicked entry stays marked until the reader scrolls themselves: a section near
    // the end may not reach the reading line, and the spy would mark its neighbour.
    let pinned = -1;
    const mark = (i) => {
      if (i === current) return;
      if (current >= 0) tocLinks[current].removeAttribute("aria-current");
      if (i >= 0) tocLinks[i].setAttribute("aria-current", "location");
      current = i;
    };
    const spy = () => {
      if (pinned >= 0) return mark(pinned);
      // The last section whose top has passed a line a third down the window;
      // at the very bottom the last one, which may be too short to reach it.
      const line = innerHeight / 3;
      let i = -1;
      tocTargets.forEach((el, j) => { if (el.getBoundingClientRect().top <= line) i = j; });
      if (i >= 0 && innerHeight + scrollY >= document.documentElement.scrollHeight - 2) i = tocTargets.length - 1;
      mark(i);
    };
    tocLinks.forEach((a, i) => a.addEventListener("click", () => { pinned = i; mark(i); }));
    ["wheel", "touchstart", "pointerdown", "keydown"].forEach((t) => addEventListener(t, () => { pinned = -1; }, { passive: true, capture: true }));
    addEventListener("scroll", spy, { passive: true });
    addEventListener("resize", spy, { passive: true });
    spy();
  }

  Object.assign(window.GSICHTL = window.GSICHTL || { faces: [] }, { face: faceElement, fill: fillSlot });
})();
