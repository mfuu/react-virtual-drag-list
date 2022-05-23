<p>
  <a href="https://npm-stat.com/charts.html?package=react-virtual-drag-list">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/react-virtual-drag-list.svg">
  </a>
  <a href="https://www.npmjs.com/package/react-virtual-drag-list">
    <img alt="Version" src="https://img.shields.io/npm/v/react-virtual-drag-list.svg"/>
  </a>
</p>

A virtual scrolling list component that can be sorted by dragging



## Simple usage

```bash
npm i react-virtual-drag-list -D

or

yarn add react-virtual-drag-list -D
```

Root component:
```jsx
import virtualList from 'react-virtual-drag-list'

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

  return (
    <virtualList
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
    </virtualList>
  )
}
```

## Props

**common used**

|     **Prop**    |   **Type**   | **Required?** | **Description**  |    **Default**   |
|-----------------|--------------|---------------|------------------|------------------|
| `dataKey`       | `String`     |   ✓   | the unique identifier of each piece of data, in the form of `'a.b.c'` | - |
| `dataSource`    | `Array`      |   ✓   | data list            | `[]` |
| `size`          | `Number`     |       | estimated height of each row  | `50` |
| `keeps`         | `Number`     |       | the number of lines rendered by the virtual scroll  | `30` |
| `direction`     | `String`     |       | `vertical/horizontal`, scroll direction  | `vertical` |
| `v-top`         | `Function`   |       | callback function that fires when scrolling to the top  | - |
| `v-bottom`      | `Function`   |       | callback function that fires when scrolling to the bottom  | - |
| `v-dragend`     | `Function`   |       | event when drag is complete  | - |
| `draggable`     | `Function/String` |  | Specifies which items inside the element should be draggable, the function type must return a boolean | `undefined` |
| `dragging`      | `Function`   |       | Specifies the drag element, which must return an HTMLElement, such as `(e) => e.target` | `undefined` |

**Uncommonly used**

|     **Prop**    |   **Type**   | **Required?** | **Description**  |    **Default**   |
|-----------------|--------------|---------------|------------------|------------------|
| `disabled`      | `Boolean`    |       | Disables the sortable if set to true | `false` |
| `delay`         | `Number`     |       | Delay time of debounce function  | `0` |
| `header`        | `JSX.Element`|       | top of list            | - |
| `footer`        | `JSX.Element`|       | bottom of list            | - |
| `wrapTag`       | `String`     |       | Label type for list wrap element  | `div` |
| `rootTag`       | `String`     |       | Label type for root element  | `div` |
| `itemTag`       | `String`     |       | Label type for list item element  | `div` |
| `headerTag`     | `String`     |       | Label type for header slot element  | `div` |
| `footerTag`     | `String`     |       | Label type for footer slot element  | `div` |
| `itemStyle`     | `Object`     |       | style for each line  | `{}` |
| `itemClass`     | `String`     |       | class for each line  | `''` |
| `rootStyle`     | `Object`     |       | Root element style  | `{}` |
| `rootClass`     | `String`     |       | Root element class  | `''` |
| `wrapStyle`     | `Object`     |       | List wrapper element style  | `{}` |
| `wrapClass`     | `String`     |       | List wrapper element class  | `''` |
| `animation`     | `Number`     |       | Drag-and-drop's animation delay | `150` |
| `ghostStyle`    | `Object`     |       | The style of the mask element when dragging | `{}` |
| `ghostClass`    | `String`     |       | The class of the mask element when dragging | `''` |
| `chosenClass`   | `String`     |       | The class of the selected element when dragging | `''` |

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

|     **Prop**     | **Description** |
|------------------|-----------------|
| `reset()`  | reset to initial |
| `getSize(key)` | get the height of the specified item by key value  |
| `getScrollTop()` | get the current scroll height  |
| `scrollToBottom()` | scroll to the bottom of the list  |
| `scrollToTop()` | scroll to the top of the list  |
| `scrollToOffset(offset)` | scroll to the specified height  |
| `scrollToIndex(index)` | scroll to the specified index value  |

