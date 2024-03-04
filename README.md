# react-virtual-drag-list

[![npm](https://img.shields.io/npm/v/react-virtual-drag-list.svg)](https://www.npmjs.com/package/react-virtual-drag-list)  [![npm](https://img.shields.io/npm/dm/react-virtual-drag-list.svg)](https://www.npmjs.com/package/react-virtual-drag-list)  [![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

A virtual scrolling list component that can be sorted by dragging

### [Live Demo](https://mfuu.github.io/react-virtual-drag-list/)

## Simple Usage

```bash
npm i react-virtual-drag-list
```

Root component:
```jsx
import VirtualList from 'react-virtual-drag-list';

function Virtual() {

  const [list, setList] = useState([{id: '1', text: 'a'}, {id: '2', text: 'b'}, ...]);

  const handleToTop = () => {
    // to top
  }
  const handleToBottom = () => {
    // to bottom
  }
  const handleDrop = (params) => {
    // dnd complete
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
      v-top={ handleToTop }
      v-bottom={ handleToBottom }
      v-drop={ handleDrop }
    >
      {
        (record, index, dataKey) => {
          return (
            <div>
              <span class=".handle">{ index }</span>
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

|     **Emit**     |   **Type**   | **Required?** |  **Default** | **Description**  |
|------------------|--------------|---------------|--------------|------------------|
| `v-top`          | `Function`   |               | -            | Scrolling to the top of the scroller |
| `v-bottom`       | `Function`   |               | -            | Scrolling to the bottom of the scroller |
| `v-drag`         | `Function`   |               | -            | Drag is started |
| `v-drop`         | `Function`   |               | -            | Drag is complete |
| `v-add`          | `Function`   |               | -            | Element is dropped into the list from another |
| `v-remove`       | `Function`   |               | -            | Element is removed from the list into another |

**Common used**

|     **Prop**     |   **Type**   | **Required?** |  **Default** | **Description**  |
|------------------|--------------|---------------|--------------|------------------|
| `dataKey`        | `String`     |   ✓           | -           | The unique identifier of each piece of data, in the form of `'a.b.c'` |
| `dataSource`     | `Array`      |   ✓           | `[]`        | The data that needs to be rendered |
| `size`           | `Number`     |               | -            | Estimated height of each row. You can choose to pass it or not, it will be automatically calculated |
| `keeps`          | `Number`     |               | `30`         | The number of lines rendered by the virtual scroll  |
| `handle`         | `Function/String`|           | -            | Drag handle selector within list items |
| `group`          | `Object/String` |            | -            | string: 'name' or object: `{ name: 'group', put: true/false, pull: true/false/'clone', revertDrag: true/false }` |
| `scroller`       | `HTMLElement \| Window \| Document`| | - | Virtual list scrolling element |
| `direction`      | `String`     |               | `vertical`   | `vertical/horizontal`, scroll direction  |
| `keepOffset`     | `Boolean`    |               | `false`      | When scrolling up to load data, keep the same offset as the previous scroll  |
| `debounceTime`   | `Number`     |               | `0`          | debounce time on scroll |
| `throttleTime`   | `Number`     |               | `0`          | debounce time on scroll |
| `header`         | `JSX.Element`|               | -            | Top of list |
| `footer`         | `JSX.Element`|               | -            | Bottom of list |

**Uncommonly used**

|     **Prop**    |   **Type**   | **Required?** | **Default** | **Description**  |
|-----------------|--------------|---------------|-------------|------------------|
| `draggable`     | `String`     |               | -         | Specifies which items inside the element should be draggable. If does not set a value, the default list element can be dragged |
| `disabled`      | `Boolean`    |               | `false`     | Disables the sortable if set to true |
| `animation`     | `Number`     |               | `150`       | Drag-and-drop's animation delay |
| `autoScroll`    | `Boolean`    |               | `true`      | Automatic scrolling when moving to the edge of the container |
| `scrollThreshold`| `Number`    |               | `55`        | Threshold to trigger autoscroll |
| `delay`         | `Number`     |               | `0`         | Time in milliseconds to define when the sorting should start |
| `delayOnTouchOnly` | `Boolean` |               | `false`     | Only delay on press if user is using touch |
| `fallbackOnBody`| `Boolean`    |               | `false`     | Appends the ghost element into the document's body |
| `rootTag`       | `String`     |               | `div`       | Label type for root element |
| `wrapTag`       | `String`     |               | `div`       | Label type for list wrap element |
| `wrapStyle`     | `Object`     |               | `{}`        | List wrapper element style |
| `wrapClass`     | `String`     |               | `''`        | List wrapper element class |
| `itemTag`       | `String`     |               | `div`       | Label type for list item element |
| `itemStyle`     | `Object`     |               | `{}`        | List item element style |
| `itemClass`     | `String`     |               | `''`        | List item element class |
| `headerTag`     | `String`     |               | `div`       | Label type for header slot element |
| `headerStyle`   | `Object`     |               | `{}`        | header slot style |
| `headerClass`   | `String`     |               | `''`        | header slot class |
| `footerTag`     | `String`     |               | `div`       | Label type for footer slot element |
| `footerStyle`   | `Object`     |               | `{}`        | footer slot style |
| `footerClass`   | `String`     |               | `''`        | footer slot class |
| `ghostStyle`    | `Object`     |               | `{}`        | The style of the mask element when dragging |
| `ghostClass`    | `String`     |               | `''`        | The class of the mask element when dragging |
| `chosenClass`   | `String`     |               | `''`        | The class of the selected element when dragging |

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

|     **Prop**      | **Description** |
|-------------------|-----------------|
| `getSize(key)`    | get the height of the specified item by key value  |
| `getOffset()`     | get the current scroll top/left  |
| `getClientSize()` | Get wrapper element client viewport size (width or height) |
| `getScrollSize()` | Get all scroll size (scrollHeight or scrollWidth) |
| `scrollToTop()`   | scroll to the top of the list  |
| `scrollToBottom()`| scroll to the bottom of the list  |
| `scrollToKey(key)`| scroll to the specified data-key |
| `scrollToIndex(index)` | scroll to the specified index value  |
| `scrollToOffset(offset)` | scroll to the specified height  |
