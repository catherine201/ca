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
        auditStatus: 0, // 审核状态：0待审核，1通过，2驳回
        withdrawDateStart: null, // 提币日期start
        withdrawDateEnd: null, // 提币日期end
        auditDateStart: null, // 审核日期start
        auditDateEnd: null, // 审核日期end
        coinNumMin: null, // 提币最小数量
        coinNumMax: null, // 提币最大数量
        coinUser: null // 提币用户
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

  // 选择币种
  coinChange = coin => {
    const search = Object.assign({}, this.state.searchData);
    search.coin = coin;
    this.setState({
      searchData: search
    });
  };

  // 审核状态选择
  auditStatusChange = auditStatus => {
    const search = Object.assign({}, this.state.searchData);
    search.auditStatus = auditStatus;
    this.setState({
      searchData: search
    });
  };

  // 获取表格数据（查询和分页
  getTableData = () => {
    const { current, pageSize } = this.state.page;
    const {
      coin, // 币种
      auditStatus, // 审核状态
      withdrawDateStart, // 提币日期start
      withdrawDateEnd, // 提币日期end
      auditDateStart, // 审核日期start
      auditDateEnd, // 审核日期end
      coinNumMin, // 提币最小数量
      coinNumMax, // 提币最大数量
      coinUser // 提币用户
    } = this.state.searchData;
    const param = {
      current,
      pageSize,
      auditStatus
    };
    this.setState({
      tableLoading: true
    });
    if (coin) param.coin = coin;
    if (withdrawDateStart) param.withdrawDateStart = withdrawDateStart;
    if (withdrawDateEnd) param.withdrawDateEnd = withdrawDateEnd;
    if (auditDateStart) param.auditDateStart = auditDateStart;
    if (auditDateEnd) param.auditDateEnd = auditDateEnd;
    if (coinNumMin) param.coinNumMin = coinNumMin;
    if (coinNumMax) param.coinNumMax = coinNumMax;
    if (coinUser) param.coinUser = coinUser;
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
        this.setState({
          page: obj
        });
      },
      onChange: current => this.changePage(current)
    };
  };

  // 换页
  changePage = current => {
    const pageData = Object.assign({}, this.state.page, { current });
    this.setState({
      page: pageData
    });
    this.getTableData();
  };

  // 提币日期
  withdrawDateChange = value => {
    const search = Object.assign({}, this.state.searchData);
    search.withdrawDateStart = !value.length
      ? ''
      : moment(value[0]).format('YYYY-MM-DD');
    search.withdrawDateEnd = !value.length
      ? ''
      : moment(value[1]).format('YYYY-MM-DD');
    this.setState({
      searchData: search
    });
  };

  // 审核日期
  auditDateChange = value => {
    const search = Object.assign({}, this.state.searchData);
    search.auditDateStart = !value.length
      ? ''
      : moment(value[0]).format('YYYY-MM-DD');
    search.auditDateEnd = !value.length
      ? ''
      : moment(value[1]).format('YYYY-MM-DD');
    this.setState({
      searchData: search
    });
  };

  // 单笔最小数量
  minNumChange = value => {
    const search = Object.assign({}, this.state.searchData);
    search.coinNumMin = value;
    this.setState({
      searchData: search
    });
  };

  // 单笔最大数量
  maxNumChange = value => {
    const search = Object.assign({}, this.state.searchData);
    search.coinNumMax = value;
    this.setState({
      searchData: search
    });
  };

  // 提币用户
  onCoinuserChange = e => {
    const search = Object.assign({}, this.state.searchData);
    search.coinUser = e.target.value;
    this.setState({
      searchData: search
    });
  };

  render() {
    const { Column } = Table;
    const statusText = ['委托中', '全部成交', '部分成交', '已撤单'];

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
            <Input style={{ width: 120 }} placeholder="币种" />
            &nbsp;/&nbsp;
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={this.auditStatusChange}
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
                onChange={this.auditDateChange}
              />
            </LocaleProvider>
          </div>
          <br />
          <div className={styles['search-item']}>
            <Input
              placeholder="买方/卖方账号"
              style={{ width: '200px' }}
              onBlur={this.onCoinuserChange}
            />
          </div>
          <div className={styles['search-item']}>
            <Input
              placeholder="买方/卖方账号委托编号"
              style={{ width: '200px' }}
              onBlur={this.onCoinuserChange}
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
            {Object.keys(columnText).map(key =>
              key === 'status' ? ( // 状态列
                <Column
                  title={columnText[key]}
                  align="center"
                  dataIndex={key}
                  key={key}
                  render={(text, row) => {
                    <span>{statusText[+row.status]}</span>;
                  }}
                />
              ) : (
                // 其他列
                <Column
                  title={columnText[key]}
                  align="center"
                  dataIndex={key}
                  key={key}
                />
              )
            )}
          </Table>
        </LocaleProvider>
      </div>
    );
  }
}
