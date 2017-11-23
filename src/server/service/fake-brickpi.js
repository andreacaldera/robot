import winston from 'winston';

export default () => {
  const brickpi = {
    leftMotorSpeed: 0,
    rightMotorSpeed: 0,
  };

  const getMotorsSpeed = () => {
    winston.debug(`Current speed is ${brickpi.leftMotorSpeed}, ${brickpi.rightMotorSpeed}`);
    return brickpi;
  };

  const setMotorsSpeed = ({ leftMotorSpeed, rightMotorSpeed }) => {
    winston.debug(`Setting motor speed ${leftMotorSpeed}, ${rightMotorSpeed}`);
    brickpi.leftMotorSpeed = leftMotorSpeed;
    brickpi.rightMotorSpeed = rightMotorSpeed;
    return brickpi;
  };

  return Object.freeze({
    getMotorsSpeed,
    setMotorsSpeed,
  });
};
