import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { DatePicker, Input, Button, Table, Form } from 'antd';
import styles from './index.less';
import createApi from '../../api/list';
import { cardType, verifyStatus, authenStatusType } from '../../utils/map';
import { timestampToTime } from '../../utils';

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
      }
    };
  }

  componentDidMount() {
    const obj = {
      'listOptions.limit': 12,
      'listOptions.offset': 0
    };
    this.queryVerification(obj);
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

  toHref = text => {
    // this.props.handleReceivedetail(text);
    // this.$event.$emit('authenDetailData', text);
    sessionStorage.setItem('authenDetail', JSON.stringify(text));
    this.props.history.push(`/admin/authen/1?id=${text.id}`);
  };

  render() {
    // const { test, getTest } = this.props;
    const { data, pagination } = this.state;
    const columns = [
      {
        title: 'UDID',
        dataIndex: 'uid',
        key: 'uid'
        // render: text => <Link to={text}>{text}</Link>
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
        dataIndex: 'verifyStatus',
        key: 'verifyStatus',
        render: text => <span>{text ? verifyStatus[text] : '未提交'}</span>
        // render: text => <span>{text.realNameInfoStatus}</span>
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '证件类型',
        dataIndex: 'cer.type',
        key: 'cer.type',
        render: text => <span>{cardType[text]}</span>
      },
      {
        title: '证件号',
        dataIndex: 'cer.serialNo',
        key: 'cer.serialNo'
      },
      {
        title: '认证时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>
      },
      {
        title: '状态',
        dataIndex: 'accountStatus',
        key: 'accountStatus',
        render: text => <span>{authenStatusType[text]}</span>
      },
      {
        title: '操作',
        render: text =>
          text.verifyStatus === 2 ? (
            <span
              className="mouse_hover"
              onClick={() => {
                this.toHref(text);
              }}
            >
              审核
            </span>
          ) : (
            ''
          )
      }
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.user_list}>
        <p className="common_title">实名认证列表</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item label="认证日期">
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
)(Form.create()(AuthenList));
