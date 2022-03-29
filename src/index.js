import React, { forwardRef, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";

import { VirtualSlot, VirtualItem } from './render'

import { getUniqueKey } from './utils'

function Virtual(props, ref) {

  // ======================= props =======================
  const { children, header, footer } = props
  const { dataSource = [], dataKey, keeps = 30, size = 50, height = '100%' } = props
  const { dragStyle = { backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 98%, #FFFFFF 100%)' } } = props

  // ======================= ref =======================
  const virtualVm = useRef()
  const bottomVm = useRef()

  // ======================= state =======================
  const [sizeStack, setSizeStack] = useState(new Map())
  const scrollOffset = useRef(0)
  const lastCalcIndex = useRef(0)
  const calcType = useRef('INIT')

  const calcSize = useRef({
    header: 0,
    footer: 0,
    average: 0,
    total: 0,
    fixed: 0
  })

  const [padding, setPadding] = useState({
    front: 0,
    behind: 0
  })

  const range = useRef({
    start: 0,
    end: 0
  })

  // ======================= usefull methods =======================
  useImperativeHandle(ref, () => ({
    // 通过key值获取当前行的高度
    getSize(key) {
      return sizeStack.get(key)
    },
    // 返回当前滚动高度
    getScrollTop() {
      return scrollOffset.current
    },
    scrollToTop() {
      scrollToTop()
    },
    // 滚动到最底部
    scrollToBottom() {
      scrollToBottom()
    },
    // 滚动到指定高度
    scrollToOffset(offset) {
      scrollToOffset(offset)
    },
    scrollToIndex(index) {
      scrollToIndex(index)
    }
  }))

  // 滚动到顶部
  function scrollToTop() {
    virtualVm.current.scrollTop = 0
  }
  // 滚动到最底部
  function scrollToBottom() {
    if (bottomVm) {
      const offset = bottomVm.current.offsetTop
      scrollToOffset(offset)
    }
    // 第一次滚动高度可能会发生改变，如果没到底部再执行一次滚动方法
    const { scrollTop, scrollHeight, clientHeight } = virtualVm.current
    setTimeout(() => {
      if (scrollTop + clientHeight < scrollHeight) {
        scrollToBottom()
      }
    }, 10)
  }
  // 滚动到指定高度
  function scrollToOffset(offset) {
    virtualVm.current.scrollTop = offset
  }
  // 滚动到指定索引值位置
  function scrollToIndex(index) {
    if (index >= dataSource.length - 1) {
      scrollToBottom()
    } else {
      const offset = getOffsetByIndex(index)
      scrollToOffset(offset)
    }
  }

  // ======================= init =======================
  const uniqueKeys = useMemo(() => {
    return dataSource.map(item => getUniqueKey(item, dataKey))
  }, [dataSource, dataKey])

  useLayoutEffect(() => {
    if (!dataKey) return
    handleDataSourceChange()
    updateSizeStack()
  }, [dataSource, dataKey])

  // dataSource变更后更新range
  function handleDataSourceChange() {
    const start = Math.max(range.current.start, 0)
    updateRange(start, getEndByStart(start))
  }

  // dataSource变更后更新缓存
  function updateSizeStack() {
    sizeStack.forEach((v, key) => {
      if (!uniqueKeys.includes(key)) {
        sizeStack.delete(key)
      }
    })
  }

  // ======================= size observe =======================
  const onItemSizeChange = (size, key) => {
    setSizeStack(sizeStack.set(key, size))
    // 初始为固定高度fixedSizeValue, 如果大小没有变更不做改变，如果size发生变化，认为是动态大小，去计算平均值
    if (calcType.current === 'INIT') {
      calcType.current = 'FIXED'
      calcSize.current = {...calcSize.current, fixed: size}
    } else if (calcType.current === 'FIXED' && calcSize.current.fixed !== size) {
      calcType.current = 'DYNAMIC'
      calcSize.current = {...calcSize.current, fixed: undefined}
    }
    if (calcType.current !== 'FIXED' && calcSize.current.total !== 'undefined') {
      if (sizeStack.size < Math.min(keeps, uniqueKeys.length)) {
        const total = [...sizeStack.values()].reduce((acc, cur) => acc + cur, 0)
        const average = Math.round(total / sizeStack.size)
        calcSize.current = {...calcSize.current, total, average}
      } else {
        calcSize.current = {...calcSize.current, total: undefined}
      }
    }
  }

  const onSlotSizeChange = (size, key) => {
    if (key === 'header') calcSize.current = {...calcSize.current, header: size}
    if (key === 'footer') calcSize.current = {...calcSize.current, footer: size}
  }

  // ======================= scroll =======================
  function handleScroll(e) {
    const scrollTop = Math.ceil(e.target.scrollTop)
    const scrollHeight = Math.ceil(e.target.scrollHeight)
    const clientHeight = Math.ceil(e.target.clientHeight)
    // 如果不存在滚动元素 || 滚动高度小于0 || 超出最大滚动距离
    if (!scrollHeight || scrollTop < 0 || (scrollTop + clientHeight > scrollHeight + 1)) return
    // 记录上一次滚动的距离，判断当前滚动方向
    const direction = scrollTop < scrollOffset.current ? 'FRONT' : 'BEHIND'
    scrollOffset.current = scrollTop
    const overs = getScrollOvers()
    // 滚动到顶部/底部回调
    const cb = direction === 'FRONT' ? props['v-top'] : props['v-bottom']
    if (direction === 'FRONT') {
      handleScrollFront(overs)
      if (!!dataSource.length && scrollTop <= 0) cb && cb()
    } else if (direction === 'BEHIND') {
      handleScrollBehind(overs)
      if (clientHeight + scrollTop >= scrollHeight) cb && cb()
    }
  }

  // 二分法查找
  function getScrollOvers() {
    // 如果有header插槽，需要减去header的高度
    const offset = scrollOffset.current - calcSize.current.header
    if (offset <= 0) return 0
    if (isFixedType()) return Math.floor(offset / calcSize.current.fixed)
    let low = 0
    let middle = 0
    let middleOffset = 0
    let high = uniqueKeys.length
    while (low <= high) {
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

  function handleScrollFront(overs) {
    if (overs > range.current.start) return
    const start = Math.max(overs - Math.round(keeps / 3), 0)
    checkRange(start, getEndByStart(start))
  }

  function handleScrollBehind(overs) {
    if (overs < range.current.start + Math.round(keeps / 3)) return
    
    checkRange(overs, getEndByStart(overs))
  }

  function getEndByStart(start) {
    const len = getKeyLen()
    const end = start + keeps
    return len > 0 ? Math.min(end, len) : end
  }

  // ======================= range handler =======================
  function checkRange(start, end) {
    const total = uniqueKeys.length
    if (total <= keeps) {
      start = 0
      end = getKeyLen()
    } else if (end - start < keeps - 1) {
      start = end - keeps + 1
    }
    if (range.current.start !== start) {
      updateRange(start, end)
    }
  }

  // 更新range
  function updateRange(start, end) {
    range.current = { start, end }
    setPadding({
      front: getScrollFront(),
      behind: getScrollBehind()
    })
  }

  function getScrollFront() {
    if (isFixedType()) {
      return calcSize.current.fixed * range.current.start
    } else {
      return getOffsetByIndex(range.current.start)
    }
  }

  function getScrollBehind() {
    const last = getKeyLen()
    if (isFixedType()) {
      return (last - range.current.end) * calcSize.current.fixed
    }
    if (lastCalcIndex.current === last) {
      return getOffsetByIndex(last) - getOffsetByIndex(range.current.end)
    } else {
      return (last - range.current.end) * getItemSize()
    }
  }

  // 通过索引值获取滚动高度
  function getOffsetByIndex(index) {
    if (!index) return 0
    let offset = 0
    let indexSize = 0
    for (let i = 0; i < index; i++) {
      indexSize = sizeStack.get(uniqueKeys[i])
      offset = offset + (typeof indexSize === 'number' ? indexSize : getItemSize())
    }
    lastCalcIndex.current = Math.max(lastCalcIndex.current, index - 1)
    lastCalcIndex.current = Math.min(lastCalcIndex.current, getKeyLen())
    return offset
  }

  // ======================= common =======================
  function isFixedType() {
    return calcType.current === 'FIXED'
  }

  // 获取每一项的高度
  function getItemSize() {
    return isFixedType() ? calcSize.current.fixed : (calcSize.current.average || size)
  }

  function getItemIndex(dataKey) {
    return uniqueKeys.indexOf(dataKey)
  }

  // 获取唯一值长度
  function getKeyLen() {
    return uniqueKeys.length - 1
  }

  // ======================= item state =======================

  const itemProps = useMemo(() => {
    return {
      dataKey,
      children,
      dataSource,
      dragStyle,
      ...props
    }
  }, [dataSource, dataKey, children])

  const dragState = useRef({
    oldNode: null, // 拖拽起始dom元素
    oldItem: null, // 拖拽起始节点数据
    oldIndex: null, // 拖拽起始节点索引
    newNode: null, // 拖拽结束目标dom元素
    newItem: null, // 拖拽结束节点数据
    newIndex: null // 拖拽结束节点索引
  })

  const setDragState = (state) => {
    dragState.current = {...dragState.current, ...state}
  }

  function handleDragEnd(arr) {
    const cb = props['v-dragend']
    cb && cb(arr)
  }

  // ======================= render =======================
  return (
    <div ref={ virtualVm } style={{ height, overflow: 'hidden auto', position: 'relative' }} onScroll={ handleScroll }>
      <VirtualSlot children={ header } onSizeChange={ onSlotSizeChange } roleId="header" />
      <div v-role="content" style={{ padding: `${padding.front}px 0px ${padding.behind}px` }}>
        { 
          dataSource.slice(range.current.start, range.current.end).map(item => {
            const key = getUniqueKey(item, dataKey)
            const dataProps = {
              uniqueKey: key,
              record: item,
              index: getItemIndex(key)
            }
            return (
              <VirtualItem
                key={ key }
                dragState={ dragState }
                itemProps={ itemProps }
                dataProps={ dataProps }
                setDragState={ setDragState }
                handleDragEnd={ handleDragEnd }
                onSizeChange={ onItemSizeChange }
              />
            )
          })
        }
      </div>
      <VirtualSlot children={ footer } onSizeChange={ onSlotSizeChange } roleId="footer" />
      <div ref={ bottomVm }></div>
    </div>
  )
}

export default forwardRef(Virtual)