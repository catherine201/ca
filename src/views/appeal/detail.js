import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio, Button } from 'antd';
import styles from './index.less';
import { appealDetailData } from '../../utils/data';
import { getParams, timestampToTime } from '../../utils';
import createApi from '../../api/list';
import { appealStatus } from '../../utils/map';

const RadioGroup = Radio.Group;
const srcImg = require('../../assets/images/Wechat.png');

class AppealDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseValue: 0,
      data: {}
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.queryAppealDetail();
  }

  queryAppealDetail = async () => {
    const obj = {
      url: getParams('id')
    };
    const res = await createApi.queryAppeal(obj);
    if (res.appealInfo) {
      const data = res.appealInfo;
      data.adsID = res.appealInfo.order.adsID;
      data.buyer = res.appealInfo.order.owner.nickname;
      data.status = appealStatus[data.status];
      data.seller = res.appealInfo.order.adsOwner.nickname;
      data.feeCNY = res.appealInfo.order.feeCNY;
      data.payMethod = res.appealInfo.order.payMethod.bankcardNumber;
      data.referenceNO = res.appealInfo.order.referenceNO;
      data.orderCreatedTime = res.appealInfo.order.createdTime
        ? timestampToTime(res.appealInfo.order.createdTime)
        : '';
      data.createdTime = res.appealInfo.createdTime
        ? timestampToTime(res.appealInfo.createdTime)
        : '';
      // 付款确认时间  payTime
      // 放币确认时间   releaseCoinTime
      // 申诉结束时间  endTime
      data.orderaStatus = res.appealInfo.order.status;
      this.setState({
        data
      });
      console.log(this.state.data);
    }
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      chooseValue: e.target.value
    });
  };

  submit = () => {
    const obj = {
      appealId: getParams('id'),
      orderStatus: this.state.chooseValue,
      status: 'Processed'
    };
    this.updateAppeal(obj);
  };

  updateAppeal = async obj => {
    const res = await createApi.updateAppeal(obj);
    console.log(res);
    if (res) {
      this.props.history.push(
        `/admin/appeal/2?id=${getParams('id')}&type=${this.state.data.type}`
      );
    }
  };

  render() {
    // const { test, getTest } = this.props;
    const { data } = this.state;
    return (
      <div className={`appeal_detail ${styles.appeal_detail}`}>
        <p className="common_title">
          {' '}
          <span>申诉详情</span>
          <span
            onClick={() => {
              this.props.history.goBack();
            }}
            className="mouse_hover"
          >
            返回
          </span>
        </p>
        <div className={styles.content}>
          <ul className={`table_ul ${styles.tab1}`}>
            {appealDetailData.map(item => (
              <React.Fragment>
                <li className={`table_li ${styles.table_li}`}>{item.title}</li>
                <li className={`table_li ${styles.table_li_left}`}>
                  {data.id !== 'undefined' ? data[item.key] : ''}
                </li>
              </React.Fragment>
            ))}
          </ul>
          <p>申诉记录:</p>
          <img
            src={srcImg}
            width="120"
            height="120"
            alt="whechat"
            className={styles.whechat_pic}
          />
          {this.props.match.params.appealId === '2' ? (
            <div>
              <p>
                结果裁判:{' '}
                {getParams('type') === 'Cancelled' ? '交易取消' : '完成交易'}
              </p>
            </div>
          ) : (
            <div>
              <div>
                结果裁判:{'      '}
                <RadioGroup
                  onChange={this.onChange}
                  value={this.state.chooseValue}
                >
                  <Radio value="Canceled">取消交易</Radio>
                  <Radio value="Done">完成交易</Radio>
                </RadioGroup>
              </div>
              <Button
                type="primary"
                size="large"
                className="common_submit_btn"
                onClick={() => {
                  this.submit();
                }}
              >
                提交
              </Button>
            </div>
          )}
        </div>
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
)(AppealDetail);
