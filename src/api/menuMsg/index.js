import createApi from '../createApi';

const config = {
  // 查询所有菜单
  queryMenus: {
    url: '/menus',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 添加一个菜单
  addMenu: {
    url: '/menus',
    method: 'post',
    options: {
      errorHandler: true,
      showLoading: true
    }
  },
  // 修改菜单
  reviseMenu: {
    url: '/menus',
    method: 'put',
    options: {
      errorHandler: true,
      showLoading: true
    }
  },
  // 删除菜单
  deleteMenu: {
    url: '/menus',
    method: 'delete',
    options: {
      errorHandler: true,
      showLoading: true
    }
  }
};

export default createApi(config);
