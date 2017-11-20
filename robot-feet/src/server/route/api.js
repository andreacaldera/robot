import express from 'express';
import winston from 'winston';
import player from 'play-sound';

export default ({ config }) => {
  winston.info('Starting API');

  const router = express.Router();

  if (config.api.brickpi) {
    const brickpi3 = require('brickpi3'); // eslint-disable-line global-require

    const brickPi = new brickpi3.BrickPi3();
    brickpi3.utils.resetAllWhenFinished(brickPi);

    const leftMotor = brickpi3.utils.getMotor(brickPi, brickPi.PORT_A);
    const rightMotor = brickpi3.utils.getMotor(brickPi, brickPi.PORT_B);

    const getMotorsSpeed = () =>
      Promise.all([rightMotor.getStatus(), leftMotor.getStatus()])
        .then(([[, leftMotorSpeed], [, rightMotorSpeed]]) => {
          winston.debug(`Current speed is ${leftMotorSpeed}, ${rightMotorSpeed}`);
          return { leftMotorSpeed, rightMotorSpeed };
        });

    const setMotorsSpeed = ({ leftMotorSpeed, rightMotorSpeed }) => {
      winston.debug(`Setting motor speed ${leftMotorSpeed}, ${rightMotorSpeed}`);
      return Promise.all([leftMotor.setPower(leftMotorSpeed), rightMotor.setPower(rightMotorSpeed)])
        .then(() => ({ leftMotorSpeed, rightMotorSpeed }));
    };

    // TODO should ensure this completes before accepting requests
    Promise.all([rightMotor.resetEncoder(), leftMotor.resetEncoder()])
      .then(() => Promise.all([leftMotor.setPower(0), rightMotor.setPower(0)]))
      .then(() => {
        winston.info('Robot initilised successfully');
      })
      .catch((err) => {
        winston.err(err, 'Unable to initialise robot');
      });

    router.post('/control-move', (req, res, next) =>
      Promise.resolve()
        .then(() => {
          const { speedValue, steerValue } = req.body;
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
        .then(({ leftMotorSpeed, rightMotorSpeed }) => setMotorsSpeed({ leftMotorSpeed, rightMotorSpeed }))
        .then(() => getMotorsSpeed())
        .then(({ leftMotorSpeed, rightMotorSpeed }) => res.send({ leftMotorSpeed, rightMotorSpeed }))
        .catch(next)
    );

    router.post('/reset-motors', (req, res) => {
      winston.debug('Resetting motors');
      return setMotorsSpeed({ leftMotorSpeed: 0, rightMotorSpeed: 0 })
        .then(() => getMotorsSpeed())
        .then(({ leftMotorSpeed, rightMotorSpeed }) => res.send({ leftMotorSpeed, rightMotorSpeed }));
    });
  }

  if (config.api.sound) {
    router.get('/play/:sound', (req, res, next) => {
      winston.debug(`Play sound ${req.params.sound}`);

      return player().play(`./sounds/${req.params.sound}.mp3`, (err) => {
        if (err) return next(err);
        return res.sendStatus(202);
      });
    });
  }

  router.get('/*', (req, res, next) =>
    next(new Error('Not found'))
  );

  return router;
};
