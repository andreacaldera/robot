import brickpi3 from 'brickpi3';
import winston from 'winston';

export default () => {
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

  return Object.freeze({
    getMotorsSpeed,
    setMotorsSpeed,
  });
};
