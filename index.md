---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

{% for item in site.webdev %}
  <h2 style="display:inline">{{ item.title }}</h2><p style="display:inline"> - {{ item.description }}</p>
  <p><a href="{{ item.url }}">{{ item.link }}</a></p>
{% endfor %}
