phina-aseprite-loader
===

[phina.js](https://phinajs.com/) plugin to load and use [aseprite](https://www.aseprite.org/) exported sprite-sheet.

## Install

```npm install phina-aseprite-loader```

```js
import * as phina from 'phina.js';
import "phina-aseprite-loader";
```

or

```html
<!-- index.html -->
<script src='path/to/phina.js'></script>
<script src='path/to/phina-aseprite-loader.js'></script>
```

This plugin is also [available in jsDelivr](https://www.jsdelivr.com/package/npm/phina-aseprite-loader).

```html
<script src='https://cdn.jsdelivr.net/npm/phina.js@0.2.2/build/phina.min.js'></script>
<script src='https://cdn.jsdelivr.net/npm/phina-aseprite-loader@latest/dist/phina-aseprite-loader.min.js'></script>
```

## Example
Almost same as built-in FrameAnimation class.

```js
phina.main(function() {
  var app = phina.game.GameApp({
    startLabel: 'main',
    assets: {
      image: {
        tomapiko: "assets/tomapiko_ss.png", // exported sprite sheet image
      },
      aseprite: {
        tomapiko_ss: "assets/tomapiko_ss.json",  // exported json
      },
    },
  });

  app.run();
});

phina.define('MainScene', {
  superClass: 'phina.display.DisplayScene',

  init: function(options) {
    this.superInit(options);

    var sprite = this.sprite = phina.display.Sprite('tomapiko')
      .setPosition(this.width, this.height*0.5)
      .addChildTo(this)
    ;
    var animation = phina.accessory.FrameAnimation("tomapiko_ss")
      .attachTo(sprite);
    animation.setNext("walk", "walk"); // infinite looping of walk animation
    animation.gotoAndPlay("walk"); // play animation!
  },

});
```

# License
MIT