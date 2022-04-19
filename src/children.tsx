import * as React from 'react'
import { Observer } from './hooks'
import { BaseProps } from './interface'

export interface ItemProps<T> extends BaseProps {
  key: any;
  record: T;
  index: number;
  uniqueKey: string | number;
  itemClass?: string;
  itemStyle?: object;
}

export function Item<T>(props: ItemProps<T>) {

  const { children, uniqueKey, itemClass, itemStyle } = props

  const { record, index, onSizeChange } = props

  return (
    <Observer uniqueKey={ uniqueKey } onSizeChange={ onSizeChange }>
      <div
        className={ itemClass }
        style={ itemStyle }
        data-key={ uniqueKey }
      >
        { typeof children === 'function' ? children(record, index, uniqueKey) : children }
      </div>
    </Observer>
  )
}

export interface SlotProps<T> extends BaseProps {
  roleId: string;
}

export function Slot<T>(props: SlotProps<T>) {
  
  const { children, roleId, onSizeChange } = props

  return children ? (
    <Observer uniqueKey={ roleId } onSizeChange={ onSizeChange }>
      <div v-role={ roleId }>{ children }</div>
    </Observer>
  ) : <></>
}