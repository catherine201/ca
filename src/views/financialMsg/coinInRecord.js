import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Form, Select, Input, DatePicker } from 'antd';
import createApi from '../../api/list';
import styles from './index.less';
import { timestampToTime } from '../../utils';

const Option = Select.Option;
const { RangePicker } = DatePicker;

class AuthenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      searchName: '',
      data: [],
      tableHeight: document.body.offsetHeight - 300,
      // pagination: {
      //   defaultCurrent: 1,
      //   defaultPageSize: 10
      // },
      limit: 10
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
    const coinName = searchObj.coinName;
    const beginTime = searchObj.beginTime;
    const endTime = searchObj.endTime;
    const nickname = searchObj.nickname;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit,
      type: 1
    };
    coinName && (obj.coinName = coinName);
    beginTime && (obj.beginTime = beginTime);
    endTime && (obj.endTime = endTime);
    nickname && (obj.nickname = nickname);
    // this.queryCointxs(obj);
    if (!this.props.coinType) {
      this.props.getCoinType().then(() => {
        this.queryCointxs(obj);
      });
    } else {
      this.queryCointxs(obj);
    }
  }

  queryCointxs = async obj => {
    const res = await createApi.queryCointxs(obj);
    console.log(res.list);
    if (res && res.paging) {
      const pagination = { ...this.props.pagination };
      pagination.total = res.paging.total - 0;
      this.props.getPagination(pagination);
      if (res.datas) {
        res.datas.map((item, index) => {
          res.datas[index].index = (res.paging.offset - 0 || 0) + index + 1;
        });
      }
      this.setState({
        // pagination,
        data: res.datas || []
      });
    } else {
      this.setState({
        // pagination: {
        //   defaultCurrent: 1,
        //   defaultPageSize: 10,
        //   current: 1
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
        const nickname = values.nickname;
        this.props.getSearchObj({
          coinName,
          beginTime,
          endTime,
          nickname
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
          // nickname: values.nickname, // 用户名
          'listOptions.limit': this.state.limit,
          'listOptions.offset': 0,
          type: 1
        };
        coinName && (obj.coinName = coinName);
        beginTime && (obj.beginTime = beginTime);
        endTime && (obj.endTime = endTime);
        nickname && (obj.nickname = nickname);
        this.queryCointxs(obj);
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
    const nickname = searchObj.nickname;
    const obj = {
      'listOptions.limit': this.state.limit,
      'listOptions.offset': (pagination.current - 1) * this.state.limit,
      type: 1
    };
    coinName && (obj.coinName = coinName);
    beginTime && (obj.beginTime = beginTime);
    endTime && (obj.endTime = endTime);
    nickname && (obj.nickname = nickname);
    this.queryCointxs(obj);
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
        width: '8%'
      },
      {
        title: '币种',
        dataIndex: 'coinName',
        key: 'coinName',
        width: '7%',
        render: text => <span>{text ? text.toUpperCase() : ''}</span>
      },
      {
        title: '充币数量',
        dataIndex: 'amount',
        key: 'amount',
        width: '10%'
      },
      {
        title: '充币地址',
        dataIndex: 'from',
        key: 'from',
        width: '17%'
      },
      {
        title: 'TXID',
        dataIndex: 'txHash',
        key: 'txHash',
        width: '22%'
      },
      {
        title: '充币时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        render: text => <span>{text ? timestampToTime(text) : ''}</span>
      }
    ];
    const { getFieldDecorator } = this.props.form;
    const initRange = [searchObj.beginTime, searchObj.endTime];
    return (
      <div className={styles.coinRecord_list}>
        <p className="common_title">充币记录</p>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="search_form"
        >
          <Form.Item label="币种">
            {getFieldDecorator('coinName', {
              initialValue: searchObj.coinName || ''
            })(
              <Select>
                <Option value="">全部</Option>
                {coinType &&
                  coinType.map(item => (
                    <Option value={item.code} key={item.code}>
                      {item.code}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('nickname', {
              initialValue: searchObj.nickname || ''
            })(<Input placeholder="用户名" className="search_input" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('rangePicker', {
              initialValue: initRange || []
            })(<RangePicker />)}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="mr20">
              搜索
            </Button>
            <Button className="mr20">显示全部</Button>
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
  coinType: state.selectOption.coinType,
  pagination: state.searchOption.pagination,
  searchObj: state.searchOption.searchObj
});

const mapDispatchToProps = dispatch => ({
  getCoinType: dispatch.selectOption.getCoinType,
  getPagination: dispatch.searchOption.getPagination,
  getSearchObj: dispatch.searchOption.getSearchObj,
  resetPagination: dispatch.searchOption.resetPagination
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AuthenList));
