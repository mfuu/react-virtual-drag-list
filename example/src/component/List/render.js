import React, { useLayoutEffect, useRef } from "react";
import { animate, setStyle, getUniqueKey } from './utils'

export function VirtualSlot(props) {
  const { children, roleId, onSizeChange } = props

  const vm = useRef()

  // ======================= observer =======================
  useLayoutEffect(() => {
    let observer
    if (typeof ResizeObserver !== undefined) {
      observer = new ResizeObserver(() => {
        const size = vm.current.clientHeight
        onSizeChange(size, roleId)
      })
      vm.current && observer.observe(vm.current)
    }
    return () => {
      if (observer) {
        observer.disconnect()
        observer = null
      }
    }
  }, [])

  return children ? <div ref={ vm } v-role={ roleId }>{ children }</div> : <></>
}


export function VirtualItem(props) {

  const { onSizeChange, setDragState, handleDragEnd, dragState } = props
  const { index, record, uniqueKey } = props.dataProps
  const { children, dataKey, dataSource, dragStyle } = props.itemProps

  const vm = useRef()

  const mask = useRef()

  // ======================= observer =======================
  useLayoutEffect(() => {
    let observer
    if (typeof ResizeObserver !== undefined) {
      observer = new ResizeObserver(() => {
        const size = vm.current.clientHeight
        onSizeChange(size, uniqueKey)
      })
      vm.current && observer.observe(vm.current)
    }
    return () => {
      if (observer) {
        observer.disconnect()
        observer = null
      }
    }
  }, [])

  // ======================= drag =======================
  function handleOnMouseDown(e, vm) {
    // 仅设置了draggable=true的元素才可拖动
    const draggable = e.target.getAttribute('draggable')
    if (!draggable) return
    // 记录初始拖拽元素
    const { target, item } = getTarget(e, vm, dataSource, dataKey)
    setDragState({ oldNode: target, oldItem: item })
    setMask('init', e.clientX, e.clientY)
    document.onmousemove = (evt) => {
      evt.preventDefault()
      setMask('move', evt.clientX, evt.clientY)
      const { target = null, item = null } = getTarget(evt)
      // 如果没找到目标节点，取消拖拽事件
      if (!target || !item) {
        document.body.style.cursor = 'not-allowed'
        return
      }
      document.body.style.cursor = 'grabbing'
      // 记录拖拽目标元素
      setDragState({ newNode: target, newItem: item })
      const { oldNode, newNode, oldItem, newItem } = dragState.current
      // 拖拽前后不一致，改变拖拽节点位置
      if (oldItem != newItem) {
        if (newNode && newNode.animated) return
        const oldIndex = dataSource.indexOf(oldItem)
        const newIndex = dataSource.indexOf(newItem)
        const oldRect = oldNode.getBoundingClientRect()
        const newRect = newNode.getBoundingClientRect()
        setDragState({ oldIndex, newIndex })
        if (oldIndex < newIndex) {
          newNode.parentNode.insertBefore(oldNode, newNode.nextSibling)
        } else {
          newNode.parentNode.insertBefore(oldNode, newNode)
        }
        animate(oldRect, oldNode)
        animate(newRect, newNode)
      }
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      setMask('destory')
      // 当前拖拽位置不在允许的范围内时不需要对数组重新赋值
      if (document.body.style.cursor != 'not-allowed') {
        const { oldItem, oldIndex, newIndex } = dragState.current
        // 拖拽前后不一致，数组重新赋值
        if (oldIndex != newIndex) {
          const newArr = [...dataSource]
          newArr.splice(oldIndex, 1)
          newArr.splice(newIndex, 0, oldItem)
          handleDragEnd(newArr)
        }
      }
      document.body.style.cursor = ''
    }
  }

  function setMask (type, left, top) {
    if (type == 'init') {
      mask.current = document.createElement('div')
      for (const key in dragStyle) {
        setStyle(mask.current, key, dragStyle[key])
      }
      mask.current.style.position = 'fixed'
      mask.current.style.left = left + 'px'
      mask.current.style.top = top + 'px'
      mask.current.innerHTML = vm.current.innerHTML
      document.body.appendChild(mask.current)
    } else if (type == 'move') {
      mask.current.style.left = left + 'px'
      mask.current.style.top = top + 'px'
    } else {
      document.body.removeChild(mask.current)
    }
  }

  function getTarget(e, vm) {
    let value, target
    if (vm) {
      target = vm
      value = target.getAttribute('data-key')
    } else {
      // 如果当前拖拽超出了item范围，则不允许拖拽，否则查找dataKey属性
      target = e.target
      value = target.getAttribute('data-key')
      if (!value) {
        const path = e.path || []
        for(let i = 0; i < path.length; i++) {
          target = path[i]
          value = target.getAttribute('data-key')
          if (value || target == document.documentElement) break
        }
      }
    }
    const item = value ? dataSource.find(item => getUniqueKey(item, dataKey) == value) : null
    return { target, item }
  }

  // ======================= render =======================
  return (
    <div ref={ vm } data-key={ uniqueKey } onMouseDown={ (e) => handleOnMouseDown(e, vm.current) }>
      { typeof children === 'function' ? children(record, index, uniqueKey) : children }
    </div>
  )
}
