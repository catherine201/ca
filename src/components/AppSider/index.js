import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import styles from './index.less';
// const { SubMenu } = Menu;
const { Sider } = Layout;

function generateMenu(props, menus) {
  let items = [];
  const arr = props.location.pathname.split('/');
  // console.log(arr[arr.length - 1]);
  items = menus.map(menu => (
    <Menu.Item
      key={menu.key}
      className={
        arr[arr.length - 2] === menu.key
          ? styles['list-item-active']
          : styles['list-item']
      }
    >
      <Link to={menu.path}>
        <span className="nav-text">{menu.text}</span>
      </Link>
    </Menu.Item>
  ));
  return items;
}

class AppSider extends React.Component {
  state = {
    menu: [
      {
        key: 'user',
        path: '/admin/user/0',
        text: '用户列表'
      },
      {
        key: 'ad',
        path: '/admin/ad/0',
        text: '广告列表'
      },
      {
        key: 'order',
        path: '/admin/order/0',
        text: '订单列表'
      },
      {
        key: 'appeal',
        path: '/admin/appeal/0',
        text: '申诉列表'
      },
      {
        key: 'authen',
        path: '/admin/authen/0',
        text: '实名认证'
      }
      // {
<<<<<<< HEAD
=======
      //   key: 'withdrawalConfig',
      //   path: '/admin/withdrawalConfig/0',
      //   text: '提币审核配置'
      // },
      // {
      //   key: 'withdrawalVerifi',
      //   path: '/admin/withdrawalVerifi/0',
      //   text: '提币审核'
      // }
      // {
>>>>>>> f1e60d92c3d0bf328e0b7083d5a566c15e5a1bba
      //   key: 'application',
      //   path: '/admin/application/0',
      //   text: '商户申请'
      // }
    ]
  };

  componentDidMount() {}

  toHref(target) {
    this.props.history.push(`/admin/console/${target}`);
  }

  render() {
    return (
      <Sider className="home_sider_wrap">
        <div className="menu_wrap">
          <Menu theme="light" className={styles['aside-menu']}>
            {generateMenu(this.props, this.state.menu)}
          </Menu>
        </div>
      </Sider>
    );
  }
}

export default AppSider;
