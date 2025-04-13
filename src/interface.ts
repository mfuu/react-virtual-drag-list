import * as React from 'react';
import { Group, ScrollSpeed } from 'sortable-dnd';
import { DragEvent, DropEvent } from './core';

export type RenderFunc<T> = (item: T, index: number, key: string | number) => React.ReactElement;

export interface VirtualProps<T> {
  dataKey: string;
  dataSource: T[];
  children: React.ReactElement | RenderFunc<T>;
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
  scrollSpeed?: ScrollSpeed;
  fallbackOnBody?: boolean;
  scrollThreshold?: number;
  delayOnTouchOnly?: boolean;

  rootTag?: string;
  wrapTag?: string;

  style?: CSSStyleDeclaration;
  className?: string;
  wrapStyle?: CSSStyleDeclaration;
  wrapClass?: string;

  ghostStyle?: CSSStyleDeclaration;
  ghostClass?: string;
  chosenClass?: string;
  placeholderClass?: string;

  header?: React.ReactNode;
  footer?: React.ReactNode;

  onTop?: () => void;
  onBottom?: () => void;
  onDrag?: (event: DragEvent<T>) => void;
  onDrop?: (event: DropEvent<T>) => void;
}

export interface VirtualComponentRef {
  getSize: (key: string | number) => number;
  getOffset: () => number;
  getClientSize: () => number;
  getScrollSize: () => number;
  scrollToTop: () => void;
  scrollToKey: (key: string | number) => void;
  scrollToIndex: (index: number) => void;
  scrollToOffset: (offset: number) => void;
  scrollToBottom: () => void;
}

export interface ItemProps {
  dataKey: string | number;
  sizeKey: string;
  chosenKey: string;
  dragging: boolean;
  children: React.ReactElement;
  onSizeChange: (key: string | number, size: number) => void;
}
