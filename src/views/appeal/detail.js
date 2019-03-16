import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.less';
import { appealDetailData } from '../../utils/data';

class AppealDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { test, getTest } = this.props;
    // const { hidden, selectedTab } = this.state;
    return (
      <div className={`appeal_detail ${styles.appeal_detail}`}>
        <p className="common_title">申诉详情</p>
        <div className={styles.content}>
          <ul className={`table_ul ${styles.tab1}`}>
            {appealDetailData.map(item => (
              <React.Fragment>
                <li className={`table_li ${styles.table_li}`}>{item.title}</li>
                <li className={`table_li ${styles.table_li_left}`}>
                  464646464
                </li>
              </React.Fragment>
            ))}
          </ul>
          <p>申诉记录:</p>
          <p>结果裁判: 交易取消</p>
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
