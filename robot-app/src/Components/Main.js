import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import commonStyles from '../styles';

import Control from './Control';

const styles = StyleSheet.create({
  ...commonStyles,
});

class Main extends Component {
  onPress = (component) => {
    if (component !== 'Control') {
      return;
    }
    this.props.navigator.push({
      title: component,
      component: Control,
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.home}>
        <Text style={styles.title}>Login as: </Text>
        <TouchableOpacity
          onPress={() => this.onPress('Control')}
          style={commonStyles.btn}
        >
          <Text style={commonStyles.btnText}>Control</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

Main.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default connect()(Main);
