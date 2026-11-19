'use strict';

// The downloads of a guide's release box (server/, bots/), from the newest
// build of the update files (downloads.js): every `a[data-file]` of the page,
// and in `#release-build` which build they are, or its `data-none` when the
// build has none of them.
(() => {
  const build = document.getElementById('release-build');
  window.griasdiDownloads.newestBuild().then((found) => {
    if (!found) {
      build.textContent = 'Downloads could not be loaded. Try again in a moment.';
      return;
    }
    const {base, manifest} = found;
    let any = false;
    for (const a of document.querySelectorAll('a[data-file]')) {
      const file = window.griasdiDownloads.fileFor(manifest, a.dataset.file);
      if (file === null) {
        a.closest('li').hidden = true;
        continue;
      }
      a.href = base + file;
      a.download = file;
      a.removeAttribute('aria-disabled');
      any = true;
    }
    build.textContent = any
      ? `Build ${manifest.build}, ${manifest.created.slice(0, 10)}.`
      : build.dataset.none;
  });
})();
