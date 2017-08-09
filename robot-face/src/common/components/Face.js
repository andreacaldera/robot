import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import faceModule from '../modules/face';
import { START_FACE } from '../modules/face/constants';

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

const mapStateToProps = (state) => ({
  webrtc: faceModule.getWebRtc(state),
  isConnected: faceModule.isConnected(state),
});

const mapDispatchToProps = (dispatch) => ({
  startFace(e) {
    e.preventDefault();
    dispatch({ type: START_FACE });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Face);
