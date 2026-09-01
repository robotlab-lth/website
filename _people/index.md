---
title: People
slug: people
order: 1
layout: page
wide: true
hidden: false
permalink: /people/
updated: 2024-10-08
---

{%- assign staff = site.people | where_exp: "p", "p.slug != 'people'" | sort: 'surname' -%}
<p class="people-count">{{ staff.size }} member{% if staff.size != 1 %}s{% endif %} &middot; sorted by last name</p>

<ul class="people-grid">
  {%- for person in staff -%}
  <li class="person-card">
    <a class="person-card-photo" href="{{ person.url | relative_url }}" tabindex="-1" aria-hidden="true">
      <img src="{{ person.photo | default: '/assets/img/avatar.svg' | relative_url }}" alt="" loading="lazy">
    </a>
    <div class="person-card-text">
      <h2><a href="{{ person.url | relative_url }}">{{ person.title }}</a></h2>
      {%- if person.email %}
      <p class="person-card-email"><a href="mailto:{{ person.email }}">{{ person.email }}</a></p>
      {%- endif %}
      {%- if person.role %}<p class="person-card-role">{{ person.role }}</p>{% endif %}
      {%- if person.affiliations %}
      <ul class="person-card-affiliations">
        {%- for aff in person.affiliations %}<li>{{ aff }}</li>{% endfor %}
      </ul>
      {%- endif %}
      <p class="person-card-desc">{{ person.content | markdownify | strip_html | strip_newlines | truncatewords: 36 }}</p>
      {%- if person.portal %}
      <p class="person-card-portal"><a href="{{ person.portal }}">Research portal profile</a></p>
      {%- endif %}
    </div>
  </li>
  {%- endfor -%}
</ul>

This list is generated from the files in `_people/`. Add yourself by opening a
pull request with a new file there — it appears in the grid and gets its own
page automatically.
