import createApi from '../../api/rights';
// import store from '../index';

const asideState = {
  state: {
    initMenus:
      (sessionStorage.getItem('store') &&
        JSON.parse(sessionStorage.getItem('store')).rights.initMenus) ||
      {}
  },
  reducers: {
    setMenu(state, data) {
      return {
        ...state,
        initMenus: data
      };
    }
  },
  effects: dispatch => ({
    // 权限新增
    async addRights(obj) {
      const res = await createApi.addRights(obj);
      if (res) {
        return new Promise(resolve => resolve(res));
      }
    },
    // 修改权限
    async reviseRights(obj) {
      const res = await createApi.reviseRights(obj);
      if (res) {
        return new Promise(resolve => resolve(res));
      }
    },
    // 删除权限
    async deleteRights(obj) {
      const res = await createApi.deleteRights(obj);
      if (res) {
        return new Promise(resolve => resolve(res));
      }
    },
    // 查询权限
    async getInitMenu(
      obj = {
        access_token: JSON.parse(sessionStorage.getItem('user'))
          .second_access_token,
        limit: 7,
        offset: 0
      }
    ) {
      const res = await createApi.queryRights(obj);
      if (res) {
        res.init = true;
        dispatch.rights.setMenu(res);
        return new Promise(resolve => resolve(res));
      }
    }
    // // 模糊查询权限
    // async getMenu(obj) {
    //   const res = await createApi.queryRightsByName(obj);
    //   if (res) {
    //     res.init = true;
    //     dispatch.rights.setMenu(res);
    //     return new Promise(resolve => resolve(res));
    //   }
    // }
    // async getArticleFolder(sendObj = {}) {
    //   const obj = {
    //     access_token:
    //       sendObj.access_token ||
    //       JSON.parse(sessionStorage.getItem('user')).second_access_token,
    //     limit: sendObj.limit || 17,
    //     offset: sendObj.offset || 0
    //   };
    //   const res = await createApi.queryFolders(obj);
    //   if (res && res.data) {
    //     const result = res;
    //     if (sendObj.add === 'add') {
    //       const datas = store.getState().article.articleFolder.data.datas;
    //       datas.push(...res.data.datas);
    //       result.data.datas = datas;
    //     }
    //     result.init = true;
    //     dispatch.article.setArticleFolder(result);
    //     return new Promise(resolve => resolve(result));
    //   }
    // }
  })
};

export default asideState;
