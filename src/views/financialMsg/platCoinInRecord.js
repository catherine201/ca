import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.less';
import { platCoinType } from '../../utils/data';
import createApi from '../../api/list';
import { getParams } from '../../utils';

class AdvertDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statistic: {}
    };
  }

  componentDidMount() {
    console.log(this.props);
    // this.queryAdsOrder();
  }

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
    const { statistic } = this.state;
    return (
      <div
        className={`advert_detail ${styles.coinRecord_list} ${
          styles.advert_detail
        }`}
      >
        <p className="common_title">平台币种统计</p>
        <div className={styles.content}>
          <table border="1" className={styles.orderDetailTab}>
            <tr align="center">
              <th>币种</th>
              <th>总账</th>
              <th>可用</th>
              <th>冻结</th>
            </tr>
            {platCoinType.map(item => (
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
