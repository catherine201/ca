import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.less';
import { orderDetailData } from '../../utils/data';
import createApi from '../../api/list';
import { getParams } from '../../utils';
import { AdsOrderStatus } from '../../utils/map';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   receiveTypeData: []
      data: {}
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.queryOrdersDetail();
  }

  queryOrdersDetail = async () => {
    const obj = {
      url: getParams('id')
    };
    const res = await createApi.queryOrders(obj);
    if (res.order) {
      const data = res.order;
      data.buyer = res.order.owner.nickname;
      data.seller = res.order.adsOwner.nickname;
      data.status = AdsOrderStatus[data.status];
      data.type = res.order.payMethod.bank.name;
      this.setState({
        data
      });
    }
  };

  render() {
    // const { test, getTest } = this.props;
    const { data } = this.state;
    return (
      <div className={`order_detail ${styles.order_detail}`}>
        <p className="common_title">
          <span>订单详情</span>
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
          <ul className={`table_ul tab1 ${styles.tab1}`}>
            {orderDetailData.map(item => (
              <React.Fragment>
                <li className="table_li">{item.title}</li>
                <li className="table_li">{data[item.key]}</li>
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
