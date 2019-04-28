import React from 'react';
import Loadable from 'react-loadable';
import Router from 'react-concise-router';
// import NProgress from 'NProgress';
import AppLayout from '../components/AppLayout';
import store from '../store';

const Loading = () => <div>Loading...</div>;

const page = name =>
  Loadable({
    loader: () => import(`../views/${name}`),
    loading: Loading
    // delay: 200,
    // timeout: 10000
  });

console.dir(page('personalCenter/userMsg'));
console.dir(page('personalCenter/groupMsg'));

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/', component: page('home') },
    // { path: '/login', component: page('login') },
    // { path: '/authLogin', component: page('authLogin') },
    // { path: '/register', component: page('register') },
    {
      path: '/admin',
      component: AppLayout,
      name: 'admin-view',
      children: [
        { path: '/', component: page('user') },
        { path: '/user/:userId', component: page('user') },
        { path: '/ad/:adId', component: page('advert') },
        { path: '/order/:orderId', component: page('order') },
        { path: '/appeal/:appealId', component: page('appeal') },
        { path: '/coinInAddr', component: page('userMsg/coinInAddr') },
        { path: '/coinOutAddr', component: page('userMsg/coinOutAddr') },
        {
          path: '/platCoinInRecord',
          component: page('financialMsg/platCoinInRecord')
        },
        { path: '/coinInRecord', component: page('financialMsg/coinInRecord') },
        {
          path: '/coinOutRecord',
          component: page('financialMsg/coinOutRecord')
        },
        {
          path: '/currSnatch',
          component: page('transactionMsg/currSnatch')
        },
        {
          path: '/snatchRecord',
          component: page('transactionMsg/snatchRecord')
        },
        {
          path: '/snatchConfig',
          component: page('transactionMsg/snatchConfigList')
        },
        {
          path: '/snatchDetail/:snatchId',
          component: page('transactionMsg/snatchConfigDetail')
        },
        {
          // 提币审核配置
          path: '/withdrawalConfig/:withdrawalConfigId',
          component: page('withdrawalConfig')
        },
        {
          // 提币审核
          path: '/withdrawalVerifi/:withdrawalVerifiId',
          component: page('withdrawalVerifi')
        },
        {
          // 交易币介绍维护
          path: '/transactionMaintenance/:transactionMaintenanceId',
          component: page('transactionMaintenance')
        },
        {
          // 交易币介绍维护 -> 币种编辑
          path:
            '/transactionMaintenance/transactionCoinEdit/:transactionCoinEditId',
          component: page('transactionCoinEdit')
        },
        {
          // 币币委托查询
          path: '/bitcoinCommission/:bitcoinCommissionId',
          component: page('bitcoinCommission')
        },
        {
          // 币币成交查询
          path: '/bitcoinTransaction/:bitcoinTransactionId',
          component: page('bitcoinTransaction')
        },
        { path: '/authen/:authenId', component: page('authen') },
        { path: '/application/:applicationId', component: page('application') },
        { name: 404, component: page('404') }
      ]
    },
    { name: 404, component: page('404') }
  ]
});

// const modulesContext = require.context('../views/', true, /route\.js$/);
// modulesContext.keys().forEach(element => {
//   console.log(element);
//   // console.log(modulesContext(element).default);
//   routes.push(...modulesContext(element).default);
// });

router.beforeEach = function(ctx, next) {
  NProgress.start();
  store.dispatch.demo.setCountLoading([]);
  next();
  setTimeout(() => {
    NProgress.done();
  }, 300);
};
export default router;
