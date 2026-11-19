'use strict';

// The spezl downloads of the bot guide, from the newest build of the update
// files (downloads.js).
(() => {
  const build = document.getElementById('spezl-build');
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
      : 'No build of spezl is published yet.';
  });
})();
