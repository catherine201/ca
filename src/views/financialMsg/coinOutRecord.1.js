import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Form, Select, Input, DatePicker } from 'antd';
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
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10,
        current: 1
      },
      limit: 10
    };
  }

  componentDidMount() {
    const obj = {
      'listOptions.limit': 10,
      'listOptions.offset': 0,
      type: 2
    };
    // this.queryCointxs(obj);
    if (!this.props.coinType) {
      this.props.getCoinType().then(() => {
        this.queryCointxs(obj);
      });
    } else {
      this.queryCointxs(obj);
    }
  }

  queryCointxs = async obj => {
    const res = await createApi.queryCointxs(obj);
    console.log(res.list);
    if (res && res.paging) {
      const pagination = { ...this.state.pagination };
      pagination.total = res.paging.total - 0;
      if (res.datas) {
        res.datas.map((item, index) => {
          res.datas[index].index = (res.paging.offset - 0 || 0) + index + 1;
        });
      }
      this.setState({
        pagination,
        data: res.datas || []
      });
    } else {
      this.setState({
        pagination: {
          defaultCurrent: 1,
          defaultPageSize: 10,
          current: 1
        },
        data: []
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
        const obj = {
          coinName:
            values.coinName === '全部' ? '' : values.coinName.toLowerCase(), // 币种
          beginTime:
            values.rangePicker &&
            values.rangePicker[0] &&
            new Date(values.rangePicker[0].format('YYYY-MM-DD')).getTime(),
          endTime:
            values.rangePicker &&
            values.rangePicker[1] &&
            new Date(values.rangePicker[1].format('YYYY-MM-DD')).getTime(),
          nickname: values.nickname, // 用户名
          'listOptions.limit': 10,
          'listOptions.offset': 0,
          type: 2,
          status: values.status
        };
        this.queryCointxs(obj);
      }
    });
  };

  handleTableChange = pagination => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    const obj = {
      'listOptions.limit': 10,
      'listOptions.offset': (pagination.current - 1) * this.state.limit,
      type: 2
    };
    this.queryCointxs(obj);
    this.setState({
      pagination: pager
    });
  };

  renderOperate = status => {
    console.log(status);
    switch (status) {
      case 'CoinTxStatusSuccess':
        return <Button>补单</Button>;
      case 'CoinTxStatusFailed':
        return '';
      case 'CoinTxStatusPendding':
        return (
          <React.Fragment>
            <Button>确认转出</Button>
            <Button>拒绝</Button>
          </React.Fragment>
        );
      case 'CoinTxStatusRejected':
        return '';
      default:
        break;
    }
  };

  render() {
    const { coinType } = this.props;
    const { data, pagination } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index'
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '240px'
      },
      {
        title: '用户名',
        dataIndex: 'nickName',
        key: 'nickName'
      },
      {
        title: '币种',
        dataIndex: 'coinName',
        key: 'coinName'
      },
      {
        title: '提币数量',
        dataIndex: 'amount',
        key: 'amount'
      },
      {
        title: '提币地址',
        dataIndex: 'to',
        key: 'to',
        width: '168px'
      },
      {
        title: '提现手续',
        dataIndex: 'fee',
        key: 'fee'
      },
      {
        title: 'TXID',
        dataIndex: 'txHash',
        key: 'txHash',
        width: '168px'
      },
      {
        title: '申请时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text => <span>{text ? coinTxStatus[text] : ''}</span>
      },
      {
        title: '操作',
        render: text => (
          <React.Fragment>{this.renderOperate(text.status)}</React.Fragment>
        )
        // this.renderOperate(text.status);
        // console.log(this.renderOperate(text.status));
      }
      // <Button>{text ? '确认转出' : '拒绝'}</Button>
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.coinRecord_list}>
        <p className="common_title">提币记录</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item label="币种">
            {getFieldDecorator('coinName', { initialValue: '0' })(
              <Select>
                <Option value="0">全部</Option>
                {coinType &&
                  coinType.map(item => (
                    <Option value={item.code}>{item.code}</Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('status', { initialValue: '' })(
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
            {getFieldDecorator('nickname')(
              <Input placeholder="用户名" className="search_input" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('rangePicker')(<RangePicker />)}
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
  coinType: state.selectOption.coinType
});

const mapDispatchToProps = dispatch => ({
  getCoinType: dispatch.selectOption.getCoinType
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AuthenList));
