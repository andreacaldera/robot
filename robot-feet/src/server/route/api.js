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
        console.log('SPEED', speed);
        res.send(speed);
      })
      .catch(next)
  );

  // router.post('/steer', (req, res, next) =>
  //   Promise.resolve()
  //     .then(() => speed)
  //     .then(({ leftMotor, rightMotor }) => {
  //       const { steerValue } = req.body;
  //
  //       const baseMotorValue = Math.min(leftMotor, rightMotor);
  //
  //       // Assuming speed > 0 for now, if speed negative steering should work the opposite way?
  //
  //       if (steerValue > 0) {
  //         return {
  //           leftMotor: Math.abs(baseMotorValue) + Math.abs((steerValue / 2)),
  //           rightMotor: baseMotorValue,
  //         };
  //       } else if (steerValue < 0) {
  //         return {
  //           leftMotor: baseMotorValue,
  //           rightMotor: Math.abs(baseMotorValue) + Math.abs((steerValue / 2)),
  //         };
  //       }
  //
  //       return { leftMotor: baseMotorValue, rightMotor: baseMotorValue };
  //     })
  //     .then(({ leftMotor, rightMotor }) => {
  //       speed.leftMotor = leftMotor;
  //       speed.rightMotor = rightMotor;
  //       console.log('SPEED', speed);
  //       res.send(speed);
  //     })
  //     .catch(next)
  // );

  router.get('/*', (req, res, next) =>
    next(new Error('Not found'))
  );


  return router;
};
