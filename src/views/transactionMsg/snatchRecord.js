import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Form, Select, Input } from 'antd';
import createApi from '../../api/list';
import styles from './index.less';
import { auctionCoinType, auctionOrderStatus } from '../../utils/map';
import { timestampToTime } from '../../utils';

const Option = Select.Option;
const defaultStatus = ['AuctionOrderStatusDone', 'AuctionOrderStatusCancelled'];

class AuthenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      searchName: '',
      data: [],
      tableHeight: document.body.offsetHeight - 300,
      // pagination: {
      //   defaultCurrent: 1,
      //   defaultPageSize: 10,
      //   current: 1
      // },
      limit: 10
      // searchObj: {}
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
    const tradeCoin = searchObj.tradeCoin;
    const payCoin = searchObj.payCoin;
    const type = searchObj.type;
    const nickName = searchObj.nickName;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit,
      status: searchObj.status || defaultStatus
    };
    tradeCoin && (obj.tradeCoin = tradeCoin);
    payCoin && (obj.payCoin = payCoin);
    type && (obj.type = type);
    nickName && (obj.nickName = nickName);
    if (!this.props.coinType) {
      this.props.getCoinType().then(() => {
        this.queryListAuctionOrders(obj);
      });
    } else {
      this.queryListAuctionOrders(obj);
    }
  }

  queryListAuctionOrders = async obj => {
    const res = await createApi.queryListAuctionOrders(obj);
    console.log(res);
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
        const tradeCoin =
          values.tradeCoin === '0' ? '' : values.tradeCoin.toLowerCase();
        const payCoin =
          values.payCoin === '0' ? '' : values.payCoin.toLowerCase();
        const type = values.type;
        const nickName = values.nickName;
        const status =
          values.status === 'AuctionOrderStatusUnknown'
            ? defaultStatus
            : values.status;
        this.props.getSearchObj({
          tradeCoin,
          payCoin,
          type,
          nickName,
          status
        });
        const pager = { ...this.props.pagination };
        pager.current = 1;
        this.props.getPagination(pager);
        const obj = {
          // tradeCoin:
          //   values.tradeCoin === '0' ? '' : values.tradeCoin.toLowerCase(),
          // payCoin: values.payCoin === '0' ? '' : values.payCoin.toLowerCase(),
          // type: values.type,
          status:
            values.status === 'AuctionOrderStatusUnknown'
              ? defaultStatus
              : values.status,
          'listOptions.limit': this.state.limit,
          'listOptions.offset': 0
        };
        tradeCoin && (obj.tradeCoin = tradeCoin);
        payCoin && (obj.payCoin = payCoin);
        type && (obj.type = type);
        nickName && (obj.nickName = nickName);
        this.queryListAuctionOrders(obj);
      }
    });
  };

  handleTableChange = pagination => {
    const pager = { ...this.props.pagination };
    const { searchObj } = this.props;
    pager.current = pagination.current;
    this.props.getPagination(pager);
    const tradeCoin = searchObj.tradeCoin;
    const payCoin = searchObj.payCoin;
    const type = searchObj.type;
    const nickName = searchObj.nickName;
    const status = searchObj.status;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
      // tradeCoin:
      //   searchObj.tradeCoin === '0' ? '' : searchObj.tradeCoin.toLowerCase(),
      // payCoin: searchObj.payCoin === '0' ? '' : searchObj.payCoin.toLowerCase(),
      // type: searchObj.type,
      // status:
      //   searchObj.status === 'AuctionOrderStatusUnknown'
      //     ? defaultStatus
      // : searchObj.status
    };
    tradeCoin && (obj.tradeCoin = tradeCoin);
    payCoin && (obj.payCoin = payCoin);
    type && (obj.type = type);
    nickName && (obj.nickName = nickName);
    status && (obj.status = status);
    this.queryListAuctionOrders(obj);
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
        // render: text => <span>{text.id}</span>
      },
      // {
      //   title: '订单号',
      //   dataIndex: 'orderID',
      //   key: 'orderID'
      // },
      {
        title: '用户名',
        dataIndex: 'nickName',
        key: 'nickName',
        width: '12%'
      },
      // {
      //   title: '用户名',
      //   dataIndex: 'userName',
      //   key: 'userName'
      // },
      {
        title: '市场',
        dataIndex: 'symbol',
        key: 'symbol',
        width: '9%',
        render: text => <span>{text ? text.toUpperCase() : ''}</span>
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: '9%',
        render: text => <span>{text ? auctionCoinType[text] : ''}</span>
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        width: '10%'
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
        width: '10%'
      },
      {
        title: '手续费',
        dataIndex: 'fee',
        key: 'fee',
        width: '10%'
      },
      {
        title: '总额',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        width: '10%'
      },
      {
        title: '交易时间',
        dataIndex: 'payedTime',
        key: 'payedTime',
        width: '14%',
        render: text => <span>{text ? timestampToTime(text / 1000) : ''}</span>
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text => <span>{text ? auctionOrderStatus[text] : ''}</span>
      }
      // {
      //   title: '操作',
      //   render: text => (text ? <Button>撤销</Button> : '')
      // }
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.snatchConfig_list}>
        <p className="common_title">抢拍记录</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item label="交易币种">
            {getFieldDecorator('tradeCoin', {
              initialValue: searchObj.tradeCoin || '0'
            })(
              <Select>
                <Option value="0">全部</Option>
                {coinType &&
                  coinType.map(item => (
                    <Option value={item.code} key={item.code}>
                      {item.code}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="支付币种">
            {getFieldDecorator('payCoin', {
              initialValue: searchObj.payCoin || '0'
            })(
              <Select>
                <Option value="0">全部</Option>
                {coinType &&
                  coinType.map(item => (
                    <Option value={item.code} key={item.code}>
                      {item.code}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="类型">
            {getFieldDecorator('type', {
              initialValue: searchObj.type || 'AuctionCoinTypeUnknow'
            })(
              <Select>
                <Option value="AuctionCoinTypeUnknow">全部</Option>
                <Option value="AuctionCoinTypeSell">拍卖</Option>
                <Option value="AuctionCoinTypeBuy">抢购</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('status', {
              initialValue: searchObj.status || 'AuctionOrderStatusUnknown'
            })(
              <Select>
                {/* {auctionOrderStatus &&
                  Object.keys(auctionOrderStatus).map(key => (
                    <Option value={key}>{auctionOrderStatus[key]}</Option>
                  ))} */}
                <Option value="AuctionOrderStatusUnknown">全部</Option>
                <Option value="AuctionOrderStatusDone">已成交</Option>
                <Option value="AuctionOrderStatusCancelled">已撤销</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('nickName', {
              initialValue: searchObj.nickName || ''
            })(<Input placeholder="用户名" className="search_input" />)}
          </Form.Item>
          {/* <Form.Item>
            {getFieldDecorator('input')(
              <Input placeholder="开始价" className="search_input" />
            )}
          </Form.Item>
          -
          <Form.Item>
            {getFieldDecorator('input')(
              <Input placeholder="结束价" className="search_input" />
            )}
          </Form.Item> */}
          <Form.Item>
            <Button htmlType="submit" className="mr20">
              搜索
            </Button>
          </Form.Item>
        </Form>
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
