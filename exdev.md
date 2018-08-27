---
layout: page
title: Exploit Development
---

Some time ago I found Talos Intelligence Group's blog post called [How to Be Ninja](https://blog.talosintelligence.com/2009/07/how-do-i-become-ninja.html). It's a fantastic walk through on how to get started doing vulnerability research and exploit development. Here is one of their main points worth highlighting:

> The main thing with technical skills is you don't need to be a master of any of them, you need to be a master of recalling where the information you need is located.

I've lost count of the hours I've wasted trying to dig up the solution to a problem I'd solved before so I figured I'd put all my lessons learned in a spot that would benefit the community as well.
<hr>
<br>

<ul>
{% for item in site.exdev %}
  <li><h2 style="display:inline"><a class="header_link" href="{{ item.url }}">{{ item.link }}</a></h2><p style="display:inline"> - {{ item.description }}</p></li>
{% endfor %}
</ul>
