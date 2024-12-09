```jsx
import * as React from 'react';
import VirtualList from '@/index';
import { getPageData } from '../public/sentence';
import '../global.less';

function Virtual() {

  const [list, setList] = React.useState(getPageData(100, 0));

  const handleDrop = (params) => {
    setList(() => params.list);
  }

  return (
    <VirtualList
      dataKey="id"
      dataSource={list}
      onDrop={handleDrop}
      scroller={document}
      handle=".handle"
      chosenClass="chosen"
    >
      {
        (record, index, dataKey) => {
          return (
            <div>
              <div className="item-title">
                <span className="index">#{ index }</span>
                <span className="handle">☰</span>
              </div>
              <p>{ record.desc }</p>
            </div>
          )
        }
      }
    </VirtualList>
  )
}

export default Virtual;
```