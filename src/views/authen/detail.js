import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio, Select, Button } from 'antd';
import styles from './index.less';
import { authenDetailData } from '../../utils/data';

const Option = Select.Option;
const RadioGroup = Radio.Group;

class AuthenDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IDIndex: 'positive',
      chooseValue: 0,
      data: {}
    };
  }

  handleChange = value => {
    console.log(value);
    this.setState({
      IDIndex: value
    });
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      chooseValue: e.target.value
    });
  };

  render() {
    // const { test, getTest } = this.props;
    const { data } = this.state;
    return (
      <div className={`authen_detail ${styles.authen_detail}`}>
        <p className="common_title">实名认证审核</p>
        <div className={styles.content}>
          <div>
            <img src={data.imgSrc} alt="ID" className={styles.ID_img} />
            <br />
            <Select
              value={this.state.IDIndex}
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              <Option value="positive">证件正面</Option>
              <Option value="negative">证件反面</Option>
            </Select>
          </div>
          <div className={styles.content_right}>
            <ul className={`table_ul ${styles.tab1}`}>
              {authenDetailData.map(item => (
                <React.Fragment>
                  <li className="table_li">{item.title}</li>
                  <li className="table_li">464646464</li>
                </React.Fragment>
              ))}
            </ul>
            <div className={styles.radio}>
              认证结果：
              <RadioGroup
                onChange={this.onChange}
                value={this.state.chooseValue}
              >
                <Radio value={1}>通过</Radio>
                <Radio value={2}>驳回</Radio>
              </RadioGroup>
            </div>
            <Button type="primary" className="common_submit_btn">
              提交
            </Button>
          </div>
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
)(AuthenDetail);
