import * as React from 'react';
import Item from '../Item';
import { getDataKey } from '../core';
import { RenderFunc } from '../interface';

interface Props<T> {
  list: T[];
  start: number;
  end: number;
  dataKey: string;
  sizeKey: string;
  dragging: string;
  children: React.ReactNode | RenderFunc<T>;
  itemClass: string;
  onSizeChange: (key: string, size: number) => void;
}

function useChildren<T>(props: Props<T>) {
  const { list, start, end, dataKey, sizeKey, dragging, children, itemClass, onSizeChange } = props;

  return list.slice(start, end + 1).map((item, i) => {
    const index = start + i;
    const key = getDataKey(item, dataKey);

    return (
      <Item
        key={key}
        dataKey={key}
        sizeKey={sizeKey}
        dragging={dragging}
        children={children}
        itemClass={itemClass}
        onSizeChange={onSizeChange}
      >
        {typeof children === 'function' ? children(item, index, key) : children}
      </Item>
    );
  });
}

export default useChildren;
