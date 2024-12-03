import * as React from 'react';
import { SortableEvent, Group, ScrollSpeed } from 'sortable-dnd';

interface DragEvent<T> {
    item: T;
    key: string | number;
    index?: number;
    event: SortableEvent;
}
interface DropEvent<T> {
    key: string | number;
    item: T;
    list: T[];
    event: SortableEvent;
    changed: boolean;
    oldList: T[];
    oldIndex: number;
    newIndex: number;
}

declare type RenderFunc<T> = (item: T, index: number, key: string | number) => React.ReactElement;
interface VirtualProps<T> {
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
    itemClass?: string;
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
interface VirtualComponentRef {
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

declare function VirtualList<T>(props: VirtualProps<T>, ref: React.ForwardedRef<VirtualComponentRef>): React.ReactElement<{
    ref: React.MutableRefObject<HTMLElement | undefined>;
    style: {
        overflow: string;
    };
    className: string;
}, string | React.JSXElementConstructor<any>>;
declare const _default: <T>(props: VirtualProps<T> & {
    ref?: React.ForwardedRef<VirtualComponentRef> | undefined;
}) => ReturnType<typeof VirtualList>;

export { _default as default };
