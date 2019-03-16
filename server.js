require('./utils/log4.js');
const fs = require('fs.promised');
const Koa = require('koa');
const path = require('path');
const staticKoa = require('koa-static');
const cors = require('koa-cors');
const log4js = require('koa-log4');
const onerror = require('koa-onerror');
const helmet = require('koa-helmet');
// const compress = require('koa-compress');
// const zlib = require('zlib');

const logger = log4js.getLogger('startup');
const onError = require('./utils/func');
// 创建服务器
const app = new Koa();

const bodyparser = require('koa-bodyparser');

app.use(bodyparser());

// 保护node 项目安全
app.use(helmet());

// 开启gzip
// app.use(
//   compress({
//     filter(contentType) {
//       return !/x-no-compression/i.test(contentType);
//     },
//     threshold: 2048,
//     flush: zlib.Z_SYNC_FLUSH
//   })
// );

// app.use((ctx, next) => {
//   ctx.compress = true;
// });

onerror(app);

// 设置允许跨域
app.use(cors());

// 错误的捕获
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
    // 手动释放error事件
    ctx.app.emit('error', err, ctx);
  }
});

// 设置静态资源的路径
const staticPath = './build';
app.use(staticKoa(path.join(__dirname, staticPath)));

// api 放在一起管理
const RouterManager = require('./routes');

const routerManager = new RouterManager(app);
routerManager.startRouters();

const main = async function(ctx, next) {
  if (ctx.request.path === '/') {
    ctx.response.type = 'html';
    ctx.response.body = await fs.readFile('./build/index.html', 'utf8');
  }
};
app.use(main);

app.listen(3333, () => {
  console.log('server is running at http://localhost:3333');
});
app.on('error', onError);
