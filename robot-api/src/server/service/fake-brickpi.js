import logger from '../logger';

export default () => {
  const brickpi = {
    leftMotorSpeed: 0,
    rightMotorSpeed: 0,
  };

  const getMotorsSpeed = () => {
    logger.debug(
      `Current speed is ${brickpi.leftMotorSpeed}, ${brickpi.rightMotorSpeed}`,
    );
    return Promise.resolve(brickpi);
  };

  const setMotorsSpeed = ({ leftMotorSpeed, rightMotorSpeed }) => {
    logger.debug(`Setting motor speed ${leftMotorSpeed}, ${rightMotorSpeed}`);
    brickpi.leftMotorSpeed = leftMotorSpeed || 0;
    brickpi.rightMotorSpeed = rightMotorSpeed || 0;
    return Promise.resolve(brickpi);
  };

  return Object.freeze({
    getMotorsSpeed,
    setMotorsSpeed,
  });
};
