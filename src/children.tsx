import * as React from 'react'
import { Observer } from './hooks'
import { BaseProps } from './interface'

export interface ItemProps<T> extends BaseProps {
  key: any;
  record: T;
  index: number;
  dataKey: string | number;
}

export function Item<T>(props: ItemProps<T>) {

  const { children, dataKey, Class, Style, Tag = 'div' } = props

  const { record, index, onSizeChange } = props

  return (
    <Observer dataKey={ dataKey } onSizeChange={ onSizeChange }>
      <Tag
        className={ Class }
        style={ Style }
        data-key={ dataKey }
      >
        { typeof children === 'function' ? children(record, index, dataKey) : children }
      </Tag>
    </Observer>
  )
}

export interface SlotProps<T> extends BaseProps {
  roleId: string;
}

export function Slot<T>(props: SlotProps<T>) {
  
  const { Tag = 'div', Style, Class, children, roleId, onSizeChange } = props

  return children ? (
    <Observer dataKey={ roleId } onSizeChange={ onSizeChange }>
      <Tag
        v-role={ roleId }
        style={ Style }
        className={ Class }
      >
        { children }
      </Tag>
    </Observer>
  ) : <></>
}