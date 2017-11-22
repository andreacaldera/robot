import express from 'express';
import winston from 'winston';
import player from 'play-sound';

export default ({ config }) => {
  winston.info('Starting API');

  const router = express.Router();

  if (config.api.fakeBrickpi) {
    winston.warn('Running fake brickpi implementation');
  }

  const brickPiService = config.api.fakeBrickpi ?
    require('../service/fake-brickpi') : // eslint-disable-line global-require
    require('../service/brickpi');  // eslint-disable-line global-require

  router.post('/control-move', (req, res, next) =>
    Promise.resolve()
      .then(() => {
        const { steerValue } = req.body;
        const speedValue = req.body.speedValue * -1;
        winston.debug(`Control move request ${speedValue}, ${steerValue}`);

        if (steerValue > 0) {
          return {
            leftMotorSpeed: speedValue + Math.abs(steerValue / 2),
            rightMotorSpeed: speedValue,
          };
        } else if (steerValue < 0) {
          return {
            leftMotorSpeed: speedValue,
            rightMotorSpeed: speedValue + Math.abs(steerValue / 2),
          };
        }

        return {
          leftMotorSpeed: speedValue,
          rightMotorSpeed: speedValue,
        };
      })
      .then(({ leftMotorSpeed, rightMotorSpeed }) => brickPiService.setMotorsSpeed({ leftMotorSpeed, rightMotorSpeed }))
      .then(() => brickPiService.getMotorsSpeed())
      .then(({ leftMotorSpeed, rightMotorSpeed }) => res.send({ leftMotorSpeed, rightMotorSpeed }))
      .catch(next)
  );

  router.post('/reset-motors', (req, res) => {
    winston.debug('Resetting motors');
    return brickPiService.setMotorsSpeed({ leftMotorSpeed: 0, rightMotorSpeed: 0 })
      .then(() => brickPiService.getMotorsSpeed())
      .then(({ leftMotorSpeed, rightMotorSpeed }) => res.send({ leftMotorSpeed, rightMotorSpeed }));
  });

  router.get('/play/:sound', (req, res, next) => {
    winston.debug(`Play sound ${req.params.sound}`);

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
