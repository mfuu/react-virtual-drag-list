import React from 'react';
import { SortableEvent } from 'sortable-dnd';

declare type RenderFunc<T> = (item: T, index: number, key: string | number) => React.ReactNode;
interface Group {
    name: string;
    put: boolean | string[];
    pull: boolean | 'clone';
    revertDrag: boolean;
}
interface DragEvent<T> {
    key: string | number;
    item: T;
    index: number;
    event: SortableEvent;
}
interface DropEvent<T> {
    key: string | number;
    item: T;
    list: T[];
    event: SortableEvent;
    changed: false;
    oldList: T[];
    oldIndex: number;
    newIndex: number;
}
interface VirtualProps<T> {
    dataKey: string;
    dataSource: T[];
    children: RenderFunc<T>;
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

declare const _default: <T>(props: VirtualProps<T> & {
    ref?: any;
}) => any;

export { _default as default };
