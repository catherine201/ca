import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import { Redirect } from 'react-router-dom';
import router from '../../routes';
// import AppHeader from '../AppHeader';
import AppSider from '../AppSider';
// import AppFooter from '../AppFooter';
import './app_lay_out.less';

const { Content } = Layout;

const NotAuth = () => <Redirect to="/notAccess" />;
class App extends Component {
  state = {};

  componentDidMount() {}

  render() {
    const user = sessionStorage.getItem('user');
    if (!user) {
      return <NotAuth />;
    }
    return (
      <Layout className="app-layout">
        <BackTop />
        {/* <AppHeader /> */}
        <Layout>
          <AppSider {...this.props} />
          <Content>
            <router.view name={this.props.route.name} key="xx" />
          </Content>
          {/* <Footer>
            <AppFooter />
          </Footer> */}
        </Layout>
      </Layout>
    );
  }
}

export default App;
