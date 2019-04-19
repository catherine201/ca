import React, { Component } from 'react';
import { Input, Button, Table } from 'antd';
import WithdrawalAction from '../../components/withdrawalAction';
import styles from './withdrawalConfig.less';

// 提币审核配置
export default class WithdrawalConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchword: '',
      tableLoading: true,
      tableData: [],
      page: {
        current: 0,
        pageSize: 0,
        total: 0
      },
      coinOptions: [], // 币种选项
      actionRow: {}, // 操作行的数据
      actionType: '', // 新增add, 修改edit, 删除delete
      withdrawalActionVisible: false
    };
  }

  componentDidMount = () => {
    this.getTableData();
    this.getCoinOptions();
  };

  // 新增审核币种
  addCoin = () => {
    this.setState({
      withdrawalActionVisible: true,
      actionType: 'add'
    });
  };

  // 修改
  edit = row => {
    console.log('edit -- row: ', row);
    this.setState({
      withdrawalActionVisible: true,
      actionRow: row,
      actionType: 'edit'
    });
  };

  // 删除
  delete = row => {
    console.log('delete -- row: ', row);
    this.setState({
      withdrawalActionVisible: true,
      actionRow: row,
      actionType: 'delete'
    });
  };

  // 获取币种选项
  getCoinOptions = () => {
    this.setState({
      coinOptions: [
        {
          value: '',
          label: '请选择币种'
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

  // 获取表格数据（查询和分页
  getTableData = isSearch => {
    const { current, pageSize } = this.state.page;
    const param = {
      current,
      pageSize
    };
    this.setState({
      tableLoading: true
    });
    // 查询
    if (isSearch) {
      param.searchword = this.state.searchword;
    }

    /*
      api.getData(param)
    */
    console.log('param: ', param);

    this.setState({
      tableData: [
        {
          key: '1',
          no: '1',
          coin: 'BTC',
          singleLimit: '100',
          dailyLimit: '100',
          lastModified: '2019-01-01 12:00:00',
          finalEditor: 'ssrhjf',
          operation: ''
        },
        {
          key: '2',
          no: '2',
          coin: 'ETH',
          singleLimit: '1200',
          dailyLimit: '1200',
          lastModified: '2019-01-01 12:00:00',
          finalEditor: 'ssrhjf',
          operation: '100'
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
      pageSizeOptions: ['10', '20', '50', '100', '500', '1000'],
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
    this.getTableData();
  };

  // 弹窗取消
  withdrawalActionClose = () => {
    this.setState({
      withdrawalActionVisible: false
    });
  };

  // 弹窗确认
  withdrawalActionConfirm = () => {
    this.setState({
      withdrawalActionVisible: false
    });
  };

  render() {
    const { Column } = Table;
    return (
      <div className={styles.withdrawalConfig}>
        <section className={styles.title}>提币审核配置</section>
        <section>
          <Input
            placeholder="输入币种"
            className={styles.search}
            onBlur={e => this.setState({ searchword: e.target.value })}
          />
          <Button onClick={() => this.getTableData('isSearch')}>查询</Button>
          <Button className={styles.addcoin} onClick={this.addCoin}>
            新增审核币种
          </Button>
          {this.state.withdrawalActionVisible && (
            <WithdrawalAction
              visible={this.state.withdrawalActionVisible}
              actionType={this.state.actionType}
              coinOptions={this.state.coinOptions}
              row={
                this.state.actionType !== 'add' ? this.state.actionRow : null
              }
              onClose={this.withdrawalActionClose}
              onConfirm={this.withdrawalActionConfirm}
            />
          )}
        </section>
        <br />
        <section>
          <Table
            bordered
            loading={this.state.tableLoading}
            dataSource={this.state.tableData}
            pagination={this.getPaginationProps()}
          >
            <Column title="序号" align="center" dataIndex="no" key="no" />
            <Column title="币种" align="center" dataIndex="coin" key="coin" />
            <Column
              title="单笔限额"
              align="center"
              dataIndex="singleLimit"
              key="singleLimit"
            />
            <Column
              title="日累计限额"
              align="center"
              dataIndex="dailyLimit"
              key="dailyLimit"
            />
            <Column
              title="最后编辑时间"
              align="center"
              dataIndex="lastModified"
              key="lastModified"
            />
            <Column
              title="最后编辑人"
              align="center"
              dataIndex="finalEditor"
              key="finalEditor"
            />
            <Column
              title="操作"
              align="center"
              key="action"
              render={(text, row) => (
                <div>
                  <span className={styles.a} onClick={() => this.edit(row)}>
                    修改
                  </span>
                  &emsp;
                  <span className={styles.a} onClick={() => this.delete(row)}>
                    删除
                  </span>
                </div>
              )}
            />
          </Table>
        </section>
      </div>
    );
  }
}
