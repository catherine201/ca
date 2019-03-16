const path = require('path');
const log4js = require('koa-log4');

const appDir = path.resolve(__dirname, '..');
const logDir = path.join(appDir, 'logs');
const fss = require('fs');
/**
 * make a log directory, just in case it isn't there.
 */
try {
  fss.mkdirSync(logDir);
} catch (e) {
  if (e.code !== 'EEXIST') {
    console.error('Could not set up log directory, error was: ', e);
    process.exit(1);
  }
}
log4js.configure(path.join(appDir, 'log4js.json'), { cwd: logDir });
