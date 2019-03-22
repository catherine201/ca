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
