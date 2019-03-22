import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DatePicker, Input, Button, Table, Form } from 'antd';
import styles from './index.less';
import createApi from '../../api/list';
import { timestampToTime } from '../../utils';

const { RangePicker } = DatePicker;

class ApplicationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      limit: 12,
      searchName: '',
      data: [],
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 12
      }
    };
  }

  componentDidMount() {
    this.queryBussApply();
  }

  queryBussApply = async () => {
    const res = await createApi.queryBussApply();
    console.log(res);
    if (res.datas) {
      const pagination = { ...this.state.pagination };
      pagination.total = res.paging.total - 0;
      this.setState({
        pagination,
        data: res.datas
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

  handleTableChange = pagination => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    const obj = {
      'listOptions.limit': 12,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    this.queryAppeal(obj);
    this.setState({
      pagination: pager
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    // const { test, getTest } = this.props;
    const { data, pagination } = this.state;
    const columns = [
      {
        title: 'UDID',
        dataIndex: 'ownerId',
        key: 'ownerId',
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
        title: '姓名',
        dataIndex: 'all',
        key: 'all'
      },
      {
        title: '申请类型',
        dataIndex: 'rate',
        key: 'rate'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: '申请时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>
      },
      {
        title: '审核时间',
        dataIndex: 'updatedTime',
        key: 'updatedTime',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>
      },
      {
        title: '操作',
        render: text =>
          text.status === 'Applied' ? (
            <Link to={`/admin/application/1?id=${text.ownerId}`}>审核</Link>
          ) : (
            ''
          )
      }
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.user_list}>
        <p className="common_title">商户申请列表</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item label="申请日期">
            {getFieldDecorator('range-picker')(<RangePicker />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('input')(
              <Input
                placeholder="输入UDID/手机号/昵称/姓名搜索"
                className="search_input"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">查询</Button>
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
)(Form.create()(ApplicationList));
