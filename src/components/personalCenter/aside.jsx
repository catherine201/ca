import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import styles from './aside.less';

function generateMenu(props, menus) {
  let items = [];
  const arr = props.location.pathname.split('/');
  // console.log(arr[arr.length - 1]);
  items = menus.map(menu => (
    <Menu.Item
      key={menu.key}
      className={
        arr[arr.length - 1] === menu.key
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

export default class Asider extends React.Component {
  state = {
    menu: [
      {
        key: '',
        path: '/personalCenter/',
        text: '个人信息'
      },
      {
        key: 'changePassword',
        path: '/personalCenter/changePassword',
        text: '变更密码'
      },
      {
        key: 'doubleCheck',
        path: '/personalCenter/doubleCheck',
        text: '双重认证'
      }
    ]
  };

  componentDidMount() {
    console.log('aside');
    const add = [
      {
        key: 'user',
        path: '/personalCenter/user',
        text: '用户管理'
      },
      {
        key: 'group',
        path: '/personalCenter/group',
        text: '分组管理'
      },
      {
        key: 'menu',
        path: '/personalCenter/menu',
        text: '菜单管理'
      }
    ];
    if (JSON.parse(sessionStorage.getItem('user')).type === 'admin') {
      this.state.menu.push(...add);
      console.log(this.state.menu);
      this.setState({
        menu: this.state.menu
      });
    }
    if (JSON.parse(sessionStorage.getItem('user')).type === 'owner') {
      this.state.menu.push({
        key: 'setting',
        path: '/personalCenter/setting',
        text: '分布文章权限管理'
      });
      console.log(this.state.menu);
      this.setState({
        menu: this.state.menu
      });
    }
  }

  render() {
    return (
      <div
        className={`personalSide ${
          this.props.isShow && document.body.clientWidth > 450
            ? `slideInLeft ${styles.personalShow}`
            : `slideInRight ${styles.personalHide}`
        }`}
      >
        <div className={styles['account-msg']}>账号管理</div>
        <Menu theme="light" className={styles['aside-menu']}>
          {generateMenu(this.props, this.state.menu)}
        </Menu>
      </div>
    );
  }
}
