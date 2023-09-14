// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/database.json":[function(require,module,exports) {
module.exports = {
  "products": {
    "001": {
      "name": "Cola",
      "price": 45
    },
    "002": {
      "name": "Royal",
      "price": 50
    },
    "003": {
      "name": "Sprite",
      "price": 55
    },
    "004": {
      "name": "Fanta",
      "price": 60
    },
    "005": {
      "name": "Lemon Tea",
      "price": 35
    }
  }
};
},{}],"src/MathHelper/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var multiply = function multiply(num1, num2) {
  var baseNum = 0;
  var s1 = num1.toString();
  var s2 = num2.toString();
  baseNum += getBaseNum(num1);
  baseNum += getBaseNum(num2);
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, baseNum);
};
var divide = function divide(num1, num2) {
  var baseNum1 = getBaseNum(num1);
  var baseNum2 = getBaseNum(num2);
  var baseNum = Math.max(baseNum1, baseNum2);
  var factor = Math.pow(10, baseNum);
  return num1 * factor / (num2 * factor);
};
var plus = function plus(num1, num2) {
  var baseNum1 = getBaseNum(num1);
  var baseNum2 = getBaseNum(num2);
  var baseNum = Math.max(baseNum1, baseNum2);
  var factor = Math.pow(10, baseNum);
  return (num1 * factor + num2 * factor) / factor;
};
var minus = function minus(num1, num2) {
  var baseNum1 = getBaseNum(num1);
  var baseNum2 = getBaseNum(num2);
  var baseNum = Math.max(baseNum1, baseNum2);
  var factor = Math.pow(10, baseNum);
  return (num1 * factor - num2 * factor) / factor;
};
var getBaseNum = function getBaseNum(num) {
  return (num.toString().split('.')[1] || '').length;
};
var _default = {
  plus: plus,
  minus: minus,
  multiply: multiply,
  divide: divide
};
exports.default = _default;
},{}],"src/checkout/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeItemFromProductMap = exports.getPromotionPatternTwoAction = exports.getPromotionPatternOneAction = exports.getProducts = exports.getProductIDsMap = exports.defaultAction = exports.checkout = void 0;
var _database = _interopRequireDefault(require("../database.json"));
var _MathHelper = _interopRequireDefault(require("../MathHelper"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var checkout = function checkout() {
  var productIDs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  try {
    if (productIDs.length === 0) return 0;
    // get this checkout's product data from database
    var products = getProducts(productIDs);
    var promotions = getPromotions();
    // sort products ids into map structure
    var productMap = getProductIDsMap(productIDs, products);
    var totalPrice = 0;
    // calculate each promotion's price, and remove used product Id in map
    var _iterator = _createForOfIteratorHelper(promotions),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var promotion = _step.value;
        var result = promotion.action(productMap, totalPrice);
        productMap = result.productMap;
        totalPrice = result.totalPrice;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return totalPrice;
  } catch (error) {
    // should log this error in production environment
    throw error;
  }
};
exports.checkout = checkout;
var getProductIDsMap = function getProductIDsMap(productIDs, products) {
  var map = new Map();
  var _iterator2 = _createForOfIteratorHelper(productIDs),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var id = _step2.value;
      if (!map.has(id)) {
        map.set(id, {
          count: 1,
          price: products[id].price
        });
        continue;
      }
      var item = map.get(id);
      map.set(id, {
        count: ++item.count,
        price: item.price
      });
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return map;
};

// simulate of select needed products in database
exports.getProductIDsMap = getProductIDsMap;
var getProducts = function getProducts() {
  var productIDs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // all products from db
  var allProducts = _database.default.products;
  var result = {};
  var _iterator3 = _createForOfIteratorHelper(productIDs),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var id = _step3.value;
      var product = allProducts[id];
      if (!product) throw new Error("product ID: ".concat(id, " not found."));
      result[id] = product;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return result;
};
exports.getProducts = getProducts;
var Promotion = /*#__PURE__*/_createClass(function Promotion(name, action) {
  _classCallCheck(this, Promotion);
  this.name = name;
  this.action = action;
});
var getPromotions = function getPromotions() {
  return [
  // can add new promotion here
  new Promotion('Buy one item at full price, and get the second one at a 50% discount', getPromotionPatternOneAction(2, 0.5)), new Promotion('Every three items form a group, and there is a $5 discount on each item', getPromotionPatternTwoAction(3, 5)), new Promotion('default', defaultAction)];
};

// sum remain products' price
var defaultAction = function defaultAction(productMap, totalPrice) {
  var _iterator4 = _createForOfIteratorHelper(productMap.values()),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var item = _step4.value;
      totalPrice += item.count * item.price;
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return {
    productMap: new Map(),
    totalPrice: totalPrice
  };
};

// promotion 1
// buy N item, and get M % discount of total ratio
exports.defaultAction = defaultAction;
var getPromotionPatternOneAction = function getPromotionPatternOneAction(buyCount, discountRatio) {
  return function (productMap, totalPrice) {
    var _iterator5 = _createForOfIteratorHelper(productMap),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _step5$value = _slicedToArray(_step5.value, 2),
          key = _step5$value[0],
          item = _step5$value[1];
        while (item.count >= buyCount) {
          totalPrice = _MathHelper.default.plus(totalPrice, _MathHelper.default.multiply(item.price, _MathHelper.default.minus(buyCount, discountRatio)));
          item.count -= buyCount;
          if (item.count === 0) productMap.delete(key);
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    return {
      productMap: productMap,
      totalPrice: totalPrice
    };
  };
};

// promotion 2
// N item form a group, and there is $ M on each item
exports.getPromotionPatternOneAction = getPromotionPatternOneAction;
var getPromotionPatternTwoAction = function getPromotionPatternTwoAction(buyCount, discount) {
  return function (productMap, totalPrice) {
    var recorder = [];
    var _iterator6 = _createForOfIteratorHelper(productMap.keys()),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var key = _step6.value;
        recorder.push(key);
        if (recorder.length === buyCount) {
          totalPrice = _MathHelper.default.plus(totalPrice, recorder.reduce(function (prev, id) {
            var discountedPrice = _MathHelper.default.minus(productMap.get(id).price, discount);
            return _MathHelper.default.plus(prev, discountedPrice);
          }, 0));
          productMap = removeItemFromProductMap(productMap, recorder);
          recorder = [];
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    return {
      productMap: productMap,
      totalPrice: totalPrice
    };
  };
};
exports.getPromotionPatternTwoAction = getPromotionPatternTwoAction;
var removeItemFromProductMap = function removeItemFromProductMap(productMap, productIDs) {
  var _iterator7 = _createForOfIteratorHelper(productIDs),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var id = _step7.value;
      var item = productMap.get(id);
      item.count--;
      if (item.count === 0) productMap.delete(id);
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  return productMap;
};
exports.removeItemFromProductMap = removeItemFromProductMap;
},{"../database.json":"src/database.json","../MathHelper":"src/MathHelper/index.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _checkout = require("./checkout");
var render = function render() {
  var content;
  try {
    var price = (0, _checkout.checkout)(["003", "002", "003", "003", "004"]);
    content = "Your price is $".concat(price);
  } catch (error) {
    content = 'Something went wrong, Please contact customer service.';
    console.error(error);
  }
  document.getElementById("app").innerHTML = content;
};
render();
},{"./checkout":"src/checkout/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "10223" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map