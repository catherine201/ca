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
  // 查询所有分组
  queryTeams: {
    url: '/teams',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 查询用户列表  获取用户对应菜单
  queryUser: {
    url: '/accounts',
    method: 'get',
    options: {
      errorHandler: true,
      showLoading: false
    }
  },
  // 添加一个分组
  addTeam: {
    url: '/teams',
    method: 'post',
    options: {
      errorHandler: true,
      showLoading: true
    }
  },
  // 修改分组
  reviseTeam: {
    url: '/teams',
    method: 'put',
    options: {
      errorHandler: true,
      showLoading: true
    }
  },
  // 删除分组
  deleteTeam: {
    url: '/teams',
    method: 'delete',
    options: {
      errorHandler: true,
      showLoading: true
    }
  }
};

export default createApi(config);
