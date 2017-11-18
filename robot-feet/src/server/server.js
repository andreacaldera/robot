import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import bodyParser from 'body-parser';
import winston from 'winston';
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

winston.level = 'debug';

export default () =>
  Promise.resolve()
    .then(() => {
      if (config.api) {
        app.use('/api', api());
      }
      app.use(ui());

      app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
        winston.error(err);
        res.status(500).send('Sorry, an error occured');
      });

      app.listen(port, (error) => {
        if (error) {
          winston.error(error);
        } else {
          winston.info(`Robot feet running at http://localhost:${port}/`);
        }
      });
    })
    .catch((err) => {
      winston.error(err, 'Unable to start server');
      process.exit(1);
    });
