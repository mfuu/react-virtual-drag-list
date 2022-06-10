const InfinityList = (props) => {
  const getPageData = props.getPageData;
  const virtual = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    setList(() => getPageData(30, 0));
  }, []);

  const handleToTop = () => {
    setLoading(() => true);
    setTimeout(() => {
      setList((pre) => [...getPageData(30, pre.length), ...pre]);
      setLoading(() => false);
    }, 500)
  };
  const handleToBottom = () => {
    setTimeout(() => {
      setList((pre) => [...pre, ...getPageData(30, pre.length)]);
    }, 500)
  };
  const handleDragEnd = (arr, _old, _new, changed) => {
    console.log(arr, _old, _new, changed, 'new states after drag end');
  };

  return (
    <div className="content">
      <div className="infinity-list">
        <VirtualList
          ref={ virtual }
          dataKey="id"
          dataSource={ list }
          keeps={ 20 }
          keepOffset={ true }
          draggable=".drag"
          header={
            <div className="spinner" style={{ display: loading ? '' : 'none' }}>
              <div className="rect1"></div>
              <div className="rect2"></div>
              <div className="rect3"></div>
              <div className="rect4"></div>
              <div className="rect5"></div>
            </div>
          }
          footer={
            <div className="spinner">
              <div className="rect1"></div>
              <div className="rect2"></div>
              <div className="rect3"></div>
              <div className="rect4"></div>
              <div className="rect5"></div>
            </div> 
          }
          v-top={ handleToTop }
          v-bottom={ handleToBottom }
          v-dragend={ handleDragEnd }
          style={{ height: '100%' }}
        >
          {
            (record, index, dataKey) => {
              return (
                <div className="infinity-item">
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