# davidly.ca

Personal homepage for David Ly, served by GitHub Pages at
[www.davidly.ca](https://www.davidly.ca) (custom domain configured in `CNAME`).

Static HTML, CSS and a few lines of vanilla JavaScript — no build step and no
dependencies, so anything pushed to the default branch is what goes live.

## Layout

| Path            | Purpose                                              |
| ---------------- | ----------------------------------------------------- |
| `index.html`      | The homepage: hero and the "Off the Clock" gallery    |
| `styles.css`      | Site stylesheet                                       |
| `gallery.js`       | Lightbox behaviour for the photo gallery               |
| `images/`          | Hero and gallery photos                                |
| `robots.txt`       | Crawler rules, points at the sitemap                   |
| `sitemap.xml`      | Sitemap for search engines                             |
| `CNAME`            | Custom domain used by GitHub Pages                     |

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
