---
layout: page
title: Web Development
nav: nav_default.html
---
<p style="display:inline">- How I Built this Blog</p>

{% assign sorted = site.webdev | sort: 'date' %}
{% for item in sorted %}
  <a href="{{ item.url }}">{{ item.link }}</a> - {{ item.description }}
{% endfor %}
