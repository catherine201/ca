import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DatePicker, Input, Button, Table, Form } from 'antd';
import styles from './index.less';
import createApi from '../../api/list';

const { RangePicker } = DatePicker;

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      // searchName: '',
      limit: 12,
      data: [],
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 12
      }
    };
  }

  componentDidMount() {
    const obj = {
      'listOptions.limit': 12,
      'listOptions.offset': 0
    };
    this.queryUser(obj);
  }

  queryUser = async obj => {
    const res = await createApi.queryUser(obj);
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

  // onChangeTime = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  // changeName = e => {
  //   this.setState({
  //     searchName: e.target.value
  //   });
  //   console.log(this.state.searchName);
  // };

  handleSearch = () => {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const obj = {
          createdTimeFrom:
            values.createdTime[0] &&
            new Date(values.createdTime[0].format('YYYY-MM-DD')).getTime(),
          createdTimeTo:
            values.createdTime[1] &&
            new Date(values.createdTime[1].format('YYYY-MM-DD')).getTime(),
          uid: values.uid,
          phone: values.phone,
          name: values.name,
          'listOptions.limit': 12,
          'listOptions.offset': 0
        };
        this.queryUser(obj);
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
    this.queryUser(obj);
    this.setState({
      pagination: pager
    });
  };

  render() {
    // const { test, getTest } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { data, pagination } = this.state;
    const columns = [
      {
        title: 'UDID',
        dataIndex: 'uid',
        key: 'uid',
        width: '100',
        render: text => <Link to={`/admin/user/1?id=${text}`}>{text}</Link>
      },
      {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName'
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '实名认证',
        dataIndex: 'verified',
        key: 'verified'
      },
      {
        title: '总成交笔数',
        dataIndex: 'dealTotal',
        key: 'dealTotal'
      },
      {
        title: '总成交率',
        render: text => (
          <span>
            {text.txTotal ? (text.dealTotal / text.txTotal).toFixed(2) : ''}
          </span>
        )
      },
      {
        title: '总申诉笔数',
        dataIndex: 'appealTotal',
        key: 'appealTotal'
      },
      {
        title: '近30日成交笔数',
        dataIndex: 'dealTotal30',
        key: 'dealTotal30'
      },
      {
        title: '近30日成交率',
        render: text => (
          <span>
            {text.txTotal30
              ? (text.dealTotal30 / text.txTotal30).toFixed(2)
              : ''}
          </span>
        )
      },
      {
        title: '近30日申诉笔数',
        dataIndex: 'appealTotal30',
        key: 'appealTotal30'
      },
      {
        title: '平均放款时间',
        dataIndex: 'avgConfirmTime',
        key: 'avgConfirmTime'
      }
    ];
    return (
      <div className={styles.user_list}>
        <p className="common_title">用户列表</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item label="下单日期">
            {getFieldDecorator('createdTime')(<RangePicker />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('uid')(<Input placeholder="输入UDID进行搜索" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('phone')(
              <Input placeholder="输入手机号进行搜索" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('name')(
              <Input placeholder="输入昵称进行搜索" />
            )}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">查询</Button>
          </Form.Item>
        </Form>
        {/* <RangePicker onChange={this.onChangeTime} />
          <Input
            placeholder="输入UUID/手机号/昵称进行搜索"
            onChange={this.changeName}
            className={styles.search_input}
          />
          <Button
            onClick={() => {
              this.handleSearch;
            }}
          >
            查询
          </Button> */}
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
  pagination: state.searchOption.pagination,
  searchObj: state.searchOption.searchObj
});

const mapDispatchToProps = dispatch => ({
  getPagination: dispatch.searchOption.getPagination,
  getSearchObj: dispatch.searchOption.getSearchObj
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(UserList));
