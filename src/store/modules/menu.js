import createApi from '../../api/queryNoLoading';

const asideState = {
  state: {
    menuArr:
      (sessionStorage.getItem('store') &&
        JSON.parse(sessionStorage.getItem('store')).menu.menuArr) ||
      [],
    groupArr:
      (sessionStorage.getItem('store') &&
        JSON.parse(sessionStorage.getItem('store')).menu.groupArr) ||
      [],
    ownMenuArr:
      (sessionStorage.getItem('store') &&
        JSON.parse(sessionStorage.getItem('store')).menu.ownMenuArr) ||
      []
  },
  reducers: {
    setMenu(state, data) {
      // 从第二个变量开始为调用increment时传递进来的参数，后面依次类推，例如：dispatch.count.increment(10, 20)时， num1 = 10 , num2 = 20.
      return {
        ...state,
        menuArr: data
      };
    },
    setOwnMenu(state, data) {
      // 从第二个变量开始为调用increment时传递进来的参数，后面依次类推，例如：dispatch.count.increment(10, 20)时， num1 = 10 , num2 = 20.
      return {
        ...state,
        ownMenuArr: data
      };
    },
    setGroup(state, data) {
      // 从第二个变量开始为调用increment时传递进来的参数，后面依次类推，例如：dispatch.count.increment(10, 20)时， num1 = 10 , num2 = 20.
      return {
        ...state,
        groupArr: data
      };
    }
  },
  effects: dispatch => ({
    async getMenu() {
      const res = await createApi.queryMenus({ limit: 100, offset: 0 });
      if (res) {
        console.log(res.datas);
        console.log(dispatch);
        dispatch.menu.setMenu(res.datas);
      }
    },
    async getOwnMenu() {
      const obj = {
        url: `${JSON.parse(sessionStorage.getItem('user'))._id}/menus`,
        query: {
          limit: 100,
          offset: 0
        }
      };
      const res = await createApi.queryUser(obj);
      if (res) {
        console.log(res.datas);
        console.log(dispatch);
        dispatch.menu.setOwnMenu(res.datas);
      }
    },
    async getGroup() {
      const res = await createApi.queryTeams({ limit: 100, offset: 0 });
      if (res) {
        console.log(res.datas);
        console.log(dispatch);
        dispatch.menu.setGroup(res.datas);
      }
    }
  })
};

export default asideState;
