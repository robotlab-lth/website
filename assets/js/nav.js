/* Main menu drop-downs.
 *
 * Mouse users get the plain CSS :hover behaviour, which can only ever show
 * one submenu. This script covers keyboard and touch, where focus used to
 * stick to a menu item and leave its submenu pinned open behind the next
 * one. It guarantees that at most one submenu is open at a time:
 *
 * - moving focus into a top-level item opens its submenu and closes the rest
 * - moving focus out of the menu, clicking elsewhere or pressing Escape
 *   closes everything
 */
(function () {
  var nav = document.querySelector('.mainnav');
  if (!nav) return;

  var items = Array.prototype.slice.call(nav.querySelectorAll(':scope > .wrap > ul > li'));

  function closeAll(except) {
    items.forEach(function (li) {
      if (li !== except) li.classList.remove('is-open');
    });
  }

  // Keyboard: opening follows focus, so tabbing through the menu never
  // leaves an earlier submenu behind.
  nav.addEventListener('focusin', function (event) {
    var li = event.target.closest('.mainnav > .wrap > ul > li');
    closeAll(li);
    if (li && li.querySelector('.submenu')) li.classList.add('is-open');
  });

  // Pointer: hovering an item drops any submenu still pinned open by focus,
  // so the hovered drop-down is the only one on screen.
  items.forEach(function (li) {
    li.addEventListener('pointerenter', function () {
      closeAll(li);
    });
  });

  nav.addEventListener('focusout', function (event) {
    // Wait a tick so focus has settled on the next element.
    window.setTimeout(function () {
      if (!nav.contains(document.activeElement)) closeAll(null);
    }, 0);
  });

  document.addEventListener('click', function (event) {
    if (!nav.contains(event.target)) closeAll(null);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeAll(null);
  });
})();
