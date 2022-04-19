/*!
 * react-virtual-drag-list v2.2.0
 * open source under the MIT license
 * https://github.com/mfuu/react-virtual-drag-list#readme
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.virtualDragList = {}, global.React));
})(this, (function (exports, React) { 'use strict';

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

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var sortable = createCommonjsModule(function (module, exports) {
	/*!
	 * sortable-dnd v0.0.6
	 * open source under the MIT license
	 * https://github.com/mfuu/sortable-dnd#readme
	 */
	(function (global, factory) {
	  module.exports = factory() ;
	})(commonjsGlobal, function () {

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

	  function _toConsumableArray(arr) {
	    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	  }

	  function _arrayWithoutHoles(arr) {
	    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	  }

	  function _iterableToArray(iter) {
	    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
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

	  function userAgent(pattern) {
	    if (typeof window !== 'undefined' && window.navigator) {
	      return !! /*@__PURE__*/navigator.userAgent.match(pattern);
	    }
	  }

	  var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
	  var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
	  var captureMode = {
	    capture: false,
	    passive: false
	  };
	  var utils = {
	    on: function on(el, event, fn) {
	      el.addEventListener(event, fn, !IE11OrLess && captureMode);
	    },
	    off: function off(el, event, fn) {
	      el.removeEventListener(event, fn, !IE11OrLess && captureMode);
	    },
	    getWindowScrollingElement: function getWindowScrollingElement() {
	      var scrollingElement = document.scrollingElement;

	      if (scrollingElement) {
	        return scrollingElement;
	      } else {
	        return document.documentElement;
	      }
	    },
	    index: function index(group, el) {
	      if (!el || !el.parentNode) return -1;

	      var children = _toConsumableArray(Array.from(group.children));

	      return children.indexOf(el);
	    },
	    getRect: function getRect(children, index) {
	      if (!children.length) return {};
	      if (index < 0) return {};
	      return children[index].getBoundingClientRect();
	    },
	    getElement: function getElement(group, dragging) {
	      var result = {
	        index: -1,
	        el: null,
	        rect: {}
	      };

	      var children = _toConsumableArray(Array.from(group.children)); // 如果能直接在子元素中找到，返回对应的index


	      var index = children.indexOf(dragging);
	      if (index > -1) Object.assign(result, {
	        index: index,
	        el: children[index],
	        rect: children[index].getBoundingClientRect()
	      }); // children 中无法直接找到对应的dom时，需要向下寻找

	      for (var i = 0; i < children.length; i++) {
	        if (this.isChildOf(dragging, children[i])) Object.assign(result, {
	          index: i,
	          el: children[i],
	          rect: children[i].getBoundingClientRect()
	        });
	      }

	      return result;
	    },
	    // 判断子元素是否包含在父元素中
	    isChildOf: function isChildOf(child, parent) {
	      var parentNode;

	      if (child && parent) {
	        parentNode = child.parentNode;

	        while (parentNode) {
	          if (parent === parentNode) return true;
	          parentNode = parentNode.parentNode;
	        }
	      }

	      return false;
	    },
	    animate: function animate(el, preRect) {
	      var _this = this;

	      var animation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
	      var curRect = el.getBoundingClientRect();
	      var left = preRect.left - curRect.left;
	      var top = preRect.top - curRect.top;
	      this.css(el, 'transition', 'none');
	      this.css(el, 'transform', "translate3d(".concat(left, "px, ").concat(top, "px, 0)"));
	      el.offsetLeft; // 触发重绘

	      this.css(el, 'transition', "all ".concat(animation, "ms"));
	      this.css(el, 'transform', 'translate3d(0px, 0px, 0px)');
	      clearTimeout(el.animated);
	      el.animated = setTimeout(function () {
	        _this.css(el, 'transition', '');

	        _this.css(el, 'transform', '');

	        el.animated = null;
	      }, animation);
	    },
	    css: function css(el, prop, val) {
	      var style = el && el.style;

	      if (style) {
	        if (val === void 0) {
	          if (document.defaultView && document.defaultView.getComputedStyle) {
	            val = document.defaultView.getComputedStyle(el, '');
	          } else if (el.currentStyle) {
	            val = el.currentStyle;
	          }

	          return prop === void 0 ? val : val[prop];
	        } else {
	          if (!(prop in style) && prop.indexOf('webkit') === -1) {
	            prop = '-webkit-' + prop;
	          }

	          style[prop] = val + (typeof val === 'string' ? '' : 'px');
	        }
	      }
	    },
	    debounce: function debounce(fn, delay) {
	      return function () {
	        var _this2 = this;

	        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        clearTimeout(fn.id);
	        fn.id = setTimeout(function () {
	          fn.call.apply(fn, [_this2].concat(args));
	        }, delay);
	      };
	    }
	  };
	  /**
	   * 拖拽前后差异初始化
	   */

	  var Diff = /*#__PURE__*/function () {
	    function Diff() {
	      _classCallCheck(this, Diff);

	      this.old = {
	        node: null,
	        rect: {}
	      };
	      this["new"] = {
	        node: null,
	        rect: {}
	      };
	    }

	    _createClass(Diff, [{
	      key: "get",
	      value: function get(key) {
	        return this[key];
	      }
	    }, {
	      key: "set",
	      value: function set(key, value) {
	        this[key] = value;
	      }
	    }, {
	      key: "destroy",
	      value: function destroy() {
	        this.old = {
	          node: null,
	          rect: {}
	        };
	        this["new"] = {
	          node: null,
	          rect: {}
	        };
	      }
	    }]);

	    return Diff;
	  }();
	  /**
	   * 拖拽中的元素
	   */


	  var Ghost = /*#__PURE__*/function () {
	    function Ghost(options) {
	      _classCallCheck(this, Ghost);

	      this.options = options;
	      this.x = 0;
	      this.y = 0;
	      this.exist = false;
	    }

	    _createClass(Ghost, [{
	      key: "init",
	      value: function init(el, rect) {
	        if (!el) {
	          console.error('Ghost Element is required');
	          return;
	        }

	        this.$el = el;
	        this.rect = rect;
	        var _this$options = this.options,
	            ghostClass = _this$options.ghostClass,
	            _this$options$ghostSt = _this$options.ghostStyle,
	            ghostStyle = _this$options$ghostSt === void 0 ? {} : _this$options$ghostSt;
	        var width = rect.width,
	            height = rect.height;
	        this.$el["class"] = ghostClass;
	        this.$el.style.width = width + 'px';
	        this.$el.style.height = height + 'px';
	        this.$el.style.transform = '';
	        this.$el.style.transition = '';
	        this.$el.style.position = 'fixed';
	        this.$el.style.left = 0;
	        this.$el.style.top = 0;
	        this.$el.style.zIndex = 100000;
	        this.$el.style.opacity = 0.8;
	        this.$el.style.pointerEvents = 'none';

	        for (var key in ghostStyle) {
	          utils.css(this.$el, key, ghostStyle[key]);
	        }
	      }
	    }, {
	      key: "get",
	      value: function get(key) {
	        return this[key];
	      }
	    }, {
	      key: "set",
	      value: function set(key, value) {
	        this[key] = value;
	        this[key] = value;
	      }
	    }, {
	      key: "move",
	      value: function move() {
	        // 将初始化放在 move 事件中，避免与鼠标点击事件冲突
	        if (!this.exist) {
	          document.body.appendChild(this.$el);
	          this.exist = true;
	        }

	        this.$el.style.transform = "translate3d(".concat(this.x, "px, ").concat(this.y, "px, 0)");
	      }
	    }, {
	      key: "destroy",
	      value: function destroy() {
	        if (this.$el) this.$el.remove();
	        this.exist = false;
	      }
	    }]);

	    return Ghost;
	  }();
	  /**
	   * @interface Options {
	   * 
	   * group: HTMLElement,
	   * 
	   * draggable?: Function, return element node selected when dragging, or null
	   * 
	   * dragEnd?: Function, The callback function when the drag is completed
	   * 
	   * ghostStyle?: Object,
	   * 
	   * ghostClass?: String,
	   * 
	   * }
	   */


	  var Sortable = /*#__PURE__*/function () {
	    function Sortable(options) {
	      _classCallCheck(this, Sortable);

	      this.group = options.group; // 父级元素

	      this.dragging = options.dragging; // 必须为函数且必须返回一个 HTMLElement (e) => return e.target

	      this.dragEnd = options.dragEnd; // 拖拽完成时的回调函数，返回两个值(olddom, newdom) => {}

	      this.ghostStyle = options.ghostStyle; // 克隆元素包含的属性

	      this.ghostClass = options.ghostClass; // 克隆元素的类名

	      this.animation = options.animation || 300; // 动画延迟

	      this.isMousedown = false; // 记录鼠标按下

	      this.isMousemove = false; // 记录鼠标移动

	      this.dragEl = null; // 拖拽元素

	      this.dropEl = null; // 释放元素

	      this.diff = new Diff(); // 记录拖拽前后差异

	      this.ghost = new Ghost({
	        ghostClass: this.ghostClass,
	        ghostStyle: this.ghostStyle
	      });
	      this.supportPointer = 'PointerEvent' in window && !Safari;
	      this.calcXY = {
	        x: 0,
	        y: 0
	      };
	      utils.debounce(this.init(), 50); // 避免重复执行多次
	    }

	    _createClass(Sortable, [{
	      key: "init",
	      value: function init() {
	        if (!this.group) {
	          console.error('Error: group is required');
	          return;
	        }

	        this._bindEventListener();
	      }
	    }, {
	      key: "destroy",
	      value: function destroy() {
	        this._unbindEventListener();

	        this._resetState();
	      }
	    }, {
	      key: "_onStart",
	      value: function _onStart(e) {
	        if (e.button !== 0) return true;
	        if (e.target === this.group) return true;

	        try {
	          // 获取拖拽元素
	          var element = this.dragging ? this.dragging(e) : e.target; // 不存在拖拽元素时不允许拖拽

	          if (!element) return true;
	          if (element.animated) return;
	          this.dragEl = element;
	        } catch (e) {
	          //
	          return true;
	        }

	        this.isMousedown = true; // 获取当前元素在列表中的位置

	        var _utils$getElement = utils.getElement(this.group, this.dragEl),
	            index = _utils$getElement.index,
	            el = _utils$getElement.el,
	            rect = _utils$getElement.rect;

	        if (!el || index < 0) return true; // 将拖拽元素克隆一份作为蒙版

	        var ghostEl = this.dragEl.cloneNode(true);
	        this.ghost.init(ghostEl, rect);
	        this.diff.old.rect = rect;
	        this.ghost.set('x', rect.left);
	        this.ghost.set('y', rect.top); // 记录拖拽移动时坐标

	        this.calcXY = {
	          x: e.clientX,
	          y: e.clientY
	        };

	        this._onMoveEvents();

	        this._onUpEvents();
	      }
	    }, {
	      key: "_onMove",
	      value: function _onMove(e) {
	        this.ghost.move();
	        e.preventDefault();
	        if (!this.isMousedown) return;
	        if (e.clientX < 0 || e.clientY < 0) return;
	        document.body.style.cursor = 'grabbing';
	        this.isMousemove = true;
	        this.ghost.set('x', this.ghost.x + e.clientX - this.calcXY.x);
	        this.ghost.set('y', this.ghost.y + e.clientY - this.calcXY.y);
	        this.calcXY = {
	          x: e.clientX,
	          y: e.clientY
	        };
	        this.ghost.move();

	        this._checkRange(e);

	        var _utils$getElement2 = utils.getElement(this.group, e.target),
	            index = _utils$getElement2.index,
	            el = _utils$getElement2.el,
	            rect = _utils$getElement2.rect;

	        var left = rect.left,
	            right = rect.right,
	            top = rect.top,
	            bottom = rect.bottom;
	        if (!el || index < 0) return;
	        if (top < 0 || top - this.ghost.rect.height / 3 < 0) return;

	        if (e.clientX > left && e.clientX < right && e.clientY > top && e.clientY < bottom) {
	          this.dropEl = el; // 拖拽前后元素不一致时交换

	          if (this.dropEl !== this.dragEl) {
	            var dragRect = this.dragEl.getBoundingClientRect();
	            var dropRect = this.dropEl.getBoundingClientRect();
	            if (this.dropEl.animated) return;

	            if (utils.index(this.group, this.dragEl) < index) {
	              this.group.insertBefore(this.dragEl, this.dropEl.nextElementSibling);
	            } else {
	              this.group.insertBefore(this.dragEl, this.dropEl);
	            } // 设置动画


	            utils.animate(this.dragEl, dragRect, this.animation);
	            utils.animate(this.dropEl, dropRect, this.animation);
	            this.diff.old.node = this.dragEl;
	            this.diff["new"].node = this.dropEl;
	          }

	          this.diff["new"].rect = this.dropEl.getBoundingClientRect();
	        }
	      }
	    }, {
	      key: "_onDrop",
	      value: function _onDrop() {
	        this._offMoveEvents();

	        this._offUpEvents();

	        document.body.style.cursor = '';

	        if (this.isMousedown && this.isMousemove) {
	          // 拖拽完成触发回调函数
	          if (this.dragEnd && typeof this.dragEnd === 'function') this.dragEnd(this.diff.old, this.diff["new"]);
	        }

	        this.isMousedown = false;
	        this.isMousemove = false;
	        this.diff.destroy();
	        this.ghost.destroy();
	      }
	    }, {
	      key: "_checkRange",
	      value: function _checkRange(e) {
	        var _this$group$getBoundi = this.group.getBoundingClientRect(),
	            top = _this$group$getBoundi.top,
	            left = _this$group$getBoundi.left,
	            right = _this$group$getBoundi.right,
	            bottom = _this$group$getBoundi.bottom;

	        if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) {
	          document.body.style.cursor = 'not-allowed';
	        }
	      }
	    }, {
	      key: "_resetState",
	      value: function _resetState() {
	        this.isMousedown = false;
	        this.isMousemove = false;
	        this.dragEl = null;
	        this.dropEl = null;
	        this.ghost.destroy();
	        this.diff = new Diff();
	      }
	    }, {
	      key: "_bindEventListener",
	      value: function _bindEventListener() {
	        this._onStart = this._onStart.bind(this);
	        this._onMove = this._onMove.bind(this);
	        this._onDrop = this._onDrop.bind(this);

	        if (this.supportPointer) {
	          utils.on(this.group, 'pointerdown', this._onStart);
	        } else {
	          utils.on(this.group, 'mousedown', this._onStart);
	        }
	      }
	    }, {
	      key: "_onMoveEvents",
	      value: function _onMoveEvents() {
	        if (this.supportPointer) {
	          utils.on(document, 'pointermove', this._onMove);
	        } else {
	          utils.on(document, 'mousemove', this._onMove);
	        }
	      }
	    }, {
	      key: "_onUpEvents",
	      value: function _onUpEvents() {
	        if (this.supportPointer) {
	          utils.on(document, 'pointerup', this._onDrop);
	        } else {
	          utils.on(document, 'mouseup', this._onDrop);
	        }
	      }
	    }, {
	      key: "_unbindEventListener",
	      value: function _unbindEventListener() {
	        utils.off(this.group, 'mousedown', this._onStart);
	        utils.off(this.group, 'pointerdown', this._onStart);
	      }
	    }, {
	      key: "_offMoveEvents",
	      value: function _offMoveEvents() {
	        utils.off(document, 'mousemove', this._onMove);
	        utils.off(document, 'pointermove', this._onMove);
	      }
	    }, {
	      key: "_offUpEvents",
	      value: function _offUpEvents() {
	        utils.off(document, 'mouseup', this._onDrop);
	        utils.off(document, 'pointerup', this._onDrop);
	      }
	    }]);

	    return Sortable;
	  }();

	  return Sortable;
	});
	});

	function Observer(props) {
	    const { uniqueKey, children, onSizeChange } = props;
	    const elementRef = React__namespace.useRef(null);
	    const isRenderProps = typeof children === 'function';
	    const mergedChildren = isRenderProps ? children(elementRef) : children;
	    React__namespace.useLayoutEffect(() => {
	        let observer;
	        if (typeof ResizeObserver !== undefined) {
	            observer = new ResizeObserver(() => {
	                const size = elementRef.current.clientHeight;
	                onSizeChange && onSizeChange(size, uniqueKey);
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
	    const { children, uniqueKey, itemClass, itemStyle } = props;
	    const { record, index, onSizeChange } = props;
	    return (React__namespace.createElement(Observer, { uniqueKey: uniqueKey, onSizeChange: onSizeChange },
	        React__namespace.createElement("div", { className: itemClass, style: itemStyle, "data-key": uniqueKey }, typeof children === 'function' ? children(record, index, uniqueKey) : children)));
	}
	function Slot(props) {
	    const { children, roleId, onSizeChange } = props;
	    return children ? (React__namespace.createElement(Observer, { uniqueKey: roleId, onSizeChange: onSizeChange },
	        React__namespace.createElement("div", { "v-role": roleId }, children))) : React__namespace.createElement(React__namespace.Fragment, null);
	}

	var utils = {
	    /**
	     * 防抖函数
	     * @param func callback
	     * @param delay 延迟
	     * @param immediate 是否立即执行
	     * @returns
	     */
	    debounce(func, delay = 50, immediate = false) {
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
	};

	const CALLBACKS = { top: 'v-top', bottom: 'v-bottom', dragend: 'v-dragend' }; // 组件传入的事件回调
	const STYLE = { overflow: 'hidden auto', position: 'relative' }; // 列表默认样式
	const MASKIMAGE = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 98%, #FFFFFF 100%)'; // 拖拽时默认背景样式
	function Virtual(props, ref) {
	    const { header, footer, children, dataSource = [], dataKey, keeps = 30, size = 50, height = '100%', delay = 10, draggable = true, draggableOnly = true, dragStyle = { backgroundImage: MASKIMAGE } } = props;
	    // =============================== State ===============================
	    const [cloneList, setCloneList] = React.useState([]);
	    const [sizeStack, setSizeStack] = React.useState(new Map());
	    const dragList = React.useRef([]);
	    const [range, setRange] = React.useState({ start: 0, end: keeps }); // 当前可见范围
	    const dragRef = React.useRef(null);
	    const offsetRef = React.useRef(0); // 记录当前滚动高度
	    const virtualRef = React.useRef(null);
	    const groupRef = React.useRef(null); // 列表ref
	    const bottomRef = React.useRef(null); // 列表元素外的dom，总是存在于列表最后
	    // 记录顶部 | 底部高度，以及列表中每一行的高度，和列表的总高度
	    const calcSizeRef = React.useRef({ header: 0, footer: 0, total: 0, average: 0, fixed: 0 });
	    const calcTypeRef = React.useRef('INIT'); // 判断列表每一行高度是否固定
	    const lastIndexRef = React.useRef(0); // 记录上一次计算的 index 值
	    const isFixedSize = React__namespace.useMemo(() => {
	        return calcTypeRef.current === 'FIXED';
	    }, [calcTypeRef]);
	    React.useEffect(() => {
	        setCloneList(() => [...dataSource]);
	        dragList.current = [...dataSource];
	    }, [dataSource]);
	    // =============================== ref methods ===============================
	    const scrollToBottom = () => {
	        if (bottomRef) {
	            const offset = bottomRef.current.offsetTop;
	            virtualRef.current.scrollTop = offset;
	        }
	        setTimeout(() => {
	            // 第一次滚动高度可能会发生改变，如果没到底部再执行一次滚动方法
	            const { scrollTop, scrollHeight, clientHeight } = virtualRef.current;
	            if (scrollTop + clientHeight < scrollHeight)
	                scrollToBottom();
	        }, 0);
	    };
	    React__namespace.useImperativeHandle(ref, () => ({
	        reset() {
	            virtualRef.current.scrollTop = 0;
	            setCloneList(() => [...dataSource]);
	        },
	        getSize(key) {
	            return sizeStack.get(key);
	        },
	        getScrollTop() {
	            return offsetRef.current;
	        },
	        scrollToIndex(index) {
	            if (index >= cloneList.length - 1) {
	                scrollToBottom();
	            }
	            else {
	                const offset = getOffsetByIndex(index);
	                virtualRef.current.scrollTop = offset;
	            }
	        },
	        scrollToOffset(offset) {
	            virtualRef.current.scrollTop = offset;
	        },
	        scrollToTop() {
	            virtualRef.current.scrollTop = 0;
	        },
	        scrollToBottom,
	    }));
	    // =============================== Item Key ===============================
	    // 获取 item 中的 dateKey 值
	    const getKey = React__namespace.useCallback((item) => {
	        return (dataKey.replace(/\[/g, '.').replace(/\]/g, '').split('.').reduce((o, k) => (o || {})[k], item)) || '';
	    }, [dataKey]);
	    // 源数据中所有的 dataKey 值
	    const dataKeys = React__namespace.useMemo(() => {
	        return cloneList.map(item => getKey(item));
	    }, [cloneList, getKey]);
	    const dataKeyLen = React__namespace.useMemo(() => {
	        return dataKeys.length - 1;
	    }, [dataKeys]);
	    // =============================== Scroll ===============================
	    const handleScroll = (e) => {
	        const scrollTop = Math.ceil(e.target.scrollTop);
	        const scrollHeight = Math.ceil(e.target.scrollHeight);
	        const clientHeight = Math.ceil(e.target.clientHeight);
	        // 如果不存在滚动元素 | 滚动高度小于0 | 超出最大滚动距离
	        if (!scrollHeight || scrollTop < 0 || (scrollTop + clientHeight > scrollHeight + 1))
	            return;
	        // 通过上一次滚动的距离，判断当前滚动方向
	        const direction = scrollTop < offsetRef.current ? 'FRONT' : 'BEHIND';
	        // 记录当前滚动高度
	        offsetRef.current = scrollTop;
	        // 判断当前应该触发的回调函数，滚动到顶部时触发 `v-top`，滚动到底部时触发 `v-bottom`
	        const callback = direction === 'FRONT' ? props[CALLBACKS.top] : props[CALLBACKS.bottom];
	        const scrollOvers = getScrollOvers();
	        if (direction === 'FRONT') {
	            handleScrollFront(scrollOvers);
	            if (!!cloneList.length && offsetRef.current <= 0)
	                callback && callback();
	        }
	        else if (direction === 'BEHIND') {
	            handleScrollBehind(scrollOvers);
	            if (clientHeight + scrollTop >= scrollHeight)
	                callback && callback();
	        }
	    };
	    const handleScrollFront = (overs) => {
	        if (overs > range.start)
	            return;
	        const start = Math.max(overs - Math.round(keeps / 3), 0);
	        handleCheck(start, getEndByStart(start));
	    };
	    const handleScrollBehind = (overs) => {
	        if (overs < range.start + Math.round(keeps / 3))
	            return;
	        handleCheck(overs, getEndByStart(overs));
	    };
	    const handleCheck = (start, end) => {
	        const total = dataKeys.length;
	        if (total <= keeps) {
	            start = 0;
	            end = dataKeyLen;
	        }
	        else if (end - start < keeps - 1) {
	            start = end - keeps + 1;
	        }
	        if (range.start !== start)
	            setRange(() => { return { start, end }; });
	    };
	    // =============================== methods ===============================
	    // 获取当前滚动高度经过了多少个列表项
	    const getScrollOvers = () => {
	        // 如果有 header 插槽，需要减去 header 的高度
	        const { header, fixed } = calcSizeRef.current;
	        const offset = offsetRef.current - header;
	        if (offset <= 0)
	            return 0;
	        if (isFixedSize)
	            return Math.floor(offset / fixed);
	        let low = 0;
	        let high = dataKeys.length;
	        let middle = 0;
	        let middleOffset = 0;
	        while (low <= high) {
	            middle = low + Math.floor((high - low) / 2);
	            middleOffset = getOffsetByIndex(middle);
	            if (middleOffset === offset) {
	                return middle;
	            }
	            else if (middleOffset < offset) {
	                low = middle + 1;
	            }
	            else if (middleOffset > offset) {
	                high = middle - 1;
	            }
	            else {
	                break;
	            }
	        }
	        return low > 0 ? --low : 0;
	    };
	    const getOffsetByIndex = (index) => {
	        if (!index)
	            return 0;
	        let offset = 0;
	        let indexSize = 0;
	        for (let i = 0; i < index; i++) {
	            indexSize = sizeStack.get(dataKeys[i]);
	            offset += typeof indexSize === 'number' ? indexSize : getItemSize();
	        }
	        lastIndexRef.current = Math.max(lastIndexRef.current, index - 1);
	        lastIndexRef.current = Math.min(lastIndexRef.current, dataKeyLen);
	        return offset;
	    };
	    const getEndByStart = (start) => {
	        const end = start + keeps;
	        return dataKeyLen > 0 ? Math.min(end, dataKeyLen) : end;
	    };
	    const getItemSize = () => {
	        const { fixed, average } = calcSizeRef.current;
	        return isFixedSize ? fixed : (average || size);
	    };
	    // ======================= size observe =======================
	    const onItemSizeChange = (size, key) => {
	        setSizeStack(sizeStack.set(key, size));
	        // 初始为固定高度fixedSizeValue, 如果大小没有变更不做改变，如果size发生变化，认为是动态大小，去计算平均值
	        if (calcTypeRef.current === 'INIT') {
	            calcTypeRef.current = 'FIXED';
	            calcSizeRef.current = { ...calcSizeRef.current, fixed: size };
	        }
	        else if (calcTypeRef.current === 'FIXED' && calcSizeRef.current.fixed !== size) {
	            calcTypeRef.current = 'DYNAMIC';
	            calcSizeRef.current = { ...calcSizeRef.current, fixed: undefined };
	        }
	        if (calcTypeRef.current !== 'FIXED' && calcSizeRef.current.total !== 'undefined') {
	            if (sizeStack.size < Math.min(keeps, dataKeys.length)) {
	                const total = [...sizeStack.values()].reduce((acc, cur) => acc + cur, 0);
	                const average = Math.round(total / sizeStack.size);
	                calcSizeRef.current = { ...calcSizeRef.current, total, average };
	            }
	            else {
	                calcSizeRef.current = { ...calcSizeRef.current, total: undefined };
	            }
	        }
	    };
	    const onSlotSizeChange = (size, key) => {
	        calcSizeRef.current[key] = size;
	    };
	    // =============================== Range ===============================
	    const { start, end, front, behind } = React__namespace.useMemo(() => {
	        const { start, end } = range;
	        let front;
	        let behind;
	        if (isFixedSize) {
	            front = calcSizeRef.current.fixed * start;
	            behind = calcSizeRef.current.fixed * (dataKeyLen - end);
	        }
	        else {
	            front = getOffsetByIndex(start);
	            if (lastIndexRef.current === dataKeyLen) {
	                behind = getOffsetByIndex(dataKeyLen) - getOffsetByIndex(end);
	            }
	            else {
	                behind = (dataKeyLen - end) * getItemSize();
	            }
	        }
	        return { front, behind, start, end };
	        // eslint-disable-next-line react-hooks/exhaustive-deps
	    }, [range, dataKeyLen]);
	    // =============================== init ===============================
	    React.useEffect(() => {
	        const start = Math.max(range.start, 0);
	        handleCheck(start, getEndByStart(start));
	        sizeStack.forEach((v, key) => {
	            if (!dataKeys.includes(key)) {
	                sizeStack.delete(key);
	            }
	        });
	        // eslint-disable-next-line react-hooks/exhaustive-deps
	    }, [dataSource]);
	    // =============================== drag ===============================
	    const initDraggable = () => {
	        destroyDraggable();
	        dragRef.current = new sortable({
	            group: groupRef.current,
	            ghostStyle: dragStyle,
	            dragging: (e) => {
	                const draggable = e.target.getAttribute('draggable');
	                if (draggableOnly && !draggable)
	                    return null;
	                if (props.dragElement) {
	                    return props.dragElement(e, groupRef.current);
	                }
	                else {
	                    let result = e.target;
	                    while ([].indexOf.call(groupRef.current.children, result) < 0) {
	                        result = result.parentNode;
	                    }
	                    return result;
	                }
	            },
	            dragEnd: (pre, cur) => {
	                if (!(pre && cur))
	                    return;
	                if (pre.rect.top === cur.rect.top)
	                    return;
	                const dragState = {
	                    oldNode: pre.node, oldItem: null, oldIndex: null,
	                    newNode: cur.node, newItem: null, newIndex: null
	                };
	                const oldKey = pre.node.getAttribute('data-key');
	                const newKey = cur.node.getAttribute('data-key');
	                dragList.current.forEach((el, index) => {
	                    if (getKey(el) === oldKey) {
	                        dragState.oldItem = el;
	                        dragState.oldIndex = index;
	                    }
	                    if (getKey(el) === newKey) {
	                        dragState.newItem = el;
	                        dragState.newIndex = index;
	                    }
	                });
	                const newArr = [...dragList.current];
	                newArr.splice(dragState.oldIndex, 1);
	                newArr.splice(dragState.newIndex, 0, dragState.oldItem);
	                setCloneList(() => [...newArr]);
	                dragList.current = [...newArr];
	                const callback = props[CALLBACKS.dragend];
	                callback && callback(newArr);
	            }
	        });
	    };
	    const destroyDraggable = () => {
	        dragRef.current && dragRef.current.destroy();
	        dragRef.current = null;
	    };
	    React.useLayoutEffect(() => {
	        if (draggable) {
	            initDraggable();
	        }
	        else {
	            destroyDraggable();
	        }
	        // eslint-disable-next-line react-hooks/exhaustive-deps
	    }, [cloneList, draggable]);
	    React.useEffect(() => {
	        return () => {
	            destroyDraggable();
	        };
	    }, []);
	    // ================================ Render ================================
	    return (React__namespace.createElement("div", { ref: virtualRef, style: { ...STYLE, height }, onScroll: utils.debounce(handleScroll, delay) },
	        React__namespace.createElement(Slot, { children: header, roleId: "header", onSizeChange: onSlotSizeChange }),
	        React__namespace.createElement("div", { ref: groupRef, "v-role": "content", "v-start": start, style: { padding: `${front}px 0 ${behind}px` } }, cloneList.slice(start, end + 1).map(item => {
	            const key = getKey(item);
	            const index = dataKeys.indexOf(key);
	            return (React__namespace.createElement(Item, { key: key, uniqueKey: key, children: children, record: item, index: index, onSizeChange: onItemSizeChange }));
	        })),
	        React__namespace.createElement(Slot, { children: footer, roleId: "footer", onSizeChange: onSlotSizeChange }),
	        React__namespace.createElement("div", { ref: bottomRef })));
	}
	var index = React__namespace.forwardRef(Virtual);

	exports.Virtual = Virtual;
	exports["default"] = index;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
