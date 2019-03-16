import classNames from 'classnames';
import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './404.less';

export default class NotMatch extends React.Component {
  static propTypes = {
    history: PropTypes.any.isRequired
  };

  handlerBack() {
    this.props.history.go(-1);
  }

  render() {
    const cx = classNames({
      [styles['error-panel']]: true,
      fadeInUp: true
    });
    return (
      <div className={cx}>
        <h1 className={styles['error-code']}>404</h1>
        <p className={styles['error-description']}>Page Not Found</p>
        <div className={styles['error-ctrl']}>
          <Button type="primary" href="/">
            主页
          </Button>
          &nbsp;
          <Button onClick={() => this.handlerBack()}>返回</Button>
        </div>
        <p className={styles.copyright}>Make by Leeker Labs</p>
      </div>
    );
  }
}
