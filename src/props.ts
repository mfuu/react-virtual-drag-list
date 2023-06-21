import React from 'react';

type RenderFunc<T> = (
  item: T,
  index: number,
  props: { style?: React.CSSProperties }
) => React.ReactNode;

export interface VirtualProps<T> {
  dataSource: T[];
  dataKey: string;
  direction?: 'vertical' | 'horizontal';
  keeps?: number;
  size?: number;

  disabled?: boolean;
  draggable?: Function | string;
  handle?: Function | string;
  group?: object | string;

  delay?: number;
  keepOffset?: boolean;
  autoScroll?: boolean;
  scrollThreshold?: number;
  pressDelay?: number;
  pressDelayOnTouchOnly?: boolean;
  fallbackOnBody?: boolean;

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

  ghostStyle?: object;
  ghostClass?: string;
  chosenClass?: string;
  animation?: number;

  children: RenderFunc<T>;
  header?: React.ReactNode;
  footer?: React.ReactNode;

  'v-top'?: Function;
  'v-bottom'?: Function;
  'v-drag'?: Function;
  'v-drop'?: Function;
  'v-add'?: Function;
  'v-remove'?: Function;
}

export interface BaseProps {
  Tag?: string;
  style?: object;
  className?: string;
  sizeKey?: string;
  onSizeChange?: Function;
  children?: React.ReactNode | ((ref: React.RefObject<any>) => React.ReactElement);
}

export interface ObserverProps {
  dataKey: string | number;
  sizeKey?: string;
  onSizeChange?: Function;
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
