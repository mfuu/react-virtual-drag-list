import * as React from 'react';
import useCombine from './hooks/useCombine';
import useChildren from './hooks/useChildren';
import { VirtualComponentRef, VirtualProps } from './interface';
import { Range, DropEvent, ScrollEvent, SortableEvent } from './core';
import { Virtual, Sortable, debounce, getDataKey, VirtualAttrs, SortableAttrs } from './core';

const Emits = {
  drag: 'onDrag',
  drop: 'onDrop',
  top: 'onTop',
  bottom: 'onBottom',
};

function VirtualList<T>(props: VirtualProps<T>, ref: React.ref) {
  const {
    dataKey = '',
    dataSource = [],
    tableMode = false,

    wrapTag = 'div',
    rootTag = 'div',

    style = {},
    className = '',
    wrapStyle = {},
    wrapClass = '',
    itemClass = 'virutal-dnd-list-item',

    size = undefined,
    keeps = 30,
    scroller = undefined,
    direction = 'vertical',
    debounceTime = 0,
    throttleTime = 0,

    delay = 0,
    group = '',
    handle = '',
    lockAxis = undefined,
    disabled = false,
    sortable = true,
    draggable = '.virutal-dnd-list-item',
    animation = 150,
    autoScroll = true,
    ghostClass = '',
    ghostStyle = undefined,
    chosenClass = '',
    fallbackOnBody = false,
    scrollThreshold = 55,
    delayOnTouchOnly = false,
  } = props;

  const [range, setRange] = React.useState<Range>({
    start: 0,
    end: keeps - 1,
    front: 0,
    behind: 0,
  });

  const dragging = React.useRef('');
  const uniqueKeys = React.useRef([]);

  const rootRef = React.useRef<Element>(null);
  const wrapRef = React.useRef<Element>(null);

  /**
   * git item size by data-key
   */
  const getSize = (key: string | number) => {
    return virtualRef.current.getSize(key);
  };

  /**
   * Get the current scroll height
   */
  const getOffset = () => {
    return virtualRef.current.getOffset();
  };

  /**
   * Get client viewport size
   */
  const getClientSize = () => {
    return virtualRef.current.getClientSize();
  };

  /**
   * Get all scroll size
   */
  const getScrollSize = () => {
    return virtualRef.current.getScrollSize();
  };

  /**
   * Scroll to the specified offset
   */
  const scrollToOffset = (offset: number) => {
    virtualRef.current.scrollToOffset(offset);
  };

  /**
   * Scroll to the specified index position
   */
  const scrollToIndex = (index: number) => {
    virtualRef.current.scrollToIndex(index);
  };

  /**
   * Scroll to the specified data-key position
   */
  const scrollToKey = (key: string | number) => {
    const index = uniqueKeys.current.indexOf(key);
    if (index > -1) {
      virtualRef.current.scrollToIndex(index);
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
    virtualRef.current.scrollToBottom();
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

  React.useEffect(() => {
    installVirtual();
    installSortable();

    return () => {
      virtualRef.current?.removeScrollEventListener();
      sortableRef.current?.destroy();
    };
  }, []);

  // ========================================== use virtual ==========================================
  const topLoading = React.useRef(false);
  const virtualRef = React.useRef<Virtual>(undefined);
  const virtualCombinedStates = {
    size,
    keeps,
    scroller,
    direction,
    debounceTime,
    throttleTime,
  };
  const handleToTop = debounce(() => {
    topLoading.current = true;
    props[Emits.top]?.();
  }, 50);

  const handleToBottom = debounce(() => {
    props[Emits.bottom]?.();
  }, 50);

  const onScroll = (event: ScrollEvent) => {
    topLoading.current = false;
    if (event.top) {
      handleToTop();
    } else if (event.bottom) {
      handleToBottom();
    }
  };

  const onUpdate = (range: Range) => {
    setRange((current: Range) => {
      if (dragging.current && range.start !== current.start) {
        sortableRef.current.reRendered = true;
      }
      return range;
    });
  };

  const installVirtual = () => {
    virtualRef.current = new Virtual({
      ...virtualCombinedStates,
      buffer: Math.round(keeps / 3),
      wrapper: wrapRef.current,
      scroller: scroller || rootRef.current,
      uniqueKeys: uniqueKeys.current,
      onScroll: onScroll,
      onUpdate: onUpdate,
    });
  };

  useCombine(virtualCombinedStates, () => {
    VirtualAttrs.forEach((key) => {
      if (props[key] !== undefined) {
        virtualRef.current?.option(key, props[key]);
      }
    });
  });

  const lastLength = React.useRef(null);
  React.useEffect(() => {
    // if auto scroll to the last offset
    if (lastLength.current && topLoading.current && props.keepOffset) {
      const index = Math.abs(dataSource.length - lastLength.current);
      if (index > 0) {
        virtualRef.current?.scrollToIndex(index);
      }
      topLoading.current = false;
    }

    lastLength.current = dataSource.length;
  }, [dataSource]);

  // ========================================== use dnd ==========================================
  const sortableRef = React.useRef<Sortable>(undefined);
  const sortableCombinedStates = {
    delay,
    group,
    handle,
    lockAxis,
    disabled,
    sortable,
    draggable,
    animation,
    autoScroll,
    ghostClass,
    ghostStyle,
    chosenClass,
    fallbackOnBody,
    scrollThreshold,
    delayOnTouchOnly,
  };

  const onDrag = (event: SortableEvent) => {
    dragging.current = event.key;
    if (!sortable) {
      virtualRef.current.enableScroll(false);
      sortableRef.current.option('autoScroll', false);
    }
    props[Emits.drag]?.(event);
  };

  const onDrop = (event: DropEvent) => {
    dragging.current = '';
    virtualRef.current.enableScroll(true);
    sortableRef.current.option('autoScroll', props.autoScroll);

    const params = { ...event, list: [...event.list] };
    props[Emits.drop]?.(params);
  };

  const installSortable = () => {
    sortableRef.current = new Sortable(rootRef.current, {
      ...sortableCombinedStates,
      list: dataSource,
      uniqueKeys: uniqueKeys.current,
      onDrag,
      onDrop,
    });
  };

  useCombine(sortableCombinedStates, () => {
    SortableAttrs.forEach((key) => {
      if (props[key] !== undefined) {
        sortableRef.current?.option(key, props[key]);
      }
    });
  });

  // ========================================== layout ==========================================
  const list = React.useRef([]);
  React.useEffect(() => {
    updateUniqueKeys();
    updateRange(list.current, dataSource);

    list.current = dataSource;

    sortableRef.current?.option('list', dataSource);
  }, [dataSource]);

  const updateUniqueKeys = () => {
    uniqueKeys.current = dataSource.map((item) => getDataKey(item, dataKey));
    virtualRef.current?.option('uniqueKeys', uniqueKeys.current);
    sortableRef.current?.option('uniqueKeys', uniqueKeys.current);
  };

  const updateRange = (oldlist: T[], newlist: T[]) => {
    let _range: Range = { ...range };
    if (
      oldlist.length &&
      newlist.length > oldlist.length &&
      range.end === oldlist.length - 1 &&
      scrolledToBottom()
    ) {
      _range.end++;
      _range.start = Math.max(0, _range.end - keeps);
    }
    virtualRef.current?.updateRange(_range);
  };

  const scrolledToBottom = () => {
    const offset = getOffset();
    const clientSize = getClientSize();
    const scrollSize = getScrollSize();
    return offset + clientSize + 1 >= scrollSize;
  };

  const onSizeChange = (key: string | number, size: number) => {
    const sizes = virtualRef.current?.sizes.size;
    const renders = Math.min(keeps, dataSource.length);
    virtualRef.current?.onItemResized(key, size);

    if (sizes === renders - 1) {
      updateRange(dataSource, dataSource);
    }
  };

  const { containerStyle, wrapperStyle, itemSizeKey } = React.useMemo(() => {
    const { front, behind } = range;
    const isHorizontal = direction !== 'vertical';

    const overflowStyle = isHorizontal ? 'auto hidden' : 'hidden auto';
    const padding = isHorizontal ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px`;

    const containerStyle = { ...style, overflow: tableMode || scroller ? '' : overflowStyle };
    const wrapperStyle = { ...wrapStyle, padding: tableMode ? null : padding };
    const itemSizeKey = isHorizontal ? 'offsetWidth' : 'offsetHeight';

    return {
      containerStyle,
      wrapperStyle,
      itemSizeKey,
    };
  }, [range, style, wrapStyle, scroller, tableMode, direction]);

  const [Container, Wrapper] = React.useMemo(() => {
    const container = tableMode ? 'table' : wrapTag;
    const wrapper = tableMode ? 'tbody' : wrapTag;

    return [container, wrapper];
  }, [rootTag, wrapTag, tableMode]);

  const listChildren = useChildren({
    list: dataSource,
    start: range.start,
    end: range.end,
    dataKey,
    sizeKey: itemSizeKey,
    children: props.children,
    dragging: dragging.current,
    itemClass,
    onSizeChange,
  });

  const TableSpacer = (offset: number) => {
    const style = { padding: 0, border: 0, margin: 0, height: `${offset}px` };
    return (
      <tr>
        <td style={style}></td>
      </tr>
    );
  };

  return (
    <Container ref={rootRef} style={containerStyle} className={className}>
      {props.header}
      <Wrapper ref={wrapRef} style={wrapperStyle} className={wrapClass}>
        {tableMode && TableSpacer(range.front)}

        {listChildren}

        {tableMode && TableSpacer(range.behind)}
      </Wrapper>
      {props.footer}
    </Container>
  );
}

export default React.forwardRef(VirtualList) as <T>(
  props: VirtualProps<T> & { ref?: React.ForwardedRef<VirtualComponentRef> }
) => ReturnType<typeof VirtualList>;
