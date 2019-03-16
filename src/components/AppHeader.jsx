import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

class AppHeader extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <Header>
        <div>BNB</div>
      </Header>
    );
  }
}

export default AppHeader;
