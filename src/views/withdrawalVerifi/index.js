import React, { Component } from 'react';
import {
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  Table,
  LocaleProvider
} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import CustomModal from './CustomModal';
import styles from './withdrawalVerifi.less';

// 提币审核
export default class WithdrawalVerifi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customModalShow: false, // 显示CustomModal弹窗
      customModalTitle: '提币审核', // customModal标题
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
      coinOptions: [], // 币种选项
      auditStatusOptions: [], // 审核状态选项
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
    this.getCoinOptions();
    this.setState({
      auditStatusOptions: [
        {
          value: '0',
          label: '待审核'
        },
        {
          value: '1',
          label: '通过'
        },
        {
          value: '2',
          label: '驳回'
        }
      ]
    });
  };

  // 获取币种选项
  getCoinOptions = () => {
    this.setState({
      coinOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'BTC',
          label: 'BTC'
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

  // 提币审核
  coinAudit = () => {
    if (this.state.tableCheck === null) {
      this.setState({
        tableCheck: []
      });
    }
    this.isTableCheckEmpty();
    if (this.state.tableCheck && this.state.tableCheck.length) {
      this.setState({
        customModalShow: true,
        customModalTitle: '提币审核'
      });
    }
  };

  // 关闭
  onCustonModalCancel = () => {
    this.setState({
      customModalShow: false
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
          addtime: '2019-01-01 10:10:10',
          user: '13500001545',
          coin: 'BTC',
          coinNum: '10.49440',
          status: '0',
          auditTime: '',
          auditor: ''
        },
        {
          key: '2',
          addtime: '2019-01-01 10:10:10',
          user: '13500001545',
          coin: 'BTC',
          coinNum: '10.49440',
          status: '1',
          auditTime: '2019-01-01 10:10:10',
          auditor: 'rewrqwe'
        },
        {
          key: '3',
          addtime: '2019-01-01 10:10:10',
          user: '13500001545',
          coin: 'BTC',
          coinNum: '10.49440',
          status: '2',
          auditTime: '2019-01-01 10:10:10',
          auditor: 'rewrqwe'
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
    const statusText = ['待审核', '通过', '驳回'];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        );
        // 只在点击提币审核的时候，没有选择项才提示
        this.setState({
          tableCheck: selectedRows.length ? selectedRows : null
        });
      },
      getCheckboxProps: record => ({
        disabled: record.auditor !== '', // Column configuration not to be checked
        name: record.auditor
      })
    };

    // 禁用今天之后的日期选择
    function disabledDate(current) {
      // Can not select days before today and today
      return current > moment().endOf('day');
    }

    return (
      <div className={styles.withdrawalVerifi}>
        <section className={styles.title}>提币审核</section>
        <section>
          <div className={styles['search-item']}>
            <span>币种：</span>
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={this.coinChange}
            >
              {this.state.coinOptions.map(coin => (
                <Select.Option key={coin} value={coin.value}>
                  {coin.label}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className={styles['search-item']}>
            <span>审核状态：</span>
            <Select
              defaultValue="0"
              style={{ width: 120 }}
              onChange={this.auditStatusChange}
            >
              {this.state.auditStatusOptions.map(coin => (
                <Select.Option key={coin} value={coin.value}>
                  {coin.label}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className={styles['search-item']}>
            <span>提币日期：</span>
            <LocaleProvider locale={zh_CN}>
              <DatePicker.RangePicker
                style={{ width: '240px' }}
                disabledDate={disabledDate}
                onChange={this.withdrawDateChange}
              />
            </LocaleProvider>
          </div>
          <div className={styles['search-item']}>
            <span>审核日期：</span>
            <LocaleProvider locale={zh_CN}>
              <DatePicker.RangePicker
                style={{ width: '240px' }}
                disabledDate={disabledDate}
                onChange={this.auditDateChange}
              />
            </LocaleProvider>
          </div>
          <div className={styles['search-item']}>
            <span>提币数量：</span>
            <InputNumber
              placeholder="单笔最小数量"
              style={{ width: '150px' }}
              onChange={this.minNumChange}
            />
            &nbsp;至&nbsp;
            <InputNumber
              placeholder="单笔最大数量"
              style={{ width: '150px' }}
              onChange={this.maxNumChange}
            />
          </div>
          <div className={styles['search-item']}>
            &emsp;
            <Input
              placeholder="输入提币用户"
              style={{ width: '200px' }}
              onBlur={this.onCoinuserChange}
            />
          </div>
          <Button onClick={() => this.getTableData('isSearch')}>查询</Button>
          &emsp;
          <div className={styles['search-item']}>
            <Button type="primary" onClick={this.coinAudit}>
              提币审核
            </Button>
            {this.isTableCheckEmpty() && (
              <span className={styles['table-no-check']}>请选择待审核项</span>
            )}
          </div>
        </section>
        <br />
        <LocaleProvider locale={zh_CN}>
          <Table
            bordered
            loading={this.state.tableLoading}
            dataSource={this.state.tableData}
            pagination={this.getPaginationProps()}
            rowSelection={rowSelection}
          >
            <Column
              title="提币时间"
              align="center"
              dataIndex="addtime"
              key="addtime"
            />
            <Column title="用户" align="center" dataIndex="user" key="user" />
            <Column title="币种" align="center" dataIndex="coin" key="coin" />
            <Column
              title="提币数量"
              align="center"
              dataIndex="coinNum"
              key="coinNum"
            />
            <Column
              title="审核状态"
              align="center"
              dataIndex="status"
              key="status"
              render={(text, row) => <span>{statusText[row.status]}</span>}
            />
            <Column
              title="审核时间"
              align="center"
              dataIndex="auditTime"
              key="auditTime"
            />
            <Column
              title="审核人"
              align="center"
              dataIndex="auditor"
              key="auditor"
            />
          </Table>
        </LocaleProvider>
        {this.state.customModalShow && (
          <CustomModal
            visible={this.state.customModalShow}
            title={this.state.customModalTitle}
            selectedRows={this.state.tableCheck}
            onCancel={this.onCustonModalCancel}
          />
        )}
      </div>
    );
  }
}
