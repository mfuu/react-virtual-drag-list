import React from 'react';
import { debounce, getDataKey } from './utils';
import Virtual, { Range } from './Plugins/Virtual';
import Sortable from './Plugins/Sortable';
import { Store } from './Plugins/Storage';
import { Item, Slot } from './children';
import { VirtualProps } from './props';

const Emits = { top: 'v-top', bottom: 'v-bottom' };

function VirtualDragList<T>(props: VirtualProps<T>, ref: React.ref) {
  const {
    dataSource = [],
    dataKey = '',
    direction = 'vertical',
    keeps = 30,
    size = undefined,
    delay = 0,
    keepOffset = false,
    autoScroll = true,
    scrollThreshold = 55,
    animation = 150,
    pressDelay = 0,
    pressDelayOnTouchOnly = false,
    fallbackOnBody = false,

    style = {},
    className = '',

    wrapTag = 'div',
    rootTag = 'div',
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
  const [range, setRange] = React.useState<Range>({ end: keeps - 1 }); // currently visible range
  const [state, setState] = React.useState<any>({ from: {}, to: {} });

  const list = React.useRef([]);
  const uniqueKeys = React.useRef([]);

  const rootRef = React.useRef<Element>(null); // root element
  const wrapRef = React.useRef<Element>(null); // list element
  const lastRef = React.useRef<Element>(null); // dom at the end of the list

  const lastItem = React.useRef(null); // record the first element of the current list
  const sortable = React.useRef<Sortable<T>>(null);
  const virtual = React.useRef<Virtual<T>>(null);

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
    const root = rootRef.current;
    return root ? Math.ceil(root[scrollDirectionKey]) : 0;
  };

  /**
   * Scroll to the specified offset
   * @param {Number} offset
   */
  const scrollToOffset = (offset: number) => {
    rootRef.current[scrollDirectionKey] = offset;
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

      setTimeout(() => {
        const offset = getOffset();
        const indexOffset = virtual.current.getOffsetByIndex(index);
        if (offset !== indexOffset) scrollToIndex(index);
      }, 5);
    }
  };

  /**
   * Scroll to top of list
   */
  const scrollToTop = () => {
    rootRef.current[scrollDirectionKey] = 0;
  };

  /**
   * Scroll to bottom of list
   */
  const scrollToBottom = () => {
    if (lastRef.current) {
      const offset = lastRef.current[offsetSizeKey];
      rootRef.current[scrollDirectionKey] = offset;

      setTimeout(() => {
        if (!checkIfScrollToBottom()) scrollToBottom();
      }, 5);
    }
  };

  const checkIfScrollToBottom = () => {
    const root = rootRef.current;
    const offset = getOffset();
    const clientSize = Math.ceil(root[clientSizeKey]);
    const scrollSize = Math.ceil(root[scrollSizeKey]);
    return offset + clientSize + 1 >= scrollSize;
  };

  React.useImperativeHandle(ref, () => ({
    reset,
    getSize,
    getOffset,
    scrollToTop,
    scrollToIndex,
    scrollToOffset,
    scrollToBottom,
  }));

  React.useEffect(() => {
    initVirtual();
    initSortable();
    // destroy
    return () => {
      destroySortable();
    };
  }, []);

  React.useEffect(() => {
    list.current = [...dataSource];
    setUniqueKeys();
    if (virtual.current) {
      virtual.current.updateUniqueKeys(uniqueKeys.current);
      virtual.current.updateSizes(uniqueKeys.current);
      setTimeout(() => virtual.current.updateRange(), 0);
    }
    if (sortable.current) {
      sortable.current.setValue('list', dataSource);
    }

    setViewList(() => [...dataSource]);

    // if auto scroll to the last offset
    if (lastItem.current && keepOffset) {
      const index = getItemIndex(lastItem.current);
      scrollToIndex(index);
      lastItem.current = null;
    }
  }, [dataSource]);

  React.useEffect(() => {
    if (sortable.current) {
      sortable.current.setValue('disabled', disabled);
    }
  }, [disabled]);

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

        setUniqueKeys();
        virtual.current.updateUniqueKeys(uniqueKeys.current);
        virtual.current.updateSizes(uniqueKeys.current);

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
        if (checkIfScrollToBottom()) {
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

  const setUniqueKeys = () => {
    uniqueKeys.current = list.current.map((item) => getDataKey(item, dataKey));
  };

  const getItemIndex = (item) => {
    return list.current.findIndex(
      (el) => getDataKey(el, dataKey) === getDataKey(item, dataKey)
    );
  };

  const {
    isHorizontal,
    slotSizeKey,
    scrollSizeKey,
    scrollDirectionKey,
    offsetSizeKey,
    clientSizeKey,
  } = React.useMemo(() => {
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

  const handleScroll = () => {
    const root = rootRef.current;
    const offset = getOffset();
    const clientSize = Math.ceil(root[clientSizeKey]);
    const scrollSize = Math.ceil(root[scrollSizeKey]);

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

  const handleToTop = debounce(() => {
    lastItem.current = list.current[0];
    const emit = props[Emits.top];
    emit && emit();
  });

  const handleToBottom = debounce(() => {
    const emit = props[Emits.bottom];
    emit && emit();
  });

  const onItemSizeChange = (key: string | number, size: number) => {
    if (!virtual.current) return;
    virtual.current.handleItemSizeChange(key, size);
  };

  const onSlotSizeChange = (key: string | number, size: number) => {
    if (!virtual.current) return;
    virtual.current.handleSlotSizeChange(key, size);
  };

  // check item show or not
  const getItemStyle = React.useCallback(
    (itemKey) => {
      if (!sortable.current || !state) return {};
      const fromKey = state.from.key;

      if (sortable.current.rangeChanged && itemKey == fromKey) {
        return { display: 'none' };
      }
      return {};
    },
    [state]
  );

  const { RTag, WTag } = React.useMemo(() => {
    return { RTag: rootTag, WTag: wrapTag };
  }, [wrapTag, rootTag]);

  const RStyle = React.useMemo(() => {
    return { ...style, overflow: isHorizontal ? 'auto hidden' : 'hidden auto' };
  }, [style, isHorizontal]);

  const WStyle = React.useMemo(() => {
    const { front, behind } = range;
    return {
      ...wrapStyle,
      padding: isHorizontal
        ? `0px ${behind}px 0px ${front}px`
        : `${front}px 0px ${behind}px`,
    };
  }, [wrapStyle, isHorizontal, range]);

  const { start, end } = React.useMemo(() => {
    return { ...range };
  }, [range]);

  return (
    <RTag
      ref={rootRef}
      style={RStyle}
      className={className}
      onScroll={debounce(handleScroll, delay)}
    >
      <Slot
        roleId='header'
        Tag={headerTag}
        children={props.header}
        sizeKey={slotSizeKey}
        onSizeChange={onSlotSizeChange}
      ></Slot>

      <WTag ref={wrapRef} v-role='group' style={WStyle} className={wrapClass}>
        {viewList.slice(start, end + 1).map((item) => {
          const key = getDataKey(item, dataKey);
          const index = getItemIndex(item);
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
        })}
      </WTag>

      <Slot
        roleId='footer'
        Tag={footerTag}
        children={props.footer}
        sizeKey={slotSizeKey}
        onSizeChange={onSlotSizeChange}
      ></Slot>
      <div
        ref={lastRef}
        style={{
          width: isHorizontal ? '0px' : '100%',
          height: isHorizontal ? '100%' : '0px',
        }}
      ></div>
    </RTag>
  );
}

export default React.forwardRef(VirtualDragList);
