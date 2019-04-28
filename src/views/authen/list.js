import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// Input, Button,DatePicker
import { Table, Form } from 'antd';
import styles from './index.less';
import createApi from '../../api/list';
import { cardType, verifyStatus, authenStatusType } from '../../utils/map';
import { timestampToTime } from '../../utils';

// const { RangePicker } = DatePicker;

class AuthenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      searchName: '',
      data: [],
      tableHeight: document.body.offsetHeight - 300
      // pagination: {
      //   defaultCurrent: 1,
      //   defaultPageSize: 12
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
    const { pagination } = this.props;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    this.queryVerification(obj);
  }

  queryVerification = async () => {
    const res = await createApi.queryVerification();
    console.log(res.list);
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
    }
  };

  changeName = e => {
    this.setState({
      searchName: e.target.value
    });
    console.log(this.state.searchName);
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  // };

  handleTableChange = pagination => {
    const pager = { ...this.props.pagination };
    pager.current = pagination.current;
    this.props.getPagination(pager);
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    this.queryVerification(obj);
  };

  toHref = text => {
    // this.props.handleReceivedetail(text);
    // this.$event.$emit('authenDetailData', text);
    sessionStorage.setItem('authenDetail', JSON.stringify(text));
    this.props.history.push(`/admin/authen/1?id=${text.id}`);
  };

  render() {
    const { pagination } = this.props;
    const { data, tableHeight } = this.state;
    const columns = [
      {
        title: 'UDID',
        dataIndex: 'uid',
        key: 'uid',
        width: '22%'
        // render: text => <Link to={text}>{text}</Link>
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
        dataIndex: 'verifyStatus',
        key: 'verifyStatus',
        render: text => <span>{text ? verifyStatus[text] : '未提交'}</span>,
        width: '7%'
        // render: text => <span>{text.realNameInfoStatus}</span>
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '7%'
      },
      {
        title: '证件类型',
        dataIndex: 'cer.type',
        key: 'cer.type',
        width: '7%',
        render: text => <span>{cardType[text]}</span>
      },
      {
        title: '证件号',
        dataIndex: 'cer.serialNo',
        key: 'cer.serialNo',
        width: '10%'
      },
      {
        title: '认证时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: text => <span>{text ? timestampToTime(text / 1000) : ''}</span>,
        width: '12%'
      },
      {
        title: '状态',
        dataIndex: 'accountStatus',
        key: 'accountStatus',
        render: text => <span>{authenStatusType[text]}</span>,
        width: '8%'
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
    // const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.user_list}>
        <p className="common_title">实名认证列表</p>
        {/* <Form
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
        </Form> */}
        <Table
          columns={columns}
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
  getSearchObj: dispatch.searchOption.getSearchObj
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AuthenList));
