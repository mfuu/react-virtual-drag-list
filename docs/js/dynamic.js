const DynamicList = (props) => {
  const virtual = React.useRef(null);

  const reset = () => {
    virtual.current.reset();
  };
  const toBottom = () => {
    virtual.current.scrollToBottom();
  };
  const toTop = () => {
    virtual.current.scrollToTop();
  };
  const toIndex = () => {
    virtual.current.scrollToIndex(200);
  };
  const handleToTop = () => {
    console.log('istop');
  };
  const handleToBottom = () => {
    console.log('isbottom');
  };
  const handleDragEnd = (arr, _old, _new, changed) => {
    console.log(arr, _old, _new, changed, 'new states after drag end');
  };

  return (
    <div className="content">
      <div className="btns">
        <button onClick={ reset }>reset</button>
        <button onClick={ toBottom }>to bottom</button>
        <button onClick={ toTop }>to top</button>
        <button onClick={ toIndex }>toIndex200</button>
      </div>
      <div className="dynamic-list">
        <VirtualList
          ref={ virtual }
          dataKey="index"
          dataSource={ props.list }
          size={ 70 }
          keeps={ 20 }
          draggable=".drag"
          header={ <div className="loading">header</div> }
          footer={ <div className="loading">footer</div> }
          v-top={ handleToTop }
          v-bottom={ handleToBottom }
          v-dragend={ handleDragEnd }
        >
          {
            (record, index, dataKey) => {
              return (
                <div className="dynamic-item">
                  <span title="drag to reorder" className="drag"></span>
                  <div className="data-key">{ dataKey }</div>
                  <p>{ record.desc }</p>
                </div>
              );
            }
          }
        </VirtualList>
      </div>
    </div>
  )
}