import Express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import ip from 'ip';

import api from './route/api';
import config from './config';
import logger from './logger';

const app = Express();

const c = cors();
app.use(c);
app.options('*', c);

app.use(bodyParser.json());

app.use(cookieParser());

const { port } = config;
logger.debug('Using port', port);

export default () =>
  Promise.resolve()
    .then(() => {
      app.use('/api', api({ config }));

      // eslint-disable-next-line no-unused-vars
      app.use((err, req, res, next) => {
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
