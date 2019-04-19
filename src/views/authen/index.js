import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthenList from './list';
import AuthenDetail from './detail';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: {}
    };
  }

  componentDidUpdate() {
    this.$event.$on('authenDetailData', text => {
      this.setState({
        detailData: text
      });
    });
  }

  receivedetail = val => {
    console.log(val);
    this.setState({
      detailData: val
    });
  };

  render() {
    // const { test, getTest } = this.props;
    console.log('chongxundaf');
    console.log(this.state.detailData);
    const { detailData } = this.state;
    return (
      <div className="authen_wrapper common_right_wrap">
        {this.props.match.params.authenId === '0' ? (
          <AuthenList
            handleReceivedetail={this.receivedetail}
            {...this.props}
          />
        ) : (
          <AuthenDetail {...this.props} detailData={detailData} />
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
