// TOCBOT
//https://github.com/tscanlin/tocbot/blob/master/dist/tocbot.js
//#####################################################################################################################
//#####################################################################################################################
//#####################################################################################################################

/******/
(function(modules) { // webpackBootstrap
  /******/ // The module cache
  /******/
  var installedModules = {};
  /******/
  /******/ // The require function
  /******/
  function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/
    if (installedModules[moduleId]) {
      /******/
      return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = installedModules[moduleId] = {
      /******/
      i: moduleId,
      /******/
      l: false,
      /******/
      exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/
    module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/
  __webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/
  __webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/
  __webpack_require__.d = function(exports, name, getter) {
    /******/
    if (!__webpack_require__.o(exports, name)) {
      /******/
      Object.defineProperty(exports, name, {
        /******/
        configurable: false,
        /******/
        enumerable: true,
        /******/
        get: getter
        /******/
      });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/
  __webpack_require__.n = function(module) {
    /******/
    var getter = module && module.__esModule ?
      /******/
      function getDefault() {
        return module['default'];
      } :
      /******/
      function getModuleExports() {
        return module;
      };
    /******/
    __webpack_require__.d(getter, 'a', getter);
    /******/
    return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/
  __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/
  __webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/
  return __webpack_require__(__webpack_require__.s = 0);
  /******/
})
/************************************************************************/
/******/
([
  /* 0 */
  /*!*************************!*\
    !*** ./src/js/index.js ***!
    \*************************/
  /*! dynamic exports provided */
  /*! all exports used */
  /***/
  (function(module, exports, __webpack_require__) {

    eval("/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * Tocbot\n * Tocbot creates a toble of contents based on HTML headings on a page,\n * this allows users to easily jump to different sections of the document.\n * Tocbot was inspired by tocify (http://gregfranko.com/jquery.tocify.js/).\n * The main differences are that it works natively without any need for jquery or jquery UI).\n *\n * @author Tim Scanlin\n */\n\n/* globals define */\n\n(function (root, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory(root)),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n  } else if (typeof exports === 'object') {\n    module.exports = factory(root)\n  } else {\n    root.tocbot = factory(root)\n  }\n})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {\n  'use strict'\n\n  // Default options.\n  var defaultOptions = __webpack_require__(/*! ./default-options.js */ 2)\n  // Object to store current options.\n  var options = {}\n  // Object for public APIs.\n  var tocbot = {}\n\n  var BuildHtml = __webpack_require__(/*! ./build-html.js */ 3)\n  var ParseContent = __webpack_require__(/*! ./parse-content.js */ 4)\n  // Keep these variables at top scope once options are passed in.\n  var buildHtml\n  var parseContent\n\n  // Just return if its not a browser.\n  if (typeof window === 'undefined') {\n    return\n  }\n  var supports = !!root.document.querySelector && !!root.addEventListener // Feature test\n  var headingsArray\n\n  // From: https://github.com/Raynos/xtend\n  var hasOwnProperty = Object.prototype.hasOwnProperty\n  function extend () {\n    var target = {}\n    for (var i = 0; i < arguments.length; i++) {\n      var source = arguments[i]\n      for (var key in source) {\n        if (hasOwnProperty.call(source, key)) {\n          target[key] = source[key]\n        }\n      }\n    }\n    return target\n  }\n\n  // From: https://remysharp.com/2010/07/21/throttling-function-calls\n  function throttle (fn, threshhold, scope) {\n    threshhold || (threshhold = 250)\n    var last\n    var deferTimer\n    return function () {\n      var context = scope || this\n      var now = +new Date()\n      var args = arguments\n      if (last && now < last + threshhold) {\n        // hold on to it\n        clearTimeout(deferTimer)\n        deferTimer = setTimeout(function () {\n          last = now\n          fn.apply(context, args)\n        }, threshhold)\n      } else {\n        last = now\n        fn.apply(context, args)\n      }\n    }\n  }\n\n  /**\n   * Destroy tocbot.\n   */\n  tocbot.destroy = function () {\n    // Clear HTML.\n    try {\n      document.querySelector(options.tocSelector).innerHTML = ''\n    } catch (e) {\n      console.warn('Element not found: ' + options.tocSelector); // eslint-disable-line\n    }\n\n    // Remove event listeners.\n    document.removeEventListener('scroll', this._scrollListener, false)\n    document.removeEventListener('resize', this._scrollListener, false)\n    if (buildHtml) {\n      document.removeEventListener('click', this._clickListener, false)\n    }\n  }\n\n  /**\n   * Initialize tocbot.\n   * @param {object} customOptions\n   */\n  tocbot.init = function (customOptions) {\n    // feature test\n    if (!supports) {\n      return\n    }\n\n    // Merge defaults with user options.\n    // Set to options variable at the top.\n    options = extend(defaultOptions, customOptions || {})\n    this.options = options\n    this.state = {}\n\n    // Init smooth scroll if enabled (default).\n    if (options.scrollSmooth) {\n      options.duration = options.scrollSmoothDuration\n      tocbot.scrollSmooth = __webpack_require__(/*! ./scroll-smooth */ 5).initSmoothScrolling(options)\n    }\n\n    // Pass options to these modules.\n    buildHtml = BuildHtml(options)\n    parseContent = ParseContent(options)\n\n    // For testing purposes.\n    this._buildHtml = buildHtml\n    this._parseContent = parseContent\n\n    // Destroy it if it exists first.\n    tocbot.destroy()\n\n    // Get headings array.\n    headingsArray = parseContent.selectHeadings(options.contentSelector, options.headingSelector)\n    // Return if no headings are found.\n    if (headingsArray === null) {\n      return\n    }\n\n    // Build nested headings array.\n    var nestedHeadingsObj = parseContent.nestHeadingsArray(headingsArray)\n    var nestedHeadings = nestedHeadingsObj.nest\n\n    // Render.\n    buildHtml.render(options.tocSelector, nestedHeadings)\n\n    // Update Sidebar and bind listeners.\n    this._scrollListener = throttle(function (e) {\n      buildHtml.updateToc(headingsArray)\n      var isTop = e && e.target && e.target.scrollingElement && e.target.scrollingElement.scrollTop === 0\n      if ((e && (e.eventPhase === 0 || e.currentTarget === null)) || isTop) {\n        buildHtml.enableTocAnimation()\n        buildHtml.updateToc(headingsArray)\n        if (options.scrollEndCallback) {\n          options.scrollEndCallback(e)\n        }\n      }\n    }, options.throttleTimeout)\n    this._scrollListener()\n    document.addEventListener('scroll', this._scrollListener, false)\n    document.addEventListener('resize', this._scrollListener, false)\n\n    // Bind click listeners to disable animation.\n    this._clickListener = throttle(function (event) {\n      if (options.scrollSmooth) {\n        buildHtml.disableTocAnimation(event)\n      }\n      buildHtml.updateToc(headingsArray)\n    }, options.throttleTimeout)\n    document.addEventListener('click', this._clickListener, false)\n\n    return this\n  }\n\n  /**\n   * Refresh tocbot.\n   */\n  tocbot.refresh = function (customOptions) {\n    tocbot.destroy()\n    tocbot.init(customOptions || this.options)\n  }\n\n  // Make tocbot available globally.\n  root.tocbot = tocbot\n\n  return tocbot\n})\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ 1)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcz9iYzY2Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVG9jYm90XG4gKiBUb2Nib3QgY3JlYXRlcyBhIHRvYmxlIG9mIGNvbnRlbnRzIGJhc2VkIG9uIEhUTUwgaGVhZGluZ3Mgb24gYSBwYWdlLFxuICogdGhpcyBhbGxvd3MgdXNlcnMgdG8gZWFzaWx5IGp1bXAgdG8gZGlmZmVyZW50IHNlY3Rpb25zIG9mIHRoZSBkb2N1bWVudC5cbiAqIFRvY2JvdCB3YXMgaW5zcGlyZWQgYnkgdG9jaWZ5IChodHRwOi8vZ3JlZ2ZyYW5rby5jb20vanF1ZXJ5LnRvY2lmeS5qcy8pLlxuICogVGhlIG1haW4gZGlmZmVyZW5jZXMgYXJlIHRoYXQgaXQgd29ya3MgbmF0aXZlbHkgd2l0aG91dCBhbnkgbmVlZCBmb3IganF1ZXJ5IG9yIGpxdWVyeSBVSSkuXG4gKlxuICogQGF1dGhvciBUaW0gU2NhbmxpblxuICovXG5cbi8qIGdsb2JhbHMgZGVmaW5lICovXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KHJvb3QpKVxuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyb290KVxuICB9IGVsc2Uge1xuICAgIHJvb3QudG9jYm90ID0gZmFjdG9yeShyb290KVxuICB9XG59KSh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHRoaXMud2luZG93IHx8IHRoaXMuZ2xvYmFsLCBmdW5jdGlvbiAocm9vdCkge1xuICAndXNlIHN0cmljdCdcblxuICAvLyBEZWZhdWx0IG9wdGlvbnMuXG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IHJlcXVpcmUoJy4vZGVmYXVsdC1vcHRpb25zLmpzJylcbiAgLy8gT2JqZWN0IHRvIHN0b3JlIGN1cnJlbnQgb3B0aW9ucy5cbiAgdmFyIG9wdGlvbnMgPSB7fVxuICAvLyBPYmplY3QgZm9yIHB1YmxpYyBBUElzLlxuICB2YXIgdG9jYm90ID0ge31cblxuICB2YXIgQnVpbGRIdG1sID0gcmVxdWlyZSgnLi9idWlsZC1odG1sLmpzJylcbiAgdmFyIFBhcnNlQ29udGVudCA9IHJlcXVpcmUoJy4vcGFyc2UtY29udGVudC5qcycpXG4gIC8vIEtlZXAgdGhlc2UgdmFyaWFibGVzIGF0IHRvcCBzY29wZSBvbmNlIG9wdGlvbnMgYXJlIHBhc3NlZCBpbi5cbiAgdmFyIGJ1aWxkSHRtbFxuICB2YXIgcGFyc2VDb250ZW50XG5cbiAgLy8gSnVzdCByZXR1cm4gaWYgaXRzIG5vdCBhIGJyb3dzZXIuXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBzdXBwb3J0cyA9ICEhcm9vdC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yICYmICEhcm9vdC5hZGRFdmVudExpc3RlbmVyIC8vIEZlYXR1cmUgdGVzdFxuICB2YXIgaGVhZGluZ3NBcnJheVxuXG4gIC8vIEZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9SYXlub3MveHRlbmRcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICBmdW5jdGlvbiBleHRlbmQgKCkge1xuICAgIHZhciB0YXJnZXQgPSB7fVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0XG4gIH1cblxuICAvLyBGcm9tOiBodHRwczovL3JlbXlzaGFycC5jb20vMjAxMC8wNy8yMS90aHJvdHRsaW5nLWZ1bmN0aW9uLWNhbGxzXG4gIGZ1bmN0aW9uIHRocm90dGxlIChmbiwgdGhyZXNoaG9sZCwgc2NvcGUpIHtcbiAgICB0aHJlc2hob2xkIHx8ICh0aHJlc2hob2xkID0gMjUwKVxuICAgIHZhciBsYXN0XG4gICAgdmFyIGRlZmVyVGltZXJcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSBzY29wZSB8fCB0aGlzXG4gICAgICB2YXIgbm93ID0gK25ldyBEYXRlKClcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzXG4gICAgICBpZiAobGFzdCAmJiBub3cgPCBsYXN0ICsgdGhyZXNoaG9sZCkge1xuICAgICAgICAvLyBob2xkIG9uIHRvIGl0XG4gICAgICAgIGNsZWFyVGltZW91dChkZWZlclRpbWVyKVxuICAgICAgICBkZWZlclRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbGFzdCA9IG5vd1xuICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgIH0sIHRocmVzaGhvbGQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsYXN0ID0gbm93XG4gICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdG9jYm90LlxuICAgKi9cbiAgdG9jYm90LmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gQ2xlYXIgSFRNTC5cbiAgICB0cnkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnRvY1NlbGVjdG9yKS5pbm5lckhUTUwgPSAnJ1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignRWxlbWVudCBub3QgZm91bmQ6ICcgKyBvcHRpb25zLnRvY1NlbGVjdG9yKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsTGlzdGVuZXIsIGZhbHNlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3Njcm9sbExpc3RlbmVyLCBmYWxzZSlcbiAgICBpZiAoYnVpbGRIdG1sKSB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2NsaWNrTGlzdGVuZXIsIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRvY2JvdC5cbiAgICogQHBhcmFtIHtvYmplY3R9IGN1c3RvbU9wdGlvbnNcbiAgICovXG4gIHRvY2JvdC5pbml0ID0gZnVuY3Rpb24gKGN1c3RvbU9wdGlvbnMpIHtcbiAgICAvLyBmZWF0dXJlIHRlc3RcbiAgICBpZiAoIXN1cHBvcnRzKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBNZXJnZSBkZWZhdWx0cyB3aXRoIHVzZXIgb3B0aW9ucy5cbiAgICAvLyBTZXQgdG8gb3B0aW9ucyB2YXJpYWJsZSBhdCB0aGUgdG9wLlxuICAgIG9wdGlvbnMgPSBleHRlbmQoZGVmYXVsdE9wdGlvbnMsIGN1c3RvbU9wdGlvbnMgfHwge30pXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMuc3RhdGUgPSB7fVxuXG4gICAgLy8gSW5pdCBzbW9vdGggc2Nyb2xsIGlmIGVuYWJsZWQgKGRlZmF1bHQpLlxuICAgIGlmIChvcHRpb25zLnNjcm9sbFNtb290aCkge1xuICAgICAgb3B0aW9ucy5kdXJhdGlvbiA9IG9wdGlvbnMuc2Nyb2xsU21vb3RoRHVyYXRpb25cbiAgICAgIHRvY2JvdC5zY3JvbGxTbW9vdGggPSByZXF1aXJlKCcuL3Njcm9sbC1zbW9vdGgnKS5pbml0U21vb3RoU2Nyb2xsaW5nKG9wdGlvbnMpXG4gICAgfVxuXG4gICAgLy8gUGFzcyBvcHRpb25zIHRvIHRoZXNlIG1vZHVsZXMuXG4gICAgYnVpbGRIdG1sID0gQnVpbGRIdG1sKG9wdGlvbnMpXG4gICAgcGFyc2VDb250ZW50ID0gUGFyc2VDb250ZW50KG9wdGlvbnMpXG5cbiAgICAvLyBGb3IgdGVzdGluZyBwdXJwb3Nlcy5cbiAgICB0aGlzLl9idWlsZEh0bWwgPSBidWlsZEh0bWxcbiAgICB0aGlzLl9wYXJzZUNvbnRlbnQgPSBwYXJzZUNvbnRlbnRcblxuICAgIC8vIERlc3Ryb3kgaXQgaWYgaXQgZXhpc3RzIGZpcnN0LlxuICAgIHRvY2JvdC5kZXN0cm95KClcblxuICAgIC8vIEdldCBoZWFkaW5ncyBhcnJheS5cbiAgICBoZWFkaW5nc0FycmF5ID0gcGFyc2VDb250ZW50LnNlbGVjdEhlYWRpbmdzKG9wdGlvbnMuY29udGVudFNlbGVjdG9yLCBvcHRpb25zLmhlYWRpbmdTZWxlY3RvcilcbiAgICAvLyBSZXR1cm4gaWYgbm8gaGVhZGluZ3MgYXJlIGZvdW5kLlxuICAgIGlmIChoZWFkaW5nc0FycmF5ID09PSBudWxsKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBCdWlsZCBuZXN0ZWQgaGVhZGluZ3MgYXJyYXkuXG4gICAgdmFyIG5lc3RlZEhlYWRpbmdzT2JqID0gcGFyc2VDb250ZW50Lm5lc3RIZWFkaW5nc0FycmF5KGhlYWRpbmdzQXJyYXkpXG4gICAgdmFyIG5lc3RlZEhlYWRpbmdzID0gbmVzdGVkSGVhZGluZ3NPYmoubmVzdFxuXG4gICAgLy8gUmVuZGVyLlxuICAgIGJ1aWxkSHRtbC5yZW5kZXIob3B0aW9ucy50b2NTZWxlY3RvciwgbmVzdGVkSGVhZGluZ3MpXG5cbiAgICAvLyBVcGRhdGUgU2lkZWJhciBhbmQgYmluZCBsaXN0ZW5lcnMuXG4gICAgdGhpcy5fc2Nyb2xsTGlzdGVuZXIgPSB0aHJvdHRsZShmdW5jdGlvbiAoZSkge1xuICAgICAgYnVpbGRIdG1sLnVwZGF0ZVRvYyhoZWFkaW5nc0FycmF5KVxuICAgICAgdmFyIGlzVG9wID0gZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC5zY3JvbGxpbmdFbGVtZW50ICYmIGUudGFyZ2V0LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wID09PSAwXG4gICAgICBpZiAoKGUgJiYgKGUuZXZlbnRQaGFzZSA9PT0gMCB8fCBlLmN1cnJlbnRUYXJnZXQgPT09IG51bGwpKSB8fCBpc1RvcCkge1xuICAgICAgICBidWlsZEh0bWwuZW5hYmxlVG9jQW5pbWF0aW9uKClcbiAgICAgICAgYnVpbGRIdG1sLnVwZGF0ZVRvYyhoZWFkaW5nc0FycmF5KVxuICAgICAgICBpZiAob3B0aW9ucy5zY3JvbGxFbmRDYWxsYmFjaykge1xuICAgICAgICAgIG9wdGlvbnMuc2Nyb2xsRW5kQ2FsbGJhY2soZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIG9wdGlvbnMudGhyb3R0bGVUaW1lb3V0KVxuICAgIHRoaXMuX3Njcm9sbExpc3RlbmVyKClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxMaXN0ZW5lciwgZmFsc2UpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fc2Nyb2xsTGlzdGVuZXIsIGZhbHNlKVxuXG4gICAgLy8gQmluZCBjbGljayBsaXN0ZW5lcnMgdG8gZGlzYWJsZSBhbmltYXRpb24uXG4gICAgdGhpcy5fY2xpY2tMaXN0ZW5lciA9IHRocm90dGxlKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKG9wdGlvbnMuc2Nyb2xsU21vb3RoKSB7XG4gICAgICAgIGJ1aWxkSHRtbC5kaXNhYmxlVG9jQW5pbWF0aW9uKGV2ZW50KVxuICAgICAgfVxuICAgICAgYnVpbGRIdG1sLnVwZGF0ZVRvYyhoZWFkaW5nc0FycmF5KVxuICAgIH0sIG9wdGlvbnMudGhyb3R0bGVUaW1lb3V0KVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tMaXN0ZW5lciwgZmFsc2UpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2ggdG9jYm90LlxuICAgKi9cbiAgdG9jYm90LnJlZnJlc2ggPSBmdW5jdGlvbiAoY3VzdG9tT3B0aW9ucykge1xuICAgIHRvY2JvdC5kZXN0cm95KClcbiAgICB0b2Nib3QuaW5pdChjdXN0b21PcHRpb25zIHx8IHRoaXMub3B0aW9ucylcbiAgfVxuXG4gIC8vIE1ha2UgdG9jYm90IGF2YWlsYWJsZSBnbG9iYWxseS5cbiAgcm9vdC50b2Nib3QgPSB0b2Nib3RcblxuICByZXR1cm4gdG9jYm90XG59KVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

    /***/
  }),
  /* 1 */
  /*!***********************************!*\
    !*** (webpack)/buildin/global.js ***!
    \***********************************/
  /*! dynamic exports provided */
  /*! all exports used */
  /***/
  (function(module, exports) {

    eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1,eval)(\"this\");\r\n} catch(e) {\r\n\t// This works if the window reference is available\r\n\tif(typeof window === \"object\")\r\n\t\tg = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanM/MzY5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///1\n");

    /***/
  }),
  /* 2 */
  /*!***********************************!*\
    !*** ./src/js/default-options.js ***!
    \***********************************/
  /*! dynamic exports provided */
  /*! all exports used */
  /***/
  (function(module, exports) {

    eval("module.exports = {\n  // Where to render the table of contents.\n  tocSelector: '.js-toc',\n  // Where to grab the headings to build the table of contents.\n  contentSelector: '.js-toc-content',\n  // Which headings to grab inside of the contentSelector element.\n  headingSelector: 'h1, h2, h3',\n  // Headings that match the ignoreSelector will be skipped.\n  ignoreSelector: '.js-toc-ignore',\n  // Main class to add to links.\n  linkClass: 'toc-link',\n  // Extra classes to add to links.\n  extraLinkClasses: '',\n  // Class to add to active links,\n  // the link corresponding to the top most heading on the page.\n  activeLinkClass: 'is-active-link',\n  // Main class to add to lists.\n  listClass: 'toc-list',\n  // Extra classes to add to lists.\n  extraListClasses: '',\n  // Class that gets added when a list should be collapsed.\n  isCollapsedClass: 'is-collapsed',\n  // Class that gets added when a list should be able\n  // to be collapsed but isn't necessarily collpased.\n  collapsibleClass: 'is-collapsible',\n  // Class to add to list items.\n  listItemClass: 'toc-list-item',\n  // Class to add to active list items.\n  activeListItemClass: 'is-active-li',\n  // How many heading levels should not be collpased.\n  // For example, number 6 will show everything since\n  // there are only 6 heading levels and number 0 will collpase them all.\n  // The sections that are hidden will open\n  // and close as you scroll to headings within them.\n  collapseDepth: 0,\n  // Smooth scrolling enabled.\n  scrollSmooth: true,\n  // Smooth scroll duration.\n  scrollSmoothDuration: 420,\n  // Callback for scroll end.\n  scrollEndCallback: function (e) {},\n  // Headings offset between the headings and the top of the document (this is meant for minor adjustments).\n  headingsOffset: 1,\n  // Timeout between events firing to make sure it's\n  // not too rapid (for performance reasons).\n  throttleTimeout: 50,\n  // Element to add the positionFixedClass to.\n  positionFixedSelector: null,\n  // Fixed position class to add to make sidebar fixed after scrolling\n  // down past the fixedSidebarOffset.\n  positionFixedClass: 'is-position-fixed',\n  // fixedSidebarOffset can be any number but by default is set\n  // to auto which sets the fixedSidebarOffset to the sidebar\n  // element's offsetTop from the top of the document on init.\n  fixedSidebarOffset: 'auto',\n  // includeHtml can be set to true to include the HTML markup from the\n  // heading node instead of just including the textContent.\n  includeHtml: false,\n  // onclick function to apply to all links in toc. will be called with\n  // the event as the first parameter, and this can be used to stop,\n  // propagation, prevent default or perform action\n  onClick: false\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9kZWZhdWx0LW9wdGlvbnMuanM/MTg1MSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gV2hlcmUgdG8gcmVuZGVyIHRoZSB0YWJsZSBvZiBjb250ZW50cy5cbiAgdG9jU2VsZWN0b3I6ICcuanMtdG9jJyxcbiAgLy8gV2hlcmUgdG8gZ3JhYiB0aGUgaGVhZGluZ3MgdG8gYnVpbGQgdGhlIHRhYmxlIG9mIGNvbnRlbnRzLlxuICBjb250ZW50U2VsZWN0b3I6ICcuanMtdG9jLWNvbnRlbnQnLFxuICAvLyBXaGljaCBoZWFkaW5ncyB0byBncmFiIGluc2lkZSBvZiB0aGUgY29udGVudFNlbGVjdG9yIGVsZW1lbnQuXG4gIGhlYWRpbmdTZWxlY3RvcjogJ2gxLCBoMiwgaDMnLFxuICAvLyBIZWFkaW5ncyB0aGF0IG1hdGNoIHRoZSBpZ25vcmVTZWxlY3RvciB3aWxsIGJlIHNraXBwZWQuXG4gIGlnbm9yZVNlbGVjdG9yOiAnLmpzLXRvYy1pZ25vcmUnLFxuICAvLyBNYWluIGNsYXNzIHRvIGFkZCB0byBsaW5rcy5cbiAgbGlua0NsYXNzOiAndG9jLWxpbmsnLFxuICAvLyBFeHRyYSBjbGFzc2VzIHRvIGFkZCB0byBsaW5rcy5cbiAgZXh0cmFMaW5rQ2xhc3NlczogJycsXG4gIC8vIENsYXNzIHRvIGFkZCB0byBhY3RpdmUgbGlua3MsXG4gIC8vIHRoZSBsaW5rIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHRvcCBtb3N0IGhlYWRpbmcgb24gdGhlIHBhZ2UuXG4gIGFjdGl2ZUxpbmtDbGFzczogJ2lzLWFjdGl2ZS1saW5rJyxcbiAgLy8gTWFpbiBjbGFzcyB0byBhZGQgdG8gbGlzdHMuXG4gIGxpc3RDbGFzczogJ3RvYy1saXN0JyxcbiAgLy8gRXh0cmEgY2xhc3NlcyB0byBhZGQgdG8gbGlzdHMuXG4gIGV4dHJhTGlzdENsYXNzZXM6ICcnLFxuICAvLyBDbGFzcyB0aGF0IGdldHMgYWRkZWQgd2hlbiBhIGxpc3Qgc2hvdWxkIGJlIGNvbGxhcHNlZC5cbiAgaXNDb2xsYXBzZWRDbGFzczogJ2lzLWNvbGxhcHNlZCcsXG4gIC8vIENsYXNzIHRoYXQgZ2V0cyBhZGRlZCB3aGVuIGEgbGlzdCBzaG91bGQgYmUgYWJsZVxuICAvLyB0byBiZSBjb2xsYXBzZWQgYnV0IGlzbid0IG5lY2Vzc2FyaWx5IGNvbGxwYXNlZC5cbiAgY29sbGFwc2libGVDbGFzczogJ2lzLWNvbGxhcHNpYmxlJyxcbiAgLy8gQ2xhc3MgdG8gYWRkIHRvIGxpc3QgaXRlbXMuXG4gIGxpc3RJdGVtQ2xhc3M6ICd0b2MtbGlzdC1pdGVtJyxcbiAgLy8gQ2xhc3MgdG8gYWRkIHRvIGFjdGl2ZSBsaXN0IGl0ZW1zLlxuICBhY3RpdmVMaXN0SXRlbUNsYXNzOiAnaXMtYWN0aXZlLWxpJyxcbiAgLy8gSG93IG1hbnkgaGVhZGluZyBsZXZlbHMgc2hvdWxkIG5vdCBiZSBjb2xscGFzZWQuXG4gIC8vIEZvciBleGFtcGxlLCBudW1iZXIgNiB3aWxsIHNob3cgZXZlcnl0aGluZyBzaW5jZVxuICAvLyB0aGVyZSBhcmUgb25seSA2IGhlYWRpbmcgbGV2ZWxzIGFuZCBudW1iZXIgMCB3aWxsIGNvbGxwYXNlIHRoZW0gYWxsLlxuICAvLyBUaGUgc2VjdGlvbnMgdGhhdCBhcmUgaGlkZGVuIHdpbGwgb3BlblxuICAvLyBhbmQgY2xvc2UgYXMgeW91IHNjcm9sbCB0byBoZWFkaW5ncyB3aXRoaW4gdGhlbS5cbiAgY29sbGFwc2VEZXB0aDogMCxcbiAgLy8gU21vb3RoIHNjcm9sbGluZyBlbmFibGVkLlxuICBzY3JvbGxTbW9vdGg6IHRydWUsXG4gIC8vIFNtb290aCBzY3JvbGwgZHVyYXRpb24uXG4gIHNjcm9sbFNtb290aER1cmF0aW9uOiA0MjAsXG4gIC8vIENhbGxiYWNrIGZvciBzY3JvbGwgZW5kLlxuICBzY3JvbGxFbmRDYWxsYmFjazogZnVuY3Rpb24gKGUpIHt9LFxuICAvLyBIZWFkaW5ncyBvZmZzZXQgYmV0d2VlbiB0aGUgaGVhZGluZ3MgYW5kIHRoZSB0b3Agb2YgdGhlIGRvY3VtZW50ICh0aGlzIGlzIG1lYW50IGZvciBtaW5vciBhZGp1c3RtZW50cykuXG4gIGhlYWRpbmdzT2Zmc2V0OiAxLFxuICAvLyBUaW1lb3V0IGJldHdlZW4gZXZlbnRzIGZpcmluZyB0byBtYWtlIHN1cmUgaXQnc1xuICAvLyBub3QgdG9vIHJhcGlkIChmb3IgcGVyZm9ybWFuY2UgcmVhc29ucykuXG4gIHRocm90dGxlVGltZW91dDogNTAsXG4gIC8vIEVsZW1lbnQgdG8gYWRkIHRoZSBwb3NpdGlvbkZpeGVkQ2xhc3MgdG8uXG4gIHBvc2l0aW9uRml4ZWRTZWxlY3RvcjogbnVsbCxcbiAgLy8gRml4ZWQgcG9zaXRpb24gY2xhc3MgdG8gYWRkIHRvIG1ha2Ugc2lkZWJhciBmaXhlZCBhZnRlciBzY3JvbGxpbmdcbiAgLy8gZG93biBwYXN0IHRoZSBmaXhlZFNpZGViYXJPZmZzZXQuXG4gIHBvc2l0aW9uRml4ZWRDbGFzczogJ2lzLXBvc2l0aW9uLWZpeGVkJyxcbiAgLy8gZml4ZWRTaWRlYmFyT2Zmc2V0IGNhbiBiZSBhbnkgbnVtYmVyIGJ1dCBieSBkZWZhdWx0IGlzIHNldFxuICAvLyB0byBhdXRvIHdoaWNoIHNldHMgdGhlIGZpeGVkU2lkZWJhck9mZnNldCB0byB0aGUgc2lkZWJhclxuICAvLyBlbGVtZW50J3Mgb2Zmc2V0VG9wIGZyb20gdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnQgb24gaW5pdC5cbiAgZml4ZWRTaWRlYmFyT2Zmc2V0OiAnYXV0bycsXG4gIC8vIGluY2x1ZGVIdG1sIGNhbiBiZSBzZXQgdG8gdHJ1ZSB0byBpbmNsdWRlIHRoZSBIVE1MIG1hcmt1cCBmcm9tIHRoZVxuICAvLyBoZWFkaW5nIG5vZGUgaW5zdGVhZCBvZiBqdXN0IGluY2x1ZGluZyB0aGUgdGV4dENvbnRlbnQuXG4gIGluY2x1ZGVIdG1sOiBmYWxzZSxcbiAgLy8gb25jbGljayBmdW5jdGlvbiB0byBhcHBseSB0byBhbGwgbGlua3MgaW4gdG9jLiB3aWxsIGJlIGNhbGxlZCB3aXRoXG4gIC8vIHRoZSBldmVudCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLCBhbmQgdGhpcyBjYW4gYmUgdXNlZCB0byBzdG9wLFxuICAvLyBwcm9wYWdhdGlvbiwgcHJldmVudCBkZWZhdWx0IG9yIHBlcmZvcm0gYWN0aW9uXG4gIG9uQ2xpY2s6IGZhbHNlXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9kZWZhdWx0LW9wdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///2\n");

    /***/
  }),
  /* 3 */
  /*!******************************!*\
    !*** ./src/js/build-html.js ***!
    \******************************/
  /*! dynamic exports provided */
  /*! all exports used */
  /***/
  (function(module, exports) {

    eval("/**\n * This file is responsible for building the DOM and updating DOM state.\n *\n * @author Tim Scanlin\n */\n\nmodule.exports = function (options) {\n  var forEach = [].forEach\n  var some = [].some\n  var body = document.body\n  var currentlyHighlighting = true\n  var SPACE_CHAR = ' '\n\n  /**\n   * Create link and list elements.\n   * @param {Object} d\n   * @param {HTMLElement} container\n   * @return {HTMLElement}\n   */\n  function createEl (d, container) {\n    var link = container.appendChild(createLink(d))\n    if (d.children.length) {\n      var list = createList(d.isCollapsed)\n      d.children.forEach(function (child) {\n        createEl(child, list)\n      })\n      link.appendChild(list)\n    }\n  }\n\n  /**\n   * Render nested heading array data into a given selector.\n   * @param {String} selector\n   * @param {Array} data\n   * @return {HTMLElement}\n   */\n  function render (selector, data) {\n    var collapsed = false\n    var container = createList(collapsed)\n\n    data.forEach(function (d) {\n      createEl(d, container)\n    })\n\n    var parent = document.querySelector(selector)\n\n    // Return if no parent is found.\n    if (parent === null) {\n      return\n    }\n\n    // Remove existing child if it exists.\n    if (parent.firstChild) {\n      parent.removeChild(parent.firstChild)\n    }\n\n    // Just return the parent and don't append the list if no links are found.\n    if (data.length === 0) {\n      return parent\n    }\n\n    // Append the Elements that have been created\n    return parent.appendChild(container)\n  }\n\n  /**\n   * Create link element.\n   * @param {Object} data\n   * @return {HTMLElement}\n   */\n  function createLink (data) {\n    var item = document.createElement('li')\n    var a = document.createElement('a')\n    if (options.listItemClass) {\n      item.setAttribute('class', options.listItemClass)\n    }\n\n    if (options.onClick) {\n      a.onclick = options.onClick\n    }\n\n    if (options.includeHtml && data.childNodes.length) {\n      forEach.call(data.childNodes, function (node) {\n        a.appendChild(node.cloneNode(true))\n      })\n    } else {\n      // Default behavior.\n      a.textContent = data.textContent\n    }\n    a.setAttribute('href', '#' + data.id)\n    a.setAttribute('class', options.linkClass +\n      SPACE_CHAR + 'node-name--' + data.nodeName +\n      SPACE_CHAR + options.extraLinkClasses)\n    item.appendChild(a)\n    return item\n  }\n\n  /**\n   * Create list element.\n   * @param {Boolean} isCollapsed\n   * @return {HTMLElement}\n   */\n  function createList (isCollapsed) {\n    var list = document.createElement('ol')\n    var classes = options.listClass +\n      SPACE_CHAR + options.extraListClasses\n    if (isCollapsed) {\n      classes += SPACE_CHAR + options.collapsibleClass\n      classes += SPACE_CHAR + options.isCollapsedClass\n    }\n    list.setAttribute('class', classes)\n    return list\n  }\n\n  /**\n   * Update fixed sidebar class.\n   * @return {HTMLElement}\n   */\n  function updateFixedSidebarClass () {\n    var top = document.documentElement.scrollTop || body.scrollTop\n    var posFixedEl = document.querySelector(options.positionFixedSelector)\n\n    if (options.fixedSidebarOffset === 'auto') {\n      options.fixedSidebarOffset = document.querySelector(options.tocSelector).offsetTop\n    }\n\n    if (top > options.fixedSidebarOffset) {\n      if (posFixedEl.className.indexOf(options.positionFixedClass) === -1) {\n        posFixedEl.className += SPACE_CHAR + options.positionFixedClass\n      }\n    } else {\n      posFixedEl.className = posFixedEl.className.split(SPACE_CHAR + options.positionFixedClass).join('')\n    }\n  }\n\n  /**\n   * Update TOC highlighting and collpased groupings.\n   */\n  function updateToc (headingsArray) {\n    var top = document.documentElement.scrollTop || body.scrollTop\n\n    // Add fixed class at offset\n    if (options.positionFixedSelector) {\n      updateFixedSidebarClass()\n    }\n\n    // Get the top most heading currently visible on the page so we know what to highlight.\n    var headings = headingsArray\n    var topHeader\n    // Using some instead of each so that we can escape early.\n    if (currentlyHighlighting &&\n      document.querySelector(options.tocSelector) !== null &&\n      headings.length > 0) {\n      some.call(headings, function (heading, i) {\n        if (heading.offsetTop > top + options.headingsOffset + 10) {\n          // Don't allow negative index value.\n          var index = (i === 0) ? i : i - 1\n          topHeader = headings[index]\n          return true\n        } else if (i === headings.length - 1) {\n          // This allows scrolling for the last heading on the page.\n          topHeader = headings[headings.length - 1]\n          return true\n        }\n      })\n\n      // Remove the active class from the other tocLinks.\n      var tocLinks = document.querySelector(options.tocSelector)\n        .querySelectorAll('.' + options.linkClass)\n      forEach.call(tocLinks, function (tocLink) {\n        tocLink.className = tocLink.className.split(SPACE_CHAR + options.activeLinkClass).join('')\n      })\n      var tocLis = document.querySelector(options.tocSelector)\n        .querySelectorAll('.' + options.listItemClass)\n      forEach.call(tocLis, function (tocLi) {\n        tocLi.className = tocLi.className.split(SPACE_CHAR + options.activeListItemClass).join('')\n      })\n\n      // Add the active class to the active tocLink.\n      var activeTocLink = document.querySelector(options.tocSelector)\n        .querySelector('.' + options.linkClass +\n          '.node-name--' + topHeader.nodeName +\n          '[href=\"#' + topHeader.id + '\"]')\n      if (activeTocLink.className.indexOf(options.activeLinkClass) === -1) {\n        activeTocLink.className += SPACE_CHAR + options.activeLinkClass\n      }\n      var li = activeTocLink.parentNode\n      if (li && li.className.indexOf(options.activeListItemClass) === -1) {\n        li.className += SPACE_CHAR + options.activeListItemClass\n      }\n\n      var tocLists = document.querySelector(options.tocSelector)\n        .querySelectorAll('.' + options.listClass + '.' + options.collapsibleClass)\n\n      // Collapse the other collapsible lists.\n      forEach.call(tocLists, function (list) {\n        if (list.className.indexOf(options.isCollapsedClass) === -1) {\n          list.className += SPACE_CHAR + options.isCollapsedClass\n        }\n      })\n\n      // Expand the active link's collapsible list and its sibling if applicable.\n      if (activeTocLink.nextSibling && activeTocLink.nextSibling.className.indexOf(options.isCollapsedClass) !== -1) {\n        activeTocLink.nextSibling.className = activeTocLink.nextSibling.className.split(SPACE_CHAR + options.isCollapsedClass).join('')\n      }\n      removeCollapsedFromParents(activeTocLink.parentNode.parentNode)\n    }\n  }\n\n  /**\n   * Remove collpased class from parent elements.\n   * @param {HTMLElement} element\n   * @return {HTMLElement}\n   */\n  function removeCollapsedFromParents (element) {\n    if (element.className.indexOf(options.collapsibleClass) !== -1 && element.className.indexOf(options.isCollapsedClass) !== -1) {\n      element.className = element.className.split(SPACE_CHAR + options.isCollapsedClass).join('')\n      return removeCollapsedFromParents(element.parentNode.parentNode)\n    }\n    return element\n  }\n\n  /**\n   * Disable TOC Animation when a link is clicked.\n   * @param {Event} event\n   */\n  function disableTocAnimation (event) {\n    var target = event.target || event.srcElement\n    if (typeof target.className !== 'string' || target.className.indexOf(options.linkClass) === -1) {\n      return\n    }\n    // Bind to tocLink clicks to temporarily disable highlighting\n    // while smoothScroll is animating.\n    currentlyHighlighting = false\n  }\n\n  /**\n   * Enable TOC Animation.\n   */\n  function enableTocAnimation () {\n    currentlyHighlighting = true\n  }\n\n  return {\n    enableTocAnimation: enableTocAnimation,\n    disableTocAnimation: disableTocAnimation,\n    render: render,\n    updateToc: updateToc\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9idWlsZC1odG1sLmpzPzdkMDEiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGlzIGZpbGUgaXMgcmVzcG9uc2libGUgZm9yIGJ1aWxkaW5nIHRoZSBET00gYW5kIHVwZGF0aW5nIERPTSBzdGF0ZS5cbiAqXG4gKiBAYXV0aG9yIFRpbSBTY2FubGluXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgZm9yRWFjaCA9IFtdLmZvckVhY2hcbiAgdmFyIHNvbWUgPSBbXS5zb21lXG4gIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keVxuICB2YXIgY3VycmVudGx5SGlnaGxpZ2h0aW5nID0gdHJ1ZVxuICB2YXIgU1BBQ0VfQ0hBUiA9ICcgJ1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgbGluayBhbmQgbGlzdCBlbGVtZW50cy5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGFpbmVyXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlRWwgKGQsIGNvbnRhaW5lcikge1xuICAgIHZhciBsaW5rID0gY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUxpbmsoZCkpXG4gICAgaWYgKGQuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICB2YXIgbGlzdCA9IGNyZWF0ZUxpc3QoZC5pc0NvbGxhcHNlZClcbiAgICAgIGQuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgY3JlYXRlRWwoY2hpbGQsIGxpc3QpXG4gICAgICB9KVxuICAgICAgbGluay5hcHBlbmRDaGlsZChsaXN0KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgbmVzdGVkIGhlYWRpbmcgYXJyYXkgZGF0YSBpbnRvIGEgZ2l2ZW4gc2VsZWN0b3IuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZnVuY3Rpb24gcmVuZGVyIChzZWxlY3RvciwgZGF0YSkge1xuICAgIHZhciBjb2xsYXBzZWQgPSBmYWxzZVxuICAgIHZhciBjb250YWluZXIgPSBjcmVhdGVMaXN0KGNvbGxhcHNlZClcblxuICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgY3JlYXRlRWwoZCwgY29udGFpbmVyKVxuICAgIH0pXG5cbiAgICB2YXIgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcblxuICAgIC8vIFJldHVybiBpZiBubyBwYXJlbnQgaXMgZm91bmQuXG4gICAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGV4aXN0aW5nIGNoaWxkIGlmIGl0IGV4aXN0cy5cbiAgICBpZiAocGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuZmlyc3RDaGlsZClcbiAgICB9XG5cbiAgICAvLyBKdXN0IHJldHVybiB0aGUgcGFyZW50IGFuZCBkb24ndCBhcHBlbmQgdGhlIGxpc3QgaWYgbm8gbGlua3MgYXJlIGZvdW5kLlxuICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHBhcmVudFxuICAgIH1cblxuICAgIC8vIEFwcGVuZCB0aGUgRWxlbWVudHMgdGhhdCBoYXZlIGJlZW4gY3JlYXRlZFxuICAgIHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBsaW5rIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlTGluayAoZGF0YSkge1xuICAgIHZhciBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgaWYgKG9wdGlvbnMubGlzdEl0ZW1DbGFzcykge1xuICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgb3B0aW9ucy5saXN0SXRlbUNsYXNzKVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLm9uQ2xpY2spIHtcbiAgICAgIGEub25jbGljayA9IG9wdGlvbnMub25DbGlja1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmluY2x1ZGVIdG1sICYmIGRhdGEuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIGZvckVhY2guY2FsbChkYXRhLmNoaWxkTm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGEuYXBwZW5kQ2hpbGQobm9kZS5jbG9uZU5vZGUodHJ1ZSkpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBEZWZhdWx0IGJlaGF2aW9yLlxuICAgICAgYS50ZXh0Q29udGVudCA9IGRhdGEudGV4dENvbnRlbnRcbiAgICB9XG4gICAgYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycgKyBkYXRhLmlkKVxuICAgIGEuc2V0QXR0cmlidXRlKCdjbGFzcycsIG9wdGlvbnMubGlua0NsYXNzICtcbiAgICAgIFNQQUNFX0NIQVIgKyAnbm9kZS1uYW1lLS0nICsgZGF0YS5ub2RlTmFtZSArXG4gICAgICBTUEFDRV9DSEFSICsgb3B0aW9ucy5leHRyYUxpbmtDbGFzc2VzKVxuICAgIGl0ZW0uYXBwZW5kQ2hpbGQoYSlcbiAgICByZXR1cm4gaXRlbVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBsaXN0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNDb2xsYXBzZWRcbiAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVMaXN0IChpc0NvbGxhcHNlZCkge1xuICAgIHZhciBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2wnKVxuICAgIHZhciBjbGFzc2VzID0gb3B0aW9ucy5saXN0Q2xhc3MgK1xuICAgICAgU1BBQ0VfQ0hBUiArIG9wdGlvbnMuZXh0cmFMaXN0Q2xhc3Nlc1xuICAgIGlmIChpc0NvbGxhcHNlZCkge1xuICAgICAgY2xhc3NlcyArPSBTUEFDRV9DSEFSICsgb3B0aW9ucy5jb2xsYXBzaWJsZUNsYXNzXG4gICAgICBjbGFzc2VzICs9IFNQQUNFX0NIQVIgKyBvcHRpb25zLmlzQ29sbGFwc2VkQ2xhc3NcbiAgICB9XG4gICAgbGlzdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xhc3NlcylcbiAgICByZXR1cm4gbGlzdFxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBmaXhlZCBzaWRlYmFyIGNsYXNzLlxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGZ1bmN0aW9uIHVwZGF0ZUZpeGVkU2lkZWJhckNsYXNzICgpIHtcbiAgICB2YXIgdG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBib2R5LnNjcm9sbFRvcFxuICAgIHZhciBwb3NGaXhlZEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnBvc2l0aW9uRml4ZWRTZWxlY3RvcilcblxuICAgIGlmIChvcHRpb25zLmZpeGVkU2lkZWJhck9mZnNldCA9PT0gJ2F1dG8nKSB7XG4gICAgICBvcHRpb25zLmZpeGVkU2lkZWJhck9mZnNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy50b2NTZWxlY3Rvcikub2Zmc2V0VG9wXG4gICAgfVxuXG4gICAgaWYgKHRvcCA+IG9wdGlvbnMuZml4ZWRTaWRlYmFyT2Zmc2V0KSB7XG4gICAgICBpZiAocG9zRml4ZWRFbC5jbGFzc05hbWUuaW5kZXhPZihvcHRpb25zLnBvc2l0aW9uRml4ZWRDbGFzcykgPT09IC0xKSB7XG4gICAgICAgIHBvc0ZpeGVkRWwuY2xhc3NOYW1lICs9IFNQQUNFX0NIQVIgKyBvcHRpb25zLnBvc2l0aW9uRml4ZWRDbGFzc1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwb3NGaXhlZEVsLmNsYXNzTmFtZSA9IHBvc0ZpeGVkRWwuY2xhc3NOYW1lLnNwbGl0KFNQQUNFX0NIQVIgKyBvcHRpb25zLnBvc2l0aW9uRml4ZWRDbGFzcykuam9pbignJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIFRPQyBoaWdobGlnaHRpbmcgYW5kIGNvbGxwYXNlZCBncm91cGluZ3MuXG4gICAqL1xuICBmdW5jdGlvbiB1cGRhdGVUb2MgKGhlYWRpbmdzQXJyYXkpIHtcbiAgICB2YXIgdG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBib2R5LnNjcm9sbFRvcFxuXG4gICAgLy8gQWRkIGZpeGVkIGNsYXNzIGF0IG9mZnNldFxuICAgIGlmIChvcHRpb25zLnBvc2l0aW9uRml4ZWRTZWxlY3Rvcikge1xuICAgICAgdXBkYXRlRml4ZWRTaWRlYmFyQ2xhc3MoKVxuICAgIH1cblxuICAgIC8vIEdldCB0aGUgdG9wIG1vc3QgaGVhZGluZyBjdXJyZW50bHkgdmlzaWJsZSBvbiB0aGUgcGFnZSBzbyB3ZSBrbm93IHdoYXQgdG8gaGlnaGxpZ2h0LlxuICAgIHZhciBoZWFkaW5ncyA9IGhlYWRpbmdzQXJyYXlcbiAgICB2YXIgdG9wSGVhZGVyXG4gICAgLy8gVXNpbmcgc29tZSBpbnN0ZWFkIG9mIGVhY2ggc28gdGhhdCB3ZSBjYW4gZXNjYXBlIGVhcmx5LlxuICAgIGlmIChjdXJyZW50bHlIaWdobGlnaHRpbmcgJiZcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy50b2NTZWxlY3RvcikgIT09IG51bGwgJiZcbiAgICAgIGhlYWRpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNvbWUuY2FsbChoZWFkaW5ncywgZnVuY3Rpb24gKGhlYWRpbmcsIGkpIHtcbiAgICAgICAgaWYgKGhlYWRpbmcub2Zmc2V0VG9wID4gdG9wICsgb3B0aW9ucy5oZWFkaW5nc09mZnNldCArIDEwKSB7XG4gICAgICAgICAgLy8gRG9uJ3QgYWxsb3cgbmVnYXRpdmUgaW5kZXggdmFsdWUuXG4gICAgICAgICAgdmFyIGluZGV4ID0gKGkgPT09IDApID8gaSA6IGkgLSAxXG4gICAgICAgICAgdG9wSGVhZGVyID0gaGVhZGluZ3NbaW5kZXhdXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIGlmIChpID09PSBoZWFkaW5ncy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgLy8gVGhpcyBhbGxvd3Mgc2Nyb2xsaW5nIGZvciB0aGUgbGFzdCBoZWFkaW5nIG9uIHRoZSBwYWdlLlxuICAgICAgICAgIHRvcEhlYWRlciA9IGhlYWRpbmdzW2hlYWRpbmdzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gUmVtb3ZlIHRoZSBhY3RpdmUgY2xhc3MgZnJvbSB0aGUgb3RoZXIgdG9jTGlua3MuXG4gICAgICB2YXIgdG9jTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMudG9jU2VsZWN0b3IpXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIG9wdGlvbnMubGlua0NsYXNzKVxuICAgICAgZm9yRWFjaC5jYWxsKHRvY0xpbmtzLCBmdW5jdGlvbiAodG9jTGluaykge1xuICAgICAgICB0b2NMaW5rLmNsYXNzTmFtZSA9IHRvY0xpbmsuY2xhc3NOYW1lLnNwbGl0KFNQQUNFX0NIQVIgKyBvcHRpb25zLmFjdGl2ZUxpbmtDbGFzcykuam9pbignJylcbiAgICAgIH0pXG4gICAgICB2YXIgdG9jTGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnRvY1NlbGVjdG9yKVxuICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnLicgKyBvcHRpb25zLmxpc3RJdGVtQ2xhc3MpXG4gICAgICBmb3JFYWNoLmNhbGwodG9jTGlzLCBmdW5jdGlvbiAodG9jTGkpIHtcbiAgICAgICAgdG9jTGkuY2xhc3NOYW1lID0gdG9jTGkuY2xhc3NOYW1lLnNwbGl0KFNQQUNFX0NIQVIgKyBvcHRpb25zLmFjdGl2ZUxpc3RJdGVtQ2xhc3MpLmpvaW4oJycpXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGQgdGhlIGFjdGl2ZSBjbGFzcyB0byB0aGUgYWN0aXZlIHRvY0xpbmsuXG4gICAgICB2YXIgYWN0aXZlVG9jTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy50b2NTZWxlY3RvcilcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy4nICsgb3B0aW9ucy5saW5rQ2xhc3MgK1xuICAgICAgICAgICcubm9kZS1uYW1lLS0nICsgdG9wSGVhZGVyLm5vZGVOYW1lICtcbiAgICAgICAgICAnW2hyZWY9XCIjJyArIHRvcEhlYWRlci5pZCArICdcIl0nKVxuICAgICAgaWYgKGFjdGl2ZVRvY0xpbmsuY2xhc3NOYW1lLmluZGV4T2Yob3B0aW9ucy5hY3RpdmVMaW5rQ2xhc3MpID09PSAtMSkge1xuICAgICAgICBhY3RpdmVUb2NMaW5rLmNsYXNzTmFtZSArPSBTUEFDRV9DSEFSICsgb3B0aW9ucy5hY3RpdmVMaW5rQ2xhc3NcbiAgICAgIH1cbiAgICAgIHZhciBsaSA9IGFjdGl2ZVRvY0xpbmsucGFyZW50Tm9kZVxuICAgICAgaWYgKGxpICYmIGxpLmNsYXNzTmFtZS5pbmRleE9mKG9wdGlvbnMuYWN0aXZlTGlzdEl0ZW1DbGFzcykgPT09IC0xKSB7XG4gICAgICAgIGxpLmNsYXNzTmFtZSArPSBTUEFDRV9DSEFSICsgb3B0aW9ucy5hY3RpdmVMaXN0SXRlbUNsYXNzXG4gICAgICB9XG5cbiAgICAgIHZhciB0b2NMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy50b2NTZWxlY3RvcilcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgb3B0aW9ucy5saXN0Q2xhc3MgKyAnLicgKyBvcHRpb25zLmNvbGxhcHNpYmxlQ2xhc3MpXG5cbiAgICAgIC8vIENvbGxhcHNlIHRoZSBvdGhlciBjb2xsYXBzaWJsZSBsaXN0cy5cbiAgICAgIGZvckVhY2guY2FsbCh0b2NMaXN0cywgZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgaWYgKGxpc3QuY2xhc3NOYW1lLmluZGV4T2Yob3B0aW9ucy5pc0NvbGxhcHNlZENsYXNzKSA9PT0gLTEpIHtcbiAgICAgICAgICBsaXN0LmNsYXNzTmFtZSArPSBTUEFDRV9DSEFSICsgb3B0aW9ucy5pc0NvbGxhcHNlZENsYXNzXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIEV4cGFuZCB0aGUgYWN0aXZlIGxpbmsncyBjb2xsYXBzaWJsZSBsaXN0IGFuZCBpdHMgc2libGluZyBpZiBhcHBsaWNhYmxlLlxuICAgICAgaWYgKGFjdGl2ZVRvY0xpbmsubmV4dFNpYmxpbmcgJiYgYWN0aXZlVG9jTGluay5uZXh0U2libGluZy5jbGFzc05hbWUuaW5kZXhPZihvcHRpb25zLmlzQ29sbGFwc2VkQ2xhc3MpICE9PSAtMSkge1xuICAgICAgICBhY3RpdmVUb2NMaW5rLm5leHRTaWJsaW5nLmNsYXNzTmFtZSA9IGFjdGl2ZVRvY0xpbmsubmV4dFNpYmxpbmcuY2xhc3NOYW1lLnNwbGl0KFNQQUNFX0NIQVIgKyBvcHRpb25zLmlzQ29sbGFwc2VkQ2xhc3MpLmpvaW4oJycpXG4gICAgICB9XG4gICAgICByZW1vdmVDb2xsYXBzZWRGcm9tUGFyZW50cyhhY3RpdmVUb2NMaW5rLnBhcmVudE5vZGUucGFyZW50Tm9kZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGNvbGxwYXNlZCBjbGFzcyBmcm9tIHBhcmVudCBlbGVtZW50cy5cbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGZ1bmN0aW9uIHJlbW92ZUNvbGxhcHNlZEZyb21QYXJlbnRzIChlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2Yob3B0aW9ucy5jb2xsYXBzaWJsZUNsYXNzKSAhPT0gLTEgJiYgZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihvcHRpb25zLmlzQ29sbGFwc2VkQ2xhc3MpICE9PSAtMSkge1xuICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChTUEFDRV9DSEFSICsgb3B0aW9ucy5pc0NvbGxhcHNlZENsYXNzKS5qb2luKCcnKVxuICAgICAgcmV0dXJuIHJlbW92ZUNvbGxhcHNlZEZyb21QYXJlbnRzKGVsZW1lbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlKVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudFxuICB9XG5cbiAgLyoqXG4gICAqIERpc2FibGUgVE9DIEFuaW1hdGlvbiB3aGVuIGEgbGluayBpcyBjbGlja2VkLlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgKi9cbiAgZnVuY3Rpb24gZGlzYWJsZVRvY0FuaW1hdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnRcbiAgICBpZiAodHlwZW9mIHRhcmdldC5jbGFzc05hbWUgIT09ICdzdHJpbmcnIHx8IHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZihvcHRpb25zLmxpbmtDbGFzcykgPT09IC0xKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8gQmluZCB0byB0b2NMaW5rIGNsaWNrcyB0byB0ZW1wb3JhcmlseSBkaXNhYmxlIGhpZ2hsaWdodGluZ1xuICAgIC8vIHdoaWxlIHNtb290aFNjcm9sbCBpcyBhbmltYXRpbmcuXG4gICAgY3VycmVudGx5SGlnaGxpZ2h0aW5nID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmFibGUgVE9DIEFuaW1hdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGVuYWJsZVRvY0FuaW1hdGlvbiAoKSB7XG4gICAgY3VycmVudGx5SGlnaGxpZ2h0aW5nID0gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlbmFibGVUb2NBbmltYXRpb246IGVuYWJsZVRvY0FuaW1hdGlvbixcbiAgICBkaXNhYmxlVG9jQW5pbWF0aW9uOiBkaXNhYmxlVG9jQW5pbWF0aW9uLFxuICAgIHJlbmRlcjogcmVuZGVyLFxuICAgIHVwZGF0ZVRvYzogdXBkYXRlVG9jXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2J1aWxkLWh0bWwuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///3\n");

    /***/
  }),
  /* 4 */
  /*!*********************************!*\
    !*** ./src/js/parse-content.js ***!
    \*********************************/
  /*! dynamic exports provided */
  /*! all exports used */
  /***/
  (function(module, exports) {

    eval("/**\n * This file is responsible for parsing the content from the DOM and making\n * sure data is nested properly.\n *\n * @author Tim Scanlin\n */\n\nmodule.exports = function parseContent (options) {\n  var reduce = [].reduce\n\n  /**\n   * Get the last item in an array and return a reference to it.\n   * @param {Array} array\n   * @return {Object}\n   */\n  function getLastItem (array) {\n    return array[array.length - 1]\n  }\n\n  /**\n   * Get heading level for a heading dom node.\n   * @param {HTMLElement} heading\n   * @return {Number}\n   */\n  function getHeadingLevel (heading) {\n    return +heading.nodeName.split('H').join('')\n  }\n\n  /**\n   * Get important properties from a heading element and store in a plain object.\n   * @param {HTMLElement} heading\n   * @return {Object}\n   */\n  function getHeadingObject (heading) {\n    var obj = {\n      id: heading.id,\n      children: [],\n      nodeName: heading.nodeName,\n      headingLevel: getHeadingLevel(heading),\n      textContent: heading.textContent.trim()\n    }\n\n    if (options.includeHtml) {\n      obj.childNodes = heading.childNodes\n    }\n\n    return obj\n  }\n\n  /**\n   * Add a node to the nested array.\n   * @param {Object} node\n   * @param {Array} nest\n   * @return {Array}\n   */\n  function addNode (node, nest) {\n    var obj = getHeadingObject(node)\n    var level = getHeadingLevel(node)\n    var array = nest\n    var lastItem = getLastItem(array)\n    var lastItemLevel = lastItem\n      ? lastItem.headingLevel\n      : 0\n    var counter = level - lastItemLevel\n\n    while (counter > 0) {\n      lastItem = getLastItem(array)\n      if (lastItem && lastItem.children !== undefined) {\n        array = lastItem.children\n      }\n      counter--\n    }\n\n    if (level >= options.collapseDepth) {\n      obj.isCollapsed = true\n    }\n\n    array.push(obj)\n    return array\n  }\n\n  /**\n   * Select headings in content area, exclude any selector in options.ignoreSelector\n   * @param {String} contentSelector\n   * @param {Array} headingSelector\n   * @return {Array}\n   */\n  function selectHeadings (contentSelector, headingSelector) {\n    var selectors = headingSelector\n    if (options.ignoreSelector) {\n      selectors = headingSelector.split(',')\n        .map(function mapSelectors (selector) {\n          return selector.trim() + ':not(' + options.ignoreSelector + ')'\n        })\n    }\n    try {\n      return document.querySelector(contentSelector)\n        .querySelectorAll(selectors)\n    } catch (e) {\n      console.warn('Element not found: ' + contentSelector); // eslint-disable-line\n      return null\n    }\n  }\n\n  /**\n   * Nest headings array into nested arrays with 'children' property.\n   * @param {Array} headingsArray\n   * @return {Object}\n   */\n  function nestHeadingsArray (headingsArray) {\n    return reduce.call(headingsArray, function reducer (prev, curr) {\n      var currentHeading = getHeadingObject(curr)\n\n      addNode(currentHeading, prev.nest)\n      return prev\n    }, {\n      nest: []\n    })\n  }\n\n  return {\n    nestHeadingsArray: nestHeadingsArray,\n    selectHeadings: selectHeadings\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9wYXJzZS1jb250ZW50LmpzPzg3ZjAiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGlzIGZpbGUgaXMgcmVzcG9uc2libGUgZm9yIHBhcnNpbmcgdGhlIGNvbnRlbnQgZnJvbSB0aGUgRE9NIGFuZCBtYWtpbmdcbiAqIHN1cmUgZGF0YSBpcyBuZXN0ZWQgcHJvcGVybHkuXG4gKlxuICogQGF1dGhvciBUaW0gU2NhbmxpblxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VDb250ZW50IChvcHRpb25zKSB7XG4gIHZhciByZWR1Y2UgPSBbXS5yZWR1Y2VcblxuICAvKipcbiAgICogR2V0IHRoZSBsYXN0IGl0ZW0gaW4gYW4gYXJyYXkgYW5kIHJldHVybiBhIHJlZmVyZW5jZSB0byBpdC5cbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0TGFzdEl0ZW0gKGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdXG4gIH1cblxuICAvKipcbiAgICogR2V0IGhlYWRpbmcgbGV2ZWwgZm9yIGEgaGVhZGluZyBkb20gbm9kZS5cbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaGVhZGluZ1xuICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRIZWFkaW5nTGV2ZWwgKGhlYWRpbmcpIHtcbiAgICByZXR1cm4gK2hlYWRpbmcubm9kZU5hbWUuc3BsaXQoJ0gnKS5qb2luKCcnKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpbXBvcnRhbnQgcHJvcGVydGllcyBmcm9tIGEgaGVhZGluZyBlbGVtZW50IGFuZCBzdG9yZSBpbiBhIHBsYWluIG9iamVjdC5cbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaGVhZGluZ1xuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRIZWFkaW5nT2JqZWN0IChoZWFkaW5nKSB7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGlkOiBoZWFkaW5nLmlkLFxuICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgbm9kZU5hbWU6IGhlYWRpbmcubm9kZU5hbWUsXG4gICAgICBoZWFkaW5nTGV2ZWw6IGdldEhlYWRpbmdMZXZlbChoZWFkaW5nKSxcbiAgICAgIHRleHRDb250ZW50OiBoZWFkaW5nLnRleHRDb250ZW50LnRyaW0oKVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmluY2x1ZGVIdG1sKSB7XG4gICAgICBvYmouY2hpbGROb2RlcyA9IGhlYWRpbmcuY2hpbGROb2Rlc1xuICAgIH1cblxuICAgIHJldHVybiBvYmpcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBub2RlIHRvIHRoZSBuZXN0ZWQgYXJyYXkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG4gICAqIEBwYXJhbSB7QXJyYXl9IG5lc3RcbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuICBmdW5jdGlvbiBhZGROb2RlIChub2RlLCBuZXN0KSB7XG4gICAgdmFyIG9iaiA9IGdldEhlYWRpbmdPYmplY3Qobm9kZSlcbiAgICB2YXIgbGV2ZWwgPSBnZXRIZWFkaW5nTGV2ZWwobm9kZSlcbiAgICB2YXIgYXJyYXkgPSBuZXN0XG4gICAgdmFyIGxhc3RJdGVtID0gZ2V0TGFzdEl0ZW0oYXJyYXkpXG4gICAgdmFyIGxhc3RJdGVtTGV2ZWwgPSBsYXN0SXRlbVxuICAgICAgPyBsYXN0SXRlbS5oZWFkaW5nTGV2ZWxcbiAgICAgIDogMFxuICAgIHZhciBjb3VudGVyID0gbGV2ZWwgLSBsYXN0SXRlbUxldmVsXG5cbiAgICB3aGlsZSAoY291bnRlciA+IDApIHtcbiAgICAgIGxhc3RJdGVtID0gZ2V0TGFzdEl0ZW0oYXJyYXkpXG4gICAgICBpZiAobGFzdEl0ZW0gJiYgbGFzdEl0ZW0uY2hpbGRyZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhcnJheSA9IGxhc3RJdGVtLmNoaWxkcmVuXG4gICAgICB9XG4gICAgICBjb3VudGVyLS1cbiAgICB9XG5cbiAgICBpZiAobGV2ZWwgPj0gb3B0aW9ucy5jb2xsYXBzZURlcHRoKSB7XG4gICAgICBvYmouaXNDb2xsYXBzZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgYXJyYXkucHVzaChvYmopXG4gICAgcmV0dXJuIGFycmF5XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGhlYWRpbmdzIGluIGNvbnRlbnQgYXJlYSwgZXhjbHVkZSBhbnkgc2VsZWN0b3IgaW4gb3B0aW9ucy5pZ25vcmVTZWxlY3RvclxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29udGVudFNlbGVjdG9yXG4gICAqIEBwYXJhbSB7QXJyYXl9IGhlYWRpbmdTZWxlY3RvclxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG4gIGZ1bmN0aW9uIHNlbGVjdEhlYWRpbmdzIChjb250ZW50U2VsZWN0b3IsIGhlYWRpbmdTZWxlY3Rvcikge1xuICAgIHZhciBzZWxlY3RvcnMgPSBoZWFkaW5nU2VsZWN0b3JcbiAgICBpZiAob3B0aW9ucy5pZ25vcmVTZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3JzID0gaGVhZGluZ1NlbGVjdG9yLnNwbGl0KCcsJylcbiAgICAgICAgLm1hcChmdW5jdGlvbiBtYXBTZWxlY3RvcnMgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbGVjdG9yLnRyaW0oKSArICc6bm90KCcgKyBvcHRpb25zLmlnbm9yZVNlbGVjdG9yICsgJyknXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250ZW50U2VsZWN0b3IpXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0VsZW1lbnQgbm90IGZvdW5kOiAnICsgY29udGVudFNlbGVjdG9yKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTmVzdCBoZWFkaW5ncyBhcnJheSBpbnRvIG5lc3RlZCBhcnJheXMgd2l0aCAnY2hpbGRyZW4nIHByb3BlcnR5LlxuICAgKiBAcGFyYW0ge0FycmF5fSBoZWFkaW5nc0FycmF5XG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGZ1bmN0aW9uIG5lc3RIZWFkaW5nc0FycmF5IChoZWFkaW5nc0FycmF5KSB7XG4gICAgcmV0dXJuIHJlZHVjZS5jYWxsKGhlYWRpbmdzQXJyYXksIGZ1bmN0aW9uIHJlZHVjZXIgKHByZXYsIGN1cnIpIHtcbiAgICAgIHZhciBjdXJyZW50SGVhZGluZyA9IGdldEhlYWRpbmdPYmplY3QoY3VycilcblxuICAgICAgYWRkTm9kZShjdXJyZW50SGVhZGluZywgcHJldi5uZXN0KVxuICAgICAgcmV0dXJuIHByZXZcbiAgICB9LCB7XG4gICAgICBuZXN0OiBbXVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5lc3RIZWFkaW5nc0FycmF5OiBuZXN0SGVhZGluZ3NBcnJheSxcbiAgICBzZWxlY3RIZWFkaW5nczogc2VsZWN0SGVhZGluZ3NcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvcGFyc2UtY29udGVudC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///4\n");

    /***/
  }),
  /* 5 */
  /*!***************************************!*\
    !*** ./src/js/scroll-smooth/index.js ***!
    \***************************************/
  /*! dynamic exports provided */
  /*! all exports used */
  /***/
  (function(module, exports) {

    eval("/* globals location, requestAnimationFrame */\n\nexports.initSmoothScrolling = initSmoothScrolling\n\nfunction initSmoothScrolling (options) {\n  if (isCssSmoothSCrollSupported()) { }\n\n  var duration = options.duration\n\n  var pageUrl = location.hash\n    ? stripHash(location.href)\n    : location.href\n\n  delegatedLinkHijacking()\n\n  function delegatedLinkHijacking () {\n    document.body.addEventListener('click', onClick, false)\n\n    function onClick (e) {\n      if (\n        !isInPageLink(e.target) ||\n        e.target.className.indexOf('no-smooth-scroll') > -1 ||\n        (e.target.href.charAt(e.target.href.length - 2) === '#' &&\n        e.target.href.charAt(e.target.href.length - 1) === '!') ||\n        e.target.className.indexOf(options.linkClass) === -1) {\n        return\n      }\n\n      // Don't prevent default or hash doesn't change.\n      // e.preventDefault()\n\n      jump(e.target.hash, {\n        duration: duration,\n        callback: function () {\n          setFocus(e.target.hash)\n        }\n      })\n    }\n  }\n\n  function isInPageLink (n) {\n    return n.tagName.toLowerCase() === 'a' &&\n      (n.hash.length > 0 || n.href.charAt(n.href.length - 1) === '#') &&\n      (stripHash(n.href) === pageUrl || stripHash(n.href) + '#' === pageUrl)\n  }\n\n  function stripHash (url) {\n    return url.slice(0, url.lastIndexOf('#'))\n  }\n\n  function isCssSmoothSCrollSupported () {\n    return 'scrollBehavior' in document.documentElement.style\n  }\n\n  // Adapted from:\n  // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/\n  function setFocus (hash) {\n    var element = document.getElementById(hash.substring(1))\n\n    if (element) {\n      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {\n        element.tabIndex = -1\n      }\n\n      element.focus()\n    }\n  }\n}\n\nfunction jump (target, options) {\n  var start = window.pageYOffset\n  var opt = {\n    duration: options.duration,\n    offset: options.offset || 0,\n    callback: options.callback,\n    easing: options.easing || easeInOutQuad\n  }\n  // This makes ids that start with a number work: ('[id=\"' + decodeURI(target).split('#').join('') + '\"]')\n  // DecodeURI for nonASCII hashes, they was encoded, but id was not encoded, it lead to not finding the tgt element by id.\n  // And this is for IE: document.body.scrollTop\n  var tgt = document.querySelector('[id=\"' + decodeURI(target).split('#').join('') + '\"]')\n  var distance = typeof target === 'string'\n    ? opt.offset + (\n      target\n      ? (tgt && tgt.getBoundingClientRect().top) || 0 // handle non-existent links better.\n      : -(document.documentElement.scrollTop || document.body.scrollTop))\n    : target\n  var duration = typeof opt.duration === 'function'\n    ? opt.duration(distance)\n    : opt.duration\n  var timeStart\n  var timeElapsed\n\n  requestAnimationFrame(function (time) { timeStart = time; loop(time) })\n  function loop (time) {\n    timeElapsed = time - timeStart\n\n    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration))\n\n    if (timeElapsed < duration) { requestAnimationFrame(loop) } else { end() }\n  }\n\n  function end () {\n    window.scrollTo(0, start + distance)\n\n    if (typeof opt.callback === 'function') { opt.callback() }\n  }\n\n  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/\n  function easeInOutQuad (t, b, c, d) {\n    t /= d / 2\n    if (t < 1) return c / 2 * t * t + b\n    t--\n    return -c / 2 * (t * (t - 2) - 1) + b\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9zY3JvbGwtc21vb3RoL2luZGV4LmpzP2EzMGUiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFscyBsb2NhdGlvbiwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lICovXG5cbmV4cG9ydHMuaW5pdFNtb290aFNjcm9sbGluZyA9IGluaXRTbW9vdGhTY3JvbGxpbmdcblxuZnVuY3Rpb24gaW5pdFNtb290aFNjcm9sbGluZyAob3B0aW9ucykge1xuICBpZiAoaXNDc3NTbW9vdGhTQ3JvbGxTdXBwb3J0ZWQoKSkgeyB9XG5cbiAgdmFyIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvblxuXG4gIHZhciBwYWdlVXJsID0gbG9jYXRpb24uaGFzaFxuICAgID8gc3RyaXBIYXNoKGxvY2F0aW9uLmhyZWYpXG4gICAgOiBsb2NhdGlvbi5ocmVmXG5cbiAgZGVsZWdhdGVkTGlua0hpamFja2luZygpXG5cbiAgZnVuY3Rpb24gZGVsZWdhdGVkTGlua0hpamFja2luZyAoKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2ssIGZhbHNlKVxuXG4gICAgZnVuY3Rpb24gb25DbGljayAoZSkge1xuICAgICAgaWYgKFxuICAgICAgICAhaXNJblBhZ2VMaW5rKGUudGFyZ2V0KSB8fFxuICAgICAgICBlLnRhcmdldC5jbGFzc05hbWUuaW5kZXhPZignbm8tc21vb3RoLXNjcm9sbCcpID4gLTEgfHxcbiAgICAgICAgKGUudGFyZ2V0LmhyZWYuY2hhckF0KGUudGFyZ2V0LmhyZWYubGVuZ3RoIC0gMikgPT09ICcjJyAmJlxuICAgICAgICBlLnRhcmdldC5ocmVmLmNoYXJBdChlLnRhcmdldC5ocmVmLmxlbmd0aCAtIDEpID09PSAnIScpIHx8XG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKG9wdGlvbnMubGlua0NsYXNzKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIERvbid0IHByZXZlbnQgZGVmYXVsdCBvciBoYXNoIGRvZXNuJ3QgY2hhbmdlLlxuICAgICAgLy8gZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGp1bXAoZS50YXJnZXQuaGFzaCwge1xuICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2V0Rm9jdXMoZS50YXJnZXQuaGFzaClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc0luUGFnZUxpbmsgKG4pIHtcbiAgICByZXR1cm4gbi50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJyAmJlxuICAgICAgKG4uaGFzaC5sZW5ndGggPiAwIHx8IG4uaHJlZi5jaGFyQXQobi5ocmVmLmxlbmd0aCAtIDEpID09PSAnIycpICYmXG4gICAgICAoc3RyaXBIYXNoKG4uaHJlZikgPT09IHBhZ2VVcmwgfHwgc3RyaXBIYXNoKG4uaHJlZikgKyAnIycgPT09IHBhZ2VVcmwpXG4gIH1cblxuICBmdW5jdGlvbiBzdHJpcEhhc2ggKHVybCkge1xuICAgIHJldHVybiB1cmwuc2xpY2UoMCwgdXJsLmxhc3RJbmRleE9mKCcjJykpXG4gIH1cblxuICBmdW5jdGlvbiBpc0Nzc1Ntb290aFNDcm9sbFN1cHBvcnRlZCAoKSB7XG4gICAgcmV0dXJuICdzY3JvbGxCZWhhdmlvcicgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlXG4gIH1cblxuICAvLyBBZGFwdGVkIGZyb206XG4gIC8vIGh0dHBzOi8vd3d3Lm5jem9ubGluZS5uZXQvYmxvZy8yMDEzLzAxLzE1L2ZpeGluZy1za2lwLXRvLWNvbnRlbnQtbGlua3MvXG4gIGZ1bmN0aW9uIHNldEZvY3VzIChoYXNoKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoLnN1YnN0cmluZygxKSlcblxuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBpZiAoIS9eKD86YXxzZWxlY3R8aW5wdXR8YnV0dG9ufHRleHRhcmVhKSQvaS50ZXN0KGVsZW1lbnQudGFnTmFtZSkpIHtcbiAgICAgICAgZWxlbWVudC50YWJJbmRleCA9IC0xXG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQuZm9jdXMoKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBqdW1wICh0YXJnZXQsIG9wdGlvbnMpIHtcbiAgdmFyIHN0YXJ0ID0gd2luZG93LnBhZ2VZT2Zmc2V0XG4gIHZhciBvcHQgPSB7XG4gICAgZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXG4gICAgb2Zmc2V0OiBvcHRpb25zLm9mZnNldCB8fCAwLFxuICAgIGNhbGxiYWNrOiBvcHRpb25zLmNhbGxiYWNrLFxuICAgIGVhc2luZzogb3B0aW9ucy5lYXNpbmcgfHwgZWFzZUluT3V0UXVhZFxuICB9XG4gIC8vIFRoaXMgbWFrZXMgaWRzIHRoYXQgc3RhcnQgd2l0aCBhIG51bWJlciB3b3JrOiAoJ1tpZD1cIicgKyBkZWNvZGVVUkkodGFyZ2V0KS5zcGxpdCgnIycpLmpvaW4oJycpICsgJ1wiXScpXG4gIC8vIERlY29kZVVSSSBmb3Igbm9uQVNDSUkgaGFzaGVzLCB0aGV5IHdhcyBlbmNvZGVkLCBidXQgaWQgd2FzIG5vdCBlbmNvZGVkLCBpdCBsZWFkIHRvIG5vdCBmaW5kaW5nIHRoZSB0Z3QgZWxlbWVudCBieSBpZC5cbiAgLy8gQW5kIHRoaXMgaXMgZm9yIElFOiBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcFxuICB2YXIgdGd0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2lkPVwiJyArIGRlY29kZVVSSSh0YXJnZXQpLnNwbGl0KCcjJykuam9pbignJykgKyAnXCJdJylcbiAgdmFyIGRpc3RhbmNlID0gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZydcbiAgICA/IG9wdC5vZmZzZXQgKyAoXG4gICAgICB0YXJnZXRcbiAgICAgID8gKHRndCAmJiB0Z3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKSB8fCAwIC8vIGhhbmRsZSBub24tZXhpc3RlbnQgbGlua3MgYmV0dGVyLlxuICAgICAgOiAtKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApKVxuICAgIDogdGFyZ2V0XG4gIHZhciBkdXJhdGlvbiA9IHR5cGVvZiBvcHQuZHVyYXRpb24gPT09ICdmdW5jdGlvbidcbiAgICA/IG9wdC5kdXJhdGlvbihkaXN0YW5jZSlcbiAgICA6IG9wdC5kdXJhdGlvblxuICB2YXIgdGltZVN0YXJ0XG4gIHZhciB0aW1lRWxhcHNlZFxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAodGltZSkgeyB0aW1lU3RhcnQgPSB0aW1lOyBsb29wKHRpbWUpIH0pXG4gIGZ1bmN0aW9uIGxvb3AgKHRpbWUpIHtcbiAgICB0aW1lRWxhcHNlZCA9IHRpbWUgLSB0aW1lU3RhcnRcblxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCBvcHQuZWFzaW5nKHRpbWVFbGFwc2VkLCBzdGFydCwgZGlzdGFuY2UsIGR1cmF0aW9uKSlcblxuICAgIGlmICh0aW1lRWxhcHNlZCA8IGR1cmF0aW9uKSB7IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKSB9IGVsc2UgeyBlbmQoKSB9XG4gIH1cblxuICBmdW5jdGlvbiBlbmQgKCkge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzdGFydCArIGRpc3RhbmNlKVxuXG4gICAgaWYgKHR5cGVvZiBvcHQuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHsgb3B0LmNhbGxiYWNrKCkgfVxuICB9XG5cbiAgLy8gUm9iZXJ0IFBlbm5lcidzIGVhc2VJbk91dFF1YWQgLSBodHRwOi8vcm9iZXJ0cGVubmVyLmNvbS9lYXNpbmcvXG4gIGZ1bmN0aW9uIGVhc2VJbk91dFF1YWQgKHQsIGIsIGMsIGQpIHtcbiAgICB0IC89IGQgLyAyXG4gICAgaWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGJcbiAgICB0LS1cbiAgICByZXR1cm4gLWMgLyAyICogKHQgKiAodCAtIDIpIC0gMSkgKyBiXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL3Njcm9sbC1zbW9vdGgvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///5\n");

    /***/
  })
  /******/
]);

//Generate IDs for headings and persons
//#####################################################################################################################
//#####################################################################################################################
//#####################################################################################################################

var headings = document.querySelectorAll('.department');
var persons = document.querySelectorAll('.person');

function generateID(length) {
  var text = ""
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

[].forEach.call(headings, function(e) {
  e.setAttribute('id', generateID(24));
});

[].forEach.call(persons, function(e) {
  e.setAttribute('id', generateID(24));
});

//Tocbot init
//#####################################################################################################################
//#####################################################################################################################
//#####################################################################################################################

tocbot.init({
  // Where to render the table of contents.
  tocSelector: '.departments',
  // Where to grab the headings to build the table of contents.
  contentSelector: '.employees',
  // Which headings to grab inside of the contentSelector element.
  headingSelector: 'h3',
  // Main class to add to lists.
  listClass: 'departments__list',
  // Class to add to list items.
  listItemClass: 'departments__item',
  // Smooth scrolling enabled.
  scrollSmooth: true,
  // Class to add to active list items.
  activeListItemClass: 'departments__item--active',
});

//scroll-into-view
//https://github.com/korynunn/scroll-into-view/
//#####################################################################################################################
//#####################################################################################################################
//#####################################################################################################################

(function() {
  function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f
        }
        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n ? n : e)
        }, l, l.exports, e, t, n, r)
      }
      return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
  }
  return e
})()({
  1: [function(require, module, exports) {
    var COMPLETE = "complete",
      CANCELED = "canceled";

    function raf(e) {
      if ("requestAnimationFrame" in window) return window.requestAnimationFrame(e);
      setTimeout(e, 16)
    }

    function setElementScroll(e, t, n) {
      e.self === e ? e.scrollTo(t, n) : (e.scrollLeft = t, e.scrollTop = n)
    }

    function getTargetScrollLocation(e, t, n) {
      var l, i, r, a, o, s, f, c = e.getBoundingClientRect(),
        u = n && null != n.left ? n.left : .5,
        d = n && null != n.top ? n.top : .5,
        m = n && null != n.leftOffset ? n.leftOffset : 0,
        g = n && null != n.topOffset ? n.topOffset : 0,
        h = u,
        p = d;
      if (t.self === t) s = Math.min(c.width, t.innerWidth), f = Math.min(c.height, t.innerHeight), i = c.left + t.pageXOffset - t.innerWidth * h + s * h, r = c.top + t.pageYOffset - t.innerHeight * p + f * p, r -= g, a = (i -= m) - t.pageXOffset, o = r - t.pageYOffset;
      else {
        s = c.width, f = c.height, l = t.getBoundingClientRect();
        var E = c.left - (l.left - t.scrollLeft),
          S = c.top - (l.top - t.scrollTop);
        i = E + s * h - t.clientWidth * h, r = S + f * p - t.clientHeight * p, i = Math.max(Math.min(i, t.scrollWidth - t.clientWidth), 0), r = Math.max(Math.min(r, t.scrollHeight - t.clientHeight), 0), r -= g, a = (i -= m) - t.scrollLeft, o = r - t.scrollTop
      }
      return {
        x: i,
        y: r,
        differenceX: a,
        differenceY: o
      }
    }

    function animate(e) {
      var t = e._scrollSettings;
      if (t) {
        var n = getTargetScrollLocation(t.target, e, t.align),
          l = Date.now() - t.startTime,
          i = Math.min(1 / t.time * l, 1);
        if (l > t.time && t.endIterations > 3) return setElementScroll(e, n.x, n.y), e._scrollSettings = null, t.end(COMPLETE);
        t.endIterations++;
        var r = 1 - t.ease(i);
        if (setElementScroll(e, n.x - n.differenceX * r, n.y - n.differenceY * r), l >= t.time) return animate(e);
        raf(animate.bind(null, e))
      }
    }

    function transitionScrollTo(e, t, n, l) {
      var i, r = !t._scrollSettings,
        a = t._scrollSettings,
        o = Date.now();

      function s(e) {
        t._scrollSettings = null, t.parentElement && t.parentElement._scrollSettings && t.parentElement._scrollSettings.end(e), l(e), t.removeEventListener("touchstart", i, {
          passive: !0
        })
      }
      a && a.end(CANCELED), t._scrollSettings = {
        startTime: a ? a.startTime : Date.now(),
        endIterations: 0,
        target: e,
        time: n.time + (a ? o - a.startTime : 0),
        ease: n.ease,
        align: n.align,
        end: s
      }, i = s.bind(null, CANCELED), t.addEventListener("touchstart", i, {
        passive: !0
      }), r && animate(t)
    }

    function defaultIsScrollable(e) {
      return "pageXOffset" in e || (e.scrollHeight !== e.clientHeight || e.scrollWidth !== e.clientWidth) && "hidden" !== getComputedStyle(e).overflow
    }

    function defaultValidTarget() {
      return !0
    }
    module.exports = function(e, t, n) {
      if (e) {
        "function" == typeof t && (n = t, t = null), t || (t = {}), t.time = isNaN(t.time) ? 1e3 : t.time, t.ease = t.ease || function(e) {
          return 1 - Math.pow(1 - e, e / 2)
        };
        for (var l = e.parentElement, i = 0, r = t.validTarget || defaultValidTarget, a = t.isScrollable; l;) {
          if (r(l, i) && (a ? a(l, defaultIsScrollable) : defaultIsScrollable(l)) && (i++, transitionScrollTo(e, l, t, o)), !(l = l.parentElement)) return;
          "BODY" === l.tagName && (l = (l = l.ownerDocument).defaultView || l.ownerWindow)
        }
      }

      function o(e) {
        --i || n && n(e)
      }
    };

  }, {}],
  2: [function(require, module, exports) {
    window.scrollIntoView = require("./scrollIntoView");

  }, {
    "./scrollIntoView": 1
  }]
}, {}, [2]);

//Search
//Based on: https://blog.codecentric.de/en/2013/11/javascript-search-text-html-page/
//#####################################################################################################################
//#####################################################################################################################
//#####################################################################################################################

function removeClassFromNodes(elementsArray, removedClass) {
  for (var i = 0; i < elementsArray.length; i++) {
    elementsArray[i].classList.remove(removedClass);
  };
};

function searchScroll(element) {
  scrollIntoView(element, {
    time: 500,
    align: {
      top: 0,
      left: 0
    },
  });
  removeClassFromNodes(document.querySelectorAll('.search-highlight'), 'search-highlight')
  element.classList.add('search-highlight');
}

function search(searchFormID, searchClass) {
  var name = document.getElementById(searchFormID).querySelector('.search__input').value;
  var pattern = name.toLowerCase();
  var targetId = "";
  var searched = document.getElementsByClassName(searchClass);

  for (var i = 0; i < searched.length; i++) {
    var index = searched[i].innerHTML.toLowerCase().indexOf(pattern);
    if (!name) {
      removeClassFromNodes(document.querySelectorAll('.search-highlight'), 'search-highlight')
    }
    if (index != -1 && name) {
      targetId = '#' + searched[i].id;
      searchScroll(document.querySelector(targetId));
      break;
    }
  }
}

document.querySelector('#searchDepartment .search__input').addEventListener('input', function(e) {
  search('searchDepartment', 'department');
});

document.querySelector('#searchPerson .search__input').addEventListener('input', function(e) {
  search('searchPerson', 'person');
});