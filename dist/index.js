/*!
 * react-virtual-drag-list v1.0.5
 * open source under the MIT license
 * https://github.com/mfuu/react-virtual-drag-list#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.virtualDragList = factory(global.React));
})(this, (function (React) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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

  // 设置动画
  function animate(rect, target) {
    var delay = 300;

    {
      var cRect = target.getBoundingClientRect();
      if (rect.nodeType === 1) rect = rect.getBoundingClientRect();
      setStyle(target, 'transition', 'none');
      setStyle(target, 'transform', "translate3d(".concat(rect.left - cRect.left, "px, ").concat(rect.top - cRect.top, "px, 0)"));
      target.offsetWidth; // 触发重绘

      setStyle(target, 'transition', "all ".concat(delay, "ms"));
      setStyle(target, 'transform', 'translate3d(0, 0, 0)');
      clearTimeout(target.animated);
      target.animated = setTimeout(function () {
        setStyle(target, 'transition', '');
        setStyle(target, 'transform', '');
        target.animated = false;
      }, delay);
    }
  } // 为dom添加样式

  function setStyle(el, prop, val) {
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
        if (!(prop in style)) prop = '-webkit-' + prop;
        style[prop] = val + (typeof val === 'string' ? '' : 'px');
      }
    }
  }
  function getUniqueKey(item, key) {
    return (!Array.isArray(key) ? key.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : key).reduce(function (o, k) {
      return (o || {})[key];
    }, item) || '';
  }

  function VirtualSlot(props) {
    var children = props.children,
        roleId = props.roleId,
        onSizeChange = props.onSizeChange;
    var vm = React.useRef(); // ======================= observer =======================

    React.useLayoutEffect(function () {
      var observer;

      if ((typeof ResizeObserver === "undefined" ? "undefined" : _typeof(ResizeObserver)) !== undefined) {
        observer = new ResizeObserver(function () {
          var size = vm.current.clientHeight;
          onSizeChange(size, roleId);
        });
        vm.current && observer.observe(vm.current);
      }

      return function () {
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      };
    }, []);
    return children ? /*#__PURE__*/React__default["default"].createElement("div", {
      ref: vm,
      "v-role": roleId
    }, children) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null);
  }
  function VirtualItem(props) {
    var onSizeChange = props.onSizeChange,
        setDragState = props.setDragState,
        handleDragEnd = props.handleDragEnd,
        dragState = props.dragState;
    var _props$itemProps = props.itemProps,
        children = _props$itemProps.children,
        dataKey = _props$itemProps.dataKey,
        dataSource = _props$itemProps.dataSource,
        dragStyle = _props$itemProps.dragStyle,
        _props$itemProps$drag = _props$itemProps.draggable,
        draggable = _props$itemProps$drag === void 0 ? true : _props$itemProps$drag;
    var _props$dataProps = props.dataProps,
        index = _props$dataProps.index,
        record = _props$dataProps.record,
        uniqueKey = _props$dataProps.uniqueKey;
    var vm = React.useRef();
    var mask = React.useRef(); // ======================= observer =======================

    React.useLayoutEffect(function () {
      var observer;

      if ((typeof ResizeObserver === "undefined" ? "undefined" : _typeof(ResizeObserver)) !== undefined) {
        observer = new ResizeObserver(function () {
          var size = vm.current.clientHeight;
          onSizeChange(size, uniqueKey);
        });
        vm.current && observer.observe(vm.current);
      }

      return function () {
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      };
    }, []); // ======================= drag =======================

    function handleOnMouseDown(e, vm) {
      if (!draggable) return; // 仅设置了draggable=true的元素才可拖动

      var allow = e.target.getAttribute('draggable');
      if (!allow) return; // 记录初始拖拽元素

      var _getTarget = getTarget(e, vm),
          target = _getTarget.target,
          item = _getTarget.item;

      setDragState({
        oldNode: target,
        oldItem: item
      });
      setMask('init', e.clientX, e.clientY);

      document.onmousemove = function (evt) {
        evt.preventDefault();
        setMask('move', evt.clientX, evt.clientY);

        var _getTarget2 = getTarget(evt),
            _getTarget2$target = _getTarget2.target,
            target = _getTarget2$target === void 0 ? null : _getTarget2$target,
            _getTarget2$item = _getTarget2.item,
            item = _getTarget2$item === void 0 ? null : _getTarget2$item; // 如果没找到目标节点，取消拖拽事件


        if (!target || !item) {
          document.body.style.cursor = 'not-allowed';
          return;
        }

        document.body.style.cursor = 'grabbing'; // 记录拖拽目标元素

        setDragState({
          newNode: target,
          newItem: item
        });
        var _dragState$current = dragState.current,
            oldNode = _dragState$current.oldNode,
            newNode = _dragState$current.newNode,
            oldItem = _dragState$current.oldItem,
            newItem = _dragState$current.newItem; // 拖拽前后不一致，改变拖拽节点位置

        if (oldItem != newItem) {
          if (newNode && newNode.animated) return;
          var oldIndex = dataSource.indexOf(oldItem);
          var newIndex = dataSource.indexOf(newItem);
          var oldRect = oldNode.getBoundingClientRect();
          var newRect = newNode.getBoundingClientRect();
          setDragState({
            oldIndex: oldIndex,
            newIndex: newIndex
          });

          if (oldIndex < newIndex) {
            newNode.parentNode.insertBefore(oldNode, newNode.nextSibling);
          } else {
            newNode.parentNode.insertBefore(oldNode, newNode);
          }

          animate(oldRect, oldNode);
          animate(newRect, newNode);
        }
      };

      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
        setMask('destory'); // 当前拖拽位置不在允许的范围内时不需要对数组重新赋值

        if (document.body.style.cursor != 'not-allowed') {
          var _dragState$current2 = dragState.current,
              oldItem = _dragState$current2.oldItem,
              oldIndex = _dragState$current2.oldIndex,
              newIndex = _dragState$current2.newIndex; // 拖拽前后不一致，数组重新赋值

          if (oldIndex != newIndex) {
            var newArr = _toConsumableArray(dataSource);

            newArr.splice(oldIndex, 1);
            newArr.splice(newIndex, 0, oldItem);
            handleDragEnd(newArr);
          }
        }

        document.body.style.cursor = '';
      };
    }

    function setMask(type, left, top) {
      if (type == 'init') {
        mask.current = document.createElement('div');

        for (var key in dragStyle) {
          setStyle(mask.current, key, dragStyle[key]);
        }

        mask.current.style.position = 'fixed';
        mask.current.style.left = left + 'px';
        mask.current.style.top = top + 'px';
        mask.current.innerHTML = vm.current.innerHTML;
        document.body.appendChild(mask.current);
      } else if (type == 'move') {
        mask.current.style.left = left + 'px';
        mask.current.style.top = top + 'px';
      } else {
        document.body.removeChild(mask.current);
      }
    }

    function getTarget(e, vm) {
      var value, target;

      if (vm) {
        target = vm;
        value = target.getAttribute('data-key');
      } else {
        // 如果当前拖拽超出了item范围，则不允许拖拽，否则查找dataKey属性
        target = e.target;
        value = target.getAttribute('data-key');

        if (!value) {
          var path = e.path || [];

          for (var i = 0; i < path.length; i++) {
            target = path[i];
            value = target.getAttribute('data-key');
            if (value || target == document.documentElement) break;
          }
        }
      }

      var item = value ? dataSource.find(function (item) {
        return getUniqueKey(item, dataKey) == value;
      }) : null;
      return {
        target: target,
        item: item
      };
    } // ======================= render =======================


    return /*#__PURE__*/React__default["default"].createElement("div", {
      ref: vm,
      className: props.itemClass,
      style: props.itemStyle,
      "data-key": uniqueKey,
      onMouseDown: function onMouseDown(e) {
        return handleOnMouseDown(e, vm.current);
      }
    }, typeof children === 'function' ? children(record, index, uniqueKey) : children);
  }

  function Virtual(props, ref) {
    // ======================= props =======================
    var children = props.children,
        header = props.header,
        footer = props.footer;
    var _props$dataSource = props.dataSource,
        dataSource = _props$dataSource === void 0 ? [] : _props$dataSource,
        dataKey = props.dataKey,
        _props$keeps = props.keeps,
        keeps = _props$keeps === void 0 ? 30 : _props$keeps,
        _props$size = props.size,
        size = _props$size === void 0 ? 50 : _props$size,
        _props$height = props.height,
        height = _props$height === void 0 ? '100%' : _props$height;
    var _props$dragStyle = props.dragStyle,
        dragStyle = _props$dragStyle === void 0 ? {
      backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 98%, #FFFFFF 100%)'
    } : _props$dragStyle; // ======================= ref =======================

    var virtualVm = React.useRef();
    var bottomVm = React.useRef(); // ======================= state =======================

    var _useState = React.useState(new Map()),
        _useState2 = _slicedToArray(_useState, 2),
        sizeStack = _useState2[0],
        setSizeStack = _useState2[1];

    var scrollOffset = React.useRef(0);
    var lastCalcIndex = React.useRef(0);
    var calcType = React.useRef('INIT');
    var calcSize = React.useRef({
      header: 0,
      footer: 0,
      average: 0,
      total: 0,
      fixed: 0
    });

    var _useState3 = React.useState({
      front: 0,
      behind: 0
    }),
        _useState4 = _slicedToArray(_useState3, 2),
        padding = _useState4[0],
        setPadding = _useState4[1];

    var range = React.useRef({
      start: 0,
      end: 0
    }); // ======================= usefull methods =======================

    React.useImperativeHandle(ref, function () {
      return {
        // 通过key值获取当前行的高度
        getSize: function getSize(key) {
          return sizeStack.get(key);
        },
        // 返回当前滚动高度
        getScrollTop: function getScrollTop() {
          return scrollOffset.current;
        },
        scrollToTop: function scrollToTop() {
          _scrollToTop();
        },
        // 滚动到最底部
        scrollToBottom: function scrollToBottom() {
          _scrollToBottom();
        },
        // 滚动到指定高度
        scrollToOffset: function scrollToOffset(offset) {
          _scrollToOffset(offset);
        },
        scrollToIndex: function scrollToIndex(index) {
          _scrollToIndex(index);
        }
      };
    }); // 滚动到顶部

    function _scrollToTop() {
      virtualVm.current.scrollTop = 0;
    } // 滚动到最底部


    function _scrollToBottom() {
      if (bottomVm) {
        var offset = bottomVm.current.offsetTop;

        _scrollToOffset(offset);
      } // 第一次滚动高度可能会发生改变，如果没到底部再执行一次滚动方法


      var _virtualVm$current = virtualVm.current,
          scrollTop = _virtualVm$current.scrollTop,
          scrollHeight = _virtualVm$current.scrollHeight,
          clientHeight = _virtualVm$current.clientHeight;
      setTimeout(function () {
        if (scrollTop + clientHeight < scrollHeight) {
          _scrollToBottom();
        }
      }, 10);
    } // 滚动到指定高度


    function _scrollToOffset(offset) {
      virtualVm.current.scrollTop = offset;
    } // 滚动到指定索引值位置


    function _scrollToIndex(index) {
      if (index >= dataSource.length - 1) {
        _scrollToBottom();
      } else {
        var offset = getOffsetByIndex(index);

        _scrollToOffset(offset);
      }
    } // ======================= init =======================


    var uniqueKeys = React.useMemo(function () {
      return dataSource.map(function (item) {
        return getUniqueKey(item, dataKey);
      });
    }, [dataSource, dataKey]);
    React.useLayoutEffect(function () {
      if (!dataKey) return;
      handleDataSourceChange();
      updateSizeStack();
    }, [dataSource, dataKey]); // dataSource变更后更新range

    function handleDataSourceChange() {
      var start = Math.max(range.current.start, 0);
      updateRange(start, getEndByStart(start));
    } // dataSource变更后更新缓存


    function updateSizeStack() {
      sizeStack.forEach(function (v, key) {
        if (!uniqueKeys.includes(key)) {
          sizeStack["delete"](key);
        }
      });
    } // ======================= size observe =======================


    var onItemSizeChange = function onItemSizeChange(size, key) {
      setSizeStack(sizeStack.set(key, size)); // 初始为固定高度fixedSizeValue, 如果大小没有变更不做改变，如果size发生变化，认为是动态大小，去计算平均值

      if (calcType.current === 'INIT') {
        calcType.current = 'FIXED';
        calcSize.current = _objectSpread2(_objectSpread2({}, calcSize.current), {}, {
          fixed: size
        });
      } else if (calcType.current === 'FIXED' && calcSize.current.fixed !== size) {
        calcType.current = 'DYNAMIC';
        calcSize.current = _objectSpread2(_objectSpread2({}, calcSize.current), {}, {
          fixed: undefined
        });
      }

      if (calcType.current !== 'FIXED' && calcSize.current.total !== 'undefined') {
        if (sizeStack.size < Math.min(keeps, uniqueKeys.length)) {
          var total = _toConsumableArray(sizeStack.values()).reduce(function (acc, cur) {
            return acc + cur;
          }, 0);

          var average = Math.round(total / sizeStack.size);
          calcSize.current = _objectSpread2(_objectSpread2({}, calcSize.current), {}, {
            total: total,
            average: average
          });
        } else {
          calcSize.current = _objectSpread2(_objectSpread2({}, calcSize.current), {}, {
            total: undefined
          });
        }
      }
    };

    var onSlotSizeChange = function onSlotSizeChange(size, key) {
      if (key === 'header') calcSize.current = _objectSpread2(_objectSpread2({}, calcSize.current), {}, {
        header: size
      });
      if (key === 'footer') calcSize.current = _objectSpread2(_objectSpread2({}, calcSize.current), {}, {
        footer: size
      });
    }; // ======================= scroll =======================


    function handleScroll(e) {
      var scrollTop = Math.ceil(e.target.scrollTop);
      var scrollHeight = Math.ceil(e.target.scrollHeight);
      var clientHeight = Math.ceil(e.target.clientHeight); // 如果不存在滚动元素 || 滚动高度小于0 || 超出最大滚动距离

      if (!scrollHeight || scrollTop < 0 || scrollTop + clientHeight > scrollHeight + 1) return; // 记录上一次滚动的距离，判断当前滚动方向

      var direction = scrollTop < scrollOffset.current ? 'FRONT' : 'BEHIND';
      scrollOffset.current = scrollTop;
      var overs = getScrollOvers(); // 滚动到顶部/底部回调

      var cb = direction === 'FRONT' ? props['v-top'] : props['v-bottom'];

      if (direction === 'FRONT') {
        handleScrollFront(overs);
        if (!!dataSource.length && scrollTop <= 0) cb && cb();
      } else if (direction === 'BEHIND') {
        handleScrollBehind(overs);
        if (clientHeight + scrollTop >= scrollHeight) cb && cb();
      }
    } // 二分法查找


    function getScrollOvers() {
      // 如果有header插槽，需要减去header的高度
      var offset = scrollOffset.current - calcSize.current.header;
      if (offset <= 0) return 0;
      if (isFixedType()) return Math.floor(offset / calcSize.current.fixed);
      var low = 0;
      var middle = 0;
      var middleOffset = 0;
      var high = uniqueKeys.length;

      while (low <= high) {
        middle = low + Math.floor((high - low) / 2);
        middleOffset = getOffsetByIndex(middle);

        if (middleOffset === offset) {
          return middle;
        } else if (middleOffset < offset) {
          low = middle + 1;
        } else if (middleOffset > offset) {
          high = middle - 1;
        } else {
          break;
        }
      }

      return low > 0 ? --low : 0;
    }

    function handleScrollFront(overs) {
      if (overs > range.current.start) return;
      var start = Math.max(overs - Math.round(keeps / 3), 0);
      checkRange(start, getEndByStart(start));
    }

    function handleScrollBehind(overs) {
      if (overs < range.current.start + Math.round(keeps / 3)) return;
      checkRange(overs, getEndByStart(overs));
    }

    function getEndByStart(start) {
      var len = getKeyLen();
      var end = start + keeps;
      return len > 0 ? Math.min(end, len) : end;
    } // ======================= range handler =======================


    function checkRange(start, end) {
      var total = uniqueKeys.length;

      if (total <= keeps) {
        start = 0;
        end = getKeyLen();
      } else if (end - start < keeps - 1) {
        start = end - keeps + 1;
      }

      if (range.current.start !== start) {
        updateRange(start, end);
      }
    } // 更新range


    function updateRange(start, end) {
      range.current = {
        start: start,
        end: end
      };
      setPadding({
        front: getScrollFront(),
        behind: getScrollBehind()
      });
    }

    function getScrollFront() {
      if (isFixedType()) {
        return calcSize.current.fixed * range.current.start;
      } else {
        return getOffsetByIndex(range.current.start);
      }
    }

    function getScrollBehind() {
      var last = getKeyLen();

      if (isFixedType()) {
        return (last - range.current.end) * calcSize.current.fixed;
      }

      if (lastCalcIndex.current === last) {
        return getOffsetByIndex(last) - getOffsetByIndex(range.current.end);
      } else {
        return (last - range.current.end) * getItemSize();
      }
    } // 通过索引值获取滚动高度


    function getOffsetByIndex(index) {
      if (!index) return 0;
      var offset = 0;
      var indexSize = 0;

      for (var i = 0; i < index; i++) {
        indexSize = sizeStack.get(uniqueKeys[i]);
        offset = offset + (typeof indexSize === 'number' ? indexSize : getItemSize());
      }

      lastCalcIndex.current = Math.max(lastCalcIndex.current, index - 1);
      lastCalcIndex.current = Math.min(lastCalcIndex.current, getKeyLen());
      return offset;
    } // ======================= common =======================


    function isFixedType() {
      return calcType.current === 'FIXED';
    } // 获取每一项的高度


    function getItemSize() {
      return isFixedType() ? calcSize.current.fixed : calcSize.current.average || size;
    }

    function getItemIndex(dataKey) {
      return uniqueKeys.indexOf(dataKey);
    } // 获取唯一值长度


    function getKeyLen() {
      return uniqueKeys.length - 1;
    } // ======================= item state =======================


    var itemProps = React.useMemo(function () {
      return _objectSpread2({
        dataKey: dataKey,
        children: children,
        dataSource: dataSource,
        dragStyle: dragStyle
      }, props);
    }, [dataSource, dataKey, children]);
    var dragState = React.useRef({
      oldNode: null,
      // 拖拽起始dom元素
      oldItem: null,
      // 拖拽起始节点数据
      oldIndex: null,
      // 拖拽起始节点索引
      newNode: null,
      // 拖拽结束目标dom元素
      newItem: null,
      // 拖拽结束节点数据
      newIndex: null // 拖拽结束节点索引

    });

    var setDragState = function setDragState(state) {
      dragState.current = _objectSpread2(_objectSpread2({}, dragState.current), state);
    };

    function handleDragEnd(arr) {
      var cb = props['v-dragend'];
      cb && cb(arr);
    } // ======================= render =======================


    return /*#__PURE__*/React__default["default"].createElement("div", {
      ref: virtualVm,
      style: {
        height: height,
        overflow: 'hidden auto',
        position: 'relative'
      },
      onScroll: handleScroll
    }, /*#__PURE__*/React__default["default"].createElement(VirtualSlot, {
      children: header,
      onSizeChange: onSlotSizeChange,
      roleId: "header"
    }), /*#__PURE__*/React__default["default"].createElement("div", {
      "v-role": "content",
      style: {
        padding: "".concat(padding.front, "px 0px ").concat(padding.behind, "px")
      }
    }, dataSource.slice(range.current.start, range.current.end).map(function (item) {
      var key = getUniqueKey(item, dataKey);
      var dataProps = {
        uniqueKey: key,
        record: item,
        index: getItemIndex(key)
      };
      return /*#__PURE__*/React__default["default"].createElement(VirtualItem, {
        key: key,
        dragState: dragState,
        itemProps: itemProps,
        dataProps: dataProps,
        setDragState: setDragState,
        handleDragEnd: handleDragEnd,
        onSizeChange: onItemSizeChange
      });
    })), /*#__PURE__*/React__default["default"].createElement(VirtualSlot, {
      children: footer,
      onSizeChange: onSlotSizeChange,
      roleId: "footer"
    }), /*#__PURE__*/React__default["default"].createElement("div", {
      ref: bottomVm
    }));
  }

  var index = /*#__PURE__*/React.forwardRef(Virtual);

  return index;

}));
