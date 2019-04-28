import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table, Select, Form } from 'antd';
// DatePicker, Input,
import styles from './index.less';
import createApi from '../../api/list';
import { timestampToTime } from '../../utils';
import { appealStatus } from '../../utils/map';

// const { RangePicker } = DatePicker;
const Option = Select.Option;

class AppealList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      //   time: [],
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
    const status = searchObj.status;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    status && (obj.status = status);
    this.queryAppeal(obj);
  }

  queryAppeal = async obj => {
    const res = await createApi.queryAppeal(obj);
    console.log(res);
    if (res && res.paging) {
      const pagination = { ...this.props.pagination };
      pagination.total = res.paging.total - 0;
      this.props.getPagination(pagination);
      const data = res.datas || [];
      data &&
        data.length &&
        data.map((item, index) => {
          data[index].status = appealStatus[data[index].status];
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
        const status = values.adType;
        this.props.getSearchObj({
          status
        });
        const pager = { ...this.props.pagination };
        pager.current = 1;
        this.props.getPagination(pager);
        const obj = {
          status: values.adType,
          'listOptions.limit': this.state.limit,
          'listOptions.offset': 0
        };
        status && (obj.status = status);
        this.queryAppeal(obj);
      }
    });
  };

  handleTableChange = pagination => {
    const { searchObj } = this.props;
    const pager = { ...this.props.pagination };
    pager.current = pagination.current;
    this.props.getPagination(pager);
    const status = searchObj.status;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    status && (obj.status = status);
    this.queryAppeal(obj);
  };

  toDetail = text => {
    switch (text.status) {
      case 'Processed':
        return `/admin/appeal/2?id=${text.id}&type=${text.status}`;
      case 'Canceled':
        return `/admin/appeal/2?id=${text.id}&type=${text.status}`;
      default:
        return `/admin/appeal/1?id=${text.id}&type=${text.status}`;
    }
  };

  render() {
    const { searchObj, pagination } = this.props;
    const { data, tableHeight } = this.state;
    const columns = [
      {
        title: '申诉ID',
        width: '17%',
        // dataIndex: 'appellorID',
        // key: 'appellorID',
        render: text => (
          <Link
            to={
              this.toDetail(text)
              // text.status === '7'
              //   ? `/admin/appeal/2?id=${text.appellorID}`
              //   : `/admin/appeal/1?id=${text.appellorID}`
            }
          >
            {text.id}
          </Link>
        )
      },
      {
        title: '买方',
        dataIndex: 'order.owner',
        key: 'order.owner',
        width: '8%'
      },
      {
        title: '卖方',
        dataIndex: 'order.adsOwner',
        key: 'order.adsOwner',
        width: '8%'
      },
      {
        title: '订单ID',
        dataIndex: 'orderID',
        key: 'orderID',
        width: '17%',
        render: text => <Link to={`/admin/order/1?id=${text}`}>{text}</Link>
      },
      {
        title: '币种',
        dataIndex: 'all',
        key: 'all',
        width: '6%'
      },
      {
        title: '金额(CNY)',
        dataIndex: 'order.feeCNY',
        key: 'order.feeCNY',
        width: '8%'
      },
      {
        title: '数量',
        dataIndex: 'order.amount',
        key: 'order.amount',
        width: '6%'
      },
      {
        title: '付款确认时间',
        dataIndex: '30',
        key: '30',
        width: '8%',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>
      },
      {
        title: '申诉发起时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        width: '8%',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>
      },
      {
        title: '申诉处理时间',
        dataIndex: 'updatedTime',
        key: 'updatedTime',
        width: '8%',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      }
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.user_list}>
        <p className="common_title">申诉列表</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          {/* <Form.Item label="申诉日期">
            {getFieldDecorator('range-picker')(<RangePicker />)}
          </Form.Item> */}
          <Form.Item label="订单状态">
            {getFieldDecorator('adType', {
              initialValue: searchObj.status || '0'
            })(
              <Select>
                <Option value="0">全部</Option>
                <Option value="1">已创建</Option>
                <Option value="2">已处理</Option>
                {/* <Option value="3">已经关闭</Option> */}
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
)(Form.create()(AppealList));
