import SortableDnd from 'sortable-dnd'
import { SortableOptions, DragState } from './interface'

class Sortable<T> {
  getKey: Function;
  onDrag: Function;
  onDrop: Function;
  dragState: DragState;
  dragElement: HTMLElement;
  drag: SortableDnd;
  options: SortableOptions<T>;
  dataSource: T[];
  rangeIsChanged: boolean;

  constructor(options: SortableOptions<T>, onDrag:Function, onDrop: Function) {
    this.options = options
    this.onDrag = onDrag
    this.onDrop = onDrop
    this.getKey = options.getKey

    this.dragState = new DragState
    this.dataSource = options.dataSource
    this.rangeIsChanged = false
    this.init()
  }

  set(key, value) {
    this[key] = value
  }

  init() {
    this.destroy()

    let cloneList = new Array()
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
          cloneList = [...this.dataSource]

          const key = dragEl.getAttribute('data-key')
          const index = this.dataSource.findIndex(el => this.getKey(el) == key)
          const item = this.dataSource[index]
          Object.assign(this.dragState.from, { item, index, key })

          this.rangeIsChanged = false
          this.onDrag(this.dragState.from)
        },
        onChange: (_old_, _new_) => {
          const oldKey = this.dragState.from.key
          const newKey = _new_.node.getAttribute('data-key')

          const from = { item: null, index: -1 }
          const to = { item: null, index: -1 }

          cloneList.forEach((el, index) => {
            const key = this.getKey(el)
            if (key == oldKey) Object.assign(from, { item: el, index })
            if (key == newKey) Object.assign(to, { item: el, index })
          })

          cloneList.splice(from.index, 1)
          cloneList.splice(to.index, 0, from.item)
        },
        onDrop: (changed: boolean) => {
          if (this.rangeIsChanged && this.dragElement) this.dragElement.remove()

          const { from } = this.dragState
          const index = cloneList.findIndex(el => this.getKey(el) == from.key)
          const item = this.dataSource[index]
          this.dragState.to = { item, index, key: this.getKey(item) }

          this.onDrop(cloneList, from, this.dragState.to, changed)

          this.dataSource = [...cloneList]
          this.clear()
        }
      }
    )
  }

  clear() {
    this.dragElement = null
    this.rangeIsChanged = false
    this.dragState = new DragState
  }

  destroy() {
    this.drag && this.drag.destroy()
    delete this.drag
  }
}

export default Sortable