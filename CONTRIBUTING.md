# Contributing

Everything on the site is a markdown file. You do not need to install anything:
add or edit a file on github.com and open a pull request. A check builds the
site on every pull request, so you find out before merging whether it works.

## Add a news item

1. Go to `_posts/` and choose **Add file → Create new file**.
2. Name it `YYYY-MM-DD-short-title.md`, for example
   `2026-02-14-welcome-maria.md`. The date must be the date in the front matter.
3. Paste this and edit it:

```markdown
---
title: Welcome Maria
date: 2026-02-14
---

Maria Andersson joins the group as a PhD student, working with Elin on
mixed-initiative interaction.
```

4. Choose **Create a new branch and start a pull request**.

The item appears at the top of the front page, in the news archive, and in the
RSS feed. The first sentences are used as the excerpt behind the `[more]` link.

## Add a page to a menu category

Copy `templates/page.md` into the folder for the category:

| Menu | Folder |
| --- | --- |
| Research | `_research/` |
| Education | `_education/` |
| Publications | `_publications/` |
| People | `_people/` |
| About | `_about/` |

Name the file after the page, in lowercase with hyphens: `robot-safety.md`.
Then set the front matter:

```markdown
---
title: Robot Safety
slug: robot-safety
order: 8
updated: 2026-02-14
---

Your text here.
```

`order` decides where it sits in the left-hand menu. Leave gaps between numbers
so pages can be inserted later without renumbering everything.

## Make it a sub-page

To nest a page under another one, give it the parent's `slug`:

```markdown
---
title: Safety Case Studies
slug: safety-case-studies
parent: robot-safety
order: 9
---
```

Sub-pages appear indented under their parent when that section is open.

## Add yourself to People

Copy `templates/person.md` to `_people/your-name.md`. Keep `hidden: true` — the
People page builds its table from these files, so you are listed there and get
your own page, without crowding the menu.

## Change the front page

| To change | Edit |
| --- | --- |
| Slideshow | `_data/slider.yml` (and add the image to `assets/img/slider/`) |
| The two coloured boxes | `_data/promos.yml` |
| Seminars and defences | `_data/calendar.yml` |
| Footer link columns | `_data/footer.yml` |

## Conventions

- Filenames lowercase, words separated by hyphens, no spaces.
- Links inside the site start with a slash: `/research/robotlab/`.
- Images go in `assets/img/` and are referenced as `/assets/img/name.jpg`.
- Swedish and English text are both fine; keep a page in one language.
- Front matter values with a colon in them need quotes: `title: "Robots: a
  primer"`.

## Review

A maintainer reviews the pull request. Content changes are usually merged the
same week. If the build check fails, open the log — it names the file and line.
