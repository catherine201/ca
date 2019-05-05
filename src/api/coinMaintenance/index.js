import createApi from '../createApi';

// 交易币介绍维护
const config = {
  // 表格
  getTableData: {
    url: '/coin/baseinfos/list',
    method: 'get',
    options: {
      showLoading: false
    }
  },
  getCoinInfoById: {
    url: '/coin',
    method: 'get',
    options: {}
  },
  addCoinInfo: {
    url: '/coin/baseinfos', // /coin/baseinfos
    method: 'post',
    options: {}
  },
  updateCoinInfo: {
    url: '/coin',
    method: 'put',
    options: {}
  }
};

export default createApi(config);
