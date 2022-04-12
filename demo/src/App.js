import { useLayoutEffect, useRef, useEffect, useState } from 'react'
// import List from './component/List-js/index'
// import List from './component/List-ts/index.tsx'
// import List from './dist/draglist'

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

  const [editing, setEditing] = useState(true)

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

  const changeEdit = () => {
    setEditing(() => !editing)
  }
  return (
    <div className="App">
      <div>
        <button onClick={ toBottom }>to bottom</button>
        <button onClick={ changeEdit }>change editing</button>
      </div>
      <List
        ref={ virtualRef }
        dataSource={ dataSource }
        dataKey="id"
        keeps={ 50 }
        draggableOnly={ false }
        draggable={ editing }
        header={ <div className="loading">top loading...</div> }
        footer={ <div className="loading">bottom loading...</div> }
        v-top={ handleToTop }
        v-bottom={ handleToBottom }
        v-dragend={ handleDragEnd }
      >
        {
          (record, index, key) => <div style={{padding: '16px',borderBottom: '1px solid #1984ff'}}>
            {editing && <div className="sort" draggable="true">
              <i className="f7-icons">sort_ios</i>
            </div>}
            { record.desc }
          </div>
        }
      </List>
    </div>
  );
}

export default App;