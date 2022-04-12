import * as React from 'react'

export interface observerProps {
  uniqueKey: string | number;

  onSizeChange?: Function;

  children?: React.ReactNode | ((ref: React.RefObject<any>) => React.ReactElement);
}

export function Observer(props: observerProps) {

  const { uniqueKey, children, onSizeChange } = props

  const elementRef = React.useRef<Element>(null);

  const isRenderProps = typeof children === 'function';
  const mergedChildren = isRenderProps ? children(elementRef) : children;
  
  React.useLayoutEffect(() => {
    let observer: ResizeObserver
    if (typeof ResizeObserver !== undefined) {
      observer = new ResizeObserver(() => {
        const size = elementRef.current.clientHeight
        onSizeChange && onSizeChange(size, uniqueKey)
      })
      elementRef.current && observer.observe(elementRef.current)
    }
    return () => {
      if (observer) {
        observer.disconnect()
        observer = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef])

  return React.cloneElement(mergedChildren as any, {
    ref: elementRef,
  })
}

export function UseRefCallback<T>(fn: Function, dependencies: Array<T>) {
  const ref = React.useRef(fn)

  // 每次调用的时候，fn 都是一个全新的函数，函数中的变量有自己的作用域
  // 当依赖改变的时候，传入的 fn 中的依赖值也会更新，这时更新 ref 的指向为新传入的 fn
  React.useEffect(() => {
    ref.current = fn
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...dependencies])

  return React.useCallback(() => {
    const fn = ref.current
    return fn()
  }, [ref])
}

export function UseMethods<T extends Record<string, (...args: any[]) => any>>(methods: T) {
  const { current } = React.useRef({
    methods,
    func: undefined as T | undefined,
  })
  current.methods = methods

  if (!current.func) {
    const func = Object.create(null);
    Object.keys(methods).forEach((key) => {
      func[key] = (...args: unknown[]) => current.methods[key].call(current.methods, ...args)
    })
    current.func = func
  }

  return current.func as T
}