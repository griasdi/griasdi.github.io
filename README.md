# griasdi.github.io

The website of griasdi, end-to-end encrypted chat and voice for communities:
https://griasdi.github.io/

- `site/`: the page, static HTML, CSS and JavaScript without a build step.
  Every push to `main` publishes it with GitHub Pages
  (`.github/workflows/pages.yml`); nothing outside `site/` is published.
- `card/`: source page of the link preview cards `site/img/card.png` (home)
  and `site/img/card-join.png` (invite links); not published.
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/`: product and design context for
  the impeccable skill in `.omp/skills/impeccable/` (Apache-2.0,
  https://github.com/pbakaus/impeccable; see `LICENSE` and `NOTICE.md` there).

Preview locally: `python3 -m http.server -d site 8000`, then open
http://localhost:8000/.

Render the link preview cards after changing `card/` or the hero they reuse:
serve the repo root (`python3 -m http.server -d . 18765 --bind 127.0.0.1`),
then

```
google-chrome --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=3000 --screenshot=site/img/card.png 'http://127.0.0.1:18765/card/'
google-chrome --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=3000 --screenshot=site/img/card-join.png 'http://127.0.0.1:18765/card/?join'
```
