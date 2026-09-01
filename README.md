# Robotics and Semantic Systems — website

The group website, built with Jekyll and published with GitHub Pages. All
content is markdown, so pages and news can be changed by anyone through a pull
request.

## Publish it

1. Create a repository and push these files to the `main` branch.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push. The workflow in `.github/workflows/pages.yml` builds and deploys.

For a project site (`https://<user>.github.io/<repo>`), the workflow passes the
base path automatically. If you serve the site from a custom domain, add a
`CNAME` file and set `url` in `_config.yml`.

## Run it locally

```bash
bundle install
bundle exec jekyll serve --livereload
# http://127.0.0.1:4000
```

Commit the `Gemfile.lock` that `bundle install` produces, so the workflow and
your machine build with the same gem versions.

## Where things live

| Path | What it holds |
| --- | --- |
| `_posts/` | News items. One file per item, named `YYYY-MM-DD-title.md`. |
| `_research/` | Pages under the Research menu. |
| `_education/` | Pages under the Education menu. |
| `_publications/` | Pages under the Publications menu. |
| `_people/` | The People page and one file per person. |
| `_about/` | Pages under the About menu. |
| `_data/slider.yml` | Front page slideshow. |
| `_data/promos.yml` | The two coloured boxes on the front page. |
| `_data/calendar.yml` | Seminars and defences on the front page. |
| `_data/footer.yml` | The four link columns in the footer. |
| `_data/nav.yml` | Order of the top menu. |
| `_data/images.yml` | Logotype and photo URLs reused from www.robotics.lth.se. |
| `templates/` | Files to copy when adding content. Not published. |
| `assets/img/` | Images. Replace the placeholder logo and slides here. |
| `assets/css/style.scss` | The whole stylesheet. Jekyll compiles it to `/assets/css/style.css`. |
| `_layouts/`, `_includes/` | The page structure. |

## How the menus work

Each top menu item is a Jekyll collection. Adding a markdown file to a
collection folder creates a page in that category, and the left-hand menu is
built from the files it finds — no navigation file to edit.

Front matter that controls placement:

| Key | Effect |
| --- | --- |
| `title` | Page heading, menu label and breadcrumb. |
| `order` | Position in the left menu, lowest first. The lowest-ordered page in a collection is what the top menu links to. |
| `slug` | Short id. Child pages point at it. |
| `parent` | The `slug` of the parent page. Makes this a sub-item, shown when the parent section is open. |
| `hidden` | `true` publishes the page but keeps it out of the menu. |
| `updated` | Date shown in the "Page Manager" line at the foot of the page. |
| `page_manager` | Optional name shown next to that date. |

## Design

The look follows Lund University's graphic profile as implemented on
[www.robotics.lth.se](https://www.robotics.lth.se/start) (RobotLab LTH):

- **Colour.** Bronze `#9c6114` and dark blue `#000080` come from the LU
  logotype. The pastels — pink, light blue, green, beige, grey — carry most of
  the colour, bronze complements them, and dark blue is held back for the
  logotype and the footer. White and open space dominate, which is what the
  profile asks for.
- **Type.** Adobe Garamond Pro for headings and introductions, Frutiger LT Std
  for body text, per the profile. Both are licensed fonts, so the stacks in
  `style.scss` use them when a visitor has them installed and fall back to
  EB Garamond and Source Sans 3 otherwise.
- **Structure.** Utility bar with the parent-organisation links, masthead with
  the site name and the LTH logotype, a horizontal menu with drop-down
  submenus, breadcrumb plus section menu on inner pages, and a dark blue footer
  with the negative logotype, contact block and related-site columns.

Content was not touched in the restyle. Every page, news item and data value is
the same as before; only the templates and the stylesheet changed.

## Images

`_data/images.yml` points at the LTH logotype, its negative version and a
Robotlab photograph on www.robotics.lth.se, because this repository has no
local copies. Each reference falls back to a local placeholder if the remote
file moves. The file has a `curl` line showing how to download them into
`assets/img/` and switch to local paths, which is worth doing before the site
goes live. The two remaining slideshow images are placeholders drawn in the
profile colours.

## About the theme

The repository is its own theme. `_layouts`, `_includes` and
`assets/css/style.scss` supply the entire design, which is why `_config.yml`
has no `theme:` line — none of GitHub's supported themes is loaded, and nothing
is inherited that could change under you.

The file locations follow the conventions GitHub documents for customising a
theme, so switching later is additive rather than a rewrite:

- `_layouts/default.html` is the override point for a theme's default layout.
- `assets/css/style.scss` carries empty front matter, so adding
  `@import "{{ site.theme }}";` on the first line after it layers this
  stylesheet on top of a theme's.

To adopt one, add `theme: jekyll-theme-minimal` (supported themes) or
`remote_theme: owner/repository` plus the `jekyll-remote-theme` plugin. Local
files always take precedence over the theme's versions.

## Publishing source

The workflow deploys with GitHub Actions, which is what GitHub now recommends.
The site also builds under the older **Deploy from a branch** setting: the three
plugins it uses — `jekyll-paginate`, `jekyll-feed`, `jekyll-seo-tag` — are all on
the GitHub Pages allow-list, and the stylesheet avoids Sass that the older
builder cannot compile. See the `Gemfile` for how to reproduce that build
locally.

## Placeholders to replace

- `assets/img/lu-logo.svg` and `lu-logo-negative.svg` — fallbacks only, shown if
  the remote logotype fails to load. Replace with the official files from LU's
  Image and Media Bank.
- `assets/img/slider/*.svg` — swap in photographs, then point `_data/slider.yml`
  at the new filenames.
- `_publications/index.md` — the two entries are placeholders.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
