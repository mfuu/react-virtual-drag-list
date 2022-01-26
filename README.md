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
  const handleDragEnd = (arr) => {
    console.log(arr, 'new arr after drag end')
  }

  return (
    <virtualList
      dataKey="id"
      dataSource={ list }
      header={ <div className="loading">top loading...</div> }
      footer={ <div className="loading">bottom loading...</div> }
      v-top={ handleToTop }
      v-bottom={ handleToBottom }
      v-dragend={ handleDragEnd }
    >
      {
        (record, index, uniqueKey) => {
          return (
            <div>
              <span>{ index }</span>
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

|     **Prop**    |  **Type**  | **Required?** | **Description**  |    **Default**   |
|-----------------|------------|------------|------------------|------------------|
| `dataKey`       | String     |   ✓   | the unique identifier of each piece of data, in the form of `'a.b.c'` | - |
| `dataSource`    | Array      |   ✓   | data list            | `[]` |
| `size`          | Number     |   ✓   | estimated height of each row  | 50 |
| `keeps`         | Number     |       | the number of lines rendered by the virtual scroll  | 30 |
| `draggable`     | Boolean    |       | whether to support drag and drop. You need to specify a draggable element and set the draggable attribute for it  | `true` |
| `header`        | JSX.Element|       | top of list            | - |
| `footer`        | JSX.Element|       | bottom of list            | - |
| `v-top`         | Function   |       | callback function that fires when scrolling to the top  | - |
| `v-bottom`      | Function   |       | callback function that fires when scrolling to the bottom  | - |
| `v-dragend`     | Function   |       | event when drag is complete  | - |
| `dragStyle`     | Object     |       | mask style while dragging  | - |
| `itemStyle`     | Object     |       | style for each line  | - |
| `itemClass`     | String     |       | class for each line  | - |

## Methods
Use the methods exposed in the component by setting `ref`, like this:
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
  >
    {
      (record) => <div>{ record.text }</div>
    }
  </virtualList>
)
```

|     **Prop**     | **Description** |
|------------------|-----------------|
| `scrollToBottom()` | scroll to the bottom of the list  |
| `scrollToOffset(offset)` | scroll to the specified height  |
| `scrollToIndex(index)` | scroll to the specified index value  |
| `getSize(key)` | get the height of the specified item by key value  |
| `getScrollTop()` | get the current scroll height  |

