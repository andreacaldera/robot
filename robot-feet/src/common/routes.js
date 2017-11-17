import App from './components/App';
import Control from './components/Control';
import About from './components/About';
import NotFound from './components/NotFound';

const routes = [
  { component: App,
    routes: [
      { path: '/', exact: true, component: Control },
      { path: '/about', component: About },
      { path: '*', component: NotFound },
    ],
  },
];

export default routes;
