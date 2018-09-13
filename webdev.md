---
layout: page
title: Web Development
nav: nav_default.html
---
<p style="display:inline">- How I Built this Blog</p>
{% for item in site.webdev %}
  <a href="{{ item.url }}">{{ item.link }}</a> - {{ item.description }}
{% endfor %}
