angular-mappy
=============

Vector-based world map with hover tooltips in AngularJS

Requires jQuery >1.9.1

Screenshot
==========

![screenshot](http://i.imgur.com/jASro70.png)

Example HTML
============

Simplest format:

    <mappy data="data" map-data="mapPathData"></mappy>

See Attributes section and example.html for more info


Attributes
===========

#### map-data ####
This is the path data used to draw the map. I've included a miller projection world map in a separate file.

#### data ####

The data used to color the map. It can be defined in multiple formats:

1. Primitive

        data = {
          'GB' : 5,
          'US' : 3,
        }
2. Objects (html requires the 'key' attribute)

        data = {
          'GB' : {metric: 5},
          'US' : {metric: 3},
        }

3. Sub-categories (html requires the 'sub-category' attribute)

        data = {
          2005: {
            'GB': 5,
            'US': 3
          },
          2006: {
            'GB': 7,
            'US': 5
          }
        }
4. A combination of 2&3

#### key (optional) ####
used in conjunction with the data attribute

####sub-category (optional)####
used in conjunction with the data attribute

####colors (optional)####
An array of hex strings can be passed to the directive for the color calculation in the format
[minColor, midColor1, ..., maxColor]. This defaults to ["#FFFF00", "#FF0000"]. The color will calculated based on
where the value lies on the specified range.

#### min (optional) ####
value to map to the minimum color as specified in the color range

####max (optional)####
value to map to the maximum color as specified in the color range

####humanize-fn (optional)####
angular expression that takes a parameter 'val' and returns the tooltip text

####normalize-fn (optional)####
angular expression that takes a parameter 'val' and returns a mapped value between 0 and 1. defaults to linear normalization between min/max (calculated from the given data unless explicitly specified)
