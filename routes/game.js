const request = require('superagent');
const Router = require('koa-router');
const BaseRouter = require('./base');
const logger = require('koa-log4').getLogger('index');
const $http = require('../utils/superagent');

// $http(url, method, data, headers)
const router = new Router();
class GameRouter extends BaseRouter {
  setUpRouter() {
    router.get('/game/dhha', async (ctx, next) => {
      ctx.body = 'gamehhha';
    });

    router.get('/game/data', async (ctx, next) => {
      // 这里的obj 是要根据请求的ctx.request 来拿的
      const obj = {
        platform: 2,
        block_index: 0
      };
      const res = await $http(
        'https://h5.ele.me/restapi/member/v1/discover',
        'get',
        obj
      );
      logger.info(res);
      // 到时候这里根据后台返回做相应的修改
      ctx.body = {
        msg: '查询成功',
        data: res,
        code: 0,
        success: true
      };
      logger.info('post-render in index page');
    });
  }

  getRouter() {
    return router;
  }
}

module.exports = GameRouter;
