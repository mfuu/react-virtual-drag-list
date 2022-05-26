import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { VirtualProps, DragState, Range } from './interface'
import type { GetKey } from './interface'
import { Item, Slot } from './children'
import { debounce } from './utils'
import Virtual from './virtual'
import Sortable from './sortable'

const CALLBACKS = { top: 'v-top', bottom: 'v-bottom', dragend: 'v-dragend' } // 组件传入的事件回调

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
    delay = 0,

    style = {},
    className = '',

    wrapTag = 'div',
    rootTag = 'div',
    itemTag = 'div',
    headerTag = 'div',
    footerTag = 'div',

    itemStyle = {},
    itemClass = '',
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
  const [list, setList] = useState([])
  const cloneList = useRef([])
  const uniqueKeys = useRef([])

  const [range, setRange] = useState<Range>(new Range) // 当前可见范围

  const root_ref = useRef<Element>(null) // 根元素
  const wrap_ref = useRef<Element>(null) // 列表ref
  const last_ref = useRef<Element>(null) // 列表末尾dom，总是存在于列表最后

  const dragState = useRef<DragState>(new DragState)
  const sortable = useRef<Sortable<T>>(null)
  const virtual = useRef<Virtual<T>>(new Virtual(
    {
      size,
      keeps,
      uniqueKeys: uniqueKeys.current,
      isHorizontal: direction === 'vertical'
    },
    (range) => {
      setRange(() => range)
      // check if drag element is in range
      const { index } = dragState.current.from || {}
      if (index > -1 && !(index >= range.start && index <= range.end)) {
        if (sortable.current) sortable.current.set('rangeIsChanged', true)
      }
    }
  ))

  // =============================== ref methods ===============================
  /**
   * reset component
   */
  const reset = () => {
    scrollToTop()
    setList(() => [...dataSource])
    cloneList.current = [...dataSource]
  }
  /**
   * git item size by data-key
   * @param {String | Number} key data-key 
   */
  const getSize = (key) => {
    return virtual.current.sizes.get(key)
  }
  /**
   * Get the current scroll height
   */
  const getOffset = () => {
    const root = root_ref.current
    return root ? Math.ceil(root[scrollDirectionKey]) : 0
  }
  /**
   * Scroll to the specified offset
   * @param {Number} offset 
   */
  const scrollToOffset = (offset) => {
    root_ref.current[scrollDirectionKey] = offset
  }
  /**
   * Scroll to the specified index position
   * @param {Number} index 
   */
  const scrollToIndex = (index) => {
    if (index >= dataSource.length - 1) {
      scrollToBottom()
    } else {
      const indexOffset = virtual.current.getOffsetByIndex(index)
      scrollToOffset(indexOffset)

      setTimeout(() => {
        const offset = getOffset()
        const indexOffset = virtual.current.getOffsetByIndex(index)
        if (offset !== indexOffset) scrollToIndex(index)
      }, 5)
    }
  }
  /**
   * Scroll to top of list
   */
  const scrollToTop = () => {
    root_ref.current[scrollDirectionKey] = 0
  }
  /**
   * Scroll to bottom of list
   */
  const scrollToBottom = () => {
    if (last_ref.current) {
      const offset = last_ref.current[offsetSizeKey]
      root_ref.current[scrollDirectionKey] = offset

      // 第一次滚动高度可能会发生改变，如果没到底部再执行一次滚动方法
      setTimeout(() => {
        const root = root_ref.current
        const offset = getOffset()
        const clientSize = Math.ceil(root[clientSizeKey])
        const scrollSize = Math.ceil(root[scrollSizeKey])
        if (offset + clientSize < scrollSize) scrollToBottom()
      }, 5)
    }
  }

  React.useImperativeHandle(ref, () => ({
    reset,
    getSize,
    getOffset,
    scrollToTop,
    scrollToIndex,
    scrollToOffset,
    scrollToBottom,
  }))

  // =============================== init ===============================
  useEffect(() => {
    setList(() => [...dataSource])
    cloneList.current = [...dataSource]
    setUniqueKeys()

    virtual.current.updateUniqueKeys(uniqueKeys.current)
    virtual.current.updateSizes(uniqueKeys.current)
    virtual.current.updateRange()

    if (sortable.current) sortable.current.set('dataSource', dataSource)
  }, [dataSource])

  useEffect(() => {
    return () => {
      destroyDraggable()
    }
  }, [])

  useLayoutEffect(() => {
    if (draggable) {
      initDraggable()
    } else {
      destroyDraggable()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draggable])

  // =============================== sortable ===============================
  const initDraggable = () => {
    destroyDraggable()
    sortable.current = new Sortable(
      {
        getKey,
        scrollEl: wrap_ref.current,
        dataSource: cloneList.current,
        disabled,
        draggable,
        dragging,
        ghostStyle,
        ghostClass,
        chosenClass,
        animation,
      },
      (state) => {
        dragState.current.from = state
      },
      (list: T[], from: object, to: object, changed: boolean) => {
        dragState.current.to = to

        const callback = props[CALLBACKS.dragend]
        callback && callback(list, from, to, changed)

        cloneList.current = [...list]
        setList(() => [...list])
        setUniqueKeys()

        setTimeout(() => dragState.current = new DragState, delay + 10)
      }
    )
  }

  const destroyDraggable = () => {
    sortable.current && sortable.current.destroy()
    sortable.current = null
  }

  // =============================== methods ===============================
  const setUniqueKeys = () => {
    uniqueKeys.current = cloneList.current.map(item => getKey(item))
  }

  const getItemIndex = (item) => {
    return cloneList.current.findIndex(el => getKey(el) === getKey(item))
  }

  // 获取 item 中的 dateKey 值
  const getKey = React.useCallback<GetKey<T>>(
    (item: T) => {
      return (
        dataKey.replace(/\[/g, '.').replace(/\]/g, '').split('.').reduce((o, k) => (o || {})[k], item)
      )
    },
    [dataKey]
  )

  const { scrollSizeKey, scrollDirectionKey, offsetSizeKey, clientSizeKey } = React.useMemo(() => {
    const isHorizontal = direction !== 'vertical'
    return {
      offsetSizeKey: isHorizontal ? 'offsetLeft' : 'offsetTop',
      scrollSizeKey: isHorizontal ? 'scrollWidth' : 'scrollHeight',
      clientSizeKey: isHorizontal ? 'clientWidth' : 'clientHeight',
      scrollDirectionKey: isHorizontal ? 'scrollLeft' : 'scrollTop',
    }
  }, [direction])

  // =============================== Scroll ===============================
  const handleScroll = (e: Event) => {
    // mouseup 事件时会触发scroll事件，这里处理为了防止range改变导致页面滚动
    if (dragState.current.to && dragState.current.to.key) return

    const root = root_ref.current
    const offset = getOffset()
    const clientSize = Math.ceil(root[clientSizeKey])
    const scrollSize = Math.ceil(root[scrollSizeKey])
    // 如果不存在滚动元素 | 滚动高度小于0 | 超出最大滚动距离
    if (offset < 0 || (offset + clientSize > scrollSize + 1) || !scrollSize) return

    virtual.current.handleScroll(offset)
    // 判断当前应该触发的回调函数，滚动到顶部时触发 `v-top`，滚动到底部时触发 `v-bottom`
    if (virtual.current.isFront()) {
      if (!!dataSource.length && offset <= 0) handleToTop(props)
    } else if (virtual.current.isBehind()) {
      if (clientSize + offset >= scrollSize) handleToBottom(props)
    }
  }

  const handleToTop = debounce(function (props: VirtualProps<T>) {
    const callback = props[CALLBACKS.top]
    callback && callback()
  })

  const handleToBottom = debounce(function (props: VirtualProps<T>) {
    const callback = props[CALLBACKS.bottom]
    callback && callback()
  })

  // ======================= size observe =======================
  const onItemSizeChange = (key: string | number, size: number) => {
    virtual.current.handleItemSizeChange(key, size)
  }

  const onSlotSizeChange = (key: string | number, size: number) => {
    if (key === 'header') virtual.current.handleHeaderSizeChange(size)
    if (key === 'footer') virtual.current.handleFooterSizeChange(size)
  }

  // ================================ Render ================================
  // check item show or not
  const getItemStyle = React.useCallback((itemKey) => {
    const change = sortable.current && sortable.current.rangeIsChanged
    const { key } = dragState.current.from || {}
    if (change && itemKey == key) return { display: 'none' }
    return {}
  }, [dragState.current])

  // html tag name
  const { RTag, WTag } = React.useMemo(() => {
    return {
      RTag: rootTag,
      WTag: wrapTag
    }
  }, [wrapTag, rootTag])

  // root style
  const RStyle = React.useMemo(() => {
    return { ...style, overflow: direction !== 'vertical' ? 'auto hidden' : 'hidden auto' }
  }, [style, direction, ])

  // wrap style
  const WStyle = React.useMemo(() => {
    const { front, behind } = range
    return {
      ...wrapStyle,
      padding: direction !== 'vertical'
        ? `0px ${behind}px 0px ${front}px`
        : `${front}px 0px ${behind}px`
    }
  }, [wrapStyle, direction, range])

  // range
  const { start, end } = React.useMemo(() => {
    return { ...range }
  }, [range])

  return (
    <RTag ref={ root_ref } className={ className } style={ RStyle } onScroll={ debounce(handleScroll, delay) }>

      <Slot children={ header } roleId="header" Tag={ headerTag } onSizeChange={ onSlotSizeChange }></Slot>

      <WTag ref={ wrap_ref } v-role="group" className={ wrapClass } style={ WStyle }>
        {
          list.slice(start, end + 1).map(item => {
            const key = getKey(item)
            const index = getItemIndex(item)
            return (
              <Item
                key={ key }
                Tag={ itemTag }
                record={ item }
                index={ index }
                dataKey={ key }
                children={ children }
                Class={ itemClass }
                Style={{ ...itemStyle, ...getItemStyle(key) }}
                onSizeChange={ onItemSizeChange }
              />
            )
          })
        }
      </WTag>

      <Slot children={ footer } roleId="footer" Tag={ footerTag } onSizeChange={ onSlotSizeChange }></Slot>
      <div ref={ last_ref } style={{ width: direction !== 'vertical' ? '0px' : '100%', height: direction !== 'vertical' ? '100%' : '0px' }}></div>
    </RTag>
  )
}

export default React.forwardRef(VirtualDragList)