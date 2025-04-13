## Installation

:::code-group

```sh [npm]
$ npm i react-virtual-sortable
```

```sh [yarn]
$ yarn add react-virtual-sortable
```

:::

## Simple Usage

```tsx | pure
import VirtualList from 'react-virtual-sortable';

function Virtual() {

  const [list, setList] = useState([{id: '1', text: 'a'}, {id: '2', text: 'b'}, ...]);

  const onDrop = (event) => {
    // dnd complete
    setList(() => event.list);
  }

  // use style and className as jsx used
  return (
    <VirtualList
      style={{ height: '500px' }}
      dataKey="id"
      dataSource={ list }
      handle=".handle"
      onDrop={ onDrop }
    >
      {
        (record, index, dataKey) => {
          return (
            <div>
              <span className=".handle">{ index }</span>
              { record.text }
            </div>
          )
        }
      }
    </VirtualList>
  )
}
```
