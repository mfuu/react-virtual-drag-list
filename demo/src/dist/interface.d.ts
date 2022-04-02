import * as React from 'react';
export declare type RenderFunc<T> = (item: T, index: number, props: {
    style?: React.CSSProperties;
}) => React.ReactNode;
export declare type GetKey<T> = (item: T) => React.Key;
export interface baseProps {
    onSizeChange?: Function;
    children?: React.ReactNode | ((ref: React.RefObject<any>) => React.ReactElement);
}
