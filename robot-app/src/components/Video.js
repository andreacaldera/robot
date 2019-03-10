import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, WebView } from 'react-native';

import commonStyles from '../styles';
// import * as feetActions from '../modules/feet/actions';

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

const Video = () => (
  <View style={styles.mainContainer}>
    <WebView
      source={{
        uri: 'http://192.168.1.75:4001/api/test',
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
        headers: {
          test: 'wtf',
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
        },
      }}
      style={{ marginTop: 20, height: 20, width: 400 }}
      // onLoadProgress={(e) => console.log(e.nativeEvent.progress)}
    />
  </View>
);

Video.propTypes = {};

const mapStateToProps = (/* state */) => ({});

export default connect(
  mapStateToProps,
  null,
)(Video);
