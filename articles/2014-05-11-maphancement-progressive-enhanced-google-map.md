---
title: Maphancement – progressive enhanced Google Map
description: 
date: 2014-05-11T13:50:39+00:00
tags:
    - article
layout: layouts/post.njk
---

For most websites I build these days I have to integrate a map, mostly as a bonus for the contact page. Until now I simple used an Iframe loading a Google Map with the desired address centered. This however comes with a cost, even a realativeley small map loads ~600 KB (See [this example of a 400×200 map](http://jsbin.com/xezey/2)).

That’s why I searched for a way to show the address in a visual way without loading unnecessary data and stumbled across [Static Maps](https://developers.google.com/maps/documentation/staticmaps/). Showing the example from above as a static map, we save ~550 KB, which is fantastic for news for performance.  

![Static map of Brooklyn Bridge, New York, USA](https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614-74.012318 &markers=color:red%7Clabel:C%7C40.718217,-73.998284&sensor=false)  
Example of a Static Map

Ok, problem solved? Well, you could offer an additional link to the full map to give users a way to navigate through the map and you are probably good to go. Thinking about some of clients I know, this isn’t enough, they want a dynamic map directly on their site. And that’s way I created Maphancement (silly play of words from map and enhanced). It is a tiny JavaScript code which converts the static map into a dynamic map once the user interacts (clicks, drags) with the map. This way we still loose ~90% of KB on first page load, whereas we can still offer a dynamic map if desired.

You can find more infos and the code in the [Github Repo](https://github.com/justmarkup/maphancement).