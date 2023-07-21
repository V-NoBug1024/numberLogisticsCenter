import * as React from "react";

import "./index.scss";

interface IProps {
  dataList: any;
  storeName: any;
}

const LeftView = React.memo(
  React.forwardRef((props: IProps, ref) => {
    const { dataList = [], storeName } = props;
    return (
      <div>
        {/* 标题 */}
        <div className="lz-left-view-title">
          <span>{storeName}</span>
        </div>
        {/* 其它标题 */}
        <div className="lz-left-view-cell">
          {dataList.map((item: any, index: number) => {
            return (
              <div key={index}>
                {/* 分割线 */}
                {item.type === "total" && (
                  <div style={{ height: "2px", backgroundColor: "#f2f2f2" }} />
                )}

                {/* cell内容 */}
                <div key={index} className="cell-text-root">
                  <div
                    className={
                      item.type === "yellow" ? "yellow-text" : "normal-text"
                    }
                  >
                    {item.name}
                  </div>
                </div>

                {/* 分割线 */}
                {item.type === "yellow" && (
                  <div style={{ height: "2px", backgroundColor: "#f2f2f2" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  })
);

export default LeftView;
