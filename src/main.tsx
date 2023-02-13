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

interface State {
  pageIndex: number;
  pageSize: number;
  list: Item[];
  hasMore: boolean;
  total: number;
  keyword: string;
}

const { Search } = Input;

const App = () => {
  const state = useReactive<State>({
    pageIndex: 1,
    pageSize: 20,
    list: [],
    hasMore: true,
    total: 0,
    keyword: "",
  });

  const fetchData = () => {
    state.list = Array.from({ length: 20 });
    state.pageIndex++;
    state.total = 100;
  };

  // load more
  const fetchMoreData = () => {
    if (state.keyword) {
      if (state.list.length >= state.total) {
        state.hasMore = false;
        return;
      }
      setTimeout(() => {
        state.list = state.list.concat(Array.from({ length: 20 }));
      }, 500);
    }
    return;
  };

  const onSearch = (value: string) => {
    state.keyword = value;
    fetchData();
  };

  return (
    <div className="container">
      <Popover
        placement="bottom"
        trigger={["hover"]}
        arrow={false}
        overlayStyle={{
          width: "450px",
          marginTop: "30px",
          visibility: state.keyword ? "visible" : "hidden",
        }}
        style={{
          top: "250px",
        }}
        content={() => (
          <InfiniteScroll
            dataLength={state.list.length}
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
            {state.list.map((i, index) => (
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
