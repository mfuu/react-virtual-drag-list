import { baseProps } from './interface';
export interface itemProps<T> extends baseProps {
    key: any;
    record: T;
    index: number;
    uniqueKey: string | number;
    itemClass?: string;
    itemStyle?: object;
}
export declare function Item<T>(props: itemProps<T>): any;
export interface slotProps<T> extends baseProps {
    roleId: string;
}
export declare function Slot<T>(props: slotProps<T>): any;
