# davidly.ca

Personal homepage for David Ly, served by GitHub Pages at
[www.davidly.ca](https://www.davidly.ca) (custom domain configured in `CNAME`).

Static HTML, CSS and a few lines of vanilla JavaScript — no build step and no
dependencies, so anything pushed to the default branch is what goes live.

## Layout

| Path                       | Purpose                                       |
| --------------------------- | ---------------------------------------------- |
| `index.html`                 | Home: About Me                                 |
| `career.html`                | Career / CV                                    |
| `projects.html`              | Dev Projects                                   |
| `blog.html`                  | Dev Blog index                                 |
| `blog-meet-gsplat.html`      | Case study: Meet-GSplat                        |
| `blog-volleyball-tool.html`  | Case study: Volleyball Analytics Tool          |
| `blog-carpel-funnel.html`    | Case study: Carpel Funnel                      |
| `photography.html`           | Photography — documentary project + album link |
| `hobbies.html`                | Hobbies                                        |
| `now.html`                    | Now — current focus, update periodically       |
| `404.html`                    | Styled not-found page (noindex)                |
| `styles.css`                  | Site stylesheet                                |
| `gallery.js`                  | Lightbox behaviour for the photo galleries     |
| `contact.js`                  | Builds the footer email link at runtime (scraper mitigation) |
| `nav.js`                      | Mobile nav toggle (collapses behind a Menu button below 640px) |
| `favicon.svg`                 | Monogram favicon                               |
| `images/`                     | Hero and gallery photos                        |
| `robots.txt`                  | Crawler rules, points at the sitemap           |
| `sitemap.xml`                 | Sitemap for search engines, with `lastmod` dates |
| `CNAME`                       | Custom domain used by GitHub Pages             |
| `.nojekyll`                   | Tells GitHub Pages to serve files as-is, skipping Jekyll |

The same header/nav markup (`<header class="mast">`) and footer
(`<footer class="colophon">`) are duplicated at the top/bottom of each page —
there's no templating, so when adding a page, copy an existing page's nav and
update every other page's nav to link to it, and keep `aria-current="page"`
pointing at the current page.

New dev blog posts: add a `blog-*.html` file following the existing case
studies' structure (`.page-header` + `.post-body`), add an entry to
`blog.html`'s `.post-list`, and add it to `sitemap.xml`.

**Email address**: the footer's email link is intentionally not written as
plain `mailto:` HTML — `contact.js` assembles it at runtime so simple scrapers
that only read raw HTML never see the address. Don't revert this to a plain
`<a href="mailto:...">` link.

**Photography album**: `photography.html` links out to a public Google
Photos album. The link's `href` is a placeholder (`#`) marked with a
`GOOGLE_ALBUM_URL` comment — search for it and swap in the real album URL
once it exists. The six numbered figures under "The set" are placeholder
images (inline SVG data URIs) standing in for real photos; replace each
figure's `src`, `alt`, and `<figcaption>` as photos are ready — no other
markup needs to change.

**Adding a page**: every page's `<head>` carries the same block — canonical
link, favicon, `theme-color`, Open Graph and Twitter Card tags — right after
the `styles.css` link. Copy that block from an existing page and update the
canonical URL, `og:url`, `og:title`, `og:description` (and `twitter:*`
equivalents) to match. `og:type` is `website` for regular pages and `article`
for `blog-*.html` posts. Only `index.html` carries the `application/ld+json`
Person schema — don't duplicate it on other pages.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
