import * as React from "react";
import LeftView from "./LeftView";
import RightView from "./RightView";

import "./index.scss";

interface IProps {
  isScroll?: boolean;
  leftInfo: any;
  cellTitleList: any;
  cellTextList: any;
  cellTextKeys: any;
}

const TableView = React.memo(
  React.forwardRef((props: IProps, ref) => {
    const { leftInfo, cellTextList, cellTitleList, cellTextKeys } = props;
    return (
      <div className="lz-table-view">
        <LeftView
          dataList={leftInfo.leftDataList}
          storeName={leftInfo.storeName}
        />
        <RightView
          cellTitleList={cellTitleList}
          cellTextList={cellTextList}
          cellTextKeys={cellTextKeys}
          isScroll={props.isScroll}
        />
      </div>
    );
  })
);

export default TableView;
