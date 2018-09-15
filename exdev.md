---
layout: page
title: Exploit Development
---

<p style="display:inline">- Becoming a Technical Ninja</p>

{% assign sorted = site.exdev | sort: 'date' %}
{% for item in sorted %}
  <a href="{{ item.url }}">{{ item.link }}</a> - {{ item.description }}
{% endfor %}
