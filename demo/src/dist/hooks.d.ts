import * as React from 'react';
export interface observerProps {
    uniqueKey: string | number;
    onSizeChange?: Function;
    children?: React.ReactNode | ((ref: React.RefObject<any>) => React.ReactElement);
}
export declare function Observer(props: observerProps): any;
export declare function useRefCallback<T>(fn: Function, dependencies: Array<T>): any;
export declare function useMethods<T extends Record<string, (...args: any[]) => any>>(methods: T): T;
