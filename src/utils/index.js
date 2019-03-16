// import store from '../store';
// 进入全屏
export function requestFullScreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullScreen) {
    elem.webkitRequestFullScreen();
  } else if (elem.msRequestFullscreen) {
    // elem.msRequestFullscreen() 没有指定元素
    document.body.msRequestFullscreen();
  }
}
// 退出全屏
export function exitFullscreen() {
  const doc = document;
  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.webkitCancelFullScreen) {
    doc.webkitCancelFullScreen();
  } else if (doc.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * 从属性路径获取值
 * getValueByPath({err: {info: 'xxx'}}, ['err', 'info']) // xxx
 * @param {object} data 对象
 * @param {array} paths 路径数组；如: ['error', 'info']
 * @return {any} 返回属性路径值，不存在返回undefined
 * */
export const getValueByPath = (data, paths) => {
  function loop(obj, i) {
    if (i < paths.length - 1) {
      if (typeof obj[paths[i]] === 'undefined') {
        return undefined;
      }
      return loop(obj[paths[i]], ++i);
    }
    return obj[paths[i]];
  }
  return loop(data, 0);
};

// id to name
export function idToName(arr, menuArr) {
  let str = '';
  arr.forEach((element, index) => {
    const ind = menuArr.findIndex(item => item._id === element);
    if (ind !== -1) {
      str += index ? `,${menuArr[ind].name}` : `${menuArr[ind].name}`;
    }
  });
  if (str.startsWith(',')) {
    str = str.substring(1);
  }
  return str;
}

export function init() {
  // Warn if overriding existing method
  if (Array.prototype.equals)
    console.warn(
      "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
    );
  // attach the .equals method to Array's prototype to call it on any array
  Array.prototype.equals = function(array) {
    // if the other array is a falsy value, return
    if (!array) return false;
    // compare lengths - can save a lot of time
    if (this.length !== array.length) return false;
    for (let i = 0, l = this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].equals(array[i])) return false;
      } else if (this[i] !== array[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
    }
    return true;
  };
  // Hide method from for-in loops
  Object.defineProperty(Array.prototype, 'equals', { enumerable: false });
}

// 删除对象属性值为空的键
export function handleObj(obj) {
  Object.keys(obj).map(item => {
    if (!obj[item]) {
      delete obj[item];
    }
  });
  return obj;
}

// 节流 情景：窗口改变，用户疯狂点击，页面滚动  原理：无论用户点击多少次，在一定时间内只算一次

// export function throttle(handle, wait) {
//   let lasttime = 0;
//   return function(e) {
//     console.log(e);
//     const nowtime = new Date().getTime();
//     if (nowtime - lasttime > wait) {
//       handle.apply(this, arguments);
//       lasttime = nowtime;
//     }
//   };
// }

// 防抖 情景：密码等校验，实时search, 拖拽   原理： 当函数频繁触发的时候， 延迟执行 setTimeout

// 简单版
// export function debounce(handle, delay) {
//   let timer = null;
//   return function() {
//     const _this = this;

//     const _arg = arguments;
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       handle.apply(_this, _arg);
//     }, delay);
//   };
// } // 其中 handle 为需要进行防抖操作的函数，delay 为延迟时间

// 增加前缘触发功能  防抖
export const debounce = (fn, wait, immediate = false) => {
  let timer;

  let startTimeStamp = 0;
  let context;
  let args;

  const run = timerInterval => {
    timer = setTimeout(() => {
      const now = new Date().getTime();
      const interval = now - startTimeStamp;
      if (interval < timerInterval) {
        // the timer start time has been reset，so the interval is less than timerInterval
        console.log('debounce reset', timerInterval - interval);
        startTimeStamp = now;
        run(timerInterval - interval); // reset timer for left time
      } else {
        if (!immediate) {
          fn.apply(context, args);
        }
        clearTimeout(timer);
        timer = null;
      }
    }, timerInterval);
  };

  return function() {
    context = this;
    args = arguments;
    const now = new Date().getTime();
    startTimeStamp = now; // set timer start time

    if (!timer) {
      console.log('debounce set', wait);
      if (immediate) {
        fn.apply(context, args);
      }
      run(wait); // last timer alreay executed, set a new timer
    }
  };
};

//

// / 增加前缘  节流
export const throttle = function(fn, interval) {
  const __self = fn;
  // 保存需要被延迟执行的函数引用 timer, // 定时器

  let firstTime = true; // 是否是第一次调用
  return function() {
    const args = arguments;

    const __me = this;
    if (firstTime) {
      // 如果是第一次调用，不需延迟执行
      __self.apply(__me, args);
      return (firstTime = false);
    }
    if (timer) {
      // 如果定时器还在，说明前一次延迟执行还没有完成
      return false;
    }
    timer = setTimeout(() => {
      // 延迟一段时间执行
      clearTimeout(timer);
      timer = null;
      __self.apply(__me, args);
    }, interval || 500);
  };
};

export function getParams(key) {
  if (window.location.href.indexOf('?') !== -1) {
    const str = window.location.href.split('?')[1];
    if (str.indexOf('&') !== -1) {
      const arr = str.split('&');
      let output = '';
      arr.forEach(item => {
        const ar = item.split('=');
        if (ar[0] === key) {
          output = ar[1];
        }
      });
      return output;
    }
    const arr = str.split('=');
    if (key === arr[0]) {
      return arr[1];
    }
  }
}
