# react-virtual-sortable

[![npm](https://img.shields.io/npm/v/react-virtual-sortable.svg)](https://www.npmjs.com/package/react-virtual-sortable)  [![npm](https://img.shields.io/npm/dm/react-virtual-sortable.svg)](https://www.npmjs.com/package/react-virtual-sortable)  [![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

A virtual scrolling list component that can be sorted by dragging

### [Live Demo](https://mfuu.github.io/react-virtual-sortable/)

## Simple Usage

```bash
npm i react-virtual-sortable
```

Root component:
```jsx
import VirtualList from 'react-virtual-sortable';

function Virtual() {

  const [list, setList] = useState([{id: '1', text: 'a'}, {id: '2', text: 'b'}, ...]);

  const onDrop = (event) => {
    // dnd complete
    setList(() => event.list);
  }

  // use style and className as jsx used
  return (
    <VirtualList
      className="virtual-list"
      style={{ height: '500px' }}
      dataKey="id"
      dataSource={ list }
      handle=".handle"
      header={ <div className="loading">top loading...</div> }
      footer={ <div className="loading">bottom loading...</div> }
      onDrop={ onDrop }
    >
      {
        (record, index, dataKey) => {
          return (
            <div>
              <span className=".handle">{ index }</span>
              { record.text }
            </div>
          )
        }
      }
    </VirtualList>
  )
}
```

## Props

**Callback**

| **Emit**   | **Type**   | **Default** | **Description**                         |
| ---------- | ---------- | ----------- | --------------------------------------- |
| `onTop`    | `Function` | -           | Scrolling to the top of the scroller    |
| `onBottom` | `Function` | -           | Scrolling to the bottom of the scroller |
| `onDrag`   | `Function` | -           | Drag is started                         |
| `onDrop`   | `Function` | -           | Drag is complete                        |

**Required props**
| **Prop**     | **Type** | **Default** | **Description**                                                       |
| ------------ | -------- | ----------- | --------------------------------------------------------------------- |
| `dataKey`    | `String` | -           | The unique identifier of each piece of data, in the form of `'a.b.c'` |
| `dataSource` | `Array`  | `[]`        | The data that needs to be rendered                                    |

**Common used**

| **Prop**       | **Type**                  | **Default** | **Description**                                                                                                  |
| -------------- | ------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `header`       | `JSX.Element`             | -           | Top of list                                                                                                      |
| `footer`       | `JSX.Element`             | -           | Bottom of list                                                                                                   |
| `size`         | `Number`                  | -           | Estimated height of each row. You can choose to pass it or not, it will be automatically calculated              |
| `keeps`        | `Number`                  | `30`        | The number of lines rendered by the virtual scroll                                                               |
| `handle`       | `String`                  | -           | Drag handle selector within list items                                                                           |
| `group`        | `Object/String`           | -           | string: 'name' or object: `{ name: 'group', put: true/false, pull: true/false/'clone', revertDrag: true/false }` |
| `scroller`     | `Document \| HTMLElement` | -           | Virtual list scrolling element                                                                                   |
| `direction`    | `vertical \| horizontal`  | `vertical`  | Scroll direction                                                                                                 |
| `debounceTime` | `Number`                  | `0`         | debounce time on scroll                                                                                          |
| `throttleTime` | `Number`                  | `0`         | debounce time on scroll                                                                                          |
| `tableMode`    | `Boolean`                 | `false`     | display with table and tbody                                                                                     |

**Uncommonly used**

| **Prop**           | **Type**  | **Default**               | **Description**                                                             |
| ------------------ | --------- | ------------------------- | --------------------------------------------------------------------------- |
| `draggable`        | `String`  | `[role="item"]`           | Specifies which items inside the element should be draggable                |
| `sortable`         | `Boolean` | `true`                    | Whether the current list can be sorted by dragging                          |
| `lockAxis`         | `x \| y`  | `-`                       | Axis on which dragging will be locked                                       |
| `keepOffset`       | `Boolean` | `false`                   | When scrolling up to load data, keep the same offset as the previous scroll |
| `disabled`         | `Boolean` | `false`                   | Disables the sortable if set to true                                        |
| `animation`        | `Number`  | `150`                     | Drag-and-drop's animation delay                                             |
| `autoScroll`       | `Boolean` | `true`                    | Automatic scrolling when moving to the edge of the container                |
| `scrollSpeed`      | `Object`  | `{ x: 10, y: 10 }`        | Vertical&Horizontal scrolling speed (px)                                    |
| `scrollThreshold`  | `Number`  | `55`                      | Threshold to trigger autoscroll                                             |
| `delay`            | `Number`  | `0`                       | Time in milliseconds to define when the sorting should start                |
| `delayOnTouchOnly` | `Boolean` | `false`                   | Only delay on press if user is using touch                                  |
| `fallbackOnBody`   | `Boolean` | `false`                   | Appends the ghost element into the document's body                          |
| `rootTag`          | `String`  | `div`                     | Label type for root element                                                 |
| `wrapTag`          | `String`  | `div`                     | Label type for list wrap element                                            |
| `wrapStyle`        | `Object`  | `{}`                      | List wrapper element style                                                  |
| `wrapClass`        | `String`  | `''`                      | List wrapper element class                                                  |
| `ghostStyle`       | `Object`  | `{}`                      | The style of the mask element when dragging                                 |
| `ghostClass`       | `String`  | `''`                      | The class of the mask element when dragging                                 |
| `chosenClass`      | `String`  | `''`                      | Class name for the chosen item                                              |
| `placeholderClass` | `String`  | `''`                      | Class name for the drop placeholder                                         |

## Methods
Use the methods exposed in the component by setting `ref`
```jsx
...

const virtualRef = useRef();

const scrollToBottom = () => {
  virtualRef.current.scrollToBottom();
}

return (
  <button onClick={ scrollToBottom }></button>
  <virtualList
    ref={ virtualRef }
    ...
  >
    {
      (record) => <div>{ record.text }</div>
    }
  </virtualList>
)
```

| **Prop**                 | **Description**                                            |
| ------------------------ | ---------------------------------------------------------- |
| `getSize(key)`           | get the height of the specified item by key value          |
| `getOffset()`            | get the current scroll top/left                            |
| `getClientSize()`        | Get wrapper element client viewport size (width or height) |
| `getScrollSize()`        | Get all scroll size (scrollHeight or scrollWidth)          |
| `scrollToTop()`          | scroll to the top of the list                              |
| `scrollToBottom()`       | scroll to the bottom of the list                           |
| `scrollToKey(key)`       | scroll to the specified data-key                           |
| `scrollToIndex(index)`   | scroll to the specified index value                        |
| `scrollToOffset(offset)` | scroll to the specified height                             |
