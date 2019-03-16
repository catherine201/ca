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
  });

console.dir(page('personalCenter/userMsg'));
console.dir(page('personalCenter/groupMsg'));

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/', component: page('home') },
    { path: '/login', component: page('login') },
    { path: '/authLogin', component: page('authLogin') },
    { path: '/register', component: page('register') },
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
        { path: '/authen/:authenId', component: page('authen') },
        { path: '/application/:applicationId', component: page('application') },
        { name: 404, component: page('404') }
      ]
    },
    {
      path: '/personalCenter',
      component: AppLayout,
      name: 'personalCenter-view',
      children: [
        {
          path: '/',
          name: 'info',
          component: page('personalCenter/info')
        }, // 个人信息
        {
          path: '/changePassword',
          name: 'changePassword',
          component: page('personalCenter/changePassword')
        }, // 修改密码
        {
          path: '/binding',
          name: 'binding',
          component: page('personalCenter/binding')
        }, // 绑定
        {
          path: '/safetyCheck',
          name: 'safetyCheck',
          component: page('personalCenter/safetyCheck')
        }, // 安全验证
        {
          path: '/doubleCheck',
          name: 'doubleCheck',
          component: page('personalCenter/doubleCheck')
        }, // 安全验证
        {
          path: '/console',
          name: 'console',
          component: page('personalCenter/console')
        }, // 控制台
        {
          path: '/user',
          name: 'user',
          component: page('personalCenter/userMsg')
        }, // 用户管理
        {
          path: '/group',
          name: 'group',
          component: page('personalCenter/groupMsg')
        }, // 分组管理
        {
          path: '/menu',
          name: 'menu',
          component: page('personalCenter/menuMsg')
        }, // 菜单管理
        {
          path: '/setting',
          name: 'setting',
          component: page('personalCenter/setting')
        }, // 文章发布权限管理
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
