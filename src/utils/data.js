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
    key: 'person',
    title: '创建人'
  },
  {
    key: 'createID',
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
    key: 'createTime',
    title: '创建时间'
  },
  {
    key: 'last',
    title: '最后编辑时间'
  }
];

const adDetail2 = [
  {
    key: 'id',
    title: '币种'
  },
  {
    key: 'type',
    title: '初始数量'
  },
  {
    key: 'person',
    title: '单价'
  },
  {
    key: 'createID',
    title: '初始金额'
  },
  {
    key: 'status',
    title: '剩余数量'
  },
  {
    key: 'rate',
    title: '剩余金额'
  },
  {
    key: 'createTime',
    title: '交易限额'
  },
  {
    key: 'last',
    title: '交易方式'
  },
  {
    key: 'last1',
    title: '付款期限'
  },
  {
    key: 'last2',
    title: '放币期限'
  }
];

const orderDetail = [
  {
    key: 'id',
    title: '未付款'
  },
  {
    key: 'type',
    title: '未放币'
  },
  {
    key: 'person',
    title: '申诉中'
  },
  {
    key: 'createID',
    title: '已取消'
  },
  {
    key: 'createID1',
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
    key: '1',
    title: 'UDID'
  },
  {
    key: '2',
    title: '注册时间'
  },
  {
    key: '3',
    title: '昵称'
  },
  {
    key: '4',
    title: '手机号'
  },
  {
    key: '5',
    title: '姓名'
  },
  {
    key: '6',
    title: '证件类型'
  },
  {
    key: '7',
    title: '证件号'
  },
  {
    key: '8',
    title: '状态'
  },
  {
    key: '8',
    title: ''
  }
];

const userDetail2 = [
  {
    key: '1',
    title: '总交易次数'
  },
  {
    key: '2',
    title: '总成交次数'
  },
  {
    key: '3',
    title: '总成交率'
  },
  {
    key: '4',
    title: '近30日交易次数'
  },
  {
    key: '5',
    title: '近30日成交次数'
  },
  {
    key: '6',
    title: '近30日成交率'
  }
];

const userDetail3 = [
  {
    key: '1',
    title: '总申诉次数'
  },
  {
    key: '2',
    title: '总胜诉次数'
  },
  {
    key: '3',
    title: '总胜诉率'
  },
  {
    key: '4',
    title: '近30日申诉次数'
  },
  {
    key: '5',
    title: '近30日胜诉次数'
  },
  {
    key: '6',
    title: '近30日胜诉率'
  }
];

const userDetail4 = [
  {
    key: '1',
    title: '待处理订单数'
  },
  {
    key: '2',
    title: '待处理订单金额'
  },
  {
    key: '2',
    title: ''
  },
  {
    key: '3',
    title: '申诉中订单数'
  },
  {
    key: '4',
    title: '申诉中订单金额'
  },
  {
    key: '5',
    title: ''
  }
];

const userDetail5 = [
  {
    key: '1',
    title: '在线广告数'
  },
  {
    key: '2',
    title: '在线卖出广告数'
  },
  {
    key: '2',
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
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '收款人',
    dataIndex: 'person',
    key: 'person'
  },
  {
    title: '账号',
    dataIndex: 'account',
    key: 'account'
  },
  {
    title: '详情',
    dataIndex: 'detail',
    key: 'detail'
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
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '可用',
    dataIndex: 'person',
    key: 'person'
  },
  {
    title: '冻结',
    dataIndex: 'account',
    key: 'account'
  },
  {
    title: '总余额',
    dataIndex: 'detail',
    key: 'detail'
  },
  {
    title: '人民币金额',
    dataIndex: 'status',
    key: 'status'
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
    key: 'type',
    title: '状态'
  },
  {
    key: 'person',
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
    key: 'id',
    title: '金额'
  },
  {
    key: 'type',
    title: '数量'
  },
  {
    key: 'person',
    title: '参考码'
  },
  {
    key: 'createID',
    title: '买方'
  },
  {
    key: 'createID1',
    title: '卖方'
  },
  {
    key: 'type',
    title: '交易方式'
  },
  {
    key: 'person',
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
    key: 'type',
    title: '申诉状态'
  },
  {
    key: 'person',
    title: '订单ID'
  },
  {
    key: 'createID',
    title: '广告ID'
  },
  {
    key: 'createID1',
    title: '买方'
  },
  {
    key: 'id',
    title: '卖方'
  },
  {
    key: 'type',
    title: '金额'
  },
  {
    key: 'person',
    title: 'ETH数量'
  },
  {
    key: 'createID',
    title: '交易方式'
  },
  {
    key: 'createID1',
    title: '付款参考号'
  },
  {
    key: 'type',
    title: '订单创建时间'
  },
  {
    key: 'person',
    title: '付款确认时间'
  },
  {
    key: 'createID1',
    title: '放币确认时间'
  },
  {
    key: 'createID',
    title: '申诉开始时间'
  },
  {
    key: 'createID1',
    title: '申诉结束时间'
  },
  {
    key: 'createID1',
    title: '订单处理结果'
  }
];
