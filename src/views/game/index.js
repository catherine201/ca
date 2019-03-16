// import React from 'react';

// const Game = () => <h2>game</h2>;

// export default Game;
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';

class Game extends Component {
  static propTypes = {
    test: PropTypes.any.isRequired,
    getTest: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'games',
      hidden: false
    };
  }

  render() {
    const { test, getTest } = this.props;
    const { hidden, selectedTab } = this.state;
    return (
      <div styleName="game_wrapper">
        <p>{test}</p>
        {/* <Test onClick={() => getTest()} loading={loading.toString}>
          Test3
        </Test> */}

        <p onClick={() => getTest()}>setTest</p>
        <p>{hidden}</p>
        <p>{selectedTab}</p>
        {/* <router.view /> */}
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
)(Game);
