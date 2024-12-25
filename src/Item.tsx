import * as React from 'react';
import { ItemProps } from './interface';
import { isSameValue } from './core';

function Item(props: ItemProps) {
  const { itemClass, dataKey, sizeKey, dragging, chosenKey, children, onSizeChange } = props;

  const eleRef = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    let observer: ResizeObserver | null;
    if (typeof ResizeObserver !== undefined) {
      observer = new ResizeObserver(() => {
        const size = eleRef.current![sizeKey];
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

  const itemStyle: React.CSSProperties = React.useMemo(() => {
    const style = children.props.style || {};
    const isChosen = isSameValue(dataKey, chosenKey);
    if (dragging && isChosen) {
      return Object.assign(style, { display: 'none' });
    }

    return style;
  }, [chosenKey, dragging]);

  return React.cloneElement(children, {
    'data-key': dataKey,
    ref: eleRef,
    style: itemStyle,
    className: `${itemClass} ${children.props.className}`,
  });
}

export default React.memo(Item);
