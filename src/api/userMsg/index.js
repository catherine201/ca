import createApi from '../createApi';
import { serverIp } from '../server_config';

const config = {
  // 查询用户列表  获取用户对应菜单
  queryUser: {
    url: '/accounts',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 修改用户分组
  reviseTeam: {
    url: '/accounts',
    method: 'put',
    options: {
      errorHandler: true,
      showLoading: true
    }
  },
  authLogin: {
    url: '/api/tokens/auth_code',
    method: 'get',
    options: {
      baseUrl: serverIp.login,
      showLoading: false
    }
  }
};

export default createApi(config);
