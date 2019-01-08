import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import commonStyles from '../styles';
import * as feetActions from '../modules/feet/actions';

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

const Control = ({ resetMotors }) => (
  <View style={styles.mainContainer}>
    <Text style={commonStyles.btnText}>Welcome to Abune Shiatzu controls</Text>
    <TouchableOpacity onPress={resetMotors} style={commonStyles.btn}>
      <Text style={commonStyles.btnText}>Reset motors</Text>
    </TouchableOpacity>
  </View>
);

Control.propTypes = {
  resetMotors: PropTypes.func.isRequired,
};

const mapStateToProps = (/* state */) => ({});

export default connect(
  mapStateToProps,
  { resetMotors: feetActions.resetMotors },
)(Control);
