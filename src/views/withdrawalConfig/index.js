import React, { Component } from 'react';
import { Input, Button, Table, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import WithdrawalAction from '../../components/withdrawalAction';
import styles from './withdrawalConfig.less';

// 提币审核配置
export default class WithdrawalConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchword: '',
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
    this.queryClick();
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
  getTableData = () => {
    const { current, pageSize } = this.state.page;
    const { searchword } = this.state;
    const param = {
      // 每次查询的起始位置，相当于页码
      'listOptions.offset': (current - 1) * pageSize,
      // 每次查询的数量
      'listOptions.limit': pageSize
    };
    if (searchword) param.searchword = searchword;

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
        obj.current = 1;
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
    this.setState(
      {
        page: pageData
      },
      () => this.getTableData()
    );
  };

  // 弹窗取消
  withdrawalActionCancel = () => {
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
    // 表格列 对应的 key和名称
    const columnText = {
      no: '序号',
      coin: '币种',
      singleLimit: '单笔限额',
      dailyLimit: '日累计限额',
      lastModified: '最后编辑时间',
      finalEditor: '最后编辑人',
      operation: '操作'
    };

    return (
      <div className={styles.withdrawalConfig}>
        <section className="common_title">提币审核配置</section>
        <section className="search_form">
          <Input
            placeholder="输入币种"
            className={styles.search}
            onBlur={e => this.setState({ searchword: e.target.value })}
          />
          <Button onClick={this.queryClick}>查询</Button>
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
              onClose={this.withdrawalActionCancel}
              onConfirm={this.withdrawalActionConfirm}
            />
          )}
        </section>
        <LocaleProvider locale={zh_CN}>
          <Table
            bordered
            dataSource={this.state.tableData}
            pagination={this.getPaginationProps()}
          >
            {Object.keys(columnText).map(key =>
              key === 'operation' ? ( // 操作列
                <Column
                  title={columnText[key]}
                  align="center"
                  dataIndex={key}
                  key={key}
                  render={(text, row) => (
                    <div>
                      <span className={styles.a} onClick={() => this.edit(row)}>
                        修改
                      </span>
                      &emsp;
                      <span
                        className={styles.a}
                        onClick={() => this.delete(row)}
                      >
                        删除
                      </span>
                    </div>
                  )}
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
