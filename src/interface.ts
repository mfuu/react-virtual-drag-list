import * as React from 'react'

export type RenderFunc<T> = (
  item: T,
  index: number,
  props: { style?: React.CSSProperties }
) => React.ReactNode

export type GetKey<T> = (item: T) => React.Key

export interface BaseProps {
  Tag?: string;
  Class?: string;
  Style?: object;
  onSizeChange?: Function;
  children?: React.ReactNode | ((ref: React.RefObject<any>) => React.ReactElement);
}

export interface VirtualProps<T> {
  dataSource: T[];
  dataKey: string;
  direction?: string; // scroll direction
  keeps?: number; // the number of lines rendered by the virtual scroll
  size?: number; // estimated height of each row

  delay?: number; // Delay time of debounce function
  height?: string; // list wrapper height

  rootTag?: string;
  wrapTag?: string;
  itemTag?: string;
  headerTag?: string;
  footerTag?: string;

  itemStyle?: object;
  itemClass?: string;
  rootStyle?: object;
  rootClass?: string;
  wrapStyle?: object;
  wrapClass?: string;

  disabled?: boolean; // Disables the sortable if set to true
  draggable?: Function | string; // Specifies which items inside the element should be draggable, the function type must return a boolean
  dragging?: Function; // Specifies the drag element, which must return an HTMLElement, such as (e) => e.target

  ghostStyle?: object; // The style of the mask element when dragging
  ghostClass?: string; // The class of the mask element when dragging
  chosenClass?: string; // The class of the selected element when dragging
  animation?: number; // Animation time
  
  children: RenderFunc<T>;
  header: RenderFunc<T>;
  footer: RenderFunc<T>;

  'v-top'?: Function;
  'v-bottom'?: Function;
  'v-dragend'?: Function;
}