import phina from 'phina.js';
import {ASSET_TYPE_KEY} from './const.js';

/**
 * @override
 * FrameAnimation class constuctor
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

/**
 * @override
 * FrameAnimation class update func
 */
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

  // realtime duration based animation
  // works when currentFrame has a "duration" property
  this._elapsedTime += app.deltaTime;
  if (this.currentAnimationFrame && this.currentAnimationFrame.duration != null) {
    if (this.currentAnimationFrame.duration <= this._elapsedTime) {
      ++this.currentFrameIndex;
      this._updateFrame();
      this._elapsedTime = 0; // reset
    }
  }
};

/**
 * @override
 * FrameAnimation class _updateFrame
 */
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

/**
 * experimental
 * @method
 * @memberof phina.accessory.FrameAnimation
 *
 * @param {String} targetAnim - 後続のアニメーションを設定する対象
 * @param {String} next - 後続アニメーション
 */
phina.accessory.FrameAnimation.prototype.setNext = function(targetAnim, next) {
  targetAnim = this.ss.getAnimation(targetAnim);
  targetAnim.next = next;
  return this;
}
