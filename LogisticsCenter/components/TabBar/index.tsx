import * as React from "react";

import "./index.scss";

interface IProps {
  label: string;
  tabBarList: object[];
  onTabBarChange?: (index: number) => void;
}

const TabBar = React.memo(
  React.forwardRef((props: IProps, ref) => {
    const { label = "title", tabBarList = [], onTabBarChange } = props;

    // state
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    // 点击方法
    const onClickTabBar = (index: number) => {
      if (index !== selectedIndex) {
        setSelectedIndex(index);
        if (onTabBarChange) onTabBarChange(index);
      }
    };

    return (
      <div className="lz-tab-root">
        {tabBarList.map((item: any, index: number) => {
          const isSelect = index === selectedIndex;
          return (
            <div
              key={index}
              className={isSelect ? "normal active" : "normal"}
              onClick={() => {
                onClickTabBar(index);
              }}
            >
              {item[label]}
            </div>
          );
        })}
      </div>
    );
  })
);

export default TabBar;
