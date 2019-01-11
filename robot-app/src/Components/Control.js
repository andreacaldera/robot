import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import commonStyles from '../styles';
import * as feetActions from '../modules/feet/actions';
import { getMotorsData } from '../modules/feet/selectors';

const styles = StyleSheet.create({
  ...commonStyles,
  slotFilled: {},
  slotEmpty: {
    backgroundColor: '#ccc',
    borderStyle: 'solid',
    borderColor: '#999',
    borderRadius: 30,
    overflow: 'hidden',
    paddingTop: 25,
    fontSize: 9,
    textAlign: 'center',
  },
});

const Control = ({ motorsData, resetMotors, speedUp, slowDown }) => (
  <View style={styles.mainContainer}>
    <Text style={commonStyles.btnText}>Welcome to Abune Shiatzu controls</Text>
    <Text>
      Motors data: {motorsData.leftMotorSpeed} | {motorsData.rightMotorSpeed}
    </Text>
    <TouchableOpacity onPress={speedUp} style={commonStyles.btn}>
      <Text style={commonStyles.btnText}>Speed up</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={resetMotors} style={commonStyles.btnDanger}>
      <Text style={commonStyles.btnTextDanger}>Stop</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={slowDown} style={commonStyles.btn}>
      <Text style={commonStyles.btnText}>Speed down</Text>
    </TouchableOpacity>
  </View>
);

Control.propTypes = {
  motorsData: PropTypes.shape({
    leftMotorSpeed: PropTypes.number.isRequired,
    rightMotorSpeed: PropTypes.number.isRequired,
  }).isRequired,
  resetMotors: PropTypes.func.isRequired,
  speedUp: PropTypes.func.isRequired,
  slowDown: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  motorsData: getMotorsData(state),
});

export default connect(
  mapStateToProps,
  {
    resetMotors: feetActions.resetMotors,
    speedUp: feetActions.speedUp,
    slowDown: feetActions.slowDown,
  },
)(Control);
