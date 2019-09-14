import phina from 'phina.js';
import {createFramesByTagProperty} from './lib';
import {ASSET_TYPE_KEY} from './const.js';

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
    this._maxFrameCount = 1;
  },

  /**
   * setup
   * @param  {AsepriteExportedJson} params
   * @return {this}
   */
  setup: function(params) {
    this._setupFrame(params.frames);
    this._setupAnim(params.meta.frameTags);

    /* experimental: import slices */
    this.slices = {};
    if (params.meta.slices) {
      params.meta.slices.forEach(function(sliceProp) {
        this.slices[sliceProp.name] = sliceProp;
      }.bind(this));
    }

    return this;
  },

  /**
   * experimental: get slice property's keys
   * @param  {string} name  name of slice
   * @param  {number} index keys index
   * @return {sliceData}
   */
  getSliceData: function(name, index) {
    index = index || 0;
    if (!this.slices[name]) {
      console.warn("[phina-aseprite-loader]: Slice name '"+name+"' doesn't exist.");
      return null;
    }
    return this.slices[name].keys[index];
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

    /* TODO: how to set next? */
    frameTags.forEach(function(tag) {
      this.animations[tag.name] = {
        frames: createFramesByTagProperty(tag),
        // next: "default",
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

  _accessor: {
    pivot: {
      get: function() {
        if (!this.slices.pivot) return null;
        return this.slices.pivot.keys[0].pivot;
      }
    }
  },

});

/* extend loader */
phina.asset.AssetLoader.register(ASSET_TYPE_KEY, function(key, path) {
  return phina.asset.AsepriteSpriteSheet().load(path);
});

/**
 * override FrameAnimation class
 */
phina.accessory.FrameAnimation.prototype.init = function(ss) {
  this.superInit();

  this.ss = phina.asset.AssetManager.get('spritesheet', ss) || phina.asset.AssetManager.get(ASSET_TYPE_KEY, ss);
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

export {default as AsepriteSprite} from "./Sprite.js";
export default phina;