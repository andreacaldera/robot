import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import ip from 'ip';

import api from './route/api';
import ui from './route/ui';
import config from './config';
import logger from './logger';

const app = Express();

app.use(cors());

app.use(bodyParser.json());

app.use(cookieParser());
app.use('/dist', Express.static(path.join(__dirname, '../../dist')));

const { port } = config;
logger.debug('Using port', port);

export default () =>
  Promise.resolve()
    .then(() => {
      app.use('/api', api({ config }));
      app.use(ui({ config }));

      app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
        logger.error(err);
        res.status(500).send('Sorry, an error occured');
      });

      app.listen(port, (error) => {
        if (error) {
          logger.error(error);
        } else {
          logger.info(`Server running at http://${ip.address()}:${port}/`);
        }
      });
    })
    .catch((err) => {
      logger.error(err, 'Unable to start server');
      process.exit(1);
    });
