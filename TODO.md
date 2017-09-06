# TODO

* History search is inconsistent. A history item with the title "Selectors" is matched by search strings "s" and "sel" but not by "se". Bookmarks search doesn't seem to have this problem. Maybe consider loading all history items into state and manually filter them using regex. Could this cause performance issues?

* Some history items have a URL but not a title. What's causing this? Do we need a different way to display these items? Or can we come up with a universal way that works for both history items with and without titles.
