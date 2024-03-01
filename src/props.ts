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

export interface SortState {
  item: any;
  key: any;
  index: number;
}

export interface FromTo {
  index: number;
  list: any[];
}

export interface DropState {
  changed: boolean;
  list: any[];
  item: any;
  key: any;
  from: FromTo;
  to: FromTo;
}

export interface VirtualProps<T> {
  dataKey: string;
  dataSource: T[];

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
  rootStyle?: CSSStyleDeclaration;
  rootClass?: string;
  wrapStyle?: CSSStyleDeclaration;
  wrapClass?: string;
  headerClass?: string;
  headerStyle?: CSSStyleDeclaration;

  ghostStyle?: CSSStyleDeclaration;
  ghostClass?: string;
  chosenClass?: string;
  animation?: number;

  children: RenderFunc<T>;
  header?: React.ReactNode;
  footer?: React.ReactNode;

  'v-top'?: () => void;
  'v-bottom'?: () => void;
  'v-drag'?: (params: SortState) => void;
  'v-add'?: (params: SortState) => void;
  'v-remove'?: (params: SortState) => void;
  'v-drop'?: (params: DropState) => void;
}

export interface VirtualComponentRef {
  getSize: (key: any) => number;
  getOffset: () => number;
  getClientSize: () => number;
  getScrollSize: () => number;
  scrollToTop: () => void;
  scrollToIndex: (index: number) => void;
  scrollToOffset: (offset: number) => void;
  scrollToBottom: () => void;
}

export interface BaseProps {
  Tag?: string;
  style?: CSSStyleDeclaration;
  className?: string;
  sizeKey?: string;
  onSizeChange?: (key, size: number) => void;
  children?: React.ReactNode | ((ref: React.RefObject<any>) => React.ReactElement);
}

export interface ObserverProps {
  dataKey: string | number;
  sizeKey?: string;
  onSizeChange?: (key, size: number) => void;
  children?: React.ReactNode | ((ref: React.RefObject<any>) => React.ReactElement);
}

export interface ItemProps extends BaseProps {
  key: any;
  record: any;
  index: number;
  dataKey: string | number;
}

export interface SlotProps extends BaseProps {
  roleId: string;
}
