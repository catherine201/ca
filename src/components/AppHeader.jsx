import React from 'react';
import { Layout } from 'antd';
import styles from './AppLayout/app_lay_out.less';

const { Header } = Layout;

class AppHeader extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <Header>
        <div className={styles.header_top}>BNB</div>
      </Header>
    );
  }
}

export default AppHeader;
