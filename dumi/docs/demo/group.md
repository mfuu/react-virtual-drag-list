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
      group="g"
      handle=".handle"
      chosenClass="chosen"
      className="virtual-list flex-1"
    >
      {
        (record, index, dataKey) => {
          return (
            <div>
              <div className="item-title">
                <span className="index">#{ record.index }</span>
                <span className="handle">☰</span>
              </div>
            </div>
          )
        }
      }
    </VirtualList>
  )
}

export default () => {
  return (
    <div className="flex">
      <Virtual key="g1"></Virtual>
      <Virtual key="g2"></Virtual>
    </div>
  )
};
```
