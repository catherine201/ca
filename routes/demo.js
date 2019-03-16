const Router = require('koa-router');
const BaseRouter = require('./base');
const logger = require('koa-log4').getLogger('index');

const router = new Router();
class DemoRouter extends BaseRouter {
  // constructor() {
  //     super();
  //     // this.setUpRouter();
  // }

  setUpRouter() {
    router.get('/demo/dhha', async (ctx, next) => {
      ctx.body = 'nihhha';
    });

    router.get('/demo/daa', async (ctx, next) => {
      ctx.body = 'demonihao';
      logger.info('post-render in index page');
    });
  }

  getRouter() {
    return router;
  }
}

module.exports = DemoRouter;
