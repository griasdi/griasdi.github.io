'use strict';

// The newest build of griasdi, read live from the public update files, for the
// website (index.html) and the join page (join/). The files belong to the
// update upstream of griasdi; its server answers these cross-origin reads with
// `Access-Control-Allow-Origin` (deploy/updates.Caddyfile in griasdi/griasdi).
// A classic script: it defines `window.griasdiDownloads`.
(() => {
  const UPDATES = 'https://griasdi.doodleshnookie.net/updates/';

  // The newest build of the update upstream: {base, manifest} of the first
  // channel that has one, or null.
  async function newestBuild() {
    for (const ch of ['release', 'dev']) {
      try {
        const latest = await fetch(UPDATES + ch + '/latest', {cache: 'no-store'});
        if (!latest.ok) {
          continue;
        }
        const build = (await latest.text()).trim();
        if (!/^\d+$/.test(build)) {
          continue;
        }
        const base = UPDATES + ch + '/' + build + '/';
        const res = await fetch(base + 'manifest.json', {cache: 'no-store'});
        if (!res.ok) {
          continue;
        }
        return {base, manifest: await res.json()};
      } catch (e) {
        // Try the next channel.
      }
    }
    return null;
  }

  // The file name for `spec` in `manifest`, or null. `spec` is
  // 'installer:<target>' (an entry of `installers`) or
  // '<component>:<kind>:<target>' (an entry of `artifacts`).
  function fileFor(manifest, spec) {
    const parts = String(spec).split(':');
    let entry;
    if (parts.length === 2 && parts[0] === 'installer') {
      entry = (manifest.installers || []).find((i) => i.target === parts[1]);
    } else if (parts.length === 3) {
      entry = (manifest.artifacts || []).find(
        (a) => a.component === parts[0] && a.kind === parts[1] && a.target === parts[2]);
    }
    const file = entry && entry.file;
    return typeof file === 'string' && /^[A-Za-z0-9._-]+$/.test(file) ? file : null;
  }

  // This system: 'windows', 'mac', 'linux', 'linux-arm', or null (phones,
  // tablets, unknown). Some browsers on ARM Linux report x86_64; those get the
  // x86_64 build first and the ARM one as the second link.
  function system() {
    const ua = navigator.userAgent || '';
    const plat = navigator.platform || '';
    if (/Windows/.test(ua)) {
      return 'windows';
    }
    if (/Android|iPhone|iPad/.test(ua)) {
      return null;
    }
    if (/Mac/.test(plat) && navigator.maxTouchPoints > 1) { return null; }  // iPadOS reports a Mac
    if (/Mac/.test(plat) || /Macintosh/.test(ua)) {
      return 'mac';
    }
    if (/Linux/.test(ua) || /Linux/.test(plat)) {
      return /aarch64|arm64|armv8/i.test(ua + ' ' + plat) ? 'linux-arm' : 'linux';
    }
    return null;
  }

  window.griasdiDownloads = {UPDATES, newestBuild, fileFor, system};
})();
