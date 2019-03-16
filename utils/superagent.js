const superagent = require('superagent');
const log4js = require('koa-log4');

const log = log4js.getLogger('request');
// const NODE_ENV = process.env.NODE_ENV;

/**
 * 请求转发 公共方法
 * $http(url, method, data, callback)
 * @param {String} url 请求地址
 * @param {String} method 请求方式
 * @param {Obejct} data 请求参数，无参传入空对象
 * @param {Object} headers 请求头设置，无需设置传入空对象
 */
async function $http(url, method, data, headers = {}) {
  // 判断参数是否都传入
  if (!url || !method || !data) {
    log.error(' ========== 配置文件请求参数配置异常 ========== ');
    throw new Error(' ========== 配置文件请求参数配置异常 ========== ');
  }

  let request = superagent;

  const URL = /^http/.test(url) ? url : `https://aaa.com${url}`;

  // 配置参数
  switch (method) {
    case 'get':
      request = request.get(URL).query(data);
      break;

    case 'put':
      request = request.put(URL).send(data);
      break;

    case 'delete':
      request = request.del(URL).send(data);
      break;

    default:
      request = request.post(URL).send(data);
      break;
  }

  // 设置请求头
  const headersLength = Object.keys(headers).length;

  headersLength <= 0
    ? log.info('无需设置请求头')
    : (() => {
        log.info(`设置请求头：${JSON.stringify(headers)}`);
        request.set(headers);
      })();

  return new Promise((resolve, reject) => {
    request.end((err, sres) => {
      log.info(sres.text);
      if (err) {
        log.error('服务器异常');
        // reject(err);
        resolve({
          code: 500,
          success: false,
          msg: '服务器出错'
        });
      }
      if (sres.status === 200) {
        resolve(sres.text);
      } else {
        log.error(`·····服务器异常httpCode为${sres.status}····`);
        resolve({
          code: 500,
          success: false,
          msg: '服务器出错'
        });
      }
    });
  });
}

module.exports = $http;
