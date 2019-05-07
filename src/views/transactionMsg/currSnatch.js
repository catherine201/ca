import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Form, Select, Input, Popconfirm } from 'antd';
import createApi from '../../api/list';
import styles from './index.less';
import { auctionCoinType, auctionOrderStatus } from '../../utils/map';
import { timestampToTime } from '../../utils';
import EditAmount from './editAmount';

const Option = Select.Option;
const fliterArr = [
  'AuctionOrderStatusCreated',
  'AuctionOrderStatusAllocated',
  'AuctionOrderStatusPayed',
  'AuctionOrderStatusOverdue',
  'AuctionOrderStatusAgreed'
];

class AuthenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      searchName: '',
      data: [],
      tableHeight: document.body.offsetHeight - 250,
      // pagination: {
      //   defaultCurrent: 1,
      //   defaultPageSize: 10,
      //   current: 1
      // },
      batchArr: [],
      limit: 10,
      // searchObj: {},
      showEdit: false,
      editData: {}
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      console.log(this);
      this.setState({
        tableHeight: document.body.offsetHeight - 250
      });
    });
    const { pagination, searchObj } = this.props;
    const tradeCoin = searchObj.tradeCoin;
    const payCoin = searchObj.payCoin;
    const type = searchObj.type;
    const nickName = searchObj.nickName;
    console.log(pagination);
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit,
      status: fliterArr
    };
    tradeCoin && (obj.tradeCoin = tradeCoin);
    payCoin && (obj.payCoin = payCoin);
    type && (obj.type = type);
    nickName && (obj.nickName = nickName);
    // if (!this.props.coinType) {
    //   this.props.getCoinType().then(() => {
    //     this.queryListAuctionOrders(obj);
    //   });
    // } else {
    //   this.queryListAuctionOrders(obj);
    // }
    const coinObj = {
      type: 'CoinTypeAuction'
    };
    this.props.getCoinType(coinObj).then(() => {
      this.queryListAuctionOrders(obj);
    });
  }

  queryListAuctionOrders = async obj => {
    const res = await createApi.queryListAuctionOrders(obj);
    console.log(res);
    if (res && res.paging) {
      const pagination = { ...this.props.pagination };
      pagination.total = res.paging.total - 0;
      this.props.getPagination(pagination);
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
        this.props.getSearchObj({
          tradeCoin,
          payCoin,
          type,
          nickName
        });
        const pager = { ...this.props.pagination };
        pager.current = 1;
        this.props.getPagination(pager);
        const obj = {
          // tradeCoin:
          //   values.tradeCoin === '0' ? '' : values.tradeCoin.toLowerCase(),
          // payCoin: values.payCoin === '0' ? '' : values.payCoin.toLowerCase(),
          // type: values.type,
          'listOptions.limit': 10,
          'listOptions.offset': 0,
          status: fliterArr
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
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit,
      // tradeCoin:
      //   searchObj.tradeCoin === '0' ? '' : searchObj.tradeCoin.toLowerCase(),
      // payCoin: searchObj.payCoin === '0' ? '' : searchObj.payCoin.toLowerCase(),
      // type: searchObj.type,
      status: fliterArr
    };
    tradeCoin && (obj.tradeCoin = tradeCoin);
    payCoin && (obj.payCoin = payCoin);
    type && (obj.type = type);
    nickName && (obj.nickName = nickName);
    this.queryListAuctionOrders(obj);
  };

  handleShowEdit = text => {
    this.setState({
      editData: text,
      showEdit: true
    });
  };

  handleClose = obj => {
    const { searchObj, pagination } = this.props;
    console.log(obj);
    this.setState({
      editData: {},
      showEdit: obj.show
    });
    if (obj.queryAgain) {
      const tradeCoin = searchObj.tradeCoin;
      const payCoin = searchObj.payCoin;
      const type = searchObj.type;
      const nickName = searchObj.nickName;
      const obj = {
        'listOptions.limit': this.state.limit,
        'listOptions.offset': (pagination.current - 1) * this.state.limit,
        status: fliterArr
      };
      tradeCoin && (obj.tradeCoin = tradeCoin);
      payCoin && (obj.payCoin = payCoin);
      type && (obj.type = type);
      nickName && (obj.nickName = nickName);
      this.queryListAuctionOrders(obj);
    }
  };

  confirm = id => {
    console.log(id);
    const obj = {
      url: id
    };
    this.cancelAuctionOrder(obj);
  };

  cancelAuctionOrder = async obj => {
    const { searchObj, pagination } = this.props;
    const res = await createApi.cancelAuctionOrder(obj);
    console.log(res);
    if (res) {
      const tradeCoin = searchObj.tradeCoin;
      const payCoin = searchObj.payCoin;
      const type = searchObj.type;
      const nickName = searchObj.nickName;
      const obj = {
        'listOptions.limit': this.state.limit,
        'listOptions.offset': (pagination.current - 1) * this.state.limit,
        status: fliterArr
      };
      tradeCoin && (obj.tradeCoin = tradeCoin);
      payCoin && (obj.payCoin = payCoin);
      type && (obj.type = type);
      nickName && (obj.nickName = nickName);
      this.queryListAuctionOrders(obj);
    }
  };

  handleBatchCancled = () => {
    const arr = [];
    const obj = {};
    this.state.batchArr.forEach(item => {
      obj.url = item.id;
      arr.push(createApi.cancelAuctionOrder(obj));
    });
    Promise.all(arr).then(value => {
      console.log(value);
    });
  };

  cancel = e => {
    console.log(e);
  };

  render() {
    const { coinType, pagination, searchObj } = this.props;
    const { data, showEdit, editData, tableHeight } = this.state;
    const columns = [
      {
        title: '订单号',
        dataIndex: 'id',
        key: 'id',
        width: '15%'
      },
      {
        title: '用户名',
        dataIndex: 'nickName',
        key: 'nickName',
        width: '10%'
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
        width: '5%',
        render: text => <span>{text ? text.toUpperCase() : ''}</span>
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: '4%',
        render: text => <span>{text ? auctionCoinType[text] : ''}</span>
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        width: '6%'
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
        width: '6%'
      },
      {
        title: '已成交',
        dataIndex: 'matchAmount',
        key: 'matchAmount',
        width: '6%'
      },
      {
        title: '总额',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        width: '6%'
      },
      {
        title: '交易时间',
        dataIndex: 'payedTime',
        key: 'payedTime',
        width: '9%',
        render: text => <span>{text ? timestampToTime(text / 1000) : ''}</span>
      },
      {
        title: '更新时间',
        dataIndex: 'updatedTime',
        key: 'updatedTime',
        width: '9%',
        render: text => <span>{text ? timestampToTime(text / 1000) : ''}</span>
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '6%',
        render: text => <span>{text ? auctionOrderStatus[text] : ''}</span>
      },
      {
        title: '操作',
        align: 'center',
        render: text =>
          text ? (
            <React.Fragment>
              <Button
                onClick={() => {
                  this.handleShowEdit(text);
                }}
                className="mr10"
                disabled={text.status === 'AuctionOrderStatusAllocated'}
              >
                编辑
              </Button>
              <Popconfirm
                title="你确定要撤销?"
                onConfirm={() => {
                  this.confirm(text.id);
                }}
                onCancel={() => {
                  this.cancel;
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button>撤销</Button>
              </Popconfirm>
            </React.Fragment>
          ) : (
            ''
          )
      }
    ];
    const { getFieldDecorator } = this.props.form;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        );
        console.log(selectedRows);
        this.setState({
          batchArr: selectedRows
        });
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name
      })
    };
    return (
      <div className={styles.snatchConfig_list}>
        <p className="common_title">当前抢拍</p>
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
                      {item.code.toUpperCase()}
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
                      {item.code.toUpperCase()}
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
                <Option value="AuctionCoinTypeBuy">抢购</Option>
                <Option value="AuctionCoinTypeSell">拍卖</Option>
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
            <Button
              onClick={() => {
                this.handleBatchCancled();
              }}
            >
              批量撤单
            </Button>
          </Form.Item>
        </Form>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          bordered
          dataSource={data}
          pagination={pagination}
          onChange={this.handleTableChange}
          scroll={{ y: tableHeight }}
          rowKey={record => {
            console.log(record.id);
            return record.id;
          }}
        />
        {showEdit && (
          <EditAmount editData={editData} handleClose={this.handleClose} />
        )}
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
