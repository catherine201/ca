import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DatePicker, Button, Form, Select, InputNumber } from 'antd';
import moment from 'moment';
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
      searchName: ''
      //   checkNick: false
      //   data: {}
    };
  }

  componentDidMount() {
    console.log(!this.props.match.params.snatchId);
    const obj = {
      url: this.props.match.params.snatchId
    };
    if (!this.props.coinType) {
      this.props.getCoinType().then(() => {
        if (this.props.match.params.snatchId !== '0') {
          this.queryAuctionCoin(obj);
        }
      });
    } else if (this.props.match.params.snatchId !== '0') {
      this.queryAuctionCoin(obj);
    }
  }

  queryAuctionCoin = async obj => {
    const { form } = this.props;
    const res = await createApi.queryAuctionCoin(obj);
    console.log(res.coin);
    const coin = res && res.coin;
    if (coin) {
      form.setFieldsValue({
        tradeCoin: coin.tradeCoin === '0' ? '' : coin.tradeCoin.toUpperCase(), // 币种
        payCoin: coin.payCoin === '0' ? '' : coin.payCoin.toUpperCase(), // 币种
        rangePicker: [
          coin.saleTime &&
            moment(timestampToTime(coin.saleTime / 1000), 'YYYY/MM/DD')
        ],
        amount: coin.amount,
        type: coin.type,
        price: coin.price,
        fee: coin.fee,
        minAmount: coin.limitMin, // 用户名
        maxAmount: coin.limitMax
      });
    }
  };

  createAuctionCoin = async obj => {
    const res = await createApi.createAuctionCoin(obj);
    console.log(res);
    if (res.coin) {
      this.props.history.push('/admin/snatchConfig');
    }
  };

  editAuctionCoin = async obj => {
    const res = await createApi.editAuctionCoin(obj);
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

  compareToMinAmount = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value < form.getFieldValue('minAmount')) {
      callback('最大限额应该大于最小限额!');
    } else {
      callback();
    }
  };

  compareToMaxAmount = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value > form.getFieldValue('maxAmount')) {
      callback('最小限额应该小于最大限额!');
    } else {
      callback();
    }
  };

  //   rule, value, callback
  noZero = (rule, value, callback) => {
    const form = this.props.form;
    console.log(rule);
    if (value === '0') {
      callback('请选择币种!');
    } else if (
      rule.field === 'payCoin' &&
      value === form.getFieldValue('tradeCoin')
      //   ||
      //   (rule.field === 'tradeCoin' && value === form.getFieldValue('payCoin'))
    ) {
      callback('交易币种和支付币种不能一样!');
    } else {
      callback();
    }
  };

  handleChange = e => {
    this.setState(
      {
        searchName: e
      },
      () => {
        //  this.props.form.validateFields(['minAmount'], { force: true });
        this.props.form.validateFields(['maxAmount'], { force: true });
      }
    );
  };

  handleCoinSelectionChange = e => {
    this.setState(
      {
        searchName: e
      },
      () => {
        // this.props.form.validateFields(['tradeCoin'], { force: true });
        this.props.form.validateFields(['payCoin'], { force: true });
      }
    );
    console.log('change');
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(
          values.rangePicker &&
            values.rangePicker[0] &&
            new Date(values.rangePicker[0].format('YYYY-MM-DD')).getTime()
        );
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
          amount: values.amount,
          minAmount: values.minAmount, // 用户名
          maxAmount: values.maxAmount
        };
        // this.props.match.params.snatchId !== '0'
        //   ? （obj.url = this.props.match.params.snatchId && this.editAuctionCoin(obj)）
        //   : this.createAuctionCoin(obj);
        if (this.props.match.params.snatchId !== '0') {
          const newObj = {
            url: this.props.match.params.snatchId,
            query: obj
          };
          this.editAuctionCoin(newObj);
        } else {
          console.log(obj);
          this.createAuctionCoin(obj);
        }
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
        <p className="common_title">
          <span>抢拍配置</span>
          <span
            onClick={() => {
              this.props.history.goBack();
            }}
            className="mouse_hover"
          >
            返回
          </span>
        </p>
        <Form
          layout="horizontal"
          onSubmit={this.handleSubmit}
          className={`clearfix ${styles.search_form}`}
        >
          <Form.Item label="时间" {...formItemLayout}>
            {getFieldDecorator('rangePicker')(<RangePicker />)}
          </Form.Item>
          <Form.Item label="交易币种" {...formItemLayout}>
            {getFieldDecorator('tradeCoin', {
              initialValue: '0',
              rules: [
                { required: true, message: '请选择交易币种' },
                {
                  validator: this.noZero
                }
              ]
            })(
              <Select
                className={styles.selectOption}
                onChange={this.handleCoinSelectionChange}
              >
                <Option value="0">请选择交易币种</Option>
                {coinType &&
                  coinType.map(item => (
                    <Option value={item.code}>{item.code}</Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="支付币种" {...formItemLayout}>
            {getFieldDecorator('payCoin', {
              initialValue: '0',
              rules: [
                { required: true, message: '请选择支付币种' },
                {
                  validator: this.noZero
                }
              ]
            })(
              <Select
                className={styles.selectOption}
                onChange={this.handleCoinSelectionChange}
              >
                <Option value="0">请选择支付币种</Option>
                {coinType &&
                  coinType.map(item => (
                    <Option value={item.code}>{item.code}</Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="类型" {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue: '0',
              rules: [
                { required: true, message: '请选择类型' },
                {
                  validator: this.noZero
                }
              ]
            })(
              <Select className={styles.selectOption}>
                <Option value="0">请选择类型</Option>
                <Option value="AuctionCoinTypeSell" disabled>
                  抢购
                </Option>
                <Option value="AuctionCoinTypeBuy">拍卖</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="单价" {...formItemLayout}>
            {getFieldDecorator('price', {
              rules: [{ required: true, message: '请输入单价' }]
            })(
              <InputNumber
                placeholder="请输入单价"
                className="number_search_input"
                min={0}
              />
            )}
          </Form.Item>
          <Form.Item label="数量" {...formItemLayout}>
            {getFieldDecorator('amount', {
              rules: [{ required: true, message: '请输入数量' }]
            })(
              <InputNumber
                placeholder="请输入数量"
                className="number_search_input"
                min={0}
                disabled={this.props.match.params.snatchId !== '0'}
              />
            )}
          </Form.Item>
          {/* , {
              rules: [
                {
                  validator: this.compareToMaxAmount
                }
              ]
            } */}
          <Form.Item label="最小限额" {...formItemLayout}>
            {getFieldDecorator('minAmount')(
              <InputNumber
                placeholder="请输入最小限额"
                className="number_search_input"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item label="最大限额" {...formItemLayout}>
            {getFieldDecorator('maxAmount', {
              rules: [
                {
                  validator: this.compareToMinAmount
                }
              ]
            })(
              <InputNumber
                placeholder="请输入最大限额"
                className="number_search_input"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item label="手续费" {...formItemLayout}>
            {getFieldDecorator('fee')(
              <InputNumber
                placeholder="请输入手续费"
                className="number_search_input"
              />
            )}
          </Form.Item>
          <Form.Item {...subItemLayout}>
            <Button htmlType="submit" className="mr20">
              {this.props.match.params.snatchId !== '0' ? '编辑' : '添加'}
            </Button>
            <Button
              onClick={() => {
                this.props.history.goBack();
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
