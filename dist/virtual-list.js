/*!
 * react-virtual-sortable v1.0.0
 * open source under the MIT license
 * https://github.com/mfuu/react-virtual-sortable#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VirtualList = factory(global.React));
})(this, (function (React) { 'use strict';

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

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var sortableDnd_min = {exports: {}};

  /*!
   * sortable-dnd v0.6.22
   * open source under the MIT license
   * https://github.com/mfuu/sortable-dnd#readme
   */
  sortableDnd_min.exports;
  (function (module, exports) {
    !function (t, e) {
      module.exports = e() ;
    }(commonjsGlobal, function () {

      function t(e) {
        return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
          return typeof t;
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, t(e);
      }
      function e() {
        return e = Object.assign ? Object.assign.bind() : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
          }
          return t;
        }, e.apply(this, arguments);
      }
      var n = {
          capture: !1,
          passive: !1
        },
        o = /\s+/g;
      function i(t) {
        if ("undefined" != typeof window && window.navigator) return !!navigator.userAgent.match(t);
      }
      var r = i(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
        s = i(/Edge/i),
        l = i(/safari/i) && !i(/chrome/i) && !i(/android/i),
        a = function () {
          var t = !1;
          return document.addEventListener("checkIfSupportPassive", null, {
            get passive() {
              return t = !0, !0;
            }
          }), t;
        }();
      function c(t, e, o) {
        window.addEventListener ? t.addEventListener(e, o, !(!a && r) && n) : window.attachEvent ? t.attachEvent("on" + e, o) : t["on" + e] = o;
      }
      function h(t, e, o) {
        window.removeEventListener ? t.removeEventListener(e, o, !(!a && r) && n) : window.detachEvent ? t.detachEvent("on" + e, o) : t["on" + e] = null;
      }
      function u() {
        return document.scrollingElement || document.documentElement;
      }
      function d(t, e, n) {
        if (t.getBoundingClientRect || t === window) {
          var o, i, r, s, l, a, c;
          if (t !== window && t.parentNode && t !== u() ? (i = (o = t.getBoundingClientRect()).top, r = o.left, s = o.bottom, l = o.right, a = o.height, c = o.width) : (i = 0, r = 0, s = window.innerHeight, l = window.innerWidth, a = window.innerHeight, c = window.innerWidth), e && t !== window) {
            n = n || t.parentNode;
            do {
              if (n && n.getBoundingClientRect) {
                var h = n.getBoundingClientRect();
                i -= h.top + parseInt(S(n, "border-top-width")), r -= h.left + parseInt(S(n, "border-left-width")), s = i + o.height, l = r + o.width;
                break;
              }
            } while (n = n.parentNode);
          }
          return {
            top: i,
            left: r,
            bottom: s,
            right: l,
            width: c,
            height: a
          };
        }
      }
      function p(t, e, n, o) {
        if (t) {
          n = n || document;
          do {
            if (null != e && (">" === e[0] ? t.parentNode === n && b(t, e) : b(t, e)) || o && t === n) return t;
            if (t === n) break;
          } while (t = t.parentNode);
          return null;
        }
      }
      function f(t, e) {
        if (!t || !e) return !1;
        if (e.compareDocumentPosition) return !!(16 & e.compareDocumentPosition(t));
        if (e.contains && 1 === t.nodeType) return e.contains(t) && e !== t;
        for (; t = t.parentNode;) if (t === e) return !0;
        return !1;
      }
      function m(t, e) {
        for (var n = t.lastElementChild; n && (n === ot.ghost || "none" === S(n, "display") || e && !b(n, e));) n = n.previousElementSibling;
        return n || null;
      }
      function g(t, e) {
        if (!t || !t.parentNode) return -1;
        for (var n = 0; t = t.previousElementSibling;) "TEMPLATE" === t.nodeName.toUpperCase() || e && !b(t, e) || "none" === S(t, "display") || n++;
        return n;
      }
      function v(t, e, n, o) {
        for (var i = 0, r = 0, s = t.children; i < s.length;) {
          if (s[i] !== ot.ghost && "none" !== S(s[i], "display") && p(s[i], n, t, !1) && (o || s[i] !== ot.dragged)) {
            if (r === e) return s[i];
            r++;
          }
          i++;
        }
        return null;
      }
      function y(t, e) {
        var n = S(t),
          o = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth),
          i = v(t, 0, e),
          l = v(t, 1, e),
          a = i && S(i),
          c = l && S(l),
          h = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + d(i).width,
          u = c && parseInt(c.marginLeft) + parseInt(c.marginRight) + d(l).width,
          p = s || r ? "cssFloat" : "float";
        if ("flex" === n.display) return "column" === n.flexDirection || "column-reverse" === n.flexDirection ? "vertical" : "horizontal";
        if ("grid" === n.display) return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
        if (i && a.float && "none" !== a.float) {
          var f = "left" === a.float ? "left" : "right";
          return !l || "both" !== c.clear && c.clear !== f ? "horizontal" : "vertical";
        }
        return i && ("block" === a.display || "flex" === a.display || "table" === a.display || "grid" === a.display || h >= o && "none" === n[p] || l && "none" === n[p] && h + u > o) ? "vertical" : "horizontal";
      }
      function w(t, e, n) {
        if (t && e) if (t.classList) t.classList[n ? "add" : "remove"](e);else {
          var i = (" " + t.className + " ").replace(o, " ").replace(" " + e + " ", " ");
          t.className = (i + (n ? " " + e : "")).replace(o, " ");
        }
      }
      function b(t, e) {
        if (e) {
          if (">" === e[0] && (e = e.substring(1)), t) try {
            if (t.matches) return t.matches(e);
            if (t.msMatchesSelector) return t.msMatchesSelector(e);
            if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
          } catch (t) {
            return !1;
          }
          return !1;
        }
      }
      function S(t, e, n) {
        var o = t && t.style;
        if (o) {
          if (void 0 === n) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), void 0 === e ? n : n[e];
          e in o || -1 !== e.indexOf("webkit") || (e = "-webkit-" + e), o[e] = n + ("string" == typeof n ? "" : "px");
        }
      }
      function _(t, e) {
        var n,
          o,
          i = (o = e, (n = t).compareDocumentPosition ? n.compareDocumentPosition(o) : n.contains ? (n != o && n.contains(o) && 16) + (n != o && o.contains(n) && 8) + (n.sourceIndex >= 0 && o.sourceIndex >= 0 ? (n.sourceIndex < o.sourceIndex && 4) + (n.sourceIndex > o.sourceIndex && 2) : 1) : 0);
        return 2 === i ? 1 : 4 === i ? -1 : 0;
      }
      function x(t) {
        void 0 !== t.preventDefault && t.cancelable && t.preventDefault();
      }
      function C(t) {
        var n = t.sortable,
          o = t.name,
          i = t.evt,
          r = n.options[o];
        "function" == typeof r && r(e({}, i));
      }
      !function () {
        if ("undefined" == typeof window || "undefined" == typeof document) return "";
        var t = window.getComputedStyle(document.documentElement, "") || ["-moz-hidden-iframe"];
          (Array.prototype.slice.call(t).join("").match(/-(moz|webkit|ms)-/) || "" === t.OLink && ["", "o"])[1];
      }();
      var D,
        E,
        I,
        M = "Sortable" + Date.now();
      function T(t) {
        this.options = t, this.scrollEl = null, this.autoScrollInterval = null;
      }
      function N(t) {
        this.options = t, this.stack = [];
      }
      function P(t) {
        this.options = t || {}, this.selects = [];
      }
      T.prototype = {
        nulling: function () {
          this.autoScrollInterval && (clearInterval(this.autoScrollInterval), this.autoScrollInterval = null);
        },
        onStarted: function () {
          var t = this;
          this.nulling(), this.autoScrollInterval = setInterval(function () {
            t.autoScroll();
          });
        },
        onMove: function (t, e, n) {
          this.options = n, this.scrollEl = t, this.moveEvent = e;
        },
        autoScroll: function () {
          var t = this.moveEvent,
            e = this.scrollEl;
          if (e && void 0 !== t.clientX && void 0 !== t.clientY) {
            var n = d(e);
            if (n) {
              var o = t.clientX,
                i = t.clientY,
                r = n.top,
                s = n.right,
                l = n.bottom,
                a = n.left,
                c = n.height,
                h = n.width;
              if (!(i < r || o > s || i > l || o < a)) {
                var u = this.options,
                  p = u.scrollThreshold,
                  f = u.scrollSpeed,
                  m = e.scrollTop,
                  g = e.scrollLeft,
                  v = e.scrollHeight,
                  y = m > 0 && i >= r && i <= r + p,
                  w = g + h < e.scrollWidth && o <= s && o >= s - p,
                  b = m + c < v && i <= l && i >= l - p;
                g > 0 && o >= a && o <= a + p && (e.scrollLeft += Math.floor(Math.max(-1, (o - a) / p - 1) * f.x)), w && (e.scrollLeft += Math.ceil(Math.min(1, (o - s) / p + 1) * f.x)), y && (e.scrollTop += Math.floor(Math.max(-1, (i - r) / p - 1) * f.y)), b && (e.scrollTop += Math.ceil(Math.min(1, (i - l) / p + 1) * f.y));
              }
            }
          }
        }
      }, N.prototype = {
        collect: function (t) {
          if (t) {
            for (var e = d(t), n = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, o = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, i = Math.min(e.right, n), r = Math.min(e.bottom, o), s = Array.prototype.slice.call(t.children), l = [], a = 0, c = s.length; a <= c; a++) {
              var h = s[a];
              if (h && h !== ot.ghost && "none" !== S(h, "display")) {
                var u = d(h);
                if (!(u.bottom < 0 || u.right < 0)) {
                  if (u.top - u.height > r || u.left - u.width > i) break;
                  l.push({
                    el: h,
                    rect: u
                  });
                }
              }
            }
            this.stack.push(l);
          }
        },
        animate: function () {
          var t = this.stack.pop();
          if (t && this.options.animation) for (var e = 0, n = t.length; e < n; e++) {
            var o = t[e],
              i = o.el,
              r = o.rect;
            this.execute(i, r);
          }
        },
        execute: function (t, e) {
          var n = d(t);
          if (n.top !== e.top || n.left !== e.left) {
            var o = e.left - n.left,
              i = e.top - n.top;
            S(t, "transition", ""), S(t, "transform", "translate3d(".concat(o, "px, ").concat(i, "px, 0)")), this.repaintDummy = function (t) {
              return t.offsetWidth;
            }(t);
            var r = this.options,
              s = r.animation,
              l = r.easing;
            S(t, "transition", "transform ".concat(s, "ms ").concat(l ? " " + l : "")), S(t, "transform", "translate3d(0px, 0px, 0px)"), "number" == typeof t.animated && clearTimeout(t.animated), t.animated = setTimeout(function () {
              S(t, "transition", ""), S(t, "transform", ""), t.animated = null;
            }, s);
          }
        }
      }, P.prototype = {
        eventProperties: function () {
          return {
            nodes: D || [],
            clones: E || []
          };
        },
        isActive: function () {
          return !!D;
        },
        nulling: function () {
          D = E = I = null;
        },
        select: function (t) {
          w(t, this.options.selectedClass, !0), this.selects.push(t), this.selects.sort(function (t, e) {
            return _(t, e);
          });
        },
        deselect: function (t) {
          var e = this.selects.indexOf(t);
          e > -1 && (w(t, this.options.selectedClass, !1), this.selects.splice(e, 1));
        },
        useSelectHandle: function (t, e) {
          var n = this.options.selectHandle;
          return !!(I = "function" == typeof n && n(t) || "string" == typeof n && b(e, n));
        },
        onChoose: function () {
          !this.options.multiple || 0 === this.selects.length || this.selects.indexOf(ot.dragged) < 0 || (this.selects.sort(function (t, e) {
            return _(t, e);
          }), D = this.selects, this.toggleChosenClass(!0));
        },
        onDrop: function (t, e, n) {
          if (D) {
            var o = ot.dragged,
              i = ot.clone,
              r = D.indexOf(o);
            t !== e && n ? (S(i, "display", "none"), this.toggleVisible(!0), E = D.map(function (t) {
              return t.cloneNode(!0);
            }), this.sortElements(E, r, i)) : this.sortElements(D, r, i), t !== e && (e[M].multiplayer.toggleSelected(E || D, "add"), !n && t[M].multiplayer.toggleSelected(D, "remove"));
          }
        },
        onSelect: function (t, e, n, o) {
          var i = this.options,
            r = i.multiple,
            s = i.selectHandle;
          if (r && (s && I || !s && !n)) {
            var l = this.selects.indexOf(e);
            w(e, this.options.selectedClass, l < 0);
            var a = {
              from: o.el,
              event: t,
              node: e,
              index: g(e)
            };
            l < 0 ? (this.selects.push(e), C({
              sortable: o,
              name: "onSelect",
              evt: a
            })) : (this.selects.splice(l, 1), C({
              sortable: o,
              name: "onDeselect",
              evt: a
            })), this.selects.sort(function (t, e) {
              return _(t, e);
            });
          }
        },
        toggleChosenClass: function (t) {
          if (D) for (var e = 0, n = D.length; e < n; e++) w(D[e], this.options.chosenClass, t);
        },
        toggleVisible: function (t) {
          if (D) for (var e = 0, n = D.length; e < n; e++) D[e] != ot.dragged && S(D[e], "display", t ? "" : "none");
        },
        toggleSelected: function (t, e) {
          var n = this;
          "add" === e ? t.forEach(function (t) {
            return n.selects.push(t);
          }) : this.selects = this.selects.filter(function (e) {
            return t.indexOf(e) < 0;
          });
        },
        sortElements: function (t, e, n) {
          for (var o = 0, i = t.length; o < i; o++) if (S(t[o], "display", ""), o < e) n.parentNode.insertBefore(t[o], n);else {
            var r = o > 0 ? t[o - 1] : n;
            n.parentNode.insertBefore(t[o], r.nextSibling);
          }
        }
      };
      var O,
        H,
        k,
        L,
        X,
        Y,
        B,
        R,
        W,
        A,
        z,
        V,
        j,
        G,
        U,
        F,
        q,
        J,
        K,
        Q,
        Z,
        $,
        tt = [];
      function et(e) {
        var n,
          o,
          i,
          r = {},
          s = e.group;
        s && "object" === t(s) || (s = {
          name: s,
          pull: !0,
          put: !0,
          revertDrag: !0
        }), r.name = s.name, r.pull = null === (n = s.pull) || void 0 === n || n, r.put = null === (o = s.put) || void 0 === o || o, r.revertDrag = null === (i = s.revertDrag) || void 0 === i || i, e.group = r;
      }
      function nt(t) {
        var e = F || U;
        return !(void 0 !== t.clientX && void 0 !== t.clientY && Math.abs(t.clientX - e.clientX) <= 0 && Math.abs(t.clientY - e.clientY) <= 0);
      }
      function ot(t, n) {
        if (!t || !t.nodeType || 1 !== t.nodeType) throw "Sortable-dnd: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
        t[M] = this, this.el = t, this.options = n = e({}, n);
        var o = {
          store: null,
          group: "",
          handle: null,
          sortable: !0,
          disabled: !1,
          multiple: !1,
          lockAxis: "",
          direction: "",
          animation: 150,
          easing: "",
          draggable: ">*",
          selectHandle: null,
          customGhost: null,
          autoScroll: !0,
          scrollThreshold: 55,
          scrollSpeed: {
            x: 10,
            y: 10
          },
          delay: 0,
          delayOnTouchOnly: !1,
          touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
          ghostClass: "",
          ghostStyle: {},
          chosenClass: "",
          selectedClass: "",
          placeholderClass: "",
          swapOnDrop: !0,
          removeCloneOnDrop: !0,
          fallbackOnBody: !1,
          supportTouch: "ontouchstart" in window,
          emptyInsertThreshold: -1
        };
        for (var i in o) !(i in this.options) && (this.options[i] = o[i]);
        for (var r in et(n), this) "_" === r.charAt(0) && "function" == typeof this[r] && (this[r] = this[r].bind(this));
        c(t, this.options.supportTouch ? "touchstart" : "mousedown", this._onDrag), this.autoScroller = new T(this.options), this.multiplayer = new P(this.options), this.animator = new N(this.options), tt.push(t);
      }
      return ot.prototype = {
        constructor: ot,
        _onDrag: function (t) {
          var e = this;
          if (!k && !this.options.disabled && this.options.group.pull && (!/mousedown|pointerdown/.test(t.type) || 0 === t.button)) {
            var n = t.touches && t.touches[0],
              o = (n || t).target;
            if (!l || !o || "SELECT" !== o.tagName.toUpperCase()) {
              var i = p(o, this.options.draggable, this.el);
              if (i && !i.animated && (U = {
                event: t,
                clientX: (n || t).clientX,
                clientY: (n || t).clientY
              }, k = i, c(Q = n ? k : document, "mouseup", this._onDrop), c(Q, "touchend", this._onDrop), c(Q, "touchcancel", this._onDrop), !this.multiplayer.useSelectHandle(t, o))) {
                var a = this.options.handle;
                if (("function" != typeof a || a(t)) && ("string" != typeof a || b(o, a))) {
                  var h = this.options,
                    u = h.delay,
                    d = h.delayOnTouchOnly;
                  !u || d && !n || s || r ? this._onStart(n, t) : (c(this.el.ownerDocument, "touchmove", this._delayMoveHandler), c(this.el.ownerDocument, "mousemove", this._delayMoveHandler), c(this.el.ownerDocument, "mouseup", this._cancelStart), c(this.el.ownerDocument, "touchend", this._cancelStart), c(this.el.ownerDocument, "touchcancel", this._cancelStart), $ = setTimeout(function () {
                    return e._onStart(n, t);
                  }, u)), c(document, "selectstart", x), l && S(document.body, "user-select", "none");
                }
              }
            }
          }
        },
        _delayMoveHandler: function (t) {
          var e = t.touches ? t.touches[0] : t;
          Math.max(Math.abs(e.clientX - U.clientX), Math.abs(e.clientY - U.clientY)) >= Math.floor(this.options.touchStartThreshold / (window.devicePixelRatio || 1)) && this._cancelStart();
        },
        _cancelStart: function () {
          clearTimeout($), h(this.el.ownerDocument, "touchmove", this._delayMoveHandler), h(this.el.ownerDocument, "mousemove", this._delayMoveHandler), h(this.el.ownerDocument, "mouseup", this._cancelStart), h(this.el.ownerDocument, "touchend", this._cancelStart), h(this.el.ownerDocument, "touchcancel", this._cancelStart), h(document, "selectstart", x), l && S(document.body, "user-select", "");
        },
        _onStart: function (t, e) {
          x(e);
          var n = g(k);
          O = this.el, H = this.el, W = k, V = n, j = n, G = n, J = {
            to: this.el,
            target: k,
            newIndex: n,
            relative: 0
          }, K = k, R = this.el, Y = k.cloneNode(!0), A = k.parentNode, z = this.options.group.pull, ot.clone = Y, ot.active = this, ot.dragged = k, this.multiplayer.onChoose(), w(k, this.options.chosenClass, !0), C({
            sortable: this,
            name: "onChoose",
            evt: this._getEventProperties(e)
          }), c(Q, t ? "touchmove" : "mousemove", this._nearestSortable);
          try {
            document.selection ? setTimeout(function () {
              return document.selection.empty();
            }, 0) : window.getSelection().removeAllRanges();
          } catch (t) {}
        },
        _onStarted: function () {
          this.animator.collect(A), w(Y, this.options.chosenClass, !0), w(Y, this.options.placeholderClass, !0), this._appendGhost(), this.multiplayer.toggleVisible(!1), S(k, "display", "none"), k.parentNode.insertBefore(Y, k), C({
            sortable: this,
            name: "onDrag",
            evt: this._getEventProperties(U.event)
          }), this.animator.animate(), this.autoScroller.onStarted();
        },
        _getGhostElement: function () {
          var t = this.options.customGhost;
          if ("function" == typeof t) {
            var e = this.multiplayer.selects;
            return t(this.multiplayer.isActive() ? e : [k]);
          }
          return k;
        },
        _appendGhost: function () {
          if (!B) {
            var t = this.options.fallbackOnBody ? document.body : this.el,
              n = this._getGhostElement();
            w(B = n.cloneNode(!0), this.options.ghostClass, !0);
            var o = d(k),
              i = e({
                position: "fixed",
                top: o.top,
                left: o.left,
                width: o.width,
                height: o.height,
                zIndex: "100000",
                opacity: "0.8",
                overflow: "hidden",
                boxSizing: "border-box",
                transform: "",
                transition: "",
                pointerEvents: "none"
              }, this.options.ghostStyle);
            for (var r in i) S(B, r, i[r]);
            ot.ghost = B, t.appendChild(B);
            var s = (U.clientX - o.left) / parseInt(B.style.width) * 100,
              l = (U.clientY - o.top) / parseInt(B.style.height) * 100;
            S(B, "transform-origin", "".concat(s, "% ").concat(l, "%")), S(B, "will-change", "transform");
          }
        },
        _nearestSortable: function (t) {
          x(t);
          var e = t.touches && t.touches[0] || t;
          if (k && nt(e)) {
            !F && this._onStarted();
            var n = this.options.lockAxis,
              o = "x" === n ? U.clientX : e.clientX,
              i = "y" === n ? U.clientY : e.clientY,
              r = document.elementFromPoint(o, i),
              s = o - U.clientX,
              l = i - U.clientY;
            F = {
              event: t,
              clientX: o,
              clientY: i
            }, S(B, "transform", "translate3d(".concat(s, "px, ").concat(l, "px, 0)"));
            var a,
              c,
              h,
              p = (a = o, c = i, tt.reduce(function (t, e) {
                var n = e[M].options.emptyInsertThreshold;
                if (null != n) {
                  var o = d(e),
                    i = a >= o.left - n && a <= o.right + n,
                    r = c >= o.top - n && c <= o.bottom + n;
                  return i && r && (!h || h && o.left >= h.left && o.right <= h.right && o.top >= h.top && o.bottom <= h.bottom) && (t = e, h = o), t;
                }
              }, null));
            p && p[M]._onMove(t, r);
            var f = p ? p[M].options : null,
              m = null;
            (!p || f.autoScroll) && U && F && (m = function (t, e) {
              if (!t || !t.getBoundingClientRect) return u();
              var n = t,
                o = !1;
              do {
                if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
                  var i = S(n);
                  if (n.clientWidth < n.scrollWidth && ("auto" == i.overflowX || "scroll" == i.overflowX) || n.clientHeight < n.scrollHeight && ("auto" == i.overflowY || "scroll" == i.overflowY)) {
                    if (!n.getBoundingClientRect || n === document.body) return u();
                    if (o || e) return n;
                    o = !0;
                  }
                }
              } while (n = n.parentNode);
              return u();
            }(r, !0)), this.autoScroller.onMove(m, F, f || this.options);
          }
        },
        _allowPut: function () {
          if (R === this.el) return !0;
          if (!this.options.group.put) return !1;
          var t = this.options.group,
            e = t.name,
            n = t.put,
            o = R[M].options.group;
          return n.join && n.indexOf(o.name) > -1 || o.name && e && o.name === e;
        },
        _getDirection: function () {
          var t = this.options,
            e = t.draggable,
            n = t.direction;
          return n ? "function" == typeof n ? n.call(F.event, Y, this) : n : y(A, e);
        },
        _allowSwap: function () {
          var t = d(L),
            e = "vertical" === this._getDirection(),
            n = e ? "top" : "left",
            o = e ? "bottom" : "right",
            i = L[e ? "offsetHeight" : "offsetWidth"],
            r = e ? F.clientY : F.clientX,
            s = r >= t[n] && r < t[o] - i / 2 ? -1 : 1,
            l = v(A, 0, this.options.draggable),
            a = m(A),
            c = d(l),
            h = d(a);
          if (L === A || f(A, L)) return Y === l && r < c[n] ? (X = L, !0) : Y === a && r > h[o] && (X = L.nextSibling, !0);
          var u = _(Y, L);
          return X = u < 0 ? L.nextSibling : L, q !== L ? (Z = s, !0) : Z !== s && (Z = s, s < 0 ? u > 0 : u < 0);
        },
        _onMove: function (t, e) {
          if (!this.options.disabled && this._allowPut()) {
            if (L = p(e, this.options.draggable, this.el), C({
              sortable: this,
              name: "onMove",
              evt: this._getEventProperties(t, {
                target: L
              })
            }), this.options.sortable || this.el !== R) return this.el === H || e !== this.el && m(this.el) ? void (L && !L.animated && !f(L, Y) && this._allowSwap() && (L !== Y && X !== Y ? (this.el !== H ? this._onInsert(t) : L !== k && this._onChange(t), q = L) : q = L)) : (L = q = null, void this._onInsert(t));
            H !== R && (L = q = k, Z = 0, this._onInsert(t));
          }
        },
        _onInsert: function (t) {
          var e = L || Y,
            n = "clone" === z && this.el !== R && H === R,
            o = "clone" === z && this.el === R && H !== R,
            i = f(L, document),
            r = L === k && !i,
            s = H[M],
            l = R[M];
          O = this.el, V = g(Y), W = e, A = i ? L.parentNode : this.el, s.animator.collect(Y.parentNode), this.animator.collect(A), n && (J.target = K, J.newIndex = V, J.relative = K === k ? 0 : _(Y, K), S(k, "display", ""), l.multiplayer.toggleVisible(!0), l.options.group.revertDrag || Y.parentNode.insertBefore(k, Y)), o && (V = g(k), S(k, "display", "none"), this.multiplayer.toggleVisible(!1)), S(Y, "display", r ? "none" : ""), L && i ? A.insertBefore(Y, Z < 0 ? L : L.nextSibling) : A.appendChild(Y), j = r ? G : g(Y), n && l.options.group.revertDrag && (J.target = k, J.newIndex = G, J.relative = 0, C({
            sortable: l,
            name: "onChange",
            evt: this._getEventProperties(t, {
              to: R,
              target: k,
              newIndex: G,
              revertDrag: !0
            })
          })), n || C({
            sortable: s,
            name: "onRemove",
            evt: this._getEventProperties(t, {
              newIndex: -1
            })
          }), o && e !== k && (K = e, C({
            sortable: this,
            name: "onChange",
            evt: this._getEventProperties(t, {
              from: R,
              backToOrigin: !0
            })
          })), o || C({
            sortable: this,
            name: "onAdd",
            evt: this._getEventProperties(t, {
              oldIndex: -1
            })
          }), s.animator.animate(), this.animator.animate(), H = this.el;
        },
        _onChange: function (t) {
          this.animator.collect(A), V = g(Y), A = L.parentNode, W = L, this.el === R && (K = L), A.insertBefore(Y, X), j = g(Y), C({
            sortable: this,
            name: "onChange",
            evt: this._getEventProperties(t)
          }), this.animator.animate(), H = this.el;
        },
        _onDrop: function (t) {
          this._cancelStart(), h(Q, "touchmove", this._nearestSortable), h(Q, "mousemove", this._nearestSortable), h(Q, "mouseup", this._onDrop), h(Q, "touchend", this._onDrop), h(Q, "touchcancel", this._onDrop), R && (H = R, V = G, W === Y && (W = k), this.animator.collect(A), this.multiplayer.toggleChosenClass(!1), w(k, this.options.chosenClass, !1), C({
            sortable: this,
            name: "onUnchoose",
            evt: this._getEventProperties(t)
          }), F && this._onEnd(t), !F && this.animator.animate()), !nt(t.changedTouches ? t.changedTouches[0] : t) && this.multiplayer.onSelect(t, k, R, this), B && B.parentNode && B.parentNode.removeChild(B), this._nulling();
        },
        _onEnd: function (t) {
          w(Y, this.options.chosenClass, !1), w(Y, this.options.placeholderClass, !1);
          var n = "clone" === z;
          this.multiplayer.onDrop(H, O, n);
          var o = this._getEventProperties(t),
            i = this.options,
            r = i.swapOnDrop,
            s = i.removeCloneOnDrop;
          n && H !== O || !("function" == typeof r ? r(o) : r) || A.insertBefore(k, Y), n && H !== O && !this.multiplayer.isActive() || !("function" == typeof s ? s(o) : s) || Y && Y.parentNode && Y.parentNode.removeChild(Y), S(k, "display", ""), this.animator.animate(), H !== O && C({
            sortable: H[M],
            name: "onDrop",
            evt: e({}, o, n ? J : {
              newIndex: -1
            })
          }), C({
            sortable: O[M],
            name: "onDrop",
            evt: e({}, o, H === O ? {} : {
              oldIndex: -1
            })
          });
        },
        _getEventProperties: function (t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = {};
          return o.event = t, o.to = O, o.from = H, o.node = k, o.clone = Y, o.target = W, o.oldIndex = V, o.newIndex = j, o.pullMode = z, e(o, this.multiplayer.eventProperties(), n), o.relative = W === k ? 0 : _(Y, W), o;
        },
        _nulling: function () {
          O = H = k = L = X = Y = B = R = W = A = z = V = j = G = U = F = q = J = K = Q = Z = $ = ot.clone = ot.ghost = ot.active = ot.dragged = null, this.multiplayer.nulling(), this.autoScroller.nulling();
        },
        destroy: function () {
          this._cancelStart(), this._nulling(), h(this.el, "touchstart", this._onDrag), h(this.el, "mousedown", this._onDrag);
          var t = tt.indexOf(this.el);
          t > -1 && tt.splice(t, 1), this.el[M] = this.animator = this.multiplayer = this.autoScroller = null;
        },
        option: function (t, e) {
          if (void 0 === e) return this.options[t];
          this.options[t] = e, this.animator.options[t] = e, this.multiplayer.options[t] = e, this.autoScroller.options[t] = e, "group" === t && et(this.options);
        },
        select: function (t) {
          this.multiplayer.select(t);
        },
        deselect: function (t) {
          this.multiplayer.deselect(t);
        },
        getSelectedElements: function () {
          return this.multiplayer.selects;
        }
      }, ot.utils = {
        on: c,
        off: h,
        css: S,
        index: g,
        closest: p,
        getRect: d,
        toggleClass: w,
        detectDirection: y
      }, ot.get = function (t) {
        return t[M];
      }, ot.create = function (t, e) {
        return new ot(t, e);
      }, ot;
    });
  })(sortableDnd_min, sortableDnd_min.exports);
  var sortableDnd_minExports = sortableDnd_min.exports;
  var Dnd = /*@__PURE__*/getDefaultExportFromCjs(sortableDnd_minExports);

  function throttle(fn, wait) {
    var timer;
    var result = function result() {
      var _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (timer) return;
      if (wait <= 0) {
        fn.apply(this, args);
      } else {
        timer = setTimeout(function () {
          timer = null;
          fn.apply(_this, args);
        }, wait);
      }
    };
    result['cancel'] = function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    return result;
  }
  function debounce(fn, wait) {
    var throttled = throttle(fn, wait);
    var result = function result() {
      throttled['cancel']();
      throttled.apply(this, arguments);
    };
    result['cancel'] = function () {
      throttled['cancel']();
    };
    return result;
  }
  function isSameValue(a, b) {
    return a == b;
  }
  function getDataKey(item, dataKey) {
    return (!Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey).reduce(function (o, k) {
      return (o || {})[k];
    }, item);
  }
  function elementIsDocumentOrWindow(element) {
    return element instanceof Document && element.nodeType === 9 || element instanceof Window;
  }

  var SortableAttrs = ['delay', 'group', 'handle', 'lockAxis', 'disabled', 'sortable', 'draggable', 'animation', 'autoScroll', 'ghostClass', 'ghostStyle', 'chosenClass', 'scrollSpeed', 'fallbackOnBody', 'scrollThreshold', 'delayOnTouchOnly', 'placeholderClass'];
  var Sortable = /*#__PURE__*/function () {
    function Sortable(el, options) {
      _classCallCheck(this, Sortable);
      this.el = el;
      this.options = options;
      this.rangeChanged = false;
      this.installSortable();
    }
    _createClass(Sortable, [{
      key: "destroy",
      value: function destroy() {
        this.sortable.destroy();
        this.rangeChanged = false;
      }
    }, {
      key: "option",
      value: function option(key, value) {
        this.options[key] = value;
        if (SortableAttrs.includes(key)) {
          this.sortable.option(key, value);
        }
      }
    }, {
      key: "installSortable",
      value: function installSortable() {
        var _this = this;
        var props = SortableAttrs.reduce(function (res, key) {
          res[key] = _this.options[key];
          return res;
        }, {});
        this.sortable = new Dnd(this.el, Object.assign(Object.assign({}, props), {
          emptyInsertThreshold: 0,
          swapOnDrop: function swapOnDrop(event) {
            return event.from === event.to;
          },
          removeCloneOnDrop: function removeCloneOnDrop(event) {
            return event.from === event.to;
          },
          onDrag: function onDrag(event) {
            return _this.onDrag(event);
          },
          onDrop: function onDrop(event) {
            return _this.onDrop(event);
          },
          onChoose: function onChoose(event) {
            return _this.onChoose(event);
          },
          onUnchoose: function onUnchoose(event) {
            return _this.onUnchoose(event);
          }
        }));
      }
    }, {
      key: "onChoose",
      value: function onChoose(event) {
        this.dispatchEvent('onChoose', event);
      }
    }, {
      key: "onUnchoose",
      value: function onUnchoose(event) {
        this.dispatchEvent('onUnchoose', event);
      }
    }, {
      key: "onDrag",
      value: function onDrag(event) {
        var dataKey = event.node.getAttribute('data-key');
        var index = this.getIndex(dataKey);
        var item = this.options.list[index];
        var key = this.options.uniqueKeys[index];
        // store the dragged item
        this.sortable.option('store', {
          item: item,
          key: key,
          index: index
        });
        this.dispatchEvent('onDrag', {
          item: item,
          key: key,
          index: index,
          event: event
        });
      }
    }, {
      key: "onDrop",
      value: function onDrop(event) {
        var _a, _b, _c;
        var _ref = (_a = Dnd.get(event.from)) === null || _a === void 0 ? void 0 : _a.option('store'),
          item = _ref.item,
          key = _ref.key,
          index = _ref.index;
        var list = this.options.list;
        var params = {
          key: key,
          item: item,
          list: list,
          event: event,
          changed: false,
          oldList: _toConsumableArray(list),
          oldIndex: index,
          newIndex: index
        };
        if (!(event.from === event.to && event.node === event.target)) {
          this.handleDropEvent(event, params, index);
        }
        this.dispatchEvent('onDrop', params);
        if (event.from === this.el && this.rangeChanged) {
          (_b = Dnd.dragged) === null || _b === void 0 ? void 0 : _b.remove();
        }
        if (event.from !== event.to) {
          (_c = Dnd.clone) === null || _c === void 0 ? void 0 : _c.remove();
        }
        this.rangeChanged = false;
      }
    }, {
      key: "handleDropEvent",
      value: function handleDropEvent(event, params, index) {
        var targetKey = event.target.getAttribute('data-key');
        var newIndex = -1;
        var oldIndex = index;
        // changes position in current list
        if (event.from === event.to) {
          // re-get the dragged element's index
          oldIndex = this.getIndex(params.key);
          newIndex = this.getIndex(targetKey);
          if (oldIndex < newIndex && event.relative === -1 || oldIndex > newIndex && event.relative === 1) {
            newIndex += event.relative;
          }
          if (newIndex !== oldIndex) {
            params.list.splice(oldIndex, 1);
            params.list.splice(newIndex, 0, params.item);
          }
        } else {
          // remove from
          if (event.from === this.el) {
            oldIndex = this.getIndex(params.key);
            params.list.splice(oldIndex, 1);
          }
          // added to
          if (event.to === this.el) {
            oldIndex = -1;
            newIndex = this.getIndex(targetKey);
            if (event.relative === 0) {
              // added to last
              newIndex = params.list.length;
            } else if (event.relative === 1) {
              newIndex += event.relative;
            }
            params.list.splice(newIndex, 0, params.item);
          }
        }
        params.changed = event.from !== event.to || newIndex !== oldIndex;
        params.oldIndex = oldIndex;
        params.newIndex = newIndex;
      }
    }, {
      key: "getIndex",
      value: function getIndex(key) {
        if (key === null || key === undefined) {
          return -1;
        }
        var uniqueKeys = this.options.uniqueKeys;
        for (var i = 0, len = uniqueKeys.length; i < len; i++) {
          if (isSameValue(uniqueKeys[i], key)) {
            return i;
          }
        }
        return -1;
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(name, params) {
        var cb = this.options[name];
        cb && cb(params);
      }
    }]);
    return Sortable;
  }();

  var VirtualAttrs = ['size', 'keeps', 'scroller', 'direction', 'debounceTime', 'throttleTime'];
  var Virtual = /*#__PURE__*/function () {
    function Virtual(options) {
      _classCallCheck(this, Virtual);
      this.options = options;
      var defaults = {
        size: 0,
        keeps: 0,
        buffer: 0,
        wrapper: null,
        scroller: null,
        direction: 'vertical',
        uniqueKeys: [],
        debounceTime: null,
        throttleTime: null
      };
      for (var name in defaults) {
        !(name in this.options) && (this.options[name] = defaults[name]);
      }
      this.sizes = new Map(); // store item size
      this.sizeType = 'INIT';
      this.fixedSize = 0;
      this.averageSize = 0;
      this.range = {
        start: 0,
        end: 0,
        front: 0,
        behind: 0
      };
      this.offset = 0;
      this.direction = 'STATIONARY';
      this.updateScrollElement();
      this.updateOnScrollFunction();
      this.addScrollEventListener();
      this.checkIfUpdate(0, options.keeps - 1);
    }
    _createClass(Virtual, [{
      key: "isFixed",
      value: function isFixed() {
        return this.sizeType === 'FIXED';
      }
    }, {
      key: "isFront",
      value: function isFront() {
        return this.direction === 'FRONT';
      }
    }, {
      key: "isBehind",
      value: function isBehind() {
        return this.direction === 'BEHIND';
      }
    }, {
      key: "isHorizontal",
      value: function isHorizontal() {
        return this.options.direction === 'horizontal';
      }
    }, {
      key: "getSize",
      value: function getSize(key) {
        return this.sizes.get(key) || this.getItemSize();
      }
    }, {
      key: "getOffset",
      value: function getOffset() {
        var offsetKey = this.isHorizontal() ? 'scrollLeft' : 'scrollTop';
        return this.scrollEl[offsetKey];
      }
    }, {
      key: "getScrollSize",
      value: function getScrollSize() {
        var sizeKey = this.isHorizontal() ? 'scrollWidth' : 'scrollHeight';
        return this.scrollEl[sizeKey];
      }
    }, {
      key: "getClientSize",
      value: function getClientSize() {
        var sizeKey = this.isHorizontal() ? 'offsetWidth' : 'offsetHeight';
        return this.scrollEl[sizeKey];
      }
    }, {
      key: "scrollToOffset",
      value: function scrollToOffset(offset) {
        var offsetKey = this.isHorizontal() ? 'scrollLeft' : 'scrollTop';
        this.scrollEl[offsetKey] = offset;
      }
    }, {
      key: "scrollToIndex",
      value: function scrollToIndex(index) {
        if (index >= this.options.uniqueKeys.length - 1) {
          this.scrollToBottom();
        } else {
          var indexOffset = this.getOffsetByRange(0, index);
          var startOffset = this.getScrollStartOffset();
          this.scrollToOffset(indexOffset + startOffset);
        }
      }
    }, {
      key: "scrollToBottom",
      value: function scrollToBottom() {
        var _this = this;
        var offset = this.getScrollSize();
        this.scrollToOffset(offset);
        // if the bottom is not reached, execute the scroll method again
        setTimeout(function () {
          var clientSize = _this.getClientSize();
          var scrollSize = _this.getScrollSize();
          var scrollOffset = _this.getOffset();
          if (scrollOffset + clientSize + 1 < scrollSize) {
            _this.scrollToBottom();
          }
        }, 5);
      }
    }, {
      key: "option",
      value: function option(key, value) {
        var _this2 = this;
        var oldValue = this.options[key];
        this.options[key] = value;
        if (key === 'uniqueKeys') {
          this.sizes.forEach(function (_v, k) {
            if (!value.includes(k)) {
              _this2.sizes["delete"](k);
            }
          });
        }
        if (key === 'scroller') {
          oldValue && Dnd.utils.off(oldValue, 'scroll', this.onScroll);
          this.updateScrollElement();
          this.addScrollEventListener();
        }
      }
    }, {
      key: "updateRange",
      value: function updateRange(range) {
        if (range) {
          this.handleUpdate(range.start);
          return;
        }
        var start = this.range.start;
        start = Math.max(start, 0);
        this.handleUpdate(start);
      }
    }, {
      key: "onItemResized",
      value: function onItemResized(key, size) {
        if (!size || this.sizes.get(key) === size) {
          return;
        }
        this.sizes.set(key, size);
        if (this.sizeType === 'INIT') {
          this.sizeType = 'FIXED';
          this.fixedSize = size;
        } else if (this.isFixed() && this.fixedSize !== size) {
          this.sizeType = 'DYNAMIC';
          this.fixedSize = 0;
        }
        // calculate the average size only once
        if (!this.averageSize && this.sizeType === 'DYNAMIC' && this.sizes.size === this.options.keeps) {
          this.updateAverageSize();
        }
      }
    }, {
      key: "updateAverageSize",
      value: function updateAverageSize() {
        var total = _toConsumableArray(this.sizes.values()).reduce(function (t, i) {
          return t + i;
        }, 0);
        this.averageSize = Math.round(total / this.sizes.size);
      }
    }, {
      key: "addScrollEventListener",
      value: function addScrollEventListener() {
        if (this.options.scroller) {
          Dnd.utils.on(this.options.scroller, 'scroll', this.onScroll);
        }
      }
    }, {
      key: "removeScrollEventListener",
      value: function removeScrollEventListener() {
        if (this.options.scroller) {
          Dnd.utils.off(this.options.scroller, 'scroll', this.onScroll);
        }
      }
    }, {
      key: "enableScroll",
      value: function enableScroll(scrollable) {
        var scroller = this.options.scroller;
        var eventFn = scrollable ? Dnd.utils.off : Dnd.utils.on;
        var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
        eventFn(scroller, 'DOMMouseScroll', this.preventDefault);
        eventFn(scroller, wheelEvent, this.preventDefault);
        eventFn(scroller, 'touchmove', this.preventDefault);
        eventFn(scroller, 'keydown', this.preventDefaultForKeyDown);
      }
    }, {
      key: "preventDefault",
      value: function preventDefault(e) {
        e.preventDefault();
      }
    }, {
      key: "preventDefaultForKeyDown",
      value: function preventDefaultForKeyDown(e) {
        var keys = {
          37: 1,
          38: 1,
          39: 1,
          40: 1
        };
        if (keys[e.keyCode]) {
          this.preventDefault(e);
          return false;
        }
      }
    }, {
      key: "updateScrollElement",
      value: function updateScrollElement() {
        var scroller = this.options.scroller;
        if (elementIsDocumentOrWindow(scroller)) {
          var scrollEl = document.scrollingElement || document.documentElement || document.body;
          this.scrollEl = scrollEl;
        } else {
          this.scrollEl = scroller;
        }
      }
    }, {
      key: "updateOnScrollFunction",
      value: function updateOnScrollFunction() {
        var _this3 = this;
        var _this$options = this.options,
          debounceTime = _this$options.debounceTime,
          throttleTime = _this$options.throttleTime;
        if (debounceTime) {
          this.onScroll = debounce(function () {
            return _this3.handleScroll();
          }, debounceTime);
        } else if (throttleTime) {
          this.onScroll = throttle(function () {
            return _this3.handleScroll();
          }, throttleTime);
        } else {
          this.onScroll = function () {
            return _this3.handleScroll();
          };
        }
      }
    }, {
      key: "handleScroll",
      value: function handleScroll() {
        var offset = this.getOffset();
        var clientSize = this.getClientSize();
        var scrollSize = this.getScrollSize();
        if (offset === this.offset) {
          this.direction = 'STATIONARY';
        } else {
          this.direction = offset < this.offset ? 'FRONT' : 'BEHIND';
        }
        this.offset = offset;
        var top = this.isFront() && offset <= 0;
        var bottom = this.isBehind() && clientSize + offset + 1 >= scrollSize;
        this.options.onScroll({
          top: top,
          bottom: bottom,
          offset: offset,
          direction: this.direction
        });
        if (this.isFront()) {
          this.handleScrollFront();
        } else if (this.isBehind()) {
          this.handleScrollBehind();
        }
      }
    }, {
      key: "handleScrollFront",
      value: function handleScrollFront() {
        var scrolls = this.getScrollItems();
        if (scrolls >= this.range.start) {
          return;
        }
        var start = Math.max(scrolls - this.options.buffer, 0);
        this.checkIfUpdate(start, this.getEndByStart(start));
      }
    }, {
      key: "handleScrollBehind",
      value: function handleScrollBehind() {
        var scrolls = this.getScrollItems();
        if (scrolls < this.range.start + this.options.buffer) {
          return;
        }
        this.checkIfUpdate(scrolls, this.getEndByStart(scrolls));
      }
    }, {
      key: "getScrollItems",
      value: function getScrollItems() {
        var offset = this.offset - this.getScrollStartOffset();
        if (offset <= 0) {
          return 0;
        }
        if (this.isFixed()) {
          return Math.floor(offset / this.fixedSize);
        }
        var low = 0;
        var high = this.options.uniqueKeys.length;
        var middle = 0;
        var middleOffset = 0;
        while (low <= high) {
          middle = low + Math.floor((high - low) / 2);
          middleOffset = this.getOffsetByRange(0, middle);
          if (middleOffset === offset) {
            return middle;
          } else if (middleOffset < offset) {
            low = middle + 1;
          } else if (middleOffset > offset) {
            high = middle - 1;
          }
        }
        return low > 0 ? --low : 0;
      }
    }, {
      key: "checkIfUpdate",
      value: function checkIfUpdate(start, end) {
        var keeps = this.options.keeps;
        var total = this.options.uniqueKeys.length;
        if (total <= keeps) {
          start = 0;
        } else if (end - start < keeps - 1) {
          start = end - keeps + 1;
        }
        if (this.range.start !== start) {
          this.handleUpdate(start);
        }
      }
    }, {
      key: "handleUpdate",
      value: function handleUpdate(start) {
        this.range.start = start;
        this.range.end = this.getEndByStart(start);
        this.range.front = this.getFrontOffset();
        this.range.behind = this.getBehindOffset();
        this.options.onUpdate(Object.assign({}, this.range));
      }
    }, {
      key: "getFrontOffset",
      value: function getFrontOffset() {
        if (this.isFixed()) {
          return this.fixedSize * this.range.start;
        } else {
          return this.getOffsetByRange(0, this.range.start);
        }
      }
    }, {
      key: "getBehindOffset",
      value: function getBehindOffset() {
        var end = this.range.end;
        var last = this.getLastIndex();
        if (this.isFixed()) {
          return (last - end) * this.fixedSize;
        }
        return (last - end) * this.getItemSize();
      }
    }, {
      key: "getOffsetByRange",
      value: function getOffsetByRange(start, end) {
        if (start >= end) {
          return 0;
        }
        var offset = 0;
        for (var i = start; i < end; i++) {
          var size = this.sizes.get(this.options.uniqueKeys[i]);
          offset = offset + (typeof size === 'number' ? size : this.getItemSize());
        }
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
        return this.isFixed() ? this.fixedSize : this.options.size || this.averageSize;
      }
    }, {
      key: "getScrollStartOffset",
      value: function getScrollStartOffset() {
        var _this$options3 = this.options,
          wrapper = _this$options3.wrapper,
          scroller = _this$options3.scroller;
        if (scroller === wrapper) {
          return 0;
        }
        var offset = 0;
        if (scroller && wrapper) {
          var offsetKey = this.isHorizontal() ? 'left' : 'top';
          var rect = elementIsDocumentOrWindow(scroller) ? Dnd.utils.getRect(wrapper) : Dnd.utils.getRect(wrapper, true, scroller);
          offset = this.offset + rect[offsetKey];
        }
        return offset;
      }
    }]);
    return Virtual;
  }();

  function Item(props) {
    var dataKey = props.dataKey,
      sizeKey = props.sizeKey,
      dragging = props.dragging,
      chosenKey = props.chosenKey,
      children = props.children,
      onSizeChange = props.onSizeChange;
    var eleRef = React__namespace.useRef(null);
    React__namespace.useLayoutEffect(function () {
      var observer;
      if ((typeof ResizeObserver === "undefined" ? "undefined" : _typeof(ResizeObserver)) !== undefined) {
        observer = new ResizeObserver(function () {
          var size = eleRef.current[sizeKey];
          onSizeChange(dataKey, size);
        });
        eleRef.current && (observer === null || observer === void 0 ? void 0 : observer.observe(eleRef.current));
      }
      return function () {
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      };
    }, [eleRef]);
    var itemStyle = React__namespace.useMemo(function () {
      var style = children.props.style || {};
      var isChosen = isSameValue(dataKey, chosenKey);
      if (dragging && isChosen) {
        return Object.assign(style, {
          display: 'none'
        });
      }
      return style;
    }, [chosenKey, dragging]);
    return /*#__PURE__*/React__namespace.cloneElement(children, {
      'data-key': dataKey,
      role: 'item',
      ref: eleRef,
      style: itemStyle,
      className: children.props.className
    });
  }
  var Item$1 = /*#__PURE__*/React__namespace.memo(Item);

  function useChildren(props) {
    var list = props.list,
      start = props.start,
      end = props.end,
      dataKey = props.dataKey,
      sizeKey = props.sizeKey,
      dragging = props.dragging,
      chosenKey = props.chosenKey,
      children = props.children,
      onSizeChange = props.onSizeChange;
    return list.slice(start, end + 1).map(function (item, i) {
      var index = start + i;
      var key = getDataKey(item, dataKey);
      return /*#__PURE__*/React__namespace.createElement(Item$1, {
        key: key,
        dataKey: key,
        sizeKey: sizeKey,
        dragging: dragging,
        chosenKey: chosenKey,
        onSizeChange: onSizeChange
      }, typeof children === 'function' ? children(item, index, key) : children);
    });
  }

  function useCombine(states, effect) {
    React__namespace.useEffect(effect, Object.values(states));
  }

  var Emits = {
    drag: 'onDrag',
    drop: 'onDrop',
    top: 'onTop',
    bottom: 'onBottom'
  };
  function VirtualList(props, ref) {
    var _props$dataKey = props.dataKey,
      dataKey = _props$dataKey === void 0 ? '' : _props$dataKey,
      _props$dataSource = props.dataSource,
      dataSource = _props$dataSource === void 0 ? [] : _props$dataSource,
      _props$tableMode = props.tableMode,
      tableMode = _props$tableMode === void 0 ? false : _props$tableMode,
      _props$wrapTag = props.wrapTag,
      wrapTag = _props$wrapTag === void 0 ? 'div' : _props$wrapTag,
      _props$rootTag = props.rootTag,
      rootTag = _props$rootTag === void 0 ? 'div' : _props$rootTag,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      _props$wrapStyle = props.wrapStyle,
      wrapStyle = _props$wrapStyle === void 0 ? {} : _props$wrapStyle,
      _props$wrapClass = props.wrapClass,
      wrapClass = _props$wrapClass === void 0 ? '' : _props$wrapClass,
      _props$size = props.size,
      size = _props$size === void 0 ? undefined : _props$size,
      _props$keeps = props.keeps,
      keeps = _props$keeps === void 0 ? 30 : _props$keeps,
      _props$scroller = props.scroller,
      scroller = _props$scroller === void 0 ? undefined : _props$scroller,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'vertical' : _props$direction,
      _props$debounceTime = props.debounceTime,
      debounceTime = _props$debounceTime === void 0 ? 0 : _props$debounceTime,
      _props$throttleTime = props.throttleTime,
      throttleTime = _props$throttleTime === void 0 ? 0 : _props$throttleTime,
      _props$delay = props.delay,
      delay = _props$delay === void 0 ? 0 : _props$delay,
      _props$group = props.group,
      group = _props$group === void 0 ? '' : _props$group,
      _props$handle = props.handle,
      handle = _props$handle === void 0 ? '' : _props$handle,
      _props$lockAxis = props.lockAxis,
      lockAxis = _props$lockAxis === void 0 ? undefined : _props$lockAxis,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$sortable = props.sortable,
      sortable = _props$sortable === void 0 ? true : _props$sortable,
      _props$draggable = props.draggable,
      draggable = _props$draggable === void 0 ? '[role="item"]' : _props$draggable,
      _props$animation = props.animation,
      animation = _props$animation === void 0 ? 150 : _props$animation,
      _props$autoScroll = props.autoScroll,
      autoScroll = _props$autoScroll === void 0 ? true : _props$autoScroll,
      _props$scrollSpeed = props.scrollSpeed,
      scrollSpeed = _props$scrollSpeed === void 0 ? {
        x: 10,
        y: 10
      } : _props$scrollSpeed,
      _props$ghostClass = props.ghostClass,
      ghostClass = _props$ghostClass === void 0 ? '' : _props$ghostClass,
      _props$ghostStyle = props.ghostStyle,
      ghostStyle = _props$ghostStyle === void 0 ? undefined : _props$ghostStyle,
      _props$chosenClass = props.chosenClass,
      chosenClass = _props$chosenClass === void 0 ? '' : _props$chosenClass,
      _props$placeholderCla = props.placeholderClass,
      placeholderClass = _props$placeholderCla === void 0 ? '' : _props$placeholderCla,
      _props$fallbackOnBody = props.fallbackOnBody,
      fallbackOnBody = _props$fallbackOnBody === void 0 ? false : _props$fallbackOnBody,
      _props$scrollThreshol = props.scrollThreshold,
      scrollThreshold = _props$scrollThreshol === void 0 ? 55 : _props$scrollThreshol,
      _props$delayOnTouchOn = props.delayOnTouchOnly,
      delayOnTouchOnly = _props$delayOnTouchOn === void 0 ? false : _props$delayOnTouchOn;
    var _React$useState = React__namespace.useState({
        start: 0,
        end: keeps - 1,
        front: 0,
        behind: 0
      }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      range = _React$useState2[0],
      setRange = _React$useState2[1];
    var dragging = React__namespace.useRef(false);
    var chosenKey = React__namespace.useRef('');
    var uniqueKeys = React__namespace.useRef([]);
    var rootRef = React__namespace.useRef();
    var wrapRef = React__namespace.useRef();
    /**
     * git item size by data-key
     */
    var getSize = function getSize(key) {
      return virtualRef.current.getSize(key);
    };
    /**
     * Get the current scroll height
     */
    var getOffset = function getOffset() {
      return virtualRef.current.getOffset();
    };
    /**
     * Get client viewport size
     */
    var getClientSize = function getClientSize() {
      return virtualRef.current.getClientSize();
    };
    /**
     * Get all scroll size
     */
    var getScrollSize = function getScrollSize() {
      return virtualRef.current.getScrollSize();
    };
    /**
     * Scroll to the specified offset
     */
    var scrollToOffset = function scrollToOffset(offset) {
      var _a;
      (_a = virtualRef.current) === null || _a === void 0 ? void 0 : _a.scrollToOffset(offset);
    };
    /**
     * Scroll to the specified index position
     */
    var scrollToIndex = function scrollToIndex(index) {
      var _a;
      (_a = virtualRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex(index);
    };
    /**
     * Scroll to the specified data-key position
     */
    var scrollToKey = function scrollToKey(key) {
      var _a;
      var index = uniqueKeys.current.indexOf(key);
      if (index > -1) {
        (_a = virtualRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex(index);
      }
    };
    /**
     * Scroll to top of list
     */
    var scrollToTop = function scrollToTop() {
      scrollToOffset(0);
    };
    /**
     * Scroll to bottom of list
     */
    var scrollToBottom = function scrollToBottom() {
      var _a;
      (_a = virtualRef.current) === null || _a === void 0 ? void 0 : _a.scrollToBottom();
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        getSize: getSize,
        getOffset: getOffset,
        getClientSize: getClientSize,
        getScrollSize: getScrollSize,
        scrollToTop: scrollToTop,
        scrollToKey: scrollToKey,
        scrollToIndex: scrollToIndex,
        scrollToOffset: scrollToOffset,
        scrollToBottom: scrollToBottom
      };
    });
    React__namespace.useEffect(function () {
      installVirtual();
      installSortable();
      return function () {
        var _a, _b;
        (_a = virtualRef.current) === null || _a === void 0 ? void 0 : _a.removeScrollEventListener();
        (_b = sortableRef.current) === null || _b === void 0 ? void 0 : _b.destroy();
      };
    }, []);
    // ========================================== use virtual ==========================================
    var topLoading = React__namespace.useRef(false);
    var virtualRef = React__namespace.useRef();
    var virtualCombinedStates = {
      size: size,
      keeps: keeps,
      scroller: scroller,
      direction: direction,
      debounceTime: debounceTime,
      throttleTime: throttleTime
    };
    var handleToTop = debounce(function () {
      var _a;
      topLoading.current = true;
      (_a = props[Emits.top]) === null || _a === void 0 ? void 0 : _a.call(props);
    }, 50);
    var handleToBottom = debounce(function () {
      var _a;
      (_a = props[Emits.bottom]) === null || _a === void 0 ? void 0 : _a.call(props);
    }, 50);
    var onScroll = function onScroll(event) {
      topLoading.current = false;
      if (event.top) {
        handleToTop();
      } else if (event.bottom) {
        handleToBottom();
      }
    };
    var onUpdate = function onUpdate(range) {
      setRange(function (current) {
        if (sortableRef.current && dragging.current && range.start !== current.start) {
          sortableRef.current.rangeChanged = true;
        }
        return range;
      });
    };
    var installVirtual = function installVirtual() {
      virtualRef.current = new Virtual(Object.assign(Object.assign({}, virtualCombinedStates), {
        buffer: Math.round(keeps / 3),
        wrapper: wrapRef.current,
        scroller: scroller || rootRef.current,
        uniqueKeys: uniqueKeys.current,
        onScroll: onScroll,
        onUpdate: onUpdate
      }));
    };
    useCombine(virtualCombinedStates, function () {
      VirtualAttrs.forEach(function (key) {
        var _a;
        if (props[key] !== undefined) {
          (_a = virtualRef.current) === null || _a === void 0 ? void 0 : _a.option(key, props[key]);
        }
      });
    });
    var lastLength = React__namespace.useRef(0);
    React__namespace.useEffect(function () {
      var _a;
      // if auto scroll to the last offset
      if (lastLength.current && topLoading.current && props.keepOffset) {
        var index = Math.abs(dataSource.length - lastLength.current);
        if (index > 0) {
          (_a = virtualRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex(index);
        }
        topLoading.current = false;
      }
      lastLength.current = dataSource.length;
    }, [dataSource]);
    // ========================================== use dnd ==========================================
    var sortableRef = React__namespace.useRef();
    var sortableCombinedStates = {
      delay: delay,
      group: group,
      handle: handle,
      lockAxis: lockAxis,
      disabled: disabled,
      sortable: sortable,
      draggable: draggable,
      animation: animation,
      autoScroll: autoScroll,
      ghostClass: ghostClass,
      ghostStyle: ghostStyle,
      chosenClass: chosenClass,
      scrollSpeed: scrollSpeed,
      fallbackOnBody: fallbackOnBody,
      scrollThreshold: scrollThreshold,
      delayOnTouchOnly: delayOnTouchOnly,
      placeholderClass: placeholderClass
    };
    var onChoose = function onChoose(event) {
      chosenKey.current = event.node.getAttribute('data-key');
    };
    var onUnchoose = function onUnchoose() {
      chosenKey.current = '';
    };
    var onDrag = function onDrag(event) {
      var _a, _b, _c;
      dragging.current = true;
      if (!sortable) {
        (_a = virtualRef.current) === null || _a === void 0 ? void 0 : _a.enableScroll(false);
        (_b = sortableRef.current) === null || _b === void 0 ? void 0 : _b.option('autoScroll', false);
      }
      (_c = props[Emits.drag]) === null || _c === void 0 ? void 0 : _c.call(props, event);
    };
    var onDrop = function onDrop(event) {
      var _a, _b, _c;
      dragging.current = false;
      (_a = virtualRef.current) === null || _a === void 0 ? void 0 : _a.enableScroll(true);
      (_b = sortableRef.current) === null || _b === void 0 ? void 0 : _b.option('autoScroll', props.autoScroll);
      var params = Object.assign(Object.assign({}, event), {
        list: _toConsumableArray(event.list)
      });
      (_c = props[Emits.drop]) === null || _c === void 0 ? void 0 : _c.call(props, params);
    };
    var installSortable = function installSortable() {
      sortableRef.current = new Sortable(rootRef.current, Object.assign(Object.assign({}, sortableCombinedStates), {
        list: dataSource,
        uniqueKeys: uniqueKeys.current,
        onDrag: onDrag,
        onDrop: onDrop,
        onChoose: onChoose,
        onUnchoose: onUnchoose
      }));
    };
    useCombine(sortableCombinedStates, function () {
      SortableAttrs.forEach(function (key) {
        var _a;
        if (props[key] !== undefined) {
          (_a = sortableRef.current) === null || _a === void 0 ? void 0 : _a.option(key, props[key]);
        }
      });
    });
    // ========================================== layout ==========================================
    var list = React__namespace.useRef([]);
    React__namespace.useEffect(function () {
      var _a;
      updateUniqueKeys();
      updateRange(list.current, dataSource);
      list.current = dataSource;
      (_a = sortableRef.current) === null || _a === void 0 ? void 0 : _a.option('list', dataSource);
    }, [dataSource]);
    var updateUniqueKeys = function updateUniqueKeys() {
      var _a, _b;
      uniqueKeys.current = dataSource.map(function (item) {
        return getDataKey(item, dataKey);
      });
      (_a = virtualRef.current) === null || _a === void 0 ? void 0 : _a.option('uniqueKeys', uniqueKeys.current);
      (_b = sortableRef.current) === null || _b === void 0 ? void 0 : _b.option('uniqueKeys', uniqueKeys.current);
    };
    var updateRange = function updateRange(oldList, newList) {
      var _a;
      if (!oldList.length && !newList.length) {
        return;
      }
      if (oldList.length === newList.length) {
        return;
      }
      var newRange = Object.assign({}, range);
      if (oldList.length > keeps && newList.length > oldList.length && newRange.end === oldList.length - 1 && scrolledToBottom()) {
        newRange.start++;
      }
      (_a = virtualRef.current) === null || _a === void 0 ? void 0 : _a.updateRange(newRange);
    };
    var scrolledToBottom = function scrolledToBottom() {
      var offset = getOffset();
      var clientSize = getClientSize();
      var scrollSize = getScrollSize();
      return offset + clientSize + 1 >= scrollSize;
    };
    var onSizeChange = function onSizeChange(key, size) {
      var _a, _b;
      // ignore changes for dragging element
      if (isSameValue(key, chosenKey.current)) {
        return;
      }
      var sizes = (_a = virtualRef.current) === null || _a === void 0 ? void 0 : _a.sizes.size;
      var renders = Math.min(keeps, dataSource.length);
      (_b = virtualRef.current) === null || _b === void 0 ? void 0 : _b.onItemResized(key, size);
      if (sizes === renders - 1) {
        virtualRef.current.updateRange(Object.assign({}, range));
      }
    };
    var _React$useMemo = React__namespace.useMemo(function () {
        var front = range.front,
          behind = range.behind;
        var isHorizontal = direction !== 'vertical';
        var overflowStyle = isHorizontal ? 'auto hidden' : 'hidden auto';
        var padding = isHorizontal ? "0px ".concat(behind, "px 0px ").concat(front, "px") : "".concat(front, "px 0px ").concat(behind, "px");
        var containerStyle = Object.assign(Object.assign({}, style), {
          overflow: tableMode || scroller ? '' : overflowStyle
        });
        var wrapperStyle = Object.assign(Object.assign({}, wrapStyle), {
          padding: tableMode ? '' : padding
        });
        var itemSizeKey = isHorizontal ? 'offsetWidth' : 'offsetHeight';
        return {
          containerStyle: containerStyle,
          wrapperStyle: wrapperStyle,
          itemSizeKey: itemSizeKey
        };
      }, [range, style, wrapStyle, scroller, tableMode, direction]),
      containerStyle = _React$useMemo.containerStyle,
      wrapperStyle = _React$useMemo.wrapperStyle,
      itemSizeKey = _React$useMemo.itemSizeKey;
    var _React$useMemo2 = React__namespace.useMemo(function () {
        var container = tableMode ? 'table' : wrapTag;
        var wrapper = tableMode ? 'tbody' : wrapTag;
        return [container, wrapper];
      }, [rootTag, wrapTag, tableMode]),
      _React$useMemo3 = _slicedToArray(_React$useMemo2, 2),
      containerTag = _React$useMemo3[0],
      wrapperTage = _React$useMemo3[1];
    var listChildren = useChildren({
      list: dataSource,
      start: range.start,
      end: range.end,
      dataKey: dataKey,
      sizeKey: itemSizeKey,
      children: props.children,
      dragging: dragging.current,
      chosenKey: chosenKey.current,
      onSizeChange: onSizeChange
    });
    var TableSpacer = function TableSpacer(offset, key) {
      var offsetKey = direction === 'vertical' ? 'height' : 'width';
      var style = _defineProperty({
        padding: 0,
        border: 0
      }, offsetKey, "".concat(offset, "px"));
      return /*#__PURE__*/React__namespace.createElement("tr", {
        key: key
      }, /*#__PURE__*/React__namespace.createElement("td", {
        style: style
      }));
    };
    return /*#__PURE__*/React__namespace.createElement(containerTag, {
      ref: rootRef,
      style: containerStyle,
      className: className
    }, [props.header, /*#__PURE__*/React__namespace.createElement(wrapperTage, {
      ref: wrapRef,
      key: 'virtual-table-wrap',
      style: wrapperStyle,
      className: wrapClass
    }, [tableMode && TableSpacer(range.front, 'virtual-table-front')].concat(_toConsumableArray(listChildren), [tableMode && TableSpacer(range.behind, 'virtual-table-behind')])), props.footer]);
  }
  var index = /*#__PURE__*/React__namespace.forwardRef(VirtualList);

  return index;

}));
