import createApi from '../createApi';
import { serverIp } from '../server_config';

const config = {
  // 注册
  register: {
    url: '/register/name',
    method: 'post',
    options: {
      errorHandler: true,
      showLoading: true,
      baseUrl: serverIp.login
    }
  },
  // 预登录
  login: {
    url: '/users/name/login',
    method: 'post',
    options: {
      errorHandler: true,
      showLoading: false,
      baseUrl: serverIp.login
    }
  },
  authLogin: {
    url: '/api/tokens/auth_code',
    method: 'get',
    options: {
      baseUrl: serverIp.login,
      showLoading: false
    }
  },
  // 最终登录
  secondLogin: {
    url: '/login',
    method: 'post',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // article 预登录
  articleAuthLogin: {
    url: '/api/tokens/auth_code',
    method: 'get',
    options: {
      baseUrl: serverIp.login,
      showLoading: false
    }
  },
  // article 最终登录
  articleSecondLogin: {
    url: '/login',
    method: 'post',
    options: {
      baseUrl: serverIp.article,
      showLoading: false
      // baseUrl: serverIp.article
    }
  },
  // 登出
  logout: {
    url: '/logout',
    method: 'post',
    options: {
      errorHandler: false,
      showLoading: false
    }
  }
};

export default createApi(config);
