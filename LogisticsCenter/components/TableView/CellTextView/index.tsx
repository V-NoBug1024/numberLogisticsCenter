import * as React from "react";

import "./index.scss";

interface IProps {
  dataList: object[];
  cellTextKeys: object[];
  rowCount: number;
  columnCount: number;
}

const CellTextView = React.memo(
  React.forwardRef((props: IProps, ref) => {
    const {
      dataList = [],
      cellTextKeys = [],
      rowCount,
      columnCount = 0,
    } = props;
    const offsetWidth =
      columnCount <= 2 ? 10 * columnCount : 10 * (2 * columnCount - 2);
    return (
      <div className="lz-cell-text">
        {dataList.map((item: any, index: number) => {
          const { type = "normal" } = item;
          return (
            <div key={index}>
              {/* 分割线 */}
              {type === "total" && (
                <div
                  style={{
                    height: "2px",
                    backgroundColor: "#f2f2f2",
                    width: rowCount * 100 + offsetWidth + 10,
                  }}
                />
              )}

              {/* cell内容 */}
              <div
                key={index}
                className="cell-text"
                style={{ fontWeight: type === "normal" ? "normal" : "bold" }}
              >
                {cellTextKeys.map((subItem: any, subIndex: number) => (
                  <span key={subIndex} style={subItem.style}>
                    {item[subItem.key]}
                  </span>
                ))}
              </div>
              {/* 分割线 */}
              {type === "yellow" && (
                <div
                  style={{
                    height: "2px",
                    backgroundColor: "#f2f2f2",
                    width: rowCount * 100 + offsetWidth + 10,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  })
);

export default CellTextView;
