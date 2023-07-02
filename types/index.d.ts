import React from 'react';

declare type RenderFunc<T> = (item: T, index: number, props: {
    style?: React.CSSProperties;
}) => React.ReactNode;
interface VirtualProps<T> {
    dataSource: T[];
    dataKey: string;
    direction?: 'vertical' | 'horizontal';
    keeps?: number;
    size?: number;
    pageMode?: boolean;
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

declare function VirtualDragList<T>(props: VirtualProps<T>, ref: React.ref): any;

export default VirtualDragList;
