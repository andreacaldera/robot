import history from './history';

function historyMiddleware(/* { getState } */) {
  return (next) => (action) => {
    next(action);
    switch (action.type) {
      case 'TODO':
        history.push('/todo');
        break;
      default:
    }
  };
}

export default historyMiddleware;
