```jsx
import * as React from 'react';
import VirtualList from '@/index';
import { getPageData } from '../public/sentence';
import '../global.less';

const Footer = () => {
  return (
    <div className="flex align-center justify-center">
      <div className="loading"></div>
    </div>
  )
}

function Virtual() {

  const [list, setList] = React.useState(getPageData(50, 0));

  const handleToBottom = () => {
    setTimeout(() => {
      setList((oldlist) => [...oldlist, ...getPageData(10, oldlist.length)])
    }, 1000)
  }

  const handleDrop = (params) => {
    setList(() => params.list);
  }

  return (
    <VirtualList
      dataKey="id"
      dataSource={list}
      onDrop={handleDrop}
      onBottom={handleToBottom}
      footer={Footer()}
      handle=".handle"
      chosenClass="chosen"
      className="virtual-list"
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
