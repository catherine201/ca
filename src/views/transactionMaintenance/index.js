import React, { Component } from 'react';
import { Input, Button, Table, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import styles from './transactionMaintenance.less';

// 提币审核配置
export default class TransactionMaintenance extends Component {
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
      }
    };
  }

  componentDidMount = () => {
    this.getTableData();
    this.getCoinOptions();
  };

  // 修改
  edit = row => {
    console.log('edit -- row: ', row);
    row.id = 1;
    this.props.history.push({
      pathname: `/admin/transactionCoinEdit/${row.id}`,
      state: {
        data: row
      }
    });
    // this.setState({
    //   coinEditPanelVisible: true,
    //   actionRow: row
    // });
  };

  // 删除
  // delete = row => {
  //   console.log('delete -- row: ', row);
  //   this.setState({
  //     withdrawalActionVisible: true,
  //     actionRow: row,
  //     actionType: 'delete'
  //   });
  // };

  // 获取币种选项
  getCoinOptions = () => {
    // this.setState({
    //   coinOptions: [
    //     {
    //       value: '',
    //       label: '请选择币种'
    //     },
    //     {
    //       value: 'BTC',
    //       label: 'BTC'
    //     },
    //     {
    //       value: 'ETH',
    //       label: 'ETH'
    //     }
    //   ]
    // });
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
          coin: 'BTC',
          nameZh: '比特币', // 中文名
          nameFull: 'BItcoin',
          website: 'https://bitcoin.org/en',
          issueDate: '2019-01-01', // 发行时间
          issueQuantity: '100000', // 发行总量
          raisePrice: '255660', // 众筹价格
          whitePaperAddr: 'sdfdsf11215', // 白皮书地址
          blockQueryAddr: 'sdfsdfs4564646', // 区块链查询地址
          info: 'bitcoinbitcoinbitcoinbitcoinbitcoin' // 简介
        },
        {
          key: '2',
          coin: 'ETH',
          nameZh: '以太坊',
          nameFull: 'Ethereum',
          website: 'https://bitcoin.org/en',
          issueDate: '2019-01-01', // 发行时间
          issueQuantity: '100000', // 发行总量
          raisePrice: '255660', // 众筹价格
          whitePaperAddr: 'sdfdsf11215', // 白皮书地址
          blockQueryAddr: 'sdfsdfs4564646', // 区块链查询地址
          info: 'bitcoinbitcoinbitcoinbitcoinbitcoin' // 简介
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

  render() {
    const { Column } = Table;
    return (
      <div className={styles.transactionMaintenance}>
        <section className="common_title">交易币介绍维护</section>
        <section className="search_form">
          <Input
            placeholder="币种名称/简称"
            className={styles.search}
            onBlur={e => this.setState({ searchword: e.target.value })}
          />
          <Button onClick={() => this.getTableData('isSearch')}>查询</Button>
        </section>
        <LocaleProvider locale={zh_CN}>
          <Table
            bordered
            loading={this.state.tableLoading}
            dataSource={this.state.tableData}
            pagination={this.getPaginationProps()}
          >
            <Column title="币种" align="center" dataIndex="coin" key="coin" />
            <Column
              title="简称"
              align="center"
              dataIndex="nameZh"
              key="nameZh"
            />
            <Column
              title="币全名"
              align="center"
              dataIndex="nameFull"
              key="nameFull"
            />
            <Column
              title="官网"
              align="center"
              dataIndex="website"
              key="website"
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
                </div>
              )}
            />
          </Table>
        </LocaleProvider>
      </div>
    );
  }
}
