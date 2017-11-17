import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import bodyParser from 'body-parser';

import cors from 'cors';

import api from './route/api';
import ui from './route/ui';
import config from './config';

const app = Express();

app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));

app.use(bodyParser.json());

app.use(cookieParser());
app.use('/dist', Express.static(path.join(__dirname, '../../dist')));

const { port } = config;

export default () =>
  Promise.resolve()
    .then(() => {
      if (process.env.API) {
        app.use('/api', api());
      }
      app.use(ui());

      app.use((expressError, req, res, next) => { // eslint-disable-line no-unused-vars
        console.error(expressError); // eslint-disable-line no-console
        res.status(500).send('Sorry, an error occured');
      });

      app.listen(port, (error) => {
        if (error) {
          console.error(error); // eslint-disable-line no-console
        } else {
          console.info(`Robot feet running at http://localhost:${port}/`); // eslint-disable-line no-console
        }
      });
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      process.exit(1);
    });
