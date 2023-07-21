// 正库存
function getNormalLogisticsList(rs: any, isNormal: boolean) {
  if (!rs) {
    return [];
  }

  const stockResDTOS = rs.stockResDTOS || [];
  const dataList = [];
  stockResDTOS.map((item: any, index: number) => {
    const {
      fOutOrderStoreResDTO,
      stockDtlResDTOS = [],
      totalNormalStockSendMsg = [],
      totalDefectiveStockSendMsg = [],
    } = item;
    const leftDataList = [];
    const leftStockList = [];
    const leftTotalList = [];
    const rightDataList = [];
    const rightStockList = [];
    const rightTotalList = [];
    stockDtlResDTOS.map((subItem: any, index: number) => {
      const {
        defectiveStockSendMsgs = [],
        normalStockSendMsgs = [],
        rspNameCode,
      } = subItem;
      const list = isNormal ? normalStockSendMsgs : defectiveStockSendMsgs;

      if (rspNameCode === "1") {
        // 库存管理部项
        list.map((info: any, index: number) => {
          const { deptType } = info;
          leftStockList.push({
            name: deptType === "ALL" ? "库存管理部合计" : deptType,
            type: deptType === "ALL" ? "yellow" : "normal",
          });
          Object.assign(info, {
            type: deptType === "ALL" ? "yellow" : "normal",
          });
          rightStockList.push(info);
        });
      } else {
        // 其它项
        list.map((info: any, index: number) => {
          leftTotalList.push({ name: info.deptType, type: "normal" });
          Object.assign(info, { type: "normal" });
          rightTotalList.push(info);
        });
      }
    });

    // 左数据
    leftDataList.push(...leftStockList, ...leftTotalList, {
      name: "总合",
      type: "total",
    });

    // 右数据
    const totalInfo = isNormal
      ? totalNormalStockSendMsg
      : totalDefectiveStockSendMsg;
    Object.assign(totalInfo, { type: "total" });
    rightDataList.push(...rightStockList, ...rightTotalList, totalInfo);
    const leftInfo = {
      storeName: fOutOrderStoreResDTO.storeName,
      leftDataList: [...leftDataList],
    };

    dataList.push({ leftInfo, rightInfo: rightDataList });
  });

  return dataList;
}

function getNormalSelectLogisticsList(rs: any, isNormal: boolean) {
  if (!rs) {
    return [];
  }
  const {
    totalNormalStockSendMsg = [],
    totalDefectiveStockSendMsg = [],
    fOutOrderStoreResDTO,
  } = rs;
  const stockDtlResDTOS = rs.stockDtlResDTOS || [];

  const dataList = [];

  const leftDataList = [];
  const leftStockList = [];
  const leftTotalList = [];
  const rightDataList = [];
  const rightStockList = [];
  const rightTotalList = [];
  stockDtlResDTOS.map((item: any) => {
    const {
      defectiveStockSendMsgs = [],
      normalStockSendMsgs = [],
      rspNameCode,
    } = item;
    const list = isNormal ? normalStockSendMsgs : defectiveStockSendMsgs;
    if (rspNameCode === "1") {
      // 库存管理部项
      list.map((subItem: any) => {
        const { deptType } = subItem;
        leftStockList.push({
          name: deptType === "ALL" ? "库存管理部合计" : deptType,
          type: deptType === "ALL" ? "yellow" : "normal",
        });
        Object.assign(subItem, {
          type: deptType === "ALL" ? "yellow" : "normal",
        });
        rightStockList.push(subItem);
      });
    } else {
      // 其它项
      list.map((subItem: any) => {
        leftTotalList.push({ name: subItem.deptType, type: "normal" });
        Object.assign(subItem, { type: "normal" });
        rightTotalList.push(subItem);
      });
    }
  });

  // 左数据
  leftDataList.push(...leftStockList, ...leftTotalList, {
    name: "总合",
    type: "total",
  });

  // 右数据
  const totalInfo = isNormal
    ? totalNormalStockSendMsg
    : totalDefectiveStockSendMsg;
  Object.assign(totalInfo, { type: "total" });
  rightDataList.push(...rightStockList, ...rightTotalList, totalInfo);
  const leftInfo = {
    storeName: fOutOrderStoreResDTO.storeName,
    leftDataList: [...leftDataList],
  };

  dataList.push({ leftInfo, rightInfo: rightDataList });

  return dataList;
}

export { getNormalLogisticsList, getNormalSelectLogisticsList };
