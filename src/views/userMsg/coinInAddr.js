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
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10,
        current: 1
      },
      limit: 10
    };
  }

  componentDidMount() {
    const obj = {
      'listOptions.limit': 10,
      'listOptions.offset': 0
    };
    if (!this.props.coinType) {
      this.props.getCoinType().then(() => {
        this.queryCoinInAddr(obj);
      });
    } else {
      this.queryCoinInAddr(obj);
    }
    //  this.queryCoinInAddr(obj);
  }

  queryCoinInAddr = async obj => {
    console.log(this.props.coinType);
    const res = await createApi.queryCoinInAddr(obj);
    console.log(res.list);
    if (res && res.paging) {
      const pagination = { ...this.state.pagination };
      pagination.total = res.paging.total - 0;
      //   const data = res.datas || [];
      if (res.datas) {
        res.datas.map((item, index) => {
          res.datas[index].index = (res.paging.offset - 0 || 0) + index + 1;
        });
      }
      console.log(res.datas);
      console.log(pagination);
      this.setState({
        pagination,
        data: res.datas || []
      });
    } else {
      this.setState({
        pagination: {
          defaultCurrent: 1,
          defaultPageSize: 10,
          current: 1
        },
        data: []
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
          coinName:
            values.coinName === '全部' ? '' : values.coinName.toLowerCase(), // 币种
          beginTime:
            values.rangePicker &&
            values.rangePicker[0] &&
            new Date(values.rangePicker[0].format('YYYY-MM-DD')).getTime(),
          endTime:
            values.rangePicker &&
            values.rangePicker[1] &&
            new Date(values.rangePicker[1].format('YYYY-MM-DD')).getTime(),
          accountID: values.accountID, // 用户名
          'listOptions.limit': 10,
          'listOptions.offset': 0
        };
        this.queryCoinInAddr(obj);
      }
    });
  };

  handleTableChange = pagination => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    const obj = {
      'listOptions.limit': 10,
      'listOptions.offset': (pagination.current - 1) * this.state.limit
    };
    this.queryCoinInAddr(obj);
    this.setState({
      pagination: pager
    });
  };

  render() {
    const { coinType } = this.props;
    const { data, pagination } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index'
        // render: text => <span>{text}</span>
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'nickName',
        key: 'nickName'
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '币种',
        dataIndex: 'coinName',
        key: 'coinName'
      },
      {
        title: '充值地址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '注册时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>
      }
    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.userMsg_list}>
        <p className="common_title">充币地址</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item>
            {getFieldDecorator('accountID')(
              <Input placeholder="用户名" className="search_input" />
            )}
          </Form.Item>
          <Form.Item label="币种">
            {getFieldDecorator('coinName', { initialValue: '0' })(
              <Select>
                <Option value="0">全部</Option>
                {/* <Option value="0">全部</Option>
                <Option value="1">正常</Option>
                <Option value="2">冻结</Option> */}
                {coinType &&
                  coinType.map(item => (
                    <Option value={item.code}>{item.code}</Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="">
            {getFieldDecorator('rangePicker')(<RangePicker />)}
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
  coinType: state.selectOption.coinType
});

const mapDispatchToProps = dispatch => ({
  getCoinType: dispatch.selectOption.getCoinType
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AuthenList));
