<p>
  <a href="https://npm-stat.com/charts.html?package=react-virtual-drag-list">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/react-virtual-drag-list.svg">
  </a>
  <a href="https://www.npmjs.com/package/react-virtual-drag-list">
    <img alt="Version" src="https://img.shields.io/npm/v/react-virtual-drag-list.svg"/>
  </a>
</p>

可拖拽排序的虚拟滚动列表组件 



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
    console.log(arr, 'new arr after deag end')
  }

  return (
    <virtualList
      dataKey="id"
      dataSource={ list }
      header={ <div class="loading">top loading...</div> }
      footer={ <div class="loading">bottom loading...</div> }
      v-top={ handleToTop }
      v-bottom={ handleToBottom }
      v-dragend={ handleDragEnd }
    >
      {
        (record, index, dataKey) => {
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
| `dataKey`       | String     |   ✓   | 每一条数据的唯一标识`'a.b.c'`形式 | - |
| `dataSource`    | Array      |   ✓   | 数据源            | `[]` |
| `size`          | Number     |   ✓   | 每一行的预估高度  | 50 |
| `keeps`         | Number     |       | 虚拟滚动渲染的行数  | 30 |
| `header`        | JSX.Element|       | 列表顶部            | - |
| `footer`        | JSX.Element|       | 列表底部            | - |
| `v-top`         | Function   |       | 滚动到顶部时触发的回调函数  | - |
| `v-bottom`      | Function   |       | 滚动到底部时触发的回调函数  | - |
| `v-dragend`     | Function   |       | 拖拽完成时的事件  | - |
