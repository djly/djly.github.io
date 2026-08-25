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
| `images/`                     | Gallery photos and `og-default.png`            |
| `robots.txt`                  | Crawler rules, points at the sitemap           |
| `sitemap.xml`                 | Sitemap for search engines, with `lastmod` dates |
| `CNAME`                       | Custom domain used by GitHub Pages             |
| `.nojekyll`                   | Tells GitHub Pages to serve files as-is, skipping Jekyll |
| `dating/`, `hinge/`, `bumble/` | Joke dating-profile page, at `/dating`, `/hinge`, `/bumble` |
| `dating.css`, `dating.js`      | Styles/behaviour shared by the three dating page copies |

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

**Social preview image**: `images/og-default.png` (1200×630) is a generated
typographic card — not a photo — used site-wide as `og:image`/`twitter:image`
so links unfurl with something branded instead of nothing. It was rendered
locally with Pillow using the same palette and font fallbacks as `styles.css`
(Avenir Next, Georgia); the script isn't checked in. Regenerate or replace it
with a real photo whenever a better candidate exists — swap the file in
place and every page picks it up automatically.

**The dating page** (`/dating`, aliased at `/hinge` and `/bumble`): `dating/index.html`,
`hinge/index.html`, and `bumble/index.html` are byte-identical copies (not a
redirect, so there's no flash-of-redirect) — clean URLs come from GitHub
Pages serving `<dir>/index.html` for a directory request. If you edit the
page, copy the same change into all three files. They use root-absolute
asset paths (`/dating.css`, `/dating.js`, `/favicon.svg`) since the pages
live one level deep, unlike every other page's relative paths. All three
are `noindex` and not linked from the main nav or sitemap — it's meant to be
shared directly as a link, not discovered.

The dislike (✕) button is intentionally never a real `<button>` — it's a
`role`-less `<div aria-hidden="true">` with no tabindex, so keyboard and
screen-reader users never encounter a control that can't actually be
operated; they just get the one real, fully accessible `<button>` (like).
For mouse/touch users, `dating.js` makes it flee the pointer on proximity,
and even in the rare case a click lands, the handler only repositions it —
it never registers an actual "dislike." Respects `prefers-reduced-motion`
(no animated chase; the control just sits there inertly with an explanatory
status message instead).

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
