import * as React from "react";

import "./index.scss";

export enum EmptyType {
  // 默认
  emptyTypeNone = 0,
  // 无网络
  emptyTypeNetwork,
}

interface IPros {
  emptyType: EmptyType;
  tipText?: string;
  tipImage?: any;
  className?: string | object;
  onRefresh?: () => void;
}

const EmptyView = React.memo(
  React.forwardRef((props: IPros, ref) => {
    const { tipText = "暂无数据，请稍后刷新~", tipImage } = props;

    const [networking, setNetworking] = React.useState(true);

    React.useEffect(() => {
      window.addEventListener("online", function () {
        console.log("有网络");
        setNetworking(true);
      });
      window.addEventListener("offline", function () {
        console.log("无网络");
        setNetworking(false);
      });
    });

    // 渲染
    return (
      <div className={`lz-empty-page-root ${props.className || ""}`}>
        {tipImage && <img src={tipImage} className="tip-image" />}
        <div className="tip-text">
          {networking ? tipText : "加载过程中开小差了，请稍后刷新~"}
        </div>
        {props.onRefresh && (
          <div className="refresh-data" onClick={props.onRefresh}>
            点击刷新
          </div>
        )}
      </div>
    );
  })
);

export default EmptyView;
