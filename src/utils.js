// 设置动画
export function animate(rect, target) {
  const delay = 300
  if (delay) {
    var cRect = target.getBoundingClientRect()
    if (rect.nodeType === 1) rect = rect.getBoundingClientRect()
    setStyle(target, 'transition', 'none')
    setStyle(target, 'transform', `translate3d(${rect.left - cRect.left}px, ${rect.top - cRect.top}px, 0)`)
    target.offsetWidth // 触发重绘
    setStyle(target, 'transition', `all ${delay}ms`)
    setStyle(target, 'transform', 'translate3d(0, 0, 0)')
    clearTimeout(target.animated)
    target.animated = setTimeout(() => {
      setStyle(target, 'transition', '')
      setStyle(target, 'transform', '')
      target.animated = false
    }, delay)
  }
}

// 为dom添加样式
export function setStyle (el, prop, val) {
  const style = el && el.style
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, '')
      } else if (el.currentStyle) {
        val = el.currentStyle
      }
      return prop === void 0 ? val : val[prop]
    } else {
      if (!(prop in style)) prop = '-webkit-' + prop
      style[prop] = val + (typeof val === 'string' ? '' : 'px')
    }
  }
}
