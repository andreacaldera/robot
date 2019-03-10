import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

import commonStyles from '../styles';

import Control from './Control';
import Video from './Video';

const styles = StyleSheet.create({
  ...commonStyles,
});

class Main extends Component {
  onPress = (component) => {
    if (component === 'Control') {
      this.props.navigator.push({
        title: component,
        component: Control,
      });
    } else if (component === 'Video') {
      this.props.navigator.push({
        title: component,
        component: Video,
      });
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.home}>
        <Text style={styles.title}>Abune Shiatzu</Text>
        <TouchableOpacity
          onPress={() => this.onPress('Control')}
          style={commonStyles.btn}
        >
          <Text style={commonStyles.btnText}>Control</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.onPress('Video')}
          style={commonStyles.btn}
        >
          <Text style={commonStyles.btnText}>Video</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

Main.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default connect()(Main);
