import * as React from 'react';
import { ItemProps } from './interface';

function Item<T>(props: ItemProps<T>) {
  const { itemClass, dataKey, sizeKey, dragging, children, onSizeChange } = props;

  const eleRef = React.useRef<Element>(null);

  React.useLayoutEffect(() => {
    let observer: ResizeObserver | null;
    if (typeof ResizeObserver !== undefined) {
      observer = new ResizeObserver(() => {
        const size = eleRef.current[sizeKey];
        onSizeChange(dataKey, size);
      });
      eleRef.current && observer?.observe(eleRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [eleRef]);

  const itemStyle = React.useMemo(() => {
    const style = children.props.style || {};
    if (dataKey === dragging) {
      return Object.assign(style, { display: 'none' });
    }

    return style;
  }, [dragging]);

  return React.cloneElement(children, {
    'data-key': dataKey,
    ref: eleRef,
    style: itemStyle,
    className: [itemClass, children.props.className].join(' '),
  });
}

export default React.memo(Item);
