---
title: Overview of Static Map solutions
description: 
date: 2014-05-27T09:53:57+00:00
oldUrl: https://justmarkup.com/log/2014/05/overview-of-static-map-solutions/
tags:
    - article
layout: layouts/post.njk
---

For a recent redesign we mananged to reduce the page size to under 500kB for almost every part, expect the sections where we included a dynamic map. The size of an average dynamic map was about 600kbB, thus we had to find different ways to show a map and came across Static Maps, which turned out to be the perfect solution for us.

Static Maps are relatively lightweight, can be customized and are the ideal candidate for progressive enhancement.  
  
I found the following solutions:

*   [Google Maps](#google)
*   [OpenStreetMap](#openstreetmap)
*   [Nokia HERE](#nokia)
*   [Yandex](#yandex)

### Google Maps

First of all, Google Maps. As described in the [Developer Guide](https://developers.google.com/maps/documentation/staticmaps/index) there are quite a few options to change the style of the map, add markers, paths and polygons. There are also [various](http://staticmapmaker.com/) [Map Generators](http://www.solvium.de/static-map/) available to help get you started.

Example:  

![static map image of downtown New York City](https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318 &markers=color:red%7Clabel:C%7C40.718217,-73.998284&sensor=false)

Code:

``` html
http://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
&markers=color:red%7Clabel:C%7C40.718217,-73.998284&sensor=false
```

#### Restrictions

The maximum image size is 640×640 (or 1280×1280 if you use scale=2) for the free version and 2048×2048 for the Business version.

The maximum quota per day is 1000 Static Maps image requests per IP address per 24 hour period and 25 000 Static Maps image requests per day if you use the [Google Maps API for Business](https://developers.google.com/maps/documentation/business/).

### OpenStreetMap

There are different ways to use OpenStreetMap Static Maps. As with Google Map all of these options comes with ways to customize the map. In most cases I would recommend either setting up your own web service or using the free online services available. If you however want to use a very specific map there are also [paid plans](https://www.mapbox.com/plans/) available.

*   staticMapLite [PHP webservice](http://staticmap.openstreetmap.de/)
*   Tyler [Python webservice](https://github.com/benbacardi/tyler)
*   MapQuest [Online Service (Free)](http://open.mapquestapi.com/staticmap/)
*   MapBox [Online Service (Free Plan available)](https://www.mapbox.com/blog/mapbox-static-api/)

Code:

``` html
http://open.mapquestapi.com/staticmap/v4/getmap?key=Kmjtd%7Cluu7n162n1%2C22%3Do5-h61wh&size=600,200&zoom=3¢er=35.60395,-98.906248&type=sat&pois=yellow_1,33.748867,-84.388185,0,0|yellow_1,29.763066,-95.363351,0,0
``` 

#### Restrictions

The solutions staticMapLite and Tyler which you can host on your own server comes with no restrictions.  
If you use Mapquest the maximum image size is 3840×3840 and there is no quota as far as I can see.  
MapBox has a size limit of 1280×1280 and the quota depends on your plan (3000/month for the free plan).

### Nokia HERE

Nokia HERE also offers a Static Map solution. To use it you have to create an [API Key](http://developer.here.com/get-started).  
As you can see in the [examples](https://developer.here.com/rest-apis/documentation/enterprise-map-image/topics/examples.html) there are various ways to style a map, including heat maps and picture-in-picture maps.

Example:  
![Example of picture in picture](https://justmarkup.com/log/wp-content/uploads/2014/05/picture-in-picture-nlp.jpg)

Code:

``` html
http://image.maps.cit.api.here.com/mia/1.6/mapview?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg&c=62.24167616,25.74536193&h=300&w=400&z=8&pip
```

#### Restrictions

The free plan has a limit of 10,000 requests / day and as far as I can see there are no restrictions regarding image size.

### Yandex

Last but not least also Yandex offers a [Static Map API](http://api.yandex.com/maps/doc/staticapi/1.x/dg/concepts/input_params.xml). It also offers basic options to set markers, define lines and polygons but lacks support for different styles.

Example:  
![](https://static-maps.yandex.ru/1.x/?lang=en-US&ll=32.810152,39.889847& \  size=450,450&z=10&l=map&pt=32.810152,39.889847,pm2rdl1~32.870152,39.869847,pm2rdl99)

Code:

``` html
http://static-maps.yandex.ru/1.x/?lang=en-US&ll=32.810152,39.889847& \ 
size=450,450&z=10&l=map&pt=32.810152,39.889847,pm2rdl1~32.870152,39.869847,pm2rdl99
```

#### Restrictions

The maximum size allowed for the map display is 650×450 pixels and the maximum requests per day is 25,000.

### Conclusion

Every solution has pros and cons and it’s up to you which solution works best for you and if you are either willing to pay or can live with the restrictions. If you however want no restrictions and be independent the best way is to host one of the OpenStreetMap solutions by yourself.