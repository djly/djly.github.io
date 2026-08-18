# davidly.ca

Personal homepage for David Ly, served by GitHub Pages at
[www.davidly.ca](https://www.davidly.ca) (custom domain configured in `CNAME`).

Static HTML, CSS and a few lines of vanilla JavaScript — no build step and no
dependencies, so anything pushed to the default branch is what goes live.

## Layout

| Path                  | Purpose                                            |
| --------------------- | -------------------------------------------------- |
| `index.html`          | The homepage: hero, about, projects, contact        |
| `404.html`            | Styled not-found page for unknown paths            |
| `assets/css/`         | Single stylesheet with light/dark theme variables   |
| `assets/js/main.js`   | Theme toggle, footer year, scroll reveal           |
| `assets/favicon.svg`  | Monogram favicon                                   |
| `robots.txt`          | Crawler rules, points at the sitemap               |
| `sitemap.xml`         | Sitemap for search engines                         |
| `CNAME`               | Custom domain used by GitHub Pages                 |

## Editing

Content lives directly in `index.html`:

- Intro copy is in the `.hero` and `#about` sections.
- Each project is a `<li class="card project">` inside `#projects`; copy one to
  add another.
- The contact email and profile links are in `#contact` (also referenced in the
  hero buttons and the JSON-LD block in `<head>`).

Colours, spacing and radii are CSS custom properties at the top of
`assets/css/styles.css`, split into `html[data-theme="dark"]` and
`html[data-theme="light"]` blocks.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Project pages published from other repositories (for example `/er-tool/`) are
served from the same domain and are not part of this repository.
