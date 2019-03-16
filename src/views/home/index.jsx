import React from 'react';
// import { Button } from 'antd';
import './home.less';
// import createApi from '../../api/registerAndLogin';
// import { getParams } from '../../utils';

// const imgSrc = require('../../assets/images/logo.png');

export default class Home extends React.Component {
  async componentWillMount() {
    this.props.history.push('/admin/user/0');
    // const authObj = {
    //   access_token: getParams('token'),
    //   appid: getParams('id')
    // };
    // const authResult = await createApi.authLogin(authObj);
    // if (authResult) {
    //   // const userObj = res.data;
    //   const userObj = {};
    //   const info = {
    //     auth_code: authResult.data.auth_code,
    //     open_id: getParams('openid')
    //   };
    //   const result = await createApi.secondLogin(info);
    //   if (result && result.access_token) {
    //     // this.props.dispatch.menu.getOwnMenu();
    //     userObj.access_token = getParams('token');
    //     userObj.openid = getParams('openid');
    //     userObj.second_access_token = result.access_token;
    //     userObj._id = result.user_id;
    //     userObj.auth_code = authResult.data.auth_code;
    //     sessionStorage.setItem('user', JSON.stringify(userObj));
    //     this.props.history.push('/admin');
    //   } else {
    //     this.$msg.error('登陆失败');
    //   }
    // }
  }

  toAdmin() {
    console.log(this);
    this.props.history.push('/admin');
  }

  render() {
    return (
      <div className="middle-box">
        {/* <div className="m-box"></div> */}
        {/* <div>
          <img src={imgSrc} alt="logo" className="home_logo" />
        </div>
        <div style={{ margin: '20px 0' }}>
          <h1>Leeker Labs 发版管理系统</h1>
        </div>
        <div>
          <Button
            className="btn-block btn-lg"
            onClick={() => {
              this.toAdmin();
            }}
          >
            进入系统...
          </Button>
        </div> */}
      </div>
    );
  }
}
