import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Form, Select, Input } from 'antd';
import createApi from '../../api/list';
import styles from './index.less';

const Option = Select.Option;

class AuthenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      searchName: '',
      data: [],
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10
      },
      limit: 10
    };
  }

  componentDidMount() {
    const obj = {
      'listOptions.limit': 10,
      'listOptions.offset': 0
    };
    this.queryVerification(obj);
  }

  queryVerification = async obj => {
    const res = await createApi.queryAuctionCoin(obj);
    console.log(res);
    if (res.paging) {
      const pagination = { ...this.state.pagination };
      pagination.total = res.paging.total - 0;
      this.setState({
        pagination,
        data: res.list
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
      }
    });
  };

  handleTableChange = pagination => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    const obj = {
      'listOptions.limit': 10,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    this.queryVerification(obj);
    this.setState({
      pagination: pager
    });
  };

  render() {
    // const { test, getTest } = this.props;
    const { data, pagination } = this.state;
    const columns = [
      {
        title: '订单号',
        dataIndex: 'orderID',
        key: 'orderID'
      },
      {
        title: '用户ID',
        dataIndex: 'ID',
        key: 'ID'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '市场',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '类型',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '单价',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '数量',
        dataIndex: 'coinType',
        key: 'coinType'
      },
      {
        title: '已成交',
        dataIndex: 'coinType',
        key: 'coinType'
      },
      {
        title: '总额',
        dataIndex: 'authen',
        key: 'authen'
      },
      {
        title: '交易时间',
        dataIndex: 'authen',
        key: 'authen'
      },
      {
        title: '状态',
        dataIndex: 'authen',
        key: 'authen'
      },
      {
        title: '操作',
        render: text =>
          text ? (
            <React.Fragment>
              <Button>编辑</Button>
              <Button>撤销</Button>
            </React.Fragment>
          ) : (
            ''
          )
      }
    ];
    const { getFieldDecorator } = this.props.form;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        );
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name
      })
    };
    return (
      <div className={styles.coinRecord_list}>
        <p className="common_title">当前抢拍</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item label="币种">
            {getFieldDecorator('adType', { initialValue: '0' })(
              <Select>
                <Option value="0">全部</Option>
                <Option value="1">正常</Option>
                <Option value="2">冻结</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="类型">
            {getFieldDecorator('adType', { initialValue: '0' })(
              <Select>
                <Option value="0">全部</Option>
                <Option value="1">正常</Option>
                <Option value="2">冻结</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('input')(
              <Input placeholder="用户名" className="search_input" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('input')(
              <Input placeholder="开始价" className="search_input" />
            )}
          </Form.Item>
          -
          <Form.Item>
            {getFieldDecorator('input')(
              <Input placeholder="结束价" className="search_input" />
            )}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="mr20">
              搜索
            </Button>
            <Button>批量撤单</Button>
          </Form.Item>
        </Form>
        <Table
          rowSelection={rowSelection}
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
  test: state.demo.test
});

const mapDispatchToProps = dispatch => ({
  getTest: dispatch.demo.getTest
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AuthenList));
