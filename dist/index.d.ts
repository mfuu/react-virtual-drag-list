import * as React from 'react';
import type { RenderFunc } from './interface';
export interface virtualProps<T> {
    dataSource: T[];
    dataKey: string;
    keeps?: number;
    size?: number;
    height?: string;
    draggable?: boolean;
    dragStyle?: object;
    children: RenderFunc<T>;
    header: RenderFunc<T>;
    footer: RenderFunc<T>;
    'v-top'?: Function;
    'v-bottom'?: Function;
    'v-dragend'?: Function;
    delay?: number;
    dragElement?: Function;
}
export declare function Virtual<T>(props: virtualProps<T>, ref: React.ref): any;
declare const _default: any;
export default _default;
