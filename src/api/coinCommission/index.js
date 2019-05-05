import createApi from '../createApi';

// 币币委托查询
const config = {
  // 表格
  getTableData: {
    url: '/coin/orders/list',
    method: 'get',
    options: {
      showLoading: false
    }
  }
};

export default createApi(config);
