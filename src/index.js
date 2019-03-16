// import Promise from 'promise-polyfill';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// if (!window.Promise) {
//   window.Promise = Promise;
// }
function fix(str) {
  str = `${str || ''}`;
  return str.length <= 1 ? `0${str}` : str;
}

const maps = {
  yyyy(date) {
    return date.getFullYear();
  },
  MM(date) {
    return fix(date.getMonth() + 1);
  },
  dd(date) {
    return fix(date.getDate());
  },
  HH(date) {
    return fix(date.getHours());
  },
  mm(date) {
    return fix(date.getMinutes());
  }
};

// x|y 匹配 x 或 y
const trunk = new RegExp(Object.keys(maps).join('|'), 'g');
const format = 'yyyy-MM-dd';
const date = new Date();

const result = format.replace(trunk, capture =>
  maps[capture] ? maps[capture](date) : ''
);

console.log(result);

console.log(ReactDOM);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
