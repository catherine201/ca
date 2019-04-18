import React, { Component } from 'react';
import { Input, Button, Select, DatePicker, Table } from 'antd';
import moment from 'moment';
import styles from './withdrawalVerifi.less';

// 提币审核
export default class WithdrawalVerifi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: {
        coin: '', // 币种
        auditStatus: 0, // 待审核
        withdrawDateStart: '', // 提币日期start
        withdrawDateEnd: '', // 提币日期end
        auditDateStart: '', // 审核日期start
        auditDateEnd: '' // 审核日期end
      },
      coinOptions: [], // 币种选项
      auditStatusOptions: [], // 审核状态选项
      tableCheck: [0], // 表格选择项
      tableLoading: true,
      tableData: [],
      page: {
        current: 0,
        pageSize: 0,
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
    if (this.state.tableCheck[0] === 0) {
      this.setState({
        tableCheck: []
      });
    }
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
      auditDateEnd // 审核日期end
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
        this.setState({
          tableCheck: selectedRows
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
            <DatePicker.RangePicker
              style={{ width: '240px' }}
              disabledDate={disabledDate}
              onChange={this.withdrawDateChange}
            />
          </div>
          <div className={styles['search-item']}>
            <span>审核日期：</span>
            <DatePicker.RangePicker
              style={{ width: '240px' }}
              disabledDate={disabledDate}
              onChange={this.auditDateChange}
            />
          </div>
          <div className={styles['search-item']}>
            <span>提币数量：</span>
            <Input placeholder="单笔最小数量" style={{ width: '200px' }} />
            &nbsp;至&nbsp;
            <Input placeholder="单笔最大数量" style={{ width: '200px' }} />
            &emsp;
            <Input placeholder="输入提币用户" style={{ width: '200px' }} />
          </div>
          <Button onClick={() => this.getTableData('isSearch')}>查询</Button>
          &emsp;
          <div className={styles['search-item']}>
            <Button type="primary" onClick={this.coinAudit}>
              提币审核
            </Button>
            {!this.state.tableCheck.length && (
              <span className={styles['table-no-check']}>请选择待审核项</span>
            )}
          </div>
        </section>
        <br />
        <section>
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
        </section>
      </div>
    );
  }
}
