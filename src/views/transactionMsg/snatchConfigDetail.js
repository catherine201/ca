import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DatePicker, Button, Form, Select, Input } from 'antd';
import createApi from '../../api/list';
import styles from './index.less';

const { RangePicker } = DatePicker;
const Option = Select.Option;

class AuthenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   time: [],
      searchName: ''
      //   data: {}
    };
  }

  componentDidMount() {
    // const obj = {
    //   'listOptions.limit': 10,
    //   'listOptions.offset': 0
    // };
    if (!this.props.coinType) {
      this.props.getCoinType().then(() => {
        // this.queryCoinInAddr(obj);
      });
    } else {
      //   this.queryCoinInAddr(obj);
    }
    //  this.queryCoinInAddr(obj);
  }

  createAuctionCoin = async obj => {
    const res = await createApi.createAuctionCoin(obj);
    console.log(res);
    if (res.coin) {
      this.props.history.push('/admin/snatchConfig');
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
          tradeCoin:
            values.tradeCoin === '0' ? '' : values.tradeCoin.toLowerCase(), // 币种
          payCoin: values.payCoin === '0' ? '' : values.payCoin.toLowerCase(), // 币种
          saleTime:
            values.rangePicker &&
            values.rangePicker[0] &&
            new Date(values.rangePicker[0].format('YYYY-MM-DD')).getTime(),
          type: values.type,
          price: values.price,
          fee: values.fee,
          minAmount: values.minAmount, // 用户名
          maxAmount: values.maxAmount
        };
        this.createAuctionCoin(obj);
      }
    });
  };

  render() {
    const { coinType } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const subItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 24 },
        sm: { span: 16, offset: 8 }
      }
    };
    return (
      <div className={styles.snatchConfig_detail}>
        <p className="common_title">抢拍配置</p>
        <Form
          layout="horizontal"
          onSubmit={this.handleSubmit}
          className={`clearfix ${styles.search_form}`}
        >
          <Form.Item label="时间" {...formItemLayout}>
            {getFieldDecorator('rangePicker')(<RangePicker />)}
          </Form.Item>
          <Form.Item label="交易币种" {...formItemLayout}>
            {getFieldDecorator('tradeCoin', { initialValue: '0' })(
              <Select className={styles.selectOption}>
                <Option value="0">请选择交易币种</Option>
                {coinType &&
                  coinType.map(item => (
                    <Option value={item.code}>{item.code}</Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="支付币种" {...formItemLayout}>
            {getFieldDecorator('payCoin', { initialValue: '0' })(
              <Select className={styles.selectOption}>
                <Option value="0">请选择支付币种</Option>
                {coinType &&
                  coinType.map(item => (
                    <Option value={item.code}>{item.code}</Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="类型" {...formItemLayout}>
            {getFieldDecorator('type', { initialValue: '0' })(
              <Select className={styles.selectOption}>
                <Option value="0">请选择类型</Option>
                <Option value="AuctionCoinTypeSell">抢购</Option>
                <Option value="AuctionCoinTypeBuy">拍卖</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="单价" {...formItemLayout}>
            {getFieldDecorator('price')(
              <Input
                placeholder="请输入单价"
                className="search_input"
                type="number"
              />
            )}
          </Form.Item>
          <Form.Item label="最小限额" {...formItemLayout}>
            {getFieldDecorator('minAmount')(
              <Input placeholder="请输入最小限额" className="search_input" />
            )}
          </Form.Item>
          <Form.Item label="最大限额" {...formItemLayout}>
            {getFieldDecorator('maxAmount')(
              <Input placeholder="请输入最大限额" className="search_input" />
            )}
          </Form.Item>
          <Form.Item label="手续费" {...formItemLayout}>
            {getFieldDecorator('fee')(
              <Input placeholder="请输入手续费" className="search_input" />
            )}
          </Form.Item>
          <Form.Item {...subItemLayout}>
            <Button htmlType="submit" className="mr20">
              添加
            </Button>
            <Button
              onClick={() => {
                this.toHref(0);
              }}
            >
              返回
            </Button>
          </Form.Item>
        </Form>
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
