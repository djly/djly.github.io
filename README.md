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

**Profile photos** (`images/dating/`): nine real photos, cross-faded in a
carousel (`.swipe-photo-img` + `.swipe-dot`), in the same order as the
source Google Photos album — that order was intentional, so preserve it
when adding or removing photos. Navigation is driven by whichever input
the visitor uses — dots, the `.swipe-nav-prev`/`.swipe-nav-next` arrow
buttons, a left/right tap on the photo, or a left/right swipe — all
funneled through the same `goTo()` in `dating.js`, so anything that adds a
new nav affordance should call `goTo()` too rather than touching
`activeIndex` directly. Two include a child (family member) whose
face is pixelated (mosaic, not a crop/blur-that-could-be-reversed) before
the file ever left disk — do not swap in an unpixelated version of those
two. `volleyball-rooftop.jpg` is pre-cropped to the exact 4:5 card ratio
centered on the group, rather than relying on CSS `object-fit: cover` to
crop it — do the same (crop to 4:5 in an image editor before adding) for
any future group/landscape photo, since default center-crop doesn't
reliably frame a group shot well.

**Like/dislike buttons float, fixed to the viewport bottom** (`.swipe-actions`),
rather than sitting in normal document flow — the bio prompts got long enough
to push them below the fold otherwise, and the point of the page is that the
like button is always reachable. `.dating-status` (the taunt text) floats
with them, just above, with its own dark pill background since it needs to
stay legible over whatever's scrolled underneath — image, white card, or
gradient — not just the page background it was designed for originally; it
collapses to nothing (`:empty` rule) before the first dodge. `body`'s
bottom padding (9rem) exists specifically so the last prompt can scroll clear
of the floating bar — if you add anything to the floating bar or make it
taller, increase that padding to match, or the last prompt will end up
hidden behind it again.

The dislike (✕) button is intentionally never a real `<button>` — it's a
`role`-less `<div aria-hidden="true">` with no tabindex, so keyboard and
screen-reader users never encounter a control that can't actually be
operated; they just get the one real, fully accessible `<button>` (like).
For mouse/touch users, `dating.js` makes it flee the pointer on proximity,
and even in the rare case a click lands, the handler only repositions it —
it never registers an actual "dislike." Respects `prefers-reduced-motion`
(no animated chase; the control just sits there inertly with an explanatory
status message instead).

It's `position: fixed` at all times — resting and fleeing alike — computed
directly against the viewport (`left: calc(50vw - 0.5rem - 4.2rem)`,
`bottom: 1.4rem`), rather than toggling between `absolute`-inside-`.swipe-actions`
and `fixed` on the first dodge. That toggle used to be the design (simpler
CSS, JS promoted it on first contact), but it broke once `.swipe-actions`
itself became `position: fixed` for the floating action bar (see below):
resting and fleeing were then two different coordinate systems, and the
first dodge visibly jumped between them.

**If you touch this again**: a `transform` on `.swipe-actions` (or any
ancestor of `.dislike-btn`) creates a new containing block for
`position: fixed` descendants per the CSS spec — that's what broke it a
second time even after switching to `position: fixed` throughout, since
`.swipe-actions` was centered via `transform: translateX(-50%)`. It's
centered via `margin-left: calc(min(92vw, 24rem) * -0.5)` instead now,
specifically to avoid that. Don't reintroduce a transform on `.swipe-actions`
(or wrap `.dislike-btn` in any other transformed ancestor) without accounting
for this — `getComputedStyle(el).left` and `el.getBoundingClientRect().left`
should always agree for `.dislike-btn`; if they diverge, something upstream
has (re)introduced a containing block.

A small idle "jitter" animation runs on the resting button as a hint of
life before contact, since touchscreens have no hover to react to.

**The match modal**: hitting like opens a modal with a real, frictionless
next step and an equally easy way out — this is a joke, not a dark pattern.
"Email me →" is a `mailto:` link with the subject/body pre-filled (built at
runtime by `dating.js`, same obfuscation approach as `contact.js`) so
finishing the loop takes one click plus hitting send. "Copy my email
instead" covers people without a configured mail client
(`navigator.clipboard.writeText`, with a plain-text fallback if that's
blocked). "Nah, I'm good — just here for the bit" closes with zero friction
and zero guilt-tripping copy — clicking the backdrop or pressing Escape
does the same. Don't add anything that makes declining harder or slower
than accepting.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
