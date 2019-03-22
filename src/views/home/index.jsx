import React from 'react';
// import { Button } from 'antd';
import './home.less';
import createApi from '../../api/registerAndLogin';
import { getParams } from '../../utils';
import { loading } from '../../api/axios';

// const imgSrc = require('../../assets/images/logo.png');

export default class Home extends React.Component {
  async componentWillMount() {
    loading.start();
    // this.props.history.push('/admin/user/0');
    const authObj = {
      access_token: getParams('token'),
      appid: getParams('id')
    };
    const authResult = await createApi.authLogin(authObj);
    if (authResult) {
      // const userObj = res.data;
      const userObj = {};
      const info = {
        authcode: authResult.data.auth_code,
        openID: getParams('openid')
      };
      const result = await createApi.secondLogin(info);
      if (result && result.accessToken) {
        loading.end();
        // this.props.dispatch.menu.getOwnMenu();
        userObj.access_token = getParams('token');
        userObj.openid = getParams('openid');
        userObj.second_access_token = result.accessToken;
        userObj._id = result.accountID;
        userObj.auth_code = authResult.data.auth_code;
        sessionStorage.setItem('user', JSON.stringify(userObj));
        this.props.history.push('/admin/user/0');
      } else {
        this.$msg.error('登陆失败');
        loading.end();
      }
    } else {
      loading.end();
    }
  }

  toAdmin() {
    console.log(this);
    this.props.history.push('/admin');
  }

  render() {
    return <div className="middle-box" />;
  }
}
