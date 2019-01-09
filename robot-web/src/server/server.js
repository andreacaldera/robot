import Express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import bodyParser from 'body-parser';
import ip from 'ip';

import ui from './route/ui';
import config from './config';
import logger from './logger';

const app = Express();

app.use(bodyParser.json());

app.use(cookieParser());
app.use('/dist', Express.static(path.join(__dirname, '../../dist')));

const { port } = config;
logger.debug('Using port', port);

export default () =>
  Promise.resolve()
    .then(() => {
      app.use(ui({ config }));

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
