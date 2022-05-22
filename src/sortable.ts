import SortableDnd from 'sortable-dnd'

class DragState {
  from: {
    key: string, // 拖拽起始节点唯一值
    item: any, // 拖拽起始节点数据
    index: number, // 拖拽起始节点索引
  }
  to: {
    key: string, // 拖拽结束节点唯一值
    item: any, // 拖拽结束节点数据
    index: number // 拖拽结束节点索引
  }
}

interface SortableOptions<T> {
  getKey: Function;
  scrollEl: HTMLElement;
  dataSource: T[];
  disabled: boolean;
  draggable: string | Function;
  dragging: Function;
  ghostStyle: object;
  ghostClass: string;
  chosenClass: string;
  animation: number;
}

class Sortable<T> {
  getKey: Function;
  callback: Function;
  dragState: DragState;
  dragIndex: number; // drag element's index in list
  dragElement: HTMLElement;
  drag: SortableDnd;
  options: SortableOptions<T>;
  cloneList: T[];
  dataSource: T[];
  rangeIsChanged: boolean;

  constructor(options: SortableOptions<T>, callback: Function) {
    this.options = options
    this.callback = callback
    this.getKey = options.getKey

    this.dragState = new DragState
    this.dataSource = options.dataSource
    this.cloneList = []
    this.rangeIsChanged = false
    this.init()
  }

  set(key, value) {
    this[key] = value
  }

  init() {
    this.destroy()
    let flag = false
    this.drag = new SortableDnd(
      this.options.scrollEl,
      {
        disabled: this.options.disabled,
        draggable: this.options.draggable,
        dragging: this.options.dragging,
        ghostStyle: this.options.ghostStyle,
        ghostClass: this.options.ghostClass,
        chosenClass: this.options.chosenClass,
        animation: this.options.animation,

        onDrag: (dragEl) => {
          this.dragElement = dragEl
          this.cloneList = [...this.dataSource]

          const key = dragEl.getAttribute('data-key')
          this.dragIndex = this.dataSource.findIndex(el => this.getKey(el) === key)

          this.dragState.from.index = this.dragIndex
          this.dragState.from.key = key
          this.rangeIsChanged = false
        },
        onChange: (_old_, _new_) => {
          if (!flag && this.rangeIsChanged) {
            flag = true
            this.dataSource.splice(this.dragIndex, 1)
          }
          const oldKey = this.dragState.from.key
          const newKey = _new_.node.getAttribute('data-key')

          this.dragState.to.key = newKey

          this.cloneList.forEach((el, index) => {
            const key = this.getKey(el)
            if (key === oldKey) Object.assign(this.dragState.from, { item: el, index })
            if (key === newKey) Object.assign(this.dragState.to, { item: el, index })
          })

          const { from, to } = this.dragState
          this.cloneList.splice(from.index, 1)
          this.cloneList.splice(to.index, 0, from.item)
        },
        onDrop: (changed) => {
          this.dragState.to.index = this.cloneList.findIndex(el =>
            this.getKey(el) === this.dragState.from.key
          )

          const { from, to } = this.dragState
          if (flag && this.rangeIsChanged && this.dragElement) this.dragElement.remove()

          this.callback(this.cloneList, from, to, changed)

          this.dataSource = [...this.cloneList]
          this.rangeIsChanged = false
          this.dragElement = null
          this.dragIndex = -1
          flag = false
        }
      }
    )
  }

  destroy() {
    this.drag && this.drag.destroy()
    delete this.drag
  }
}

export default Sortable