import React, { Component } from 'react';
import { Input, Button, Table } from 'antd';
import WithdrawalAction from '../withdrawalAction';
import styles from './withdrawalVerifi.less';

// 提币审核
export default class WithdrawalVerifi extends Component {
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
      actionType: '', // 新增add, 修改edit, 删除delete
      withdrawalActionVisible: false
    };
  }

  componentDidMount = () => {
    this.search();
  };

  // 查询
  search = () => {
    this.setState({
      tableLoading: true
    });
    console.log('searchword: ', this.state.searchword);
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
          singleLimit: '100',
          dailyLimit: '100',
          lastModified: '2019-01-01 12:00:00',
          finalEditor: 'ssrhjf',
          operation: '100'
        }
      ]
    });
    this.setState({
      page: {
        current: 1,
        pageSize: 20,
        total: 2
      }
    });
    this.setState({
      tableLoading: false
    });
  };

  // 新增审核币种
  addCoin = () => {
    this.setState({
      withdrawalActionVisible: true,
      actionType: 'add'
    });
  };

  // 修改
  edit = record => {
    console.log('edit -- record: ', record);
    this.setState({
      withdrawalActionVisible: true,
      actionType: 'edit'
    });
  };

  // 删除
  delete = record => {
    console.log('delete -- record: ', record);
    this.setState({
      withdrawalActionVisible: true,
      actionType: 'delete'
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
      <div className={styles.withdrawalVerifi}>
        <section className={styles.title}>提币审核</section>
        <section>
          <Input
            placeholder="输入币种"
            className={styles.search}
            onBlur={e => this.setState({ searchword: e.target.value })}
          />
          <Button type="primary" onClick={this.search}>
            查询
          </Button>
          <Button
            type="primary"
            className={styles.addcoin}
            onClick={this.addCoin}
          >
            新增审核币种
          </Button>
          <WithdrawalAction
            visible={this.state.withdrawalActionVisible}
            actionType={this.state.actionType}
            onClose={this.withdrawalActionClose}
            onConfirm={this.withdrawalActionConfirm}
          />
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
              render={(text, record) => (
                <div>
                  <span className={styles.a} onClick={() => this.edit(record)}>
                    修改
                  </span>
                  &emsp;
                  <span
                    className={styles.a}
                    onClick={() => this.delete(record)}
                  >
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
