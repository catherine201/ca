import createApi from '../createApi';

const config = {
  // 查询广告列表
  queryUser: {
    url: '/account/userinfo',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 查询广告列表
  queryAds: {
    url: '/otc/ads',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 查询广告订单详情
  queryAdsOrder: {
    url: '/account/adsorder/statistic',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 查询订单列表
  queryOrders: {
    url: '/otc/orders',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 查询实名认证列表
  queryVerification: {
    url: '/account/verification',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 实名认证提交
  verificationSubmit: {
    url: '/account/verification',
    method: 'post',
    options: {
      errorHandler: true,
      showLoading: true
    }
  },
  // 查询订单详情
  queryOrdersDetail: {
    url: '/otc/orders',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 查询申诉列表
  queryAppeal: {
    url: '/account/appeals',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 取消或者完成交易
  updateAppeal: {
    url: '/account/appeals',
    method: 'put',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 查询商户列表
  queryBussApply: {
    url: '/account/merchants',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 充币地址
  queryCoinInAddr: {
    url: '/admin/recharge/addresses',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 提现地址
  queryCoinOutAddr: {
    url: '/admin/bankcards',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 充币记录 提币记录
  queryCointxs: {
    url: '/admin/cointxs',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  //
  // 提现地址操作enable
  coinOutAddrOperate: {
    url: '/admin/bankcards',
    method: 'put',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 获取支持的币种
  queryListCoins: {
    url: '/configure/support/coins',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 获取支持的银行
  queryBankType: {
    url: '/configure/support/banks',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 新增抢拍配置
  createAuctionCoin: {
    url: '/admin/auction/coins',
    method: 'post',
    options: {
      errorHandler: true
    }
  },
  // 获取单个抢拍信息
  // 修改抢拍配置
  // 新增抢拍配置
  editAuctionCoin: {
    url: '/admin/auction/coins',
    method: 'put',
    options: {
      errorHandler: true
    }
  },
  // 获取抢拍信息list
  queryAuctionCoin: {
    url: '/admin/auction/coins',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 获取当前抢拍 抢拍记录
  queryListAuctionOrders: {
    url: '/admin/auction/orders',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 当前抢拍 编辑数量
  editAuctionOrders: {
    url: '/admin/allocate/auction/orders',
    method: 'put',
    options: {
      errorHandler: true
    }
  },
  // 撤销当前抢拍
  cancelAuctionOrder: {
    url: '/admin/cancel/auction/orders',
    method: 'put',
    options: {
      errorHandler: true
    }
  },
  // 提币记录 拒绝转出
  rejectCoinTxWithdrawRequest: {
    url: '/admin/reject/cointx/withdraw',
    method: 'put',
    options: {
      errorHandler: true
    }
  },
  // 提币记录 确认转出
  acceptCoinTxWithdraw: {
    url: '/admin/accept/cointx/withdraw',
    method: 'put',
    options: {
      errorHandler: true
    }
  }
};

export default createApi(config);
