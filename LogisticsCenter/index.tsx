import * as React from "react";
import { Toast } from "antd-mobile";
import TabBar from "./components/TabBar";
import SelectMenu from "./components/SelectMenu";
import TableView from "./components/TableView";
import EmptyView, { EmptyType } from "./components/EmptyView";
import * as api from "../../services/logisticsCenter";
import * as qs from "query-string";
import {
  getNormalLogisticsList,
  getNormalSelectLogisticsList,
} from "./components/config";

import "./index.scss";

const menuList = [
  { title: "全部", code: "" },
  { title: "东莞仓", code: "00168" },
  { title: "厦门仓", code: "00600" },
  { title: "南昌仓", code: "00300" },
  { title: "长沙仓", code: "01500" },
  { title: "深圳生鲜仓", code: "00188" },
  { title: "横岗仓", code: "00189" },
  { title: "东南便利店仓", code: "00689" },
];

const normalCellTitleList = [
  {
    title: "当日库存",
    subTitle: ["SKU数", "件数(万)", "数量(万)", "未税成本金额(万)"],
    type: 1,
  },
  {
    title: "积压库存",
    subTitle: [
      "总积压未税金额(万)",
      "积压率",
      "1-2个月(万元)",
      "占比",
      "2-3个月(万元)",
      "占比",
      "3-6个月(万元)",
      "占比",
      "6-12个月(万元)",
      "占比",
      "一年以上(万元)",
      "占比",
    ],
    type: 1,
  },
];

const normalCellKeys = [
  { key: "skuNum" },
  { key: "number" },
  { key: "quantity" },
  {
    key: "untaxedCostAmount",
    style: { borderRight: "1px solid #f2f2f2", paddingRight: "10px" },
  },
  { key: "totalBacklogUntaxedAmount", style: { paddingRight: "10px" } },
  { key: "backlogRate" },
  { key: "backlog12MonthNum" },
  { key: "backlog12MonthPercent" },
  { key: "backlog23MonthNum" },
  { key: "backlog23MonthPercent" },
  { key: "backlog36MonthNum" },
  { key: "backlog36MonthPercent" },
  { key: "backlog612MonthNum" },
  { key: "backlog612MonthPercent" },
  { key: "backlog1YearNum" },
  { key: "backlog1YearPercent" },
];

const imperfectCellTitleList = [
  { subTitle: ["sku数", "件数(万)", "数量(万)", "未税金额(万)"], type: 0 },
  {
    title: "残次库存金额流动情况(万元)",
    subTitle: ["门店退货(增量)", "仓内自转(增量)", "退厂完成(增量)"],
    type: 1,
  },
  {
    title: "供应商货款情况(万元)",
    subTitle: ["可退", "贷款不足", "红字"],
    type: 1,
  },
];

const imperfectCellKeys = [
  { key: "skuNum" },
  { key: "number" },
  { key: "quantity" },
  {
    key: "untaxedCostAmount",
    style: { borderRight: "1px solid #f2f2f2", paddingRight: "10px" },
  },
  { key: "storeReturnAmount", style: { paddingLeft: "10px" } },
  { key: "warehouseRotationAmount" },
  {
    key: "completeReturnAmount",
    style: { borderRight: "1px solid #f2f2f2", paddingRight: "10px" },
  },
  { key: "refundableLoan", style: { paddingLeft: "10px" } },
  { key: "insufficientLoan" },
  { key: "deficit" },
];

interface IProps {}
interface IState {
  showMask: boolean;
  dataList: any;
  tabError: boolean;
  tabBarList: object[];
  isNormal: boolean;
  isReset: boolean;
}

class LogisticsCenter extends React.PureComponent<IProps, IState> {
  msgid: string;
  constructor(props: IProps) {
    super(props);
    const params = qs.parse(window.location.search);
    const { msgid } = params;
    this.state = {
      showMask: false,
      dataList: [],
      tabError: false,
      tabBarList: [],
      isNormal: true,
      isReset: false,
    };
    this.msgid = msgid;
  }

  // 获取Tab数据
  getTabListInfo = (params: any) => {
    Toast.loading("加载中....");
    api
      .geTabListInfo(params)
      .then((rs: any) => {
        Toast.hide();
        this.setState({ tabError: false, tabBarList: rs });
        this.getNormalAllInfo(params);
      })
      .catch((error) => {
        Toast.hide();
        this.setState({ tabError: true });
      });
  };

  // 获取正常库区全部数据
  getNormalAllInfo = (params: any) => {
    Toast.loading("加载中....");
    api
      .getNormalAllInfo(params)
      .then((rs: any) => {
        Toast.hide();
        const dataList = getNormalLogisticsList(rs, this.state.isNormal);
        this.setState({
          dataList,
        });
      })
      .catch((error) => {
        Toast.hide();
      });
  };

  // 获取正常库区选择数据
  getNormalSelectInfo = (params: any) => {
    Toast.loading("加载中....");
    api
      .getNormalSelectInfo(params)
      .then((rs: any) => {
        Toast.hide();
        const dataList = getNormalSelectLogisticsList(rs, this.state.isNormal);
        this.setState({
          dataList,
        });
      })
      .catch((error) => {
        Toast.hide();
      });
  };

  // 获取残次库存区全部数据
  getImperfectAllInfo = (params: any) => {
    Toast.loading("加载中....");
    api
      .getImperfectAllInfo(params)
      .then((rs: any) => {
        Toast.hide();
        const dataList = getNormalLogisticsList(rs, this.state.isNormal);
        this.setState({
          dataList,
        });
      })
      .catch((error) => {
        Toast.hide();
      });
  };

  // 获取残次库存区选择数据
  getImperfectSelectInfo = (params: any) => {
    Toast.loading("加载中....");
    api
      .getImperfectSelectInfo(params)
      .then((rs: any) => {
        Toast.hide();
        const dataList = getNormalSelectLogisticsList(rs, this.state.isNormal);
        this.setState({
          dataList,
        });
      })
      .catch((error) => {
        Toast.hide();
      });
  };

  // tabbar点击
  onTabBarChange = (index: number) => {
    const { isReset } = this.state;
    this.setState({ isReset: !isReset, isNormal: index === 0 }, () => {
      const msgid = this.msgid;
      if (index === 0) {
        this.getNormalAllInfo({ msgid });
      } else {
        this.getImperfectAllInfo({ msgid });
      }
    });
  };

  // 菜单选择
  onSelectMenuChange = (item: any) => {
    const emleumt = document.getElementById("logistics-table");
    const rightEmleumt = document.getElementById("lz-right-view");

    if (emleumt) {
      // emleumt.scrollTo({ top: 0, behavior: "smooth" });
      emleumt.scrollTop = 0;
    }

    if (rightEmleumt) {
      // rightEmleumt.scrollTo({ left: 0, behavior: "smooth" });
      rightEmleumt.scrollLeft = 0;
    }

    this.setState({ isReset: false });

    // 请求接口
    const paylod = { msgid: this.msgid };
    if (item.code !== "") {
      Object.assign(paylod, { storeCode: item.code });
    }
    if (this.state.isNormal) {
      if (item.code !== "") {
        this.getNormalSelectInfo(paylod);
      } else {
        this.getNormalAllInfo(paylod);
      }
    } else {
      if (item.code !== "") {
        this.getImperfectSelectInfo(paylod);
      } else {
        this.getImperfectAllInfo(paylod);
      }
    }
  };

  // 点击更多
  onShowMoreChange = (showMore: boolean) => {
    this.setState({ showMask: showMore });
    if (showMore === false) {
      // 请求接口
      const paylod = { msgid: this.msgid };
      if (this.state.isNormal) {
        this.getNormalAllInfo(paylod);
      } else {
        this.getImperfectAllInfo(paylod);
      }
    }
  };

  // 加载完成
  componentDidMount() {
    document.title = "物流中心库存日报推送";
    // 获取tablist
    this.getTabListInfo({ msgid: this.msgid });
  }

  render() {
    const {
      showMask,
      dataList = [],
      tabBarList,
      isReset,
      tabError,
      isNormal,
    } = this.state;
    const isMobile = /(iPhone|iPad|iPod|iOS|Android)/i.test(
      navigator.userAgent
    );
    return (
      <>
        {tabError ? (
          <EmptyView
            emptyType={EmptyType.emptyTypeNone}
            tipImage={require("assets/images/icon_nodata.png")}
          />
        ) : (
          <div className="logistics-center-root">
            <div className="logistics-top">
              {/* tab标签 */}
              <TabBar
                label="tabName"
                tabBarList={tabBarList}
                onTabBarChange={this.onTabBarChange}
              />
              {/* 选择菜单 */}
              {tabBarList.length && (
                <SelectMenu
                  resetSelect={isReset}
                  menuList={menuList}
                  onSelectMenuChange={this.onSelectMenuChange}
                  onShowMoreChange={this.onShowMoreChange}
                />
              )}

              {/* 分割线 */}
              <div style={{ height: "5px", backgroundColor: "#f2f2f2" }} />
            </div>

            {/* 列表 */}
            {dataList.length === 0 ? (
              <div className="logistics-empty-root">
                <EmptyView
                  className="empty-top"
                  emptyType={EmptyType.emptyTypeNone}
                  tipImage={require("assets/images/icon_nodata.png")}
                />
              </div>
            ) : (
              <div
                className="logistics-table"
                id="logistics-table"
                style={{
                  overflowY: showMask ? "hidden" : "scroll",
                  width: isMobile ? "calc(100vw - 20px)" : "620px",
                }}
              >
                {dataList.map((item: any, index: number) => {
                  return (
                    <div style={{ marginBottom: "10px" }} key={index}>
                      <TableView
                        isScroll={!showMask}
                        cellTitleList={
                          isNormal
                            ? normalCellTitleList
                            : imperfectCellTitleList
                        }
                        cellTextList={item.rightInfo}
                        cellTextKeys={
                          isNormal ? normalCellKeys : imperfectCellKeys
                        }
                        leftInfo={item.leftInfo}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* 遮罩 */}
            {this.state.showMask && (
              <div
                className="logistics-mask"
                style={{ width: isMobile ? "calc(100vw - 20px)" : "640px" }}
              ></div>
            )}
          </div>
        )}
      </>
    );
  }
}

export default LogisticsCenter;
