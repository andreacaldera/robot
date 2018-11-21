import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Steer from './Steer';
import Speed from './Speed';

import * as feetActions from '../modules/feet/actions';

import { getMotorsData, getError } from '../modules/feet/selectors';

class Control extends Component {
  static propTypes = {
    motorsData: PropTypes.shape({
      leftMotorSpeed: PropTypes.number.isRequired,
      rightMotorSpeed: PropTypes.number.isRequired,
    }),
    resetMotors: PropTypes.func.isRequired,
    slideLeft: PropTypes.func.isRequired,
    slideRight: PropTypes.func.isRequired,
    speedUp: PropTypes.func.isRequired,
    slowDown: PropTypes.func.isRequired,
    playSound: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    error: null,
  };

  onManualControlKeyPressed = (e) => {
    switch (e.keyCode) {
      case 37:
        return this.props.slideLeft();
      case 39:
        return this.props.slideRight();
      case 38:
        return this.props.speedUp();
      case 40:
        return this.props.slowDown();
      default:
    }
  };

  resetMotors = (e) => {
    e.preventDefault();
    this.props.resetMotors();
  };

  playSound = (sound) => (e) => {
    e.preventDefault();
    this.props.playSound(sound);
  };

  render() {
    const { motorsData } = this.props;
    return (
      <div className="container-fluid">
        <h2>Control</h2>
        {this.props.error ? (
          <div className="ControlError">{this.props.error}</div>
        ) : null}
        <div className="row">
          <div className="col">
            <Steer motorsData={motorsData} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Speed motorsData={motorsData} />
          </div>
        </div>
        <div className="ControlButtons">
          <div>
            <input
              readOnly
              className="ControlButtons-manualControl"
              type="text"
              id="manualControl"
              placeholder="Use arrow keys here to drive"
              onKeyDown={this.onManualControlKeyPressed}
            />
          </div>
          <div>Left motor: {this.props.motorsData.leftMotorSpeed}</div>
          <div>Right motor: {this.props.motorsData.rightMotorSpeed}</div>
          <button
            className="ControlButtons-button btn btn-primary"
            type="submit"
            onClick={this.props.resetMotors}
          >
            Reset
          </button>
          <div className="ControlButtons-audioButtons">
            <button
              className="ControlButtons-button btn btn-primary mb-1"
              type="submit"
              onClick={this.playSound('intro')}
            >
              Intro
            </button>
            <button
              className="ControlButtons-button btn btn-primary mb-1"
              type="submit"
              onClick={this.playSound('food')}
            >
              Food
            </button>
            <button
              className="ControlButtons-button btn btn-primary mb-1"
              type="submit"
              onClick={this.playSound('love')}
            >
              Love
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  motorsData: getMotorsData(state),
  error: getError(state),
});

export default connect(
  mapStateToProps,
  { ...feetActions }
)(Control);
