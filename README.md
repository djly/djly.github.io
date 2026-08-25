# davidly.ca

Personal homepage for David Ly, served by GitHub Pages at
[www.davidly.ca](https://www.davidly.ca) (custom domain configured in `CNAME`).

Static HTML, CSS and a few lines of vanilla JavaScript — no build step and no
dependencies, so anything pushed to the default branch is what goes live.

## Layout

| Path              | Purpose                                            |
| ------------------ | --------------------------------------------------- |
| `index.html`        | Home: About Me                                      |
| `career.html`       | Career / CV                                         |
| `projects.html`     | Dev Projects                                        |
| `photography.html`  | Photography                                         |
| `hobbies.html`      | Hobbies                                             |
| `styles.css`        | Site stylesheet                                     |
| `gallery.js`        | Lightbox behaviour for the photo galleries          |
| `images/`           | Hero and gallery photos                             |
| `robots.txt`        | Crawler rules, points at the sitemap                |
| `sitemap.xml`       | Sitemap for search engines                          |
| `CNAME`             | Custom domain used by GitHub Pages                  |

The same header/nav markup (`<header class="mast">`) is duplicated at the top
of each page — there's no templating, so edit each page's nav to keep the
`aria-current="page"` attribute pointing at the current page.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
