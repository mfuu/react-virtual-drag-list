import React from 'react';
import useChildren from './hooks/useChildren';
import useSortable from './hooks/useSortable';
import useVirtual from './hooks/useVirtual';
import { VirtualComponentRef, VirtualProps } from './interface';
import { Virtual, Sortable, Range, getDataKey } from './core';

const Emits = {
  drag: 'onDrag',
  drop: 'onDrop',
};

function VirtualList<T>(props: VirtualProps<T>, ref: React.ref) {
  const {
    keeps = 30,
    dataKey = '',
    sortable = true,
    scroller = undefined,
    direction = 'vertical',
    dataSource = [],

    style = {},
    className = '',
    wrapStyle = {},
    wrapClass = '',
    itemClass = 'virutal-dnd-list-item',
    wrapTag: Wrapper = 'div',
    rootTag: Rooter = 'div',
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

  const { isHorizontal, itemSizeKey } = React.useMemo(() => {
    const isHorizontal = direction !== 'vertical';
    const itemSizeKey = isHorizontal ? 'offsetWidth' : 'offsetHeight';

    return { isHorizontal, itemSizeKey };
  }, [direction]);

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

  const onUpdate = (range) => {
    setRange((current: Range) => {
      if (dragging.current && range.start !== current.start) {
        sortableRef.current.reRendered = true;
      }
      return range;
    });
  };

  const virtualRef = React.useRef<Virtual>(undefined);
  const [virtual] = useVirtual(props, rootRef, wrapRef, uniqueKeys.current, onUpdate);
  virtualRef.current = virtual;

  const onDrag = (event) => {
    dragging.current = event.key;
    if (!sortable) {
      virtualRef.current.enableScroll(false);
      sortableRef.current.option('autoScroll', false);
    }
    props[Emits.drag]?.(event);
  };

  const onDrop = (event) => {
    dragging.current = '';
    virtualRef.current.enableScroll(true);
    sortableRef.current.option('autoScroll', props.autoScroll);

    props[Emits.drop]?.({ ...event, list: [...event.list] });
  };

  const sortableRef = React.useRef<Sortable>(undefined);
  const [dnd] = useSortable(dataSource, props, wrapRef, uniqueKeys.current, onDrag, onDrop);
  sortableRef.current = dnd;

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

  const onItemSizeChange = (key: string | number, size: number) => {
    const sizes = virtualRef.current.sizes.size;
    const renders = Math.min(keeps, dataSource.length);
    virtualRef.current.onItemResized(key, size);

    if (sizes === renders - 1) {
      updateRange(dataSource, dataSource);
    }
  };

  const listChildren = useChildren({
    list: dataSource,
    start: range.start,
    end: range.end,
    dataKey,
    sizeKey: itemSizeKey,
    children: props.children,
    dragging: dragging.current,
    itemClass: itemClass,
    onSizeChange: onItemSizeChange,
  });

  const rooterStyle = React.useMemo(() => {
    const overflowStyle = isHorizontal ? 'auto hidden' : 'hidden auto';

    return { ...style, overflow: scroller ? '' : overflowStyle };
  }, [style, isHorizontal, scroller]);

  const wrapperStyle = React.useMemo(() => {
    const { front, behind } = range;
    const padding = isHorizontal ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px`;

    return { ...wrapStyle, padding };
  }, [wrapStyle, isHorizontal, range]);

  return (
    <Rooter ref={rootRef} style={rooterStyle} className={className}>
      {props.header}
      <Wrapper ref={wrapRef} style={wrapperStyle} className={wrapClass}>
        {listChildren}
      </Wrapper>
      {props.footer}
    </Rooter>
  );
}

export default React.forwardRef(VirtualList) as <T>(
  props: VirtualProps<T> & { ref?: React.ForwardedRef<VirtualComponentRef> }
) => ReturnType<typeof VirtualList>;
