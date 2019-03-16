import axios from 'axios';
import { message } from 'antd';
import { serverIp } from './server_config';
import loadingImg from '../assets/images/loading.gif';
import store from '../store/index';

axios.defaults.baseURL = serverIp.logic;
axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// 请求前统一添加token
// axios.defaults.headers.common.authorization = getToken();
let count = 0;
// http request 拦截器
axios.interceptors.request.use(
  config => {
    count++;
    const originArr = store.getState().demo.countLoadingArr;
    originArr.push(count);
    store.dispatch.demo.setCountLoading(originArr);
    config.headers.num = count;
    if (config.method === 'get') {
      // 加个随机数解决有些ie 浏览器卡死的问题
      // config.url = `${config.url}?${Math.random()}`;
    }
    // 取消请求
    // config.cancelToken = new axios.CancelToken(cancel => {
    //   window.axiosPromiseArr.push({ cancel });
    // });
    return config;
  },
  error => Promise.reject(error)
);
// 路由切换的时候，取消请求
// router.beforeEach((to, from, next) => {
//   window.axiosPromiseArr.forEach((element, index) => {
//     element.cancel();
//     delete window.axiosPromiseArr[index];
//   });
// });

axios.interceptors.response.use(
  res => {
    const num = JSON.parse(JSON.stringify(res)).config.headers.num;
    const originArr = store.getState().demo.countLoadingArr;
    originArr.splice(originArr.indexOf(num), 1);
    store.dispatch.demo.setCountLoading(originArr);
    // if (res.data.code === 100010 || res.data.code === 100050) {
    //   message.error('This is a message of error', 1000, () => {
    //     if (Info) {
    //       window.localStorage.clear();
    //       window.location.href = '/登录';
    //     }
    //   });
    // }
    return res;
  },
  error => {
    let errorMsg = '';
    console.dir(error);
    if (error.response) {
      errorMsg = error.response.data.message;
      if (error.response.status === 401) {
        window.sessionStorage.clear();
        window.location.href = '/#/login';
      }
      // switch (error.response.status) {
      //   case 400:
      //     errorMsg = '400请求错误';
      //     break;
      //   case 401:
      //     errorMsg = 'token已过期';
      //     window.sessionStorage.clear();
      //     window.location.href = '/#/login';
      //     break;
      //   case 404:
      //     errorMsg = '404请求地址出错';
      //     break;
      //   case 408:
      //     errorMsg = '408请求超时';
      //     break;
      //   case 500:
      //     errorMsg = '500服务器内部错误';
      //     break;
      //   case 502:
      //     errorMsg = '502网关错误';
      //     break;
      //   case 504:
      //     errorMsg = '504网关超时';
      //     break;
      //   default:
      //     errorMsg = '请求失败';
      // }
    }
    errorMsg && message.error(errorMsg);
    const num = JSON.parse(JSON.stringify(error)).config.headers.num;
    const originArr = store.getState().demo.countLoadingArr;
    originArr.splice(originArr.indexOf(num), 1);
    store.dispatch.demo.setCountLoading(originArr);
    // return error;
    Promise.reject(error);
  }
);

function createDom() {
  const containerDOM = document.createElement('div');
  containerDOM.setAttribute('id', 'loadingContainer');
  containerDOM.style.cssText = `width: 100%;height: 100%;position: fixed;display: block;background: #e0e0e0;bottom: 0;text-align: center;opacity: 0.5;z-index: 5000`;
  const ImgDOM = document.createElement('img');
  ImgDOM.style.cssText = `display: inline-block;width: 2rem; height: 2rem;position: absolute;top: 50%; left: 50%; margin-top: -1rem; margin-left: -1rem;`;
  ImgDOM.setAttribute('src', loadingImg);
  containerDOM.appendChild(ImgDOM);
  document.body.appendChild(containerDOM);
}

// let loadingNum = 0;
// 遮罩层
export const loading = {
  start: () => {
    const containerDOM = document.getElementById('loadingContainer');
    if (!containerDOM) {
      createDom();
    } else {
      containerDOM.style.display = 'block';
    }
  },
  end: () => {
    setTimeout(() => {
      const containerDOM = document.getElementById('loadingContainer');
      if (containerDOM) {
        containerDOM.style.display = 'none';
      }
    }, 1000);
  }
};

export function fetchApi(param, options) {
  if (typeof options.showLoading !== 'boolean') {
    options.showLoading = true;
  }
  if (options.showLoading) {
    // if (store.getState().demo.countLoadingArr.length) {
    loading.start();
    // }
    // loadingNum++;
  }
  if (typeof options.errorHandler !== 'boolean') {
    options.errorHandler = true;
  }
  return new Promise((resolve, reject) => {
    axios(param)
      .then(response => {
        console.log(response);
        if (response) {
          if (options.errorHandler) {
            return resolve(response.data);
            // switch (response.data.code) {
            //   case 0:
            //     message.success(response.data.msg);
            //     return resolve(response.data);
            //   default:
            //     // message.error(response.data.msg);
            //     return resolve(response.data);
            // }
          }
          return resolve(response.data);
        }
      })
      .catch(error => {
        console.log(error);
        let errorMsg = '';
        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMsg = '400请求错误';
              break;
            case 401:
              errorMsg = 'token已过期';
              window.sessionStorage.clear();
              break;
            case 404:
              errorMsg = '404请求地址出错';
              break;
            case 408:
              errorMsg = '408请求超时';
              break;
            case 500:
              errorMsg = '500服务器内部错误';
              break;
            case 502:
              errorMsg = '502网关错误';
              break;
            case 504:
              errorMsg = '504网关超时';
              break;
            default:
              errorMsg = '请求失败';
          }
        } else if (error.request) {
          // errorMsg = error.message;
        } else {
          // errorMsg = error.message;
        }
        if (options.errorHandler) {
          if (options.showLoading) {
            // loadingNum--;
            if (!store.getState().demo.countLoadingArr.length) {
              console.log(errorMsg);
              // message.error(errorMsg);
              loading.end();
              return;
            }
          }
        }
        reject(error);
      })
      .then(res => {
        console.log(res);
        if (options.showLoading) {
          // loadingNum--;
          if (!store.getState().demo.countLoadingArr.length) {
            loading.end();
          }
        }
      });
  });
}

function getToken() {
  console.log(sessionStorage.getItem('user'));
  return sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).second_access_token
    : '';
}
export function get(url, data, options) {
  // console.log(options.baseUrl || serverIp);
  const param = {
    method: 'GET',
    url,
    params: data,
    baseURL: options.baseUrl || serverIp.logic,
    headers: {
      authorization: getToken()
    }
  };
  return fetchApi(param, options);
}

export function post(url, data, options) {
  console.log(options.baseUrl || serverIp.logic);
  const param = {
    method: 'POST',
    url,
    data,
    baseURL: options.baseUrl || serverIp.logic,
    headers: {
      authorization: getToken()
    }
  };
  return fetchApi(param, options);
}

export function postUploadFile(url, data, options) {
  const param = {
    method: 'POST',
    url,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: getToken()
    },
    baseURL: options.baseUrl || serverIp.logic
  };
  return fetchApi(param, options);
}

export function del(url, data, options) {
  const param = {
    method: 'DELETE',
    url,
    params: data,
    baseURL: options.baseUrl || serverIp.logic,
    headers: {
      authorization: getToken()
    }
  };
  return fetchApi(param, options);
}

export function put(url, data, options) {
  const param = {
    method: 'PUT',
    url,
    data,
    baseURL: options.baseUrl || serverIp.logic,
    headers: {
      authorization: getToken()
    }
  };
  return fetchApi(param, options);
}
