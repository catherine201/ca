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
      limit: 10,
      data: [],
      tableHeight: document.body.offsetHeight - 300
      // pagination: {
      //   defaultCurrent: 1,
      //   defaultPageSize: 10
      // }
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      console.log(this);
      this.setState({
        tableHeight: document.body.offsetHeight - 300
      });
    });
    const { pagination, searchObj } = this.props;
    const createdTimeFrom = searchObj.createdTim;
    // &&
    // searchObj.createdTime[0] &&
    // new Date(searchObj.createdTime[0].format('YYYY-MM-DD')).getTime();
    const createdTimeTo = searchObj.createdTime;
    // &&
    // searchObj.createdTime[1] &&
    // new Date(searchObj.createdTime[1].format('YYYY-MM-DD')).getTime();
    const uid = searchObj.uid;
    const phone = searchObj.phone;
    const name = searchObj.name;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    createdTimeFrom && (obj.createdTimeFrom = createdTimeFrom);
    createdTimeTo && (obj.createdTimeTo = createdTimeTo);
    uid && (obj.uid = uid);
    phone && (obj.phone = phone);
    name && (obj.name = name);
    this.queryUser(obj);
  }

  queryUser = async obj => {
    const res = await createApi.queryUser(obj);
    console.log(res);
    if (res && res.paging) {
      const pagination = { ...this.props.pagination };
      pagination.total = res.paging.total - 0;
      this.props.getPagination(pagination);
      this.setState({
        // pagination,
        data: res.list || []
      });
    } else {
      this.setState({
        data: []
      });
      this.props.resetPagination();
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // const { searchObj } = this.props;
        console.log('Received values of form: ', values);
        const createdTimeFrom =
          values.createdTim &&
          values.createdTime[0] &&
          new Date(values.createdTime[0].format('YYYY-MM-DD')).getTime();
        const createdTimeTo =
          values.createdTime &&
          values.createdTime[1] &&
          new Date(values.createdTime[1].format('YYYY-MM-DD')).getTime();
        const uid = values.uid;
        const phone = values.phone;
        const name = values.name;
        this.props.getSearchObj({
          createdTimeFrom,
          createdTimeTo,
          uid,
          phone,
          name
        });
        const pager = { ...this.props.pagination };
        pager.current = 1;
        this.props.getPagination(pager);
        const obj = {
          'listOptions.limit': this.state.limit,
          'listOptions.offset': 0
        };
        createdTimeFrom && (obj.createdTimeFrom = createdTimeFrom);
        createdTimeTo && (obj.createdTimeTo = createdTimeTo);
        uid && (obj.uid = uid);
        phone && (obj.phone = phone);
        name && (obj.name = name);
        this.queryUser(obj);
      }
    });
  };

  handleTableChange = pagination => {
    const { searchObj } = this.props;
    const pager = { ...this.props.pagination };
    pager.current = pagination.current;
    this.props.getPagination(pager);
    const createdTimeFrom = searchObj.createdTim;
    // &&
    // searchObj.createdTime[0] &&
    // new Date(searchObj.createdTime[0].format('YYYY-MM-DD')).getTime();
    const createdTimeTo = searchObj.createdTime;
    // &&
    // searchObj.createdTime[1] &&
    // new Date(searchObj.createdTime[1].format('YYYY-MM-DD')).getTime();
    const uid = searchObj.uid;
    const phone = searchObj.phone;
    const name = searchObj.name;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    createdTimeFrom && (obj.createdTimeFrom = createdTimeFrom);
    createdTimeTo && (obj.createdTimeTo = createdTimeTo);
    uid && (obj.uid = uid);
    phone && (obj.phone = phone);
    name && (obj.name = name);
    this.queryUser(obj);
    // this.setState({
    //   pagination: pager
    // });
  };

  render() {
    const { pagination, searchObj } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { data, tableHeight } = this.state;
    const columns = [
      {
        title: 'UDID',
        dataIndex: 'uid',
        key: 'uid',
        width: '22%',
        render: text => <Link to={`/admin/user/1?id=${text}`}>{text}</Link>
      },
      {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName',
        width: '10%'
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: '10%'
      },
      {
        title: '实名认证',
        dataIndex: 'verified',
        key: 'verified',
        width: '5%'
      },
      {
        title: '总成交笔数',
        dataIndex: 'dealTotal',
        key: 'dealTotal',
        width: '7%'
      },
      {
        title: '总成交率',
        width: '6%',
        render: text => (
          <span>
            {text.txTotal ? (text.dealTotal / text.txTotal).toFixed(2) : ''}
          </span>
        )
      },
      {
        title: '总申诉笔数',
        dataIndex: 'appealTotal',
        key: 'appealTotal',
        width: '7%'
      },
      {
        title: '近30日成交笔数',
        dataIndex: 'dealTotal30',
        key: 'dealTotal30',
        width: '7%'
      },
      {
        title: '近30日成交率',
        width: '6%',
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
        key: 'appealTotal30',
        width: '7%'
      },
      {
        title: '平均放款时间',
        dataIndex: 'avgConfirmTime',
        key: 'avgConfirmTime'
      }
    ];
    const initRangePick = [
      searchObj.createdTime,
      // &&
      //   searchObj.createdTime[0] &&
      //   moment(timestampToTime(searchObj.createdTime[0] / 1000), 'YYYY/MM/DD')
      searchObj.createdTime
      // &&
      //   searchObj.createdTime[1] &&
      //   moment(timestampToTime(searchObj.createdTime[1] / 1000), 'YYYY/MM/DD')
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
            {getFieldDecorator('createdTime', {
              initialValue: initRangePick || []
            })(<RangePicker />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('uid', {
              initialValue: searchObj.uid || ''
            })(<Input placeholder="输入UDID进行搜索" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('phone', {
              initialValue: searchObj.phone || ''
            })(<Input placeholder="输入手机号进行搜索" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('name', {
              initialValue: searchObj.name || ''
            })(<Input placeholder="输入昵称进行搜索" />)}
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
          bordered
          dataSource={data}
          pagination={pagination}
          onChange={this.handleTableChange}
          rowKey={record => {
            console.log(record.id);
            return record.id;
          }}
          scroll={{ y: tableHeight }}
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
  getSearchObj: dispatch.searchOption.getSearchObj,
  resetPagination: dispatch.searchOption.resetPagination
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(UserList));
