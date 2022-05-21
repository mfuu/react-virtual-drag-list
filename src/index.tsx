import * as React from 'react'
import Sortable from 'sortable-dnd'
import Virtual from './virtual'
import { useRef, useState, useEffect, useLayoutEffect } from 'react'

import type { RenderFunc, GetKey } from './interface'
import { Item, Slot } from './children'
import utils from './utils'

const CALLBACKS = { top: 'v-top', bottom: 'v-bottom', dragend: 'v-dragend' } // 组件传入的事件回调
const STYLE = { overflow: 'hidden auto', position: 'relative' } // 列表默认样式

export interface VirtualProps<T> {
  dataSource: T[];
  dataKey: string;
  direction?: string; // scroll direction
  keeps?: number; // the number of lines rendered by the virtual scroll
  size?: number; // estimated height of each row

  delay?: number; // Delay time of debounce function
  height?: string; // list wrapper height

  rootStyle?: object;
  rootClass?: string;
  wrapStyle?: object;
  wrapClass?: string;

  disabled?: Boolean; // Disables the sortable if set to true
  draggable?: Function | string; // Specifies which items inside the element should be draggable, the function type must return a boolean
  dragging?: Function; // Specifies the drag element, which must return an HTMLElement, such as (e) => e.target

  ghostStyle?: object; // The style of the mask element when dragging
  ghostClass?: string; // The class of the mask element when dragging
  chosenClass?: string; // The class of the selected element when dragging
  animation?: number; // Animation time
  
  children: RenderFunc<T>;
  header: RenderFunc<T>;
  footer: RenderFunc<T>;

  'v-top'?: Function;
  'v-bottom'?: Function;
  'v-dragend'?: Function;
}

export function VirtualDragList<T>(props: VirtualProps<T>, ref: React.ref) {
  const {
    header,
    footer,
    children,

    dataSource = [],
    dataKey,
    direction = 'vertical',
    keeps = 30,
    size = 50,

    height = '100%',
    delay = 10,

    rootStyle = {},
    rootClass = '',
    wrapStyle = {},
    wrapClass = '',
    
    disabled = false,
    draggable = undefined,
    dragging = undefined,
    ghostClass = '',
    ghostStyle = {},
    chosenClass = '',
    animation = 150
  } = props

  // =============================== State ===============================
  const [cloneList, setCloneList] = useState([])

  const dragList = useRef([])
  const uniqueKeys = useRef([])

  const [range, setRange] = useState({ start: 0, end: keeps }) // 当前可见范围

  const root_ref = useRef<Element>(null)
  const wrap_ref = useRef<Element>(null) // 列表ref
  const last_ref = useRef<Element>(null) // 列表元素外的dom，总是存在于列表最后

  const sortable = useRef()
  const virtual = useRef()

  // =============================== ref methods ===============================
  const scrollToBottom = () => {
    if (last_ref) {
      const offset = last_ref.current.offsetTop
      root_ref.current.scrollTop = offset
    }
    setTimeout(() => {
      // 第一次滚动高度可能会发生改变，如果没到底部再执行一次滚动方法
      const { scrollTop, scrollHeight, clientHeight } = root_ref.current
      if (scrollTop + clientHeight < scrollHeight) scrollToBottom()
    }, 0)
  }
  React.useImperativeHandle(ref, () => ({
    reset() {
      root_ref.current.scrollTop = 0
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
        root_ref.current.scrollTop = offset
      }
    },
    scrollToOffset(offset: number) {
      root_ref.current.scrollTop = offset
    },
    scrollToTop() {
      root_ref.current.scrollTop = 0
    },
    scrollToBottom,
  }))

  // =============================== init ===============================
  useEffect(() => {
    setCloneList(() => [...dataSource])
    dragList.current = [...dataSource]
    setUniqueKeys()

    virtual.current = new Virtual(
      {
        size,
        keeps,
        uniqueKeys: [],
        isHorizontal: direction === 'vertical'
      },
      (range) => {
        setRange(range)
      }
    )
    virtual.current.updateRange()
    virtual.current.updateSizes(this.uniqueKeys)
  }, [dataSource])

  const { scrollSizeKey, scrollDirectionKey, offsetSizeKey, clientSizeKey } = React.useMemo(() => {
    const isHorizontal = direction !== 'vertical'
    return {
      offsetSizeKey: isHorizontal ? 'offsetLeft' : 'offsetTop',
      scrollSizeKey: isHorizontal ? 'scrollWidth' : 'scrollHeight',
      clientSizeKey: isHorizontal ? 'clientWidth' : 'clientHeight',
      scrollDirectionKey: isHorizontal ? 'scrollLeft' : 'scrollTop',
    }
  }, [direction])

  // =============================== methods ===============================
  const setUniqueKeys = () => {
    uniqueKeys.current = dragList.current.map(item => getKey(item))
  }

  // 获取 item 中的 dateKey 值
  const getKey = React.useCallback<GetKey<T>>(
    (item: T) => {
      return (
        dataKey.replace(/\[/g, '.').replace(/\]/g, '').split('.').reduce((o, k) => (o || {})[k], item)
      ) || ''
    },
    [dataKey]
  )

  const getOffset = () => {
    const root = root_ref.current
    return root ? Math.ceil(root[scrollDirectionKey]) : 0
  }

  // =============================== Scroll ===============================
  const handleScroll = (e: any) => {
    const root = root_ref.current
    const offset = getOffset()
    const clientSize = Math.ceil(root[this.clientSizeKey])
    const scrollSize = Math.ceil(root[this.scrollSizeKey])
    // 如果不存在滚动元素 | 滚动高度小于0 | 超出最大滚动距离
    if (offset < 0 || (offset + clientSize > scrollSize + 1) || !scrollSize) return

    // 判断当前应该触发的回调函数，滚动到顶部时触发 `v-top`，滚动到底部时触发 `v-bottom`
    const callback = direction === 'FRONT' ? props[CALLBACKS.top] : props[CALLBACKS.bottom]

    virtual.current.handleScroll(offset)
    
    if (virtual.current.isFront()) {
      if (!!this.list.length && offset <= 0) this.handleToTop(this)
    } else if (virtual.current.isBehind()) {
      if (clientSize + offset >= scrollSize) this.handleToBottom(this)
    }
    // const scrollOvers = getScrollOvers()
    // if (direction === 'FRONT') {
    //   handleScrollFront(scrollOvers)
    //   if (!!cloneList.length && offsetRef.current <= 0) callback && callback()
    // } else if (direction === 'BEHIND') {
    //   handleScrollBehind(scrollOvers)
    //   if (clientHeight + scrollTop >= scrollHeight) callback && callback()
    // }
  }

  

  // ======================= size observe =======================
  const onItemSizeChange = (key: string | number, size: number) => {
    virtual.current.handleItemSizeChange(key, size)
  }

  const onSlotSizeChange = (key: string | number, size: number) => {
    if (key === 'header') virtual.currrent.handleHeaderSizeChange(size)
    if (key === 'footer') virtual.currrent.handleFooterSizeChange(size)
  }

  // =============================== Range ===============================
  // const { start, end, front, behind } = React.useMemo(() => {
  //   const { start, end } = range
  //   let front: number
  //   let behind: number
  //   if (isFixedSize) {
  //     front = calcSizeRef.current.fixed * start
  //     behind = calcSizeRef.current.fixed * (dataKeyLen - end)
  //   } else {
  //     front = getOffsetByIndex(start)
  //     if (lastIndexRef.current === dataKeyLen) {
  //       behind = getOffsetByIndex(dataKeyLen) - getOffsetByIndex(end)
  //     } else {
  //       behind = (dataKeyLen - end) * getItemSize()
  //     }
  //   }
  //   return { front, behind, start, end }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [range, dataKeyLen])


  // =============================== sortable ===============================
  const initDraggable = () => {
    destroyDraggable()
    sortable.current = new Sortable(
      wrap_ref.current,
      {
        disabled,
        animation,
        draggable,
        dragging,
        ghostStyle,
        ghostClass,
        chosenClass,
        dragEnd: (pre: any, cur: any, changed: boolean) => {
          if (!(pre && cur)) return
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
          if (changed) {
            newArr.splice(dragState.oldIndex, 1)
            newArr.splice(dragState.newIndex, 0, dragState.oldItem)
            setCloneList(() => [...newArr])
            dragList.current = [...newArr]
          }
          const callback = props[CALLBACKS.dragend]
          callback && callback(
            newArr,
            { ...pre, item: dragState.oldItem, index: dragState.oldIndex },
            { ...pre, item: dragState.newItem, index: dragState.newIndex },
            changed
          )
        }
      }
    )
  }

  const destroyDraggable = () => {
    sortable.current && sortable.current.destroy()
    sortable.current = null
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
    <div ref={ root_ref } style={{ ...STYLE, height }} onScroll={ utils.debounce(handleScroll, delay) }>

      <Slot children={ header } roleId="header" onSizeChange={ onSlotSizeChange }></Slot>

      <div ref={ wrap_ref } v-role="content" v-start={ start } style={{ padding: `${front}px 0 ${behind}px` }}>
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
      <div ref={ last_ref }></div>
    </div>
  )
}

export default React.forwardRef(VirtualDragList)