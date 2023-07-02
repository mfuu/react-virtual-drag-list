import React from 'react';
import { ItemProps, ObserverProps, SlotProps } from './props';

export const Observer = React.memo((props: ObserverProps) => {
  const { dataKey, children, onSizeChange, sizeKey } = props;
  const elementRef = React.useRef<Element>(null);
  const isRenderProps = typeof children === 'function';
  const mergedChildren = isRenderProps ? children(elementRef) : children;

  React.useLayoutEffect(() => {
    let observer: ResizeObserver | null;
    if (typeof ResizeObserver !== undefined) {
      observer = new ResizeObserver(() => {
        const size = elementRef.current[sizeKey];
        onSizeChange && onSizeChange(dataKey, size);
      });
      elementRef.current && observer.observe(elementRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [elementRef]);

  return React.cloneElement(mergedChildren as any, {
    ref: elementRef,
  });
});

export const Item = React.memo((props: ItemProps) => {
  const { Tag = 'div', children } = props;

  return (
    <Observer
      dataKey={props.dataKey}
      sizeKey={props.sizeKey}
      onSizeChange={props.onSizeChange}
    >
      <Tag
        className={props.className}
        style={props.style}
        data-key={props.dataKey}
        data-index={props.index}
      >
        {typeof children === 'function'
          ? children(props.record, props.index, props.dataKey)
          : children}
      </Tag>
    </Observer>
  );
});

export const Slot = React.memo((props: SlotProps) => {
  const { Tag = 'div', children } = props;

  return children ? (
    <Observer
      dataKey={props.roleId}
      sizeKey={props.sizeKey}
      onSizeChange={props.onSizeChange}
    >
      <Tag
        role={props.roleId}
        style={props.style}
        className={props.className}
      >
        {children}
      </Tag>
    </Observer>
  ) : null;
});
