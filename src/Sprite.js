import phina from 'phina.js';
import {ASSET_TYPE_KEY} from './const.js';

/**
 * @class phina.display.AsepriteSprite
 * @memberOf phina.display
 * @extends phina.display.Sprite
 *
 * @example
 * TODO
 *
 * @param {String | phina.asset.Texture | phina.graphics.Canvas} image (and ss key)
 * @param {String} ss - image and ss key
 */
export default phina.define("phina.display.AsepriteSprite", {
  superClass: phina.display.Sprite,

  /**
   * @constructor
   */
  init: function(image, ss) {
    this.superInit(image);
    ss = (ss) ? ss : (typeof image === 'string') ? image : null;
    this.animation = null;
    this._setupFrameAnimation(ss);
  },

  /**
   * @private
   * @param  {String} key - animationキー
   * @return {void}
   */
  _setupFrameAnimation: function(key) {
    if (!phina.asset.AssetManager.get(ASSET_TYPE_KEY, key)) {
      console.warn("[phina-aseprite-loader]: spritesheet {0} does not exist".format(key));
      return;
    }
    this.animation = phina.accessory.FrameAnimation(key).attachTo(this);

    // 中心点セット
    var pivot = this.animation.ss.pivot;
    if (pivot) {
      // console.log("pivot", pivot);
      this.setOrigin(pivot.x / this.width, pivot.y / this.height);
    }
  },

  /**
   * set and play Animation
   * @param {String} animationKey
   * @return {this}
   */
  setAnimation: function(animationKey) {
    this.animation.gotoAndPlay(animationKey);
    return this;
  },

  /**
   * 指定アニメーションにループを設定をする
   * @param {String} loopAnim - ループさせるアニメーション
   * @return {this}
   */
  setLoop: function(loopAnim) {
    if (this.animation.ss.getAnimation(loopAnim)) {
      this.animation.setNext(loopAnim, loopAnim)
    }
    return this;
  },
})