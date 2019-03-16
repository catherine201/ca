import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DatePicker, Input, Button, Table } from 'antd';
import styles from './index.less';

const { RangePicker } = DatePicker;

class UserList extends Component {
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
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '总成交笔数',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '总成交率',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '总申诉笔数',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '近30日成交笔数',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '近30日成交率',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '近30日申诉笔数',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '平均放款时间',
        dataIndex: 'phone',
        key: 'phone'
      }
    ];
    return (
      <div className={styles.user_list}>
        <p className="common_title">用户列表</p>
        <div className={styles.search_wrap}>
          <RangePicker onChange={this.onChangeTime} />
          <Input
            placeholder="输入UUID/手机号/昵称进行search"
            onChange={this.changeName}
            className={styles.search_input}
          />
          <Button
            onClick={() => {
              this.handleSearch;
            }}
          >
            查询
          </Button>
        </div>
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
)(UserList);
