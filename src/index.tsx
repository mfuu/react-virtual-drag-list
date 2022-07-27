import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { VirtualProps, DragState, Range } from './interface'
import type { GetKey } from './interface'
import { Item, Slot } from './children'
import { debounce, throttle } from './utils'
import Sortable from './sortable'
import Virtual from './virtual'

const CALLBACKS = { top: 'v-top', bottom: 'v-bottom', dragstart: 'v-dragstart', dragend: 'v-dragend' } // component incoming event callback

export function VirtualDragList<T>(props: VirtualProps<T>, ref: React.ref) {
  const {
    header,
    footer,
    children,

    dataSource = [],
    dataKey,
    direction = 'vertical',
    keeps = 30,
    size = null,
    delay = 10,
    keepOffset = false,
    autoScroll = true,
    scrollStep = 5,
    scrollThreshold = 15,

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
    ghostClass = '',
    ghostStyle = {},
    chosenClass = '',
    animation = 150
  } = props

  // =============================== State ===============================
  const [list, setList] = useState([])
  const cloneList = useRef([])
  const uniqueKeys = useRef([])

  const [range, setRange] = useState<Range>(new Range({ end: keeps - 1 })) // currently visible range

  const root_ref = useRef<Element>(null) // root element
  const wrap_ref = useRef<Element>(null) // list element
  const last_ref = useRef<Element>(null) // dom at the end of the list

  const lastItem = useRef(null) // record the first element of the current list
  const dragState = useRef<DragState>(new DragState)
  const sortable = useRef<Sortable<T>>(null)
  const virtual = useRef<Virtual<T>>(new Virtual(
    {
      size,
      keeps,
      uniqueKeys: uniqueKeys.current,
      isHorizontal: direction === 'vertical'
    },
    (range: any) => {
      if (dragState.current.to.key === undefined) setRange(() => range)
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
  const getSize = (key: number | string) => {
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
  const scrollToOffset = (offset: number) => {
    root_ref.current[scrollDirectionKey] = offset
  }
  /**
   * Scroll to the specified index position
   * @param {Number} index 
   */
  const scrollToIndex = (index: number) => {
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
    cloneList.current = [...dataSource]
    setList(() => [...dataSource])
    setUniqueKeys()
    // update virtual state
    virtual.current.updateUniqueKeys(uniqueKeys.current)
    virtual.current.updateSizes(uniqueKeys.current)
    setTimeout(() => virtual.current.updateRange(), 0)
    // update sortable state
    if (sortable.current) {
      sortable.current.set('dataSource', dataSource)
    } else {
      initSortable()
    }

    // if auto scroll to the last offset
    if (lastItem.current && keepOffset) {
      const index = getItemIndex(lastItem.current)
      scrollToIndex(index)
      lastItem.current = null
    }
  }, [dataSource])

  useEffect(() => {
    if (sortable.current) sortable.current.setOption('disabled', disabled)
  }, [disabled])

  useEffect(() => {
    // destroy
    return () => {
      destroySortable()
    }
  }, [])

  // =============================== sortable ===============================
  const initSortable = () => {
    sortable.current = new Sortable(
      {
        getKey,
        scrollEl: wrap_ref.current,
        dataSource: cloneList.current,
        disabled,
        draggable,
        ghostStyle,
        ghostClass,
        chosenClass,
        animation,
        autoScroll,
        scrollStep,
        scrollThreshold
      },
      (state: DragState, node: HTMLElement) => {
        dragState.current.from = state
        // on-drag-start callback
        const callback = props[CALLBACKS.dragstart]
        callback && callback(list, state, node)
      },
      (list: T[], from: object, to: object, changed: boolean) => {
        dragState.current.to = to

        // on-drag-end callback
        const callback = props[CALLBACKS.dragend]
        callback && callback(list, from, to, changed)

        if (changed) {
          // recalculate the range once when scrolling down
          if (sortable.current.rangeIsChanged && virtual.current.direction) {
            const prelist = cloneList.current
            setRange((pre: Range) => {
              if (pre.start > 0) {
                const index = list.indexOf(prelist[pre.start])
                if (index > -1) return { ...pre, start: index, end: index + keeps - 1 }
                else return { ...pre }
              } else return { ...pre }
            })
          }
          // list change
          cloneList.current = [...list]
          setList(() => [...list])
          setUniqueKeys()
        }
        clearDragState()
      }
    )
  }

  const destroySortable = () => {
    sortable.current && sortable.current.destroy()
    sortable.current = null
  }

  // =============================== methods ===============================
  const setUniqueKeys = () => {
    uniqueKeys.current = cloneList.current.map(item => getKey(item))
  }

  const getItemIndex = (item: object) => {
    return cloneList.current.findIndex((el: object) => getKey(el) === getKey(item))
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

  const clearDragState = throttle(() => {
    dragState.current = new DragState
  }, delay + 17)

  // =============================== scroll keys ===============================
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
    // The scroll event is triggered when the mouseup event occurs, which is handled here to prevent the page from scrolling due to range changes.
    if (dragState.current.to.key !== undefined) {
      clearDragState()
      return
    }

    const root = root_ref.current
    const offset = getOffset()
    const clientSize = Math.ceil(root[clientSizeKey])
    const scrollSize = Math.ceil(root[scrollSizeKey])

    if (offset < 0 || (offset + clientSize > scrollSize + 1) || !scrollSize) return

    virtual.current.handleScroll(offset)

    if (virtual.current.isFront()) {
      if (!!dataSource.length && offset <= 0) handleToTop()
    } else if (virtual.current.isBehind()) {
      if (clientSize + offset >= scrollSize) handleToBottom()
    }
  }

  const handleToTop = debounce(() => {
    lastItem.current = cloneList.current[0]
    // scroll-to-top callback
    const callback = props[CALLBACKS.top]
    callback && callback()
  })

  const handleToBottom = debounce(() => {
    // scroll-to-bottom callback
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