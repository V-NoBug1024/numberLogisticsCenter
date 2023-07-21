import * as React from "react";

import "./index.scss";

enum CellType {
  single = 0,
  double = 1,
}

interface IProps {
  dataList: object[];
}

const CellTitleView = React.memo(
  React.forwardRef((props: IProps, ref) => {
    const { dataList = [] } = props;
    return (
      <div className="lz-cell-title">
        {dataList.map((item: any, index: number) => {
          const { subTitle = [], type } = item;
          const length = dataList.length - 1;
          const offsetWidth = index === 0 ? 10 : 20;
          return (
            <div
              className={index === length ? "cell later-boder-line" : "cell"}
              key={index}
            >
              {type === CellType.double && (
                <div
                  className="title"
                  style={{
                    width: subTitle.length * 100 + offsetWidth,
                  }}
                >
                  {item.title}
                </div>
              )}

              <div className="subtitle">
                {subTitle.map((title: string, subIndex: number) => (
                  <span
                    style={{
                      paddingLeft: subIndex === 0 && index > 0 ? "10px" : "0px",
                      paddingRight:
                        subIndex === subTitle.length - 1 ? "10px" : "0px",
                      height: type === CellType.double ? "29px" : "50px",
                    }}
                    key={subIndex}
                  >
                    {title}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  })
);

export default CellTitleView;
