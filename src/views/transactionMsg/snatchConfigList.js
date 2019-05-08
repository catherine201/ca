import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DatePicker, Button, Table, Form, Select } from 'antd';
import createApi from '../../api/list';
import styles from './index.less';
import { timestampToTime } from '../../utils';
import { auctionCoinType } from '../../utils/map';

const { RangePicker } = DatePicker;
const Option = Select.Option;

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
      limit: 10
      // searchObj: {}
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
    const saleTime = searchObj.saleTime;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    tradeCoin && (obj.tradeCoin = tradeCoin);
    payCoin && (obj.payCoin = payCoin);
    type && (obj.type = type);
    saleTime && (obj.saleTime = saleTime);
    // if (!this.props.coinType) {
    //   this.props.getCoinType().then(() => {
    //     this.queryAuctionCoin(obj);
    //   });
    // } else {
    //   this.queryAuctionCoin(obj);
    // }
    const coinObj = {
      type: 'CoinTypeAuction'
    };
    this.props.getCoinType(coinObj).then(() => {
      this.queryAuctionCoin(obj);
    });
    //  this.queryCoinInAddr(obj);
  }

  queryAuctionCoin = async obj => {
    const res = await createApi.queryAuctionCoin(obj);
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
        const saleTime =
          values.rangePicker &&
          values.rangePicker[0] &&
          new Date(values.rangePicker[0].format('YYYY-MM-DD')).getTime();
        this.props.getSearchObj({
          tradeCoin,
          payCoin,
          type,
          saleTime
        });
        const pager = { ...this.props.pagination };
        pager.current = 1;
        this.props.getPagination(pager);
        const obj = {
          // tradeCoin:
          //   values.tradeCoin === '0' ? '' : values.tradeCoin.toLowerCase(),
          // payCoin: values.payCoin === '0' ? '' : values.payCoin.toLowerCase(),
          // type: values.type,
          // saleTime:
          //   values.rangePicker &&
          //   values.rangePicker[0] &&
          //   new Date(values.rangePicker[0].format('YYYY-MM-DD')).getTime(),
          // endTime:
          //   values.rangePicker &&
          //   values.rangePicker[1] &&
          //   new Date(values.rangePicker[1].format('YYYY-MM-DD')).getTime(),
          'listOptions.limit': this.state.limit,
          'listOptions.offset': 0
        };
        tradeCoin && (obj.tradeCoin = tradeCoin);
        payCoin && (obj.payCoin = payCoin);
        type && (obj.type = type);
        saleTime && (obj.saleTime = saleTime);
        this.queryAuctionCoin(obj);
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
    const saleTime = searchObj.saleTime;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    tradeCoin && (obj.tradeCoin = tradeCoin);
    payCoin && (obj.payCoin = payCoin);
    type && (obj.type = type);
    saleTime && (obj.saleTime = saleTime);
    this.queryAuctionCoin(obj);
    // this.setState({
    //   pagination: pager
    // });
  };

  toHref = id => {
    this.props.history.push(`/admin/snatchDetail/${id}`);
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
        // render: text => <span>{text}</span>
      },
      {
        title: '抢拍时间',
        dataIndex: 'saleTime',
        key: 'saleTime',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>,
        width: '12%'
      },
      {
        title: '交易币种',
        dataIndex: 'tradeCoin',
        key: 'tradeCoin',
        width: '6%',
        render: text => <span>{text ? text.toUpperCase() : ''}</span>
      },
      {
        title: '支付币种',
        dataIndex: 'payCoin',
        key: 'payCoin',
        width: '6%',
        render: text => <span>{text ? text.toUpperCase() : ''}</span>
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: '8%',
        render: text => <span>{text ? auctionCoinType[text] : ''}</span>
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        width: '8%'
      },
      {
        title: '冻结数量',
        dataIndex: 'freezeAmount',
        key: 'freezeAmount',
        width: '8%',
        render: text => <span>{text || 0}</span>
      },
      {
        title: '剩余数量',
        dataIndex: 'remainAmount',
        key: 'remainAmount',
        width: '8%',
        render: text => <span>{text || 0}</span>
      },
      {
        title: '总数量',
        dataIndex: 'amount',
        key: 'amount',
        width: '8%',
        render: text => <span>{text || 0}</span>
      },
      {
        title: '最小限额',
        dataIndex: 'limitMin',
        key: 'limitMin',
        width: '8%'
      },
      {
        title: '最大限额',
        dataIndex: 'limitMax',
        key: 'limitMax',
        width: '8%'
      },
      {
        title: '手续费',
        dataIndex: 'fee',
        key: 'fee',
        width: '8%'
      },
      {
        title: '操作',
        align: 'center',
        render: text => (
          <Button
            onClick={() => {
              this.toHref(text.id);
            }}
          >
            编辑
          </Button>
        )
      }
    ];
    const { getFieldDecorator } = this.props.form;
    const initRange = [searchObj.saleTime];
    return (
      <div className={styles.snatchConfig_list}>
        <p className="common_title">抢拍配置列表</p>
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
                <Option value="0">请选择交易币种</Option>
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
                <Option value="0">请选择支付币种</Option>
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
                <Option value="AuctionCoinTypeUnknow">请选择类型</Option>
                <Option value="AuctionCoinTypeBuy">抢购</Option>
                <Option value="AuctionCoinTypeSell">拍卖</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="">
            {getFieldDecorator('rangePicker', { initialValue: initRange })(
              <RangePicker />
            )}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="mr20">
              搜索
            </Button>
            <Button
              onClick={() => {
                this.toHref(0);
              }}
            >
              添加
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
