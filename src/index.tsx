import React from 'react';
import Dnd from 'sortable-dnd';
import { Item, Slot } from './slots';
import { VirtualComponentRef, VirtualProps } from './props';
import { Range, Virtual, Sortable, debounce, getDataKey } from './core';

const Emits = {
  top: 'v-top',
  bottom: 'v-bottom',
  drag: 'v-drag',
  drop: 'v-drop',
  add: 'v-add',
  remove: 'v-remove',
};

function VirtualDragList<T>(props: VirtualProps<T>, ref: React.ref) {
  const {
    keeps = 30,
    dataKey = '',
    direction = 'vertical',
    dataSource = [],
    throttleTime = 0,
    debounceTime = 0,

    delay = 0,
    animation = 150,
    autoScroll = true,
    scrollThreshold = 55,

    wrapTag: WrapTag = 'div',
    rootTag: RootTag = 'div',
    itemTag = 'div',
    headerTag = 'div',
    footerTag = 'div',

    style = {},
    itemStyle = {},
    wrapStyle = {},
    ghostStyle = {},
  } = props;

  const [dragged, setDragged] = React.useState<HTMLElement>(null);
  const [viewList, setViewList] = React.useState<T[]>([]);
  const [viewRange, setViewRange] = React.useState<Range>({});

  const list = React.useRef([]);
  const index = React.useRef(null);
  const range = React.useRef({ start: 0, end: keeps - 1, front: 0, behind: 0 });
  const uniqueKeys = React.useRef([]);
  const lastLength = React.useRef(null); // record current list's length

  const rootRef = React.useRef<Element>(null); // root element
  const wrapRef = React.useRef<Element>(null); // list element

  const sortable = React.useRef<Sortable>(null);
  const virtual = React.useRef<Virtual>(null);

  const { isHorizontal, itemSizeKey } = React.useMemo(() => {
    const isHorizontal = direction !== 'vertical';
    return {
      isHorizontal,
      itemSizeKey: isHorizontal ? 'offsetWidth' : 'offsetHeight',
    };
  }, [direction]);

  /**
   * git item size by data-key
   */
  const getSize = (key: any) => {
    return virtual.current.getSize(key);
  };

  /**
   * Get the current scroll height
   */
  const getOffset = () => {
    return virtual.current.getOffset();
  };

  /**
   * Get client viewport size
   */
  const getClientSize = () => {
    return virtual.current.getClientSize();
  };

  /**
   * Get all scroll size
   */
  const getScrollSize = () => {
    return virtual.current.getScrollSize();
  };

  /**
   * Scroll to the specified offset
   */
  const scrollToOffset = (offset: number) => {
    virtual.current.scrollToOffset(offset);
  };

  /**
   * Scroll to the specified index position
   */
  const scrollToIndex = (index: number) => {
    virtual.current.scrollToIndex(index);
  };

  /**
   * Scroll to the specified data-key position
   */
  const scrollToKey = (key: any) => {
    const index = uniqueKeys.current.indexOf(key);
    if (index > -1) {
      virtual.current.scrollToIndex(index);
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
    virtual.current.scrollToBottom();
  };

  React.useImperativeHandle(ref, () => ({
    getSize,
    getOffset,
    getClientSize,
    getScrollSize,
    scrollToTop,
    scrollToKey,
    scrollToIndex,
    scrollToOffset,
    scrollToBottom,
  }));

  React.useLayoutEffect(() => {
    initVirtual();
  }, []);

  React.useEffect(() => {
    initSortable();
    virtual.current.option('wrapper', wrapRef.current);

    if (!props.scroller) {
      virtual.current.option('scroller', rootRef.current);
    }

    // destroy
    return () => {
      virtual.current?.removeScrollEventListener();
      sortable.current?.destroy();
    };
  }, []);

  React.useEffect(() => {
    sortable.current?.option('disabled', props.disabled);
  }, [props.disabled]);

  React.useEffect(() => {
    const oldList = [...list.current];
    list.current = dataSource;
    updateUniqueKeys();

    setViewList(() => {
      updateRange(oldList, list.current);
      return [...dataSource];
    });

    sortable.current?.option('list', dataSource);

    // if auto scroll to the last offset
    if (lastLength.current && props.keepOffset) {
      const index = Math.abs(dataSource.length - lastLength.current);
      scrollToIndex(index);
      lastLength.current = null;
    }
  }, [dataSource]);

  const initVirtual = () => {
    virtual.current = new Virtual({
      size: props.size,
      keeps: keeps,
      buffer: Math.round(keeps / 3),
      scroller: props.scroller,
      direction: direction,
      uniqueKeys: uniqueKeys.current,
      debounceTime: debounceTime,
      throttleTime: throttleTime,
      onScroll: (params) => {
        lastLength.current = null;
        if (!!list.current.length && params.top) {
          handleToTop();
        } else if (params.bottom) {
          handleToBottom();
        }
      },
      onUpdate: (newRange: Range) => {
        if (Dnd.dragged && newRange.start !== range.current.start) {
          sortable.current.reRendered = true;
        }
        range.current = newRange;
        setViewRange(() => newRange);
      },
    });
  };

  const initSortable = () => {
    sortable.current = new Sortable(wrapRef.current, {
      ...props,
      list: list.current,
      delay,
      animation,
      autoScroll,
      ghostStyle,
      scrollThreshold,
      onDrag: (params) => {
        index.current = range.current.start;
        dispatchEvent('drag', params);
        setDragged(() => Dnd.dragged);
      },
      onAdd: (params) => {
        dispatchEvent('add', params);
      },
      onRemove: (params) => {
        dispatchEvent('remove', params);
      },
      onDrop: (params) => {
        if (params.list.length === list.current.length && index.current < range.current.start) {
          range.current.front += Dnd.clone?.[itemSizeKey] || 0;
          index.current = null;
          setViewRange(() => range.current);
        }

        if (params.changed) {
          const prelist = list.current;
          list.current = [...params.list];
          updateUniqueKeys();

          setDragged(() => null);
          setViewList(() => [...params.list]);

          updateRange(prelist, list.current);
        }

        dispatchEvent('drop', params);
      },
    });
  };

  const updateRange = (oldlist, newlist) => {
    let _range: Range = { ...range.current };
    if (
      newlist.length > oldlist.length &&
      range.current.end === oldlist.length - 1 &&
      scrolledToBottom()
    ) {
      _range.end++;
      _range.start = Math.max(0, _range.end - keeps);
    }
    if (virtual.current.sizes.size) {
      virtual.current.updateRange(_range);
    }
    setViewRange(() => range.current);
  };

  const updateUniqueKeys = () => {
    uniqueKeys.current = list.current.map((item) => getDataKey(item, dataKey));
    virtual.current.option('uniqueKeys', uniqueKeys.current);
  };

  const scrolledToBottom = () => {
    const offset = getOffset();
    const clientSize = getClientSize();
    const scrollSize = getScrollSize();
    return offset + clientSize + 1 >= scrollSize;
  };

  const dispatchEvent = (name: string, params?) => {
    const emit = props[Emits[name]];
    emit && emit(params);
  };

  const handleToTop = debounce(() => {
    lastLength.current = list.current.length;
    dispatchEvent('top');
  }, 50);

  const handleToBottom = debounce(() => {
    dispatchEvent('bottom');
  }, 50);

  const onItemSizeChange = (key: string | number, size: number) => {
    const renders = virtual.current.sizes.size;
    virtual.current.onItemResized(key, size);
    if (renders === 0) {
      updateRange(list.current, list.current);
    }
  };

  const onSlotSizeChange = (key: string | number, size: number) => {
    virtual.current.onSlotResized(key, size);
  };

  // check item show or not
  const getItemStyle = React.useCallback(
    (itemKey) => {
      const fromKey = dragged?.dataset.key;
      if (itemKey == fromKey) {
        return { display: 'none' };
      }
      return {};
    },
    [dragged]
  );

  const RootStyle = React.useMemo(() => {
    return {
      ...style,
      overflow: virtual.current?.useWindowScroll
        ? ''
        : isHorizontal
        ? 'auto hidden'
        : 'hidden auto',
    };
  }, [style, isHorizontal]);

  const WrapStyle = React.useMemo(() => {
    const { front, behind } = viewRange;
    return {
      ...wrapStyle,
      padding: isHorizontal ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px`,
    };
  }, [wrapStyle, isHorizontal, viewRange]);

  const renderSlots = (Tag: string, key: string) => {
    return (
      <Slot
        key={key}
        Tag={Tag}
        dataKey={key}
        sizeKey={itemSizeKey}
        children={props[key]}
        className={props[`${key}Class`]}
        style={props[`${key}Style`]}
        onSizeChange={onSlotSizeChange}
      />
    );
  };

  const renderItems = () => {
    return viewList.slice(viewRange.start, viewRange.end + 1).map((item, i: number) => {
      const index = viewRange.start + i;
      const key = getDataKey(item, dataKey);
      return (
        <Item
          key={key}
          Tag={itemTag}
          index={index}
          record={item}
          dataKey={key}
          sizeKey={itemSizeKey}
          children={props.children}
          className={props.itemClass}
          style={{ ...itemStyle, ...getItemStyle(key) }}
          onSizeChange={onItemSizeChange}
        />
      );
    });
  };

  return (
    <RootTag ref={rootRef} style={RootStyle} className={props.className}>
      {renderSlots(headerTag, 'header')}

      <WrapTag ref={wrapRef} style={WrapStyle} className={props.wrapClass}>
        {renderItems()}
      </WrapTag>

      {renderSlots(footerTag, 'footer')}
    </RootTag>
  );
}

export default React.forwardRef(VirtualDragList) as <T>(
  props: VirtualProps<T> & { ref?: React.ForwardedRef<VirtualComponentRef> }
) => ReturnType<typeof VirtualDragList>;
