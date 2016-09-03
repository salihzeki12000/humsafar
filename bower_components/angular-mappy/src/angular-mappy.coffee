hue2rgb = (p, q, t) ->
  if t < 0 then t += 1
  if t > 1 then t -= 1
  if t < 1/6 then return p + (q - p) * 6 * t
  if t < 1/2 then return q
  if t < 2/3 then return p + (q - p) * (2/3 - t) * 6
  return p

# Color funcs converted to coffeescript from here: http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c

#  Converts an RGB color value to HSL. Conversion formula
#  adapted from http://en.wikipedia.org/wiki/HSL_color_space.
#  Assumes r, g, and b are contained in the set [0, 255] and
#  returns h, s, and l in the set [0, 1].
#
#  @param   Number  r       The red color value
#  @param   Number  g       The green color value
#  @param   Number  b       The blue color value
#  @return  Array           The HSL representation
rgbToHsl = (r, g, b) ->
  r /= 255
  g /= 255
  b /= 255
  max = Math.max(r, g, b)
  min = Math.min(r, g, b)
  l = (max + min) / 2

  if max == min
    h = s = 0
  else
    d = max - min
    s = if l > 0.5 then d / (2 - max - min) else d / (max + min)
    switch max
      when r then h = (g - b) / d + (if g < b then 6 else 0)
      when g then h = (b - r) / d + 2
      when b then h = (r - g) / d + 4
    h /= 6

  return [h, s, l]


#  Converts an HSL color value to RGB. Conversion formula
#  adapted from http://en.wikipedia.org/wiki/HSL_color_space.
#  Assumes h, s, and l are contained in the set [0, 1] and
#  returns r, g, and b in the set [0, 255].
#
#  @param   Number  h       The hue
#  @param   Number  s       The saturation
#  @param   Number  l       The lightness
#  @return  Array           The RGB representation

hslToRgb = (h, s, l) ->
  if s == 0
    r = g = b = l # achromatic
  else
    q = if l < 0.5 then l * (1 + s) else l + s - l * s
    p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)

  return [r * 255, g * 255, b * 255]


#  Converts an RGB color value to HSV. Conversion formula
#  adapted from http://en.wikipedia.org/wiki/HSV_color_space.
#  Assumes r, g, and b are contained in the set [0, 255] and
#  returns h, s, and v in the set [0, 1].
#
#  @param   Number  r       The red color value
#  @param   Number  g       The green color value
#  @param   Number  b       The blue color value
#  @return  Array           The HSV representation

rgbToHsv = (r, g, b) ->
  r = r/255
  g = g/255
  b = b/255
  max = Math.max(r, g, b)
  min = Math.min(r, g, b)
  v = max

  d = max - min;
  s = if max == 0 then 0 else d / max

  if max == min
    h = 0 # achromatic
  else
    switch max
      when r then h = (g - b) / d + (if g < b then 6 else 0)
      when g then h = (b - r) / d + 2
      when b then h = (r - g) / d + 4
    h /= 6

  return [h, s, v]

#  Converts an HSV color value to RGB. Conversion formula
#  adapted from http://en.wikipedia.org/wiki/HSV_color_space.
#  Assumes h, s, and v are contained in the set [0, 1] and
#  returns r, g, and b in the set [0, 255].
#
#  @param   Number  h       The hue
#  @param   Number  s       The saturation
#  @param   Number  v       The value
#  @return  Array           The RGB representation

hsvToRgb = (h, s, v) ->
  i = Math.floor(h * 6)
  f = h * 6 - i
  p = v * (1 - s)
  q = v * (1 - f * s)
  t = v * (1 - (1 - f) * s)

  switch i % 6
    when 0 then r = v; g = t; b = p;
    when 1 then r = q; g = v; b = p;
    when 2 then r = p; g = v; b = t;
    when 3 then r = p; g = q; b = v;
    when 4 then r = t; g = p; b = v;
    when 5 then r = v; g = p; b = q;

  return [r * 255, g * 255, b * 255]

rgbToHex = (r, g, b) -> "#" + ((1 << 24) + (parseInt(r,10) << 16) + (parseInt(g,10) << 8) + parseInt(b,10)).toString(16).slice(1)

hexToRgb = (hex) ->
  result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return if result then {
      r: parseInt(result[1], 16)
      g: parseInt(result[2], 16)
      b: parseInt(result[3], 16)
  } else null

colorCache = {}

getRgb = (hex) ->
  if !colorCache[hex] then colorCache[hex] = hexToRgb(hex)
  return colorCache[hex]

valueToColorRgb = (val, scale) ->
  epsilon = 0.00001
  if val == 0 or val < epsilon then return scale[0]
  if val == 1 then return scale[scale.length-1]
  numSegments = scale.length - 1
  segmentSize = 1 / numSegments
  thisSegment = parseInt(val / segmentSize, 10)
  thisSegmentStart = thisSegment * segmentSize
  distanceIntoSegment = ( val - thisSegmentStart ) / segmentSize

  c1 = scale[thisSegment]
  c2 = scale[thisSegment+1]

  range = { r: c2.r - c1.r, g: c2.g - c1.g, b: c2.b - c1.b }
  return {
    r: c1.r + range.r * distanceIntoSegment
    g: c1.g + range.g * distanceIntoSegment
    b: c1.b + range.b * distanceIntoSegment
  }

valueToColorHex = (val, scale) ->
  hexScale = (getRgb(color) for color in scale)
  c = valueToColorRgb(val, hexScale)
  return rgbToHex( c.r, c.g, c.b )

template ="""
<svg fill="#ff0000" ng-mousedown="click($event)" ng-attr-width="{{elementWidth}}" ng-attr-height="{{(elementWidth / mapData.width) * mapData.height}}" >
  <g transform="scale({{ (elementWidth / mapData.width) * zoom }}) translate({{translate.x}} {{translate.y}})" >
    <path ng-repeat="(cc, path) in mapData.paths" ng-attr-d="{{path.path}}"
          fill="{{ hover.cc==cc && !hover.out ? processedData[cc].hoverColor : processedData[cc].color }}"
          ng-mouseover="mouseover($event, path, cc)"
          ng-mousemove="mousemove($event, path, cc)"
          ng-mouseout="mouseout($event, path, cc)"
          ng-mousedown="mousedown($event, path, cc)">
    </path>
  </g>
</svg>
<div class="data-tooltip" ng-show="hover && (hover.out == false)"
     ng-mouseover="hover.out = false" ng-mouseout="hover.out=true" >
<div class="data-tooltip-header">{{hover.name}}</div>
<div class="data-tooltip-value">{{ hover.value }}</div>
</div>
"""
# style="position:fixed; left: {{hover.x}}px; top: {{hover.y+40}}px;"

linearNormalize = (val, min, max) ->
  range = max - min
  if range == 0 or val==undefined then return null
  normalized = (val - min) / range
  return normalized

mapColor = (normalized, colors) ->
  if normalized == undefined || normalized == null || isNaN(normalized) then return null
  normalized = Math.min(1.0, Math.max(0, normalized))
  try
    return valueToColorHex(normalized, colors)
  catch e
    console.log("ERROR", normalized)

lighten = (color, factor) ->
  c = hexToRgb(color)
  h = rgbToHsl(c.r,c.g,c.b)
  h[2] *= factor
  r = hslToRgb(h[0],h[1],h[2])
  return rgbToHex(r[0],r[1],r[2])

normalizeFilter = ($scope) ->
  (input) ->

toColorFilter = ($scope) ->
  (input) ->
    normalized = $scope.normalizeFn(input)
    return mapColor(normalized, $scope.colors)


mappyDefinition = ($window, $timeout) ->
  restrict: "EA"
  template: template
  scope:
    data: "=?"
    key: "@"
    subCategory: "@"
    colors: "=?"
    min: "@"
    max: "@"
    nullDataColor: "@"
    normalizeFn: "&"
    humanizeFn: "&"
    clickFn: "&"
    refreshWatch: "@"
    mapData: "=?"
  compile: () ->
    self = this
    $w = angular.element($window)

    pre: (scope,element,attrs) ->
      if not attrs.mapData? then throw Exception("No map data specified (map-data attribute)")
      scope.hover = {}

    post: (scope,element,attrs) ->
      margin = {top:10, left:0}

      tooltip = element.find('.data-tooltip')
      svg = element.find("svg")
      if !scope.colors then scope.colors = ["#FFFF00", "#FF0000"]

      if !scope.nullDataColor
        scope.nullDataColor = "#dddddd"
        attrs.$set('null-data-color', scope.nullDataColor)
      normalizeFn = (args) ->
        if attrs.normalizeFn then return scope.normalizeFn(args)
        else return linearNormalize(args.val, args.min, args.max)

      scope.zoom = 1
      scope.translate = {x:margin.left,y:margin.top}
      scope.processedData = {}

      getData = () ->
        if !scope.data then return null
        if scope.subCategory then scope.data[scope.subCategory] else scope.data
      getValue = (cc) ->
        data = getData()
        if !data then return undefined
        dp = data[cc]
        if dp == undefined then return undefined
        return if scope.key then dp[scope.key] else dp


      valueToTooltip = (cc) -> # converts given value to tooltip text (using supplied humanize func)
        if !scope.data then return "No dataset selected"
        v = getValue(cc)
        if v == undefined then return "No data"
        else if attrs.humanizeFn then return scope.humanizeFn({val: v})
        else return v


      calcMinMax = ->
        data = getData()
        min = Infinity
        max = -Infinity
        for cc, dp of data
          v = getValue(cc)
          min = Math.min(min, v)
          max = Math.max(max, v)
        scope.min = min
        scope.max = max

      updateColors = () ->

        if !attrs.min || !attrs.max then calcMinMax()

        scope.processedData = []

        data = getData()
        for cc,path of scope.mapData.paths
          country = {} # this data point
          scope.processedData[cc] = country
          col = scope.nullDataColor || "#dddddd"
          country.color = col
          country.hoverColor = lighten(col, 0.8)
          country.tooltip = valueToTooltip(cc)

        if data
          if scope.min == undefined || scope.max == undefined then calcMinMax()

          for cc, dp of data
            v = getValue(cc)

            if scope.mapData.paths[cc]
              normalized = normalizeFn({val:v, min: scope.min, max:scope.max})
              col = mapColor(normalized, scope.colors) || scope.nullDataColor
              scope.processedData[cc].color = col
              scope.processedData[cc].hoverColor = lighten(col, 0.8)


      scope.$watchCollection ['subCategory','refreshWatch'], () -> updateColors()
      scope.$watch 'data', updateColors
      scope.$watch "key", updateColors

      setTranslateInBounds = (x,y) ->
        scale = scope.elementWidth / scope.mapData.width
        scope.translate.x = Math.min(0+margin.left, x )
        scope.translate.y = Math.min(0+margin.top, y )
        mapHeight = (scope.elementWidth / scope.mapData.width) *  scope.mapData.height
        maxTranslateY = (mapHeight / (scale*scope.zoom)) - scope.mapData.height
        maxTranslateX = (scope.elementWidth / (scale*scope.zoom)) - scope.mapData.width
        scope.translate.x = Math.max(maxTranslateX+margin.left,scope.translate.x )
        scope.translate.y = Math.max(maxTranslateY+margin.top,scope.translate.y )

      calculateScale = () -> (scope.elementWidth / scope.mapData.width) * scope.zoom


      # ZOOM / CLICK-DRAG

      if not attrs.noScrollZoom?
        svg.on "mousewheel", (e, delta) ->
          up = if e.originalEvent.wheelDelta > 0 then true else false
          newZoom = Math.max(1.0, scope.zoom * if up then 1.2 else 0.8)
          newZoom = Math.min(10, newZoom)
          oldZoom = scope.zoom
          scale = scope.elementWidth / scope.mapData.width
          pX = (e.offsetX / (scale*oldZoom)) - scope.translate.x
          pY = (e.offsetY / (scale*oldZoom)) - scope.translate.y
          scope.zoom = newZoom

          transX = (e.offsetX/(scale*newZoom)) - pX
          transY = (e.offsetY/(scale*newZoom)) - pY
          setTranslateInBounds(transX, transY)

          scope.$apply()
          e.preventDefault();


        scope.click = (event) ->
          $w.on('selectstart.angular-mappy', () -> return false)
          startX = scope.translate.x
          startY = scope.translate.y
          scale = calculateScale()

          $w.on 'mousemove.mappy', (e) ->
            newX = startX + (e.pageX - event.pageX) / scale
            newY = startY + (e.pageY - event.pageY) / scale
            setTranslateInBounds(newX, newY)
            scope.$apply()

          $w.on 'mouseup.mappy', (e) ->
            $w.unbind 'mousemove.mappy'
            $w.unbind 'mouseup.mappy'
            $w.unbind('selectstart.angular-mappy')



      # COUNTRY+MOUSE EVENTS

      scope.mouseover = (event, path, cc) ->
        scope.hover.value = scope.processedData[cc].tooltip
        scope.hover.out = false
        scope.hover.x = event.offsetX
        scope.hover.y = event.offsetY
        scope.hover.name = path.name
        scope.hover.cc = cc


      scope.mouseout = (event, path, cc) ->
        scope.hover.out = true

      scope.mousedown = (event, path, cc) ->
        scope.hover.out=true
        scope.clickFn({event:event, cc:cc})

      scope.mousemove = (event) ->
        scope.hover.x = event.clientX
        scope.hover.y = event.clientY
        tooltip.css({left: scope.hover.x, top: scope.hover.y + 40})


      # RESIZE HANDLING

      resize = -> scope.elementWidth = element.width()

      $w.on "resize", () ->
        if element.css('display') != 'none'
          resize()
          scope.$apply()

      id = element.attr('id')
      if id then scope.$on "redrawmappy.#{id}", -> $timeout( resize, 20 )

      resize()




angular.module('mappy', [])
  .directive('mappy',mappyDefinition)
  .filter('mapToColor',toColorFilter)
