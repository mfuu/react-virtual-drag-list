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

  style?: object;
  className?: string;
  
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

export interface VirtualOptions<T> {
  size: number;
  keeps: number;
  uniqueKeys: T[];
  isHorizontal: boolean;
}

export interface SortableOptions<T> {
  getKey: Function;
  scrollEl: HTMLElement;
  dataSource: T[];
  disabled: boolean;
  draggable: string | Function;
  dragging: Function;
  ghostStyle: object;
  ghostClass: string;
  chosenClass: string;
  animation: number;
}

export class DragState {
  from: {
    key: string, // 拖拽起始节点唯一值
    item: any, // 拖拽起始节点数据
    index: number, // 拖拽起始节点索引
  }
  to: {
    key: string, // 拖拽结束节点唯一值
    item: any, // 拖拽结束节点数据
    index: number // 拖拽结束节点索引
  }
  constructor() {
    this.from = { key: null, item: null, index: -1 }
    this.to = { key: null, item: null, index: -1 }
  }
}

export class CalcSize {
  average: number; // 计算首次加载每一项的评价高度
  total: number; // 首次加载的总高度
  fixed: number; // 记录固定高度值
  header: number; // 顶部插槽高度
  footer: number; // 底部插槽高度
  constructor() {
    this.average = undefined
    this.total = undefined
    this.fixed = undefined
    this.header = undefined
    this.footer = undefined
  }
}

export class Range {
  start: number;
  end: number;
  front: number;
  behind: number;
  constructor() {
    this.start = 0
    this.end = 0
    this.front = 0
    this.behind = 0
  }
}