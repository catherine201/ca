import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './index.less';
import TotalInfo from '../../components/totalInfo';
// import { userDate } from '../../utils/data';

const RadioGroup = Radio.Group;

class ApplicationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseValue: 0,
      tableData: []
    };
  }

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      chooseValue: e.target.value
    });
  };

  render() {
    // const { test, getTest } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'UDID',
        key: 'UDID',
        render: text => <Link to={text}>{text}</Link>
      },
      {
        title: '资料',
        dataIndex: 'nickName',
        key: 'nickName'
      },
      {
        title: '附件',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '操作',
        dataIndex: '30peal',
        key: '30peal',
        render: text => <Link to={text}>查看</Link>
      }
    ];
    const { tableData } = this.state;
    return (
      <div className={`application_detail ${styles.application_detail}`}>
        <p className="common_title">
          {' '}
          <span>商户认证审核</span>
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
          <TotalInfo />
          {this.props.match.params.applicationId === '1' ? (
            <div>
              <p>申请资料：</p>
              <Table columns={columns} dataSource={tableData} />
            </div>
          ) : (
            false
          )}
          <p className={styles.assure_p}>保证金: 100000BTC</p>
          <div>
            认证结果:{'      '}
            <RadioGroup onChange={this.onChange} value={this.state.chooseValue}>
              <Radio value={1}>通过</Radio>
              <Radio value={2}>驳回</Radio>
            </RadioGroup>
          </div>
          <Button type="primary" size="large" className="common_submit_btn">
            提交
          </Button>
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
)(ApplicationDetail);
