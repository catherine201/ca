import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Form, Select, Input } from 'antd';
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
  'AuctionOrderStatusOverdue'
];

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
      limit: 10,
      searchObj: {},
      showEdit: false,
      editData: {}
    };
  }

  componentDidMount() {
    const obj = {
      'listOptions.limit': 10,
      'listOptions.offset': 0,
      status: fliterArr
    };
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
      const pagination = { ...this.state.pagination };
      pagination.total = res.paging.total - 0;
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
        this.setState({
          searchObj: values
        });
        const obj = {
          tradeCoin:
            values.tradeCoin === '0' ? '' : values.tradeCoin.toLowerCase(),
          payCoin: values.payCoin === '0' ? '' : values.payCoin.toLowerCase(),
          type: values.type,
          'listOptions.limit': 10,
          'listOptions.offset': 0,
          status: fliterArr
        };
        this.queryListAuctionOrders(obj);
      }
    });
  };

  handleTableChange = pagination => {
    const pager = { ...this.state.pagination };
    const { searchObj } = this.state;
    pager.current = pagination.current;
    const obj = {
      'listOptions.limit': 10,
      'listOptions.offset': (pagination.current - 1) * this.state.limit,
      tradeCoin:
        searchObj.tradeCoin === '0' ? '' : searchObj.tradeCoin.toLowerCase(),
      payCoin: searchObj.payCoin === '0' ? '' : searchObj.payCoin.toLowerCase(),
      type: searchObj.type,
      status: fliterArr
    };
    this.queryListAuctionOrders(obj);
    this.setState({
      pagination: pager
    });
  };

  handleShowEdit = text => {
    this.setState({
      editData: text,
      showEdit: true
    });
  };

  handleClose = obj => {
    console.log(obj);
    this.setState({
      editData: {},
      showEdit: obj.show
    });
    if (obj.queryAgain) {
      const obj = {
        'listOptions.limit': 10,
        'listOptions.offset': 0,
        status: fliterArr
      };
      this.queryListAuctionOrders(obj);
    }
  };

  render() {
    const { coinType } = this.props;
    const { data, pagination, showEdit, editData } = this.state;
    const columns = [
      {
        title: '订单号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '用户ID',
        dataIndex: 'accountID',
        key: 'accountID'
      },
      // {
      //   title: '用户名',
      //   dataIndex: 'userName',
      //   key: 'userName'
      // },
      {
        title: '市场',
        dataIndex: 'symbol',
        key: 'symbol'
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: text => <span>{text ? auctionCoinType[text] : ''}</span>
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount'
      },
      {
        title: '已成交',
        dataIndex: 'matchAmount',
        key: 'matchAmount'
      },
      {
        title: '总额',
        dataIndex: 'totalAmount',
        key: 'totalAmount'
      },
      {
        title: '交易时间',
        dataIndex: 'payedTime',
        key: 'payedTime',
        render: text => <span>{text ? timestampToTime(text / 1000) : ''}</span>
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text => <span>{text ? auctionOrderStatus[text] : ''}</span>
      },
      {
        title: '操作',
        render: text =>
          text ? (
            <React.Fragment>
              <Button
                onClick={() => {
                  this.handleShowEdit(text);
                }}
                className="mr20"
              >
                编辑
              </Button>
              <Button>撤销</Button>
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
            {getFieldDecorator('tradeCoin', { initialValue: '0' })(
              <Select>
                <Option value="0">全部</Option>
                {coinType &&
                  coinType.map(item => (
                    <Option value={item.code}>{item.code}</Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="支付币种">
            {getFieldDecorator('payCoin', { initialValue: '0' })(
              <Select>
                <Option value="0">全部</Option>
                {coinType &&
                  coinType.map(item => (
                    <Option value={item.code}>{item.code}</Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="类型">
            {getFieldDecorator('type', {
              initialValue: 'AuctionCoinTypeUnknow'
            })(
              <Select>
                <Option value="AuctionCoinTypeUnknow">全部</Option>
                <Option value="AuctionCoinTypeBuy">抢购</Option>
                <Option value="AuctionCoinTypeSell">拍卖</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('input')(
              <Input placeholder="用户名" className="search_input" />
            )}
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
            <Button>批量撤单</Button>
          </Form.Item>
        </Form>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={pagination}
          onChange={this.handleTableChange}
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
  coinType: state.selectOption.coinType
});

const mapDispatchToProps = dispatch => ({
  getCoinType: dispatch.selectOption.getCoinType
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AuthenList));
