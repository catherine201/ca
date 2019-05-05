import React, { Component } from 'react';
import { Input, Button, Table, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import styles from './transactionMaintenance.less';
import coinMaintenance from '../../api/coinMaintenance';

// 交易币介绍维护
export default class TransactionMaintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeight: document.body.offsetHeight - 300,
      searchword: '',
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
  };

  // 新增
  coinAdd = () => {
    this.props.history.push({
      pathname: `/admin/transactionMaintenance/transactionCoinEdit/add`
    });
  };

  // 修改
  coinEdit = row => {
    this.props.history.push({
      pathname: `/admin/transactionMaintenance/transactionCoinEdit/${row.id}`,
      state: {
        data: row
      }
    });
  };

  // 获取表格数据（查询和分页
  getTableData = async isSearch => {
    const { current, pageSize } = this.state.page;
    const param = {
      // 每次查询的起始位置，相当于页码
      'listOptions.offset': (current - 1) * pageSize,
      // 每次查询的数量
      'listOptions.limit': pageSize
    };
    // 查询，搜索接口暂不支持 2019-04-30
    if (isSearch) {
      param['listOptions.keyword'] = this.state.searchword;
    }
    /*
      api.getData(param)
    */
    const tableData = await coinMaintenance.getTableData(param);
    const page = Object.assign({}, this.state.page);

    page.total = +tableData.paging.total || 0;
    tableData.datas.forEach(item => (item.key = item.id));
    this.setState({
      page,
      tableData: tableData.datas
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
    this.setState({
      page: pageData
    });
    this.getTableData();
  };

  render() {
    const { Column } = Table;
    // 表格列 对应的 key和名称
    const columnText = {
      code: '币种',
      chineseName: '简称',
      name: '币全名',
      officialWebsite: '官网',
      operation: '操作'
    };

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
          &nbsp;&nbsp;
          <Button type="primary" onClick={this.coinAdd}>
            新增
          </Button>
        </section>
        <LocaleProvider locale={zh_CN}>
          <Table
            bordered
            dataSource={this.state.tableData}
            pagination={this.getPaginationProps()}
            scroll={{ y: this.state.tableHeight }}
          >
            {Object.keys(columnText).map(key =>
              key === 'operation' ? (
                <Column
                  title={columnText[key]}
                  align="center"
                  key={key}
                  width="6%"
                  render={(text, row) => (
                    <div>
                      <span
                        className={styles.a}
                        onClick={() => this.coinEdit(row)}
                      >
                        修改
                      </span>
                    </div>
                  )}
                />
              ) : (
                <Column
                  title={columnText[key]}
                  align="center"
                  dataIndex={key}
                  key={key}
                  width="6%"
                />
              )
            )}
          </Table>
        </LocaleProvider>
      </div>
    );
  }
}
