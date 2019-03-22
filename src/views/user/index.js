import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserList from './list';
import UserDetail from './detail';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { test, getTest } = this.props;
    // const { hidden, selectedTab } = this.state;
    console.log(this.props);
    return (
      <div className="user_wrapper common_right_wrap">
        {this.props.match.params.userId === '0' ? (
          <UserList />
        ) : (
          <UserDetail {...this.props} />
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
)(User);
