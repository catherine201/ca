import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import styles from './index.less';
import TotalInfo from '../../components/totalInfo';
import { userDate } from '../../utils/data';
import { userStatusType } from '../../utils/map';
import createApi from '../../api/list';
import { getParams, timestampToTime } from '../../utils';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // receiveTypeData: [],
      data: {}
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.queryUserDetail();
  }

  queryUserDetail = async () => {
    const obj = {
      url: getParams('id')
    };
    const res = await createApi.queryUser(obj);
    if (res.detail) {
      const data = res.detail;
      data.status = userStatusType[data.status];
      data.createdTime = res.detail.createdTime
        ? timestampToTime(res.detail.createdTime)
        : '';
      data.dealRate = res.detail.txTotal
        ? res.detail.dealTotal / res.detail.txTotal
        : '';
      data.dealRate30 = res.detail.txTotal30
        ? res.detail.dealTotal30 / res.detail.txTotal30
        : '';
      data.winRate = res.detail.appealTotal
        ? res.detail.winCaseTotal / res.detail.appealTotal
        : '';
      data.winRate30 = res.detail.appealTotal30
        ? res.detail.winCaseTotal30 / res.detail.appealTotal30
        : '';
      res.detail.balances &&
        res.detail.balances.length &&
        res.detail.balances.map(
          (item, index) => (data.balances[index].key = index + 1)
        );
      res.detail.payMethods &&
        res.detail.payMethods.length &&
        res.detail.payMethods.map(
          (item, index) => (data.payMethods[index].key = index + 1)
        );
      this.setState({
        data
      });
      console.log(this.state.data);
    }
  };

  render() {
    // const { test, getTest } = this.props;
    const { data } = this.state;
    return (
      <div className={`user_detail ${styles.user_detail}`}>
        <p className="common_title">
          {' '}
          <span>用户详情</span>
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
          <p className={styles.p_line}>限制交易/取消限制/限制登录</p>
          <TotalInfo data={data}>
            <p className="lh40">收款方式:</p>
            <Table
              columns={userDate.receiveType}
              dataSource={data.payMethods}
            />
          </TotalInfo>
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
)(UserDetail);
