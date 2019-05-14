import React, { Component } from 'react';
import { Input, Button, Select, DatePicker, Table, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { timestampToTime, getTimestampFormate } from '../../utils';
import coinTransaction from '../../api/coinTransaction';
import styles from './bitcoinTransaction.less';

moment.locale('zh-cn');

// 币币成交查询
export default class BitcoinTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeight: document.body.offsetHeight - 300,
      searchData: {
        coin: null, // 币种
        priceUnit: null, // 计价单位
        beginTime: null, // 交易日期start
        endTime: null, // 交易日期end
        ownerId: null, // 买方/卖方账号
        orderId: null // 买方/卖方委托编号
      },
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
    this.queryClick();
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
          value: 'usdt',
          label: 'USDT'
        },
        {
          value: 'eth',
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

  // 点击查询
  queryClick = () => {
    const page = Object.assign({}, this.state.page, { current: 1 });
    this.setState(
      {
        page
      },
      () => this.getTableData()
    );
  };

  // 获取表格数据
  getTableData = async () => {
    const { current, pageSize } = this.state.page;
    const {
      coin, // 币种
      priceUnit, // 计价单位
      beginTime, // 交易日期start
      endTime, // 交易日期end
      ownerId, // 买方/卖方账号
      orderId // 买方/卖方委托编号
    } = this.state.searchData;
    const param = {
      // 每次查询的起始位置，相当于页码
      'listOptions.offset': (current - 1) * pageSize,
      // 每次查询的数量
      'listOptions.limit': pageSize
    };

    // 交易对
    if (coin && priceUnit) {
      param.tradeMarket = coin; // 币种
      param.payMarket = priceUnit; // 计价单位
    }
    if (beginTime) param.beginTime = beginTime;
    if (endTime) param.endTime = endTime;
    if (ownerId) param.ownerId = ownerId;
    if (orderId) param.orderId = orderId;
    /*
      api.getData(param)
    */
    const tableData = await coinTransaction.getTableData(param);
    const page = Object.assign({}, this.state.page);
    page.total = +tableData.paging.total;

    tableData.datas &&
      tableData.datas.length &&
      tableData.datas.forEach(item => {
        item.key = item.id;
        item.createdTime = timestampToTime(item.createdTime);
        item.tradingOn = `${item.tradeMarket.toUpperCase()}/${item.payMarket.toUpperCase()}`;
        item.bidServiceCharge = item.bidServiceCharge || 0; // 买方手续费'
        item.askServiceCharge = item.askServiceCharge || 0; // 卖方手续费'
      });
    this.setState({
      page,
      tableData: tableData.datas || []
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
    // 表格列 对应的 key和名称
    const columnText = {
      tradeId: '交易编号',
      createdTime: '交易时间',
      tradingOn: '交易对',
      bidOwnerId: '买方账号',
      askOwnerId: '卖方账号',
      price: '成交价',
      count: '成交量',
      bidId: '买方委托编号',
      bidServiceCharge: '买方手续费',
      askId: '卖方委托编号',
      askServiceCharge: '卖方手续费'
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
              onBlur={e => this.handlerChange('ownerId', e.target.value)}
            />
          </div>
          <div className={styles['search-item']}>
            <Input
              placeholder="买方/卖方账号委托编号"
              style={{ width: '200px' }}
              onBlur={e => this.handlerChange('orderId', e.target.value)}
            />
          </div>
          <Button onClick={this.queryClick}>查询</Button>
        </section>
        <LocaleProvider locale={zh_CN}>
          <Table
            bordered
            dataSource={this.state.tableData}
            pagination={this.getPaginationProps()}
            scroll={{ y: this.state.tableHeight }}
          >
            {Object.keys(columnText).map(key => (
              <Column
                title={columnText[key]}
                align="center"
                dataIndex={key}
                key={key}
                width="6%"
              />
            ))}
          </Table>
        </LocaleProvider>
      </div>
    );
  }
}
