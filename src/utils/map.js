export const AdsStatus = {
  UnknownStatus: '全部',
  Created: '新创建',
  Suspended: '暂停',
  Canceled: '已取消'
};

export const AdsType = {
  UnknownStatus: '全部',
  Sell: '卖家',
  Buy: '买家'
};

export const userStatusType = {
  UnknownStatus: '全部',
  enable: '可用',
  disable: '不可用'
};

export const AdsOrderStatus = {
  UnknownStatus: '全部',
  Created: '新创建，未支付',
  Payed: '已支付',
  Pay_Timeout: '支付超时',
  Transferred: '已转账',
  Transfer_Timeout: '转账超时',
  Appealed: '已申述',
  Canceled: '已取消',
  Appealed_Done: '申诉完成',
  Finished: '已完成'
};

export const appealStatus = {
  UnknownStatus: '全部',
  Created: '新创建',
  Processed: '处理中',
  Closed: '已处理'
};

export const userVerifyStatus = {
  unknownRealNameInfoStatus: 'unknownRealNameInfoStatus',
  realNameInfoNotCommited: '未审核',
  realNameInfoCommited: '已提交待审核',
  realNameInfoVerified: '已审核'
};

export const cardType = {
  '1': '身份证',
  '2': '港澳通行证',
  '3': '护照'
};

// 实名认证
export const verifyStatus = {
  '1': '未提交',
  '2': '待审核',
  '3': '已审核'
};

export const authenStatusType = {
  undefined: 'UnknownStatus',
  '1': 'Enable',
  '2': 'Disabled'
};

// 提币记录
export const coinTxStatus = {
  CoinTxStatusSuccess: '成功',
  CoinTxStatusFailed: '失败',
  CoinTxStatusPendding: '待处理',
  CoinTxStatusRejected: '拒绝'
};

// 提币记录
export const auctionCoinType = {
  AuctionCoinTypeBuy: '抢购',
  AuctionCoinTypeSell: '拍卖'
};

// 抢拍订单状态
export const auctionOrderStatus = {
  AuctionOrderStatusUnknown: '状态',
  AuctionOrderStatusCreated: '已创建',
  AuctionOrderStatusAllocated: '已分配数量',
  AuctionOrderStatusPayed: '已付款',
  AuctionOrderStatusCancelled: '已撤销',
  AuctionOrderStatusOverdue: '逾期，买家未付款',
  AuctionOrderStatusDone: '已完成'
};
