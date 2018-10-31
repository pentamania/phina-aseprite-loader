import phina from 'phina.js';
var ASSET_TYPE = "aseprite";

/**
 * @class phina.asset.AsepriteSpriteSheet
 * @extends phina.asset.Asset
 */
phina.define('phina.asset.AsepriteSpriteSheet', {
  superClass: phina.asset.Asset,

  /**
   * @constructor
   */
  init: function() {
    this.superInit();
    this.pivot;
    this._maxFrameCount = 1;
  },

  setup: function(params) {
    this._setupFrame(params.frames);
    this._setupAnim(params.meta.frameTags);

    // setupPivot(WIP)
    var pivotSliceData = params.meta.slices.find(function(item) {
      return item.name === "Pivot";
    });
    if (pivotSliceData) {
      this.pivot = pivotSliceData.keys[0].pivot;
    }
    return this;
  },

  _load: function(resolve) {
    var self = this;

    if (typeof this.src === 'string') {
      var xml = new XMLHttpRequest();
      xml.open('GET', this.src);
      xml.onreadystatechange = function() {
        if (xml.readyState === 4) {
          if ([200, 201, 0].indexOf(xml.status) !== -1) {
            var data = xml.responseText;
            var json = JSON.parse(data);

            self.setup(json);

            resolve(self);
          }
        }
      };

      xml.send(null);
    }
    else {
      this.setup(this.src);
      resolve(self);
    }
  },

  _setupFrame: function(rawFrames) {
    var frames = this.frames = [];
    // rawFramesがhash型,Array型どちらでも対応
    rawFrames.forIn(function(key, val) {
      var f = val.frame;
      frames.push({
        x: f.x,
        y: f.y,
        width: f.w,
        height: f.h,
        duration: val.duration,
      });
    });
    this._maxFrameCount = frames.length;
  },

  _setupAnim: function(frameTags) {
    this.animations = {};

    this.animations["default"] = {
      frames: [].range(0, this._maxFrameCount),
      next: "default",
      frequency: 1,
    };

    /* TODO: set next */
    frameTags.forEach(function(tag) {
      this.animations[tag.name] = {
        frames: [].range(tag.from, tag.to+1),
        // next: "default",
        // next: tag.name,
      };
    }.bind(this));
  },

  getFrame: function(index) {
    return this.frames[index];
  },

  getAnimation: function(name) {
    name = (name !== undefined) ? name : "default";
    return this.animations[name];
  },

});

/* extend loader */
phina.asset.AssetLoader.register(ASSET_TYPE, function(key, path) {
  return phina.asset.AsepriteSpriteSheet().load(path);
});

/**
 * override FrameAnimation class
 */
phina.accessory.FrameAnimation.prototype.init = function(ss) {
  this.superInit();

  this.ss = phina.asset.AssetManager.get('spritesheet', ss) || phina.asset.AssetManager.get(ASSET_TYPE, ss);
  if (!this.ss) {
    console.error("[phina.js] spritesheet '{0}' doesn't exist.".format(ss));
    return;
  }
  this.paused = true;
  this.finished = false;
  this.fit = true;

  this.currentAnimationFrame = null; // add
  this._elapsedTime = 0; // add
};

phina.accessory.FrameAnimation.prototype.update = function(app) {
  if (this.paused) return ;
  if (!this.currentAnimation) return ;

  if (this.finished) {
    this.finished = false;
    this.currentFrameIndex = 0;
    return ;
  }

  ++this.frame;
  if (this.currentAnimation.frequency != null) {
    if (this.frame%this.currentAnimation.frequency === 0) {
      ++this.currentFrameIndex;
      this._updateFrame();
      return;
    }
  }

  /*
    realtime duration based animation
    works when currentFrame has a duration property
   */
  this._elapsedTime += app.deltaTime;
  if (this.currentAnimationFrame && this.currentAnimationFrame.duration != null) {
    if (this.currentAnimationFrame.duration <= this._elapsedTime) {
      ++this.currentFrameIndex;
      this._updateFrame();
      this._elapsedTime = 0; // reset
    }
  }
};

phina.accessory.FrameAnimation.prototype._updateFrame = function() {
  var anim = this.currentAnimation;
  if (anim) {
    if (this.currentFrameIndex >= anim.frames.length) {
      if (anim.next) {
        this.gotoAndPlay(anim.next);
        return;
      }
      else {
        this.paused = true;
        this.finished = true;
        this.flare('ended');
        return ;
      }
    }
  }

  var index = anim.frames[this.currentFrameIndex];
  var frame = this.ss.getFrame(index);
  this.target.srcRect.set(frame.x, frame.y, frame.width, frame.height);
  this.currentAnimationFrame = frame; // add

  if (this.fit) {
    this.target.width = frame.width;
    this.target.height = frame.height;
  }
};

// TODO
phina.accessory.FrameAnimation.prototype.setNext = function(targetAnim, next) {
  targetAnim = this.ss.getAnimation(targetAnim);
  targetAnim.next = next;
  return this;
}

export default phina;