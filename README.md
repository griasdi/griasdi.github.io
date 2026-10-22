# griasdi.github.io

The website of griasdi, end-to-end encrypted chat and voice for communities:
https://griasdi.github.io/

- `site/`: the page, static HTML, CSS and JavaScript without a build step.
  Every push to `main` publishes it with GitHub Pages
  (`.github/workflows/pages.yml`); nothing outside `site/` is published.
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/`: product and design context for
  the impeccable skill in `.omp/skills/impeccable/` (Apache-2.0,
  https://github.com/pbakaus/impeccable; see `LICENSE` and `NOTICE.md` there).

Preview locally: `python3 -m http.server -d site 8000`, then open
http://localhost:8000/.
