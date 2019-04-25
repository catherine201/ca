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
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10,
        current: 1
      },
      limit: 10,
      searchObj: {}
    };
  }

  componentDidMount() {
    const obj = {
      'listOptions.limit': 10,
      'listOptions.offset': 0
    };
    if (!this.props.coinType) {
      this.props.getCoinType().then(() => {
        this.queryAuctionCoin(obj);
      });
    } else {
      this.queryAuctionCoin(obj);
    }
    //  this.queryCoinInAddr(obj);
  }

  queryAuctionCoin = async obj => {
    // console.log(this.props.coinType);
    const res = await createApi.queryAuctionCoin(obj);
    console.log(res.list);
    if (res && res.paging) {
      const pagination = { ...this.state.pagination };
      pagination.total = res.paging.total - 0;
      //   const data = res.datas || [];
      if (res.datas) {
        res.datas.map((item, index) => {
          res.datas[index].index = (res.paging.offset - 0 || 0) + index + 1;
        });
      }
      console.log(res.datas);
      console.log(pagination);
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
          saleTime:
            values.rangePicker &&
            values.rangePicker[0] &&
            new Date(values.rangePicker[0].format('YYYY-MM-DD')).getTime(),
          // endTime:
          //   values.rangePicker &&
          //   values.rangePicker[1] &&
          //   new Date(values.rangePicker[1].format('YYYY-MM-DD')).getTime(),
          'listOptions.limit': 10,
          'listOptions.offset': 0
        };
        this.queryAuctionCoin(obj);
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
      saleTime:
        searchObj.rangePicker &&
        searchObj.rangePicker[0] &&
        new Date(searchObj.rangePicker[0].format('YYYY-MM-DD')).getTime()
    };
    this.queryAuctionCoin(obj);
    this.setState({
      pagination: pager
    });
  };

  toHref = id => {
    this.props.history.push(`/admin/snatchDetail/${id}`);
  };

  render() {
    const { coinType } = this.props;
    const { data, pagination } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index'
        // render: text => <span>{text}</span>
      },
      {
        title: '抢拍时间',
        dataIndex: 'saleTime',
        key: 'saleTime',
        render: text => <span>{text ? timestampToTime(text / 1000) : ''}</span>
      },
      {
        title: '交易币种',
        dataIndex: 'tradeCoin',
        key: 'tradeCoin'
      },
      {
        title: '支付币种',
        dataIndex: 'payCoin',
        key: 'payCoin'
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
        title: '最小限额',
        dataIndex: 'limitMin',
        key: 'limitMin'
      },
      {
        title: '最大限额',
        dataIndex: 'limitMax',
        key: 'limitMax'
      },
      {
        title: '手续费',
        dataIndex: 'fee',
        key: 'fee'
      },
      {
        title: '操作',
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
    return (
      <div className={styles.snatchConfig_list}>
        <p className="common_title">抢拍配置列表</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item label="交易币种">
            {getFieldDecorator('tradeCoin', { initialValue: '0' })(
              <Select>
                <Option value="0">请选择交易币种</Option>
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
                <Option value="0">请选择支付币种</Option>
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
                <Option value="AuctionCoinTypeUnknow">请选择类型</Option>
                <Option value="AuctionCoinTypeSell">抢购</Option>
                <Option value="AuctionCoinTypeBuy">拍卖</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="">
            {getFieldDecorator('rangePicker')(<RangePicker />)}
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
