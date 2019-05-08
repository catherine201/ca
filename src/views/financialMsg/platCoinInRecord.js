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
    this.props.getCoinType().then(() => {
      console.log(this.props.coinType);
      this.querylistDepositStatus();
    });
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
    const { coinType } = this.props;
    console.log(coinType);
    const { data } = this.state;
    console.log(data);
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
              {coinType.length &&
                data.length &&
                coinType.map(item => {
                  console.log(item);
                  console.log(data);
                  const it = data.filter(value => {
                    console.log(value);
                    return (
                      value.coinCode.toLowerCase() === item.code.toLowerCase()
                    );
                  })[0];
                  console.log(it);
                  return it ? (
                    <tr align="center" key={it.coinCode}>
                      <td>{it.coinCode ? it.coinCode.toUpperCase() : ''}</td>
                      <td>{it.total.toString()}</td>
                      <td>{it.avaliable}</td>
                      <td>{it.freeze}</td>
                    </tr>
                  ) : (
                    ''
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  coinType: state.selectOption.coinType
});

const mapDispatchToProps = dispatch => ({
  getCoinType: dispatch.selectOption.getCoinType
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertDetail);
