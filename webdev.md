---
layout: page
title: Web Development
---
{% for item in site.webdev %}
  <h2 style="display:inline"><a class="header_link" href="{{ item.url }}">{{ item.link }}</a></h2><p style="display:inline"> - {{ item.description }}</p>
{% endfor %}
