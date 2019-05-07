import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DatePicker, Button, Table, Form, Select, Input } from 'antd';
import createApi from '../../api/list';
import styles from './index.less';
import { timestampToTime } from '../../utils';

const { RangePicker } = DatePicker;
const Option = Select.Option;

class AuthenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      searchName: '',
      data: [],
      tableHeight: document.body.offsetHeight - 250,
      // pagination: {
      //   defaultCurrent: 1,
      //   defaultPageSize: 10,
      //   current: 1
      // },
      limit: 10
    };
  }

  componentDidMount() {
    console.log(this);
    window.addEventListener('resize', () => {
      console.log(this);
      this.setState({
        tableHeight: document.body.offsetHeight - 250
      });
    });
    const { pagination, searchObj } = this.props;
    const beginTime = searchObj.beginTime;
    const endTime = searchObj.endTime;
    const coinName = searchObj.coinName;
    const accountID = searchObj.accountID;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    beginTime && (obj.beginTime = beginTime);
    endTime && (obj.endTime = endTime);
    coinName && (obj.coinName = coinName);
    accountID && (obj.accountID = accountID);
    // if (!this.props.coinType) {
    //   this.props.getCoinType().then(() => {
    //     this.queryCoinInAddr(obj);
    //   });
    // } else {
    //   this.queryCoinInAddr(obj);
    // }
    this.props.getCoinType().then(() => {
      this.queryCoinInAddr(obj);
    });
    //  this.queryCoinInAddr(obj);
  }

  queryCoinInAddr = async obj => {
    console.log(this.props.coinType);
    const res = await createApi.queryCoinInAddr(obj);
    console.log(res.list);
    if (res && res.paging) {
      const pagination = { ...this.props.pagination };
      pagination.total = res.paging.total - 0;
      this.props.getPagination(pagination);
      //   const data = res.datas || [];
      if (res.datas) {
        res.datas.map((item, index) => {
          res.datas[index].index = (res.paging.offset - 0 || 0) + index + 1;
        });
      }
      console.log(res.datas);
      console.log(pagination);
      this.setState({
        // pagination,
        data: res.datas || []
      });
    } else {
      this.setState({
        // pagination: {
        //   defaultCurrent: 1,
        //   defaultPageSize: 10,
        //   current: 1,
        //   total: 0
        // },
        data: []
      });
      this.props.resetPagination();
    }
  };

  changeName = e => {
    this.setState({
      searchName: e.target.value
    });
    console.log(this.state.searchName);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const coinName =
          values.coinName === '全部' ? '' : values.coinName.toLowerCase();
        const beginTime =
          values.rangePicker &&
          values.rangePicker[0] &&
          new Date(values.rangePicker[0].format('YYYY-MM-DD')).getTime();
        const endTime =
          values.rangePicker &&
          values.rangePicker[1] &&
          new Date(values.rangePicker[1].format('YYYY-MM-DD')).getTime();
        const accountID = values.accountID;
        this.props.getSearchObj({
          coinName,
          beginTime,
          endTime,
          accountID
        });
        const pager = { ...this.props.pagination };
        pager.current = 1;
        this.props.getPagination(pager);
        const obj = {
          // coinName:
          //   values.coinName === '全部' ? '' : values.coinName.toLowerCase(), // 币种
          // beginTime:
          //   values.rangePicker &&
          //   values.rangePicker[0] &&
          //   new Date(values.rangePicker[0].format('YYYY-MM-DD')).getTime(),
          // endTime:
          //   values.rangePicker &&
          //   values.rangePicker[1] &&
          //   new Date(values.rangePicker[1].format('YYYY-MM-DD')).getTime(),
          // accountID: values.accountID, // 用户名
          'listOptions.limit': this.state.limit,
          'listOptions.offset': 0
        };
        coinName && (obj.coinName = coinName);
        beginTime && (obj.beginTime = beginTime);
        endTime && (obj.endTime = endTime);
        accountID && (obj.accountID = accountID);
        this.queryCoinInAddr(obj);
      }
    });
  };

  handleTableChange = pagination => {
    const { searchObj } = this.props;
    const pager = { ...this.props.pagination };
    pager.current = pagination.current;
    this.props.getPagination(pager);
    const coinName = searchObj.coinName;
    const beginTime = searchObj.beginTime;
    const endTime = searchObj.endTime;
    const accountID = searchObj.accountID;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    coinName && (obj.coinName = coinName);
    beginTime && (obj.beginTime = beginTime);
    endTime && (obj.endTime = endTime);
    accountID && (obj.accountID = accountID);
    this.queryCoinInAddr(obj);
    // this.setState({
    //   pagination: pager
    // });
  };

  render() {
    const { coinType, pagination, searchObj } = this.props;
    const { data, tableHeight } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: '5%'
        // render: text => <span>{text}</span>
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '17%'
      },
      {
        title: '用户名',
        dataIndex: 'nickName',
        key: 'nickName',
        width: '10%'
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: '10%'
      },
      {
        title: '币种',
        dataIndex: 'coinName',
        key: 'coinName',
        width: '5%',
        render: text => <span>{text ? text.toUpperCase() : ''}</span>
      },
      {
        title: '充值地址',
        dataIndex: 'address',
        key: 'address',
        width: '30%'
      },
      {
        title: '注册时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>
      }
    ];
    const { getFieldDecorator } = this.props.form;
    const initRangePick = [searchObj.beginTime, searchObj.endTime];
    return (
      <div className={styles.userMsg_list}>
        <p className="common_title">充币地址</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item>
            {getFieldDecorator('accountID', {
              initialValue: searchObj.accountID || ''
            })(<Input placeholder="用户名" className="search_input" />)}
          </Form.Item>
          <Form.Item label="币种">
            {getFieldDecorator('coinName', {
              initialValue: searchObj.coinName || ''
            })(
              <Select>
                <Option value="">全部</Option>
                {/* <Option value="0">全部</Option>
                <Option value="1">正常</Option>
                <Option value="2">冻结</Option> */}
                {coinType &&
                  coinType.map(item => (
                    <Option value={item.code} key={item.code}>
                      {item.code.toUpperCase()}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="">
            {getFieldDecorator('rangePicker', {
              initialValue: initRangePick || []
            })(<RangePicker />)}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="mr20">
              搜索
            </Button>
            <Button
              className="mr20"
              onClick={() => {
                this.queryCoinInAddr();
              }}
            >
              显示全部
            </Button>
            <Button>导出EXCEL</Button>
          </Form.Item>
        </Form>
        <Table
          columns={columns}
          bordered
          dataSource={data}
          pagination={pagination}
          onChange={this.handleTableChange}
          rowKey={record => {
            console.log(record.id);
            return record.id;
          }}
          scroll={{ y: tableHeight }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pagination: state.searchOption.pagination,
  searchObj: state.searchOption.searchObj,
  coinType: state.selectOption.coinType
});

const mapDispatchToProps = dispatch => ({
  getPagination: dispatch.searchOption.getPagination,
  getSearchObj: dispatch.searchOption.getSearchObj,
  resetPagination: dispatch.searchOption.resetPagination,
  getCoinType: dispatch.selectOption.getCoinType
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AuthenList));
