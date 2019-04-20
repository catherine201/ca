import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Form, Select, Input, DatePicker } from 'antd';
import createApi from '../../api/list';
import styles from './index.less';

const Option = Select.Option;
const { RangePicker } = DatePicker;

class AuthenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      searchName: '',
      data: [],
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 12
      },
      limit: 12
    };
  }

  componentDidMount() {
    // const obj = {
    //   'listOptions.limit': 12,
    //   'listOptions.offset': 0
    // };
    // this.queryVerification(obj);
  }

  queryVerification = async () => {
    const res = await createApi.queryVerification();
    console.log(res.list);
    if (res && res.paging) {
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
      'listOptions.limit': 12,
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
        title: '序号',
        // dataIndex: 'UDID',
        key: 'index',
        render: text => <span>{text}</span>
      },
      {
        title: 'ID',
        dataIndex: 'ID',
        key: 'ID'
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '币种',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '申请时间',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '提币地址',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: 'TXID',
        dataIndex: 'coinType',
        key: 'coinType'
      },
      {
        title: '提币数量',
        dataIndex: 'authen',
        key: 'authen'
      },
      {
        title: '提现手续',
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
        render: text => <Button>{text ? '确认转出' : '拒绝'}</Button>
      }
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.coinRecord_list}>
        <p className="common_title">提币记录</p>
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
          <Form.Item>
            {getFieldDecorator('input')(
              <Input placeholder="用户名" className="search_input" />
            )}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('adType', { initialValue: '0' })(
              <Select>
                <Option value="0">全部</Option>
                <Option value="1">正常</Option>
                <Option value="2">冻结</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('range-picker')(<RangePicker />)}
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
  test: state.demo.test
});

const mapDispatchToProps = dispatch => ({
  getTest: dispatch.demo.getTest
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AuthenList));
