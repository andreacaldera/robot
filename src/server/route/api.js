import express from 'express';
import player from 'play-sound';

import logger from '../logger';

export default ({ config }) => {
  logger.info('Starting API');

  const router = express.Router();

  if (config.api.fakeBrickpi) {
    logger.warn('Running fake brickpi implementation');
  }

  const brickPiService = config.api.fakeBrickpi ?
    require('../service/fake-brickpi')() : // eslint-disable-line global-require
    require('../service/brickpi')({ config });  // eslint-disable-line global-require

  router.post('/control-move', (req, res, next) =>
    Promise.resolve()
      .then(() => {
        // TODO make sure speed motors is wired correctly and remove this
        const steerValue = req.body.steerValue * -1;
        const speedValue = req.body.speedValue * -1;
        logger.debug(`Control move request ${speedValue}, ${steerValue}`);

        if (steerValue > 0) {
          return {
            leftMotorSpeed: (speedValue + Math.abs(steerValue / 2)) * -1,
            rightMotorSpeed: speedValue * -1,
          };
        } else if (steerValue < 0) {
          return {
            leftMotorSpeed: speedValue * -1,
            rightMotorSpeed: (speedValue + Math.abs(steerValue / 2)) * -1,
          };
        }

        return {
          leftMotorSpeed: speedValue * -1,
          rightMotorSpeed: speedValue * -1,
        };
      })
      .then(({ leftMotorSpeed, rightMotorSpeed }) => brickPiService.setMotorsSpeed({ leftMotorSpeed, rightMotorSpeed }))
      .then(() => brickPiService.getMotorsSpeed())
      .then(({ leftMotorSpeed, rightMotorSpeed }) => res.send({ leftMotorSpeed, rightMotorSpeed }))
      .catch(next)
  );

  router.post('/reset-motors', (req, res) => {
    logger.debug('Resetting motors');
    return brickPiService.setMotorsSpeed({ leftMotorSpeed: 0, rightMotorSpeed: 0 })
      .then(() => brickPiService.getMotorsSpeed())
      .then(({ leftMotorSpeed, rightMotorSpeed }) => res.send({ leftMotorSpeed, rightMotorSpeed }));
  });

  router.get('/play/:sound', (req, res, next) => {
    logger.debug(`Play sound ${req.params.sound}`);

    return player().play(`./sounds/${req.params.sound}.mp3`, (err) => {
      if (err) return next(err);
      return res.sendStatus(202);
    });
  });

  router.get('/*', (req, res, next) =>
    next(new Error('Not found'))
  );

  return router;
};
