import createApi from '../../api/queryNoLoading';

const asideState = {
  state: {
    initMenus:
      (sessionStorage.getItem('store') &&
        JSON.parse(sessionStorage.getItem('store')).query.initMenus) ||
      {},
    initGroup:
      (sessionStorage.getItem('store') &&
        JSON.parse(sessionStorage.getItem('store')).query.initGroup) ||
      {},
    initUser:
      (sessionStorage.getItem('store') &&
        JSON.parse(sessionStorage.getItem('store')).query.initUser) ||
      {}
  },
  reducers: {
    setMenu(state, data) {
      // 从第二个变量开始为调用increment时传递进来的参数，后面依次类推，例如：dispatch.count.increment(10, 20)时， num1 = 10 , num2 = 20.
      return {
        ...state,
        initMenus: data
      };
    },
    setGroup(state, data) {
      // 从第二个变量开始为调用increment时传递进来的参数，后面依次类推，例如：dispatch.count.increment(10, 20)时， num1 = 10 , num2 = 20.
      return {
        ...state,
        initGroup: data
      };
    },
    setUser(state, data) {
      // 从第二个变量开始为调用increment时传递进来的参数，后面依次类推，例如：dispatch.count.increment(10, 20)时， num1 = 10 , num2 = 20.
      return {
        ...state,
        initUser: data
      };
    }
  },
  effects: dispatch => ({
    async getInitMenu() {
      const res = await createApi.queryMenus({ limit: 12, offset: 0 });
      if (res) {
        console.log(res.datas);
        console.log(dispatch);
        res.init = true;
        dispatch.query.setMenu(res);
      }
    },
    async getInitUser() {
      // const obj = {
      //   url: `${JSON.parse(sessionStorage.getItem('user'))._id}/menus`,
      //   query: {
      //     limit: 6,
      //     offset: 0
      //   }
      // };
      const authObj = {
        access_token: JSON.parse(sessionStorage.getItem('user')).access_token,
        appid: 'd862b911825b21d72275420ae4456b80'
      };
      const authResult = await createApi.authLogin(authObj);
      const obj = {
        // access_token: JSON.parse(sessionStorage.getItem('user')).access_token,
        auth_code: authResult.data.auth_code,
        open_id: JSON.parse(sessionStorage.getItem('user')).openid,
        limit: 12,
        offset: 0
      };
      const res = await createApi.queryUser(obj);
      if (res) {
        console.log(res.datas);
        console.log(dispatch);
        res.init = true;
        dispatch.query.setUser(res);
      }
    },
    async getInitGroup() {
      const res = await createApi.queryTeams({ limit: 12, offset: 0 });
      if (res) {
        console.log(res.datas);
        console.log(dispatch);
        res.init = true;
        dispatch.query.setGroup(res);
      }
    }
  })
};

export default asideState;
