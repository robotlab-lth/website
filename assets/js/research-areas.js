/* Interactive topic map on the Research Areas page.
 *
 * Progressive enhancement: the tiles are plain anchor links to their
 * sections, so the page works without this script. With it, clicking a
 * tile selects the area, highlights its connected areas in sage, and
 * shows a panel listing how they connect.
 *
 * The area data comes from _data/research_areas.yml, embedded by the
 * layout as JSON in the data-areas attribute of .ra-map.
 */
(function () {
  'use strict';

  var map = document.querySelector('.ra-map');
  if (!map) return;

  var areas;
  try {
    areas = JSON.parse(map.getAttribute('data-areas'));
  } catch (err) {
    return; // data unavailable: leave the tiles as plain links
  }
  if (!Array.isArray(areas) || areas.length === 0) return;

  var byId = {};
  areas.forEach(function (a) { byId[a.id] = a; });

  var tiles = Array.prototype.slice.call(map.querySelectorAll('[data-ra-tile]'));
  var hint = map.querySelector('[data-ra-hint]');
  var detail = map.querySelector('[data-ra-detail]');
  var activeName = map.querySelector('[data-ra-active-name]');
  var linksWrap = map.querySelector('[data-ra-links]');
  var goto = map.querySelector('[data-ra-goto]');

  var active = null;

  if (hint) hint.hidden = false;

  function ownLinks(id) {
    // The connections an area itself declares, shown in the detail panel.
    return (byId[id].connects || []).filter(function (link) {
      return !!byId[link.to];
    });
  }

  function linkedSet(id) {
    // Bidirectional: a tile lights up if either side lists the other.
    var set = {};
    ownLinks(id).forEach(function (link) { set[link.to] = true; });
    areas.forEach(function (other) {
      if (other.id === id) return;
      (other.connects || []).forEach(function (link) {
        if (link.to === id) set[other.id] = true;
      });
    });
    return set;
  }

  function render() {
    var linked = active ? linkedSet(active) : {};

    tiles.forEach(function (tile) {
      var id = tile.getAttribute('data-ra-tile');
      var isActive = id === active;
      var isLinked = !!(active && linked[id]);
      tile.classList.toggle('is-active', isActive);
      tile.classList.toggle('is-linked', isLinked);
      tile.classList.toggle('is-dim', !!active && !isActive && !isLinked);
      tile.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      var badge = tile.querySelector('.ra-tile__badge');
      if (badge) badge.hidden = !isLinked;
    });

    if (!detail) return;
    if (!active) {
      detail.hidden = true;
      return;
    }

    detail.hidden = false;
    if (activeName) activeName.textContent = byId[active].name;
    if (goto) goto.setAttribute('href', '#sec-' + active);

    if (linksWrap) {
      linksWrap.textContent = '';
      ownLinks(active).forEach(function (c) {
        var btn = document.createElement('button');
        btn.type = 'button';
        var label = document.createElement('strong');
        label.textContent = byId[c.to].name;
        btn.appendChild(label);
        btn.appendChild(document.createTextNode(' \u00b7 ' + c.via));
        btn.addEventListener('click', function () {
          active = c.to;
          render();
        });
        linksWrap.appendChild(btn);
      });
    }
  }

  tiles.forEach(function (tile) {
    tile.setAttribute('role', 'button');
    tile.addEventListener('click', function (event) {
      event.preventDefault();
      var id = tile.getAttribute('data-ra-tile');
      active = active === id ? null : id;
      render();
    });
  });

  render();
})();
