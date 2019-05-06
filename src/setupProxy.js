const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/fangman', {
      // target: 'http://dashboard.api.leekerlabs.com/',
      target: 'http://192.168.10.137:8000/',
      // target: 'http://192.168.10.66:8000/',
      // target: 'http://192.168.10.111:8000/',
      changeOrigin: true,
      pathRewrite: {
        '^/fangman': ''
      }
    })
  );
  app.use(
    proxy('/log', {
      // target: 'http://passport.leekerlabs.com/',
      target: 'http://192.168.10.121:9000/',
      // target: 'http://192.168.110.116:51002/',
      changeOrigin: true,
      pathRewrite: {
        '^/log': ''
      }
    })
  );
  app.use(
    proxy('/third', {
      // target: 'http://dashboard.api.leekerlabs.com/',
      target: 'http://192.168.10.135:3033/',
      changeOrigin: true,
      pathRewrite: {
        '^/third': ''
      }
    })
  );
  app.use(
    proxy('/article', {
      // target: 'http://dashboard.api.leekerlabs.com/',
      target: 'http://192.168.10.79:9010/',
      changeOrigin: true,
      pathRewrite: {
        '^/article': ''
      }
    })
  );
  app.use(
    proxy('/oss', {
      target: 'http://wwwblockchain.oss-cn-shenzhen.aliyuncs.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/oss': ''
      }
    })
  );
};
