---
layout: page
title: Resources
description:
permalink: /resources/
---
<p style="display:inline">- Things I've Found Helpful</p>

<p class="disclosure">
<em>
  {{ site.url }} is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to amazon.com. As an Amazon Associate I earn from qualifying purchases.
</em>
</p>

<table>
  {% for resource in site.data.resources %}
    <tr>
      <td style="min-width:100px"> {{ resource.image }} </td>
      <td> {{ resource.desc }} </td>
    </tr>
  {% endfor %}
</table>
