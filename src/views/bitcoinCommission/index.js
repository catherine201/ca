import React, { Component } from 'react';
import { Input, Button, Select, DatePicker, Table, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import { timestampToTime, getTimestampFormate } from '../../utils';
import coinCommission from '../../api/coinCommission';
import styles from './bitcoinCommission.less';

// 币币委托查询
export default class BitcoinCommission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tableHeight: document.body.offsetHeight - 300,
      searchData: {
        // tradeType: null, // 交易方式
        type: null, // 交易方向
        coin: null, // 币种
        priceUnit: null, // 计价单位
        status: null, // 状态
        beginTime: null, // 委托日期
        endTime: null, // 委托日期
        ownerId: null // 委托人账号
      },
      tradeTypeOptions: [], // 交易方式选项
      tradeDirectionOptions: [], // 交易方向选项
      statusOptions: [], // 状态选项
      priceUnitOptions: [], // 计价单位选项
      tableData: [],
      page: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    };
  }

  componentDidMount = () => {
    console.log('coinCommission: ', coinCommission);
    this.getTableData();
    this.getSelectOptions();

    window.addEventListener('resize', this.onresize);
  };

  componentWillUnMount = () => {
    window.removeEventListener('resize', this.onresize);
  };

  onresize = () => {
    // this.setState({
    //   tableHeight: document.body.offsetHeight - 300
    // });
  };

  // 获取选项
  getSelectOptions = () => {
    this.setState({
      tradeTypeOptions: [
        {
          value: '0',
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
      ],
      tradeDirectionOptions: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '2',
          label: '买入'
        },
        {
          value: '1',
          label: '卖出'
        }
      ],
      priceUnitOptions: [
        {
          value: '',
          label: '计价单位'
        },
        {
          value: 'usdt',
          label: 'USDT'
        },
        {
          value: 'eth',
          label: 'ETH'
        }
      ],
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
          value: '3',
          label: '全部成交'
        },
        // {
        //   value: '3',
        //   label: '部分成交'
        // },
        {
          value: '2',
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
      search.beginTime = value.length
        ? getTimestampFormate(moment(value[0]).format('YYYY-MM-DD'), 'start')
        : '';
      search.endTime = value.length
        ? getTimestampFormate(moment(value[1]).format('YYYY-MM-DD'), 'end')
        : '';
    } else {
      search[searchKey] = value;
    }
    this.setState({
      searchData: search
    });
  };

  // 获取表格数据（查询和分页
  getTableData = async () => {
    const { current, pageSize } = this.state.page;
    const {
      // tradeType, // 交易方式
      type, // 交易方向
      coin, // 币种
      priceUnit, // 计价单位
      status, // 状态
      beginTime, // 委托日期
      endTime, // 委托日期
      ownerId // 委托人账号
    } = this.state.searchData;
    const param = {
      // 每次查询的起始位置，相当于页码
      'listOptions.offset': (current - 1) * pageSize,
      // 每次查询的数量
      'listOptions.limit': pageSize
    };

    // if (tradeType) param.tradeType = tradeType; // 交易方式不传，接口暂不支持
    if (type) param.type = type;
    if (coin && priceUnit) {
      param.tradeMarket = coin; // 币种
      param.payMarket = priceUnit; // 计价单位
    }
    if (status) param.status = status;
    if (beginTime) param.beginTime = beginTime;
    if (endTime) param.endTime = endTime;
    if (ownerId) param.ownerId = ownerId;
    /*
      api.getData(param)
    */
    const typeText = {
      Sell: '卖出',
      Buy: '买入'
    };
    try {
      const tableData = await coinCommission.getTableData(param);
      const page = Object.assign({}, this.state.page);
      page.total = +tableData.paging.total || 0;

      tableData.datas &&
        tableData.datas.length &&
        tableData.datas.forEach(item => {
          item.key = item.id;
          item.type = typeText[item.type]; // 交易方向：买入、卖出
          item.createdTime = timestampToTime(item.createdTime);
          item.tradeType = '限价'; // 暂无其他类型，字段未返回
          item.tradingOn = `${item.tradeMarket}/${item.payMarket}`; // 交易对
          item.alreadyCount = item.count - (item.leftCount || 0); // 已成交量
          item.leftCount = item.leftCount || 0; // 未成交量
          item.tradeRatio = `${(item.alreadyCount / item.count) * 100}%`; // 成交率
        });
      this.setState({
        page,
        tableData: tableData.datas || []
      });
    } catch (err) {
      console.error('coinCommission.getTableData -- err: ', err);
    }
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
        obj.current = 1;
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
    const statusText = {
      UnknownStatus: '未知状态',
      Cancel: '已撤销',
      Entrust: '委托中',
      Finished: '已成交'
    };

    // 表格列 对应的 key和名称
    const columnText = {
      orderId: '委托编号',
      createdTime: '委托时间',
      tradingOn: '交易对',
      type: '交易方向',
      tradeType: '交易方式',
      triggerPrice: '触发价',
      price: '委托价',
      count: '委托数量',
      dealTotal: '已成交总额',
      averageDealPrice: '成交均价',
      alreadyCount: '已成交量', // 未返回，需计算（委托数量-未成交量）
      tradeRatio: '成交率',
      serviceCharge: '手续费',
      leftCount: '未成交量',
      accountId: '委托人账号',
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
              defaultValue="0"
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
              defaultValue="0"
              style={{ width: 120 }}
              onChange={value => this.handlerChange('type', value)}
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
              onBlur={e => this.handlerChange('ownerId', e.target.value)}
            />
          </div>
          <Button onClick={() => this.getTableData('isSearch')}>查询</Button>
        </section>
        <LocaleProvider locale={zh_CN}>
          <Table
            bordered
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
