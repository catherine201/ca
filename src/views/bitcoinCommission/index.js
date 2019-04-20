import React, { Component } from 'react';
import { Input, Button, Select, DatePicker, Table, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import styles from './bitcoinCommission.less';

// 币币委托查询
export default class BitcoinCommission extends Component {
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
      tradeTypeOptions: [], // 交易方式选项
      tradeDirectionOptions: [], // 交易方向选项
      statusOptions: [], // 状态选项
      priceUnitOptions: [], // 计价单位选项
      tableCheck: null, // 表格选择项 []
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
    this.getSelectOptions();
  };

  // 获取选项
  getSelectOptions = () => {
    this.setState({
      tradeTypeOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '限价'
        },
        {
          value: '2',
          label: '市价'
        },
        {
          value: '3',
          label: '止盈止损'
        }
      ]
    });
    this.setState({
      tradeDirectionOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '买入'
        },
        {
          value: '2',
          label: '卖出'
        }
      ]
    });
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
    this.setState({
      statusOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '委托中'
        },
        {
          value: '2',
          label: '全部成交'
        },
        {
          value: '3',
          label: '部分成交'
        },
        {
          value: '4',
          label: '已撤销'
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
          commissionNo: '4646fasffasdf', // 委托编号
          commissionTime: '2019-01-01 10:10:10', // 委托时间
          tradingOn: 'BTC/USDT', // 交易对
          tradeDirection: '买入', // 交易方向
          tradeType: '限价', // 交易方式
          triggerPrice: '2.3435455', // 触发价
          entrustedPrice: '2.8467745', // 委托价
          entrustedNum: '3.3467745', // 委托数量
          tradeTotalValue: '3.3343343', // 已成交总额
          tradeAvgPrice: '3.1343343', // 成交均价
          tradeTotalNum: '3.1343343', // 已成交量
          tradeRatio: '80%', // 成交率
          serviceCharge: '2.23324', // 手续费
          notTradeTotalNum: '3.1343343', // 未成交量
          useraccount: '13800000000', // 委托人账号
          status: '0'
        },
        {
          key: '2',
          commissionNo: '4646fasffasdf', // 委托编号
          commissionTime: '2019-01-01 10:10:10', // 委托时间
          tradingOn: 'BTC/USDT', // 交易对
          tradeDirection: '买入', // 交易方向
          tradeType: '限价', // 交易方式
          triggerPrice: '2.3435455', // 触发价
          entrustedPrice: '2.8467745', // 委托价
          entrustedNum: '3.3467745', // 委托数量
          tradeTotalValue: '3.3343343', // 已成交总额
          tradeAvgPrice: '3.1343343', // 成交均价
          tradeTotalNum: '3.1343343', // 已成交量
          tradeRatio: '80%', // 成交率
          serviceCharge: '2.23324', // 手续费
          notTradeTotalNum: '3.1343343', // 未成交量
          useraccount: '13800000000', // 委托人账号
          status: '1'
        },
        {
          key: '3',
          commissionNo: '4646fasffasdf', // 委托编号
          commissionTime: '2019-01-01 10:10:10', // 委托时间
          tradingOn: 'BTC/USDT', // 交易对
          tradeDirection: '买入', // 交易方向
          tradeType: '限价', // 交易方式
          triggerPrice: '2.3435455', // 触发价
          entrustedPrice: '2.8467745', // 委托价
          entrustedNum: '3.3467745', // 委托数量
          tradeTotalValue: '3.3343343', // 已成交总额
          tradeAvgPrice: '3.1343343', // 成交均价
          tradeTotalNum: '3.1343343', // 已成交量
          tradeRatio: '80%', // 成交率
          serviceCharge: '2.23324', // 手续费
          notTradeTotalNum: '3.1343343', // 未成交量
          useraccount: '13800000000', // 委托人账号
          status: '2'
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

  // tableCheck是否为空
  isTableCheckEmpty = () =>
    this.state.tableCheck !== null &&
    JSON.stringify(this.state.tableCheck) === '[]';

  render() {
    const { Column } = Table;
    const statusText = ['委托中', '全部成交', '部分成交', '已撤单'];

    // 表格列 对应的 key和名称
    const columnText = {
      commissionNo: '委托编号',
      commissionTime: '委托时间',
      tradingOn: '交易对',
      tradeDirection: '交易方向',
      tradeType: '交易方式',
      triggerPrice: '触发价',
      entrustedPrice: '委托价',
      entrustedNum: '委托数量',
      tradeTotalValue: '已成交总额',
      tradeAvgPrice: '成交均价',
      tradeTotalNum: '已成交量',
      tradeRatio: '成交率',
      serviceCharge: '手续费',
      notTradeTotalNum: '未成交量',
      useraccount: '委托人账号',
      status: '状态'
    };

    // 禁用今天之后的日期选择
    function disabledDate(current) {
      // Can not select days before today and today
      return current > moment().endOf('day');
    }

    return (
      <div className={styles.bitcoinCommission}>
        <section className="common_title">币币委托查询</section>
        <section className={styles.search_form}>
          <div className={styles['search-item']}>
            <span>交易方式：</span>
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={this.coinChange}
            >
              {this.state.tradeTypeOptions.map(coin => (
                <Select.Option key={coin} value={coin.value}>
                  {coin.label}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className={styles['search-item']}>
            <span>交易方向：</span>
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={this.auditStatusChange}
            >
              {this.state.tradeDirectionOptions.map(coin => (
                <Select.Option key={coin} value={coin.value}>
                  {coin.label}
                </Select.Option>
              ))}
            </Select>
          </div>
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
            <span>状态：</span>
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={this.auditStatusChange}
            >
              {this.state.statusOptions.map(coin => (
                <Select.Option key={coin} value={coin.value}>
                  {coin.label}
                </Select.Option>
              ))}
            </Select>
          </div>
          <br />
          <div className={styles['search-item']}>
            <span>委托日期：</span>
            <LocaleProvider locale={zh_CN}>
              <DatePicker.RangePicker
                style={{ width: '240px' }}
                disabledDate={disabledDate}
                onChange={this.auditDateChange}
              />
            </LocaleProvider>
          </div>
          <div className={styles['search-item']}>
            <Input
              placeholder="委托人账号"
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
