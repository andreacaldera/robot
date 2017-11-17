import express from 'express';

import brickpi3 from 'brickpi3';

export default () => {
  const router = express.Router();

  const speed = {
    leftMotor: 0,
    rightMotor: 0,
  };

  const brickPi = new brickpi3.BrickPi3();
  brickpi3.utils.resetAllWhenFinished(brickPi);

  const leftMotor = brickpi3.utils.getMotor(brickPi, brickPi.PORT_A);
  const rightMotor = brickpi3.utils.getMotor(brickPi, brickPi.PORT_B);
  Promise.all([rightMotor.resetEncoder(), leftMotor.resetEncoder()])
    .then(() => Promise.all([leftMotor.setPower(0), rightMotor.setPower(0)]))

  router.get('/stop', (req, res, next) =>
    Promise.all([rightMotor.setPower(0), leftMotor.setPower(0)])
      .then(() => res.sendStatus(202))
      .catch(next)
  );

  router.get('/speed/increase', (req, res, next) =>
    Promise.all([rightMotor.getStatus(), leftMotor.getStatus()])
      .then(([leftMotorStatus, rightMotorStatus]) => console.log(leftMotorStatus) || Promise.all([leftMotor.setPower(leftMotorStatus[1] + 5), rightMotor.setPower(rightMotorStatus[1] + 5)]))
      .then(() => res.sendStatus(202))
      .catch(next)
  );

  router.get('/speed/decrease', (req, res, next) =>
    Promise.all([rightMotor.getStatus(), leftMotor.getStatus()])
      .then(([[, leftMotorSpeed], [, rightMotorSpeed]]) => Promise.all([leftMotor.setPower(leftMotorSpeed - 5), rightMotor.setPower(rightMotorSpeed - 5)]))
      .then(() => res.sendStatus(202))
      .catch(next)
  );

  router.post('/control-move', (req, res, next) =>
    Promise.resolve()
      .then(() => {
        const { speedValue, steerValue } = req.body;

        if (steerValue > 0) {
          return {
            leftMotor: speedValue + Math.abs(steerValue / 2),
            rightMotor: speedValue,
          };
        } else if (steerValue < 0) {
          return {
            leftMotor: speedValue,
            rightMotor: speedValue + Math.abs(steerValue / 2),
          };
        }

        return {
          leftMotor: speedValue,
          rightMotor: speedValue,
        };
      })
      .then(({ l, r }) => {
        speed.leftMotor = l;
        speed.rightMotor = r;
        res.send(speed);
      })
      .catch(next)
  );

  router.post('/reset-motors', (req, res) => {
    speed.leftMotor = 0;
    speed.rightMotor = 0;
    return res.send(speed);
  });

  router.get('/*', (req, res, next) =>
    next(new Error('Not found'))
  );

  return router;
};
