/*!
 * 
 * phina-aseprite-loader v0.2.0
 * MIT Licensed
 * Copyright (C) pentamania
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("phina.js"));
	else if(typeof define === 'function' && define.amd)
		define(["phina.js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("phina.js")) : factory(root["phina"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_phina_js__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var phina_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phina.js */ "phina.js");
/* harmony import */ var phina_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phina_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib */ "./src/lib.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_1__);


var ASSET_TYPE = "aseprite";

/**
 * @class phina.asset.AsepriteSpriteSheet
 * @extends phina.asset.Asset
 */
phina_js__WEBPACK_IMPORTED_MODULE_0___default.a.define('phina.asset.AsepriteSpriteSheet', {
  superClass: phina_js__WEBPACK_IMPORTED_MODULE_0___default.a.asset.Asset,

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
        frames: Object(_lib__WEBPACK_IMPORTED_MODULE_1__["createFramesByTagProperty"])(tag),
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
phina_js__WEBPACK_IMPORTED_MODULE_0___default.a.asset.AssetLoader.register(ASSET_TYPE, function(key, path) {
  return phina_js__WEBPACK_IMPORTED_MODULE_0___default.a.asset.AsepriteSpriteSheet().load(path);
});

/**
 * override FrameAnimation class
 */
phina_js__WEBPACK_IMPORTED_MODULE_0___default.a.accessory.FrameAnimation.prototype.init = function(ss) {
  this.superInit();

  this.ss = phina_js__WEBPACK_IMPORTED_MODULE_0___default.a.asset.AssetManager.get('spritesheet', ss) || phina_js__WEBPACK_IMPORTED_MODULE_0___default.a.asset.AssetManager.get(ASSET_TYPE, ss);
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

phina_js__WEBPACK_IMPORTED_MODULE_0___default.a.accessory.FrameAnimation.prototype.update = function(app) {
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

phina_js__WEBPACK_IMPORTED_MODULE_0___default.a.accessory.FrameAnimation.prototype._updateFrame = function() {
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
phina_js__WEBPACK_IMPORTED_MODULE_0___default.a.accessory.FrameAnimation.prototype.setNext = function(targetAnim, next) {
  targetAnim = this.ss.getAnimation(targetAnim);
  targetAnim.next = next;
  return this;
}

/* harmony default export */ __webpack_exports__["default"] = (phina_js__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "./src/lib.js":
/*!********************!*\
  !*** ./src/lib.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

var getLinearStepArray = function() {
  var args = Array.prototype.slice.call(arguments);
  var arr = [];
  args.forEach(function(current, i) {
    var target = args[i+1];
    if (target == null || current === target) return;

    if (current < target) {
      for (var i = current; i < target; i++) {
        arr.push(i);
      }
    } else {
      for (var i = current; i > target; i--) {
        arr.push(i);
      }
    }
  });

  return arr;
}

module.exports = {
  createFramesByTagProperty: function(tagProp) {
    var frames;
    if (tagProp.direction === "pingpong") {
      frames = getLinearStepArray(tagProp.from, tagProp.to, tagProp.from-1)
    } else if (tagProp.direction === "reverse") {
      frames = getLinearStepArray(tagProp.to, tagProp.from-1);
    } else {
      // forward
      frames = getLinearStepArray(tagProp.from, tagProp.to+1);
    }

    return frames;
  },
};

/***/ }),

/***/ "phina.js":
/*!***********************************************************************************************!*\
  !*** external {"commonjs":"phina.js","commonjs2":"phina.js","amd":"phina.js","root":"phina"} ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_phina_js__;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInBoaW5hLmpzXCIsXCJjb21tb25qczJcIjpcInBoaW5hLmpzXCIsXCJhbWRcIjpcInBoaW5hLmpzXCIsXCJyb290XCI6XCJwaGluYVwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE2QjtBQUNtQjtBQUNoRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUFLO0FBQ0wsY0FBYywrQ0FBSzs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsY0FBYyxxQkFBcUI7QUFDbkMsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsY0FBYyxPQUFPO0FBQ3JCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixzRUFBeUI7QUFDekM7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILENBQUM7O0FBRUQ7QUFDQSwrQ0FBSztBQUNMLFNBQVMsK0NBQUs7QUFDZCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLCtDQUFLO0FBQ0w7O0FBRUEsWUFBWSwrQ0FBSyw4Q0FBOEMsK0NBQUs7QUFDcEU7QUFDQSw0Q0FBNEMsRUFBRTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DQUFvQztBQUNwQyx3QkFBd0I7QUFDeEI7O0FBRUEsK0NBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBLCtDQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtDQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsOEdBQUssRTs7Ozs7Ozs7Ozs7QUNuT3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixZQUFZO0FBQ3ZDO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsMkJBQTJCLFlBQVk7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNILEU7Ozs7Ozs7Ozs7O0FDbkNBLHNEIiwiZmlsZSI6InBoaW5hLWFzZXByaXRlLWxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInBoaW5hLmpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInBoaW5hLmpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJwaGluYS5qc1wiKSkgOiBmYWN0b3J5KHJvb3RbXCJwaGluYVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3BoaW5hX2pzX18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBwaGluYSBmcm9tICdwaGluYS5qcyc7XHJcbmltcG9ydCB7Y3JlYXRlRnJhbWVzQnlUYWdQcm9wZXJ0eX0gZnJvbSAnLi9saWInO1xyXG52YXIgQVNTRVRfVFlQRSA9IFwiYXNlcHJpdGVcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgcGhpbmEuYXNzZXQuQXNlcHJpdGVTcHJpdGVTaGVldFxyXG4gKiBAZXh0ZW5kcyBwaGluYS5hc3NldC5Bc3NldFxyXG4gKi9cclxucGhpbmEuZGVmaW5lKCdwaGluYS5hc3NldC5Bc2Vwcml0ZVNwcml0ZVNoZWV0Jywge1xyXG4gIHN1cGVyQ2xhc3M6IHBoaW5hLmFzc2V0LkFzc2V0LFxyXG5cclxuICAvKipcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc3VwZXJJbml0KCk7XHJcbiAgICB0aGlzLl9tYXhGcmFtZUNvdW50ID0gMTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBzZXR1cFxyXG4gICAqIEBwYXJhbSAge0FzZXByaXRlRXhwb3J0ZWRKc29ufSBwYXJhbXNcclxuICAgKiBAcmV0dXJuIHt0aGlzfVxyXG4gICAqL1xyXG4gIHNldHVwOiBmdW5jdGlvbihwYXJhbXMpIHtcclxuICAgIHRoaXMuX3NldHVwRnJhbWUocGFyYW1zLmZyYW1lcyk7XHJcbiAgICB0aGlzLl9zZXR1cEFuaW0ocGFyYW1zLm1ldGEuZnJhbWVUYWdzKTtcclxuXHJcbiAgICAvKiBleHBlcmltZW50YWw6IGltcG9ydCBzbGljZXMgKi9cclxuICAgIHRoaXMuc2xpY2VzID0ge307XHJcbiAgICBpZiAocGFyYW1zLm1ldGEuc2xpY2VzKSB7XHJcbiAgICAgIHBhcmFtcy5tZXRhLnNsaWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHNsaWNlUHJvcCkge1xyXG4gICAgICAgIHRoaXMuc2xpY2VzW3NsaWNlUHJvcC5uYW1lXSA9IHNsaWNlUHJvcDtcclxuICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBleHBlcmltZW50YWw6IGdldCBzbGljZSBwcm9wZXJ0eSdzIGtleXNcclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IG5hbWUgIG5hbWUgb2Ygc2xpY2VcclxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IGluZGV4IGtleXMgaW5kZXhcclxuICAgKiBAcmV0dXJuIHtzbGljZURhdGF9XHJcbiAgICovXHJcbiAgZ2V0U2xpY2VEYXRhOiBmdW5jdGlvbihuYW1lLCBpbmRleCkge1xyXG4gICAgaW5kZXggPSBpbmRleCB8fCAwO1xyXG4gICAgaWYgKCF0aGlzLnNsaWNlc1tuYW1lXSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oXCJbcGhpbmEtYXNlcHJpdGUtbG9hZGVyXTogU2xpY2UgbmFtZSAnXCIrbmFtZStcIicgZG9lc24ndCBleGlzdC5cIik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuc2xpY2VzW25hbWVdLmtleXNbaW5kZXhdO1xyXG4gIH0sXHJcblxyXG4gIF9sb2FkOiBmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNyYyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgdmFyIHhtbCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICB4bWwub3BlbignR0VUJywgdGhpcy5zcmMpO1xyXG4gICAgICB4bWwub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHhtbC5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgICBpZiAoWzIwMCwgMjAxLCAwXS5pbmRleE9mKHhtbC5zdGF0dXMpICE9PSAtMSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHhtbC5yZXNwb25zZVRleHQ7XHJcbiAgICAgICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuc2V0dXAoanNvbik7XHJcblxyXG4gICAgICAgICAgICByZXNvbHZlKHNlbGYpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIHhtbC5zZW5kKG51bGwpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0dXAodGhpcy5zcmMpO1xyXG4gICAgICByZXNvbHZlKHNlbGYpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIF9zZXR1cEZyYW1lOiBmdW5jdGlvbihyYXdGcmFtZXMpIHtcclxuICAgIHZhciBmcmFtZXMgPSB0aGlzLmZyYW1lcyA9IFtdO1xyXG4gICAgLy8gcmF3RnJhbWVz44GMaGFzaOWeiyxBcnJheeWei+OBqeOBoeOCieOBp+OCguWvvuW/nFxyXG4gICAgcmF3RnJhbWVzLmZvckluKGZ1bmN0aW9uKGtleSwgdmFsKSB7XHJcbiAgICAgIHZhciBmID0gdmFsLmZyYW1lO1xyXG4gICAgICBmcmFtZXMucHVzaCh7XHJcbiAgICAgICAgeDogZi54LFxyXG4gICAgICAgIHk6IGYueSxcclxuICAgICAgICB3aWR0aDogZi53LFxyXG4gICAgICAgIGhlaWdodDogZi5oLFxyXG4gICAgICAgIGR1cmF0aW9uOiB2YWwuZHVyYXRpb24sXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9tYXhGcmFtZUNvdW50ID0gZnJhbWVzLmxlbmd0aDtcclxuICB9LFxyXG5cclxuICBfc2V0dXBBbmltOiBmdW5jdGlvbihmcmFtZVRhZ3MpIHtcclxuICAgIHRoaXMuYW5pbWF0aW9ucyA9IHt9O1xyXG5cclxuICAgIHRoaXMuYW5pbWF0aW9uc1tcImRlZmF1bHRcIl0gPSB7XHJcbiAgICAgIGZyYW1lczogW10ucmFuZ2UoMCwgdGhpcy5fbWF4RnJhbWVDb3VudCksXHJcbiAgICAgIG5leHQ6IFwiZGVmYXVsdFwiLFxyXG4gICAgICBmcmVxdWVuY3k6IDEsXHJcbiAgICB9O1xyXG5cclxuICAgIC8qIFRPRE86IGhvdyB0byBzZXQgbmV4dD8gKi9cclxuICAgIGZyYW1lVGFncy5mb3JFYWNoKGZ1bmN0aW9uKHRhZykge1xyXG4gICAgICB0aGlzLmFuaW1hdGlvbnNbdGFnLm5hbWVdID0ge1xyXG4gICAgICAgIGZyYW1lczogY3JlYXRlRnJhbWVzQnlUYWdQcm9wZXJ0eSh0YWcpLFxyXG4gICAgICAgIC8vIG5leHQ6IFwiZGVmYXVsdFwiLFxyXG4gICAgICB9O1xyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG5cclxuICBnZXRGcmFtZTogZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgIHJldHVybiB0aGlzLmZyYW1lc1tpbmRleF07XHJcbiAgfSxcclxuXHJcbiAgZ2V0QW5pbWF0aW9uOiBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICBuYW1lID0gKG5hbWUgIT09IHVuZGVmaW5lZCkgPyBuYW1lIDogXCJkZWZhdWx0XCI7XHJcbiAgICByZXR1cm4gdGhpcy5hbmltYXRpb25zW25hbWVdO1xyXG4gIH0sXHJcblxyXG4gIF9hY2Nlc3Nvcjoge1xyXG4gICAgcGl2b3Q6IHtcclxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2xpY2VzLnBpdm90KSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXMucGl2b3Qua2V5c1swXS5waXZvdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG59KTtcclxuXHJcbi8qIGV4dGVuZCBsb2FkZXIgKi9cclxucGhpbmEuYXNzZXQuQXNzZXRMb2FkZXIucmVnaXN0ZXIoQVNTRVRfVFlQRSwgZnVuY3Rpb24oa2V5LCBwYXRoKSB7XHJcbiAgcmV0dXJuIHBoaW5hLmFzc2V0LkFzZXByaXRlU3ByaXRlU2hlZXQoKS5sb2FkKHBhdGgpO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBvdmVycmlkZSBGcmFtZUFuaW1hdGlvbiBjbGFzc1xyXG4gKi9cclxucGhpbmEuYWNjZXNzb3J5LkZyYW1lQW5pbWF0aW9uLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oc3MpIHtcclxuICB0aGlzLnN1cGVySW5pdCgpO1xyXG5cclxuICB0aGlzLnNzID0gcGhpbmEuYXNzZXQuQXNzZXRNYW5hZ2VyLmdldCgnc3ByaXRlc2hlZXQnLCBzcykgfHwgcGhpbmEuYXNzZXQuQXNzZXRNYW5hZ2VyLmdldChBU1NFVF9UWVBFLCBzcyk7XHJcbiAgaWYgKCF0aGlzLnNzKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiW3BoaW5hLmpzXSBzcHJpdGVzaGVldCAnezB9JyBkb2Vzbid0IGV4aXN0LlwiLmZvcm1hdChzcykpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICB0aGlzLnBhdXNlZCA9IHRydWU7XHJcbiAgdGhpcy5maW5pc2hlZCA9IGZhbHNlO1xyXG4gIHRoaXMuZml0ID0gdHJ1ZTtcclxuXHJcbiAgdGhpcy5jdXJyZW50QW5pbWF0aW9uRnJhbWUgPSBudWxsOyAvLyBhZGRcclxuICB0aGlzLl9lbGFwc2VkVGltZSA9IDA7IC8vIGFkZFxyXG59O1xyXG5cclxucGhpbmEuYWNjZXNzb3J5LkZyYW1lQW5pbWF0aW9uLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihhcHApIHtcclxuICBpZiAodGhpcy5wYXVzZWQpIHJldHVybiA7XHJcbiAgaWYgKCF0aGlzLmN1cnJlbnRBbmltYXRpb24pIHJldHVybiA7XHJcblxyXG4gIGlmICh0aGlzLmZpbmlzaGVkKSB7XHJcbiAgICB0aGlzLmZpbmlzaGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmN1cnJlbnRGcmFtZUluZGV4ID0gMDtcclxuICAgIHJldHVybiA7XHJcbiAgfVxyXG5cclxuICArK3RoaXMuZnJhbWU7XHJcbiAgaWYgKHRoaXMuY3VycmVudEFuaW1hdGlvbi5mcmVxdWVuY3kgIT0gbnVsbCkge1xyXG4gICAgaWYgKHRoaXMuZnJhbWUldGhpcy5jdXJyZW50QW5pbWF0aW9uLmZyZXF1ZW5jeSA9PT0gMCkge1xyXG4gICAgICArK3RoaXMuY3VycmVudEZyYW1lSW5kZXg7XHJcbiAgICAgIHRoaXMuX3VwZGF0ZUZyYW1lKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICByZWFsdGltZSBkdXJhdGlvbiBiYXNlZCBhbmltYXRpb25cclxuICAgIHdvcmtzIHdoZW4gY3VycmVudEZyYW1lIGhhcyBhIGR1cmF0aW9uIHByb3BlcnR5XHJcbiAgICovXHJcbiAgdGhpcy5fZWxhcHNlZFRpbWUgKz0gYXBwLmRlbHRhVGltZTtcclxuICBpZiAodGhpcy5jdXJyZW50QW5pbWF0aW9uRnJhbWUgJiYgdGhpcy5jdXJyZW50QW5pbWF0aW9uRnJhbWUuZHVyYXRpb24gIT0gbnVsbCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEFuaW1hdGlvbkZyYW1lLmR1cmF0aW9uIDw9IHRoaXMuX2VsYXBzZWRUaW1lKSB7XHJcbiAgICAgICsrdGhpcy5jdXJyZW50RnJhbWVJbmRleDtcclxuICAgICAgdGhpcy5fdXBkYXRlRnJhbWUoKTtcclxuICAgICAgdGhpcy5fZWxhcHNlZFRpbWUgPSAwOyAvLyByZXNldFxyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbnBoaW5hLmFjY2Vzc29yeS5GcmFtZUFuaW1hdGlvbi5wcm90b3R5cGUuX3VwZGF0ZUZyYW1lID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIGFuaW0gPSB0aGlzLmN1cnJlbnRBbmltYXRpb247XHJcbiAgaWYgKGFuaW0pIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRGcmFtZUluZGV4ID49IGFuaW0uZnJhbWVzLmxlbmd0aCkge1xyXG4gICAgICBpZiAoYW5pbS5uZXh0KSB7XHJcbiAgICAgICAgdGhpcy5nb3RvQW5kUGxheShhbmltLm5leHQpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mbGFyZSgnZW5kZWQnKTtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgaW5kZXggPSBhbmltLmZyYW1lc1t0aGlzLmN1cnJlbnRGcmFtZUluZGV4XTtcclxuICB2YXIgZnJhbWUgPSB0aGlzLnNzLmdldEZyYW1lKGluZGV4KTtcclxuICB0aGlzLnRhcmdldC5zcmNSZWN0LnNldChmcmFtZS54LCBmcmFtZS55LCBmcmFtZS53aWR0aCwgZnJhbWUuaGVpZ2h0KTtcclxuICB0aGlzLmN1cnJlbnRBbmltYXRpb25GcmFtZSA9IGZyYW1lOyAvLyBhZGRcclxuXHJcbiAgaWYgKHRoaXMuZml0KSB7XHJcbiAgICB0aGlzLnRhcmdldC53aWR0aCA9IGZyYW1lLndpZHRoO1xyXG4gICAgdGhpcy50YXJnZXQuaGVpZ2h0ID0gZnJhbWUuaGVpZ2h0O1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFRPRE9cclxucGhpbmEuYWNjZXNzb3J5LkZyYW1lQW5pbWF0aW9uLnByb3RvdHlwZS5zZXROZXh0ID0gZnVuY3Rpb24odGFyZ2V0QW5pbSwgbmV4dCkge1xyXG4gIHRhcmdldEFuaW0gPSB0aGlzLnNzLmdldEFuaW1hdGlvbih0YXJnZXRBbmltKTtcclxuICB0YXJnZXRBbmltLm5leHQgPSBuZXh0O1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwaGluYTsiLCJ2YXIgZ2V0TGluZWFyU3RlcEFycmF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gIHZhciBhcnIgPSBbXTtcclxuICBhcmdzLmZvckVhY2goZnVuY3Rpb24oY3VycmVudCwgaSkge1xyXG4gICAgdmFyIHRhcmdldCA9IGFyZ3NbaSsxXTtcclxuICAgIGlmICh0YXJnZXQgPT0gbnVsbCB8fCBjdXJyZW50ID09PSB0YXJnZXQpIHJldHVybjtcclxuXHJcbiAgICBpZiAoY3VycmVudCA8IHRhcmdldCkge1xyXG4gICAgICBmb3IgKHZhciBpID0gY3VycmVudDsgaSA8IHRhcmdldDsgaSsrKSB7XHJcbiAgICAgICAgYXJyLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSBjdXJyZW50OyBpID4gdGFyZ2V0OyBpLS0pIHtcclxuICAgICAgICBhcnIucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gYXJyO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBjcmVhdGVGcmFtZXNCeVRhZ1Byb3BlcnR5OiBmdW5jdGlvbih0YWdQcm9wKSB7XHJcbiAgICB2YXIgZnJhbWVzO1xyXG4gICAgaWYgKHRhZ1Byb3AuZGlyZWN0aW9uID09PSBcInBpbmdwb25nXCIpIHtcclxuICAgICAgZnJhbWVzID0gZ2V0TGluZWFyU3RlcEFycmF5KHRhZ1Byb3AuZnJvbSwgdGFnUHJvcC50bywgdGFnUHJvcC5mcm9tLTEpXHJcbiAgICB9IGVsc2UgaWYgKHRhZ1Byb3AuZGlyZWN0aW9uID09PSBcInJldmVyc2VcIikge1xyXG4gICAgICBmcmFtZXMgPSBnZXRMaW5lYXJTdGVwQXJyYXkodGFnUHJvcC50bywgdGFnUHJvcC5mcm9tLTEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gZm9yd2FyZFxyXG4gICAgICBmcmFtZXMgPSBnZXRMaW5lYXJTdGVwQXJyYXkodGFnUHJvcC5mcm9tLCB0YWdQcm9wLnRvKzEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmcmFtZXM7XHJcbiAgfSxcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfcGhpbmFfanNfXzsiXSwic291cmNlUm9vdCI6IiJ9