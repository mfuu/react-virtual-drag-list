<p>
  <a href="https://npm-stat.com/charts.html?package=react-virtual-drag-list">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/react-virtual-drag-list.svg">
  </a>
  <a href="https://www.npmjs.com/package/react-virtual-drag-list">
    <img alt="Version" src="https://img.shields.io/npm/v/react-virtual-drag-list.svg"/>
  </a>
</p>

A virtual scrolling list component that can be sorted by dragging

### [demo](https://mfuu.github.io/react-virtual-drag-list/)

## Simple usage

```bash
npm i react-virtual-drag-list -D

or

yarn add react-virtual-drag-list -D
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
  const handleDragEnd = (arr, _old, _new, changed) => {
    console.log(arr, _old, _new, changed, 'new state after drag end')
  }

  // you can use style and className as jsx used
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
      v-dragend={ handleDragEnd }
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
| `v-dragstart`    | `Function`   |               | -            | Callback function when drag is started  |
| `v-dragend`      | `Function`   |               | -            | Callback function when drag is complete  |

**Common used**

|     **Prop**     |   **Type**   | **Required?** |  **Default** | **Description**  |
|------------------|--------------|---------------|--------------|------------------|
| `dataKey`        | `String`     |   ✓          | -            | The unique identifier of each piece of data, in the form of `'a.b.c'` |
| `dataSource`     | `Array`      |   ✓          | `[]`         | Data list |
| `size`           | `Number`     |               | `-`          | Estimated height of each row  |
| `keeps`          | `Number`     |               | `30`         | The number of lines rendered by the virtual scroll  |
| `direction`      | `String`     |               | `vertical`   | `vertical/horizontal`, scroll direction  |
| `draggable`      | `Function/String` |          | -            | Specifies which items inside the element should be draggable, the function type must return a boolean |
| `keepOffset`     | `Boolean`    |               | `false`      | When scrolling up to load data, keep the same offset as the previous scroll  |
| `autoScroll`     | `Boolean`    |               | `true`       | Automatic scrolling when moving to the edge of the container  |
| `scrollStep`     | `Number`     |               | `5`          | The distance to scroll each frame when autoscrolling  |
| `scrollThreshold`| `Number`     |               | `15`         | Threshold to trigger autoscroll  |

**Uncommonly used**

|     **Prop**    |   **Type**   | **Required?** | **Default** | **Description**  |
|-----------------|--------------|---------------|-------------|------------------|
| `disabled`      | `Boolean`    |               | `false`     | Disables the sortable if set to true |
| `delay`         | `Number`     |               | `10`        | Delay time of debounce function  |
| `dragging`      | `Function`   |               | `undefined` | Specifies the drag element, which must return an HTMLElement, such as `(e) => e.target` |
| `header`        | `JSX.Element`|               | -           | Top of list |
| `footer`        | `JSX.Element`|               | -           | Bottom of list |
| `rootTag`       | `String`     |               | `div`       | Label type for root element  |
| `wrapTag`       | `String`     |               | `div`       | Label type for list wrap element  |
| `itemTag`       | `String`     |               | `div`       | Label type for list item element  |
| `headerTag`     | `String`     |               | `div`       | Label type for header slot element  |
| `footerTag`     | `String`     |               | `div`       | Label type for footer slot element  |
| `itemStyle`     | `Object`     |               | `{}`        | Style for each line  |
| `itemClass`     | `String`     |               | `''`        | Class for each line  |
| `wrapStyle`     | `Object`     |               | `{}`        | List wrapper element style  |
| `wrapClass`     | `String`     |               | `''`        | List wrapper element class  |
| `animation`     | `Number`     |               | `150`       | Drag-and-drop's animation delay |
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

