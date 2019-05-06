import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Form, Select, Input, Switch } from 'antd';
import createApi from '../../api/list';
import styles from './index.less';
// import { timestampToTime } from '../../utils';

const Option = Select.Option;

class AuthenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      searchName: '',
      // bankID: '',
      // accountID: '',
      data: [],
      tableHeight: document.body.offsetHeight - 250,
      // pagination: {
      //   defaultCurrent: 1,
      //   defaultPageSize: 10,
      //   current: 1
      // },
      limit: 10
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      console.log(this);
      this.setState({
        tableHeight: document.body.offsetHeight - 250
      });
    });
    const { pagination, searchObj } = this.props;
    const bankID = searchObj.bankID;
    const accountID = searchObj.accountID;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    bankID && (obj.bankID = bankID);
    accountID && (obj.accountID = accountID);
    if (!this.props.bankType) {
      this.props.getBankType().then(() => {
        this.queryCoinOutAddr(obj);
      });
    } else {
      this.queryCoinOutAddr(obj);
    }
    // this.queryCoinOutAddr(obj);
  }

  queryCoinOutAddr = async obj => {
    const res = await createApi.queryCoinOutAddr(obj);
    console.log(res.list);
    if (res && res.paging) {
      const pagination = { ...this.props.pagination };
      pagination.total = res.paging.total - 0;
      this.props.getPagination(pagination);
      if (res.datas) {
        res.datas.map((item, index) => {
          res.datas[index].index = (res.paging.offset - 0 || 0) + index + 1;
        });
      }
      this.setState({
        // pagination,
        data: res.datas || []
      });
    } else {
      this.setState({
        // pagination: {
        //   defaultCurrent: 1,
        //   defaultPageSize: 10
        // },
        data: []
      });
      this.props.resetPagination();
    }
  };

  changeName = e => {
    this.setState({
      searchName: e.target.value
    });
    console.log(this.state.searchName);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const bankID = values.bankID === '全部' ? '' : values.bankID;
        const accountID = values.accountID;
        // this.setState({
        //   bankID: values.bankID === '全部' ? '' : values.bankID, // 银行type,
        //   accountID: values.accountID // 用户名
        // });
        this.props.getSearchObj({
          bankID,
          accountID
        });
        const pager = { ...this.props.pagination };
        pager.current = 1;
        this.props.getPagination(pager);
        const obj = {
          // bankID: values.bankID === '全部' ? '' : values.bankID, // 银行type
          // accountID: values.accountID, // 用户名
          'listOptions.limit': this.state.limit,
          'listOptions.offset': 0
        };
        bankID && (obj.bankID = bankID);
        accountID && (obj.accountID = accountID);
        this.queryCoinOutAddr(obj);
      }
    });
  };

  handleTableChange = pagination => {
    console.log(pagination);
    const { searchObj } = this.props;
    const pager = { ...this.props.pagination };
    pager.current = pagination.current;
    this.props.getPagination(pager);
    const bankID = searchObj.bankID;
    const accountID = searchObj.accountID;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    bankID && (obj.bankID = bankID);
    accountID && (obj.accountID = accountID);
    this.queryCoinOutAddr(obj);
    // this.setState({
    //   pagination: pager
    // });
  };

  onChangeOperate = (checked, id) => {
    console.log(`switch to ${checked} ${id}`);
    const obj = {
      url: id,
      query: {
        enable: checked
      }
    };
    this.changeOperate(obj);
  };

  changeOperate = async obj => {
    const res = await createApi.coinOutAddrOperate(obj);
    console.log(res);
    if (res.success) {
      const { limit } = this.state;
      const { pagination, searchObj } = this.props;
      const bankID = searchObj.bankID;
      const accountID = searchObj.accountID;
      const searchObject = {
        'listOptions.limit': limit,
        'listOptions.offset': (pagination.current - 1) * limit
        // bankID,
        // accountID
      };
      bankID && (searchObject.bankID = bankID);
      accountID && (searchObject.accountID = accountID);
      this.queryCoinOutAddr(searchObject);
    }
  };

  render() {
    const { bankType, pagination, searchObj } = this.props;
    const { data, tableHeight } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: '5%'
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '17%'
      },
      {
        title: '用户名',
        dataIndex: 'nickName',
        key: 'nickName',
        width: '12%'
      },
      {
        title: '开户类型',
        dataIndex: 'bank.name',
        key: 'bank.name',
        width: '12%'
      },
      {
        title: '开户支行',
        dataIndex: 'bankcardAddress',
        key: 'bankcardAddress',
        width: '12%'
      },
      {
        title: '开户账号',
        dataIndex: 'bankcardNumber',
        key: 'bankcardNumber',
        width: '25%'
      },
      // {
      //   title: '提现时间',
      //   dataIndex: 'createdTime',
      //   key: 'createdTime',
      //   render: text => <span>{text ? timestampToTime(text) : ''}</span>
      // },
      {
        title: '状态',
        render: text => <span>{text.enable ? '可用' : '不可用'}</span>,
        width: '10%'
      },
      // {
      //   title: '备注',
      //   dataIndex: 'userName',
      //   key: 'userName'
      // },
      {
        title: '操作',
        render: text => (
          <span>
            {text.id ? (
              <Switch
                checkedChildren="可用"
                unCheckedChildren="禁用"
                defaultChecked={!!text.enable}
                onChange={event => {
                  this.onChangeOperate(event, text.id);
                }}
              />
            ) : (
              ''
            )}
          </span>
        )
      }
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.userMsg_list}>
        <p className="common_title">提现地址</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item>
            {getFieldDecorator('accountID', {
              initialValue: searchObj.accountID || ''
            })(<Input placeholder="用户名" className="search_input" />)}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('bankID', {
              initialValue: searchObj.bankID || ''
            })(
              <Select className={styles.selectWidth}>
                {/* <Option value="0">全部</Option>
                <Option value="1">正常</Option>
                <Option value="2">冻结</Option> */}
                <Option value="">全部</Option>
                {bankType &&
                  bankType.map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="mr20">
              搜索
            </Button>
            <Button className="mr20">显示全部</Button>
          </Form.Item>
        </Form>
        <Table
          columns={columns}
          bordered
          dataSource={data}
          pagination={pagination}
          onChange={this.handleTableChange}
          rowKey={record => {
            console.log(record.id);
            return record.id;
          }}
          scroll={{ y: tableHeight }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bankType: state.selectOption.bankType,
  pagination: state.searchOption.pagination,
  searchObj: state.searchOption.searchObj
});

const mapDispatchToProps = dispatch => ({
  getPagination: dispatch.searchOption.getPagination,
  getSearchObj: dispatch.searchOption.getSearchObj,
  resetPagination: dispatch.searchOption.resetPagination,
  getBankType: dispatch.selectOption.getBankType
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AuthenList));
