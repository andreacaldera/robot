import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = ({ move }) =>
  (
    <div>
      <h2>Home</h2>
      Welcome
      <button onClick={move}>Move!</button>
    </div>
  );

Home.propTypes = {
  move: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  move: (e) => {
    e.preventDefault();
    return dispatch({
      type: 'MOVE',
      payload: {},
    });
  },
});

export default connect(null, mapDispatchToProps)(Home);
