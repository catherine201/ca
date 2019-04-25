import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Table,
  Form,
  Select,
  Input,
  DatePicker,
  Popconfirm
} from 'antd';
import createApi from '../../api/list';
import styles from './index.less';
import { timestampToTime } from '../../utils';
import { coinTxStatus } from '../../utils/map';

const Option = Select.Option;
const { RangePicker } = DatePicker;

class AuthenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      searchName: '',
      data: [],
      tableHeight: document.body.offsetHeight - 320,
      // pagination: {
      //   defaultCurrent: 1,
      //   defaultPageSize: 10,
      //   current: 1
      // },
      limit: 10
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      console.log(this);
      this.setState({
        tableHeight: document.body.offsetHeight - 320
      });
    });
    const { pagination, searchObj } = this.props;
    const coinName = searchObj.coinName;
    const beginTime = searchObj.beginTime;
    const endTime = searchObj.endTime;
    const nickname = searchObj.nickname;
    const status = searchObj.status;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit,
      type: 2
    };
    coinName && (obj.coinName = coinName);
    beginTime && (obj.beginTime = beginTime);
    endTime && (obj.endTime = endTime);
    nickname && (obj.nickname = nickname);
    status && (obj.status = status);
    // this.queryCointxs(obj);
    if (!this.props.coinType) {
      this.props.getCoinType().then(() => {
        this.queryCointxs(obj);
      });
    } else {
      this.queryCointxs(obj);
    }
  }

  queryAgain = () => {
    const { pagination, searchObj } = this.props;
    const coinName = searchObj.coinName;
    const beginTime = searchObj.beginTime;
    const endTime = searchObj.endTime;
    const nickname = searchObj.nickname;
    const status = searchObj.status;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit,
      type: 2
    };
    coinName && (obj.coinName = coinName);
    beginTime && (obj.beginTime = beginTime);
    endTime && (obj.endTime = endTime);
    nickname && (obj.nickname = nickname);
    status && (obj.status = status);
    this.queryCointxs(obj);
  };

  queryCointxs = async obj => {
    const res = await createApi.queryCointxs(obj);
    console.log(res.list);
    if (res && res.paging) {
      const pagination = { ...this.props.pagination };
      pagination.total = res.paging.total - 0;
      this.props.getPagination(pagination);
      if (res.datas) {
        res.datas.map((item, index) => {
          res.datas[index].index = (res.paging.offset - 0 || 0) + index + 1;
        });
      }
      this.setState({
        // pagination,
        data: res.datas || []
      });
    } else {
      this.setState({
        data: []
      });
      this.props.resetPagination();
    }
  };

  changeName = e => {
    this.setState({
      searchName: e.target.value
    });
    console.log(this.state.searchName);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const coinName =
          values.coinName === '全部' ? '' : values.coinName.toLowerCase();
        const beginTime =
          values.rangePicker &&
          values.rangePicker[0] &&
          new Date(values.rangePicker[0].format('YYYY-MM-DD')).getTime();
        const endTime =
          values.rangePicker &&
          values.rangePicker[1] &&
          new Date(values.rangePicker[1].format('YYYY-MM-DD')).getTime();
        const nickname = values.nickname;
        const status = values.status;
        this.props.getSearchObj({
          coinName,
          beginTime,
          endTime,
          nickname,
          status
        });
        const pager = { ...this.props.pagination };
        pager.current = 1;
        this.props.getPagination(pager);
        const obj = {
          // coinName:
          //   values.coinName === '全部' ? '' : values.coinName.toLowerCase(), // 币种
          // beginTime:
          //   values.rangePicker &&
          //   values.rangePicker[0] &&
          //   new Date(values.rangePicker[0].format('YYYY-MM-DD')).getTime(),
          // endTime:
          //   values.rangePicker &&
          //   values.rangePicker[1] &&
          //   new Date(values.rangePicker[1].format('YYYY-MM-DD')).getTime(),
          // nickname: values.nickname, // 用户名
          'listOptions.limit': this.state.limit,
          'listOptions.offset': 0,
          type: 2
          // status: values.status
        };
        coinName && (obj.coinName = coinName);
        beginTime && (obj.beginTime = beginTime);
        endTime && (obj.endTime = endTime);
        nickname && (obj.nickname = nickname);
        status && (obj.status = status);
        this.queryCointxs(obj);
      }
    });
  };

  handleTableChange = pagination => {
    const { searchObj } = this.props;
    const pager = { ...this.props.pagination };
    pager.current = pagination.current;
    this.props.getPagination(pager);
    const coinName = searchObj.coinName;
    const beginTime = searchObj.beginTime;
    const endTime = searchObj.endTime;
    const nickname = searchObj.nickname;
    const status = searchObj.status;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit,
      type: 2
    };
    coinName && (obj.coinName = coinName);
    beginTime && (obj.beginTime = beginTime);
    endTime && (obj.endTime = endTime);
    nickname && (obj.nickname = nickname);
    status && (obj.status = status);
    this.queryCointxs(obj);
    // this.setState({
    //   pagination: pager
    // });
  };

  renderOperate = text => {
    console.log(text.status);
    switch (text.status) {
      case 'CoinTxStatusSuccess':
        return <Button>补单</Button>;
      case 'CoinTxStatusFailed':
        return '';
      case 'CoinTxStatusPendding':
        return (
          <React.Fragment>
            <Popconfirm
              title="你确定要转出?"
              onConfirm={() => {
                this.confirmOut(text.id);
              }}
              onCancel={() => {
                this.cancel;
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button className="mr20">确认转出</Button>
            </Popconfirm>
            <Popconfirm
              title="你确定要拒绝?"
              onConfirm={() => {
                this.confirm(text.id);
              }}
              onCancel={() => {
                this.cancel;
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button>拒绝</Button>
            </Popconfirm>
          </React.Fragment>
        );
      case 'CoinTxStatusRejected':
        return '';
      default:
        break;
    }
  };

  confirm = id => {
    console.log(id);
    const obj = {
      url: id
    };
    this.rejectCoinTxWithdrawRequest(obj);
  };

  confirmOut = id => {
    const obj = {
      url: id
    };
    this.acceptCoinTxWithdraw(obj);
  };

  cancel = e => {
    console.log(e);
  };

  // 拒绝
  rejectCoinTxWithdrawRequest = async obj => {
    const res = await createApi.rejectCoinTxWithdrawRequest(obj);
    console.log(res);
    if (res) {
      this.queryAgain();
    }
  };

  // acceptCoinTxWithdraw
  // 确认转出
  acceptCoinTxWithdraw = async obj => {
    const res = await createApi.acceptCoinTxWithdraw(obj);
    console.log(res);
    if (res) {
      this.queryAgain();
    }
  };

  render() {
    const { coinType, pagination, searchObj } = this.props;
    const { data, tableHeight } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: '5%'
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '17%'
      },
      {
        title: '用户名',
        dataIndex: 'nickName',
        key: 'nickName',
        width: '10%'
      },
      {
        title: '币种',
        dataIndex: 'coinName',
        key: 'coinName',
        width: '5%'
      },
      {
        title: '提币数量',
        dataIndex: 'amount',
        key: 'amount',
        width: '7%'
      },
      {
        title: '提币地址',
        dataIndex: 'to',
        key: 'to',
        width: '15%'
      },
      {
        title: '提现手续',
        dataIndex: 'fee',
        key: 'fee',
        width: '5%'
      },
      {
        title: 'TXID',
        dataIndex: 'txHash',
        key: 'txHash',
        width: '14%'
      },
      {
        title: '申请时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>,
        width: '8%'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text => <span>{text ? coinTxStatus[text] : ''}</span>,
        width: '5%'
      },
      {
        title: '操作',
        render: text => (
          <React.Fragment>{this.renderOperate(text)}</React.Fragment>
        )
        // this.renderOperate(text.status);
        // console.log(this.renderOperate(text.status));
      }
      // <Button>{text ? '确认转出' : '拒绝'}</Button>
    ];
    const { getFieldDecorator } = this.props.form;
    const initRange = [searchObj.beginTime, searchObj.endTime];
    return (
      <div className={styles.coinRecord_list}>
        <p className="common_title">提币记录</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item label="币种">
            {getFieldDecorator('coinName', {
              initialValue: searchObj.coinName || ''
            })(
              <Select>
                <Option value="">全部</Option>
                {coinType &&
                  coinType.map(item => (
                    <Option value={item.code} key={item.code}>
                      {item.code}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('status', {
              initialValue: searchObj.status || ''
            })(
              <Select>
                <Option value="">全部</Option>
                <Option value="1">成功</Option>
                <Option value="2">失败</Option>
                <Option value="3">待处理</Option>
                <Option value="4">拒绝</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('nickname', {
              initialValue: searchObj.nickname || ''
            })(<Input placeholder="用户名" className="search_input" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('rangePicker', {
              initialValue: initRange || []
            })(<RangePicker />)}
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
          scroll={{ y: tableHeight }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coinType: state.selectOption.coinType,
  pagination: state.searchOption.pagination,
  searchObj: state.searchOption.searchObj
});

const mapDispatchToProps = dispatch => ({
  getCoinType: dispatch.selectOption.getCoinType,
  getPagination: dispatch.searchOption.getPagination,
  getSearchObj: dispatch.searchOption.getSearchObj,
  resetPagination: dispatch.searchOption.resetPagination
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AuthenList));
