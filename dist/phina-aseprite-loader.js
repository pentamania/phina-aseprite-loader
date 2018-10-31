/*!
 * 
 * phina-aseprite-loader v0.1.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJwaGluYS5qc1wiLFwiY29tbW9uanMyXCI6XCJwaGluYS5qc1wiLFwiYW1kXCI6XCJwaGluYS5qc1wiLFwicm9vdFwiOlwicGhpbmFcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUE2QjtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUFLO0FBQ0wsY0FBYywrQ0FBSzs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILENBQUM7O0FBRUQ7QUFDQSwrQ0FBSztBQUNMLFNBQVMsK0NBQUs7QUFDZCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLCtDQUFLO0FBQ0w7O0FBRUEsWUFBWSwrQ0FBSyw4Q0FBOEMsK0NBQUs7QUFDcEU7QUFDQSw0Q0FBNEMsRUFBRTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DQUFvQztBQUNwQyx3QkFBd0I7QUFDeEI7O0FBRUEsK0NBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBLCtDQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtDQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsOEdBQUssRTs7Ozs7Ozs7Ozs7QUN0TXBCLHNEIiwiZmlsZSI6InBoaW5hLWFzZXByaXRlLWxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInBoaW5hLmpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInBoaW5hLmpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJwaGluYS5qc1wiKSkgOiBmYWN0b3J5KHJvb3RbXCJwaGluYVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3BoaW5hX2pzX18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBwaGluYSBmcm9tICdwaGluYS5qcyc7XHJcbnZhciBBU1NFVF9UWVBFID0gXCJhc2Vwcml0ZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBwaGluYS5hc3NldC5Bc2Vwcml0ZVNwcml0ZVNoZWV0XHJcbiAqIEBleHRlbmRzIHBoaW5hLmFzc2V0LkFzc2V0XHJcbiAqL1xyXG5waGluYS5kZWZpbmUoJ3BoaW5hLmFzc2V0LkFzZXByaXRlU3ByaXRlU2hlZXQnLCB7XHJcbiAgc3VwZXJDbGFzczogcGhpbmEuYXNzZXQuQXNzZXQsXHJcblxyXG4gIC8qKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zdXBlckluaXQoKTtcclxuICAgIHRoaXMucGl2b3Q7XHJcbiAgICB0aGlzLl9tYXhGcmFtZUNvdW50ID0gMTtcclxuICB9LFxyXG5cclxuICBzZXR1cDogZnVuY3Rpb24ocGFyYW1zKSB7XHJcbiAgICB0aGlzLl9zZXR1cEZyYW1lKHBhcmFtcy5mcmFtZXMpO1xyXG4gICAgdGhpcy5fc2V0dXBBbmltKHBhcmFtcy5tZXRhLmZyYW1lVGFncyk7XHJcblxyXG4gICAgLy8gc2V0dXBQaXZvdChXSVApXHJcbiAgICB2YXIgcGl2b3RTbGljZURhdGEgPSBwYXJhbXMubWV0YS5zbGljZXMuZmluZChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgIHJldHVybiBpdGVtLm5hbWUgPT09IFwiUGl2b3RcIjtcclxuICAgIH0pO1xyXG4gICAgaWYgKHBpdm90U2xpY2VEYXRhKSB7XHJcbiAgICAgIHRoaXMucGl2b3QgPSBwaXZvdFNsaWNlRGF0YS5rZXlzWzBdLnBpdm90O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSxcclxuXHJcbiAgX2xvYWQ6IGZ1bmN0aW9uKHJlc29sdmUpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMuc3JjID09PSAnc3RyaW5nJykge1xyXG4gICAgICB2YXIgeG1sID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgIHhtbC5vcGVuKCdHRVQnLCB0aGlzLnNyYyk7XHJcbiAgICAgIHhtbC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoeG1sLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgIGlmIChbMjAwLCAyMDEsIDBdLmluZGV4T2YoeG1sLnN0YXR1cykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0geG1sLnJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi5zZXR1cChqc29uKTtcclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUoc2VsZik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgeG1sLnNlbmQobnVsbCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5zZXR1cCh0aGlzLnNyYyk7XHJcbiAgICAgIHJlc29sdmUoc2VsZik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgX3NldHVwRnJhbWU6IGZ1bmN0aW9uKHJhd0ZyYW1lcykge1xyXG4gICAgdmFyIGZyYW1lcyA9IHRoaXMuZnJhbWVzID0gW107XHJcbiAgICAvLyByYXdGcmFtZXPjgYxoYXNo5Z6LLEFycmF55Z6L44Gp44Gh44KJ44Gn44KC5a++5b+cXHJcbiAgICByYXdGcmFtZXMuZm9ySW4oZnVuY3Rpb24oa2V5LCB2YWwpIHtcclxuICAgICAgdmFyIGYgPSB2YWwuZnJhbWU7XHJcbiAgICAgIGZyYW1lcy5wdXNoKHtcclxuICAgICAgICB4OiBmLngsXHJcbiAgICAgICAgeTogZi55LFxyXG4gICAgICAgIHdpZHRoOiBmLncsXHJcbiAgICAgICAgaGVpZ2h0OiBmLmgsXHJcbiAgICAgICAgZHVyYXRpb246IHZhbC5kdXJhdGlvbixcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX21heEZyYW1lQ291bnQgPSBmcmFtZXMubGVuZ3RoO1xyXG4gIH0sXHJcblxyXG4gIF9zZXR1cEFuaW06IGZ1bmN0aW9uKGZyYW1lVGFncykge1xyXG4gICAgdGhpcy5hbmltYXRpb25zID0ge307XHJcblxyXG4gICAgdGhpcy5hbmltYXRpb25zW1wiZGVmYXVsdFwiXSA9IHtcclxuICAgICAgZnJhbWVzOiBbXS5yYW5nZSgwLCB0aGlzLl9tYXhGcmFtZUNvdW50KSxcclxuICAgICAgbmV4dDogXCJkZWZhdWx0XCIsXHJcbiAgICAgIGZyZXF1ZW5jeTogMSxcclxuICAgIH07XHJcblxyXG4gICAgLyogVE9ETzogc2V0IG5leHQgKi9cclxuICAgIGZyYW1lVGFncy5mb3JFYWNoKGZ1bmN0aW9uKHRhZykge1xyXG4gICAgICB0aGlzLmFuaW1hdGlvbnNbdGFnLm5hbWVdID0ge1xyXG4gICAgICAgIGZyYW1lczogW10ucmFuZ2UodGFnLmZyb20sIHRhZy50bysxKSxcclxuICAgICAgICAvLyBuZXh0OiBcImRlZmF1bHRcIixcclxuICAgICAgICAvLyBuZXh0OiB0YWcubmFtZSxcclxuICAgICAgfTtcclxuICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0RnJhbWU6IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICByZXR1cm4gdGhpcy5mcmFtZXNbaW5kZXhdO1xyXG4gIH0sXHJcblxyXG4gIGdldEFuaW1hdGlvbjogZnVuY3Rpb24obmFtZSkge1xyXG4gICAgbmFtZSA9IChuYW1lICE9PSB1bmRlZmluZWQpID8gbmFtZSA6IFwiZGVmYXVsdFwiO1xyXG4gICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uc1tuYW1lXTtcclxuICB9LFxyXG5cclxufSk7XHJcblxyXG4vKiBleHRlbmQgbG9hZGVyICovXHJcbnBoaW5hLmFzc2V0LkFzc2V0TG9hZGVyLnJlZ2lzdGVyKEFTU0VUX1RZUEUsIGZ1bmN0aW9uKGtleSwgcGF0aCkge1xyXG4gIHJldHVybiBwaGluYS5hc3NldC5Bc2Vwcml0ZVNwcml0ZVNoZWV0KCkubG9hZChwYXRoKTtcclxufSk7XHJcblxyXG4vKipcclxuICogb3ZlcnJpZGUgRnJhbWVBbmltYXRpb24gY2xhc3NcclxuICovXHJcbnBoaW5hLmFjY2Vzc29yeS5GcmFtZUFuaW1hdGlvbi5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKHNzKSB7XHJcbiAgdGhpcy5zdXBlckluaXQoKTtcclxuXHJcbiAgdGhpcy5zcyA9IHBoaW5hLmFzc2V0LkFzc2V0TWFuYWdlci5nZXQoJ3Nwcml0ZXNoZWV0Jywgc3MpIHx8IHBoaW5hLmFzc2V0LkFzc2V0TWFuYWdlci5nZXQoQVNTRVRfVFlQRSwgc3MpO1xyXG4gIGlmICghdGhpcy5zcykge1xyXG4gICAgY29uc29sZS5lcnJvcihcIltwaGluYS5qc10gc3ByaXRlc2hlZXQgJ3swfScgZG9lc24ndCBleGlzdC5cIi5mb3JtYXQoc3MpKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgdGhpcy5wYXVzZWQgPSB0cnVlO1xyXG4gIHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcclxuICB0aGlzLmZpdCA9IHRydWU7XHJcblxyXG4gIHRoaXMuY3VycmVudEFuaW1hdGlvbkZyYW1lID0gbnVsbDsgLy8gYWRkXHJcbiAgdGhpcy5fZWxhcHNlZFRpbWUgPSAwOyAvLyBhZGRcclxufTtcclxuXHJcbnBoaW5hLmFjY2Vzc29yeS5GcmFtZUFuaW1hdGlvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oYXBwKSB7XHJcbiAgaWYgKHRoaXMucGF1c2VkKSByZXR1cm4gO1xyXG4gIGlmICghdGhpcy5jdXJyZW50QW5pbWF0aW9uKSByZXR1cm4gO1xyXG5cclxuICBpZiAodGhpcy5maW5pc2hlZCkge1xyXG4gICAgdGhpcy5maW5pc2hlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5jdXJyZW50RnJhbWVJbmRleCA9IDA7XHJcbiAgICByZXR1cm4gO1xyXG4gIH1cclxuXHJcbiAgKyt0aGlzLmZyYW1lO1xyXG4gIGlmICh0aGlzLmN1cnJlbnRBbmltYXRpb24uZnJlcXVlbmN5ICE9IG51bGwpIHtcclxuICAgIGlmICh0aGlzLmZyYW1lJXRoaXMuY3VycmVudEFuaW1hdGlvbi5mcmVxdWVuY3kgPT09IDApIHtcclxuICAgICAgKyt0aGlzLmN1cnJlbnRGcmFtZUluZGV4O1xyXG4gICAgICB0aGlzLl91cGRhdGVGcmFtZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAgcmVhbHRpbWUgZHVyYXRpb24gYmFzZWQgYW5pbWF0aW9uXHJcbiAgICB3b3JrcyB3aGVuIGN1cnJlbnRGcmFtZSBoYXMgYSBkdXJhdGlvbiBwcm9wZXJ0eVxyXG4gICAqL1xyXG4gIHRoaXMuX2VsYXBzZWRUaW1lICs9IGFwcC5kZWx0YVRpbWU7XHJcbiAgaWYgKHRoaXMuY3VycmVudEFuaW1hdGlvbkZyYW1lICYmIHRoaXMuY3VycmVudEFuaW1hdGlvbkZyYW1lLmR1cmF0aW9uICE9IG51bGwpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRBbmltYXRpb25GcmFtZS5kdXJhdGlvbiA8PSB0aGlzLl9lbGFwc2VkVGltZSkge1xyXG4gICAgICArK3RoaXMuY3VycmVudEZyYW1lSW5kZXg7XHJcbiAgICAgIHRoaXMuX3VwZGF0ZUZyYW1lKCk7XHJcbiAgICAgIHRoaXMuX2VsYXBzZWRUaW1lID0gMDsgLy8gcmVzZXRcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5waGluYS5hY2Nlc3NvcnkuRnJhbWVBbmltYXRpb24ucHJvdG90eXBlLl91cGRhdGVGcmFtZSA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBhbmltID0gdGhpcy5jdXJyZW50QW5pbWF0aW9uO1xyXG4gIGlmIChhbmltKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50RnJhbWVJbmRleCA+PSBhbmltLmZyYW1lcy5sZW5ndGgpIHtcclxuICAgICAgaWYgKGFuaW0ubmV4dCkge1xyXG4gICAgICAgIHRoaXMuZ290b0FuZFBsYXkoYW5pbS5uZXh0KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmxhcmUoJ2VuZGVkJyk7XHJcbiAgICAgICAgcmV0dXJuIDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIGluZGV4ID0gYW5pbS5mcmFtZXNbdGhpcy5jdXJyZW50RnJhbWVJbmRleF07XHJcbiAgdmFyIGZyYW1lID0gdGhpcy5zcy5nZXRGcmFtZShpbmRleCk7XHJcbiAgdGhpcy50YXJnZXQuc3JjUmVjdC5zZXQoZnJhbWUueCwgZnJhbWUueSwgZnJhbWUud2lkdGgsIGZyYW1lLmhlaWdodCk7XHJcbiAgdGhpcy5jdXJyZW50QW5pbWF0aW9uRnJhbWUgPSBmcmFtZTsgLy8gYWRkXHJcblxyXG4gIGlmICh0aGlzLmZpdCkge1xyXG4gICAgdGhpcy50YXJnZXQud2lkdGggPSBmcmFtZS53aWR0aDtcclxuICAgIHRoaXMudGFyZ2V0LmhlaWdodCA9IGZyYW1lLmhlaWdodDtcclxuICB9XHJcbn07XHJcblxyXG4vLyBUT0RPXHJcbnBoaW5hLmFjY2Vzc29yeS5GcmFtZUFuaW1hdGlvbi5wcm90b3R5cGUuc2V0TmV4dCA9IGZ1bmN0aW9uKHRhcmdldEFuaW0sIG5leHQpIHtcclxuICB0YXJnZXRBbmltID0gdGhpcy5zcy5nZXRBbmltYXRpb24odGFyZ2V0QW5pbSk7XHJcbiAgdGFyZ2V0QW5pbS5uZXh0ID0gbmV4dDtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGhpbmE7IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3BoaW5hX2pzX187Il0sInNvdXJjZVJvb3QiOiIifQ==