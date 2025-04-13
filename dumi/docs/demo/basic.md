```jsx
import * as React from 'react';
import VirtualList from '@/index';
import { getPageData } from '../public/sentence';
import '../global.less';

function Virtual() {

  const [list, setList] = React.useState(getPageData(1000, 0));

  const handleDrop = (params) => {
    setList(() => params.list);
  }

  return (
    <VirtualList
      dataKey="id"
      dataSource={list}
      onDrop={handleDrop}
      handle=".handle"
      chosenClass="chosen"
      className="virtual-list"
    >
      {
        (record, index, dataKey) => {
          return (
            <div className="list-item">
              <div className="item-title">
                <span className="index">#{ record.index }</span>
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
