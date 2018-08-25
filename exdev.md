---
layout: page
title: Exploit Development
---

Some time ago I found the Cisco Talos Intelligence Group's blog post called [How to Be Ninja](https://blog.talosintelligence.com/2009/07/how-do-i-become-ninja.html). It's a fantastic walk through on how to get started doing vulnerability research and exploit development. One of their key points is the following:

> 3. The main thing with technical skills is you don't need to be a master of any of them, you need to be a master of recalling where the information you need is located.

Working through and solving these problems is good, but documenting them and keeping them as a resource to reach back to is better. I've lost count of the hours I've wasted trying to dig up the solution to a problem I'd solved before. So why not keep all the information in one convenient spot?

What follows are my write ups walking through each of the steps. The purpose of the exercises is to struggle with the material and learn what's happening, as the Talos group noted:

> All the answers are on google if you get stuck (but don't cheat, it's not worth it).

Use this as a resource when you get stuck, use this to compare your solution when you're done, but to maximize what you learn, struggle with the concepts as much as possible. The understanding that comes as you get through [The Cliffs of Despair](https://www.thinkful.com/blog/why-learning-to-code-is-so-damn-hard/) is worth the effort.

  {% for item in site.exdev %}

    <h2 style="display:inline"><a class="header_link" href="{{ item.url }}">{{ item.link }}</a></h2><p style="display:inline"> - {{ item.description }}</p>
  {% endfor %}