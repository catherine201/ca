const asideState = {
  state: {
    collapsed: true,
    avatar:
      (sessionStorage.getItem('store') &&
        JSON.parse(sessionStorage.getItem('store')).aside.avatar) ||
      '',
    nickName:
      (sessionStorage.getItem('store') &&
        JSON.parse(sessionStorage.getItem('store')).aside.nickName) ||
      '',
    bindStatus:
      (sessionStorage.getItem('store') &&
        JSON.parse(sessionStorage.getItem('store')).aside.bindStatus) ||
      false
  },
  reducers: {
    setCollapse(state, data) {
      // 从第二个变量开始为调用increment时传递进来的参数，后面依次类推，例如：dispatch.count.increment(10, 20)时， num1 = 10 , num2 = 20.
      return {
        ...state,
        collapsed: data
      };
    },
    setAvatar(state, data) {
      return {
        ...state,
        avatar: data
      };
    },
    setNickName(state, data) {
      return {
        ...state,
        nickName: data
      };
    },
    setBindStatus(state, data) {
      console.log(data);
      // 从第二个变量开始为调用increment时传递进来的参数，后面依次类推，例如：dispatch.count.increment(10, 20)时， num1 = 10 , num2 = 20.
      return {
        ...state,
        bindStatus: data
      };
    }
  },
  effects: dispatch => ({
    async getAvatar(data) {
      dispatch.aside.setAvatar(data);
    },
    async getBindStatus(data) {
      dispatch.aside.setBindStatus(data);
    },
    async getNickName(data) {
      dispatch.aside.setNickName(data);
    }
  })
};

export default asideState;
