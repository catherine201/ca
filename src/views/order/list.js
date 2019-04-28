import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table, Select, Form } from 'antd';
// DatePicker, Input,
import styles from './index.less';
import createApi from '../../api/list';
import { timestampToTime } from '../../utils';
import { AdsOrderStatus } from '../../utils/map';

// const { RangePicker } = DatePicker;
const Option = Select.Option;

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      limit: 10,
      searchName: '',
      data: [],
      tableHeight: document.body.offsetHeight - 300
      // pagination: {
      //   defaultCurrent: 1,
      //   defaultPageSize: 12
      // }
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      console.log(this);
      this.setState({
        tableHeight: document.body.offsetHeight - 300
      });
    });
    const { pagination, searchObj } = this.props;
    const type = searchObj.type;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    type && (obj.type = type);
    this.queryOrders(obj);
  }

  queryOrders = async obj => {
    const res = await createApi.queryOrders(obj);
    console.log(res);
    if (res && res.paging) {
      const pagination = { ...this.props.pagination };
      pagination.total = res.paging.total - 0;
      this.props.getPagination(pagination);
      const data = res.datas || [];
      data &&
        data.length &&
        data.map((item, index) => {
          data[index].status = AdsOrderStatus[data[index].status];
        });
      this.setState({
        // pagination,
        data
      });
    } else {
      this.setState({
        data: []
      });
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
        const type = values.adType;
        this.props.getSearchObj({
          type
        });
        const pager = { ...this.props.pagination };
        pager.current = 1;
        this.props.getPagination(pager);
        const obj = {
          // type: values.adType,
          'listOptions.limit': this.state.limit,
          'listOptions.offset': 0
        };
        type && (obj.type = type);
        this.queryOrders(obj);
      }
    });
  };

  handleTableChange = pagination => {
    const { searchObj } = this.props;
    const pager = { ...this.props.pagination };
    pager.current = pagination.current;
    this.props.getPagination(pager);
    const type = searchObj.type;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    type && (obj.type = type);
    this.queryOrders(obj);
  };

  render() {
    const { pagination, searchObj } = this.props;
    const { data, tableHeight } = this.state;
    const columns = [
      {
        title: '订单ID',
        dataIndex: 'id',
        key: 'id',
        width: '17%',
        render: text => <Link to={`/admin/order/1?id=${text}`}>{text}</Link>
        // <Link to={`/admin/order/1?id=${text}`}>{text}</Link>
      },
      {
        title: '下单时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        width: '12%',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>
      },
      {
        title: '广告方',
        dataIndex: 'adsOwner.nickname',
        key: 'adsOwner1',
        width: '9%'
      },
      {
        title: '买方',
        dataIndex: 'owner.nickname',
        key: 'owner.nickname',
        width: '9%'
      },
      {
        title: '卖方',
        dataIndex: 'adsOwner.nickname',
        key: 'adsOwner.nickname',
        width: '9%'
      },
      {
        title: '币种',
        dataIndex: 'rate',
        key: 'rate',
        width: '8%'
      },
      {
        title: '单价',
        dataIndex: 'appeal',
        key: 'appeal',
        width: '9%'
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
        width: '8%'
      },
      {
        title: '金额',
        dataIndex: 'feeCNY',
        key: 'feeCNY',
        width: '10%'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      }
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.order_list}>
        <p className="common_title">订单列表</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          {/* <Form.Item label="下单日期">
            {getFieldDecorator('range-picker')(<RangePicker />)}
          </Form.Item>
          <Form.Item label="币种">
            {getFieldDecorator('coinType', { initialValue: 'all' })(
              <Select>
                <Option value="all">全部</Option>
                <Option value="ETH">ETH</Option>
                <Option value="BTC">BTC</Option>
              </Select>
            )}
          </Form.Item>
          <br /> */}
          <Form.Item label="订单状态">
            {getFieldDecorator('adType', {
              initialValue: searchObj.type || '0'
            })(
              <Select>
                <Option value="0">全部</Option>
                <Option value="1">待付款</Option>
                <Option value="2">待放币</Option>
                <Option value="7">已取消</Option>
                <Option value="8">已完成</Option>
                <Option value="9">申诉中</Option>
              </Select>
            )}
          </Form.Item>
          {/* <Form.Item>
            {getFieldDecorator('input')(
              <Input
                placeholder="输入订单ID/广告ID/买方/卖方进行搜索"
                className="search_input"
              />
            )}
          </Form.Item> */}
          <Form.Item>
            <Button htmlType="submit">查询</Button>
          </Form.Item>
        </Form>
        <Table
          columns={columns}
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
  searchObj: state.searchOption.searchObj
});

const mapDispatchToProps = dispatch => ({
  getPagination: dispatch.searchOption.getPagination,
  getSearchObj: dispatch.searchOption.getSearchObj
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(OrderList));
