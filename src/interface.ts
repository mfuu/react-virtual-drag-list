import React from 'react';
import { SortableEvent } from 'sortable-dnd';

export type RenderFunc<T> = (item: T, index: number, key: string | number) => React.ReactNode;

export interface Group {
  name: string;
  put: boolean | string[];
  pull: boolean | 'clone';
  revertDrag: boolean;
}

export interface DragEvent<T> {
  key: string | number;
  item: T;
  index: number;
  event: SortableEvent;
}

export interface DropEvent<T> {
  key: string | number;
  item: T;
  list: T[];
  event: SortableEvent;
  changed: false;
  oldList: T[];
  oldIndex: number;
  newIndex: number;
}

export interface VirtualProps<T> {
  dataKey: string;
  dataSource: T[];
  children: RenderFunc<T>;
  tableMode?: boolean;

  keeps?: number;
  size?: number;
  group?: Group | string;
  handle?: string;
  lockAxis?: 'x' | 'y';
  scroller?: HTMLElement | Document;
  direction?: 'vertical' | 'horizontal';
  debounceTime?: number;
  throttleTime?: number;

  delay?: number;
  disabled?: boolean;
  sortable?: boolean;
  draggable?: string;
  animation?: number;
  keepOffset?: boolean;
  autoScroll?: boolean;
  fallbackOnBody?: boolean;
  scrollThreshold?: number;
  delayOnTouchOnly?: boolean;

  rootTag?: string;
  wrapTag?: string;

  style?: CSSStyleDeclaration;
  className?: string;
  wrapStyle?: CSSStyleDeclaration;
  wrapClass?: string;
  itemClass?: string;

  ghostStyle?: CSSStyleDeclaration;
  ghostClass?: string;
  chosenClass?: string;

  header?: React.ReactNode;
  footer?: React.ReactNode;

  onTop?: () => void;
  onBottom?: () => void;
  onDrag?: (event: DragEvent<T>) => void;
  onDrop?: (event: DropEvent<T>) => void;
}

export interface VirtualComponentRef {
  getSize: (key: string) => number;
  getOffset: () => number;
  getClientSize: () => number;
  getScrollSize: () => number;
  scrollToTop: () => void;
  scrollToKey: (key: string) => void;
  scrollToIndex: (index: number) => void;
  scrollToOffset: (offset: number) => void;
  scrollToBottom: () => void;
}

export interface ItemProps<T> {
  itemClass: string;
  dataKey: string | number;
  sizeKey: string;
  dragging: string;
  children: React.ReactNode | RenderFunc<T>;
  onSizeChange: (key: string | number, size: number) => void;
}
