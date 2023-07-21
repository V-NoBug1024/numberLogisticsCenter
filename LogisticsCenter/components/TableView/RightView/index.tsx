import * as React from "react";
import CellTitleView from "../CellTitleView";
import CellTextView from "../CellTextView";
import "./index.scss";

interface IProps {
  cellTitleList: object[];
  cellTextList: object[];
  cellTextKeys: object[];
  isScroll?: boolean;
}

const RightView = React.memo(
  React.forwardRef((props: IProps, ref) => {
    const { isScroll = true, cellTitleList = [] } = props;
    let rowCount = 0;
    cellTitleList.map((item: any) => {
      const { subTitle = [] } = item;
      rowCount += subTitle.length;
    });
    return (
      <div
        id="lz-right-view"
        className="lz-right-view"
        style={{ overflowX: isScroll ? "scroll" : "hidden" }}
      >
        {/* 标题 */}
        <CellTitleView dataList={props.cellTitleList} />
        {/* 数据内容 */}
        <CellTextView
          dataList={props.cellTextList}
          cellTextKeys={props.cellTextKeys}
          rowCount={rowCount}
          columnCount={cellTitleList.length}
        />
      </div>
    );
  })
);

export default RightView;
