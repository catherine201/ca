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
      bankID: '',
      accountID: '',
      data: [],
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10,
        current: 1
      },
      limit: 10
    };
  }

  componentDidMount() {
    const obj = {
      'listOptions.limit': 10,
      'listOptions.offset': 0
    };
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
      const pagination = { ...this.state.pagination };
      pagination.total = res.paging.total - 0;
      if (res.datas) {
        res.datas.map((item, index) => {
          res.datas[index].index = (res.paging.offset - 0 || 0) + index + 1;
        });
      }
      this.setState({
        pagination,
        data: res.datas || []
      });
    } else {
      this.setState({
        pagination: {
          defaultCurrent: 1,
          defaultPageSize: 10
        },
        data: []
      });
    }
  };

  onChangeTime = (date, dateString) => {
    console.log(date, dateString);
  };

  changeName = e => {
    this.setState({
      searchName: e.target.value
    });
    console.log(this.state.searchName);
  };

  handleSearch = () => {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          bankID: values.bankID === '全部' ? '' : values.bankID, // 银行type,
          accountID: values.accountID // 用户名
        });
        const obj = {
          bankID: values.bankID === '全部' ? '' : values.bankID, // 银行type
          accountID: values.accountID, // 用户名
          'listOptions.limit': 10,
          'listOptions.offset': 0
        };
        this.queryCoinOutAddr(obj);
      }
    });
  };

  handleTableChange = pagination => {
    console.log(pagination);
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    const obj = {
      'listOptions.limit': 10,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    this.queryCoinOutAddr(obj);
    this.setState({
      pagination: pager
    });
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
      const { limit, bankID, accountID, pagination } = this.state;
      const searchObj = {
        'listOptions.limit': 10,
        'listOptions.offset': (pagination.current - 1) * limit,
        bankID,
        accountID
      };
      this.queryCoinOutAddr(searchObj);
    }
  };

  render() {
    const { bankType } = this.props;
    const { data, pagination } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index'
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'nickName',
        key: 'nickName'
      },
      {
        title: '开户银行',
        dataIndex: 'bank.name',
        key: 'bank.name'
      },
      {
        title: '开户支行',
        dataIndex: 'bankcardAddress',
        key: 'bankcardAddress'
      },
      {
        title: '银行卡号',
        dataIndex: 'bankcardNumber',
        key: 'bankcardNumber'
      },
      // {
      //   title: '提现时间',
      //   dataIndex: 'createdTime',
      //   key: 'createdTime',
      //   render: text => <span>{text ? timestampToTime(text) : ''}</span>
      // },
      {
        title: '状态',
        render: text => <span>{text.enable ? '可用' : '不可用'}</span>
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
            {getFieldDecorator('accountID')(
              <Input placeholder="用户名" className="search_input" />
            )}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('bankID', { initialValue: '' })(
              <Select>
                {/* <Option value="0">全部</Option>
                <Option value="1">正常</Option>
                <Option value="2">冻结</Option> */}
                {bankType &&
                  bankType.map(item => (
                    <Option value={item.id}>{item.name}</Option>
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
          dataSource={data}
          pagination={pagination}
          onChange={this.handleTableChange}
          rowKey={record => {
            console.log(record.id);
            return record.id;
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bankType: state.selectOption.bankType
});

const mapDispatchToProps = dispatch => ({
  getBankType: dispatch.selectOption.getBankType
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AuthenList));
