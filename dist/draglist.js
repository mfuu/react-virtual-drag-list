/*!
 * react-virtual-drag-list v2.4.0
 * open source under the MIT license
 * https://github.com/mfuu/react-virtual-drag-list#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VirtualDragList = {}, global.React));
})(this, (function (exports, React) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function Observer(props) {
      const { dataKey, children, onSizeChange } = props;
      const elementRef = React__namespace.useRef(null);
      const isRenderProps = typeof children === 'function';
      const mergedChildren = isRenderProps ? children(elementRef) : children;
      React__namespace.useLayoutEffect(() => {
          let observer;
          if (typeof ResizeObserver !== undefined) {
              observer = new ResizeObserver(() => {
                  const size = elementRef.current.clientHeight;
                  onSizeChange && onSizeChange(dataKey, size);
              });
              elementRef.current && observer.observe(elementRef.current);
          }
          return () => {
              if (observer) {
                  observer.disconnect();
                  observer = null;
              }
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [elementRef]);
      return React__namespace.cloneElement(mergedChildren, {
          ref: elementRef,
      });
  }

  function Item(props) {
      const { children, dataKey, Class, Style, Tag = 'div' } = props;
      const { record, index, onSizeChange } = props;
      return (React__namespace.createElement(Observer, { dataKey: dataKey, onSizeChange: onSizeChange },
          React__namespace.createElement(Tag, { className: Class, style: Style, "data-key": dataKey }, typeof children === 'function' ? children(record, index, dataKey) : children)));
  }
  function Slot(props) {
      const { Tag = 'div', Style, Class, children, roleId, onSizeChange } = props;
      return children ? (React__namespace.createElement(Observer, { dataKey: roleId, onSizeChange: onSizeChange },
          React__namespace.createElement(Tag, { "v-role": roleId, style: Style, className: Class }, children))) : React__namespace.createElement(React__namespace.Fragment, null);
  }

  /**
    * 防抖函数
    * @param func callback
    * @param delay 延迟
    * @param immediate 是否立即执行
    * @returns
    */
  function debounce(func, delay = 50, immediate = false) {
      let timer;
      let result;
      let debounced = function (...args) {
          if (timer)
              clearTimeout(timer);
          if (immediate) {
              let callNow = !timer;
              timer = setTimeout(() => {
                  timer = null;
              }, delay);
              if (callNow)
                  result = func.apply(this, args);
          }
          else {
              timer = setTimeout(() => {
                  func.apply(this, args);
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

  const CACLTYPE = {
      INIT: 'INIT',
      FIXED: 'FIXED',
      DYNAMIC: 'DYNAMIC'
  };
  const DIRECTION = {
      FRONT: 'FRONT',
      BEHIND: 'BEHIND'
  };
  class CalcSize {
      average = undefined; // 计算首次加载每一项的评价高度
      total = undefined; // 首次加载的总高度
      fixed = undefined; // 记录固定高度值
      header = undefined; // 顶部插槽高度
      footer = undefined; // 底部插槽高度
  }
  class Range {
      start = 0;
      end = 0;
      front = 0;
      behind = 0;
  }
  class Virtual {
      options;
      callback;
      sizes; // 用于存储列表项的高度
      isHorizontal; // 是否为横向滚动
      calcIndex; // 记录上次计算的index
      calcType; // 记录列表项高度是动态还是静态
      calcSize;
      range;
      direction; // 滚动方向
      offset; // 记录滚动距离
      constructor(options, callback) {
          this.options = { ...options };
          this.callback = callback;
          this.sizes = new Map();
          this.isHorizontal = options.isHorizontal;
          this.calcIndex = 0;
          this.calcType = CACLTYPE.INIT;
          this.calcSize = new CalcSize;
          this.direction = '';
          this.offset = 0;
          this.range = new Range;
          if (options)
              this.checkIfUpdate(0, options.keeps - 1);
      }
      // --------------------------- update ------------------------------
      updateUniqueKeys(value) {
          this.options.uniqueKeys = value;
      }
      // 更新 sizes，删除不在当前列表中的数据
      updateSizes(uniqueKeys) {
          this.sizes.forEach((v, k) => {
              if (!uniqueKeys.includes(k))
                  this.sizes.delete(k);
          });
      }
      updateRange() {
          const start = Math.max(this.range.start, 0);
          this.handleUpdate(start, this.getEndByStart(start));
      }
      // --------------------------- scroll ------------------------------
      // 滚动事件
      handleScroll(offset) {
          this.direction = offset < this.offset ? DIRECTION.FRONT : DIRECTION.BEHIND;
          this.offset = offset;
          const scrolls = this.getScrollItems(offset);
          if (this.isFront()) {
              this.handleScrollFront(scrolls);
          }
          else if (this.isBehind()) {
              this.handleScrollBehind(scrolls);
          }
      }
      isFront() {
          return this.direction === DIRECTION.FRONT;
      }
      isBehind() {
          return this.direction === DIRECTION.BEHIND;
      }
      getScrollItems(offset) {
          const { fixed, header } = this.calcSize;
          // 减去顶部插槽高度
          if (header)
              offset -= header;
          if (offset <= 0)
              return 0;
          // 固定高度
          if (this.calcType === CACLTYPE.FIXED)
              return Math.floor(offset / fixed);
          // 非固定高度使用二分查找
          let low = 0, high = this.options.uniqueKeys.length;
          let middle = 0, middleOffset = 0;
          while (low <= high) {
              middle = low + Math.floor((high - low) / 2);
              middleOffset = this.getOffsetByIndex(middle);
              if (middleOffset === offset)
                  return middle;
              else if (middleOffset < offset)
                  low = middle + 1;
              else if (middleOffset > offset)
                  high = middle - 1;
          }
          return low > 0 ? --low : 0;
      }
      handleScrollFront(scrolls) {
          if (scrolls > this.range.start)
              return;
          const start = Math.max(scrolls - Math.round(this.options.keeps / 3), 0);
          this.checkIfUpdate(start, this.getEndByStart(start));
      }
      handleScrollBehind(scrolls) {
          if (scrolls < this.range.start + Math.round(this.options.keeps / 3))
              return;
          this.checkIfUpdate(scrolls, this.getEndByStart(scrolls));
      }
      checkIfUpdate(start, end) {
          const { uniqueKeys, keeps } = this.options;
          if (uniqueKeys.length <= keeps) {
              start = 0;
              end = uniqueKeys.length - 1;
          }
          else if (end - start < keeps - 1) {
              start = end - keeps + 1;
          }
          if (this.range.start !== start)
              this.handleUpdate(start, end);
      }
      handleUpdate(start, end) {
          this.range.start = start;
          this.range.end = end;
          this.range.front = this.getFrontOffset();
          this.range.behind = this.getBehindOffset();
          this.callback({ ...this.range });
      }
      getFrontOffset() {
          if (this.calcType === CACLTYPE.FIXED) {
              return this.calcSize.fixed * this.range.start;
          }
          else {
              return this.getOffsetByIndex(this.range.start);
          }
      }
      getBehindOffset() {
          const last = this.getLastIndex();
          if (this.calcType === CACLTYPE.FIXED) {
              return (last - this.range.end) * this.calcSize.fixed;
          }
          if (this.calcIndex === last) {
              return this.getOffsetByIndex(last) - this.getOffsetByIndex(this.range.end);
          }
          return (last - this.range.end) * this.getItemSize();
      }
      getOffsetByIndex(index) {
          if (!index)
              return 0;
          let offset = 0;
          for (let i = 0; i < index; i++) {
              const size = this.sizes.get(this.options.uniqueKeys[i]);
              offset = offset + (typeof size === 'number' ? size : this.getItemSize());
          }
          this.calcIndex = Math.max(this.calcIndex, index - 1);
          this.calcIndex = Math.min(this.calcIndex, this.getLastIndex());
          return offset;
      }
      getEndByStart(start) {
          return Math.min(start + this.options.keeps - 1, this.getLastIndex());
      }
      getLastIndex() {
          return this.options.uniqueKeys.length - 1;
      }
      // --------------------------- size ------------------------------
      // 获取列表项的高度
      getItemSize() {
          return this.calcType === CACLTYPE.FIXED ? this.calcSize.fixed : (this.calcSize.average || this.options.size);
      }
      // 列表项高度变化
      handleItemSizeChange(id, size) {
          this.sizes.set(id, size);
          // 'INIT' 状态表示每一项的高度都相同
          if (this.calcType === CACLTYPE.INIT) {
              this.calcType = CACLTYPE.FIXED; // 固定高度
              this.calcSize.fixed = size;
          }
          else if (this.calcType === CACLTYPE.FIXED && this.calcSize.fixed !== size) {
              // 如果当前为 'FIXED' 状态并且 size 与固定高度不同，表示当前高度不固定，fixed值也就不需要了
              this.calcType = CACLTYPE.DYNAMIC;
              this.calcSize.fixed = undefined;
          }
          // 非固定高度的情况下，计算平均高度与总高度
          if (this.calcType !== CACLTYPE.FIXED) {
              this.calcSize.total = [...this.sizes.values()].reduce((t, i) => t + i, 0);
              this.calcSize.average = Math.round(this.calcSize.total / this.sizes.size);
          }
      }
      // header 插槽高度变化
      handleHeaderSizeChange(size) {
          this.calcSize.header = size;
      }
      // footer 插槽高度变化
      handleFooterSizeChange(size) {
          this.calcSize.footer = size;
      }
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var sortable_min = createCommonjsModule(function (module, exports) {
  !function (t, e) {
    module.exports = e() ;
  }(commonjsGlobal, function () {

    function d(t) {
      return (d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t;
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
      })(t);
    }

    function o(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }

    function n(t, e) {
      for (var o = 0; o < e.length; o++) {
        var n = e[o];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
      }
    }

    function i(t, e, o) {
      e && n(t.prototype, e), o && n(t, o), Object.defineProperty(t, "prototype", {
        writable: !1
      });
    }

    function r(t) {
      return function (t) {
        if (Array.isArray(t)) return s(t);
      }(t) || function (t) {
        if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t);
      }(t) || function (t, e) {
        if (t) {
          if ("string" == typeof t) return s(t, e);
          var o = Object.prototype.toString.call(t).slice(8, -1);
          return "Map" === (o = "Object" === o && t.constructor ? t.constructor.name : o) || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? s(t, e) : void 0;
        }
      }(t) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }

    function s(t, e) {
      (null == e || e > t.length) && (e = t.length);

      for (var o = 0, n = new Array(e); o < e; o++) n[o] = t[o];

      return n;
    }

    function t(t) {
      if ("undefined" != typeof window && window.navigator) return !!navigator.userAgent.match(t);
    }

    var a = t(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
        l = t(/Edge/i),
        f = t(/safari/i) && !t(/chrome/i) && !t(/android/i),
        e = t(/iP(ad|od|hone)/i),
        h = t(/chrome/i) && t(/android/i),
        c = {
      capture: !1,
      passive: !1
    },
        u = /\s+/g,
        p = ["-webkit-transition", "-moz-transition", "-ms-transition", "-o-transition", "transition"],
        v = ["-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform", "transform"];

    function m(e, o) {
      o ? "none" === o ? p.forEach(function (t) {
        return D(e, t, "none");
      }) : p.forEach(function (t) {
        return D(e, t, "".concat(t.split("transition")[0], "transform ").concat(o));
      }) : p.forEach(function (t) {
        return D(e, t, "");
      });
    }

    function g(e, o) {
      o ? v.forEach(function (t) {
        return D(e, t, "".concat(t.split("transform")[0]).concat(o));
      }) : v.forEach(function (t) {
        return D(e, t, "");
      });
    }

    function w(t, e, o, n) {
      window.addEventListener ? t.addEventListener(e, o, !(!n && a) && c) : window.attachEvent && t.attachEvent("on" + e, o);
    }

    function y(t, e, o, n) {
      window.removeEventListener ? t.removeEventListener(e, o, !(!n && a) && c) : window.detachEvent && t.detachEvent("on" + e, o);
    }

    function b(t) {
      for (var e = {
        top: 0,
        left: 0,
        height: 0,
        width: 0
      }, o = (e.height = t.offsetHeight, e.width = t.offsetWidth, e.top = t.offsetTop, e.left = t.offsetLeft, t.offsetParent); null !== o;) e.top += o.offsetTop, e.left += o.offsetLeft, o = o.offsetParent;

      return e;
    }

    function E(t) {
      var e, o;
      if (t.getBoundingClientRect || t === window) return e = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 0,
        width: 0
      }, t !== window && t.parentNode && t !== (!(o = document.scrollingElement) || o.contains(document.body) ? document : o) ? (o = t.getBoundingClientRect(), e.top = o.top, e.left = o.left, e.bottom = o.bottom, e.right = o.right, e.height = o.height, e.width = o.width) : (e.top = 0, e.left = 0, e.bottom = window.innerHeight, e.right = window.innerWidth, e.height = window.innerHeight, e.width = window.innerWidth), e;
    }

    function S(t, e, o) {
      var n = r(Array.from(t.children)),
          t = n.indexOf(e);
      if (-1 < t) return o ? n[t] : {
        index: t,
        el: n[t],
        rect: E(n[t]),
        offset: b(n[t])
      };

      for (var i = 0; i < n.length; i++) if (function (t, e) {
        var o;
        if (t && e) for (o = t.parentNode; o;) {
          if (e === o) return 1;
          o = o.parentNode;
        }
        return;
      }(e, n[i])) return o ? n[i] : {
        index: i,
        el: n[i],
        rect: E(n[i]),
        offset: b(n[i])
      };

      return o ? null : {
        index: -1,
        el: null,
        rect: {},
        offset: {}
      };
    }

    function _(t, e, o) {
      var n;
      t && e && (t.classList ? t.classList[o ? "add" : "remove"](e) : (n = (" " + t.className + " ").replace(u, " ").replace(" " + e + " ", " "), t.className = (n + (o ? " " + e : "")).replace(u, " ")));
    }

    function D(t, e, o) {
      var n = t && t.style;

      if (n) {
        if (void 0 === o) return document.defaultView && document.defaultView.getComputedStyle ? o = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (o = t.currentStyle), void 0 === e ? o : o[e];
        n[e = e in n || -1 !== e.indexOf("webkit") ? e : "-webkit-" + e] = o + ("string" == typeof o ? "" : "px");
      }
    }

    var x = function () {
      function t() {
        o(this, t), this.from = {
          node: null,
          rect: {},
          offset: {}
        }, this.to = {
          node: null,
          rect: {},
          offset: {}
        };
      }

      return i(t, [{
        key: "get",
        value: function (t) {
          return this[t];
        }
      }, {
        key: "set",
        value: function (t, e) {
          this[t] = e;
        }
      }, {
        key: "destroy",
        value: function () {
          this.from = {
            node: null,
            rect: {},
            offset: {}
          }, this.to = {
            node: null,
            rect: {},
            offset: {}
          };
        }
      }]), t;
    }(),
        $ = function () {
      function e(t) {
        o(this, e), this.options = t, this.diff = {
          x: 0,
          y: 0
        }, this.position = {
          x: 0,
          y: 0
        }, this.exist = !1;
      }

      return i(e, [{
        key: "init",
        value: function (t, e) {
          var o, n;
          this.$el && this.$el.remove(), t && (this.$el = t, o = (t = this.options).ghostClass, t = void 0 === (t = t.ghostStyle) ? {} : t, n = e.width, e = e.height, this.$el.class = o, this.$el.style.width = n + "px", this.$el.style.height = e + "px", this.$el.style.position = "fixed", this.$el.style.left = 0, this.$el.style.top = 0, this.$el.style.zIndex = 1e5, this.$el.style.opacity = .8, this.$el.style.pointerEvents = "none", this.$el.style.cursor = "move", m(this.$el, "none"), g(this.$el, "translate3d(0px, 0px, 0px)"), this.setStyle(t));
        }
      }, {
        key: "setPosition",
        value: function (t, e) {
          this.position = {
            x: t - this.diff.x,
            y: e - this.diff.y
          };
        }
      }, {
        key: "setStyle",
        value: function (t) {
          for (var e in t) D(this.$el, e, t[e]);
        }
      }, {
        key: "rect",
        value: function () {
          return E(this.$el);
        }
      }, {
        key: "move",
        value: function (t) {
          var e;
          this.$el && (e = this.options.ghostAnimation, m(this.$el, t ? "".concat(e, "ms") : "none"), this.exist || (document.body.appendChild(this.$el), this.exist = !0), g(this.$el, "translate3d(".concat(this.position.x, "px, ").concat(this.position.y, "px, 0)")), "move" !== this.$el.style.cursor && (this.$el.style.cursor = "move"));
        }
      }, {
        key: "destroy",
        value: function (t) {
          var e = this,
              t = (t && (this.position = {
            x: t.left,
            y: t.top
          }, this.move(!0)), this.options.ghostAnimation);
          t ? setTimeout(function () {
            return e.clear();
          }, t) : this.clear();
        }
      }, {
        key: "clear",
        value: function () {
          this.$el && this.$el.remove(), this.$el = null, this.diff = {
            x: 0,
            y: 0
          }, this.position = {
            x: 0,
            y: 0
          }, this.exist = !1;
        }
      }]), e;
    }();

    function P() {
      var i = [];
      return {
        captureAnimationState: function () {
          var t = r(Array.from(this.$el.children)),
              e = (o = t, n = this.dragEl, e = this.dropEl, n = o.indexOf(n), o = o.indexOf(e), n < o ? {
            start: n,
            end: o
          } : {
            start: o,
            end: n
          }),
              o = e.start,
              n = e.end;
          i.length = 0, t.slice(o, n + 1).forEach(function (t) {
            i.push({
              target: t,
              rect: E(t)
            });
          });
        },
        animateRange: function () {
          var o = this;
          i.forEach(function (t) {
            var e = t.target,
                t = t.rect;
            o.animate(e, t, o.animation);
          });
        },
        animate: function (t, e) {
          var o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 150,
              n = E(t),
              i = e.left - n.left,
              e = e.top - n.top;
          m(t, "none"), g(t, "translate3d(".concat(i, "px, ").concat(e, "px, 0)")), t.offsetLeft, m(t, "".concat(o, "ms")), g(t, "translate3d(0px, 0px, 0px)"), clearTimeout(t.animated), t.animated = setTimeout(function () {
            m(t, ""), g(t, ""), t.animated = null;
          }, o);
        }
      };
    }

    var M = "undefined" != typeof document && !h && !e && "draggable" in document.createElement("div");

    function O(t, e) {
      if (!t || !t.nodeType || 1 !== t.nodeType) throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
      this.$el = t, this.options = e = Object.assign({}, e), this.dragEl = null, this.dropEl = null, this.differ = null, this.ghost = null;
      var o,
          n,
          i = {
        delay: 0,
        delayOnTouchOnly: !1,
        disabled: !1,
        animation: 150,
        ghostAnimation: 0,
        ghostClass: "",
        ghostStyle: {},
        chosenClass: "",
        draggable: void 0,
        dragging: void 0,
        onDrag: void 0,
        onMove: void 0,
        onDrop: void 0,
        onChange: void 0,
        forceFallback: !1,
        stopPropagation: !1,
        supportPassive: (o = !1, document.addEventListener("checkIfSupportPassive", null, {
          get passive() {
            return o = !0;
          }

        }), o),
        supportPointer: "PointerEvent" in window && !f,
        supportTouch: "ontouchstart" in window,
        ownerDocument: this.$el.ownerDocument
      };

      for (n in i) n in this.options || (this.options[n] = i[n]);

      this.nativeDraggable = !this.options.forceFallback && M, this.differ = new x(), this.ghost = new $(this.options), Object.assign(this, P(), {
        _bindEventListener: function () {
          this._onStart = this._onStart.bind(this), this._onMove = this._onMove.bind(this), this._onDrop = this._onDrop.bind(this);
          var t = this.options,
              e = t.supportPointer,
              o = t.supportTouch,
              t = t.supportPassive;
          w(this.$el, e ? "pointerdown" : o ? "touchstart" : "mousedown", this._onStart, t);
        },
        _unbindEventListener: function () {
          var t = this.options.supportPassive;
          y(this.$el, "pointerdown", this._onStart, t), y(this.$el, "touchstart", this._onStart, t), y(this.$el, "mousedown", this._onStart, t);
        },
        _bindMoveEvents: function (t) {
          var e = this.options,
              o = e.supportPointer,
              n = e.ownerDocument,
              e = e.supportPassive;
          w(n, o ? "pointermove" : t ? "touchmove" : "mousemove", this._onMove, e);
        },
        _bindUpEvents: function () {
          var t = this.options,
              e = t.ownerDocument,
              t = t.supportPassive;
          w(e, "pointerup", this._onDrop, t), w(e, "pointercancel", this._onDrop, t), w(e, "touchend", this._onDrop, t), w(e, "touchcancel", this._onDrop, t), w(e, "mouseup", this._onDrop, t);
        },
        _unbindMoveEvents: function () {
          var t = this.options,
              e = t.ownerDocument,
              t = t.supportPassive;
          y(e, "pointermove", this._onMove, t), y(e, "touchmove", this._onMove, t), y(e, "mousemove", this._onMove, t);
        },
        _unbindUpEvents: function () {
          var t = this.options,
              e = t.ownerDocument,
              t = t.supportPassive;
          y(e, "pointerup", this._onDrop, t), y(e, "pointercancel", this._onDrop, t), y(e, "touchend", this._onDrop, t), y(e, "touchcancel", this._onDrop, t), y(e, "mouseup", this._onDrop, t);
        }
      }), this._bindEventListener(), this._handleDestroy();
    }

    return O.prototype = {
      constructor: O,
      destroy: function () {
        this._unbindEventListener(), this._resetState();
      },
      _onStart: function (t) {
        var e = this.options,
            o = e.delay,
            n = e.disabled,
            i = e.stopPropagation,
            e = e.delayOnTouchOnly;

        if (!(/mousedown|pointerdown/.test(t.type) && 0 !== t.button || n)) {
          var n = t.touches && t.touches[0] || t.pointerType && "touch" === t.pointerType && t,
              r = n || t;

          if (this.nativeDraggable || !f || !r.target || "SELECT" !== r.target.tagName.toUpperCase()) {
            if (r.target === this.$el) return !0;
            i && t.stopPropagation(), !o || e && !n || this.nativeDraggable && (l || a) ? this._onDrag(r, n) : this.dragStartTimer = setTimeout(this._onDrag(r, n), o);
          }
        }
      },
      _onDrag: function (t, e) {
        var o = this.options,
            n = o.draggable,
            o = o.dragging;

        if ("function" == typeof n) {
          if (!n(t)) return !0;
        } else if ("string" == typeof n) {
          if (!function (t, e) {
            if (e && (">" === e[0] && (e = e.substring(1)), t)) try {
              if (t.matches) return t.matches(e);
              if (t.msMatchesSelector) return t.msMatchesSelector(e);
              if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
            } catch (t) {
              return;
            }
          }(t.target, n)) return !0;
        } else if (void 0 !== n) throw new Error('draggable expected "function" or "string" but received "'.concat(d(n), '"'));

        try {
          document.selection ? setTimeout(function () {
            document.selection.empty();
          }, 0) : window.getSelection().removeAllRanges();
        } catch (t) {
          throw new Error(t);
        }

        if (o) {
          if ("function" != typeof o) throw new Error('dragging expected "function" or "string" but received "'.concat(d(o), '"'));
          this.dragEl = o(t);
        } else this.dragEl = S(this.$el, t.target, !0);

        if (!this.dragEl || this.dragEl.animated) return !0;
        n = S(this.$el, this.dragEl), o = n.rect, n = n.offset;
        window.sortableDndOnDownState = !0, this.ghost.setPosition(o.left, o.top), this.ghost.diff = {
          x: t.clientX - o.left,
          y: t.clientY - o.top
        }, this.differ.from = {
          node: this.dragEl,
          rect: o,
          offset: n
        }, this._bindMoveEvents(e), this._bindUpEvents(e);
      },
      _onMove: function (t) {
        void 0 !== t.preventDefault && t.preventDefault();
        var e = this.options,
            o = e.chosenClass,
            n = e.stopPropagation,
            i = e.onMove,
            e = e.onDrag,
            n = (n && t.stopPropagation(), t.touches && t.touches[0]),
            r = n || t,
            s = r.clientX,
            a = r.clientY,
            n = n ? document.elementFromPoint(s, a) : r.target;

        if (!this.ghost.$el && (this.ghost.init(this.dragEl.cloneNode(!0), this.differ.from.rect), void 0 !== e)) {
          if ("function" != typeof e) throw new Error('onDrag expected "function" but received "'.concat(d(e), '"'));
          e(this.dragEl, r, t);
        }

        if (void 0 !== i) {
          if ("function" != typeof i) throw new Error('onMove expected "function" but received "'.concat(d(i), '"'));
          i(this.differ.from, this.ghost.$el, r, t);
        }

        if (_(this.dragEl, o, !0), this.ghost.move(), window.sortableDndOnDownState && !(s < 0 || a < 0)) {
          window.sortableDndOnMoveState = !0, this.ghost.setPosition(s, a), this.ghost.move();
          e = E(this.$el);
          if (s < e.left || s > e.right || a < e.top || a > e.bottom) this.ghost.setStyle({
            cursor: "not-allowed"
          });else {
            var i = S(this.$el, n),
                o = i.index,
                e = i.el,
                n = i.rect,
                i = i.offset,
                l = n.left,
                f = n.right,
                h = n.top,
                c = n.bottom;

            if (e && !(o < 0) && (this.dropEl = e, l < s && s < f && h < a && a < c && e !== this.dragEl && (this.differ.to = {
              node: this.dropEl,
              rect: n,
              offset: i
            }, !e.animated))) {
              this.captureAnimationState();
              o = this.options.onChange, l = b(this.dragEl);

              if (void 0 !== o) {
                if ("function" != typeof o) throw new Error('onChange expected "function" but received "'.concat(d(o), '"'));
                o(this.differ.from, this.differ.to, r, t);
              }

              l.top < i.top || l.left < i.left ? this.$el.insertBefore(this.dragEl, e.nextElementSibling) : this.$el.insertBefore(this.dragEl, e), this.animateRange();
            }
          }
        }
      },
      _onDrop: function (t) {
        this._unbindMoveEvents(), this._unbindUpEvents(), clearTimeout(this.dragStartTimer);
        var e = this.options,
            o = e.onDrop,
            n = e.chosenClass;

        if (e.stopPropagation && t.stopPropagation(), _(this.dragEl, n, !1), window.sortableDndOnDownState && window.sortableDndOnMoveState) {
          this.differ.to.offset = b(this.dragEl), this.differ.to.rect = E(this.dragEl);
          e = this.differ, n = e.from, e = e.to, n = n.offset.top !== e.offset.top || n.offset.left !== e.offset.left;

          if (void 0 !== o) {
            if ("function" != typeof o) throw new Error('onDrop expected "function" but received "'.concat(d(o), '"'));
            o(n, t);
          }

          this.ghost.destroy(E(this.dragEl));
        }

        this.differ.destroy(), this._removeWindowState();
      },
      _resetState: function () {
        this.dragEl = null, this.dropEl = null, this.ghost.destroy(), this.differ.destroy(), this._removeWindowState();
      },
      _removeWindowState: function () {
        window.sortableDndOnDownState = null, window.sortableDndOnMoveState = null, window.sortableDndAnimationEnd = null, delete window.sortableDndOnDownState, delete window.sortableDndOnMoveState, delete window.sortableDndAnimationEnd;
      },
      _handleDestroy: function () {
        var t = this,
            e = null,
            o = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

        if (o) {
          var n = this.options.ownerDocument;
          if (!n) return;
          (e = new o(function () {
            n.body.contains(t.$el) || (e.disconnect(), e = null, t._unbindEventListener(), t._resetState());
          })).observe(this.$el.parentNode, {
            childList: !0,
            attributes: !1,
            subtree: !1
          });
        }

        window.onbeforeunload = function () {
          e && e.disconnect(), e = null, t._unbindEventListener(), t._resetState();
        };
      }
    }, O;
  });
  });

  class DragState {
      from;
      to;
      constructor() {
          this.from = { key: null, item: null, index: null };
          this.to = { key: null, item: null, index: null };
      }
  }
  class Sortable {
      getKey;
      onDrag;
      onDrop;
      dragState;
      dragKey;
      dragElement;
      drag;
      options;
      cloneList;
      dataSource;
      rangeIsChanged;
      constructor(options, onDrag, onDrop) {
          this.options = options;
          this.onDrag = onDrag;
          this.onDrop = onDrop;
          this.getKey = options.getKey;
          this.dragState = new DragState;
          this.dataSource = options.dataSource;
          this.cloneList = [];
          this.rangeIsChanged = false;
          this.init();
      }
      set(key, value) {
          this[key] = value;
      }
      init() {
          this.destroy();
          this.drag = new sortable_min(this.options.scrollEl, {
              disabled: this.options.disabled,
              draggable: this.options.draggable,
              dragging: this.options.dragging,
              ghostStyle: this.options.ghostStyle,
              ghostClass: this.options.ghostClass,
              chosenClass: this.options.chosenClass,
              animation: this.options.animation,
              onDrag: (dragEl) => {
                  this.dragElement = dragEl;
                  this.cloneList = [...this.dataSource];
                  this.dragKey = dragEl.getAttribute('data-key');
                  this.dataSource.forEach((item, index) => {
                      const key = this.getKey(item);
                      if (key == this.dragKey)
                          Object.assign(this.dragState.from, { item, index, key });
                  });
                  this.rangeIsChanged = false;
                  this.onDrag(this.dragKey, this.rangeIsChanged);
              },
              onChange: (_old_, _new_) => {
                  const oldKey = this.dragState.from.key;
                  const newKey = _new_.node.getAttribute('data-key');
                  this.dragState.to.key = newKey;
                  const from = { item: null, index: -1 };
                  const to = { item: null, index: -1 };
                  this.cloneList.forEach((el, index) => {
                      const key = this.getKey(el);
                      if (key == oldKey)
                          Object.assign(from, { item: el, index });
                      if (key == newKey)
                          Object.assign(to, { item: el, index });
                  });
                  this.cloneList.splice(from.index, 1);
                  this.cloneList.splice(to.index, 0, from.item);
              },
              onDrop: (changed) => {
                  const index = this.cloneList.findIndex(el => this.getKey(el) == this.dragState.from.key);
                  const item = this.dataSource[index];
                  this.dragState.to = { item, index, key: this.getKey(item) };
                  if (this.rangeIsChanged && this.dragElement)
                      this.dragElement.remove();
                  const { from, to } = this.dragState;
                  this.onDrop(this.cloneList, from, to, changed);
                  this.dataSource = [...this.cloneList];
                  this.rangeIsChanged = false;
                  this.dragElement = null;
              }
          });
      }
      destroy() {
          this.drag && this.drag.destroy();
          delete this.drag;
      }
  }

  const CALLBACKS = { top: 'v-top', bottom: 'v-bottom', dragend: 'v-dragend' }; // 组件传入的事件回调
  function VirtualDragList(props, ref) {
      const { header, footer, children, dataSource = [], dataKey, direction = 'vertical', keeps = 30, size = 50, height = '100%', delay = 0, wrapTag = 'div', rootTag = 'div', itemTag = 'div', headerTag = 'div', footerTag = 'div', itemStyle = {}, itemClass = '', rootStyle = {}, rootClass = '', wrapStyle = {}, wrapClass = '', disabled = false, draggable = undefined, dragging = undefined, ghostClass = '', ghostStyle = {}, chosenClass = '', animation = 150 } = props;
      // =============================== State ===============================
      const [list, setList] = React.useState([]);
      const cloneList = React.useRef([]);
      const uniqueKeys = React.useRef([]);
      const [range, setRange] = React.useState({ start: 0, end: keeps - 1, front: 0, behind: 0 }); // 当前可见范围
      const [drag, setDrag] = React.useState({ key: null, changed: false });
      const root_ref = React.useRef(null);
      const wrap_ref = React.useRef(null); // 列表ref
      const last_ref = React.useRef(null); // 列表元素外的dom，总是存在于列表最后
      const sortable = React.useRef(null);
      const virtual = React.useRef(new Virtual({
          size,
          keeps,
          uniqueKeys: uniqueKeys.current,
          isHorizontal: direction === 'vertical'
      }, (range) => {
          setRange(() => range);
          setDrag((pre) => { return { ...pre, changed: true }; });
          sortable.current.set('rangeIsChanged', true);
      }));
      // =============================== ref methods ===============================
      /**
       * reset component
       */
      const reset = () => {
          scrollToTop();
          setList(() => [...dataSource]);
          cloneList.current = [...dataSource];
      };
      /**
       * git item size by data-key
       * @param {String | Number} key data-key
       */
      const getSize = (key) => {
          return virtual.current.sizes.get(key);
      };
      /**
       * Get the current scroll height
       */
      const getOffset = () => {
          const root = root_ref.current;
          return root ? Math.ceil(root[scrollDirectionKey]) : 0;
      };
      /**
       * Scroll to the specified offset
       * @param {Number} offset
       */
      const scrollToOffset = (offset) => {
          root_ref.current[scrollDirectionKey] = offset;
      };
      /**
       * Scroll to the specified index position
       * @param {Number} index
       */
      const scrollToIndex = (index) => {
          if (index >= dataSource.length - 1) {
              scrollToBottom();
          }
          else {
              const indexOffset = virtual.current.getOffsetByIndex(index);
              scrollToOffset(indexOffset);
              setTimeout(() => {
                  const offset = getOffset();
                  const indexOffset = virtual.current.getOffsetByIndex(index);
                  if (offset !== indexOffset)
                      scrollToIndex(index);
              }, 5);
          }
      };
      /**
       * Scroll to top of list
       */
      const scrollToTop = () => {
          root_ref.current[scrollDirectionKey] = 0;
      };
      /**
       * Scroll to bottom of list
       */
      const scrollToBottom = () => {
          if (last_ref.current) {
              const offset = last_ref.current[offsetSizeKey];
              root_ref.current[scrollDirectionKey] = offset;
              // 第一次滚动高度可能会发生改变，如果没到底部再执行一次滚动方法
              setTimeout(() => {
                  const root = root_ref.current;
                  const offset = getOffset();
                  const clientSize = Math.ceil(root[clientSizeKey]);
                  const scrollSize = Math.ceil(root[scrollSizeKey]);
                  if (offset + clientSize < scrollSize)
                      scrollToBottom();
              }, 5);
          }
      };
      React__default["default"].useImperativeHandle(ref, () => ({
          reset,
          getSize,
          getOffset,
          scrollToTop,
          scrollToIndex,
          scrollToOffset,
          scrollToBottom,
      }));
      // =============================== init ===============================
      React.useEffect(() => {
          cloneList.current = [...dataSource];
          setUniqueKeys();
          virtual.current.updateUniqueKeys(uniqueKeys.current);
          virtual.current.updateSizes(uniqueKeys.current);
          virtual.current.updateRange();
          if (sortable.current)
              sortable.current.set('dataSource', dataSource);
          setList(() => [...dataSource]);
      }, [dataSource]);
      React.useEffect(() => {
          return () => {
              destroyDraggable();
          };
      }, []);
      React.useLayoutEffect(() => {
          if (draggable) {
              initDraggable();
          }
          else {
              destroyDraggable();
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [draggable]);
      // =============================== sortable ===============================
      const initDraggable = () => {
          destroyDraggable();
          sortable.current = new Sortable({
              getKey,
              scrollEl: wrap_ref.current,
              dataSource: cloneList.current,
              disabled,
              draggable,
              dragging,
              ghostStyle,
              ghostClass,
              chosenClass,
              animation,
          }, (key, changed) => {
              setDrag(() => { return { key, changed }; });
          }, (list, from, to, changed) => {
              const callback = props[CALLBACKS.dragend];
              callback && callback(list, from, to, changed);
              setDrag(() => { return { key: null, changed: false }; });
              if (changed) {
                  cloneList.current = [...list];
                  setList(() => [...list]);
                  setUniqueKeys();
              }
          });
      };
      const destroyDraggable = () => {
          sortable.current && sortable.current.destroy();
          sortable.current = null;
      };
      // =============================== methods ===============================
      const setUniqueKeys = () => {
          uniqueKeys.current = cloneList.current.map(item => getKey(item));
      };
      const getItemIndex = (item) => {
          return cloneList.current.findIndex(el => getKey(el) === getKey(item));
      };
      // 获取 item 中的 dateKey 值
      const getKey = React__default["default"].useCallback((item) => {
          return (dataKey.replace(/\[/g, '.').replace(/\]/g, '').split('.').reduce((o, k) => (o || {})[k], item));
      }, [dataKey]);
      const { scrollSizeKey, scrollDirectionKey, offsetSizeKey, clientSizeKey } = React__default["default"].useMemo(() => {
          const isHorizontal = direction !== 'vertical';
          return {
              offsetSizeKey: isHorizontal ? 'offsetLeft' : 'offsetTop',
              scrollSizeKey: isHorizontal ? 'scrollWidth' : 'scrollHeight',
              clientSizeKey: isHorizontal ? 'clientWidth' : 'clientHeight',
              scrollDirectionKey: isHorizontal ? 'scrollLeft' : 'scrollTop',
          };
      }, [direction]);
      // =============================== Scroll ===============================
      const handleScroll = (e) => {
          const root = root_ref.current;
          const offset = getOffset();
          const clientSize = Math.ceil(root[clientSizeKey]);
          const scrollSize = Math.ceil(root[scrollSizeKey]);
          // 如果不存在滚动元素 | 滚动高度小于0 | 超出最大滚动距离
          if (offset < 0 || (offset + clientSize > scrollSize + 1) || !scrollSize)
              return;
          virtual.current.handleScroll(offset);
          // 判断当前应该触发的回调函数，滚动到顶部时触发 `v-top`，滚动到底部时触发 `v-bottom`
          if (virtual.current.isFront()) {
              if (!!dataSource.length && offset <= 0)
                  handleToTop(props);
          }
          else if (virtual.current.isBehind()) {
              if (clientSize + offset >= scrollSize)
                  handleToBottom(props);
          }
      };
      const handleToTop = debounce(function (props) {
          const callback = props[CALLBACKS.top];
          callback && callback();
      });
      const handleToBottom = debounce(function (props) {
          const callback = props[CALLBACKS.bottom];
          callback && callback();
      });
      // ======================= size observe =======================
      const onItemSizeChange = (key, size) => {
          virtual.current.handleItemSizeChange(key, size);
      };
      const onSlotSizeChange = (key, size) => {
          if (key === 'header')
              virtual.current.handleHeaderSizeChange(size);
          if (key === 'footer')
              virtual.current.handleFooterSizeChange(size);
      };
      // ================================ Render ================================
      const { start, end, front, behind } = React__default["default"].useMemo(() => {
          return { ...range };
      }, [range]);
      const { dragKey, rangeIsChanged } = React__default["default"].useMemo(() => {
          return {
              dragKey: drag.key,
              rangeIsChanged: drag.changed
          };
      }, [drag]);
      const RootStyle = { ...rootStyle, height, overflow: direction !== 'vertical' ? 'auto hidden' : 'hidden auto' };
      const WrapStyle = { ...wrapStyle, padding: direction !== 'vertical' ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px` };
      const WrapTag = wrapTag;
      const RootTag = rootTag;
      return (React__default["default"].createElement(RootTag, { ref: root_ref, className: rootClass, style: RootStyle, onScroll: debounce(handleScroll, delay) },
          React__default["default"].createElement(Slot, { children: header, roleId: "header", Tag: headerTag, onSizeChange: onSlotSizeChange }),
          React__default["default"].createElement(WrapTag, { ref: wrap_ref, "v-role": "content", className: wrapClass, style: WrapStyle }, list.slice(start, end + 1).map(item => {
              const key = getKey(item);
              const index = getItemIndex(item);
              const hidden = key == dragKey && rangeIsChanged;
              return (React__default["default"].createElement(Item, { key: key, Tag: itemTag, record: item, index: index, dataKey: key, children: children, Class: itemClass, Style: { ...itemStyle, display: hidden ? 'none' : '' }, onSizeChange: onItemSizeChange }));
          })),
          React__default["default"].createElement(Slot, { children: footer, roleId: "footer", Tag: footerTag, onSizeChange: onSlotSizeChange }),
          React__default["default"].createElement("div", { ref: last_ref })));
  }
  var index = React__default["default"].forwardRef(VirtualDragList);

  exports.VirtualDragList = VirtualDragList;
  exports["default"] = index;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
