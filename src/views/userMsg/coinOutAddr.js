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
        title: '备注',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '开户银行',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '开户支行',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '银行卡号',
        dataIndex: 'coinType',
        key: 'coinType'
      },
      {
        title: '添加时间',
        dataIndex: 'authen',
        key: 'authen'
      },
      {
        title: '状态',
        dataIndex: 'time',
        key: 'time'
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
            {getFieldDecorator('input')(
              <Input placeholder="用户名" className="search_input" />
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
  test: state.demo.test
});

const mapDispatchToProps = dispatch => ({
  getTest: dispatch.demo.getTest
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AuthenList));
