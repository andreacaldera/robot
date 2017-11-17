import express from 'express';

export default () => {
  const router = express.Router();

  const speed = {
    leftMotor: 0,
    rightMotor: 0,
  };

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
      .then(({ leftMotor, rightMotor }) => {
        speed.leftMotor = leftMotor;
        speed.rightMotor = rightMotor;
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
