import React, { Component } from 'react';
import styles from './withdrawalConfig.less';

// 提币审核配置
export default class WithdrawalConfig extends Component {
  render() {
    return (
      <div className={styles.withdrawalConfig}>
        <section className={styles.title}>提币审核配置</section>
      </div>
    );
  }
}
