import App from './components/App';
import Home from './components/Home';
import About from './components/About';

const routes = [
  { component: App,
    routes: [
      { path: '/', exact: true, component: Home },
      { path: '/about', component: About },
    ],
  },
]; // TODO error page

export default routes;
