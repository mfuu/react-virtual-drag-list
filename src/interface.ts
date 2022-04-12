import * as React from 'react'

export type RenderFunc<T> = (
  item: T,
  index: number,
  props: { style?: React.CSSProperties }
) => React.ReactNode

export type GetKey<T> = (item: T) => React.Key

export interface BaseProps {
  onSizeChange?: Function;
  children?: React.ReactNode | ((ref: React.RefObject<any>) => React.ReactElement);
}