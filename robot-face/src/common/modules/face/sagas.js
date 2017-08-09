
import { put, takeLatest, select, call, delay } from 'redux-saga/effects';

import { getWebRtc } from './selectors';
import { SET_WEBRTC, START_FACE, FACE_STARTED, REMOVE_VIDEO_REMOVED } from './constants';

const ROBOT_FACE_ID = 'robot-face-andrea';

export function* init() {
  if (typeof SimpleWebRTC !== 'undefined') {
    const webrtc = new SimpleWebRTC({ // eslint-disable-line no-undef
      localVideoEl: 'localVideo',
      remoteVideosEl: '',
      autoRequestMedia: true,
    });
    yield put({ type: SET_WEBRTC, webrtc });
  }
}

function initVideoAdded(webrtc) {
  return new Promise((resolve) => {
    webrtc.on('videoAdded', (video, peer) => {
      webrtc.mute();

      const remotes = document.getElementById('remotes');
      if (remotes) {
        const container = document.createElement('div');
        container.className = 'videoContainer';
        container.id = `container_${webrtc.getDomId(peer)}`;
        container.appendChild(video);
        video.oncontextmenu = () => false;
        remotes.appendChild(container);
      }
      return resolve(true);
    });
  });
}

// function initVideoRemoved(webrtc) {
//   return new Promise((resolve) => {
//     webrtc.on('videoRemoved', (video, peer) => {
//       const remotes = document.getElementById('remotes');
//       const el = document.getElementById(peer ? `container_${webrtc.getDomId(peer)}` : 'localScreenContainer');
//       if (remotes && el) {
//         remotes.removeChild(el);
//       }
//       return resolve(true);
//     });
//     return resolve(false);
//   });
// }

export function* startFace() {
  const webrtc = yield select(getWebRtc);
  webrtc.joinRoom(ROBOT_FACE_ID);

  yield call(initVideoAdded, webrtc);
  yield put({ type: FACE_STARTED });
}

export function* watchStartFace() {
  yield takeLatest(START_FACE, startFace);
}

export default [init, watchStartFace];
