import * as React from "react";

import "./index.scss";

interface IProps {
  menuList: object[];
  topTitle?: string;
  resetSelect?: boolean;
  onSelectMenuChange?: (item: any) => void;
  onShowMoreChange?: (showMore: boolean) => void;
}

const SelectMenu = React.memo(
  React.forwardRef((props: IProps, ref) => {
    const {
      menuList = [],
      topTitle = "全部",
      resetSelect,
      onSelectMenuChange,
      onShowMoreChange,
    } = props;
    //  state
    const [showMore, setShowMore] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    React.useEffect(() => {
      scrollToAnchor();
      resetSelect && setSelectedIndex(0);
    }, [resetSelect, selectedIndex]);

    //  点击滑动到指定位置
    const scrollToAnchor = () => {
      // 找到锚点
      let tagElement = document.getElementById("tag");
      // 如果对应id的锚点存在，就跳转到锚点
      if (!showMore && tagElement) {
        let offsetX = 0;
        for (let index = 0; index < selectedIndex; index++) {
          const element = document.getElementById(`selectMenu-${index}`);
          const offsetWidth = element.offsetWidth;
          offsetX += offsetWidth;
        }
        let offsetLeft = 0;
        const offset = offsetX + 10 * selectedIndex;
        const fixWidth = tagElement.getBoundingClientRect().width / 2;
        if (selectedIndex > 0 && offset > fixWidth) {
          offsetLeft = offset;
        }
        // tagElement.scrollTo({ left: offsetLeft, behavior: "smooth" });
        // tagElement.scrollTo({ left: offsetLeft });
        // console.log("滑动");
        // tagElement.scrollTo(offsetLeft, 0);
        tagElement.scrollLeft = offsetLeft;
      }
    };

    // 点击菜单
    const onClickMenu = (item: any, index: number) => {
      if (index !== selectedIndex) {
        setSelectedIndex(index);
        if (onSelectMenuChange) onSelectMenuChange(item);
      }
    };

    //   显示更多
    const showMoreMenu = React.useCallback(() => {
      setShowMore(!showMore);
      if (onShowMoreChange) onShowMoreChange(!showMore);
    }, [showMore]);

    return (
      <div className="lz-select-menu-root">
        <div
          className={showMore ? "more-root" : "normal-root"}
          style={{ maxWidth: window.screen.width }}
        >
          {showMore ? (
            <div>
              {/* 菜单标题 */}
              <div className="topTitle" onClick={showMoreMenu}>
                <div
                  // onClick={showMoreMenu}
                  style={{
                    width: window.screen.width - 35,
                    textAlign: "center",
                  }}
                >
                  {topTitle}
                </div>
                <div style={{ width: "35px" }}>
                  <img
                    style={{ width: "20px" }}
                    src={require("assets/images/icon_unfolded_up_gray.png")}
                  />
                </div>
              </div>
              {/* 菜单项 */}
              <div className="item">
                {menuList.map((item: any, index: number) => {
                  const isSelected = selectedIndex === index;
                  return (
                    <div key={index}>
                      <div
                        className="moreText"
                        style={{ color: isSelected ? "#68a9ff" : "#afafaf" }}
                        onClick={() => {
                          onClickMenu(item, index);
                        }}
                      >
                        {item.title}
                      </div>
                      {/* 选中下划线 */}
                      <div className={isSelected ? "active" : "normal"} />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              {/* 菜单项 */}
              <div className="tag" id="tag">
                {menuList.map((item: any, index: number) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div key={index} style={{ margin: "0 10px" }}>
                      <div
                        id={`selectMenu-${index}`}
                        style={{ color: isSelected ? "#68a9ff" : "#afafaf" }}
                        className="text"
                        onClick={() => {
                          onClickMenu(item, index);
                        }}
                      >
                        {item.title}
                      </div>
                      {/* 选中下划线 */}
                      <div className={isSelected ? "active" : "normal"} />
                    </div>
                  );
                })}
              </div>
              {/* 弹出选项 */}
              <div className="icon" onClick={showMoreMenu}>
                <img
                  style={{ width: "20px" }}
                  src={require("assets/images/icon_unfolded_down_gray.png")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  })
);

export default SelectMenu;
