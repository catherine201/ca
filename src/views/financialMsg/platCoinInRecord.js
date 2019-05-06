import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.less';
// import { platCoinType } from '../../utils/data';
import createApi from '../../api/list';
// import { getParams } from '../../utils';

class AdvertDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // statistic: {},
      data: []
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.querylistDepositStatus();
  }

  querylistDepositStatus = async () => {
    const res = await createApi.listDepositStatus();
    console.log(res);
    if (res.datas) {
      this.setState({
        data: res.datas
      });
    }
  };

  render() {
    // const { test, getTest } = this.props;
    const { data } = this.state;
    return (
      <div
        className={`advert_detail ${styles.coinRecord_list} ${
          styles.advert_detail
        }`}
      >
        <p className="common_title">平台币种统计</p>
        <div className={styles.content}>
          <table border="1" className={styles.orderDetailTab}>
            <tbody>
              <tr align="center">
                <th>币种</th>
                <th>总账</th>
                <th>可用</th>
                <th>冻结</th>
              </tr>
              {data.map(item => (
                <tr align="center" key={item.coinCode}>
                  <td>{item.coinCode ? item.coinCode.toUpperCase() : ''}</td>
                  <td>{item.total.toString()}</td>
                  <td>{item.avaliable}</td>
                  <td>{item.freeze}</td>
                </tr>
              ))}
            </tbody>
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
