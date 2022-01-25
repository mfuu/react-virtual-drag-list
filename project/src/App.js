// import List from './component/List/index'
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
    <div className="App">
      <List
        dataSource={ getPageData(600, 0) }
        dataKey="id"
        // header={ <div>header</div> }
        // footer={ <div>footer</div> }
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
