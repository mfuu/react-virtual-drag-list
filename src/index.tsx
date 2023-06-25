import React from 'react';
import { debounce, getDataKey } from './utils';
import Virtual, { Range } from './Plugins/Virtual';
import Sortable from './Plugins/Sortable';
import { Store } from './Plugins/Storage';
import { Item, Slot } from './slots';
import { VirtualProps } from './props';

const Emits = { top: 'v-top', bottom: 'v-bottom' };

function VirtualDragList<T>(props: VirtualProps<T>, ref: React.ref) {
  const {
    dataSource = [],
    dataKey = '',
    direction = 'vertical',
    keeps = 30,
    size = undefined,

    pageMode = false,
    delay = 10,
    keepOffset = false,
    autoScroll = true,
    scrollThreshold = 55,
    animation = 150,
    pressDelay = 0,
    pressDelayOnTouchOnly = false,
    fallbackOnBody = false,

    style = {},
    className = '',

    wrapTag: WrapTag = 'div',
    rootTag: RootTag = 'div',
    itemTag = 'div',
    headerTag = 'div',
    footerTag = 'div',

    itemStyle = {},
    itemClass = '',
    wrapStyle = {},
    wrapClass = '',

    ghostClass = '',
    ghostStyle = {},
    chosenClass = '',

    disabled = false,
  } = props;
  const [viewList, setViewList] = React.useState([]);
  const [range, setRange] = React.useState<Range>({ start: 0, end: keeps - 1 });
  const [state, setState] = React.useState<any>({ from: {}, to: {} });

  const list = React.useRef([]);
  const uniqueKeys = React.useRef([]);
  const timer = React.useRef(null);

  const rootRef = React.useRef<Element>(null); // root element
  const wrapRef = React.useRef<Element>(null); // list element
  const lastRef = React.useRef<Element>(null); // dom at the end of the list

  const lastLength = React.useRef(null); // record current list's length
  const sortable = React.useRef<Sortable<T>>(null);
  const virtual = React.useRef<Virtual<T>>(null);

  const { isHorizontal, slotSizeKey, scrollSizeKey, offsetSizeKey, clientSizeKey, scrollDirectionKey } = React.useMemo(() => {
    const isHorizontal = direction !== 'vertical';
    return {
      isHorizontal,
      slotSizeKey: isHorizontal ? 'offsetWidth' : 'offsetHeight',
      offsetSizeKey: isHorizontal ? 'offsetLeft' : 'offsetTop',
      scrollSizeKey: isHorizontal ? 'scrollWidth' : 'scrollHeight',
      clientSizeKey: isHorizontal ? 'clientWidth' : 'clientHeight',
      scrollDirectionKey: isHorizontal ? 'scrollLeft' : 'scrollTop',
    };
  }, [direction]);

  /**
   * reset component
   */
  const reset = () => {
    scrollToTop();
    setViewList(() => [...dataSource]);
    list.current = [...dataSource];
  };

  /**
   * git item size by data-key
   * @param {String | Number} key data-key
   */
  const getSize = (key: number | string) => {
    return virtual.current.sizes.get(key);
  };

  /**
   * Get the current scroll height
   */
  const getOffset = () => {
    if (pageMode) {
      return (
        document.documentElement[scrollDirectionKey] ||
        document.body[scrollDirectionKey]
      );
    } else {
      const root = rootRef.current;
      return root ? Math.ceil(root[scrollDirectionKey]) : 0;
    }
  };

  /**
   * Get client viewport size
   */
  const getClientSize = () => {
    if (pageMode) {
      return document.documentElement[clientSizeKey] || document.body[clientSizeKey];
    } else {
      const root = rootRef.current;
      return root ? Math.ceil(root[clientSizeKey]) : 0;
    }
  };

  /**
   * Get all scroll size
   */
  const getScrollSize = () => {
    if (pageMode) {
      return document.documentElement[scrollSizeKey] || document.body[scrollSizeKey];
    } else {
      const root = rootRef.current;
      return root ? Math.ceil(root[scrollSizeKey]) : 0;
    }
  };

  /**
   * Scroll to the specified offset
   * @param {Number} offset
   */
  const scrollToOffset = (offset: number) => {
    if (pageMode) {
      document.body[scrollDirectionKey] = offset;
      document.documentElement[scrollDirectionKey] = offset;
    } else {
      rootRef.current[scrollDirectionKey] = offset;
    }
  };

  /**
   * Scroll to the specified index position
   * @param {Number} index
   */
  const scrollToIndex = (index: number) => {
    if (index >= dataSource.length - 1) {
      scrollToBottom();
    } else {
      const indexOffset = virtual.current.getOffsetByIndex(index);
      scrollToOffset(indexOffset);
    }
  };

  /**
   * Scroll to top of list
   */
  const scrollToTop = () => {
    scrollToOffset(0);
  };

  /**
   * Scroll to bottom of list
   */
  const scrollToBottom = () => {
    if (lastRef.current) {
      const offset = lastRef.current[offsetSizeKey];
      scrollToOffset(offset);

      setTimeout(() => {
        if (!scrolledToBottom()) scrollToBottom();
      }, 5);
    }
  };

  React.useImperativeHandle(ref, () => ({
    reset,
    getSize,
    getOffset,
    getClientSize,
    getScrollSize,
    scrollToTop,
    scrollToIndex,
    scrollToOffset,
    scrollToBottom,
  }));

  React.useLayoutEffect(() => {
    initVirtual();
  }, []);

  React.useEffect(() => {
    initSortable();
    if (pageMode) {
      updatePageModeFront();
      addPageModeScrollListener();
    }
    // destroy
    return () => {
      destroySortable();
      pageMode && removePageModeScrollListener();
    };
  }, []);

  React.useEffect(() => {
    if (sortable.current) {
      sortable.current.setValue('disabled', disabled);
    }
  }, [disabled]);

  React.useEffect(() => {
    list.current = [...dataSource];
    updateUniqueKeys();

    setViewList(() => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => virtual.current.updateRange(), 17);
      return [...dataSource];
    });

    if (sortable.current) {
      sortable.current.setValue('list', dataSource);
    }

    // if auto scroll to the last offset
    if (lastLength.current && keepOffset) {
      const index = Math.abs(dataSource.length - lastLength.current);
      scrollToIndex(index);
      lastLength.current = null;
    }
  }, [dataSource]);

  const addPageModeScrollListener = () => {
    document.addEventListener('scroll', handleScroll, { passive: false });
  }

  const removePageModeScrollListener = () => {
    document.removeEventListener('scroll', handleScroll);
  }

  // when using page mode we need update slot header size manually
  // taking root offset relative to the browser as slot header size
  const updatePageModeFront = () => {
    const root = rootRef.current;
    if (root) {
      const rect = root.getBoundingClientRect();
      const { defaultView } = root.ownerDocument;
      const offsetFront = isHorizontal
        ? rect.left + defaultView.pageXOffset
        : rect.top + defaultView.pageYOffset;
      virtual.current.handleSlotSizeChange('header', offsetFront);
    }
  }

  const initVirtual = () => {
    virtual.current = new Virtual(
      {
        size: size,
        keeps: keeps,
        uniqueKeys: uniqueKeys.current,
      },
      (range: Range) => {
        if (!sortable.current) return;
        setRange(() => range);

        const state = Store.getStore();
        const { start, end } = range;
        const { index } = state.from;
        if (index > -1 && !(index >= start && index <= end)) {
          sortable.current.rangeChanged = true;
        }
      }
    );
  };

  const initSortable = () => {
    sortable.current = new Sortable(
      {
        container: wrapRef.current,
        list: list.current,
        disabled,
        ghostClass,
        ghostStyle,
        chosenClass,
        animation,
        autoScroll,
        scrollThreshold,
        pressDelay,
        pressDelayOnTouchOnly,
        fallbackOnBody,
        ...props,
      },
      (store) => {
        setState(() => ({ ...store }));
      },
      (store, { list: newlist, changed }) => {
        setState(() => ({ ...store }));
        if (!changed) return;
        const prelist = list.current;

        list.current = [...newlist];
        setViewList(() => [...newlist]);

        updateUniqueKeys();
        updateRangeOnDrop(prelist, newlist);
      }
    );
  };

  const updateRangeOnDrop = (prelist, newlist) => {
    setRange((pre: Range) => {
      let range: Range = { ...pre };
      if (pre.start > 0) {
        const index = newlist.indexOf(prelist[pre.start]);
        if (index > -1) {
          range = { ...pre, start: index, end: index + keeps - 1 };
        }
      }
      if (newlist.length > prelist.length && pre.end === prelist.length - 1) {
        if (scrolledToBottom()) {
          range.end++;
          range.start = Math.max(0, range.end - keeps + 1);
        }
      }
      virtual.current.handleUpdate(range.start, range.end);
      return range;
    });
  };

  const destroySortable = () => {
    sortable.current && sortable.current.destroy();
    sortable.current = null;
  };

  const updateUniqueKeys = () => {
    uniqueKeys.current = list.current.map((item) => getDataKey(item, dataKey));
    virtual.current.updateOptions('uniqueKeys', uniqueKeys.current);
  };

  const handleScroll = debounce(() => {
    const offset = getOffset();
    const clientSize = getClientSize();
    const scrollSize = getScrollSize();

    // iOS scroll-spring-back behavior will make direction mistake
    if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
      return;
    }

    virtual.current.handleScroll(offset);

    if (virtual.current.isFront() && !!dataSource.length && offset <= 0) {
      handleToTop();
    } else if (virtual.current.isBehind() && clientSize + offset >= scrollSize) {
      handleToBottom();
    }
  }, delay);

  const scrolledToBottom = () => {
    const offset = getOffset();
    const clientSize = getClientSize();
    const scrollSize = getScrollSize();
    return offset + clientSize + 1 >= scrollSize;
  };

  const handleToTop = debounce(() => {
    lastLength.current = list.current.length;
    const emit = props[Emits.top];
    emit && emit();
  });

  const handleToBottom = debounce(() => {
    const emit = props[Emits.bottom];
    emit && emit();
  });

  const onItemSizeChange = (key: string | number, size: number) => {
    virtual.current.handleItemSizeChange(key, size);
  };

  const onSlotSizeChange = (key: string | number, size: number) => {
    virtual.current.handleSlotSizeChange(key, size);
  };

  // check item show or not
  const getItemStyle = React.useCallback(
    (itemKey) => {
      if (!sortable.current || !state) {
        return {};
      }
      const fromKey = state.from.key;
      if (sortable.current.rangeChanged && itemKey == fromKey) {
        return { display: 'none' };
      }
      return {};
    },
    [state]
  );

  const RootStyle = React.useMemo(() => {
    return { ...style, overflow: pageMode ? '' : isHorizontal ? 'auto hidden' : 'hidden auto' };
  }, [style, isHorizontal]);

  const WrapStyle = React.useMemo(() => {
    const { front, behind } = range;
    return { ...wrapStyle, padding: isHorizontal ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px` };
  }, [wrapStyle, isHorizontal, range]);

  const LastItemStyle = React.useMemo(() => {
    return { width: isHorizontal ? '0px' : '100%', height: isHorizontal ? '100%' : '0px' };
  }, [isHorizontal]);

  const { start, end } = React.useMemo(() => {
    return { ...range };
  }, [range]);

  const renderSlots = (Tag, key) => {
    return (
      <Slot
        roleId={key}
        Tag={Tag}
        children={props[key]}
        sizeKey={slotSizeKey}
        onSizeChange={onSlotSizeChange}
      />
    );
  };

  const renderItems = () => {
    return viewList.slice(start, end + 1).map((item, i) => {
      const index = start + i;
      const key = getDataKey(item, dataKey);
      return (
        <Item
          key={key}
          record={item}
          index={index}
          dataKey={key}
          Tag={itemTag}
          children={props.children}
          className={itemClass}
          style={{ ...itemStyle, ...getItemStyle(key) }}
          sizeKey={slotSizeKey}
          onSizeChange={onItemSizeChange}
        />
      );
    });
  };

  return (
    <RootTag
      ref={rootRef}
      style={RootStyle}
      className={className}
      onScroll={pageMode ? null : handleScroll}
    >
      {renderSlots(headerTag, 'header')}

      <WrapTag ref={wrapRef} role='group' style={WrapStyle} className={wrapClass}>
        {renderItems()}
      </WrapTag>

      {renderSlots(footerTag, 'footer')}

      <div ref={lastRef} style={LastItemStyle}></div>
    </RootTag>
  );
}

export default React.forwardRef(VirtualDragList);
