import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdvertList from './list';
import AdvertDetail from './detail';

class Advert extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { test, getTest } = this.props;
    // const { hidden, selectedTab } = this.state;
    return (
      <div className="ad_wrapper common_right_wrap">
        {this.props.match.params.adId === '0' ? (
          <AdvertList />
        ) : (
          <AdvertDetail {...this.props} />
        )}
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
)(Advert);
