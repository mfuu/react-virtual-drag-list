const Header = () => {
    return (
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    );
  };
  
  const Footer = () => {
    return (
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    );
  };
  
  const VirtualList = (props) => {
    const virtual = React.useRef(null);
    const [list, setList] = React.useState([]);
    const [index, setIndex] = React.useState(20);
    const [disabled, setDisabled] = React.useState(false);
    const [topLoading, setTopLoading] = React.useState(false);
  
    const toBottom = () => {
      virtual.current.scrollToBottom();
    };
  
    const toTop = () => {
      virtual.current.scrollToTop();
    };
  
    const toIndex = () => {
      virtual.current.scrollToIndex(index);
    };
  
    const handleChange = (e) => {
      setIndex(() => e.target.value);
    };
  
    const changeDisabled = () => {
      setDisabled((pre) => !pre);
    };
  
    const handleToTop = () => {
      console.log("to top");
      if (props.topLoad) {
        setTopLoading(() => true);
        setTimeout(() => {
          setList((pre) => [...getPageData(30, pre.length), ...pre]);
          setTopLoading(() => false);
        }, 500);
      }
    };
  
    const handleToBottom = () => {
      console.log("to bottom");
      if (props.bottomLoad) {
        setTimeout(() => {
          setList((pre) => [...pre, ...getPageData(30, pre.length)]);
        }, 500);
      }
    };
  
    const handleDrag = (params) => {
      console.log(params, "drag start");
    };
  
    const handleDrop = (params) => {
      console.log(params, "drag end");
    };
  
    const handleAdd = (params) => {
      console.log(params, "on add");
    };
  
    const handleRemove = (params) => {
      console.log(params, "on remove");
    };
  
    React.useEffect(() => {
      setList(() => getPageData(100, 0));
    }, []);
  
    return (
      <div className="flex justify-content-center">
        <div className="oprate">
          <button onClick={changeDisabled}>
            allow drag: {disabled ? "false" : "true"}
          </button>
          <button onClick={toTop}>to top</button>
          <button onClick={toBottom}>to bottom</button>
          <button onClick={toIndex}>
            to index：
            <input
              type="text"
              defaultValue={index}
              onChange={handleChange}
              onClick={(e) => e.stopPropagation()}
            />
          </button>
        </div>
        <VirtualDragList
          ref={virtual}
          dataKey="id"
          dataSource={list}
          keeps={20}
          keepOffset={true}
          handle=".handle"
          className="virtual-list"
          chosenClass="chosen"
          itemClass="list-item"
          style={props.style}
          wrapStyle={props.wrapStyle}
          disabled={disabled}
          direction={props.direction}
          group={props.group}
          pageMode={props.pageMode}
          header={props.topLoad && topLoading && Header()}
          footer={props.bottomLoad && Footer()}
          v-top={handleToTop}
          v-bottom={handleToBottom}
          v-drag={handleDrag}
          v-drop={handleDrop}
          v-add={handleAdd}
          v-remove={handleRemove}
        >
          {(record, index, dataKey) => {
            return (
              <div>
                <div title="drag to reorder" className="handle">☰</div>
                <div>{record.desc}</div>
              </div>
            );
          }}
        </VirtualDragList>
      </div>
    );
  };
  