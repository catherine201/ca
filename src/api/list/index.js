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
  }
};

export default createApi(config);
