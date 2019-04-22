import React, { Component } from 'react';
import { Input, Button, Select, DatePicker, Table, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import styles from './bitcoinTransaction.less';

// 币币成交查询
export default class BitcoinTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: {
        coin: null, // 币种
        priceUnit: null, // 计价单位
        transactionTimeStart: null, // 交易日期start
        transactionTimeEnd: null, // 交易日期end
        account: null, // 买方/卖方账号
        delegateNo: null // 买方/卖方委托编号
      },
      priceUnitOptions: [], // 计价单位选项
      tableLoading: true,
      tableData: [],
      page: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    };
  }

  componentDidMount = () => {
    this.getTableData();
    this.getCoinOptions();
  };

  // 获取币种选项
  getCoinOptions = () => {
    this.setState({
      priceUnitOptions: [
        {
          value: '',
          label: '计价单位'
        },
        {
          value: 'USDT',
          label: 'USDT'
        },
        {
          value: 'ETH',
          label: 'ETH'
        }
      ]
    });
  };

  // change事件
  handlerChange = (searchKey, value) => {
    const search = Object.assign({}, this.state.searchData);
    if (searchKey === 'transactionTime') {
      // 交易日期
      search.transactionTimeStart = value.length
        ? moment(value[0]).format('YYYY-MM-DD')
        : '';
      search.transactionTimeEnd = value.length
        ? moment(value[1]).format('YYYY-MM-DD')
        : '';
    } else {
      search[searchKey] = value;
    }
    this.setState({
      searchData: search
    });
  };

  // 获取表格数据（查询和分页
  getTableData = () => {
    const { current, pageSize } = this.state.page;
    const {
      coin, // 币种
      priceUnit, // 计价单位
      transactionTimeStart, // 交易日期start
      transactionTimeEnd, // 交易日期end
      account, // 买方/卖方账号
      delegateNo // 买方/卖方委托编号
    } = this.state.searchData;
    const param = {
      current,
      pageSize
    };
    this.setState({
      tableLoading: true
    });
    if (coin && priceUnit) param.tradingOn = `${coin}/${priceUnit}`; // 交易对
    if (transactionTimeStart) param.transactionTimeStart = transactionTimeStart;
    if (transactionTimeEnd) param.transactionTimeEnd = transactionTimeEnd;
    if (account) param.account = account;
    if (delegateNo) param.delegateNo = delegateNo;
    /*
      api.getData(param)
    */
    console.log('param: ', param);

    this.setState({
      tableData: [
        {
          key: '1',
          transactionNo: 'fasfasdfsa23412', // 交易编号
          transactionTime: '2019-01-01 10:10:10', // 交易时间
          tradingOn: 'BTC/USDT', // 交易对
          buyerAccount: '13800000000', // 买方账号
          sellerAccount: '13800000000', // 卖方账号
          transactionPrice: '3.22545454', // 成交价
          transactionNum: '100', // 成交量
          buyerEntrustmentNo: 'fefsadf1254', // 买方委托编号
          buyerCommission: '2.465748748', // 买方手续费
          sellerEntrustmentNo: 'fefsadf1254', // 卖方委托编号
          sellerCommission: '2.465748748' // 卖方手续费
        },
        {
          key: '2',
          transactionNo: 'fasfasdfsa23412', // 交易编号
          transactionTime: '2019-01-01 10:10:10', // 交易时间
          tradingOn: 'BTC/USDT', // 交易对
          buyerAccount: '13800000000', // 买方账号
          sellerAccount: '13800000000', // 卖方账号
          transactionPrice: '3.22545454', // 成交价
          transactionNum: '100', // 成交量
          buyerEntrustmentNo: 'fefsadf1254', // 买方委托编号
          buyerCommission: '2.465748748', // 买方手续费
          sellerEntrustmentNo: 'fefsadf1254', // 卖方委托编号
          sellerCommission: '2.465748748' // 卖方手续费
        },
        {
          key: '3',
          transactionNo: 'fasfasdfsa23412', // 交易编号
          transactionTime: '2019-01-01 10:10:10', // 交易时间
          tradingOn: 'BTC/USDT', // 交易对
          buyerAccount: '13800000000', // 买方账号
          sellerAccount: '13800000000', // 卖方账号
          transactionPrice: '3.22545454', // 成交价
          transactionNum: '100', // 成交量
          buyerEntrustmentNo: 'fefsadf1254', // 买方委托编号
          buyerCommission: '2.465748748', // 买方手续费
          sellerEntrustmentNo: 'fefsadf1254', // 卖方委托编号
          sellerCommission: '2.465748748' // 卖方手续费
        }
      ]
    });
    this.setState({
      tableLoading: false
    });
  };

  // 获取分页参数
  getPaginationProps = () => {
    const { pageSize, current, total } = this.state.page;
    return {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: () => `共${total}条`,
      pageSizeOptions: ['10', '20', '50', '100', '500', '1000'],
      pageSize,
      current,
      total,
      onShowSizeChange: (current, pageSize) => {
        const obj = this.state.page;
        obj.current = current;
        obj.pageSize = pageSize;
        this.setState(
          {
            page: obj
          },
          () => this.getTableData()
        );
      },
      onChange: current => this.changePage(current)
    };
  };

  // 换页
  changePage = current => {
    const pageData = Object.assign({}, this.state.page, { current });
    this.setState(
      {
        page: pageData
      },
      () => this.getTableData()
    );
  };

  render() {
    const { Column } = Table;
    // 表格列 对应的 key和名称
    const columnText = {
      transactionNo: '交易编号',
      transactionTime: '交易时间',
      tradingOn: '交易对',
      buyerAccount: '买方账号',
      sellerAccount: '卖方账号',
      transactionPrice: '成交价',
      transactionNum: '成交量',
      buyerEntrustmentNo: '买方委托编号',
      buyerCommission: '买方手续费',
      sellerEntrustmentNo: '卖方委托编号',
      sellerCommission: '卖方手续费'
    };

    // 禁用今天之后的日期选择
    function disabledDate(current) {
      // Can not select days before today and today
      return current > moment().endOf('day');
    }

    return (
      <div className={styles.bitcoinTransaction}>
        <section className="common_title">币币成交查询</section>
        <section className={styles.search_form}>
          <div className={styles['search-item']}>
            <span>交易对：</span>
            <Input
              style={{ width: 120 }}
              placeholder="币种"
              onChange={e => this.handlerChange('coin', e.target.value)}
            />
            &nbsp;/&nbsp;
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={value => this.handlerChange('priceUnit', value)}
            >
              {this.state.priceUnitOptions.map(coin => (
                <Select.Option key={coin} value={coin.value}>
                  {coin.label}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className={styles['search-item']}>
            <span>交易日期：</span>
            <LocaleProvider locale={zh_CN}>
              <DatePicker.RangePicker
                style={{ width: '240px' }}
                disabledDate={disabledDate}
                onChange={value => this.handlerChange('transactionTime', value)}
              />
            </LocaleProvider>
          </div>
          <br />
          <div className={styles['search-item']}>
            <Input
              placeholder="买方/卖方账号"
              style={{ width: '200px' }}
              onBlur={e => this.handlerChange('account', e.target.value)}
            />
          </div>
          <div className={styles['search-item']}>
            <Input
              placeholder="买方/卖方账号委托编号"
              style={{ width: '200px' }}
              onBlur={e => this.handlerChange('delegateNo', e.target.value)}
            />
          </div>
          <Button onClick={() => this.getTableData('isSearch')}>查询</Button>
        </section>
        <LocaleProvider locale={zh_CN}>
          <Table
            bordered
            loading={this.state.tableLoading}
            dataSource={this.state.tableData}
            pagination={this.getPaginationProps()}
          >
            {Object.keys(columnText).map(key => (
              <Column
                title={columnText[key]}
                align="center"
                dataIndex={key}
                key={key}
              />
            ))}
          </Table>
        </LocaleProvider>
      </div>
    );
  }
}
