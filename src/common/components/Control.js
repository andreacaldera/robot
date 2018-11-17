import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Steer from './Steer';
import Speed from './Speed';

import { RESET_MOTORS, PLAY_SOUND, SLIDE_LEFT, SLIDE_RIGHT, SPEED_UP, SLOW_DOWN } from '../modules/feet/constants';

import { getMotorsData, getError } from '../modules/feet';

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
  }

  static defaultProps = {
    error: null,
  }

  onManualControlKeyPressed = (e) => {
    switch (e.keyCode) {
      case 37: return this.props.slideLeft();
      case 39: return this.props.slideRight();
      case 38: return this.props.speedUp();
      case 40: return this.props.slowDown();
      default:
    }
  }

  render() {
    const { motorsData } = this.props;
    return (
      <div className="container-fluid">
        <h2>Control</h2>
        {this.props.error ? (<div className="ControlError">{this.props.error}</div>) : null}
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
            <input readOnly className="ControlButtons-manualControl" type="text" id="manualControl" placeholder="Use arrow keys here to drive" onKeyDown={this.onManualControlKeyPressed} />
          </div>
          <div>Left motor: {this.props.motorsData.leftMotorSpeed}</div>
          <div>Right motor: {this.props.motorsData.rightMotorSpeed}</div>
          <button className="ControlButtons-button btn btn-primary" type="submit" onClick={this.props.resetMotors}>Reset</button>
          <div className="ControlButtons-audioButtons">
            <button className="ControlButtons-button btn btn-primary mb-1" type="submit" onClick={(e) => this.props.playSound(e, 'intro')}>Intro</button>
            <button className="ControlButtons-button btn btn-primary mb-1" type="submit" onClick={(e) => this.props.playSound(e, 'food')}>Food</button>
            <button className="ControlButtons-button btn btn-primary mb-1" type="submit" onClick={(e) => this.props.playSound(e, 'love')}>Love</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  slideLeft: () => {
    dispatch({
      type: SLIDE_LEFT,
    });
  },
  slideRight: () => {
    dispatch({
      type: SLIDE_RIGHT,
    });
  },
  speedUp: () => {
    dispatch({
      type: SPEED_UP,
    });
  },
  slowDown: () => {
    dispatch({
      type: SLOW_DOWN,
    });
  },
  resetMotors: (e) => {
    e.preventDefault();
    dispatch({
      type: RESET_MOTORS,
    });
  },
  playSound: (e, sound) => {
    e.preventDefault();
    dispatch({
      type: PLAY_SOUND,
      payload: sound,
    });
  },
});

const mapStateToProps = (state) => ({
  motorsData: getMotorsData(state),
  error: getError(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Control);
