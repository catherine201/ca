import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import styles from './index.less';
import { userDate } from '../../utils/data';

class TotalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetDetaildata: []
    };
  }

  render() {
    // const { test, getTest } = this.props;
    const { assetDetaildata } = this.state;
    return (
      <div className={`total_info ${styles.total_info}`}>
        <ul className={`table_ul tab1 ${styles.tab1}`}>
          {userDate.userDetail1.map(item => (
            <React.Fragment>
              <li className="table_li">{item.title}</li>
              <li className="table_li">464646464</li>
            </React.Fragment>
          ))}
        </ul>
        <ul className={`table_ul tab1 ${styles.tab1}`}>
          {userDate.userDetail2.map(item => (
            <React.Fragment>
              <li className="table_li">{item.title}</li>
              <li className="table_li">464646464</li>
            </React.Fragment>
          ))}
        </ul>
        <ul className={`table_ul tab1 ${styles.tab1}`}>
          {userDate.userDetail3.map(item => (
            <React.Fragment>
              <li className="table_li">{item.title}</li>
              <li className="table_li">464646464</li>
            </React.Fragment>
          ))}
        </ul>
        <ul className={`table_ul tab1 ${styles.tab1}`}>
          {userDate.userDetail4.map(item => (
            <React.Fragment>
              <li className="table_li">{item.title}</li>
              <li className="table_li">464646464</li>
            </React.Fragment>
          ))}
        </ul>
        <ul className={`table_ul tab1 ${styles.tab1}`}>
          {userDate.userDetail5.map(item => (
            <React.Fragment>
              <li className="table_li">{item.title}</li>
              <li className="table_li">464646464</li>
            </React.Fragment>
          ))}
        </ul>
        {this.props.children}
        <p>资产明细</p>
        <Table columns={userDate.assetDetail} dataSource={assetDetaildata} />
        <p>合计人民币资产：0.0</p>
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
)(TotalInfo);
