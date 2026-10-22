'use strict';

// The join page, served by GitHub Pages at https://griasdi.github.io/join/ (the
// app's `JOIN_PAGE` in griasdi/griasdi), never by a community server. It reads
// the griasdi link in the fragment (`#invite:<data>` or `#setup:<data>`, which
// the browser never sends) and names what it is about. `<data>` is base64url
// (no padding) of the postcard encoding; the names are its first fields: a
// varint length and UTF-8 bytes each. The downloads are the newest build of
// the update upstream (downloads.js). Without a fragment the page says what to
// do.

const MAX_NAME_BYTES = 256;
// How long the page waits after 'Open in griasdi' for the browser to hand the
// link to the app (the page loses focus) before it offers help.
const NOT_OPENED_MS = 2500;

function base64urlBytes(s) {
  if (!/^[A-Za-z0-9_-]+$/.test(s)) {
    return null;
  }
  let b64 = s.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4 !== 0) {
    b64 += '=';
  }
  let bin;
  try {
    bin = atob(b64);
  } catch (e) {
    return null;
  }
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    out[i] = bin.charCodeAt(i);
  }
  return out;
}

// The first `count` postcard strings of `bytes`, or null.
function leadingStrings(bytes, count) {
  const decoder = new TextDecoder('utf-8', { fatal: true });
  const out = [];
  let pos = 0;
  for (let n = 0; n < count; n++) {
    let len = 0;
    let shift = 0;
    let byte;
    do {
      if (pos >= bytes.length || shift > 21) {
        return null;
      }
      byte = bytes[pos++];
      len += (byte & 0x7f) * 2 ** shift;
      shift += 7;
    } while (byte & 0x80);
    if (len > MAX_NAME_BYTES || pos + len > bytes.length) {
      return null;
    }
    try {
      out.push(decoder.decode(bytes.subarray(pos, pos + len)));
    } catch (e) {
      return null;
    }
    pos += len;
  }
  return out;
}

function or(name, fallback) {
  return name.trim() === '' ? fallback : name;
}

// The heading for the link in the fragment, or null.
function heading(fragment) {
  const colon = fragment.indexOf(':');
  if (colon < 0) {
    return null;
  }
  const kind = fragment.slice(0, colon);
  const bytes = base64urlBytes(fragment.slice(colon + 1));
  if (bytes === null) {
    return null;
  }
  if (kind === 'invite') {
    const names = leadingStrings(bytes, 2);
    if (names === null) {
      return null;
    }
    const community = or(names[0], 'a community');
    return names[1].trim() === ''
      ? 'You are invited to ' + community
      : names[1] + ' invites you to ' + community;
  }
  if (kind === 'setup') {
    const names = leadingStrings(bytes, 1);
    return names === null ? null : 'Set up ' + or(names[0], 'your server');
  }
  return null;
}

// The download of each system, as `griasdiDownloads.fileFor` reads it.
const SPECS = {
  windows: 'installer:x86_64-pc-windows-msvc',
  mac: 'installer:aarch64-apple-darwin',
  linux: 'desktop:appimage:x86_64-unknown-linux-gnu',
  'linux-arm': 'desktop:appimage:aarch64-unknown-linux-gnu',
};

function show(id) {
  document.getElementById(id).hidden = false;
}

function setDownload(a, base, file) {
  a.href = base + file;
  a.setAttribute('download', file);
}

document.addEventListener('DOMContentLoaded', async () => {
  const raw = location.hash.slice(1);
  if (raw === '') {
    // Bare /join/: no link, the page says what to do.
    show('empty');
    return;
  }
  show('title');
  // A griasdi link is plain base64url; percent-escapes are tolerated only as
  // far as they decode.
  let fragment;
  try {
    fragment = decodeURIComponent(raw);
  } catch (e) {
    fragment = '';
  }
  const title = heading(fragment);
  if (title === null) {
    document.title = 'griasdi';
    show('broken');
    return;
  }
  const link = 'griasdi:' + fragment;
  document.getElementById('title').textContent = title;
  document.title = title;
  document.getElementById('open').href = link;
  // A page cannot learn whether a griasdi: handler exists (browsers hide it on
  // purpose). When the app opens, the page loses focus; if it keeps it, the
  // page offers the download and the link to copy.
  let notOpened = null;
  const opened = () => {
    clearTimeout(notOpened);
    notOpened = null;
  };
  window.addEventListener('blur', opened);
  window.addEventListener('pagehide', opened);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      opened();
    }
  });
  document.getElementById('open').addEventListener('click', () => {
    clearTimeout(notOpened);
    notOpened = setTimeout(() => show('not-opened'), NOT_OPENED_MS);
  });
  document.getElementById('copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(link);
      show('copied');
    } catch (e) {
      // No clipboard access: the link to copy by hand, selected.
      const input = document.getElementById('link-text');
      input.value = link;
      input.hidden = false;
      input.focus();
      input.select();
    }
  });
  // The app looks at the clipboard on its first start: copying the link
  // before the download lets the new install pick the invite up.
  for (const a of document.querySelectorAll('a.dl-link')) {
    a.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(link).catch(() => {});
      }
    });
  }
  show('hint');
  show('actions');

  const found = await griasdiDownloads.newestBuild();
  const files = {};
  for (const key of Object.keys(SPECS)) {
    const file = found ? griasdiDownloads.fileFor(found.manifest, SPECS[key]) : null;
    if (file !== null) {
      files[key] = file;
      setDownload(document.querySelector('#dl-' + key + ' a'), found.base, file);
      show('dl-' + key);
    }
  }
  const system = griasdiDownloads.system();
  if (system === null || !files[system]) {
    return;
  }
  setDownload(document.getElementById('download'), found.base, files[system]);
  show('download');
  if (system === 'mac') {
    show('mac-hint');
  }
  if (system === 'windows') {
    show('windows-hint');
  }
  if (system === 'linux' && files['linux-arm']) {
    setDownload(document.getElementById('download-arm'), found.base, files['linux-arm']);
    show('download-arm');
  }
});
