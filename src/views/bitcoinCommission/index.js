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
        tradeType: null, // 交易方式
        tradeDirection: null, // 交易方向
        coin: null, // 币种
        priceUnit: null, // 计价单位
        status: null, // 状态
        commissionTimeStart: null, // 委托日期
        commissionTimeEnd: null, // 委托日期
        useraccount: null // 委托人账号
      },
      tradeTypeOptions: [], // 交易方式选项
      tradeDirectionOptions: [], // 交易方向选项
      statusOptions: [], // 状态选项
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

  // change事件
  handlerChange = (searchKey, value) => {
    const search = Object.assign({}, this.state.searchData);
    if (searchKey === 'commissionTime') {
      // 委托日期
      search.commissionTimeStart = value.length
        ? moment(value[0]).format('YYYY-MM-DD')
        : '';
      search.commissionTimeEnd = value.length
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
      tradeType, // 交易方式
      tradeDirection, // 交易方向
      coin, // 币种
      priceUnit, // 计价单位
      status, // 状态
      commissionTimeStart, // 委托日期
      commissionTimeEnd, // 委托日期
      useraccount // 委托人账号
    } = this.state.searchData;
    const param = {
      current,
      pageSize
    };
    this.setState({
      tableLoading: true
    });
    if (tradeType) param.tradeType = tradeType;
    if (tradeDirection) param.tradeDirection = tradeDirection;
    if (coin && priceUnit) param.tradingOn = `${coin}/${priceUnit}`;
    if (status) param.status = status;
    if (commissionTimeStart) param.commissionTimeStart = commissionTimeStart;
    if (commissionTimeEnd) param.commissionTimeEnd = commissionTimeEnd;
    if (useraccount) param.useraccount = useraccount;
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
              onChange={value => this.handlerChange('tradeType', value)}
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
              onChange={value => this.handlerChange('tradeDirection', value)}
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
            <span>状态：</span>
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={value => this.handlerChange('status', value)}
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
                onChange={value => this.handlerChange('commissionTime', value)}
              />
            </LocaleProvider>
          </div>
          <div className={styles['search-item']}>
            <Input
              placeholder="委托人账号"
              style={{ width: '200px' }}
              onBlur={e => this.handlerChange('useraccount', e.target.value)}
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
                  render={(text, row) => <span>{statusText[row.status]}</span>}
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
