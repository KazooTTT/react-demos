import { render } from "react-dom";
import "antd/dist/reset.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useReactive } from "ahooks";
import { Popover, Input } from "antd";
import "./index.css";
import { CSSProperties } from "react";

const style: CSSProperties = {
  height: 30,
  width: "450px",
};

const { Search } = Input;

const App = () => {
  const state = useReactive({
    items: Array.from({ length: 20 }),
    hasMore: true,
  });

  const fetchMoreData = () => {
    if (state.items.length >= 500) {
      state.hasMore = false;
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      state.items = state.items.concat(Array.from({ length: 20 }));
    }, 500);
  };

  const onSearch = (value: string) => console.log(value);

  return (
    <div className="container">
      <Popover
        placement="bottom"
        arrow={false}
        open={true}
        overlayStyle={{
          width: "450px",
          marginTop: "30px",
        }}
        style={{
          top: "250px",
        }}
        content={() => (
          <InfiniteScroll
            dataLength={state.items.length}
            next={fetchMoreData}
            hasMore={state.hasMore}
            loader={<h4>Loading...</h4>}
            height={400}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {state.items.map((i, index) => (
              <div style={style} key={index}>
                div - #{index}
              </div>
            ))}
          </InfiniteScroll>
        )}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 450 }}
          />
        </a>
      </Popover>
    </div>
  );
};

render(<App />, document.getElementById("root"));
