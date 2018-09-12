---
layout: page
title: Web Development
---
<p style="display:inline">- How I Built this Blog</p>
{% for item in site.webdev %}
  <a href="{{ item.url }}">{{ item.link }}</a> - {{ item.description }}
{% endfor %}
