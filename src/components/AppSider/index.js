import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
// import { Link } from 'react-router-dom';
import styles from './index.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

function generateMenu(props, menus, that) {
  let items = [];
  console.log(props.location);
  const arr = props.location.pathname.split('/');
  console.log(arr[2]);
  items = menus.map(menu => {
    if (Array.isArray(menu.subMenu)) {
      return (
        <SubMenu
          key={menu.key}
          title={
            <div>
              <span>{menu.text}</span>
            </div>
          }
          className={
            arr[2] === menu.key
              ? styles['list-item-active']
              : styles['list-item']
          }
        >
          {generateMenu(props, menu.subMenu, that)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item
        key={menu.key}
        className={
          arr[2] === menu.key ? styles['list-item-active'] : styles['list-item']
        }
        onClick={() => {
          that.toHref(menu.path);
        }}
      >
        {/* <Link to={menu.path}>
          <span className="nav-text">{menu.text}</span>
        </Link> */}
        <span className="nav-text">{menu.text}</span>
      </Menu.Item>
    );
  });
  console.dir(items);
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
      },
      // {
      //   key: 'application',
      //   path: '/admin/application/0',
      //   text: '商户申请'
      // },
      // {
      //   key: 'withdrawalConfig',
      //   path: '/admin/withdrawalConfig/0',
      //   text: '提币审核配置'
      // },
      // {
      //   key: 'withdrawalVerifi',
      //   path: '/admin/withdrawalVerifi/0',
      //   text: '提币审核'
      // },
      {
        key: 'transactionMaintenance',
        path: '/admin/transactionMaintenance/0',
        text: '交易币介绍维护'
      },
      {
        key: 'bitcoinCommission',
        path: '/admin/bitcoinCommission/0',
        text: '币币委托查询'
      },
      {
        key: 'bitcoinTransaction',
        path: '/admin/bitcoinTransaction/0',
        text: '币币成交查询'
      },
      {
        key: 'userMsg',
        text: '用户管理',
        // path: '/admin/user/1',
        subMenu: [
          { key: 'coinInAddr', path: '/admin/coinInAddr/', text: '充币地址' },
          { key: 'coinOutAddr', path: '/admin/coinOutAddr/', text: '提现地址' }
        ]
      },
      {
        key: 'financialMsg',
        text: '财务管理',
        // path: '/admin/user/1',
        subMenu: [
          {
            key: 'platCoinInRecord',
            path: '/admin/platCoinInRecord/',
            text: '平台充币统计'
          },
          {
            key: 'coinInRecord',
            path: '/admin/coinInRecord/',
            text: '充币记录'
          },
          {
            key: 'coinOutRecord',
            path: '/admin/coinOutRecord/',
            text: '提币记录'
          }
        ]
      },
      {
        key: 'transactionMsg',
        text: '交易管理',
        // path: '/admin/user/1',
        subMenu: [
          {
            key: 'snatchConfig',
            path: '/admin/snatchConfig',
            text: '抢拍配置列表'
          },
          { key: 'currSnatch', path: '/admin/currSnatch/', text: '当前抢拍' },
          {
            key: 'snatchRecord',
            path: '/admin/snatchRecord/',
            text: '抢拍记录'
          }
        ]
      }
      // {
      //   key: 'application',
      //   path: '/admin/application/0',
      //   text: '商户申请'
      // }
    ]
  };

  // componentDidMount() {
  //   // 监听路由变化
  //   this.props.history.listen(route => {
  //     console.log(route);
  //     console.log(this);
  //     console.log('路由变化了》》》》》》》');
  //     this.props.dispatch.searchOption.resetPagination();
  //     this.props.dispatch.searchOption.resetSearchObj();
  //   });
  // }

  // componentWillReceiveProps() {
  //   this.props.dispatch.searchOption.resetPagination();
  //   this.props.dispatch.searchOption.resetSearchObj();
  // }

  toHref(target) {
    console.log(this);
    this.props.resetPagination();
    this.props.resetSearchObj();
    console.log(this.props.pagination);
    setTimeout(() => {
      this.props.history.push(target);
    }, 5);
  }

  render() {
    return (
      <Sider className="home_sider_wrap">
        <div className="menu_wrap">
          <Menu
            theme="light"
            className={styles['aside-menu']}
            mode="inline"
            defaultOpenKeys={['userMsg', 'financialMsg', 'transactionMsg']}
          >
            {generateMenu(this.props, this.state.menu, this)}
          </Menu>
        </div>
      </Sider>
    );
  }
}
// const mapDispatchToProps = dispatch => {
//   console.log(dispatch);
//   return {
//     resetPagination: dispatch.searchOption.resetPagination,
//     resetSearchObj: dispatch.searchOption.resetSearchObj
//   };
// };
const mapStateToProps = state => ({
  pagination: state.searchOption.pagination,
  searchObj: state.searchOption.searchObj
});
const mapDispatchToProps = dispatch => {
  console.dir(dispatch);
  return {
    resetPagination: dispatch.searchOption.resetPagination,
    resetSearchObj: dispatch.searchOption.resetSearchObj
  };
};
// export default AppSider;
// export default connect(mapDispatchToProps)(AppSider);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSider);
