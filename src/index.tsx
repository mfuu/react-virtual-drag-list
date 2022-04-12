import * as React from 'react'
import Draggable from 'js-draggable-list'
import { useRef, useState, useEffect, useLayoutEffect } from 'react'

import type { RenderFunc, GetKey } from './interface'
import { Item, Slot } from './children'
import utils from './utils'

const CALLBACKS = { top: 'v-top', bottom: 'v-bottom', dragend: 'v-dragend' } // 组件传入的事件回调
const STYLE = { overflow: 'hidden auto', position: 'relative' } // 列表默认样式
const MASKIMAGE = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 98%, #FFFFFF 100%)' // 拖拽时默认背景样式

export interface virtualProps<T> {
  dataSource: T[];
  dataKey: string;
  // the number of lines rendered by the virtual scroll
  keeps?: number;
  // estimated height of each row
  size?: number;
  height?: string;

  // whether to support drag and drop. You need to specify a draggable element and set the draggable attribute for it
  draggable?: boolean;
  // Whether to drag and drop only elements with the draggable attribute set. When true, selecting the parent element will not produce a dragging effect
  draggableOnly?: boolean;
  // mask style while dragging
  dragStyle?: object;
  
  children: RenderFunc<T>;
  header: RenderFunc<T>;
  footer: RenderFunc<T>;

  'v-top'?: Function;
  'v-bottom'?: Function;
  'v-dragend'?: Function;

  delay?: number;
  dragElement?: Function
}

export function Virtual<T>(props: virtualProps<T>, ref: React.ref) {
  const {
    header,
    footer,
    children,
    dataSource = [],
    dataKey,
    keeps = 30,
    size = 50,
    height = '100%',
    delay = 10,
    draggable = true,
    draggableOnly = true,
    dragStyle = { backgroundImage: MASKIMAGE }
  } = props

  // =============================== State ===============================
  const [cloneList, setCloneList] = useState([])
  const [sizeStack, setSizeStack] = useState(new Map())

  const dragList = useRef([])

  const [range, setRange] = useState({ start: 0, end: keeps }) // 当前可见范围

  const dragRef = useRef(null)
  
  const offsetRef = useRef(0) // 记录当前滚动高度

  const virtualRef = useRef<Element>(null)
  const groupRef = useRef<Element>(null) // 列表ref
  const bottomRef = useRef<Element>(null) // 列表元素外的dom，总是存在于列表最后

  // 记录顶部 | 底部高度，以及列表中每一行的高度，和列表的总高度
  const calcSizeRef = useRef<Object>({ header: 0, footer: 0, total: 0, average: 0, fixed: 0 })

  const calcTypeRef = useRef<String>('INIT') // 判断列表每一行高度是否固定
  const lastIndexRef = useRef<Number>(0) // 记录上一次计算的 index 值

  const isFixedSize: boolean = React.useMemo(() => {
    return calcTypeRef.current === 'FIXED'
  }, [calcTypeRef])

  useEffect(() => {
    setCloneList(() => [...dataSource])
    dragList.current = [...dataSource]
  }, [dataSource])

  // =============================== ref methods ===============================
  const scrollToBottom = () => {
    if (bottomRef) {
      const offset = bottomRef.current.offsetTop
      virtualRef.current.scrollTop = offset
    }
    setTimeout(() => {
      // 第一次滚动高度可能会发生改变，如果没到底部再执行一次滚动方法
      const { scrollTop, scrollHeight, clientHeight } = virtualRef.current
      if (scrollTop + clientHeight < scrollHeight) scrollToBottom()
    }, 0)
  }
  React.useImperativeHandle(ref, () => ({
    reset() {
      virtualRef.current.scrollTop = 0
      setCloneList(() => [...dataSource])
    },
    getSize(key: string | number) {
      return sizeStack.get(key)
    },
    getScrollTop(): number {
      return offsetRef.current
    },
    scrollToIndex(index: number) {
      if (index >= cloneList.length - 1) {
        scrollToBottom()
      } else {
        const offset = getOffsetByIndex(index)
        virtualRef.current.scrollTop = offset
      }
    },
    scrollToOffset(offset: number) {
      virtualRef.current.scrollTop = offset
    },
    scrollToTop() {
      virtualRef.current.scrollTop = 0
    },
    scrollToBottom,
  }))

  // =============================== Item Key ===============================
  // 获取 item 中的 dateKey 值
  const getKey = React.useCallback<GetKey<T>>(
    (item: T) => {
      return (
        dataKey.replace(/\[/g, '.').replace(/\]/g, '').split('.').reduce((o, k) => (o || {})[k], item)
      ) || ''
    },
    [dataKey]
  )

  // 源数据中所有的 dataKey 值
  const dataKeys: Array<T> = React.useMemo(() => {
    return cloneList.map(item => getKey(item))
  }, [cloneList, getKey])

  const dataKeyLen: number = React.useMemo(() => {
    return dataKeys.length - 1
  }, [dataKeys])

  // =============================== Scroll ===============================
  const handleScroll = (e: any) => {
    const scrollTop = Math.ceil(e.target.scrollTop)
    const scrollHeight = Math.ceil(e.target.scrollHeight)
    const clientHeight = Math.ceil(e.target.clientHeight)
    // 如果不存在滚动元素 | 滚动高度小于0 | 超出最大滚动距离
    if (!scrollHeight || scrollTop < 0 || (scrollTop + clientHeight > scrollHeight + 1)) return
    // 通过上一次滚动的距离，判断当前滚动方向
    const direction = scrollTop < offsetRef.current ? 'FRONT' : 'BEHIND'
    // 记录当前滚动高度
    offsetRef.current = scrollTop
    // 判断当前应该触发的回调函数，滚动到顶部时触发 `v-top`，滚动到底部时触发 `v-bottom`
    const callback = direction === 'FRONT' ? props[CALLBACKS.top] : props[CALLBACKS.bottom]
    const scrollOvers = getScrollOvers()
    if (direction === 'FRONT') {
      handleScrollFront(scrollOvers)
      if (!!cloneList.length && offsetRef.current <= 0) callback && callback()
    } else if (direction === 'BEHIND') {
      handleScrollBehind(scrollOvers)
      if (clientHeight + scrollTop >= scrollHeight) callback && callback()
    }
  }

  const handleScrollFront = (overs: number) => {
    if (overs > range.start) return
    const start = Math.max(overs - Math.round(keeps / 3), 0)
    handleCheck(start, getEndByStart(start))
  }

  const handleScrollBehind = (overs: number) => {
    if (overs < range.start + Math.round(keeps / 3)) return
    handleCheck(overs, getEndByStart(overs))
  }

  const handleCheck = (start: number, end: number) => {
    const total = dataKeys.length
    if (total <= keeps) {
      start = 0
      end = dataKeyLen
    } else if (end - start < keeps - 1) {
      start = end - keeps + 1
    }
    if (range.start !== start) setRange(() => { return { start, end } }) 
  }

  // =============================== methods ===============================
  // 获取当前滚动高度经过了多少个列表项
  const getScrollOvers = () => {
    // 如果有 header 插槽，需要减去 header 的高度
    const { header, fixed } = calcSizeRef.current
    const offset = offsetRef.current - header
    if (offset <= 0) return 0
    if (isFixedSize) return Math.floor(offset / fixed)

    let low: number = 0
    let high: number = dataKeys.length
    let middle: number = 0
    let middleOffset: number = 0
    while(low <= high) {
      middle = low + Math.floor((high - low) / 2)
      middleOffset = getOffsetByIndex(middle)
      if (middleOffset === offset) {
        return middle
      } else if (middleOffset < offset) {
        low = middle + 1
      } else if (middleOffset > offset) {
        high = middle - 1
      } else {
        break
      }
    }
    return low > 0 ? --low : 0
  }

  const getOffsetByIndex = (index: number) => {
    if (!index) return 0
    let offset: number = 0
    let indexSize: number = 0
    for(let i = 0; i < index; i++) {
      indexSize = sizeStack.get(dataKeys[i])
      offset += typeof indexSize === 'number' ? indexSize : getItemSize()
    }
    lastIndexRef.current = Math.max(lastIndexRef.current, index - 1)
    lastIndexRef.current = Math.min(lastIndexRef.current, dataKeyLen)
    return offset
  }

  const getEndByStart = (start: number) => {
    const end = start + keeps
    return dataKeyLen > 0 ? Math.min(end, dataKeyLen) : end
  }

  const getItemSize = (): number => {
    const { fixed, average } = calcSizeRef.current
    return isFixedSize ? fixed : (average || size)
  }

  // ======================= size observe =======================
  const onItemSizeChange = (size: number, key: string | number) => {
    setSizeStack(sizeStack.set(key, size))
    // 初始为固定高度fixedSizeValue, 如果大小没有变更不做改变，如果size发生变化，认为是动态大小，去计算平均值
    if (calcTypeRef.current === 'INIT') {
      calcTypeRef.current = 'FIXED'
      calcSizeRef.current = {...calcSizeRef.current, fixed: size}
    } else if (calcTypeRef.current === 'FIXED' && calcSizeRef.current.fixed !== size) {
      calcTypeRef.current = 'DYNAMIC'
      calcSizeRef.current = {...calcSizeRef.current, fixed: undefined}
    }
    if (calcTypeRef.current !== 'FIXED' && calcSizeRef.current.total !== 'undefined') {
      if (sizeStack.size < Math.min(keeps, dataKeys.length)) {
        const total = [...sizeStack.values()].reduce((acc, cur) => acc + cur, 0)
        const average = Math.round(total / sizeStack.size)
        calcSizeRef.current = {...calcSizeRef.current, total, average}
      } else {
        calcSizeRef.current = {...calcSizeRef.current, total: undefined}
      }
    }
  }

  const onSlotSizeChange = (size: number, key: string) => {
    calcSizeRef.current[key] = size
  }

  // =============================== Range ===============================
  const { start, end, front, behind } = React.useMemo(() => {
    const { start, end } = range
    let front: number
    let behind: number
    if (isFixedSize) {
      front = calcSizeRef.current.fixed * start
      behind = calcSizeRef.current.fixed * (dataKeyLen - end)
    } else {
      front = getOffsetByIndex(start)
      if (lastIndexRef.current === dataKeyLen) {
        behind = getOffsetByIndex(dataKeyLen) - getOffsetByIndex(end)
      } else {
        behind = (dataKeyLen - end) * getItemSize()
      }
    }
    return { front, behind, start, end }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, dataKeyLen])

  // =============================== init ===============================

  useEffect(() => {
    const start = Math.max(range.start, 0)
    handleCheck(start, getEndByStart(start))

    sizeStack.forEach((v: any, key: any) => {
      if (!dataKeys.includes(key)) {
        sizeStack.delete(key)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource])

  // =============================== drag ===============================
  const initDraggable = () => {
    destroyDraggable()
    dragRef.current = new Draggable({
      groupElement: groupRef.current,
      scrollElement: virtualRef.current,
      cloneElementStyle: dragStyle,
      dragElement: (e: any) => {
        const draggable = e.target.getAttribute('draggable')
        if (draggableOnly && !draggable) return null
        if (props.dragElement) {
          return props.dragElement(e, groupRef.current)
        } else {
          let result = e.target
          while([].indexOf.call(groupRef.current.children, result) < 0) {
            result = result.parentNode
          }
          return result
        }
      },
      dragEnd: (pre: any, cur: any) => {
        if (!(pre && cur)) return
        if (pre.rect.top === cur.rect.top) return
        const dragState = {
          oldNode: pre.node, oldItem: null, oldIndex: null,
          newNode: cur.node, newItem: null, newIndex: null
        }
        const oldKey = pre.node.getAttribute('data-key')
        const newKey = cur.node.getAttribute('data-key')
        dragList.current.forEach((el: any, index: number) => {
          if (getKey(el) === oldKey) {
            dragState.oldItem = el
            dragState.oldIndex = index
          }
          if (getKey(el) === newKey) {
            dragState.newItem = el
            dragState.newIndex = index
          }
        })
        const newArr = [...dragList.current]
        newArr.splice(dragState.oldIndex, 1)
        newArr.splice(dragState.newIndex, 0, dragState.oldItem)
        setCloneList(() => [...newArr])
        dragList.current = [...newArr]
    
        const callback = props[CALLBACKS.dragend]
        callback && callback(newArr)
      }
    })
  }

  const destroyDraggable = () => {
    dragRef.current && dragRef.current.destroy()
    dragRef.current = null
  }

  useLayoutEffect(() => {
    if (draggable) {
      initDraggable()
    } else {
      destroyDraggable()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloneList, draggable])

  useEffect(() => {
    return () => {
      destroyDraggable()
    }
  }, [])

  // ================================ Render ================================

  return (
    <div ref={ virtualRef } style={{ ...STYLE, height }} onScroll={ utils.debounce(handleScroll, delay) }>

      <Slot children={ header } roleId="header" onSizeChange={ onSlotSizeChange }></Slot>

      <div ref={ groupRef } v-role="content" v-start={ start } style={{ padding: `${front}px 0 ${behind}px` }}>
        {
          cloneList.slice(start, end + 1).map(item => {
            const key = getKey(item)
            const index = dataKeys.indexOf(key)
            return (
              <Item
                key={ key }
                uniqueKey={ key }
                children={ children }
                record={ item }
                index={ index }
                onSizeChange={ onItemSizeChange }
              />
            )
          })
        }
      </div>

      <Slot children={ footer } roleId="footer" onSizeChange={ onSlotSizeChange }></Slot>
      <div ref={ bottomRef }></div>
    </div>
  )
}

export default React.forwardRef(Virtual)