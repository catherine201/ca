import createApi from '../createApi';
import { serverIp } from '../server_config';

const config = {
  // 权限新增
  addRights: {
    url: '/rights',
    method: 'post',
    options: {
      baseUrl: serverIp.article
    }
  },
  // 修改权限
  reviseRights: {
    url: '/rights',
    method: 'put',
    options: {
      baseUrl: serverIp.article
    }
  },
  // 查询权限
  queryRights: {
    url: '/rights',
    method: 'get',
    options: {
      showLoading: false,
      baseUrl: serverIp.article
    }
  },
  // // 模糊查询权限
  // queryRightsByName: {
  //   url: '/rights/name',
  //   options: {
  //     method: 'GET',
  //     showLoading: false
  //   }
  // },
  // 删除权限
  deleteRights: {
    url: '/rights',
    method: 'delete',
    options: {
      baseUrl: serverIp.article
    }
  }
};

export default createApi(config);
