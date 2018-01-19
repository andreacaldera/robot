import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Slider from 'react-rangeslider';

const min = -100;
const max = 100;

const labels = {
  [min]: 'Left',
  0: 'Straight',
  [max]: 'Right',
};

class Steer extends Component {
  static propTypes = {
    motorsData: PropTypes.shape({
      leftMotorSpeed: PropTypes.number.isRequired,
      rightMotorSpeed: PropTypes.number.isRequired,
    }).isRequired,
    steer: PropTypes.func.isRequired,
  };

  state = {
    steerValue: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.motorsData.leftMotorSpeed === 0 && nextProps.motorsData.rightMotorSpeed === 0) {
      this.setState({ steerValue: 0 });
    }
  }

  onSteerChange = (steerValue) => {
    this.setState({ steerValue });
    this.props.steer(steerValue);
  }

  render() {
    return (
      <div className="SteerSlider">
        <Slider
          min={min}
          max={max}
          step={10}
          value={this.state.steerValue}
          orientation="horizontal"
          labels={labels}
          onChange={this.onSteerChange}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  steer: (value) =>
    dispatch({
      type: 'SET_STEER',
      payload: value,
    }),
});

export default connect(null, mapDispatchToProps)(Steer);
