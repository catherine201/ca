import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.less';
import { orderDetailData } from '../../utils/data';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   receiveTypeData: []
    };
  }

  render() {
    // const { test, getTest } = this.props;
    // const { receiveTypeData } = this.state;
    return (
      <div className={`order_detail ${styles.order_detail}`}>
        <p className="common_title">订单详情</p>
        <div className={styles.content}>
          <ul className={`table_ul tab1 ${styles.tab1}`}>
            {orderDetailData.map(item => (
              <React.Fragment>
                <li className="table_li">{item.title}</li>
                <li className="table_li">464646464</li>
              </React.Fragment>
            ))}
          </ul>
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
)(OrderDetail);
