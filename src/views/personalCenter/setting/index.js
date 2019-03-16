import React from 'react';
import { Table, Input, Button, Icon, Divider, Modal } from 'antd';
import { connect } from 'react-redux';
import AddEditMenu from './add';
import styles from './index.less';
import createApi from '../../../api/registerAndLogin';

let second_access_token = '';

const init = async function() {
  const authObj = {
    access_token: JSON.parse(sessionStorage.getItem('user')).access_token,
    appid: '79ae03d05626dcc0c5c207e0cdc682b6'
  };
  const authResult = await createApi.articleAuthLogin(authObj);
  if (authResult) {
    const info = {
      auth_code: authResult.data.auth_code,
      openid: JSON.parse(sessionStorage.getItem('user')).openid
    };
    const result = await createApi.articleSecondLogin(info);
    if (result) {
      second_access_token = result.data.access_token;
      console.log(second_access_token);
    }
  }
};
class Console extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      clientHeight: document.body.offsetHeight - 400, // 屏幕高度
      // searchText: '', // table里面的search
      menuNameInput: '', // 头部的查询
      // menuAddrInput: '',
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 7
      },
      showModal: 0, // 0 表示不显示modal 1 表示显示 新增菜单  2 表示显示 编辑菜单
      // data: [],
      sendData: {}, // 发送给新增编辑组件的值
      limit: 7, // 一页多少个项
      searchFlag: false
    };
  }

  async componentWillMount() {
    await init();
    const obj = {
      access_token: second_access_token,
      // name: this.state.menuNameInput, // name 不传就是查询所有
      limit: 7,
      offset: 0
    };
    // !this.props.initMenus.init &&
    this.props.getInitMenu(obj).then(res => {
      if (res.data.data.length) {
        const pagination = { ...this.state.pagination };
        pagination.total = res.data.page.total;
        this.setState({
          pagination
        });
      }
    });
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        clientHeight: document.body.offsetHeight - 400
      });
    });
  }

  searchByName = () => {
    const obj = {
      access_token: second_access_token,
      name: this.state.menuNameInput,
      limit: 7,
      offset: 0
    };
    this.props.getInitMenu(obj).then(res => {
      console.log(res);
      if (res.data.data.length) {
        const pagination = { ...this.state.pagination };
        pagination.current = 1;
        pagination.total = res.data.page.total;
        this.setState({
          pagination,
          searchFlag: true
          // menuNameInput: ''
        });
        console.log(this.state.searchFlag);
      }
    });
  };

  moDalTitle = () => {
    switch (this.state.showModal) {
      case 1:
        return '新增权限';
      case 2:
        return '编辑权限';
      default:
        return '';
    }
  };

  handleTableChange = pagination => {
    // console.log(pagination);
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    const obj = {
      access_token: second_access_token,
      limit: 7,
      offset: (pagination.current - 1) * this.state.limit
    };
    this.state.searchFlag &&
      this.state.menuNameInput &&
      (obj.name = this.state.menuNameInput);
    this.props.getInitMenu(obj).then(result => {
      result &&
        this.setState({
          showModal: 0,
          pagination: pager
        });
    });
    // this.queryMenus(obj);
    // this.setState({
    //   pagination: pager
    // });
  };

  changeMenuName = e => {
    this.setState({
      menuNameInput: e.target.value
    });
  };

  emitEmptyName = () => {
    this.menuNameInput.focus();
    this.setState({ menuNameInput: '' });
  };

  handleOk = e => {
    console.log(e);
    // const sendData = this.state.sendData;
    switch (this.state.showModal) {
      case 1: // 新增 调接口
        // console.log(this.state.sendData);
        this.formRef.props.form.validateFields((err, values) => {
          console.log(values);
          if (!err) {
            console.log(values);
            const obj = {
              access_token: second_access_token,
              user_name: values.user_name,
              path_name: values.path_name
            };
            this.props.addRights(obj).then(res => {
              if (res) {
                const sendObj = {
                  access_token: second_access_token,
                  limit: 7,
                  offset: 0
                };
                this.props.getInitMenu(sendObj).then(result => {
                  result &&
                    this.setState({
                      showModal: 0,
                      menuNameInput: ''
                    });
                });
              }
            });
          }
        });
        break;
      case 2: // 修改  调接口
        // console.log(this.state.sendData);
        // const obj = {
        //   url: '555',
        //   query: this.state.sendData
        // };
        this.formRef.props.form.validateFields((err, values) => {
          console.log(values);
          if (!err) {
            console.log(values);
            const obj = {
              url: this.state.sendData._id,
              query: {
                path_name: values.path_name,
                access_token: second_access_token
              }
            };
            this.props.reviseRights(obj).then(res => {
              if (res) {
                const sendObj = {
                  access_token: second_access_token,
                  limit: 7,
                  offset: 0
                };
                this.props.getInitMenu(sendObj).then(result => {
                  result &&
                    this.setState({
                      showModal: 0,
                      menuNameInput: ''
                    });
                });
              }
            });
          }
        });
        break;
      default:
        break;
    }
  };

  handleCancel = () => {
    this.setState({
      showModal: 0
    });
  };

  toShowModal = (e, num, data) => {
    console.log(data);
    switch (num) {
      case 1:
        this.setState({
          sendData: {
            user_name: '',
            path_name: ''
          }
        });
        break;
      case 2:
        this.setState({
          sendData: JSON.parse(JSON.stringify(data))
        });
        break;
      default:
        break;
    }
    this.setState({
      showModal: num
    });
  };

  handleEdit = val => {
    this.setState({
      showModal: val
    });
  };

  searchMenuInfo = () => {};

  deleteHandle = (e, data) => {
    this.$modal.confirm({
      title: '你确定删除么？',
      content: '',
      okText: '确定',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        const obj = {
          url: data._id,
          query: { access_token: second_access_token }
        };
        this.props.deleteRights(obj).then(res => {
          this.setState({
            menuNameInput: ''
          });
          if (res) {
            const sendObj = {
              access_token: second_access_token,
              limit: 7,
              offset: 0
            };
            this.props.getInitMenu(sendObj);
          }
        });
      }
    });
  };

  render() {
    // const { initMenus } = this.props;
    const nameSuffix = this.state.menuNameInput ? (
      <Icon type="close-circle" onClick={this.emitEmptyName} />
    ) : null;
    // const addrSuffix = this.state.menuAddrInput ? (
    //   <Icon type="close-circle" onClick={this.emitEmptyAddr} />
    // ) : null;
    const columns = [
      {
        title: '用户名称',
        dataIndex: 'user_name',
        key: 'user_name',
        width: '35%'
      },
      {
        title: '权限模块',
        dataIndex: 'path_name',
        key: 'path_name',
        width: '35%'
      },
      {
        title: '操作',
        render: text => (
          <div className={`action ${styles.action}`}>
            <Button type="primary" onClick={e => this.toShowModal(e, 2, text)}>
              编辑
            </Button>
            <Button type="danger" onClick={e => this.deleteHandle(e, text)}>
              删除
            </Button>
          </div>
        )
      }
    ];
    const { sendData, clientHeight } = this.state;
    return (
      <div className={`menuMsg_wrapper ${styles.menuMsg_wrapper}`}>
        <div className={`query ${styles.query}`}>
          <h2 className={`main_title ${styles.main_title}`}>筛选条件: </h2>
          <div className={`${styles.query_line}`}>
            <Input
              placeholder="请输入用户名称"
              value={this.state.menuNameInput}
              onChange={e => this.changeMenuName(e)}
              onPressEnter={() => this.searchByName()}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={nameSuffix}
              ref={node => (this.menuNameInput = node)}
            />
            <Button
              type="primary"
              icon="search"
              onClick={() => this.searchByName()}
            >
              查询
            </Button>
          </div>
        </div>
        <Divider />
        <div className={`flex ${styles.result_top}`}>
          <h2>查询结果: </h2>
          <Button type="primary" onClick={e => this.toShowModal(e, 1)}>
            新增
          </Button>
        </div>

        <Table
          columns={columns}
          // dataSource={this.state.data}
          // pagination={this.state.pagination}
          dataSource={
            // this.state.data.length
            //   ? this.state.data
            //   : searchFlag
            //   ? this.state.data
            //   : initMenus.datas
            this.props.initMenus.init && this.props.initMenus.data.data
          }
          // pagination={
          //   this.state.pagination.total !== undefined
          //     ? this.state.pagination
          //     : { ...initMenus.paging, defaultCurrent: 1, defaultPageSize: 12 }
          // }
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
          rowKey={record => {
            console.log(record._id);
            return record._id;
          }}
          scroll={{ y: clientHeight }}
        />
        <Modal
          className="groupMsg_modal"
          title={this.moDalTitle()}
          width={860}
          visible={Boolean(this.state.showModal)}
          centered
          okText="确认"
          cancelText="取消"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {(this.state.showModal === 1 || this.state.showModal === 2) && (
            <AddEditMenu
              showModal={this.state.showModal}
              sendData={sendData}
              wrappedComponentRef={form => (this.formRef = form)}
            />
          )}
        </Modal>
      </div>
    );
  }
}

// export default Console;
const mapStateToProps = state => ({
  initMenus: state.rights.initMenus
});

const mapDispatchToProps = dispatch => ({
  addRights: dispatch.rights.addRights,
  reviseRights: dispatch.rights.reviseRights,
  deleteRights: dispatch.rights.deleteRights,
  // getMenu: dispatch.rights.getMenu,
  getInitMenu: dispatch.rights.getInitMenu
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Console);
