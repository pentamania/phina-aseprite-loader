phina-aseprite-loader
===

[phina.js](https://phinajs.com/) plugin to load and use [aseprite](https://www.aseprite.org/) exported sprite sheet.

# Usage

## Install

```npm install -S pentamania/phina-aseprite-loader```

```js
import phina from 'phina.js';
import "phina-aseprite-loader";
```

or

```html
<!-- index.html -->
<script src='path/to/phina.js'></script>
<script src='path/to/phina-aseprite-loader.js'></script>
```

## Example
Almost same as built-in spritesheet class.

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

    var tomapiko = phina.display.Sprite('tomapiko');
    var animation = phina.accessory.FrameAnimation("tomapiko_ss")
    .attachTo(tomapiko);
    animation.gotoAndPlay("walk");
  },
});
```

# License
MIT