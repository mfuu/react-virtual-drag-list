/*!
 * react-virtual-drag-list v2.4.3
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

  class DragState {
      from;
      to;
      constructor() {
          this.from = { key: null, item: null, index: -1 };
          this.to = { key: null, item: null, index: -1 };
      }
  }
  class CalcSize {
      average; // 计算首次加载每一项的评价高度
      total; // 首次加载的总高度
      fixed; // 记录固定高度值
      header; // 顶部插槽高度
      footer; // 底部插槽高度
      constructor() {
          this.average = undefined;
          this.total = undefined;
          this.fixed = undefined;
          this.header = undefined;
          this.footer = undefined;
      }
  }
  class Range {
      start;
      end;
      front;
      behind;
      constructor() {
          this.start = 0;
          this.end = 0;
          this.front = 0;
          this.behind = 0;
      }
  }

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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var sortable_min = createCommonjsModule(function (module, exports) {
  !function (t, e) {
    module.exports = e() ;
  }(commonjsGlobal, function () {

    function i(t) {
      return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
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

    function r(t, e, o) {
      return e && n(t.prototype, e), o && n(t, o), Object.defineProperty(t, "prototype", {
        writable: !1
      }), t;
    }

    function s(t) {
      return function (t) {
        if (Array.isArray(t)) return a(t);
      }(t) || function (t) {
        if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t);
      }(t) || function (t, e) {
        if (t) {
          if ("string" == typeof t) return a(t, e);
          var o = Object.prototype.toString.call(t).slice(8, -1);
          return "Map" === (o = "Object" === o && t.constructor ? t.constructor.name : o) || "Set" === o ? Array.from(t) : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? a(t, e) : void 0;
        }
      }(t) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }

    function a(t, e) {
      (null == e || e > t.length) && (e = t.length);

      for (var o = 0, n = new Array(e); o < e; o++) n[o] = t[o];

      return n;
    }

    function t(t) {
      if ("undefined" != typeof window && window.navigator) return !!navigator.userAgent.match(t);
    }

    var e,
        l = t(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
        c = t(/Edge/i),
        h = t(/safari/i) && !t(/chrome/i) && !t(/android/i),
        u = t(/iP(ad|od|hone)/i),
        f = t(/chrome/i) && t(/android/i),
        d = {
      capture: !1,
      passive: !1
    },
        p = /\s+/g,
        m = ["-webkit-transition", "-moz-transition", "-ms-transition", "-o-transition", "transition"],
        g = ["-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform", "transform"],
        v = (e = !1, document.addEventListener("checkIfSupportPassive", null, {
      get passive() {
        return e = !0;
      }

    }), e);

    function y(e, o) {
      o ? "none" === o ? m.forEach(function (t) {
        return M(e, t, "none");
      }) : m.forEach(function (t) {
        return M(e, t, "".concat(t.split("transition")[0], "transform ").concat(o));
      }) : m.forEach(function (t) {
        return M(e, t, "");
      });
    }

    function w(e, o) {
      o ? g.forEach(function (t) {
        return M(e, t, "".concat(t.split("transform")[0]).concat(o));
      }) : g.forEach(function (t) {
        return M(e, t, "");
      });
    }

    function b(t, e, o) {
      window.addEventListener ? t.addEventListener(e, o, !(!v && l) && d) : window.attachEvent && t.attachEvent("on" + e, o);
    }

    function E(t, e, o) {
      window.removeEventListener ? t.removeEventListener(e, o, !(!v && l) && d) : window.detachEvent && t.detachEvent("on" + e, o);
    }

    function S(t) {
      for (var e = {
        top: 0,
        left: 0,
        height: 0,
        width: 0
      }, o = (e.height = t.offsetHeight, e.width = t.offsetWidth, e.top = t.offsetTop, e.left = t.offsetLeft, t.offsetParent); null !== o;) e.top += o.offsetTop, e.left += o.offsetLeft, o = o.offsetParent;

      return e;
    }

    function _(t, e) {
      if (!t || !t.getBoundingClientRect) return D();
      var o = t,
          n = !1;

      do {
        if (o.clientWidth < o.scrollWidth || o.clientHeight < o.scrollHeight) {
          var i = M(o);

          if (o.clientWidth < o.scrollWidth && ("auto" == i.overflowX || "scroll" == i.overflowX) || o.clientHeight < o.scrollHeight && ("auto" == i.overflowY || "scroll" == i.overflowY)) {
            if (!o.getBoundingClientRect || o === document.body) return D();
            if (n || e) return o;
            n = !0;
          }
        }
      } while (o = o.parentNode);

      return D();
    }

    function D() {
      var t = document.scrollingElement;
      return !t || t.contains(document.body) ? document : t;
    }

    function T(t) {
      var e;
      if (t.getBoundingClientRect || t === window) return e = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 0,
        width: 0
      }, t !== window && t.parentNode && t !== D() ? (t = t.getBoundingClientRect(), e.top = t.top, e.left = t.left, e.bottom = t.bottom, e.right = t.right, e.height = t.height, e.width = t.width) : (e.top = 0, e.left = 0, e.bottom = window.innerHeight, e.right = window.innerWidth, e.height = window.innerHeight, e.width = window.innerWidth), e;
    }

    function x(t, e, o) {
      var n = s(Array.from(t.children)),
          t = n.indexOf(e);
      if (-1 < t) return o ? n[t] : {
        index: t,
        el: n[t],
        rect: T(n[t]),
        offset: S(n[t])
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
        rect: T(n[i]),
        offset: S(n[i])
      };

      return o ? null : {
        index: -1,
        el: null,
        rect: {},
        offset: {}
      };
    }

    function $(t, e, o) {
      var n;
      t && e && (t.classList ? t.classList[o ? "add" : "remove"](e) : (n = (" " + t.className + " ").replace(p, " ").replace(" " + e + " ", " "), t.className = (n + (o ? " " + e : "")).replace(p, " ")));
    }

    function M(t, e, o) {
      var n = t && t.style;

      if (n) {
        if (void 0 === o) return document.defaultView && document.defaultView.getComputedStyle ? o = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (o = t.currentStyle), void 0 === e ? o : o[e];
        n[e = e in n || -1 !== e.indexOf("webkit") ? e : "-webkit-" + e] = o + ("string" == typeof o ? "" : "px");
      }
    }

    function k(o, n, i) {
      var r = null;
      return function () {
        var t = this,
            e = arguments;
        r && clearTimeout(r), i && !r && o.apply(t, e), r = setTimeout(function () {
          o.apply(t, e);
        }, n);
      };
    }

    function P(o, n) {
      var i = null;
      return function () {
        var t = this,
            e = arguments;
        i = i || setTimeout(function () {
          i = null, o.apply(t, e);
        }, n);
      };
    }

    var A = r(function t() {
      o(this, t), this.sortableDown = void 0, this.sortableMove = void 0, this.animationEnd = void 0;
    }),
        C = function () {
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

      return r(t, [{
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
        L = function () {
      function e(t) {
        o(this, e), this.$el = null, this.distance = {
          x: 0,
          y: 0
        }, this.options = t.options, this.container = t.container;
      }

      return r(e, [{
        key: "init",
        value: function (t, e) {
          this.$el = t;
          var t = this.options,
              o = t.ghostClass,
              t = t.ghostStyle,
              t = void 0 === t ? {} : t;
          $(this.$el, o, !0), M(this.$el, "box-sizing", "border-box"), M(this.$el, "margin", 0), M(this.$el, "top", e.top), M(this.$el, "left", e.left), M(this.$el, "width", e.width), M(this.$el, "height", e.height), M(this.$el, "opacity", "0.8"), M(this.$el, "position", "fixed"), M(this.$el, "zIndex", "100000"), M(this.$el, "pointerEvents", "none"), this.setStyle(t), y(this.$el, "none"), w(this.$el, "translate3d(0px, 0px, 0px)"), this.container.appendChild(this.$el), M(this.$el, "transform-origin", this.distance.x / parseInt(this.$el.style.width) * 100 + "% " + this.distance.y / parseInt(this.$el.style.height) * 100 + "%");
        }
      }, {
        key: "setStyle",
        value: function (t) {
          for (var e in t) M(this.$el, e, t[e]);
        }
      }, {
        key: "rect",
        value: function () {
          return T(this.$el);
        }
      }, {
        key: "move",
        value: function (t, e) {
          this.$el && (y(this.$el, 2 < arguments.length && void 0 !== arguments[2] && arguments[2] ? "".concat(this.options.ghostAnimation, "ms") : "none"), w(this.$el, "translate3d(".concat(t, "px, ").concat(e, "px, 0)")));
        }
      }, {
        key: "destroy",
        value: function (t) {
          var e,
              o,
              n = this;
          this.$el && (o = parseInt(this.$el.style.left), e = parseInt(this.$el.style.top), this.move(t.left - o, t.top - e, !0), (o = this.options.ghostAnimation) ? setTimeout(function () {
            return n.clear();
          }, o) : this.clear());
        }
      }, {
        key: "clear",
        value: function () {
          this.$el && this.$el.remove(), this.distance = {
            x: 0,
            y: 0
          }, this.$el = null;
        }
      }]), e;
    }();

    function O() {
      var i = [];
      return {
        captureAnimationState: function () {
          var t = s(Array.from(this.rootEl.children)),
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
              rect: T(t)
            });
          });
        },
        animateRange: function () {
          var o = this;
          i.forEach(function (t) {
            var e = t.target,
                t = t.rect;
            o.animate(e, t, o.options.animation);
          });
        },
        animate: function (t, e) {
          var o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 150,
              n = T(t),
              i = e.left - n.left,
              e = e.top - n.top;
          y(t, "none"), w(t, "translate3d(".concat(i, "px, ").concat(e, "px, 0)")), t.offsetLeft, y(t, "".concat(o, "ms")), w(t, "translate3d(0px, 0px, 0px)"), clearTimeout(t.animated), t.animated = setTimeout(function () {
            y(t, ""), w(t, ""), t.animated = null;
          }, o);
        }
      };
    }

    var I = "undefined" != typeof document && !f && !u && "draggable" in document.createElement("div");

    function H(t, e) {
      if (!t || !t.nodeType || 1 !== t.nodeType) throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
      this.rootEl = t, this.scrollEl = _(t, !0), this.options = e = Object.assign({}, e), this.ownerDocument = t.ownerDocument;
      var o,
          n = {
        autoScroll: !0,
        scrollStep: 5,
        scrollThreshold: 15,
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
        fallbackOnBody: !1,
        forceFallback: !1,
        stopPropagation: !1,
        supportPointer: "PointerEvent" in window && !h,
        supportTouch: "ontouchstart" in window
      };

      for (o in n) o in this.options || (this.options[o] = n[o]);

      this.container = this.options.fallbackOnBody ? document.body : this.rootEl, this.nativeDraggable = !this.options.forceFallback && I, this.move = {
        x: 0,
        y: 0
      }, this.state = new A(), this.differ = new C(), this.ghost = new L(this), this.dragEl = null, this.dropEl = null, this.dragStartTimer = null, this.autoScrollTimer = null, Object.assign(this, O(), {
        _bindEventListener: function () {
          var t = this.options,
              e = t.supportPointer,
              t = t.supportTouch;
          b(this.rootEl, e ? "pointerdown" : t ? "touchstart" : "mousedown", this._onStart);
        },
        _unbindEventListener: function () {
          E(this.rootEl, "pointerdown", this._onStart), E(this.rootEl, "touchstart", this._onStart), E(this.rootEl, "mousedown", this._onStart);
        },
        _bindMoveEvents: function (t) {
          this.options.supportPointer ? b(this.ownerDocument, "pointermove", this._onMove) : b(this.ownerDocument, t ? "touchmove" : "mousemove", this._onMove);
        },
        _bindUpEvents: function () {
          b(this.ownerDocument, "pointerup", this._onDrop), b(this.ownerDocument, "pointercancel", this._onDrop), b(this.ownerDocument, "touchend", this._onDrop), b(this.ownerDocument, "touchcancel", this._onDrop), b(this.ownerDocument, "mouseup", this._onDrop);
        },
        _unbindMoveEvents: function () {
          E(this.ownerDocument, "pointermove", this._onMove), E(this.ownerDocument, "touchmove", this._onMove), E(this.ownerDocument, "mousemove", this._onMove);
        },
        _unbindUpEvents: function () {
          E(this.ownerDocument, "pointerup", this._onDrop), E(this.ownerDocument, "pointercancel", this._onDrop), E(this.ownerDocument, "touchend", this._onDrop), E(this.ownerDocument, "touchcancel", this._onDrop), E(this.ownerDocument, "mouseup", this._onDrop);
        }
      }), this._onStart = this._onStart.bind(this), this._onMove = this._onMove.bind(this), this._onDrop = this._onDrop.bind(this), this._bindEventListener(), window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
        return setTimeout(t, 17);
      });
    }

    return H.prototype = {
      constructor: H,
      destroy: function () {
        this._unbindEventListener(), this._clearState();
      },
      set: function (t, e) {
        this.options[t] = e;
      },
      get: function (t) {
        return this.options[t];
      },
      _onStart: function (t) {
        var e = this;

        if (!(/mousedown|pointerdown/.test(t.type) && 0 !== t.button || this.options.disabled)) {
          var o = t.touches && t.touches[0] || t.pointerType && "touch" === t.pointerType && t,
              n = o || t;

          if (this.nativeDraggable || !h || !n.target || "SELECT" !== n.target.tagName.toUpperCase()) {
            if (n.target === this.rootEl) return !0;
            this.options.stopPropagation && t.stopPropagation();
            var t = this.options,
                i = t.delay,
                t = t.delayOnTouchOnly;
            !i || t && !o || this.nativeDraggable && (c || l) ? this._onDrag(n, o) : (clearTimeout(this.dragStartTimer), this.dragStartTimer = setTimeout(function () {
              return e._onDrag(n, o);
            }, i));
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
        } else if (void 0 !== n) throw new Error('draggable expected "function" or "string" but received "'.concat(i(n), '"'));

        if (this._removeSelection(), o) {
          if ("function" != typeof o) throw new Error('dragging expected "function" or "string" but received "'.concat(i(o), '"'));
          this.dragEl = o(t);
        } else this.dragEl = x(this.rootEl, t.target, !0);

        if (!this.dragEl || this.dragEl.animated) return !0;
        n = x(this.rootEl, this.dragEl), o = n.rect, n = n.offset;
        this.move = {
          x: t.clientX,
          y: t.clientY
        }, this.differ.from = {
          node: this.dragEl,
          rect: o,
          offset: n
        }, this.ghost.distance = {
          x: t.clientX - o.left,
          y: t.clientY - o.top
        }, this.state.sortableDown = t, this._bindMoveEvents(e), this._bindUpEvents(e);
      },
      _onStarted: function (t, e) {
        var o;
        this.ghost.$el || (o = this.differ.from.rect, this.ghost.init(this.dragEl.cloneNode(!0), o), $(this.dragEl, this.options.chosenClass, !0), this.dragEl.style["touch-action"] = "none", this.dragEl.style["will-change"] = "transform", (o = this.options.onDrag) && "function" == typeof o && o(this.dragEl, t, e), h && M(document.body, "user-select", "none"));
      },
      _onMove: function (t) {
        var e,
            o,
            n,
            i,
            r,
            s,
            a,
            l,
            c = this;
        this.state.sortableDown && (o = (e = (i = t.touches && t.touches[0] || t.pointerType && "touch" === t.pointerType && t) || t).clientX, n = e.clientY, i = i ? document.elementFromPoint(o, n) : e.target, s = o - this.move.x, r = n - this.move.y, void 0 !== o && Math.abs(s) <= 0 && void 0 !== n && Math.abs(r) <= 0 || (this.state.sortableMove = e, this.options.stopPropagation && t.stopPropagation && t.stopPropagation(), void 0 !== t.preventDefault && t.cancelable && t.preventDefault(), this._onStarted(e, t), this.ghost.move(s, r), (s = this.options.onMove) && "function" == typeof s && s(this.differ.from, this.ghost.$el, e, t), o < 0 || n < 0 || (s = (r = T(this.rootEl)).top, a = r.right, l = r.bottom, o < r.left || a < o || n < s || l < n || (this._onChange(this, i, e, t), this.autoScrollTimer && clearTimeout(this.autoScrollTimer), this.options.autoScroll && (this.autoScrollTimer = setTimeout(function () {
          return c._autoScroll(c);
        }, 0))))));
      },
      _onChange: k(function (t, e, o, n) {
        var i,
            r,
            s,
            a,
            l,
            c,
            e = x(t.rootEl, e),
            h = e.el,
            u = e.rect,
            e = e.offset;
        h && !h.animated && (t.dropEl = h, c = o.clientX, i = o.clientY, l = u.left, r = u.right, s = u.top, a = u.bottom, l < c && c < r && s < i && i < a && h !== t.dragEl && (t.differ.to = {
          node: t.dropEl,
          rect: u,
          offset: e
        }, t.captureAnimationState(), l = t.options.onChange, c = S(t.dragEl), l && "function" == typeof l && l(t.differ.from, t.differ.to, o, n), c.top < e.top || c.left < e.left ? t.rootEl.insertBefore(t.dragEl, h.nextElementSibling) : t.rootEl.insertBefore(t.dragEl, h), t.animateRange()));
      }, 5),
      _onDrop: function (t) {
        var e, o, n;
        this._unbindMoveEvents(), this._unbindUpEvents(), clearTimeout(this.dragStartTimer), this.options.stopPropagation && t.stopPropagation(), t.cancelable && t.preventDefault(), $(this.dragEl, this.options.chosenClass, !1), this.dragEl.style["touch-action"] = "", this.dragEl.style["will-change"] = "", this.state.sortableDown && this.state.sortableMove && (this.differ.to.offset = S(this.dragEl), this.differ.to.rect = T(this.dragEl), o = (e = this.differ).from, e = e.to, o = o.offset.top !== e.offset.top || o.offset.left !== e.offset.left, (n = this.options.onDrop) && "function" == typeof n && n(o, t), this.ghost.destroy(e.rect)), this.differ.destroy(), this.state = new A(), h && M(document.body, "user-select", "");
      },
      _autoScroll: P(function (t) {
        var e, o, n, i, r, s, a, l, c, h, u, f, d, p, m;
        t.state.sortableDown && t.state.sortableMove && (e = (o = t.state.sortableMove).clientX, o = o.clientY, void 0 !== e && void 0 !== o && t.scrollEl !== t.ownerDocument && (n = (p = t.scrollEl).scrollTop, i = p.scrollLeft, r = p.scrollHeight, p = p.scrollWidth, s = (d = T(t.scrollEl)).top, u = d.right, a = d.bottom, f = d.left, l = d.height, d = d.width, c = (h = t.options).scrollStep, h = h.scrollThreshold, f = 0 < i && f <= e && e <= f + h, d = i + d < p && e <= u && u - h <= e, p = n + l < r && o <= a && a - h <= o, m = {
          x: i,
          y: n
        }, (u = 0 < n && s <= o && o <= s + h) ? (m.x = f ? i - c : d ? i + c : i, m.y = n - c) : p ? (m.x = f ? i - c : d ? i + c : i, m.y = n + c) : f ? (m.x = i - c, m.y = n) : d && (m.x = i + c, m.y = n), (u || f || d || p) && requestAnimationFrame(function () {
          t.scrollEl.scrollTo(m.x, m.y), t._autoScroll(t);
        })));
      }, 10),
      _removeSelection: function () {
        try {
          document.selection ? setTimeout(function () {
            document.selection.empty();
          }, 0) : window.getSelection().removeAllRanges();
        } catch (t) {}
      },
      _clearState: function () {
        this.dragEl = null, this.dropEl = null, this.state = new A(), this.ghost.destroy(), this.differ.destroy();
      }
    }, H.utils = {
      getRect: T,
      getOffset: S,
      debounce: k,
      throttle: P,
      getParentAutoScrollElement: _
    }, H;
  });
  });

  class Sortable {
      getKey;
      onDrag;
      onDrop;
      dragState;
      dragElement;
      drag;
      options;
      dataSource;
      rangeIsChanged;
      constructor(options, onDrag, onDrop) {
          this.options = options;
          this.onDrag = onDrag;
          this.onDrop = onDrop;
          this.getKey = options.getKey;
          this.dragState = new DragState;
          this.dataSource = options.dataSource;
          this.rangeIsChanged = false;
          this.init();
      }
      set(key, value) {
          this[key] = value;
      }
      setOption(key, value) {
          this.options[key] = value;
          this.drag.set(key, value);
      }
      init() {
          const { disabled, dragging, draggable, ghostClass, ghostStyle, chosenClass, animation, autoScroll, scrollStep, scrollThreshold } = this.options;
          let cloneList = new Array();
          this.drag = new sortable_min(this.options.scrollEl, {
              disabled,
              dragging,
              draggable,
              ghostClass,
              ghostStyle,
              chosenClass,
              animation,
              autoScroll,
              scrollStep,
              scrollThreshold,
              onDrag: (dragEl) => {
                  this.dragElement = dragEl;
                  cloneList = [...this.dataSource];
                  const key = dragEl.getAttribute('data-key');
                  const index = this.dataSource.findIndex(el => this.getKey(el) == key);
                  const item = this.dataSource[index];
                  Object.assign(this.dragState.from, { item, index, key });
                  this.rangeIsChanged = false;
                  this.onDrag(this.dragState.from);
              },
              onChange: (_old_, _new_) => {
                  const oldKey = this.dragState.from.key;
                  const newKey = _new_.node.getAttribute('data-key');
                  const from = { item: null, index: -1 };
                  const to = { item: null, index: -1 };
                  cloneList.forEach((el, index) => {
                      const key = this.getKey(el);
                      if (key == oldKey)
                          Object.assign(from, { item: el, index });
                      if (key == newKey)
                          Object.assign(to, { item: el, index });
                  });
                  cloneList.splice(from.index, 1);
                  cloneList.splice(to.index, 0, from.item);
              },
              onDrop: (changed) => {
                  if (this.rangeIsChanged && this.dragElement)
                      this.dragElement.remove();
                  const { from } = this.dragState;
                  const index = cloneList.findIndex(el => this.getKey(el) == from.key);
                  const item = this.dataSource[index];
                  this.dragState.to = { item, index, key: this.getKey(item) };
                  this.onDrop(cloneList, from, this.dragState.to, changed);
                  this.dataSource = [...cloneList];
                  this.clear();
              }
          });
      }
      clear() {
          this.dragElement = null;
          this.rangeIsChanged = false;
          this.dragState = new DragState;
      }
      destroy() {
          this.drag && this.drag.destroy();
          this.drag = null;
      }
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

  const CALLBACKS = { top: 'v-top', bottom: 'v-bottom', dragend: 'v-dragend' }; // 组件传入的事件回调
  function VirtualDragList(props, ref) {
      const { header, footer, children, dataSource = [], dataKey, direction = 'vertical', keeps = 30, size = 50, delay = 0, autoScroll = true, scrollStep = 5, scrollThreshold = 15, style = {}, className = '', wrapTag = 'div', rootTag = 'div', itemTag = 'div', headerTag = 'div', footerTag = 'div', itemStyle = {}, itemClass = '', wrapStyle = {}, wrapClass = '', disabled = false, draggable = undefined, dragging = undefined, ghostClass = '', ghostStyle = {}, chosenClass = '', animation = 150 } = props;
      // =============================== State ===============================
      const [list, setList] = React.useState([]);
      const cloneList = React.useRef([]);
      const uniqueKeys = React.useRef([]);
      const [range, setRange] = React.useState(new Range); // 当前可见范围
      const root_ref = React.useRef(null); // 根元素
      const wrap_ref = React.useRef(null); // 列表ref
      const last_ref = React.useRef(null); // 列表末尾dom，总是存在于列表最后
      const dragState = React.useRef(new DragState);
      const sortable = React.useRef(null);
      const virtual = React.useRef(new Virtual({
          size,
          keeps,
          uniqueKeys: uniqueKeys.current,
          isHorizontal: direction === 'vertical'
      }, (range) => {
          setRange(() => range);
          // check if drag element is in range
          const { index } = dragState.current.from || {};
          if (index > -1 && !(index >= range.start && index <= range.end)) {
              if (sortable.current)
                  sortable.current.set('rangeIsChanged', true);
          }
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
          setList(() => [...dataSource]);
          cloneList.current = [...dataSource];
          setUniqueKeys();
          virtual.current.updateUniqueKeys(uniqueKeys.current);
          virtual.current.updateSizes(uniqueKeys.current);
          virtual.current.updateRange();
          if (sortable.current)
              sortable.current.set('dataSource', dataSource);
          return () => {
              destroySortable();
          };
      }, [dataSource]);
      React.useLayoutEffect(() => {
          if (!sortable.current) {
              // fix autoScroll does not take effect
              setTimeout(() => { initSortable(); }, 0);
          }
          else {
              sortable.current.setOption('disabled', disabled);
          }
      }, [disabled]);
      // =============================== sortable ===============================
      const initSortable = () => {
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
              autoScroll,
              scrollStep,
              scrollThreshold
          }, (state) => {
              dragState.current.from = state;
          }, (list, from, to, changed) => {
              dragState.current.to = to;
              const callback = props[CALLBACKS.dragend];
              callback && callback(list, from, to, changed);
              cloneList.current = [...list];
              setList(() => [...list]);
              setUniqueKeys();
              setTimeout(() => dragState.current = new DragState, delay + 10);
          });
      };
      const destroySortable = () => {
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
          // mouseup 事件时会触发scroll事件，这里处理为了防止range改变导致页面滚动
          if (dragState.current.to && dragState.current.to.key)
              return;
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
      // check item show or not
      const getItemStyle = React__default["default"].useCallback((itemKey) => {
          const change = sortable.current && sortable.current.rangeIsChanged;
          const { key } = dragState.current.from || {};
          if (change && itemKey == key)
              return { display: 'none' };
          return {};
      }, [dragState.current]);
      // html tag name
      const { RTag, WTag } = React__default["default"].useMemo(() => {
          return {
              RTag: rootTag,
              WTag: wrapTag
          };
      }, [wrapTag, rootTag]);
      // root style
      const RStyle = React__default["default"].useMemo(() => {
          return { ...style, overflow: direction !== 'vertical' ? 'auto hidden' : 'hidden auto' };
      }, [style, direction,]);
      // wrap style
      const WStyle = React__default["default"].useMemo(() => {
          const { front, behind } = range;
          return {
              ...wrapStyle,
              padding: direction !== 'vertical'
                  ? `0px ${behind}px 0px ${front}px`
                  : `${front}px 0px ${behind}px`
          };
      }, [wrapStyle, direction, range]);
      // range
      const { start, end } = React__default["default"].useMemo(() => {
          return { ...range };
      }, [range]);
      return (React__default["default"].createElement(RTag, { ref: root_ref, className: className, style: RStyle, onScroll: debounce(handleScroll, delay) },
          React__default["default"].createElement(Slot, { children: header, roleId: "header", Tag: headerTag, onSizeChange: onSlotSizeChange }),
          React__default["default"].createElement(WTag, { ref: wrap_ref, "v-role": "group", className: wrapClass, style: WStyle }, list.slice(start, end + 1).map(item => {
              const key = getKey(item);
              const index = getItemIndex(item);
              return (React__default["default"].createElement(Item, { key: key, Tag: itemTag, record: item, index: index, dataKey: key, children: children, Class: itemClass, Style: { ...itemStyle, ...getItemStyle(key) }, onSizeChange: onItemSizeChange }));
          })),
          React__default["default"].createElement(Slot, { children: footer, roleId: "footer", Tag: footerTag, onSizeChange: onSlotSizeChange }),
          React__default["default"].createElement("div", { ref: last_ref, style: { width: direction !== 'vertical' ? '0px' : '100%', height: direction !== 'vertical' ? '100%' : '0px' } })));
  }
  var index = React__default["default"].forwardRef(VirtualDragList);

  exports.VirtualDragList = VirtualDragList;
  exports["default"] = index;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
