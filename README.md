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
import VirtualList from 'react-virtual-drag-list'

function Virtual() {

  const list = [{id: '1', text: 'asd'}, {id: '2', text: 'fgh'}, ...]

  const handleToTop = () => {
    console.log('istop')
  }
  const handleToBottom = () => {
    console.log('isbottom')
  }
  const handleDragEnd = (params) => {
    console.log(params, 'new state after drag end')
  }

  // use style and className as jsx used
  return (
    <VirtualList
      className="virtual-list"
      style={{ height: '500px' }}
      dataKey="id"
      dataSource={ list }
      draggable=".drag"
      header={ <div className="loading">top loading...</div> }
      footer={ <div className="loading">bottom loading...</div> }
      v-top={ handleToTop }
      v-bottom={ handleToBottom }
      v-drop={ handleDragEnd }
    >
      {
        (record, index, dataKey) => {
          return (
            <div>
              <span class=".drag">{ index }</span>
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
| `v-top`          | `Function`   |               | -            | Callback function that fires when scrolling to the top  |
| `v-bottom`       | `Function`   |               | -            | Callback function that fires when scrolling to the bottom  |
| `v-drag`         | `Function`   |               | -            | Callback function when drag is started  |
| `v-drop`         | `Function`   |               | -            | Callback function when drag is complete  |
| `v-add`          | `Function`   |               | -            | Callback function when element is dropped into the list from another |
| `v-remove`       | `Function`   |               | -            | Callback function when element is removed from the list into another |

**Common used**

|     **Prop**     |   **Type**   | **Required?** |  **Default** | **Description**  |
|------------------|--------------|---------------|--------------|------------------|
| `header`         | `JSX.Element`|               | -            | Top of list |
| `footer`         | `JSX.Element`|               | -            | Bottom of list |
| `dataKey`        | `String`     |   ✓           | -           | The unique identifier of each piece of data, in the form of `'a.b.c'` |
| `dataSource`     | `Array`      |   ✓           | `[]`        | Data list |
| `size`           | `Number`     |               | `-`          | Estimated height of each row  |
| `keeps`          | `Number`     |               | `30`         | The number of lines rendered by the virtual scroll  |
| `handle`         | `Function/String`|           | `-`          | Drag handle selector within list items |
| `group`          | `Object/String` |            | `-`          | string: 'name' or object: `{ name: 'group', put: true/false, pull: true/false }` |
| `direction`      | `String`     |               | `vertical`   | `vertical/horizontal`, scroll direction  |
| `keepOffset`     | `Boolean`    |               | `false`      | When scrolling up to load data, keep the same offset as the previous scroll  |

**Uncommonly used**

|     **Prop**    |   **Type**   | **Required?** | **Default** | **Description**  |
|-----------------|--------------|---------------|-------------|------------------|
| `draggable`     | `Function/String`|           | `-`         | Specifies which items inside the element should be draggable. If does not set a value, the default list element can be dragged |
| `disabled`      | `Boolean`    |               | `false`     | Disables the sortable if set to true |
| `delay`         | `Number`     |               | `10`        | Delay time of debounce function  |
| `animation`     | `Number`     |               | `150`       | Drag-and-drop's animation delay |
| `autoScroll`    | `Boolean`    |               | `true`      | Automatic scrolling when moving to the edge of the container  |
| `scrollThreshold`| `Number`    |               | `55`        | Threshold to trigger autoscroll  |
| `pressDelay`    | `Number`     |               | `0`         | Time in milliseconds to define when the sorting should start |
| `pressDelayOnTouchOnly` | `Boolean`|           | `false`     | Only delay on press if user is using touch |
| `fallbackOnBody`| `Boolean`    |               | `false`     | Appends the ghost element into the document's body |
| `rootTag`       | `String`     |               | `div`       | Label type for root element  |
| `wrapTag`       | `String`     |               | `div`       | Label type for list wrap element  |
| `itemTag`       | `String`     |               | `div`       | Label type for list item element  |
| `headerTag`     | `String`     |               | `div`       | Label type for header slot element  |
| `footerTag`     | `String`     |               | `div`       | Label type for footer slot element  |
| `itemStyle`     | `Object`     |               | `{}`        | Style for each line  |
| `itemClass`     | `String`     |               | `''`        | Class for each line  |
| `wrapStyle`     | `Object`     |               | `{}`        | List wrapper element style  |
| `wrapClass`     | `String`     |               | `''`        | List wrapper element class  |
| `ghostStyle`    | `Object`     |               | `{}`        | The style of the mask element when dragging |
| `ghostClass`    | `String`     |               | `''`        | The class of the mask element when dragging |
| `chosenClass`   | `String`     |               | `''`        | The class of the selected element when dragging |

## Methods
Use the methods exposed in the component by setting `ref`
```jsx
...

const virtualRef = useRef()

const scrollToBottom = () => {
  virtualRef.current.scrollToBottom()
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
| `reset()`         | reset to initial |
| `getSize(key)`    | get the height of the specified item by key value  |
| `getOffset()`     | get the current scroll height  |
| `scrollToTop()`   | scroll to the top of the list  |
| `scrollToBottom()`| scroll to the bottom of the list  |
| `scrollToIndex(index)` | scroll to the specified index value  |
| `scrollToOffset(offset)` | scroll to the specified height  |
