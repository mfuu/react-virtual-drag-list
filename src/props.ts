import React from 'react';

type RenderFunc<T> = (
  item: T,
  index: number,
  props: { style?: React.CSSProperties }
) => React.ReactNode;

export interface Group {
  name: string;
  put: boolean | Array<string>;
  pull: boolean | 'clone';
  revertDrag: boolean;
}

export interface SortState<T> {
  item: T;
  key: any;
  index: number;
}

export interface FromTo<T> {
  index: number;
  list: T[];
}

export interface DropState<T> {
  changed: boolean;
  list: T[];
  item: T;
  key: any;
  from: FromTo<T>;
  to: FromTo<T>;
}

export interface VirtualProps<T> {
  dataKey: string;
  dataSource: T[];
  children: RenderFunc<T>;

  keeps?: number;
  size?: number;
  group?: Group | string;
  handle?: Function | string;
  scroller?: HTMLElement | Window | Document;
  direction?: 'vertical' | 'horizontal';
  debounceTime?: number;
  throttleTime?: number;

  delay?: number;
  disabled?: boolean;
  draggable?: string;
  keepOffset?: boolean;
  autoScroll?: boolean;
  fallbackOnBody?: boolean;
  scrollThreshold?: number;
  delayOnTouchOnly?: boolean;

  style?: CSSStyleDeclaration;
  className?: string;

  rootTag?: string;
  wrapTag?: string;
  itemTag?: string;
  headerTag?: string;
  footerTag?: string;

  itemStyle?: CSSStyleDeclaration;
  itemClass?: string;
  wrapStyle?: CSSStyleDeclaration;
  wrapClass?: string;
  headerStyle?: CSSStyleDeclaration;
  headerClass?: string;
  footerStyle?: CSSStyleDeclaration;
  footerClass?: string;

  ghostStyle?: CSSStyleDeclaration;
  ghostClass?: string;
  chosenClass?: string;
  animation?: number;

  header?: React.ReactNode;
  footer?: React.ReactNode;

  'v-top'?: () => void;
  'v-bottom'?: () => void;
  'v-drag'?: (params: SortState<T>) => void;
  'v-add'?: (params: SortState<T>) => void;
  'v-remove'?: (params: SortState<T>) => void;
  'v-drop'?: (params: DropState<T>) => void;
}

export interface VirtualComponentRef {
  getSize: (key: any) => number;
  getOffset: () => number;
  getClientSize: () => number;
  getScrollSize: () => number;
  scrollToTop: () => void;
  scrollToKey: (key: any) => void;
  scrollToIndex: (index: number) => void;
  scrollToOffset: (offset: number) => void;
  scrollToBottom: () => void;
}

export interface BaseProps {
  dataKey: string | number;
  sizeKey?: string;
  onSizeChange?: (key: string | number, size: number) => void;
  children?: React.ReactNode | ((ref: React.RefObject<any>) => React.ReactElement);
}

export interface ItemProps extends BaseProps {
  Tag?: string;
  key: string | number;
  index: number;
  record: any;
  style?: CSSStyleDeclaration;
  className?: string;
}

export interface SlotProps extends BaseProps {
  Tag?: string;
  style?: CSSStyleDeclaration;
  className?: string;
}
