import createApi from '../createApi';

// 币币成交查询
const config = {
  // 表格
  getTableData: {
    url: '/coin/trades/list',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  }
};

export default createApi(config);
