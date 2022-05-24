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
  constructor() {
    this.from = { key: null, item: null, index: null }
    this.to = { key: null, item: null, index: null }
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
  onDrag: Function;
  onDrop: Function;
  dragState: DragState;
  dragKey: any;
  dragElement: HTMLElement;
  drag: SortableDnd;
  options: SortableOptions<T>;
  cloneList: T[];
  dataSource: T[];
  rangeIsChanged: boolean;

  constructor(options: SortableOptions<T>, onDrag:Function, onDrop: Function) {
    this.options = options
    this.onDrag = onDrag
    this.onDrop = onDrop
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

        onDrag: (dragEl: HTMLElement) => {
          this.dragElement = dragEl
          this.cloneList = [...this.dataSource]

          this.dragKey = dragEl.getAttribute('data-key')

          this.dataSource.forEach((item, index) => {
            const key = this.getKey(item)
            if (key == this.dragKey) Object.assign(this.dragState.from, { item, index, key })
          })

          this.rangeIsChanged = false
          this.onDrag(this.dragKey, this.rangeIsChanged)
        },
        onChange: (_old_, _new_) => {
          const oldKey = this.dragState.from.key
          const newKey = _new_.node.getAttribute('data-key')

          const from = { item: null, index: -1 }
          const to = { item: null, index: -1 }

          this.cloneList.forEach((el, index) => {
            const key = this.getKey(el)
            if (key == oldKey) Object.assign(from, { item: el, index })
            if (key == newKey) Object.assign(to, { item: el, index })
          })

          this.cloneList.splice(from.index, 1)
          this.cloneList.splice(to.index, 0, from.item)
        },
        onDrop: (changed: boolean) => {
          if (this.rangeIsChanged && this.dragElement) this.dragElement.remove()

          const index = this.cloneList.findIndex(el => this.getKey(el) == this.dragState.from.key)
          const item = this.dataSource[index]
          this.dragState.to = { item, index, key: this.getKey(item) }

          const { from, to } = this.dragState
          this.onDrop(this.cloneList, from, to, changed)

          this.dataSource = [...this.cloneList]
          this.rangeIsChanged = false
          this.dragElement = null
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