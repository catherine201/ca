import React from 'react';
import { connect } from 'react-redux';
// import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
// import { Icon } from 'antd';

// const IconFont = Icon.createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_570381_jsx2qmhaxtg.js'
// });
/* eslint-disable */
function Test(props) {
  const { test } = props;
  return (
    <div>
      {/* <h2>{JSON.parse(window.sessionStorage.getItem('user')).username}</h2> */}
      {/* <IconFont type="icon-icon15" /> */}
      <p>欢迎您</p>
      {/* <Icon type="loading" /> */}
      {/* <i className="iconfont hd-icon-index-delete"></i> */}
      {/* <p>{test}</p> */}
    </div>
  );
}
/* eslint-enable */

Test.propTypes = {
  test: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  test: state.demo.test
});

const mapDispatchToProps = dispatch => ({
  setTest: dispatch.demo.setTest
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CSSModules(Test, styles));
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
