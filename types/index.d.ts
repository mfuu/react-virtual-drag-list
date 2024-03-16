import React from 'react';

declare type RenderFunc<T> = (item: T, index: number, props: {
    style?: React.CSSProperties;
}) => React.ReactNode;
interface Group {
    name: string;
    put: boolean | Array<string>;
    pull: boolean | 'clone';
    revertDrag: boolean;
}
interface SortState<T> {
    item: T;
    key: any;
    index: number;
}
interface FromTo<T> {
    index: number;
    list: T[];
}
interface DropState<T> {
    changed: boolean;
    list: T[];
    item: T;
    key: any;
    from: FromTo<T>;
    to: FromTo<T>;
}
interface VirtualProps<T> {
    dataKey: string;
    dataSource: T[];
    children: RenderFunc<T>;
    keeps?: number;
    size?: number;
    group?: Group | string;
    handle?: Function | string;
    lockAxis?: 'x' | 'y';
    scroller?: HTMLElement | Document;
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
    itemStyle?: CSSStyleDeclaration;
    itemClass?: string;
    wrapStyle?: CSSStyleDeclaration;
    wrapClass?: string;
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

declare const _default: <T>(props: VirtualProps<T> & {
    ref?: any;
}) => any;

export { _default as default };
