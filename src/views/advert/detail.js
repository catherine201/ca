import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.less';
import { initOrderDetailData } from '../../utils/data';

class AdvertDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { test, getTest } = this.props;
    // const { hidden, selectedTab } = this.state;
    return (
      <div className={`advert_detail ${styles.advert_detail}`}>
        <p className="common_title">广告详情</p>
        <div className={styles.content}>
          <ul className={`table_ul ${styles.tab1}`}>
            {initOrderDetailData.adDetail1.map(item => (
              <React.Fragment>
                <li className="table_li">{item.title}</li>
                <li className="table_li">464646464</li>
              </React.Fragment>
            ))}
          </ul>
          <ul className={`table_ul ${styles.tab2}`}>
            {initOrderDetailData.adDetail2.map(item => (
              <React.Fragment>
                <li className="table_li">{item.title}</li>
                <li className="table_li">464646464</li>
              </React.Fragment>
            ))}
          </ul>
          <p className={styles.title}>订单明细:</p>
          <table border="1" className={styles.orderDetailTab}>
            <tr align="center">
              <th />
              <th>笔数</th>
              <th>数量</th>
              <th>金额</th>
            </tr>
            {initOrderDetailData.orderDetail.map(item => (
              <tr align="center">
                <td>{item.title}</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
            ))}
          </table>
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
)(AdvertDetail);
