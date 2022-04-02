import { useLayoutEffect, useRef, useEffect, useState } from 'react'
// import List from './component/List-js/index'
// import List from './component/List-ts/index.tsx'
// import List from './dist/index'

import List from 'react-virtual-drag-list'

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

  const [dataSource, setDataScource] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setDataScource(getPageData(100, 0))
    }, 500)
  }, [])

  const handleToTop = () => {
    // setDataScource((pre) => {
    //   return [...getPageData(100, 0), ...pre]
    // })
    console.log('istop')
  }
  const handleToBottom = () => {
    console.log('isbottom')
  }
  const handleDragEnd = (arr) => {
    console.log(arr, 'new arr after deag end')
    // setDataScource(() => [...arr])
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
        dataSource={ dataSource }
        dataKey="id"
        keeps={ 50 }
        header={ <div className="loading">top loading...</div> }
        footer={ <div className="loading">bottom loading...</div> }
        v-top={ handleToTop }
        v-bottom={ handleToBottom }
        v-dragend={ handleDragEnd }
      >
        {
          (record, index, key) => <div style={{padding: '16px',borderBottom: '1px solid #1984ff'}}>
            <span draggable="true" style={{color: '#1984ff', cursor: 'grab'}}>{ key }</span>
            { record.desc }
          </div>
        }
      </List>
    </div>
  );
}

export default App;