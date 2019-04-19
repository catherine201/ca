const adDetail1 = [
  {
    key: 'id',
    title: '广告ID'
  },
  {
    key: 'type',
    title: '广告类型'
  },
  {
    key: 'createPerson',
    title: '创建人'
  },
  {
    key: 'createPersonId',
    title: '创建人UID'
  },
  {
    key: 'status',
    title: '状态'
  },
  {
    key: 'rate',
    title: '广告费率'
  },
  {
    key: 'createdTime',
    title: '创建时间'
  },
  {
    key: 'updatedTime',
    title: '最后编辑时间'
  }
];

const adDetail2 = [
  {
    key: 'coinType',
    title: '币种'
  },
  {
    key: 'amountTotal',
    title: '初始数量'
  },
  {
    key: 'price',
    title: '单价'
  },
  {
    key: 'initAmount',
    title: '初始金额'
  },
  {
    key: 'amount',
    title: '剩余数量'
  },
  {
    key: 'balanceAmount',
    title: '剩余金额'
  },
  {
    key: 'priceControl',
    title: '交易限额'
  },
  {
    key: 'payMethod',
    title: '交易方式'
  }
  // {
  //   key: 'last1',
  //   title: '付款期限'
  // },
  // {
  //   key: 'last2',
  //   title: '放币期限'
  // }
];

const orderDetail = [
  {
    key: 'Unpaid',
    title: '未付款'
  },
  {
    key: 'WaitForTransaction',
    title: '未放币'
  },
  {
    key: 'Appealed',
    title: '申诉中'
  },
  {
    key: 'Cancel',
    title: '已取消'
  },
  {
    key: 'Deal',
    title: '已成交'
  }
];

export const initOrderDetailData = {
  adDetail1,
  adDetail2,
  orderDetail
};

const userDetail1 = [
  {
    key: 'openId',
    title: 'UDID'
  },
  {
    key: 'createdTime',
    title: '注册时间'
  },
  {
    key: 'nickName',
    title: '昵称'
  },
  {
    key: 'phone',
    title: '手机号'
  },
  {
    key: 'name',
    title: '姓名'
  },
  // {
  //   key: '6',
  //   title: '证件类型'
  // },
  // {
  //   key: '7',
  //   title: '证件号'
  // },
  {
    key: 'status',
    title: '状态'
  }
  // {
  //   key: '8',
  //   title: ''
  // }
];

const userDetail2 = [
  {
    key: 'txTotal',
    title: '总交易次数'
  },
  {
    key: 'dealTotal',
    title: '总成交次数'
  },
  {
    key: 'dealRate',
    title: '总成交率'
  },
  {
    key: 'txTotal30',
    title: '近30日交易次数'
  },
  {
    key: 'dealTotal30',
    title: '近30日成交次数'
  },
  {
    key: 'dealRate30',
    title: '近30日成交率'
  }
];

const userDetail3 = [
  {
    key: 'appealTotal',
    title: '总申诉次数'
  },
  {
    key: 'winCaseTotal',
    title: '总胜诉次数'
  },
  {
    key: 'winRate',
    title: '总胜诉率'
  },
  {
    key: 'appealTotal30',
    title: '近30日申诉次数'
  },
  {
    key: 'winCaseTotal30',
    title: '近30日胜诉次数'
  },
  {
    key: 'winRate30',
    title: '近30日胜诉率'
  }
];

const userDetail4 = [
  {
    key: 'pendingOrderCnt',
    title: '待处理订单数'
  },
  {
    key: 'pendingOrderValue',
    title: '待处理订单金额'
  },
  {
    key: '2',
    title: ''
  },
  {
    key: 'appealOrderCnt',
    title: '申诉中订单数'
  },
  {
    key: 'appealOrderValue',
    title: '申诉中订单金额'
  },
  {
    key: '5',
    title: ''
  }
];

const userDetail5 = [
  {
    key: 'onlineOrderCnt',
    title: '在线广告数'
  },
  {
    key: 'onlineSellOrderCnt',
    title: '在线卖出广告数'
  },
  {
    key: 'onlineBuyOrderCnt',
    title: '在线买入广告数'
  }
];

const receiveType = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key'
  },
  {
    title: '收款方式',
    dataIndex: 'bankcardNumber',
    key: 'bankcardNumber'
  },
  {
    title: '收款人',
    dataIndex: 'bankcardOwner',
    key: 'bankcardOwner'
  },
  {
    title: '账号',
    dataIndex: 'bankcardAddress',
    key: 'bankcardAddress'
  },
  {
    title: '详情',
    dataIndex: 'qrCodeImageUrl',
    key: 'qrCodeImageUrl',
    render: text => <image src={text} />
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  }
];

const assetDetail = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key'
  },
  {
    title: '币种',
    dataIndex: 'currency',
    key: 'currency'
  },
  {
    title: '可用',
    dataIndex: 'available',
    key: 'available'
  },
  {
    title: '冻结',
    dataIndex: 'freeze',
    key: 'freeze'
  },
  {
    title: '总余额',
    dataIndex: 'total',
    key: 'total'
  },
  {
    title: '人民币金额',
    dataIndex: 'value',
    key: 'value'
  }
];

export const userDate = {
  userDetail1,
  userDetail2,
  userDetail3,
  userDetail4,
  userDetail5,
  receiveType,
  assetDetail
};

export const orderDetailData = [
  {
    key: 'id',
    title: '订单ID'
  },
  {
    key: 'status',
    title: '状态'
  },
  {
    key: 'adsID',
    title: '广告ID'
  },
  {
    key: 'createID',
    title: '币种'
  },
  {
    key: 'createID1',
    title: '单价'
  },
  {
    key: 'feeCNY',
    title: '金额'
  },
  {
    key: 'amount',
    title: '数量'
  },
  {
    key: 'referenceNO',
    title: '参考码'
  },
  {
    key: 'buyer',
    title: '买方'
  },
  {
    key: 'seller',
    title: '卖方'
  },
  {
    key: 'type',
    title: '交易方式'
  },
  {
    key: 'createdTime',
    title: '下单时间'
  },
  {
    key: 'createID',
    title: '付款确认时间'
  },
  {
    key: 'createID1',
    title: '放币确认时间'
  },
  {
    key: 'createID',
    title: '交易结束时间'
  },
  {
    key: 'createID1',
    title: '申诉ID'
  },
  {
    key: 'createID1',
    title: '申诉发起时间'
  },
  {
    key: 'empty',
    title: ''
  }
];

export const appealDetailData = [
  {
    key: 'id',
    title: '申诉ID'
  },
  {
    key: 'status',
    title: '申诉状态'
  },
  {
    key: 'orderID',
    title: '订单ID'
  },
  {
    key: 'adsID',
    title: '广告ID'
  },
  {
    key: 'buyer',
    title: '买方'
  },
  {
    key: 'seller',
    title: '卖方'
  },
  {
    key: 'feeCNY',
    title: '金额'
  },
  {
    key: 'person',
    title: 'ETH数量'
  },
  {
    key: 'payMethod',
    title: '交易方式'
  },
  {
    key: 'referenceNO',
    title: '付款参考号'
  },
  {
    key: 'orderCreatedTime',
    title: '订单创建时间'
  },
  {
    key: 'payTime',
    title: '付款确认时间'
  },
  {
    key: 'releaseCoinTime',
    title: '放币确认时间'
  },
  {
    key: 'createdTime',
    title: '申诉开始时间'
  },
  {
    key: 'endTime',
    title: '申诉结束时间'
  },
  {
    key: 'orderaStatus',
    title: '订单处理结果'
  }
];

export const authenDetailData = [
  {
    key: 'uid',
    title: 'UDID'
  },
  {
    key: 'nickName',
    title: '昵称'
  },
  {
    key: 'phone',
    title: '手机号'
  },
  {
    key: 'cerAuthen',
    title: '实名认证'
  },
  {
    key: 'name',
    title: '姓名'
  },
  {
    key: 'cerType',
    title: '证件类型'
  },
  {
    key: 'serialNo',
    title: '证件号'
  },
  {
    key: 'createdTime',
    title: '认证时间'
  },
  {
    key: 'accountStatus',
    title: '状态'
  },
  {
    key: '',
    title: ''
  }
];
