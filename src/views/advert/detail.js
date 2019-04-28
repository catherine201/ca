import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.less';
import { initOrderDetailData } from '../../utils/data';
import createApi from '../../api/list';
import { getParams, timestampToTime, getPayMethod } from '../../utils';
import { AdsStatus, AdsType } from '../../utils/map';

class AdvertDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      statistic: {}
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.queryAdsDetail();
    this.queryAdsOrder();
  }

  queryAdsDetail = async () => {
    const obj = {
      url: getParams('id')
    };
    const res = await createApi.queryAds(obj);
    if (res.ads) {
      const data = res.ads;
      data.createPerson = res.ads.owner && res.ads.owner.nickname;
      data.createPersonId = res.ads.owner && res.ads.owner.id;
      data.createdTime = res.ads.createdTime
        ? timestampToTime(res.ads.createdTime)
        : '';
      data.updatedTime = res.ads.updatedTime
        ? timestampToTime(res.ads.updatedTime)
        : '';
      data.coinType = res.ads.coin.name;
      data.initAmount = res.ads.amountTotal
        ? res.ads.amountTotal * res.ads.price
        : '';
      data.balanceAmount = res.ads.amount ? res.ads.amount * res.ads.price : '';
      data.priceControl = `${res.ads.minPrice} ~ ${res.ads.maxPrice}`;
      data.payMethod = getPayMethod(res.ads.payMethods); //
      data.type = AdsType[data.type];
      data.status = AdsStatus[data.status];
      this.setState({
        data
      });
    }
  };

  queryAdsOrder = async () => {
    const obj = {
      url: getParams('id')
    };
    const res = await createApi.queryAdsOrder(obj);
    console.log(res);
    if (res.statistic) {
      this.setState({
        statistic: res.statistic
      });
    }
  };

  render() {
    // const { test, getTest } = this.props;
    const { data, statistic } = this.state;
    return (
      <div className={`advert_detail ${styles.advert_detail}`}>
        <p className="common_title">
          {' '}
          <span>广告详情</span>
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
            {initOrderDetailData.adDetail1.map(item => (
              <React.Fragment>
                <li className="table_li">{item.title}</li>
                <li className="table_li">{data[item.key]}</li>
              </React.Fragment>
            ))}
          </ul>
          <ul className={`table_ul ${styles.tab2}`}>
            {initOrderDetailData.adDetail2.map(item => (
              <React.Fragment>
                <li className="table_li">{item.title}</li>
                <li className="table_li">{data[item.key]}</li>
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
                <td>
                  {statistic.length
                    ? statistic.filter(it => item.key === it.type)[0].count
                    : ''}
                </td>
                <td>
                  {statistic.length
                    ? statistic.filter(it => item.key === it.type)[0].amount
                    : ''}
                </td>
                <td>
                  {statistic.length
                    ? statistic.filter(it => item.key === it.type)[0].value
                    : ''}
                </td>
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
