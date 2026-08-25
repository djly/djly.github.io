# davidly.ca

Personal homepage for David Ly, served by GitHub Pages at
[www.davidly.ca](https://www.davidly.ca) (custom domain configured in `CNAME`).

Static HTML, CSS and a few lines of vanilla JavaScript — no build step and no
dependencies, so anything pushed to the default branch is what goes live.

## Layout

| Path                          | Purpose                                    |
| ------------------------------ | ------------------------------------------- |
| `index.html`                    | Home: About Me                              |
| `career.html`                   | Career / CV                                 |
| `projects.html`                 | Dev Projects                                |
| `writing.html`                  | Writing index                               |
| `writing-meet-gsplat.html`      | Case study: Meet-GSplat                     |
| `writing-volleyball-tool.html`  | Case study: Volleyball Analytics Tool       |
| `writing-carpel-funnel.html`    | Case study: Carpel Funnel                   |
| `photography.html`              | Photography                                 |
| `hobbies.html`                  | Hobbies                                     |
| `now.html`                      | Now — current focus, update periodically    |
| `styles.css`                    | Site stylesheet                             |
| `gallery.js`                    | Lightbox behaviour for the photo galleries  |
| `images/`                       | Hero and gallery photos                     |
| `robots.txt`                    | Crawler rules, points at the sitemap        |
| `sitemap.xml`                   | Sitemap for search engines                  |
| `CNAME`                         | Custom domain used by GitHub Pages          |

The same header/nav markup (`<header class="mast">`) and footer
(`<footer class="colophon">`) are duplicated at the top/bottom of each page —
there's no templating, so when adding a page, copy an existing page's nav and
update every other page's nav to link to it, and keep `aria-current="page"`
pointing at the current page.

New writing posts: add a `writing-*.html` file following the existing case
studies' structure (`.page-header` + `.post-body`), add an entry to
`writing.html`'s `.post-list`, and add it to `sitemap.xml`.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
