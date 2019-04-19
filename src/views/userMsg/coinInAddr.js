import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DatePicker, Button, Table, Form } from 'antd';
import styles from './index.less';

const { RangePicker } = DatePicker;

class AuthenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      searchName: '',
      data: []
    };
  }

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

  render() {
    // const { test, getTest } = this.props;
    const { data } = this.state;
    const columns = [
      {
        title: 'UDID',
        dataIndex: 'UDID',
        key: 'UDID',
        render: text => <Link to={text}>{text}</Link>
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
        dataIndex: 'authen',
        key: 'authen'
      },
      {
        title: '姓名',
        dataIndex: 'all',
        key: 'all'
      },
      {
        title: '证件类型',
        dataIndex: 'rate',
        key: 'rate'
      },
      {
        title: '证件号',
        dataIndex: 'appeal',
        key: 'appeal'
      },
      {
        title: '认证时间',
        dataIndex: '30',
        key: '30'
      },
      {
        title: '状态',
        dataIndex: '30rate',
        key: '30rate'
      },
      {
        title: '操作',
        dataIndex: '30peal',
        key: '30peal',
        render: text => <Link to={text}>审核</Link>
      }
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.user_list}>
        <p className="common_title">充币地址</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item label="认证日期">
            {getFieldDecorator('range-picker')(<RangePicker />)}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">搜索</Button>
            <Button>显示全部</Button>
            <Button>导出EXCEL</Button>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={data} />
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
