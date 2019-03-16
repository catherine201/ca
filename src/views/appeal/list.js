import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DatePicker, Input, Button, Table, Select, Form } from 'antd';
import styles from './index.less';

const { RangePicker } = DatePicker;
const Option = Select.Option;

class AppealList extends Component {
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
        title: '申诉ID',
        dataIndex: 'UDID',
        key: 'UDID',
        render: text => <Link to={text}>{text}</Link>
      },
      {
        title: '买方',
        dataIndex: 'nickName',
        key: 'nickName'
      },
      {
        title: '卖方',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '订单ID',
        dataIndex: 'authen',
        key: 'authen'
      },
      {
        title: '币种',
        dataIndex: 'all',
        key: 'all'
      },
      {
        title: '金额(CNY)',
        dataIndex: 'rate',
        key: 'rate'
      },
      {
        title: '数量',
        dataIndex: 'appeal',
        key: 'appeal'
      },
      {
        title: '付款确认时间',
        dataIndex: '30',
        key: '30'
      },
      {
        title: '申诉发起时间',
        dataIndex: '30rate',
        key: '30rate'
      },
      {
        title: '申诉处理时间',
        dataIndex: '30peal',
        key: '30peal'
      },
      {
        title: '状态',
        dataIndex: 'time',
        key: 'time'
      }
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.user_list}>
        <p className="common_title">申诉列表</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item label="申诉日期">
            {getFieldDecorator('range-picker')(<RangePicker />)}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('status', { initialValue: 'all' })(
              <Select>
                <Option value="all">全部</Option>
                <Option value="Ing">上架中</Option>
                <Option value="unShift">已下架</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('input')(
              <Input placeholder="输入广告ID/创建人进行search" />
            )}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">查询</Button>
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
)(Form.create()(AppealList));
