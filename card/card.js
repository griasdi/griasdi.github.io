'use strict';

// Renders the link preview cards (site/img/card.png, site/img/card-join.png); see README.md.
const join = location.search === '?join';
const FACES = (window.GSICHTL && window.GSICHTL.faces) || [];
const SVG = 'http://www.w3.org/2000/svg';

// Copy of faceElement in site/main.js, without the blinking.
function faceElement(index) {
  const data = FACES[((index % FACES.length) + FACES.length) % FACES.length];
  const wrap = document.createElement('span');
  wrap.className = 'face';
  if (!data) return wrap;
  const s = data.s;
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('viewBox', `-1 -1 ${s + 2} ${s + 2}`);
  svg.setAttribute('aria-hidden', 'true');
  const bg = document.createElementNS(SVG, 'rect');
  bg.setAttribute('x', '-1'); bg.setAttribute('y', '-1');
  bg.setAttribute('width', String(s + 2)); bg.setAttribute('height', String(s + 2));
  bg.setAttribute('fill', data.bg);
  svg.appendChild(bg);
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const ch = data.g[y * s + x];
      if (ch === '.') continue;
      const r = document.createElementNS(SVG, 'rect');
      r.setAttribute('x', String(x)); r.setAttribute('y', String(y));
      r.setAttribute('width', '1.02'); r.setAttribute('height', '1.02');
      r.setAttribute('fill', data.p[ch.charCodeAt(0) - 97]);
      svg.appendChild(r);
    }
  }
  wrap.appendChild(svg);
  return wrap;
}

const line = join ? 'griasdi! we saved you a seat' : 'griasdi! who’s up for a round?';
const echoText = `${line.slice(0, 17).trimEnd()}…`;
const cast = [
  { name: 'Alice', face: 11, speaks: true },
  { name: 'Clara', face: 1 },
  join ? { name: 'you', empty: true } : { name: 'Bob', face: 27, echo: true },
  { name: 'Dora', face: 40, echo: true },
  { name: 'Emil', face: 6 },
];

const table = document.getElementById('table');
const seats = document.getElementById('seats');
cast.forEach((who, i) => {
  const seat = document.createElement('li');
  seat.className = 'seat';
  const angle = (-90 + i * (360 / cast.length)) * (Math.PI / 180);
  const x = 50 + 37 * Math.cos(angle);
  const y = 50 + 37 * Math.sin(angle);
  seat.style.setProperty('--x', `${x}%`);
  seat.style.setProperty('--y', `${y}%`);
  if (x > 56) seat.classList.add('right');

  const btn = document.createElement('span');
  btn.className = who.empty ? 'seat-btn seat-empty' : 'seat-btn';
  if (!who.empty) btn.appendChild(faceElement(who.face));
  const label = document.createElement('span');
  label.className = who.empty ? 'seat-name seat-you' : 'seat-name';
  label.textContent = who.name;
  seat.append(btn, label);

  if (who.speaks) {
    seat.classList.add('speaking');
    const bubble = document.createElement('span');
    bubble.className = 'bubble say';
    bubble.textContent = line;
    seat.appendChild(bubble);
  }
  if (who.echo) {
    const e = document.createElement('span');
    e.className = 'echo';
    e.textContent = echoText;
    seat.appendChild(e);
  }
  seats.appendChild(seat);
});

const packet = document.createElement('span');
packet.className = 'packet';
packet.textContent = '7b1e';
packet.style.left = '50%';
packet.style.top = '32%';
table.appendChild(packet);

document.getElementById('say').textContent = join ? 'Your crew saved you a seat.' : 'Hello, you. Your crew is waiting.';
document.getElementById('lede').textContent = join
  ? 'Open the invite in griasdi: voice and chat, encrypted on your device.'
  : 'Voice and chat for your crew, encrypted on your device.';
