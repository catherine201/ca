import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table, Select, Form } from 'antd';
// DatePicker, Input,
import styles from './index.less';
import createApi from '../../api/list';
import { timestampToTime } from '../../utils';
import { AdsStatus, AdsType } from '../../utils/map';

// const { RangePicker } = DatePicker;
const Option = Select.Option;

class AdvertList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 12,
      //   time: [],
      searchName: '',
      data: [],
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 12
      }
    };
  }

  componentDidMount() {
    const obj = {
      'listOptions.limit': 12,
      'listOptions.offset': 0
    };
    this.queryAds(obj);
  }

  queryAds = async obj => {
    const res = await createApi.queryAds(obj);
    console.log(res);
    if (res && res.paging) {
      const pagination = { ...this.state.pagination };
      pagination.total = res.paging.total - 0;
      const data = res.datas;
      data &&
        data.length &&
        data.map((item, index) => {
          data[index].type = AdsType[data[index].type];
          data[index].status = AdsStatus[data[index].status];
        });
      console.log(data);
      this.setState({
        pagination,
        data
      });
    }
  };

  onChangeTime = (date, dateString) => {
    console.log(date, dateString);
  };

  changeName = e => {
    this.setState({
      searchName: e.target.value
    });
    console.log(this.state.searchName);
  };

  handleSearch = () => {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const obj = {
          type: values.adType,
          status: values.status,
          'listOptions.limit': 12,
          'listOptions.offset': 0
        };
        this.queryAds(obj);
      }
    });
  };

  handleTableChange = pagination => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    const obj = {
      'listOptions.limit': 12,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    this.queryAds(obj);
    this.setState({
      pagination: pager
    });
  };

  render() {
    // const { test, getTest } = this.props;
    const { data, pagination } = this.state;
    const columns = [
      {
        title: '广告ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <Link to={`/admin/ad/1?id=${text}`}>{text}</Link>
        // render: text => <Link to={text}>{text}</Link>
      },
      {
        title: '创建人',
        dataIndex: 'owner',
        key: 'owner'
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: '币种',
        dataIndex: 'coin.name',
        key: 'coin.name'
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: '初始数量',
        dataIndex: 'rate',
        key: 'rate'
      },
      {
        title: '剩余数量',
        dataIndex: 'amount',
        key: 'amount'
      },
      {
        title: '剩余金额',
        render: text => <span>{text.amount * text.price}</span>
        // dataIndex: '30',
        // key: '30'
      },
      {
        title: '限额',
        render: text => <span>{`${text.minPrice} ~ ${text.maxPrice}`}</span>
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: '创建时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>
      },
      {
        title: '最后编辑时间',
        dataIndex: 'updatedTime',
        key: 'updatedTime',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>
      }
    ];
    // const wrapperCol = { span: 48 };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.user_list}>
        <p className="common_title">广告列表</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item label="广告类型">
            {getFieldDecorator('adType', { initialValue: '0' })(
              <Select>
                <Option value="0">全部</Option>
                <Option value="2">购买</Option>
                <Option value="1">出售</Option>
              </Select>
            )}
          </Form.Item>
          {/* <Form.Item label="币种">
            {getFieldDecorator('coinType', { initialValue: 'all' })(
              <Select>
                <Option value="all">全部</Option>
                <Option value="ETH">ETH</Option>
                <Option value="BTC">BTC</Option>
              </Select>
            )}
          </Form.Item> */}
          <Form.Item label="状态">
            {getFieldDecorator('status', { initialValue: '0' })(
              <Select>
                <Option value="0">全部</Option>
                <Option value="1">上架中</Option>
                <Option value="3">已下架</Option>
              </Select>
            )}
          </Form.Item>
          {/* <Form.Item label="创建日期">
            {getFieldDecorator('range-picker')(<RangePicker />)}
          </Form.Item>
          <Form.Item wrapperCol={wrapperCol}>
            {getFieldDecorator('input')(
              <Input
                placeholder="输入广告ID/创建人进行搜索"
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
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  test: state.demo.test
});

const mapDispatchToProps = dispatch => ({
  getTest: dispatch.demo.getTest
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AdvertList));
