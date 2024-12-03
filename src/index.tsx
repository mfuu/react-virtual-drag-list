import * as React from 'react';
import { SortableEvent } from 'sortable-dnd';
import useCombine from './hooks/useCombine';
import useChildren from './hooks/useChildren';
import { VirtualComponentRef, VirtualProps } from './interface';
import {
  Range,
  DragEvent,
  DropEvent,
  ScrollEvent,
  SortableOptions,
  VirtualOptions,
  Virtual,
  Sortable,
  debounce,
  getDataKey,
  VirtualAttrs,
  SortableAttrs,
} from './core';

const Emits = {
  drag: 'onDrag',
  drop: 'onDrop',
  top: 'onTop',
  bottom: 'onBottom',
};

function VirtualList<T>(props: VirtualProps<T>, ref: React.ForwardedRef<VirtualComponentRef>) {
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
    scrollSpeed = { x: 10, y: 10 },
    ghostClass = '',
    ghostStyle = undefined,
    chosenClass = '',
    placeholderClass = '',
    fallbackOnBody = false,
    scrollThreshold = 55,
    delayOnTouchOnly = false,
  } = props;

  const [range, setRange] = React.useState<Range>({
    start: 0,
    end: keeps - 1,
    front: 0,
    behind: 0,
    total: 0,
  });

  const dragging = React.useRef<boolean>(false);
  const chosenKey = React.useRef<string>('');
  const uniqueKeys = React.useRef<(string | number)[]>([]);

  const rootRef = React.useRef<HTMLElement>();
  const wrapRef = React.useRef<HTMLElement>();

  /**
   * git item size by data-key
   */
  const getSize = (key: string | number) => {
    return virtualRef.current!.getSize(key);
  };

  /**
   * Get the current scroll height
   */
  const getOffset = () => {
    return virtualRef.current!.getOffset();
  };

  /**
   * Get client viewport size
   */
  const getClientSize = () => {
    return virtualRef.current!.getClientSize();
  };

  /**
   * Get all scroll size
   */
  const getScrollSize = () => {
    return virtualRef.current!.getScrollSize();
  };

  /**
   * Scroll to the specified offset
   */
  const scrollToOffset = (offset: number) => {
    virtualRef.current?.scrollToOffset(offset);
  };

  /**
   * Scroll to the specified index position
   */
  const scrollToIndex = (index: number) => {
    virtualRef.current?.scrollToIndex(index);
  };

  /**
   * Scroll to the specified data-key position
   */
  const scrollToKey = (key: string | number) => {
    const index = uniqueKeys.current.indexOf(key);
    if (index > -1) {
      virtualRef.current?.scrollToIndex(index);
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
    virtualRef.current?.scrollToBottom();
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
  const virtualRef = React.useRef<Virtual>();
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
      if (sortableRef.current && dragging.current && range.start !== current.start) {
        sortableRef.current.reRendered = true;
      }
      return range;
    });
  };

  const installVirtual = () => {
    virtualRef.current = new Virtual({
      ...virtualCombinedStates,
      buffer: Math.round(keeps / 3),
      wrapper: wrapRef.current!,
      scroller: scroller || rootRef.current,
      uniqueKeys: uniqueKeys.current,
      onScroll: onScroll,
      onUpdate: onUpdate,
    });
  };

  useCombine(virtualCombinedStates, () => {
    VirtualAttrs.forEach((key) => {
      if (props[key] !== undefined) {
        virtualRef.current?.option(key as keyof VirtualOptions, props[key]);
      }
    });
  });

  const lastLength = React.useRef<number>(0);
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
  const sortableRef = React.useRef<Sortable<T>>();
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
    scrollSpeed,
    fallbackOnBody,
    scrollThreshold,
    delayOnTouchOnly,
    placeholderClass,
  };

  const onChoose = (event: SortableEvent) => {
    chosenKey.current = event.node.getAttribute('data-key') as string;
  };

  const onUnchoose = () => {
    chosenKey.current = '';
  };

  const onDrag = (event: DragEvent<T>) => {
    dragging.current = true;
    if (!sortable) {
      virtualRef.current?.enableScroll(false);
      sortableRef.current?.option('autoScroll', false);
    }
    props[Emits.drag]?.(event);
  };

  const onDrop = (event: DropEvent<T>) => {
    dragging.current = false;
    virtualRef.current?.enableScroll(true);
    sortableRef.current?.option('autoScroll', props.autoScroll);

    const params = { ...event, list: [...event.list] };
    props[Emits.drop]?.(params);
  };

  const installSortable = () => {
    sortableRef.current = new Sortable(rootRef.current as HTMLElement, {
      ...sortableCombinedStates,
      list: dataSource,
      uniqueKeys: uniqueKeys.current,
      onDrag,
      onDrop,
      onChoose,
      onUnchoose,
    });
  };

  useCombine(sortableCombinedStates, () => {
    SortableAttrs.forEach((key) => {
      if (props[key] !== undefined) {
        sortableRef.current?.option(key as keyof SortableOptions<T>, props[key]);
      }
    });
  });

  // ========================================== layout ==========================================
  const list = React.useRef<T[]>([]);
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

  const updateRange = (oldList: T[], newList: T[]) => {
    if (!oldList.length && !newList.length) {
      return;
    }

    if (oldList.length === newList.length) {
      return;
    }

    let _range = { ...range };
    if (
      newList.length > oldList.length &&
      _range.end === oldList.length - 1 &&
      scrolledToBottom()
    ) {
      _range.start++;
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
    // ignore changes for dragging element
    if (key === chosenKey.current) {
      return;
    }

    const sizes = virtualRef.current?.sizes.size;
    const renders = Math.min(keeps, dataSource.length);
    virtualRef.current?.onItemResized(key, size);

    if (sizes === renders - 1) {
      virtualRef.current!.updateRange({ ...range });
    }
  };

  const { containerStyle, wrapperStyle, itemSizeKey } = React.useMemo(() => {
    const { front, behind } = range;
    const isHorizontal = direction !== 'vertical';

    const overflowStyle = isHorizontal ? 'auto hidden' : 'hidden auto';
    const padding = isHorizontal ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px`;

    const containerStyle = { ...style, overflow: tableMode || scroller ? '' : overflowStyle };
    const wrapperStyle = { ...wrapStyle, padding: tableMode ? '' : padding };
    const itemSizeKey = isHorizontal ? 'offsetWidth' : 'offsetHeight';

    return {
      containerStyle,
      wrapperStyle,
      itemSizeKey,
    };
  }, [range, style, wrapStyle, scroller, tableMode, direction]);

  const [containerTag, wrapperTage] = React.useMemo(() => {
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
    chosenKey: chosenKey.current,
    itemClass,
    onSizeChange,
  });

  const TableSpacer = (offset: number, key: string) => {
    const style = { padding: 0, border: 0, height: `${offset}px` };
    return (
      <tr key={key}>
        <td style={style}></td>
      </tr>
    );
  };

  return React.createElement(
    containerTag,
    {
      ref: rootRef,
      style: containerStyle,
      className,
    },
    [
      props.header,
      React.createElement(
        wrapperTage,
        {
          ref: wrapRef,
          key: 'virtual-table-wrap',
          style: wrapperStyle,
          className: wrapClass,
        },
        [
          tableMode && TableSpacer(range.front, 'virtual-table-front'),
          ...listChildren,
          tableMode && TableSpacer(range.behind, 'virtual-table-behind'),
        ]
      ),
      props.footer,
    ]
  );
}

export default React.forwardRef(VirtualList) as <T>(
  props: VirtualProps<T> & { ref?: React.ForwardedRef<VirtualComponentRef> }
) => ReturnType<typeof VirtualList>;
