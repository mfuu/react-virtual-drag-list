import { useLayoutEffect, useRef } from 'react'
import List from './component/List/index'
// import List from './dist/index'

// import List from 'react-virtual-drag-list'

import utils from './utils'
import { Random } from './utils/mock'
import getSentences from './utils/sentences'

const getPageData = (count, currentLength) => {
  const DataItems = []
  for (let i = 0; i < count; i++) {
    const index = currentLength + i
    DataItems.push({
      index,
      name: Random.name(),
      id: utils.getUniqueId(index),
      desc: getSentences()
    })
  }
  return DataItems
}

function App() {

  const virtualRef = useRef()

  const handleToTop = () => {
    console.log('istop')
  }
  const handleToBottom = () => {
    console.log('isbottom')
  }
  const handleDragEnd = (arr) => {
    console.log(arr, 'new arr after deag end')
  }

  const toBottom = () => {
    console.log(virtualRef)
    virtualRef.current.scrollToBottom()
  }

  return (
    <div className="App">
      <button style={{ float: 'right' }} onClick={ toBottom }>to bottom</button>
      <List
        ref={ virtualRef }
        dataSource={ getPageData(600, 0) }
        dataKey="id"
        keeps="50"
        header={ <div className="loading">top loading...</div> }
        footer={ <div className="loading">bottom loading...</div> }
        v-top={ handleToTop }
        v-bottom={ handleToBottom }
        v-dragend={ handleDragEnd }
      >
        {
          (record, index) => <div style={{padding: '10px',borderBottom: '1px solid #ccc'}}>
            <span draggable="true" style={{color: 'blue'}}>{ index }</span>
            { record.desc }
          </div>
        }
      </List>
    </div>
  );
}

export default App;
