declare const _default: {
    /**
     * 防抖函数
     * @param func callback
     * @param delay 延迟
     * @param immediate 是否立即执行
     * @returns
     */
    debounce(func: Function, delay?: number, immediate?: boolean): (...args: any) => Function;
};
export default _default;
