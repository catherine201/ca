import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio, Select, Button } from 'antd';
import styles from './index.less';
import { authenDetailData } from '../../utils/data';
import { cardType, verifyStatus, authenStatusType } from '../../utils/map';
import { timestampToTime } from '../../utils';
// import { getParams } from '../../utils';
import createApi from '../../api/list';

const Option = Select.Option;
const RadioGroup = Radio.Group;

class AuthenDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IDIndex: 'positive',
      chooseValue: 0, // 通过1  驳回2
      data: {}
    };
  }

  componentWillMount() {
    console.log(JSON.parse(sessionStorage.getItem('authenDetail')));
    const data = { ...JSON.parse(sessionStorage.getItem('authenDetail')) };
    data.cerAuthen = data.verifyStatus
      ? verifyStatus[data.verifyStatus]
      : '未提交';
    data.cerType = cardType[data.cer.type];
    data.serialNo = data.cer.serialNo;
    data.idcard_url = data.idcard_front_url;
    data.createdTime = data.createdTime
      ? timestampToTime(data.createdTime / 1000)
      : '';
    data.accountStatus = authenStatusType[data.accountStatus];
    this.setState({
      data
    });
    // console.log('authenDetailData');
    // console.log(this.props.detailData);
    // this.$event.$on('authenDetailData', text => {
    //   console.log(text);
    //   const data = { ...text };
    //   data.cerAuthen = realNameInfoStatus[data.realNameInfoStatus];
    //   data.cerType = cardType[data.cer.type];
    //   data.idcard_url = data.idcard_front_url;
    //   data.createdTime = data.createdTime
    //     ? timestampToTime(data.createdTime)
    //     : '';
    //   data.accountStatus = authenStatusType[data.accountStatus];
    //   this.setState({
    //     data
    //   });
    // });
  }

  submit = () => {
    const obj = {
      url: this.state.data.uid,
      query: {
        status: this.state.chooseValue
      }
    };
    this.verificationSubmit(obj);
  };

  verificationSubmit = async obj => {
    const res = await createApi.verificationSubmit(obj);
    console.log(res);
    if (res.success) {
      this.props.history.push(`/admin/authen/0`);
    }
  };

  handleChange = value => {
    console.log(value);
    const data = this.state.data;
    switch (value) {
      case 'positive':
        data.idcard_url = data.idcard_front_url;
        break;
      case 'negative':
        data.idcard_url = data.idcard_back_url;
        break;
      default:
        break;
    }
    this.setState({
      IDIndex: value,
      data
    });
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      chooseValue: e.target.value
    });
  };

  render() {
    // const { test, getTest } = this.props;
    // console.log(this.props.detailData);
    const { data } = this.state;
    return (
      <div className={`authen_detail ${styles.authen_detail}`}>
        <p className="common_title">
          <span>实名认证审核</span>
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
          <div>
            <img src={data.idcard_url} alt="ID" className={styles.ID_img} />
            <br />
            <Select
              value={this.state.IDIndex}
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              <Option value="positive">证件正面</Option>
              <Option value="negative">证件反面</Option>
            </Select>
          </div>
          <div className={styles.content_right}>
            <ul className={`table_ul ${styles.tab1}`}>
              {authenDetailData.map((item, index) => (
                <React.Fragment key={index}>
                  <li className="table_li">{item.title}</li>
                  <li className="table_li">{data[item.key]}</li>
                </React.Fragment>
              ))}
            </ul>
            <div className={styles.radio}>
              认证结果：
              <RadioGroup
                onChange={this.onChange}
                value={this.state.chooseValue}
              >
                <Radio value={3}>通过</Radio>
                <Radio value={1}>驳回</Radio>
              </RadioGroup>
            </div>
            <Button
              type="primary"
              className="common_submit_btn"
              onClick={() => {
                this.submit();
              }}
            >
              提交
            </Button>
          </div>
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
)(AuthenDetail);
