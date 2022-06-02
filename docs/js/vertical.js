const VerticalList = (props) => {
  const virtual = React.useRef(null);
  const [disabled, setDisabled] = React.useState(false);

  const changeDisabled = () => {
    setDisabled((pre) => !pre)
  };
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
        <button onClick={ changeDisabled }>allow drag: { disabled ? 'false' : 'true' }</button>
        <button onClick={ reset }>reset</button>
        <button onClick={ toBottom }>to bottom</button>
        <button onClick={ toTop }>to top</button>
        <button onClick={ toIndex }>toIndex200</button>
      </div>
      <div className="vertical-list">
        <VirtualList
          ref={ virtual }
          dataKey="index"
          dataSource={ props.list }
          size={ 99 }
          keeps={ 20 }
          disabled={ disabled }
          draggable=".drag"
          header={ <div className="loading">header</div> }
          footer={ <div className="loading">footer</div> }
          v-top={ handleToTop }
          v-bottom={ handleToBottom }
          v-dragend={ handleDragEnd }
          style={{ height: '100%' }}
        >
          {
            (record, index, dataKey) => {
              return (
                <div className="vertical-item">
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