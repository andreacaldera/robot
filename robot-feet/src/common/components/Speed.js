import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Slider from 'react-rangeslider';

const min = 0;
const max = 100;

const labels = {
  [min]: 'Stop',
  [(max - min) / 2]: 'Medium',
  [max]: 'Fast',
};

class Speed extends Component {
  static propTypes = {
    setSpeed: PropTypes.func.isRequired,
  };

  state = {
    speedValue: 0,
  }

  onSpeedChange = (speedValue) => {
    this.setState({ speedValue });
    this.props.setSpeed(speedValue);
  }

  render() {
    return (
      <div className="SpeedSlider mt-5">
        <Slider
          min={min}
          max={max}
          step={10}
          value={this.state.speedValue}
          orientation="vertical"
          labels={labels}
          onChange={this.onSpeedChange}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSpeed: (value) =>
    dispatch({
      type: 'SET_SPEED',
      payload: value,
    }),
});

export default connect(null, mapDispatchToProps)(Speed);
