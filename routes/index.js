const DemoRouter = require('./demo');
const GameRouter = require('./game');

class RouterManager {
  constructor(app) {
    this.app = app;
    // this.startRouters();
  }

  //   setApp(app) {
  //     this.app = app;
  //   }

  startRouters() {
    this.app.use(new DemoRouter().getRouter().routes());
    this.app.use(new GameRouter().getRouter().routes());
    // fs.readdir('./routes', (err, files) => {
    //   console.log(err);
    //   console.log(files);
    //   files.forEach(element => {
    //     console.log(element);
    //     fs.readFile(`./routes/${element}`, (err, data) => {
    //       console.log(data.toString());
    //     });
    //   });
    // });
  }
}

module.exports = RouterManager;

// app.use(router.routes());
