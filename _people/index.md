---
title: People
slug: people
order: 1
permalink: /people/
updated: 2024-10-08
---

<table>
  <tbody>
  {%- assign staff = site.people | where_exp: "p", "p.slug != 'people'" | sort: 'order' -%}
  {%- for person in staff -%}
    <tr>
      <td><a href="{{ person.url | relative_url }}">{{ person.title }}</a></td>
      <td>{{ person.role }}</td>
      <td>{% if person.email %}<a href="mailto:{{ person.email }}">{{ person.email }}</a>{% endif %}</td>
    </tr>
  {%- endfor -%}
  </tbody>
</table>

This list is generated from the files in `_people/`. Add yourself by opening a
pull request with a new file there — it appears in the table and gets its own
page automatically.
