import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import styles from './index.less';
import TotalInfo from '../../components/totalInfo';
import { userDate } from '../../utils/data';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiveTypeData: []
    };
  }

  render() {
    // const { test, getTest } = this.props;
    const { receiveTypeData } = this.state;
    return (
      <div className={`user_detail ${styles.user_detail}`}>
        <p className="common_title">用户详情</p>
        <div className={styles.content}>
          <p className={styles.p_line}>限制交易/取消限制/限制登录</p>
          <TotalInfo>
            <p>收款方式</p>
            <Table
              columns={userDate.receiveType}
              dataSource={receiveTypeData}
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
