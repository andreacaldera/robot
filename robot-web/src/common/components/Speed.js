import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Slider from 'react-rangeslider';

import { SET_SPEED } from '../modules/feet/constants';

import { getSpeed } from '../modules/feet/selectors';

const min = -100;
const max = 100;

const labels = {
  [min]: 'Backwards',
  0: 'Stop',
  [max]: 'Forward',
};

class Speed extends Component {
  static propTypes = {
    setSpeed: PropTypes.func.isRequired,
    speed: PropTypes.number.isRequired,
  };

  onSpeedChange = (speedValue) => {
    this.props.setSpeed(speedValue);
  };

  render() {
    return (
      <div className="SpeedSlider mt-5">
        <Slider
          min={min}
          max={max}
          step={10}
          value={this.props.speed}
          orientation="vertical"
          labels={labels}
          onChange={this.onSpeedChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  speed: getSpeed(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSpeed: (value) =>
    dispatch({
      type: SET_SPEED,
      payload: value,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Speed);
