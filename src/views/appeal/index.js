import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppealList from './list';
import AppealDetail from './detail';

class Appeal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { test, getTest } = this.props;
    // const { hidden, selectedTab } = this.state;
    return (
      <div className="appeal_wrapper common_right_wrap">
        {this.props.match.params.appealId === '0' ? (
          <AppealList />
        ) : (
          <AppealDetail />
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
)(Appeal);
