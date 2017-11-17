import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Face = ({ startFace, isConnected }) =>
  (<div>
    <h1>Hey you, pretty robot face!</h1>
    <div>
      <button className="btn btn-primary" onClick={startFace}>Start face</button>
      {!isConnected && (<div className="remove-video-waiting">Waiting for connection</div>)}
      <div id="videoContainer" className="local-video-container">
        <video id="localVideo" />
      </div>
      <div id="remotes" className="remove-video-container" />
    </div>
  </div>);

Face.propTypes = {
  startFace: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

export default connect(null, null)(Face);
