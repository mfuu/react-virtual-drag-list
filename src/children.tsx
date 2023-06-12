import React from 'react';
import { ObserverProps, ItemProps, BaseProps } from './props';

export function Observer(props: ObserverProps) {
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
}

export function Item<T>(props: ItemProps<T>) {
  const {
    children,
    dataKey,
    className,
    style,
    Tag = 'div',
    record,
    index,
    sizeKey,
    onSizeChange,
  } = props;

  return (
    <Observer dataKey={dataKey} sizeKey={sizeKey} onSizeChange={onSizeChange}>
      <Tag className={className} style={style} data-key={dataKey}>
        {typeof children === 'function'
          ? children(record, index, dataKey)
          : children}
      </Tag>
    </Observer>
  );
}

export interface SlotProps extends BaseProps {
  roleId: string;
}

export function Slot(props: SlotProps) {
  const {
    Tag = 'div',
    style,
    className,
    children,
    roleId,
    sizeKey,
    onSizeChange,
  } = props;

  return children ? (
    <Observer dataKey={roleId} sizeKey={sizeKey} onSizeChange={onSizeChange}>
      <Tag v-role={roleId} style={style} className={className}>
        {children}
      </Tag>
    </Observer>
  ) : (
    <></>
  );
}
