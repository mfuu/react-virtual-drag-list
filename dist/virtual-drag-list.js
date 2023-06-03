/*!
 * react-virtual-drag-list v2.5.0
 * open source under the MIT license
 * https://github.com/mfuu/react-virtual-drag-list#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global.VirtualDragList = factory(global.React));
}(this, (function (React) { 'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;

  function _regeneratorRuntime() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

    _regeneratorRuntime = function () {
      return exports;
    };

    var exports = {},
        Op = Object.prototype,
        hasOwn = Op.hasOwnProperty,
        $Symbol = "function" == typeof Symbol ? Symbol : {},
        iteratorSymbol = $Symbol.iterator || "@@iterator",
        asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
        toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }

    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
          generator = Object.create(protoGenerator.prototype),
          context = new Context(tryLocsList || []);
      return generator._invoke = function (innerFn, self, context) {
        var state = "suspendedStart";
        return function (method, arg) {
          if ("executing" === state) throw new Error("Generator is already running");

          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }

          for (context.method = method, context.arg = arg;;) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
              if ("suspendedStart" === state) throw state = "completed", context.arg;
              context.dispatchException(context.arg);
            } else "return" === context.method && context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);

            if ("normal" === record.type) {
              if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
              return {
                value: record.arg,
                done: context.done
              };
            }

            "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
          }
        };
      }(innerFn, self, context), generator;
    }

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    exports.wrap = wrap;
    var ContinueSentinel = {};

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {}

    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
        NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if ("throw" !== record.type) {
          var result = record.arg,
              value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }

        reject(record.arg);
      }

      var previousPromise;

      this._invoke = function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      };
    }

    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (undefined === method) {
        if (context.delegate = null, "throw" === context.method) {
          if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
          context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }

    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

            return next.value = undefined, next.done = !0, next;
          };

          return next.next = next;
        }
      }

      return {
        next: doneResult
      };
    }

    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }

    return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (object) {
      var keys = [];

      for (var key in object) keys.push(key);

      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }

        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;

        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
              record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
                hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        }

        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function debounce(fn) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var timer;
    var result;

    var debounced = function debounced() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (timer) clearTimeout(timer);

      if (immediate) {
        var callNow = !timer;
        timer = setTimeout(function () {
          timer = null;
        }, delay);
        if (callNow) result = fn.apply(this, args);
      } else {
        timer = setTimeout(function () {
          fn.apply(_this, args);
        }, delay);
      }

      return result;
    };

    debounced.prototype.cancel = function () {
      clearTimeout(timer);
      timer = null;
    };

    return debounced;
  }
  function getDataKey(item, dataKey) {
    return (!Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey).reduce(function (o, k) {
      return (o || {})[k];
    }, item);
  }

  var CACLTYPE = {
    INIT: 'INIT',
    FIXED: 'FIXED',
    DYNAMIC: 'DYNAMIC'
  };
  var DIRECTION = {
    FRONT: 'FRONT',
    BEHIND: 'BEHIND'
  };
  var LEADING_BUFFER = 2;

  var Virtual = /*#__PURE__*/function () {
    function Virtual(options, callback) {
      _classCallCheck(this, Virtual);

      this.options = Object.assign({}, options);
      this.callback = callback;
      this.sizes = new Map();
      this.calcIndex = 0;
      this.calcType = CACLTYPE.INIT;
      this.calcSize = Object.create(null);
      this.direction = '';
      this.offset = 0;
      this.range = Object.create(null);
      if (options) this.checkIfUpdate(0, options.keeps - 1);
    }

    _createClass(Virtual, [{
      key: "updateUniqueKeys",
      value: function updateUniqueKeys(value) {
        this.options.uniqueKeys = value;
      }
    }, {
      key: "updateSizes",
      value: function updateSizes(uniqueKeys) {
        var _this = this;

        this.sizes.forEach(function (v, k) {
          if (!uniqueKeys.includes(k)) _this.sizes["delete"](k);
        });
      }
    }, {
      key: "updateRange",
      value: function updateRange() {
        var _this2 = this;

        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        if (n > 10) return; // check if need to update until loaded enough list item

        var start = this.range.start;

        if (this.isFront()) {
          start -= LEADING_BUFFER;
        } else if (this.isBehind()) {
          start += LEADING_BUFFER;
        }

        start = Math.max(start, 0);
        var length = Math.min(this.options.keeps, this.options.uniqueKeys.length);

        if (this.sizes.size >= length - LEADING_BUFFER) {
          this.handleUpdate(start, this.getEndByStart(start));
        } else {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(function () {
              return _this2.updateRange(n++);
            });
          } else {
            setTimeout(function () {
              return _this2.updateRange(n++);
            }, 3);
          }
        }
      }
    }, {
      key: "handleScroll",
      value: function handleScroll(offset) {
        this.direction = offset < this.offset ? DIRECTION.FRONT : DIRECTION.BEHIND;
        this.offset = offset;
        var scrolls = this.getScrollItems(offset);

        if (this.isFront()) {
          this.handleScrollFront(scrolls);
        } else if (this.isBehind()) {
          this.handleScrollBehind(scrolls);
        }
      }
    }, {
      key: "isFront",
      value: function isFront() {
        return this.direction === DIRECTION.FRONT;
      }
    }, {
      key: "isBehind",
      value: function isBehind() {
        return this.direction === DIRECTION.BEHIND;
      }
    }, {
      key: "isFixed",
      value: function isFixed() {
        return this.calcType === CACLTYPE.FIXED;
      }
    }, {
      key: "getScrollItems",
      value: function getScrollItems(offset) {
        var _this$calcSize = this.calcSize,
            fixed = _this$calcSize.fixed,
            header = _this$calcSize.header;
        if (header) offset -= header;
        if (offset <= 0) return 0;
        if (this.isFixed()) return Math.floor(offset / fixed);
        var low = 0,
            high = this.options.uniqueKeys.length;
        var middle = 0,
            middleOffset = 0;

        while (low <= high) {
          middle = low + Math.floor((high - low) / 2);
          middleOffset = this.getOffsetByIndex(middle);
          if (middleOffset === offset) return middle;else if (middleOffset < offset) low = middle + 1;else if (middleOffset > offset) high = middle - 1;
        }

        return low > 0 ? --low : 0;
      }
    }, {
      key: "handleScrollFront",
      value: function handleScrollFront(scrolls) {
        if (scrolls > this.range.start) return;
        var start = Math.max(scrolls - Math.round(this.options.keeps / 3), 0);
        this.checkIfUpdate(start, this.getEndByStart(start));
      }
    }, {
      key: "handleScrollBehind",
      value: function handleScrollBehind(scrolls) {
        if (scrolls < this.range.start + Math.round(this.options.keeps / 3)) return;
        this.checkIfUpdate(scrolls, this.getEndByStart(scrolls));
      }
    }, {
      key: "checkIfUpdate",
      value: function checkIfUpdate(start, end) {
        var _this$options = this.options,
            uniqueKeys = _this$options.uniqueKeys,
            keeps = _this$options.keeps;

        if (uniqueKeys.length && uniqueKeys.length <= keeps) {
          start = 0;
          end = uniqueKeys.length - 1;
        } else if (end - start < keeps - 1) {
          start = end - keeps + 1;
        }

        if (this.range.start !== start) this.handleUpdate(start, end);
      }
    }, {
      key: "handleUpdate",
      value: function handleUpdate(start, end) {
        this.range.start = start;
        this.range.end = end;
        this.range.front = this.getFrontOffset();
        this.range.behind = this.getBehindOffset();
        this.callback(Object.assign({}, this.range));
      }
    }, {
      key: "getFrontOffset",
      value: function getFrontOffset() {
        if (this.isFixed()) {
          return this.calcSize.fixed * this.range.start;
        } else {
          return this.getOffsetByIndex(this.range.start);
        }
      }
    }, {
      key: "getBehindOffset",
      value: function getBehindOffset() {
        var last = this.getLastIndex();

        if (this.isFixed()) {
          return (last - this.range.end) * this.calcSize.fixed;
        }

        if (this.calcIndex === last) {
          return this.getOffsetByIndex(last) - this.getOffsetByIndex(this.range.end);
        }

        return (last - this.range.end) * this.getItemSize();
      }
    }, {
      key: "getOffsetByIndex",
      value: function getOffsetByIndex(index) {
        if (!index) return 0;
        var offset = 0;

        for (var i = 0; i < index; i++) {
          var size = this.sizes.get(this.options.uniqueKeys[i]);
          offset = offset + (typeof size === 'number' ? size : this.getItemSize());
        }

        this.calcIndex = Math.max(this.calcIndex, index - 1);
        this.calcIndex = Math.min(this.calcIndex, this.getLastIndex());
        return offset;
      }
    }, {
      key: "getEndByStart",
      value: function getEndByStart(start) {
        return Math.min(start + this.options.keeps - 1, this.getLastIndex());
      }
    }, {
      key: "getLastIndex",
      value: function getLastIndex() {
        var _this$options2 = this.options,
            uniqueKeys = _this$options2.uniqueKeys,
            keeps = _this$options2.keeps;
        return uniqueKeys.length > 0 ? uniqueKeys.length - 1 : keeps - 1;
      }
    }, {
      key: "getItemSize",
      value: function getItemSize() {
        return this.isFixed() ? this.calcSize.fixed : this.calcSize.average || this.options.size;
      }
    }, {
      key: "handleItemSizeChange",
      value: function handleItemSizeChange(key, size) {
        this.sizes.set(key, size);

        if (this.calcType === CACLTYPE.INIT) {
          this.calcType = CACLTYPE.FIXED;
          this.calcSize.fixed = size;
        } else if (this.isFixed() && this.calcSize.fixed !== size) {
          this.calcType = CACLTYPE.DYNAMIC;
          this.calcSize.fixed = 0;
        }

        if (this.calcType !== CACLTYPE.FIXED) {
          this.calcSize.total = _toConsumableArray(this.sizes.values()).reduce(function (t, i) {
            return t + i;
          }, 0);
          this.calcSize.average = Math.round(this.calcSize.total / this.sizes.size);
        }
      }
    }, {
      key: "handleSlotSizeChange",
      value: function handleSlotSizeChange(key, size) {
        this.calcSize[key] = size;
      }
    }]);

    return Virtual;
  }();

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var sortableDnd_min = createCommonjsModule(function (module, exports) {
    !function (t, e) {
       module.exports = e() ;
    }(commonjsGlobal, function () {

      function Y(e, t) {
        var n,
            o = Object.keys(e);
        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(e), t && (n = n.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), o.push.apply(o, n)), o;
      }

      function l(o) {
        for (var t = 1; t < arguments.length; t++) {
          var i = null != arguments[t] ? arguments[t] : {};
          t % 2 ? Y(Object(i), !0).forEach(function (t) {
            var e, n;
            e = o, n = i[t = t], (t = function (t) {
              t = function (t, e) {
                if ("object" != typeof t || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 === n) return ("string" === e ? String : Number)(t);
                n = n.call(t, e || "default");
                if ("object" != typeof n) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.");
              }(t, "string");

              return "symbol" == typeof t ? t : String(t);
            }(t)) in e ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            }) : e[t] = n;
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i)) : Y(Object(i)).forEach(function (t) {
            Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(i, t));
          });
        }

        return o;
      }

      function R(t) {
        return (R = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
          return typeof t;
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        })(t);
      }

      var F = {
        capture: !1,
        passive: !1
      },
          H = /\s+/g,
          c = {
        start: ["touchstart", "mousedown"],
        move: ["touchmove", "mousemove"],
        end: ["touchend", "touchcancel", "mouseup"]
      };

      function t(t) {
        if ("undefined" != typeof window && window.navigator) return !!navigator.userAgent.match(t);
      }

      var e,
          d = t(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
          L = t(/Edge/i),
          a = t(/safari/i) && !t(/chrome/i) && !t(/android/i),
          k = (e = !1, document.addEventListener("checkIfSupportPassive", null, {
        get passive() {
          return e = !0;
        }

      }), e),
          u = "undefined" == typeof window || "undefined" == typeof document ? "" : (o = window.getComputedStyle(document.documentElement, "") || ["-moz-hidden-iframe"], "ms" !== (o = (Array.prototype.slice.call(o).join("").match(/-(moz|webkit|ms)-/) || "" === o.OLink && ["", "o"])[1]) ? o && o.length ? o[0].toUpperCase() + o.substr(1) : "" : "ms");

      function i(t, e) {
        t.style["".concat(u, "TransitionDuration")] = null == e ? "" : "".concat(e, "ms");
      }

      function h(t, e) {
        t.style["".concat(u, "Transform")] = e ? "".concat(e) : "";
      }

      function p(t, e, n) {
        window.addEventListener ? t.addEventListener(e, n, !(!k && d) && F) : window.attachEvent && t.attachEvent("on" + e, n);
      }

      function n(t, e, n) {
        window.removeEventListener ? t.removeEventListener(e, n, !(!k && d) && F) : window.detachEvent && t.detachEvent("on" + e, n);
      }

      function I(t) {
        var e = t,
            n = t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0],
            t = n ? document.elementFromPoint(n.clientX, n.clientY) : t.target;
        return !n || "clientX" in e || (e.clientX = n.clientX, e.clientY = n.clientY, e.pageX = n.pageX, e.pageY = n.pageY, e.screenX = n.screenX, e.screenY = n.screenY), {
          touch: n,
          event: e,
          target: t
        };
      }

      function f(t, e) {
        for (var n = {
          top: 0,
          left: 0,
          height: t.offsetHeight,
          width: t.offsetWidth
        }; n.top += t.offsetTop, n.left += t.offsetLeft, (t = t.parentNode) && t !== e;);

        return n;
      }

      function m() {
        var t = document.scrollingElement;
        return t || document.documentElement;
      }

      function g(t) {
        var e,
            n,
            o,
            i,
            r,
            a,
            s,
            l = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
            c = 2 < arguments.length ? arguments[2] : void 0;

        if (t.getBoundingClientRect || t === window) {
          if (t !== window && t.parentNode && t !== m()) {
            if (n = (e = t.getBoundingClientRect()).top, o = e.left, i = e.bottom, r = e.right, a = e.height, s = e.width, l.parent && t.parentNode !== t.ownerDocument.body) for (var u, h = t.parentNode; h && h.getBoundingClientRect && h !== t.ownerDocument.body;) {
              if ((u = h.getBoundingClientRect()).height < a) return n = u.top, o = u.left, i = u.bottom, r = u.right, a = u.height, {
                top: n,
                left: o,
                bottom: i,
                right: r,
                width: s = u.width,
                height: a
              };
              h = h.parentNode;
            }
          } else o = n = 0, i = window.innerHeight, r = window.innerWidth, a = window.innerHeight, s = window.innerWidth;

          if ((l.block || l.relative) && t !== window && (c = c || t.parentNode, !d)) do {
            if (c && c.getBoundingClientRect && ("none" !== v(c, "transform") || l.relative && "static" !== v(c, "position"))) {
              var p = c.getBoundingClientRect();
              n -= p.top + parseInt(v(c, "border-top-width")), o -= p.left + parseInt(v(c, "border-left-width")), i = n + e.height, r = o + e.width;
              break;
            }
          } while (c = c.parentNode);
          return {
            top: n,
            left: o,
            bottom: i,
            right: r,
            width: s,
            height: a
          };
        }
      }

      function W(t, e, n, o) {
        if (t) {
          n = n || document;

          do {
            if (null == e) {
              var i = Array.prototype.slice.call(n.children),
                  r = i.indexOf(t);
              if (-1 < r) return i[r];

              for (var a = 0; a < i.length; a++) if (z(t, i[a])) return i[a];
            } else if ((">" !== e[0] || t.parentNode === n) && V(t, e) || o && t === n) return t;
          } while (t = t.parentNode);
        }

        return null;
      }

      function z(t, e) {
        if (t && e) {
          if (e.compareDocumentPosition) return e === t || 16 & e.compareDocumentPosition(t);
          if (e.contains && 1 === t.nodeType) return e.contains(t) && e !== t;

          for (; t = t.parentNode;) if (t === e) return 1;
        }
      }

      function q(t, e, n) {
        var o;
        t && e && (t.classList ? t.classList[n ? "add" : "remove"](e) : (o = (" " + t.className + " ").replace(H, " ").replace(" " + e + " ", " "), t.className = (o + (n ? " " + e : "")).replace(H, " ")));
      }

      function V(t, e) {
        if (e && (">" === e[0] && (e = e.substring(1)), t)) try {
          if (t.matches) return t.matches(e);
          if (t.msMatchesSelector) return t.msMatchesSelector(e);
          if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
        } catch (t) {
          return;
        }
      }

      function U(t, e) {
        return t.top !== e.top || t.left !== e.left;
      }

      function v(t, e, n) {
        var o = t && t.style;

        if (o) {
          if (void 0 === n) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), void 0 === e ? n : n[e];
          o[e = e in o || -1 !== e.indexOf("webkit") ? e : "-webkit-" + e] = n + ("string" == typeof n ? "" : "px");
        }
      }

      function s(t, e) {
        return t.sortable.el !== e.sortable.el;
      }

      function y(t, e) {
        v(t, "display", e ? "" : "none");
      }

      var b = "Sortable" + Date.now(),
          o = {
        sortable: null,
        nodes: []
      },
          w = l({}, o),
          _ = l({}, o),
          S = {};

      function Z(t) {
        this.options = t || {}, this.groupName = t.group.name || "group_" + Number(Math.random().toString().slice(-3) + Date.now()).toString(32);
      }

      function G() {
        this.autoScrollAnimationFrame = null, this.speed = {
          x: 10,
          y: 10
        };
      }

      function J(t) {
        this.options = t, this.animations = [];
      }

      function K() {
        this.helper = null, this.distance = {
          x: 0,
          y: 0
        };
      }

      Z.prototype = {
        allowDrag: function (t) {
          return this.options.multiple && S[this.groupName] && S[this.groupName].length && -1 < S[this.groupName].indexOf(t);
        },
        getHelper: function () {
          var n = document.createElement("div");
          return S[this.groupName].forEach(function (t, e) {
            t = t.cloneNode(!0);
            t.style = "\n        opacity: ".concat(0 === e ? 1 : .5, ";\n        position: absolute;\n        z-index: ").concat(e, ";\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n      "), n.appendChild(t);
          }), n;
        },
        select: function (t, e, n, o) {
          var i;
          e && (S[this.groupName] || (S[this.groupName] = []), i = S[this.groupName].indexOf(e), q(e, this.options.selectedClass, i < 0), t = l(l({}, o), {}, {
            event: t
          }), i < 0 ? (S[this.groupName].push(e), o.sortable._dispatchEvent("onSelect", t)) : (S[this.groupName].splice(i, 1), o.sortable._dispatchEvent("onDeselect", t)), S[this.groupName].sort(function (t, e) {
            return t = f(t, n), e = f(e, n), t.top == e.top ? t.left - e.left : t.top - e.top;
          }));
        },
        onDrag: function (e, t) {
          w.sortable = t, w.nodes = S[this.groupName].map(function (t) {
            return {
              node: t,
              rect: g(t),
              offset: f(t, e)
            };
          }), _.sortable = t;
        },
        onTrulyStarted: function (e, t) {
          t.animator.collect(e, null, e.parentNode), S[this.groupName].forEach(function (t) {
            t != e && y(t, !1);
          }), t.animator.animate();
        },
        onChange: function (t, e) {
          var n = g(t),
              o = f(t, e.el);
          _.sortable = e, _.nodes = S[this.groupName].map(function (t) {
            return {
              node: t,
              rect: n,
              offset: o
            };
          });
        },
        onDrop: function (t, n, e, o, i) {
          var r = this,
              a = (_.sortable.animator.collect(n, null, n.parentNode), S[this.groupName].indexOf(n)),
              o = (S[this.groupName].forEach(function (t, e) {
            y(t, !0), e < a ? n.parentNode.insertBefore(t, n) : (e = 0 < e ? S[r.groupName][e - 1] : n, n.parentNode.insertBefore(t, e.nextSibling));
          }), w.sortable = o.sortable, _.nodes = S[this.groupName].map(function (t) {
            return {
              node: t,
              rect: g(t),
              offset: f(t, e)
            };
          }), s(w, _) || this._offsetChanged(w.nodes, _.nodes)),
              i = l(l({}, i()), {}, {
            changed: o,
            event: t
          });
          s(w, _) && w.sortable._dispatchEvent("onDrop", i), _.sortable._dispatchEvent("onDrop", i), _.sortable.animator.animate();
        },
        _offsetChanged: function (t, n) {
          return !!t.find(function (e) {
            return U(n.find(function (t) {
              return t.node === e.node;
            }).offset, e.offset);
          });
        }
      }, window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
        return setTimeout(t, 17);
      }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
        clearTimeout(t);
      }), G.prototype = {
        clear: function () {
          null != this.autoScrollAnimationFrame && (cancelAnimationFrame(this.autoScrollAnimationFrame), this.autoScrollAnimationFrame = null);
        },
        update: function (t, e, n, o) {
          var i = this;
          cancelAnimationFrame(this.autoScrollAnimationFrame), this.autoScrollAnimationFrame = requestAnimationFrame(function () {
            n && o && i.autoScroll(t, e, o), i.update(t, e, n, o);
          });
        },
        autoScroll: function (t, e, n) {
          var o, i, r, a, s, l, c, u, h, p, d, f;
          t && (o = n.clientX, n = n.clientY, void 0 !== o) && void 0 !== n && (h = g(t)) && (d = t.scrollTop, i = t.scrollLeft, r = t.scrollHeight, p = t.scrollWidth, a = h.top, s = h.right, l = h.bottom, c = h.left, f = h.height, h = h.width, n < a || s < o || l < n || o < c || (u = 0 < d && a <= n && n <= a + e, h = i + h < p && o <= s && s - e <= o, p = d + f < r && n <= l && l - e <= n, (f = d = 0) < i && c <= o && o <= c + e && (d = Math.floor(Math.max(-1, (o - c) / e - 1) * this.speed.x)), h && (d = Math.ceil(Math.min(1, (o - s) / e + 1) * this.speed.x)), u && (f = Math.floor(Math.max(-1, (n - a) / e - 1) * this.speed.y)), (f = p ? Math.ceil(Math.min(1, (n - l) / e + 1) * this.speed.y) : f) && (t.scrollTop += f), d && (t.scrollLeft += d)));
        }
      }, J.prototype = {
        collect: function (t, e, n, o) {
          var i = this;
          n && (n = Array.prototype.slice.call(n.children), e = (t = this._getRange(n, t, e, o)).start, t = t.end, this.animations.length = 0, n.slice(e, t + 1).forEach(function (t) {
            "none" !== v(t, "display") && t !== o && t !== B.helper && i.animations.push({
              node: t,
              rect: g(t)
            });
          }));
        },
        animate: function () {
          var n = this;
          this.animations.forEach(function (t) {
            var e = t.node,
                t = t.rect;

            n._excute(e, t);
          });
        },
        _excute: function (t, e) {
          var n = e.left,
              e = e.top,
              o = g(t),
              e = e - o.top,
              n = n - o.left,
              o = (i(t), h(t, "translate3d(".concat(n, "px, ").concat(e, "px, 0)")), t.offsetWidth, this.options.animation);
          i(t, o), h(t, "translate3d(0px, 0px, 0px)"), clearTimeout(t.animated), t.animated = setTimeout(function () {
            i(t), h(t, ""), t.animated = null;
          }, o);
        },
        _getRange: function (t, e, n) {
          var o,
              e = t.indexOf(e),
              n = t.indexOf(n);
          return n < e && (e = (o = [n, e])[0], n = o[1]), e < 0 && (e = n, n = t.length - 1), {
            start: e,
            end: n = n < 0 ? t.length - 1 : n
          };
        }
      }, K.prototype = {
        get node() {
          return this.helper;
        },

        destroy: function () {
          this.helper && this.helper.parentNode && this.helper.parentNode.removeChild(this.helper), this.helper = null, this.distance = {
            x: 0,
            y: 0
          };
        },
        move: function (t, e) {
          this.helper && h(this.helper, "translate3d(".concat(t, "px, ").concat(e, "px, 0)"));
        },
        init: function (t, e, n, o) {
          if (!this.helper) {
            var i,
                r = o.fallbackOnBody,
                a = o.ghostClass,
                o = o.ghostStyle,
                o = void 0 === o ? {} : o,
                r = r ? document.body : n,
                s = (this.helper = e.cloneNode(!0), q(this.helper, a, !0), l({
              "box-sizing": "border-box",
              top: t.top,
              left: t.left,
              width: t.width,
              height: t.height,
              position: "fixed",
              opacity: "0.8",
              "z-index": 1e5,
              "pointer-events": "none"
            }, o));

            for (i in s) v(this.helper, i, s[i]);

            n = this.helper, e = "none", n.style["".concat(u, "Transition")] = e ? "none" === e ? "none" : "".concat(e) : "", h(this.helper, "translate3d(0px, 0px, 0px)"), r.appendChild(this.helper);
            a = this.distance.x / parseInt(this.helper.style.width) * 100, t = this.distance.y / parseInt(this.helper.style.height) * 100;
            v(this.helper, "transform-origin", "".concat(a, "% ").concat(t, "%")), v(this.helper, "transform", "translateZ(0)"), v(this.helper, "will-change", "transform");
          }
        }
      };

      function r() {
        var t,
            e = {
          from: l({}, A),
          to: l({}, j)
        };
        return C && (t = {
          from: l({}, w),
          to: l({}, _)
        }, e.from = l(l({}, t.from), e.from), e.to = l(l({}, t.to), e.to)), e;
      }

      var N,
          E,
          x,
          D,
          O,
          T,
          C,
          Q,
          $,
          tt = {
        sortable: null,
        group: null,
        node: null,
        rect: {},
        offset: {}
      },
          M = [],
          P = new K(),
          et = new G(),
          A = l({}, tt),
          j = l({}, tt),
          X = {
        x: 0,
        y: 0
      },
          nt = function (t) {
        var e = {},
            n = t.group;
        n && "object" == R(n) || (n = {
          name: n,
          pull: !0,
          put: !0
        }), e.name = n.name, e.pull = n.pull, e.put = n.put, t.group = e;
      };

      function B(t, e) {
        if (!t || !t.nodeType || 1 !== t.nodeType) throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
        (t[b] = this).el = t, this.ownerDocument = t.ownerDocument, this.options = e = Object.assign({}, e);
        var n,
            o,
            i = {
          disabled: !1,
          group: "",
          animation: 150,
          multiple: !1,
          draggable: null,
          handle: null,
          onDrag: null,
          onMove: null,
          onDrop: null,
          onChange: null,
          autoScroll: !0,
          scrollThreshold: 55,
          delay: 0,
          delayOnTouchOnly: !1,
          touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
          ghostClass: "",
          ghostStyle: {},
          chosenClass: "",
          selectedClass: "",
          swapOnDrop: !0,
          fallbackOnBody: !1,
          stopPropagation: !1,
          supportTouch: "ontouchstart" in window,
          emptyInsertThreshold: 5
        };

        for (n in i) n in this.options || (this.options[n] = i[n]);

        for (o in nt(e), this) "_" === o.charAt(0) && "function" == typeof this[o] && (this[o] = this[o].bind(this));

        p(t, this.options.supportTouch ? "touchstart" : "mousedown", this._onDrag), M.push(t), this.multiplayer = new Z(this.options), this.animator = new J(this.options);
      }

      return (B.prototype = {
        constructor: B,
        destroy: function () {
          this._dispatchEvent("destroy", this), this.el[b] = null;

          for (var t = 0; t < c.start.length; t++) n(this.el, c.start[t], this._onDrag);

          this._clearState(), M.splice(M.indexOf(this.el), 1), this.el = null;
        },
        option: function (t, e) {
          var n = this.options;
          if (void 0 === e) return n[t];
          n[t] = e, "group" === t && nt(n);
        },
        _onDrag: function (t) {
          if (!this.options.disabled && this.options.group.pull && (!/mousedown|pointerdown/.test(t.type) || 0 === t.button)) {
            var e = I(t),
                n = e.touch,
                o = e.event,
                e = e.target;

            if (!(a && e && "SELECT" === e.tagName.toUpperCase() || e === this.el)) {
              var i = this.options,
                  r = i.draggable,
                  i = i.handle;

              if (("function" != typeof i || i(t)) && ("string" != typeof i || V(e, i))) {
                if ("function" == typeof r) {
                  i = r(t);
                  if (!i) return;
                  !function (e) {
                    if (e) {
                      var t = document.createElement("div");

                      try {
                        return t.appendChild(e.cloneNode(!0)), 1 == e.nodeType;
                      } catch (t) {
                        return e == window || e == document;
                      }
                    }
                  }(i) || (E = i);
                } else E = W(e, r, this.el, !1);

                E && !E.animated && (D = E.cloneNode(!0), this._prepareStart(n, o));
              }
            }
          }
        },
        _prepareStart: function (t, e) {
          var n = this,
              o = E.parentNode,
              i = ((O = e).sortable = this, O.group = E.parentNode, (C = this.options.multiple && this.multiplayer.allowDrag(E)) && this.multiplayer.onDrag(this.el, this), g(E)),
              r = f(E, this.el),
              r = (A = {
            sortable: this,
            group: o,
            node: E,
            rect: i,
            offset: r
          }, j.group = o, j.sortable = this, P.distance = {
            x: e.clientX - i.left,
            y: e.clientY - i.top
          }, p(document, "touchend", this._onDrop), p(document, "touchcancel", this._onDrop), p(document, "mouseup", this._onDrop), this.options),
              o = r.delay,
              e = r.delayOnTouchOnly;
          if (!o || e && !t || L || d) this._onStart(t);else {
            for (var a = 0; a < c.end.length; a++) p(this.ownerDocument, c.end[a], this._cancelStart);

            for (var s = 0; s < c.move.length; s++) p(this.ownerDocument, c.move[s], this._delayMoveHandler);

            $ = setTimeout(function () {
              return n._onStart(t);
            }, o);
          }
        },
        _delayMoveHandler: function (t) {
          t = t.touches ? t.touches[0] : t;
          Math.max(Math.abs(t.clientX - O.clientX), Math.abs(t.clientY - O.clientY)) >= Math.floor(this.options.touchStartThreshold / (window.devicePixelRatio || 1)) && this._cancelStart();
        },
        _cancelStart: function () {
          clearTimeout($);

          for (var t = 0; t < c.end.length; t++) n(this.ownerDocument, c.end[t], this._cancelStart);

          for (var e = 0; e < c.move.length; e++) n(this.ownerDocument, c.move[e], this._delayMoveHandler);
        },
        _onStart: function (t) {
          N = this.el, p(document, t ? "touchmove" : "mousemove", this._nearestSortable);

          try {
            document.selection ? setTimeout(function () {
              document.selection.empty();
            }, 0) : window.getSelection().removeAllRanges();
          } catch (t) {}
        },
        _onTrulyStarted: function () {
          var t;
          T || (this._dispatchEvent("onDrag", l(l({}, r()), {}, {
            event: O
          })), C && this.multiplayer.onTrulyStarted(E, this), t = C ? this.multiplayer.getHelper() : E, P.init(A.rect, t, this.el, this.options), B.helper = P.node, y(E, !1), E.parentNode.insertBefore(D, E), q(D, this.options.chosenClass, !0), a && v(document.body, "user-select", "none"));
        },
        _nearestSortable: function (t) {
          var e, n, o, i, r, a, s;
          this._preventEvent(t), O && E && (e = (n = t).clientX, n = n.clientY, o = e - X.x, i = n - X.y, X.x = e, X.y = n, void 0 !== e && void 0 !== n && Math.abs(o) <= 0 && Math.abs(i) <= 0 || (n = (e = I(t)).event, o = e.target, r = n.clientX, a = n.clientY, M.some(function (t) {
            var e,
                n,
                o = t[b].options.emptyInsertThreshold;
            if (o) return n = g(t, {
              parent: !0
            }), e = r >= n.left - o && r <= n.right + o, n = a >= n.top - o && a <= n.bottom + o, e && n ? s = t : void 0;
          }), i = s, this._onTrulyStarted(), T = n, P.move(n.clientX - O.clientX, n.clientY - O.clientY), this._autoScroll(o), i && (N = i)[b]._onMove(n, o)));
        },
        _allowPut: function () {
          var t, e;
          return O.sortable.el === this.el || !!this.options.group.put && (t = this.options.group.name, (e = O.sortable.options.group).name) && t && e.name === t;
        },
        _onMove: function (t, e) {
          if (this._dispatchEvent("onMove", l(l({}, r()), {}, {
            event: t
          })), this._allowPut()) {
            if (x = W(e, this.options.draggable, N, !1)) {
              if (x === Q) return;
              if ((Q = x) === D) return;
              if (x.animated || z(x, D)) return;
            }

            N !== A.sortable.el ? e !== N && function (t, e, n) {
              for (var o = t.lastElementChild; o && (o === e || "none" === v(o, "display") || n && !V(o, n));) o = o.previousElementSibling;

              return o;
            }(N, P.node) ? x && this._onInsert(t, !1) : this._onInsert(t, !0) : x && this._onChange(t);
          }
        },
        _autoScroll: function (t) {
          var t = function (t, e) {
            if (t && t.getBoundingClientRect) {
              var n = t,
                  o = !1;

              do {
                if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
                  var i = v(n);

                  if (n.clientWidth < n.scrollWidth && ("auto" == i.overflowX || "scroll" == i.overflowX) || n.clientHeight < n.scrollHeight && ("auto" == i.overflowY || "scroll" == i.overflowY)) {
                    if (!n.getBoundingClientRect || n === document.body) return m();
                    if (o || e) return n;
                    o = !0;
                  }
                }
              } while (n = n.parentNode);
            }

            return m();
          }(t, !0),
              e = this.options,
              n = e.autoScroll,
              e = e.scrollThreshold;

          n && et.update(t, e, O, T);
        },
        _onInsert: function (t, e) {
          var n = e ? D : x,
              o = e ? N : x.parentNode;
          A.sortable.animator.collect(D, null, D.parentNode, D), this.animator.collect(null, n, o, D), C && this.multiplayer.onChange(D, this), j = {
            sortable: this,
            group: o,
            node: n,
            rect: g(n),
            offset: f(n, N)
          }, A.sortable._dispatchEvent("onRemove", l(l({}, r()), {}, {
            event: t
          })), e ? o.appendChild(D) : o.insertBefore(D, x), this._dispatchEvent("onAdd", l(l({}, r()), {}, {
            event: t
          })), A.sortable.animator.animate(), this.animator.animate(), A.group = o, A.sortable = this;
        },
        _onChange: function (t) {
          var e = x.parentNode,
              t = (this.animator.collect(D, x, e), C && this.multiplayer.onChange(D, this), j = {
            sortable: this,
            group: e,
            node: x,
            rect: g(x),
            offset: f(x, N)
          }, this._dispatchEvent("onChange", l(l({}, r()), {}, {
            event: t
          })), f(D, N)),
              n = null,
              n = t.top === j.offset.top ? t.left < j.offset.left ? x.nextSibling : x : t.top < j.offset.top ? x.nextSibling : x;
          e.insertBefore(D, n), this.animator.animate(), A.group = e, A.sortable = this;
        },
        _onDrop: function (t) {
          this._unbindMoveEvents(), this._unbindDropEvents(), this._preventEvent(t), this._cancelStart(), et.clear(), E && O && T ? this._onEnd(t) : this.options.multiple && this.multiplayer.select(t, E, N, l({}, A)), this._clearState();
        },
        _onEnd: function (t) {
          var e;
          this.options.swapOnDrop && D.parentNode.insertBefore(E, D), A.group = O.group, A.sortable = O.sortable, C ? this.multiplayer.onDrop(t, E, N, O, r) : (j.rect = g(D), j.offset = f(D, N), j.node === D && (j.node = E), e = s(A, j) || U(A.offset, j.offset), e = l(l({}, r()), {}, {
            changed: e,
            event: t
          }), s(A, j) && A.sortable._dispatchEvent("onDrop", e), j.sortable._dispatchEvent("onDrop", e)), y(E, !0), D.parentNode.removeChild(D), a && v(document.body, "user-select", "");
        },
        _preventEvent: function (t) {
          void 0 !== t.preventDefault && t.cancelable && t.preventDefault(), this.options.stopPropagation && (t && t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0);
        },
        _dispatchEvent: function (t, e) {
          t = this.options[t];
          "function" == typeof t && t(e);
        },
        _clearState: function () {
          E = x = D = O = T = C = Q = $ = B.helper = null, X = {
            x: 0,
            y: 0
          }, A = j = l({}, tt), P.destroy();
        },
        _unbindMoveEvents: function () {
          for (var t = 0; t < c.move.length; t++) n(document, c.move[t], this._nearestSortable);
        },
        _unbindDropEvents: function () {
          for (var t = 0; t < c.end.length; t++) n(document, c.end[t], this._onDrop);
        }
      }).utils = {
        getRect: g,
        getOffset: f
      }, B.get = function (t) {
        return t[b];
      }, B.create = function (t, e) {
        return new B(t, e);
      }, B;
    });
  });

  var storeKey = 'virtualSortableState';
  var defaultStore = {
    from: {},
    to: {}
  };

  var Storage = /*#__PURE__*/function () {
    function Storage() {
      _classCallCheck(this, Storage);
    }

    _createClass(Storage, [{
      key: "clear",
      value: function clear() {
        localStorage.removeItem(storeKey);
      }
      /**
       * Obtaining Synchronization Data
       * @returns states: { from, to }
       */

    }, {
      key: "getStore",
      value: function getStore() {
        try {
          var result = JSON.parse(localStorage.getItem(storeKey));
          return result || defaultStore;
        } catch (e) {
          return defaultStore;
        }
      }
      /**
       * @returns states: { from, to }
       */

    }, {
      key: "getValue",
      value: function getValue() {
        return new Promise(function (resolve, reject) {
          try {
            var result = JSON.parse(localStorage.getItem(storeKey));
            resolve(result || defaultStore);
          } catch (e) {
            reject(defaultStore);
          }
        });
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        return new Promise(function (resolve, reject) {
          try {
            var store = JSON.parse(localStorage.getItem(storeKey));
            var result = JSON.stringify(Object.assign(Object.assign({}, store), value));
            localStorage.setItem(storeKey, result);
            resolve(result);
          } catch (e) {
            reject('{}');
          }
        });
      }
    }]);

    return Storage;
  }();

  var Store = new Storage();

  var Attributes = ['group', 'handle', 'disabled', 'draggable', 'ghostClass', 'ghostStyle', 'chosenClass', 'animation', 'autoScroll', 'scrollThreshold', 'fallbackOnBody', 'pressDelay', 'pressDelayOnTouchOnly'];
  var Emits = {
    drag: 'v-drag',
    drop: 'v-drop',
    add: 'v-add',
    remove: 'v-remove'
  };
  var dragEl = null;

  var Sortable = /*#__PURE__*/function () {
    function Sortable(context, handleStart, handleEnd) {
      _classCallCheck(this, Sortable);

      this.context = context;
      this.handleStart = handleStart;
      this.handleEnd = handleEnd;
      this.initialList = _toConsumableArray(context.list);
      this.dynamicList = _toConsumableArray(context.list);
      this.sortable = null;
      this.rangeChanged = false;

      this._init();
    }

    _createClass(Sortable, [{
      key: "destroy",
      value: function destroy() {
        this.sortable && this.sortable.destroy();
        this.sortable = null;
      }
    }, {
      key: "setValue",
      value: function setValue(key, value) {
        if (key === 'list') {
          this.initialList = _toConsumableArray(value); // When the list data changes when dragging, need to execute onDrag function

          if (dragEl) this._onDrag(dragEl, false);
        } else {
          this.context[key] = value;
          if (this.sortable) this.sortable.option(key, value);
        }
      }
    }, {
      key: "_init",
      value: function _init() {
        var _this = this;

        var props = Attributes.reduce(function (res, key) {
          var name = key;
          if (key === 'pressDelay') name = 'delay';
          if (key === 'pressDelayOnTouchOnly') name = 'delayOnTouchOnly';
          res[name] = _this.context[key];
          return res;
        }, {});
        this.sortable = new sortableDnd_min(this.context.container, Object.assign(Object.assign({}, props), {
          swapOnDrop: false,
          list: this.dynamicList,
          onDrag: function onDrag(_ref) {
            var from = _ref.from;
            return _this._onDrag(from.node);
          },
          onAdd: function onAdd(_ref2) {
            var from = _ref2.from,
                to = _ref2.to;
            return _this._onAdd(from, to);
          },
          onRemove: function onRemove(_ref3) {
            var from = _ref3.from,
                to = _ref3.to;
            return _this._onRemove(from, to);
          },
          onChange: function onChange(_ref4) {
            var from = _ref4.from,
                to = _ref4.to;
            return _this._onChange(from, to);
          },
          onDrop: function onDrop(_ref5) {
            var from = _ref5.from,
                to = _ref5.to,
                changed = _ref5.changed;
            return _this._onDrop(from, to, changed);
          }
        }));
      }
    }, {
      key: "_onDrag",
      value: function _onDrag(node) {
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var fromList, fromState, store, emit;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  dragEl = node;
                  this.dynamicList = _toConsumableArray(this.initialList);
                  fromList = _toConsumableArray(this.initialList);
                  fromState = this._getFromTo({
                    node: node
                  }, fromList);
                  _context.next = 6;
                  return Store.setValue({
                    from: Object.assign({
                      list: fromList
                    }, fromState)
                  });

                case 6:
                  if (!callback) {
                    _context.next = 16;
                    break;
                  }

                  this.rangeChanged = false;
                  _context.next = 10;
                  return Store.getValue();

                case 10:
                  store = _context.sent;
                  emit = this.context[Emits.drag];
                  emit && emit(Object.assign({
                    list: fromList
                  }, store));
                  this.handleStart && this.handleStart(store);
                  _context.next = 17;
                  break;

                case 16:
                  this.rangeChanged = true;

                case 17:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
      }
    }, {
      key: "_onAdd",
      value: function _onAdd(from, to) {
        var _a, _b;

        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var store, list, index, params, emit;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!this.dynamicList.length) {
                    this.dynamicList = _toConsumableArray(this.initialList);
                  }

                  _context2.next = 3;
                  return Store.getValue();

                case 3:
                  store = _context2.sent;
                  list = _toConsumableArray(this.dynamicList);
                  index = this._getIndex(list, to.node.dataset.key);
                  params = Object.assign(Object.assign({}, store.from), {
                    index: index
                  });

                  if (from.node === to.node) {
                    // insert to end of list
                    params.index = this.dynamicList.length;
                    this.dynamicList.push((_a = store.from) === null || _a === void 0 ? void 0 : _a.item);
                  } else {
                    this.dynamicList.splice(index, 0, (_b = store.from) === null || _b === void 0 ? void 0 : _b.item);
                  }

                  delete params.list;
                  emit = this.context[Emits.add];
                  emit && emit(Object.assign({}, params));

                case 11:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));
      }
    }, {
      key: "_onRemove",
      value: function _onRemove(from) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var list, state, emit;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  list = _toConsumableArray(this.dynamicList);
                  state = this._getFromTo(from, list);
                  this.dynamicList.splice(state.index, 1);
                  emit = this.context[Emits.remove];
                  emit && emit(Object.assign({}, state));

                case 5:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));
      }
    }, {
      key: "_onChange",
      value: function _onChange(from, to) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var fromList, toList, fromState, toState;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  fromList = _toConsumableArray(this.dynamicList);
                  toList = _toConsumableArray(this.dynamicList);
                  fromState = this._getFromTo(from, fromList);
                  toState = this._getFromTo(to, toList);
                  this.dynamicList.splice(fromState.index, 1);
                  this.dynamicList.splice(toState.index, 0, fromState.item);

                case 6:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));
      }
    }, {
      key: "_onDrop",
      value: function _onDrop(from, to, changed) {
        return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var list, index, item, key, store, params, emit;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  list = _toConsumableArray(this.dynamicList);
                  index = this._getIndex(list, from.node.dataset.key);
                  item = this.initialList[index];
                  key = getDataKey(item, this.context.dataKey);
                  _context5.next = 6;
                  return Store.setValue({
                    to: {
                      list: _toConsumableArray(this.initialList),
                      index: index,
                      item: item,
                      key: key
                    }
                  });

                case 6:
                  _context5.next = 8;
                  return Store.getValue();

                case 8:
                  store = _context5.sent;
                  params = Object.assign(Object.assign({
                    list: list
                  }, store), {
                    changed: changed
                  });
                  emit = this.context[Emits.drop];
                  emit && emit(Object.assign({}, params));
                  this.handleEnd && this.handleEnd(store, params);
                  this.initialList = _toConsumableArray(list);

                  this._clear();

                case 15:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));
      }
    }, {
      key: "_getFromTo",
      value: function _getFromTo(fromTo, list) {
        var key = fromTo.node.dataset.key;

        var index = this._getIndex(list, key);

        var item = list[index];
        return {
          key: key,
          item: item,
          index: index
        };
      }
    }, {
      key: "_getIndex",
      value: function _getIndex(list, key) {
        var _this2 = this;

        return list.findIndex(function (item) {
          return getDataKey(item, _this2.context.dataKey) == key;
        });
      }
    }, {
      key: "_clear",
      value: function _clear() {
        dragEl = null;
        Store.clear();
        this.rangeChanged = false;
      }
    }]);

    return Sortable;
  }();

  function Observer(props) {
    var dataKey = props.dataKey,
        children = props.children,
        onSizeChange = props.onSizeChange;
    var elementRef = React.useRef(null);
    var isRenderProps = typeof children === 'function';
    var mergedChildren = isRenderProps ? children(elementRef) : children;
    React.useLayoutEffect(function () {
      var observer;

      if ((typeof ResizeObserver === "undefined" ? "undefined" : _typeof(ResizeObserver)) !== undefined) {
        observer = new ResizeObserver(function () {
          var size = elementRef.current.clientHeight;
          onSizeChange && onSizeChange(dataKey, size);
        });
        elementRef.current && observer.observe(elementRef.current);
      }

      return function () {
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      };
    }, [elementRef]);
    return /*#__PURE__*/React.cloneElement(mergedChildren, {
      ref: elementRef
    });
  }
  function Item(props) {
    var children = props.children,
        dataKey = props.dataKey,
        className = props.className,
        style = props.style,
        _props$Tag = props.Tag,
        Tag = _props$Tag === void 0 ? 'div' : _props$Tag,
        record = props.record,
        index = props.index,
        onSizeChange = props.onSizeChange;
    return /*#__PURE__*/React.createElement(Observer, {
      dataKey: dataKey,
      onSizeChange: onSizeChange
    }, /*#__PURE__*/React.createElement(Tag, {
      className: className,
      style: style,
      "data-key": dataKey
    }, typeof children === 'function' ? children(record, index, dataKey) : children));
  }
  function Slot(props) {
    var _props$Tag2 = props.Tag,
        Tag = _props$Tag2 === void 0 ? 'div' : _props$Tag2,
        style = props.style,
        className = props.className,
        children = props.children,
        roleId = props.roleId,
        onSizeChange = props.onSizeChange;
    return children ? /*#__PURE__*/React.createElement(Observer, {
      dataKey: roleId,
      onSizeChange: onSizeChange
    }, /*#__PURE__*/React.createElement(Tag, {
      "v-role": roleId,
      style: style,
      className: className
    }, children)) : /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  var Emits$1 = {
    top: 'v-top',
    bottom: 'v-bottom'
  };

  function VirtualDragList(props, ref) {
    var _props$dataSource = props.dataSource,
        dataSource = _props$dataSource === void 0 ? [] : _props$dataSource,
        _props$dataKey = props.dataKey,
        dataKey = _props$dataKey === void 0 ? '' : _props$dataKey,
        _props$direction = props.direction,
        direction = _props$direction === void 0 ? 'vertical' : _props$direction,
        _props$keeps = props.keeps,
        keeps = _props$keeps === void 0 ? 30 : _props$keeps,
        _props$size = props.size,
        size = _props$size === void 0 ? undefined : _props$size,
        _props$delay = props.delay,
        delay = _props$delay === void 0 ? 0 : _props$delay,
        _props$keepOffset = props.keepOffset,
        keepOffset = _props$keepOffset === void 0 ? false : _props$keepOffset,
        _props$autoScroll = props.autoScroll,
        autoScroll = _props$autoScroll === void 0 ? true : _props$autoScroll,
        _props$scrollThreshol = props.scrollThreshold,
        scrollThreshold = _props$scrollThreshol === void 0 ? 55 : _props$scrollThreshol,
        _props$animation = props.animation,
        animation = _props$animation === void 0 ? 150 : _props$animation,
        _props$pressDelay = props.pressDelay,
        pressDelay = _props$pressDelay === void 0 ? 0 : _props$pressDelay,
        _props$pressDelayOnTo = props.pressDelayOnTouchOnly,
        pressDelayOnTouchOnly = _props$pressDelayOnTo === void 0 ? false : _props$pressDelayOnTo,
        _props$fallbackOnBody = props.fallbackOnBody,
        fallbackOnBody = _props$fallbackOnBody === void 0 ? false : _props$fallbackOnBody,
        _props$style = props.style,
        style = _props$style === void 0 ? {} : _props$style,
        _props$className = props.className,
        className = _props$className === void 0 ? '' : _props$className,
        _props$wrapTag = props.wrapTag,
        wrapTag = _props$wrapTag === void 0 ? 'div' : _props$wrapTag,
        _props$rootTag = props.rootTag,
        rootTag = _props$rootTag === void 0 ? 'div' : _props$rootTag,
        _props$itemTag = props.itemTag,
        itemTag = _props$itemTag === void 0 ? 'div' : _props$itemTag,
        _props$headerTag = props.headerTag,
        headerTag = _props$headerTag === void 0 ? 'div' : _props$headerTag,
        _props$footerTag = props.footerTag,
        footerTag = _props$footerTag === void 0 ? 'div' : _props$footerTag,
        _props$itemStyle = props.itemStyle,
        itemStyle = _props$itemStyle === void 0 ? {} : _props$itemStyle,
        _props$itemClass = props.itemClass,
        itemClass = _props$itemClass === void 0 ? '' : _props$itemClass,
        _props$wrapStyle = props.wrapStyle,
        wrapStyle = _props$wrapStyle === void 0 ? {} : _props$wrapStyle,
        _props$wrapClass = props.wrapClass,
        wrapClass = _props$wrapClass === void 0 ? '' : _props$wrapClass,
        _props$ghostClass = props.ghostClass,
        ghostClass = _props$ghostClass === void 0 ? '' : _props$ghostClass,
        _props$ghostStyle = props.ghostStyle,
        ghostStyle = _props$ghostStyle === void 0 ? {} : _props$ghostStyle,
        _props$chosenClass = props.chosenClass,
        chosenClass = _props$chosenClass === void 0 ? '' : _props$chosenClass,
        _props$disabled = props.disabled,
        disabled = _props$disabled === void 0 ? false : _props$disabled;

    var _React$useState = React.useState([]),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        viewList = _React$useState2[0],
        setViewList = _React$useState2[1];

    var _React$useState3 = React.useState({
      end: keeps - 1
    }),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        range = _React$useState4[0],
        setRange = _React$useState4[1]; // currently visible range


    var _React$useState5 = React.useState({
      from: {},
      to: {}
    }),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        state = _React$useState6[0],
        setState = _React$useState6[1];

    var list = React.useRef([]);
    var uniqueKeys = React.useRef([]);
    var rootRef = React.useRef(null); // root element

    var wrapRef = React.useRef(null); // list element

    var lastRef = React.useRef(null); // dom at the end of the list

    var lastItem = React.useRef(null); // record the first element of the current list

    var sortable = React.useRef(null);
    var virtual = React.useRef(null);
    /**
     * reset component
     */

    var reset = function reset() {
      scrollToTop();
      setViewList(function () {
        return _toConsumableArray(dataSource);
      });
      list.current = _toConsumableArray(dataSource);
    };
    /**
     * git item size by data-key
     * @param {String | Number} key data-key
     */


    var getSize = function getSize(key) {
      return virtual.current.sizes.get(key);
    };
    /**
     * Get the current scroll height
     */


    var getOffset = function getOffset() {
      var root = rootRef.current;
      return root ? Math.ceil(root[scrollDirectionKey]) : 0;
    };
    /**
     * Scroll to the specified offset
     * @param {Number} offset
     */


    var scrollToOffset = function scrollToOffset(offset) {
      rootRef.current[scrollDirectionKey] = offset;
    };
    /**
     * Scroll to the specified index position
     * @param {Number} index
     */


    var scrollToIndex = function scrollToIndex(index) {
      if (index >= dataSource.length - 1) {
        scrollToBottom();
      } else {
        var indexOffset = virtual.current.getOffsetByIndex(index);
        scrollToOffset(indexOffset);
        setTimeout(function () {
          var offset = getOffset();
          var indexOffset = virtual.current.getOffsetByIndex(index);
          if (offset !== indexOffset) scrollToIndex(index);
        }, 5);
      }
    };
    /**
     * Scroll to top of list
     */


    var scrollToTop = function scrollToTop() {
      rootRef.current[scrollDirectionKey] = 0;
    };
    /**
     * Scroll to bottom of list
     */


    var scrollToBottom = function scrollToBottom() {
      if (lastRef.current) {
        var offset = lastRef.current[offsetSizeKey];
        rootRef.current[scrollDirectionKey] = offset;
        setTimeout(function () {
          var root = rootRef.current;
          var offset = getOffset();
          var clientSize = Math.ceil(root[clientSizeKey]);
          var scrollSize = Math.ceil(root[scrollSizeKey]);
          if (offset + clientSize + 1 < scrollSize) scrollToBottom();
        }, 5);
      }
    };

    React.useImperativeHandle(ref, function () {
      return {
        reset: reset,
        getSize: getSize,
        getOffset: getOffset,
        scrollToTop: scrollToTop,
        scrollToIndex: scrollToIndex,
        scrollToOffset: scrollToOffset,
        scrollToBottom: scrollToBottom
      };
    });
    React.useEffect(function () {
      initVirtual();
      initSortable(); // destroy

      return function () {
        destroySortable();
      };
    }, []);
    React.useEffect(function () {
      list.current = _toConsumableArray(dataSource);
      setUniqueKeys();

      if (virtual.current) {
        virtual.current.updateUniqueKeys(uniqueKeys.current);
        virtual.current.updateSizes(uniqueKeys.current);
        setTimeout(function () {
          return virtual.current.updateRange();
        }, 0);
      }

      if (sortable.current) {
        sortable.current.setValue('list', dataSource);
      }

      setViewList(function () {
        return _toConsumableArray(dataSource);
      }); // if auto scroll to the last offset

      if (lastItem.current && keepOffset) {
        var index = getItemIndex(lastItem.current);
        scrollToIndex(index);
        lastItem.current = null;
      }
    }, [dataSource]);
    React.useEffect(function () {
      if (sortable.current) sortable.current.setValue('disabled', disabled);
    }, [disabled]);

    var initVirtual = function initVirtual() {
      virtual.current = new Virtual({
        size: size,
        keeps: keeps,
        uniqueKeys: uniqueKeys.current
      }, function (range) {
        if (!sortable.current) return;
        setRange(function () {
          return range;
        });
        var state = Store.getStore();
        var start = range.start,
            end = range.end;
        var index = state.from.index;

        if (index > -1 && !(index >= start && index <= end)) {
          sortable.current.rangeChanged = true;
        }
      });
    };

    var initSortable = function initSortable() {
      sortable.current = new Sortable(Object.assign({
        container: wrapRef.current,
        list: list.current,
        disabled: disabled,
        ghostClass: ghostClass,
        ghostStyle: ghostStyle,
        chosenClass: chosenClass,
        animation: animation,
        autoScroll: autoScroll,
        scrollThreshold: scrollThreshold,
        pressDelay: pressDelay,
        pressDelayOnTouchOnly: pressDelayOnTouchOnly,
        fallbackOnBody: fallbackOnBody
      }, props), function (store) {
        setState(function () {
          return Object.assign({}, store);
        });
      }, function (store, _ref) {
        var newlist = _ref.list,
            changed = _ref.changed;
        setState(function () {
          return Object.assign({}, store);
        });

        if (changed) {
          // recalculate the range once when scrolling down
          if (sortable.current.rangeChanged && virtual.current.direction) {
            var prelist = list.current;
            setRange(function (pre) {
              var range;

              if (pre.start > 0) {
                var index = newlist.indexOf(prelist[pre.start]);

                if (index > -1) {
                  range = Object.assign(Object.assign({}, pre), {
                    start: index,
                    end: index + keeps - 1
                  });
                } else {
                  range = Object.assign({}, pre);
                }
              } else {
                range = Object.assign({}, pre);
              }

              if (newlist.length > viewList.length && pre.end === viewList.length - 1) {
                range.end++;
              }

              return range;
            });
          } // list change


          list.current = _toConsumableArray(newlist);
          setViewList(function () {
            return _toConsumableArray(newlist);
          });
          setUniqueKeys();
        }
      });
    };

    var destroySortable = function destroySortable() {
      sortable.current && sortable.current.destroy();
      sortable.current = null;
    };

    var setUniqueKeys = function setUniqueKeys() {
      uniqueKeys.current = list.current.map(function (item) {
        return getDataKey(item, dataKey);
      });
    };

    var getItemIndex = function getItemIndex(item) {
      return list.current.findIndex(function (el) {
        return getDataKey(el, dataKey) === getDataKey(item, dataKey);
      });
    };

    var _React$useMemo = React.useMemo(function () {
      var isHorizontal = direction !== 'vertical';
      return {
        offsetSizeKey: isHorizontal ? 'offsetLeft' : 'offsetTop',
        scrollSizeKey: isHorizontal ? 'scrollWidth' : 'scrollHeight',
        clientSizeKey: isHorizontal ? 'clientWidth' : 'clientHeight',
        scrollDirectionKey: isHorizontal ? 'scrollLeft' : 'scrollTop'
      };
    }, [direction]),
        scrollSizeKey = _React$useMemo.scrollSizeKey,
        scrollDirectionKey = _React$useMemo.scrollDirectionKey,
        offsetSizeKey = _React$useMemo.offsetSizeKey,
        clientSizeKey = _React$useMemo.clientSizeKey;

    var handleScroll = function handleScroll() {
      var root = rootRef.current;
      var offset = getOffset();
      var clientSize = Math.ceil(root[clientSizeKey]);
      var scrollSize = Math.ceil(root[scrollSizeKey]);

      if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
        return;
      }

      virtual.current.handleScroll(offset);

      if (virtual.current.isFront()) {
        if (!!dataSource.length && offset <= 0) handleToTop();
      } else if (virtual.current.isBehind()) {
        if (clientSize + offset >= scrollSize) handleToBottom();
      }
    };

    var handleToTop = debounce(function () {
      lastItem.current = list.current[0];
      var emit = props[Emits$1.top];
      emit && emit();
    });
    var handleToBottom = debounce(function () {
      var emit = props[Emits$1.bottom];
      emit && emit();
    });

    var onItemSizeChange = function onItemSizeChange(key, size) {
      if (!virtual.current) return;
      virtual.current.handleItemSizeChange(key, size);
    };

    var onSlotSizeChange = function onSlotSizeChange(key, size) {
      if (!virtual.current) return;
      virtual.current.handleSlotSizeChange(key, size);
    }; // check item show or not


    var getItemStyle = React.useCallback(function (itemKey) {
      if (!sortable.current || !state) return {};
      var fromKey = state.from.key;

      if (sortable.current.rangeChanged && itemKey == fromKey) {
        return {
          display: 'none'
        };
      }

      return {};
    }, [state]); // html tag name

    var _React$useMemo2 = React.useMemo(function () {
      return {
        RTag: rootTag,
        WTag: wrapTag
      };
    }, [wrapTag, rootTag]),
        RTag = _React$useMemo2.RTag,
        WTag = _React$useMemo2.WTag; // root style


    var RStyle = React.useMemo(function () {
      return Object.assign(Object.assign({}, style), {
        overflow: direction !== 'vertical' ? 'auto hidden' : 'hidden auto'
      });
    }, [style, direction]); // wrap style

    var WStyle = React.useMemo(function () {
      var front = range.front,
          behind = range.behind;
      return Object.assign(Object.assign({}, wrapStyle), {
        padding: direction !== 'vertical' ? "0px ".concat(behind, "px 0px ").concat(front, "px") : "".concat(front, "px 0px ").concat(behind, "px")
      });
    }, [wrapStyle, direction, range]); // range

    var _React$useMemo3 = React.useMemo(function () {
      return Object.assign({}, range);
    }, [range]),
        start = _React$useMemo3.start,
        end = _React$useMemo3.end;

    return /*#__PURE__*/React.createElement(RTag, {
      ref: rootRef,
      style: RStyle,
      className: className,
      onScroll: debounce(handleScroll, delay)
    }, /*#__PURE__*/React.createElement(Slot, {
      roleId: 'header',
      Tag: headerTag,
      children: props.header,
      onSizeChange: onSlotSizeChange
    }), /*#__PURE__*/React.createElement(WTag, {
      ref: wrapRef,
      "v-role": 'group',
      style: WStyle,
      className: wrapClass
    }, viewList.slice(start, end + 1).map(function (item) {
      var key = getDataKey(item, dataKey);
      var index = getItemIndex(item);
      return /*#__PURE__*/React.createElement(Item, {
        key: key,
        record: item,
        index: index,
        dataKey: key,
        Tag: itemTag,
        children: props.children,
        className: itemClass,
        style: Object.assign(Object.assign({}, itemStyle), getItemStyle(key)),
        onSizeChange: onItemSizeChange
      });
    })), /*#__PURE__*/React.createElement(Slot, {
      roleId: 'footer',
      Tag: footerTag,
      children: props.footer,
      onSizeChange: onSlotSizeChange
    }), /*#__PURE__*/React.createElement("div", {
      ref: lastRef,
      style: {
        width: direction !== 'vertical' ? '0px' : '100%',
        height: direction !== 'vertical' ? '100%' : '0px'
      }
    }));
  }

  var index = /*#__PURE__*/React.forwardRef(VirtualDragList);

  return index;

})));
