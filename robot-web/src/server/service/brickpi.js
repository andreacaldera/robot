import brickpi3 from 'brickpi3';

import logger from '../logger';

export default ({ config }) => {
  logger.info('Connecting to BrickPI');

  const leftMotorId = config.api.leftMotor;
  const rightMotorId = config.api.rightMotor;

  logger.info(`Left motor ${leftMotorId}, right motor ${rightMotorId}`);

  const brickPi = new brickpi3.BrickPi3();

  brickpi3.utils.resetAllWhenFinished(brickPi);

  const leftMotor = brickpi3.utils.getMotor(brickPi, brickPi[leftMotorId]);
  const rightMotor = brickpi3.utils.getMotor(brickPi, brickPi[rightMotorId]);

  const getMotorsSpeed = () =>
    Promise.all([rightMotor.getStatus(), leftMotor.getStatus()])
      .then(([[, leftMotorSpeed], [, rightMotorSpeed]]) => {
        logger.debug(`Current speed is ${leftMotorSpeed}, ${rightMotorSpeed}`);
        return { leftMotorSpeed, rightMotorSpeed };
      });

  const setMotorsSpeed = ({ leftMotorSpeed, rightMotorSpeed }) => {
    logger.debug(`Setting motor speed ${leftMotorSpeed}, ${rightMotorSpeed}`);
    return Promise.all([leftMotor.setPower(leftMotorSpeed), rightMotor.setPower(rightMotorSpeed)])
      .then(() => ({ leftMotorSpeed, rightMotorSpeed }));
  };

  // TODO should ensure this completes before accepting requests
  Promise.all([rightMotor.resetEncoder(), leftMotor.resetEncoder()])
    .then(() => Promise.all([leftMotor.setPower(0), rightMotor.setPower(0)]))
    .then(() => {
      logger.info('Robot initilised successfully');
    })
    .catch((err) => {
      logger.error(err, 'Unable to initialise robot');
    });

  return Object.freeze({
    getMotorsSpeed,
    setMotorsSpeed,
  });
};
