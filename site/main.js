(() => {
  "use strict";

  const FACES = (window.GSICHTL && window.GSICHTL.faces) || [];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const SVG = "http://www.w3.org/2000/svg";
  const EYE = new Set(["#ffffff", "#11151c"]);

  document.documentElement.classList.add("js");

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
  document.querySelectorAll(".chat li[data-face]").forEach((li) => {
    const slot = document.createElement("span");
    slot.className = "face-slot";
    li.prepend(slot);
    fillSlot(slot, Number(li.dataset.face));
  });
  document.querySelectorAll(".dl-cast .face-slot").forEach((el, i) => el.style.setProperty("--i", String(i)));

  // Everyone blinks now and then, never all at once.
  setInterval(() => {
    if (document.hidden || reduced.matches) return;
    const all = document.querySelectorAll(".face");
    const f = all[Math.floor(Math.random() * all.length)];
    if (f && f._blink) f._blink();
  }, 700);

  // ---------- hero: the table ----------

  const LINES = {
    Alice: ["griasdi! who’s up for a round?", "push-to-talk, people", "gg, that was close"],
    Clara: ["servus! one sec, snacks", "can you hear me now?", "my fan is louder than me"],
    Bob: ["sharing my screen, look", "Emil, your keyboard is gone. finally", "brb, cat on the keyboard"],
    Dora: ["joining voice!", "who sent the 4 GB file?", "transcript is on, say nice things"],
    Emil: ["noise model on. hear the drill?", "lag? what lag?", "one more round."],
  };

  const table = document.getElementById("table");
  const server = document.getElementById("server");
  const sees = document.getElementById("server-sees");
  const live = document.getElementById("stage-live");
  const seats = [...document.querySelectorAll("#seats .seat")];
  const said = new Map();
  let lastSpeaker = -1;
  let lastUserTalk = 0;
  let stageVisible = true;

  const hex = (n) => {
    const b = new Uint8Array(n);
    crypto.getRandomValues(b);
    return [...b].map((v) => v.toString(16).padStart(2, "0"));
  };

  seats.forEach((seat, i) => {
    const name = seat.dataset.name;
    const angle = (-90 + i * (360 / seats.length)) * (Math.PI / 180);
    const x = 50 + 37 * Math.cos(angle);
    const y = 50 + 37 * Math.sin(angle);
    seat.style.setProperty("--x", `${x}%`);
    seat.style.setProperty("--y", `${y}%`);
    seat.style.setProperty("--d", `${-i * 0.6}s`);
    if (x > 56) seat.classList.add("right");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "seat-btn";
    btn.setAttribute("aria-label", `Let ${name} talk`);
    btn.appendChild(faceElement(Number(seat.dataset.face)));
    const label = document.createElement("span");
    label.className = "seat-name";
    label.textContent = name;
    seat.replaceChildren(btn, label);
    btn.addEventListener("click", () => { lastUserTalk = performance.now(); speak(i, true); });
  });
  table.classList.add("idle");
  // A face is 10 units across (8 cells and a margin): sizes in multiples of 10 px keep every pixel square.
  new ResizeObserver(([e]) => {
    const w = Math.max(70, Math.min(120, Math.floor((e.contentRect.width * 0.17) / 10) * 10));
    table.style.setProperty("--seat-w", `${w}px`);
  }).observe(table);

  function centerOf(el) {
    const t = table.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return [r.left + r.width / 2 - t.left, r.top + r.height / 2 - t.top];
  }

  function fly(from, to, text, duration, delay = 0) {
    const p = document.createElement("span");
    p.className = "packet";
    p.textContent = text;
    table.appendChild(p);
    const anim = p.animate(
      [
        { transform: `translate(${from[0]}px, ${from[1]}px) scale(.4)`, opacity: 0 },
        { transform: `translate(${from[0]}px, ${from[1]}px) scale(1)`, opacity: 1, offset: 0.15 },
        { transform: `translate(${to[0]}px, ${to[1]}px) scale(.9)`, opacity: 1, offset: 0.9 },
        { transform: `translate(${to[0]}px, ${to[1]}px) scale(.3)`, opacity: 0 },
      ],
      { duration, delay, easing: "cubic-bezier(.5,0,.3,1)", fill: "backwards" },
    );
    anim.onfinish = () => p.remove();
    return anim.finished;
  }

  // Shows what a receiver gets after decrypting: the line again, briefly, as text.
  function echo(seat, line) {
    const e = document.createElement("span");
    e.className = "echo";
    e.textContent = line.length > 18 ? `${line.slice(0, 17).trimEnd()}…` : line;
    const btn = seat.querySelector(".seat-btn");
    const [x, cy] = centerOf(btn);
    const y = cy - btn.offsetHeight / 2;
    e.style.left = `${x}px`;
    e.style.top = `${y}px`;
    table.appendChild(e);
    e.animate(
      [{ opacity: 0, transform: "translate(-50%, -30%) scale(.6)" }, { opacity: 1, transform: "translate(-50%, -70%) scale(1)", offset: 0.2 }, { opacity: 1, transform: "translate(-50%, -80%)", offset: 0.8 }, { opacity: 0, transform: "translate(-50%, -95%)" }],
      { duration: 1300, easing: "cubic-bezier(.16,1,.3,1)" },
    ).finished.then(() => e.remove());
  }

  let current = null;

  function speak(i, announce = false) {
    const seat = seats[i];
    if (!seat) return;
    // One voice at a time: whoever spoke before stops first.
    if (current) current();
    lastSpeaker = i;
    const name = seat.dataset.name;
    const lines = LINES[name];
    const n = (said.get(name) || 0) % lines.length;
    said.set(name, n + 1);
    const line = lines[n];

    const bubble = document.createElement("span");
    bubble.className = "bubble say";
    bubble.textContent = line;
    seat.appendChild(bubble);
    seat.classList.add("speaking");
    if (announce) live.textContent = `${name}: ${line}`;

    let timer = 0;
    let over = false;
    const done = () => {
      if (over) return;
      over = true;
      clearTimeout(timer);
      if (current === done) current = null;
      seat.classList.remove("speaking");
      bubble.animate([{ opacity: 1 }, { opacity: 0, transform: "scale(.85)" }], { duration: reduced.matches ? 1 : 200, fill: "forwards" })
        .finished.then(() => bubble.remove());
    };
    current = done;

    if (reduced.matches) {
      sees.textContent = hex(4).join("·");
      timer = setTimeout(done, 2600);
      return;
    }

    bubble.animate(
      [{ transform: "scale(.2) rotate(-8deg)", opacity: 0 }, { transform: "scale(1.06) rotate(2deg)", opacity: 1, offset: 0.6 }, { transform: "none", opacity: 1 }],
      { duration: 420, easing: "cubic-bezier(.34,1.56,.64,1)" },
    );

    const cipher = hex(4);
    const from = centerOf(seat.querySelector(".seat-btn"));
    const mid = centerOf(server);
    fly(from, mid, cipher.slice(0, 2).join(""), 700, 260).then(() => {
      if (over) return;
      server.classList.add("busy");
      let ticks = 0;
      const scramble = setInterval(() => {
        sees.textContent = hex(4).join("·");
        if (++ticks > 5) { clearInterval(scramble); sees.textContent = cipher.join("·"); }
      }, 60);
      const arrivals = seats
        .filter((s) => s !== seat)
        .map((s, k) => fly(mid, centerOf(s.querySelector(".seat-btn")), hex(2).join(""), 650, k * 50).then(() => {
          s.classList.remove("got");
          void s.offsetWidth;
          s.classList.add("got");
          echo(s, line);
        }));
      Promise.all(arrivals).then(() => setTimeout(() => server.classList.remove("busy"), 200));
    });
    timer = setTimeout(done, 2900);
  }

  function idleTalk() {
    if (document.hidden || !stageVisible || reduced.matches) return;
    if (performance.now() - lastUserTalk < 6000) return;
    let i;
    do { i = Math.floor(Math.random() * seats.length); } while (i === lastSpeaker && seats.length > 1);
    speak(i);
  }
  new IntersectionObserver(([e]) => { stageVisible = e.isIntersecting; }, { threshold: 0.3 }).observe(table);
  setTimeout(() => { if (!lastUserTalk) speak(0); }, reduced.matches ? 0 : 1300);
  setInterval(idleTalk, 3600);

  // ---------- voice: noise suppression illustration ----------

  const LEVELS = [
    { keep: 1, note: "Standard: classic suppression, no model." },
    { keep: 0.34, note: "Light: a small speech model, about 10 ms of delay. The default." },
    { keep: 0.13, note: "Strong: a bigger model, about 50 ms of delay." },
    { keep: 0.04, note: "Maximum: the biggest model, about 50 ms of delay." },
  ];
  const canvas = document.getElementById("wave");
  const note = document.getElementById("noise-note");
  const radios = [...document.querySelectorAll("#noise [role=radio]")];
  let level = 1;
  let keep = LEVELS[level].keep;
  let keepShown = keep;

  function setLevel(l, focus) {
    level = l;
    keep = LEVELS[l].keep;
    radios.forEach((r, k) => {
      r.setAttribute("aria-checked", String(k === l));
      r.tabIndex = k === l ? 0 : -1;
    });
    note.textContent = LEVELS[l].note;
    if (focus) radios[l].focus();
    if (reduced.matches) { keepShown = keep; drawWave(0); }
  }
  radios.forEach((r, k) => {
    r.addEventListener("click", () => setLevel(k, false));
    r.addEventListener("keydown", (e) => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (d) { e.preventDefault(); setLevel((level + d + radios.length) % radios.length, true); }
    });
  });

  // A synthetic signal: syllables of speech, fan hum, hiss and keyboard clicks.
  const BARS = 150;
  let seedT = 0;
  const rand = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  function sample(t) {
    const syl = Math.max(0, Math.sin(t * 0.21) * 0.6 + Math.sin(t * 0.077 + 1.3) * 0.5);
    const voice = Math.min(1, syl * (0.55 + 0.45 * Math.abs(Math.sin(t * 0.9))));
    const hum = 0.16 + 0.05 * Math.sin(t * 0.5);
    const click = rand(Math.floor(t / 3)) > 0.86 ? 0.75 * Math.exp(-(t % 3) * 1.2) : 0;
    const hiss = 0.08 * rand(t * 3.1);
    return [voice, Math.min(1, hum + click + hiss)];
  }
  function cssVar(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
  const COL = { voice: cssVar("--teal"), noise: cssVar("--terra-l"), dim: cssVar("--ink-3") };
  function drawWave(t) {
    const ctx = canvas.getContext("2d");
    // The top 44 px hold the legend; the bars live below it.
    const w = canvas.width, h = canvas.height, mid = (h + 44) / 2, amp = (h - 44) / 2 - 6;
    ctx.clearRect(0, 0, w, h);
    const bw = w / BARS;
    for (let k = 0; k < BARS; k++) {
      const [v, n] = sample(k + t);
      const nh = n * keepShown * amp;
      const vh = v * amp;
      ctx.fillStyle = COL.noise;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(k * bw + 1, mid - nh, bw - 3, nh * 2);
      ctx.fillStyle = COL.voice;
      ctx.globalAlpha = 1;
      const top = Math.max(vh, 1.5);
      ctx.fillRect(k * bw + 1, mid - top, bw - 3, top * 2);
      if (nh > top) {
        ctx.fillStyle = COL.noise;
        ctx.globalAlpha = 0.85;
        ctx.fillRect(k * bw + 1, mid - nh, bw - 3, nh - top);
        ctx.fillRect(k * bw + 1, mid + top, bw - 3, nh - top);
      }
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = COL.dim;
    ctx.font = "600 20px 'JetBrains Mono', monospace";
    ctx.textAlign = "right";
    ctx.fillText("illustration", w - 12, 30);
    ctx.textAlign = "left";
    ctx.fillStyle = COL.voice; ctx.fillRect(12, 16, 16, 16);
    ctx.fillStyle = COL.dim; ctx.fillText("voice", 36, 30);
    ctx.fillStyle = COL.noise; ctx.fillRect(120, 16, 16, 16);
    ctx.fillStyle = COL.dim; ctx.fillText("noise", 144, 30);
  }
  let waveVisible = false;
  new IntersectionObserver(([e]) => { waveVisible = e.isIntersecting; }, { rootMargin: "100px" }).observe(canvas);
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(64, now - last);
    last = now;
    if (waveVisible && !reduced.matches) {
      seedT += dt * 0.012;
      keepShown += (keep - keepShown) * Math.min(1, dt / 140);
      drawWave(seedT);
    }
    requestAnimationFrame(frame);
  }
  setLevel(1, false);
  drawWave(0);
  requestAnimationFrame(frame);

  // ---------- security: what the server stores ----------

  const sw = document.getElementById("server-view");
  const chat = document.getElementById("chat");
  const msgs = [...chat.querySelectorAll(".msg")];
  msgs.forEach((m) => {
    m.dataset.plain = m.textContent;
    const bytes = new TextEncoder().encode(m.textContent).length + 16;
    m.dataset.sealed = hex(Math.min(bytes, 30)).join(" ") + (bytes > 30 ? " …" : "");
  });
  sw.addEventListener("click", () => {
    const on = sw.getAttribute("aria-checked") !== "true";
    sw.setAttribute("aria-checked", String(on));
    chat.classList.toggle("sealed", on);
    msgs.forEach((m) => {
      const target = on ? m.dataset.sealed : m.dataset.plain;
      if (reduced.matches) { m.textContent = target; return; }
      let step = 0;
      const steps = 9;
      const t = setInterval(() => {
        step++;
        const cut = Math.floor((target.length * step) / steps);
        m.textContent = target.slice(0, cut) + hex(Math.ceil((target.length - cut) / 3)).join("").slice(0, target.length - cut);
        if (step >= steps) { clearInterval(t); m.textContent = target; }
      }, 34);
    });
  });

  // ---------- roll a face ----------

  const rollSlot = document.getElementById("roll-face");
  document.getElementById("roll").addEventListener("click", () => {
    let next;
    do { next = Math.floor(Math.random() * FACES.length); } while (String(next) === rollSlot.dataset.face && FACES.length > 1);
    fillSlot(rollSlot, next);
    rollSlot.classList.remove("rolling");
    void rollSlot.offsetWidth;
    rollSlot.classList.add("rolling");
  });

  // ---------- download for this system ----------

  const ua = navigator.userAgent;
  const plat = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
  const mobile = /Android|iPhone|iPad|iPod/i.test(ua);
  let os = null;
  if (!mobile) {
    if (/Win/i.test(plat) || /Windows/i.test(ua)) os = ["windows", "Windows", "#dl-windows-setup"];
    else if (/Mac/i.test(plat) || /Mac OS X/i.test(ua)) os = ["macos", "macOS", "#dl-macos-dmg"];
    else if (/Linux|X11/i.test(plat) || /Linux/i.test(ua)) os = ["linux", "Linux", "#dl-linux-appimage"];
  }
  if (os) {
    const [id, label, href] = os;
    document.getElementById("primary-label").textContent = `Download for ${label}`;
    document.getElementById("primary-download").href = href;
    document.getElementById("other-platforms").textContent = "Other platforms";
    document.getElementById(`pf-${id}`)?.classList.add("mine");
  }

  // ---------- small things ----------

  const top = document.querySelector(".top");
  const onScroll = () => top.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // The stickers on the screenshot pop on once, in order, when it comes into view.
  const tags = [...document.querySelectorAll(".shot .tag")];
  if (!reduced.matches && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      tags.forEach((t, k) => t.animate(
        [{ transform: "scale(.3)", opacity: 0 }, { transform: "scale(1.08)", opacity: 1, offset: 0.65 }, { transform: "none", opacity: 1 }],
        { duration: 520, delay: 120 + k * 140, easing: "cubic-bezier(.34,1.56,.64,1)", fill: "backwards" },
      ));
    }, { threshold: 0.35 });
    io.observe(document.querySelector(".shot"));
  }
})();
