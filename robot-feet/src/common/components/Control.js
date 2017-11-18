import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Steer from './Steer';
import Speed from './Speed';

import { RESET_MOTORS, PLAY_SOUND } from '../modules/feet/constants';

import { getMotorsData, getError } from '../modules/feet';

class Control extends Component {
  static propTypes = {
    motorsData: PropTypes.shape({
      leftMotor: PropTypes.number.isRequired,
      rightMotor: PropTypes.number.isRequired,
    }),
    resetMotors: PropTypes.func.isRequired,
    abunaiShiatsu: PropTypes.func.isRequired,
    error: PropTypes.string,
  }

  static defaultProps = {
    error: null,
  }

  render() {
    return (
      <div className="container-fluid">
        <h2>Control</h2>
        {this.props.error ? (<div className="error">{this.props.error}</div>) : null}
        <div className="row">
          <div className="col">
            <Steer />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Speed />
          </div>
        </div>
        <div className="ControlButtons">
          <div>Left motor: {this.props.motorsData.leftMotor}</div>
          <div>Right motor: {this.props.motorsData.rightMotor}</div>
          <button className="btn btn-primary" type="submit" onClick={this.props.resetMotors}>Reset</button>
          <button className="btn btn-primary" type="submit" onClick={this.props.abunaiShiatsu}>Abunai shiatsu</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetMotors: (e) => {
    e.preventDefault();
    dispatch({
      type: RESET_MOTORS,
    });
  },
  abunaiShiatsu: (e) => {
    e.preventDefault();
    dispatch({
      type: PLAY_SOUND,
      payload: 'abunai-shiatsu',
    });
  },
});

const mapStateToProps = (state) => ({
  motorsData: getMotorsData(state),
  error: getError(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Control);
