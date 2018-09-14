---
layout: page
title: Exploit Development
---

<p style="display:inline">- Becoming a Technical Ninja</p>

{% for item in site.exdev %}
  <a href="{{ item.url }}">{{ item.link }}</a> - {{ item.description }}
{% endfor %}
