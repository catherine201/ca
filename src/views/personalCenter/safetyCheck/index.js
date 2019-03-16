import React from 'react';
import { Divider, Button } from 'antd';
// import PropTypes from 'prop-types';
import styles from './safetyCheck.less';

export default class Info extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      //   nickName: '冰琉璃2050',
      //   srcImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    };
  }

  render() {
    return (
      <div className={styles.safetyCheck_wrapper}>
        <h2 className={`add_h2 ${styles.h2}`}>安全验证</h2>
        <Divider />
        <div className={styles.safetyCheck_line}>
          <div className={styles.binding_line_left}>
            <span>二次验证:</span>
            <span>未绑定</span>
          </div>
          <Button type="primary">绑定</Button>
        </div>
        <Divider dashed />
        <h2 className={styles.h2}>操作日志</h2>
        <Divider />
        <div className={styles.safetyCheck_log}>
          <p className={styles.log_p}>uuskkll;;;;hh hahaghjk</p>
          <Divider dashed />
        </div>
      </div>
    );
  }
}
