import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApplicationList from './list';
import ApplicationDetail from './detail';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { test, getTest } = this.props;
    // const { hidden, selectedTab } = this.state;
    return (
      <div className="application_wrapper common_right_wrap">
        {this.props.match.params.applicationId === '0' ? (
          <ApplicationList />
        ) : (
          <ApplicationDetail {...this.props} />
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
)(UserList);
