const Router = require('koa-router');

const router = new Router();
class BaseRouter {
  constructor() {
    this.setUpRouter();
  }

  setUpRouter() {}

  getRouter() {
    return router;
  }
}
module.exports = BaseRouter;
