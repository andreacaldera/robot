/* eslint-disable no-console */

import fs from 'fs';

if (!process.env.ROBOT_CONFIG) {
  console.log('Config not specified, defaulting to local');
}

const robotConfig = process.env.ROBOT_CONFIG || 'local';

console.log(`Using config ${robotConfig}`);

const config = JSON.parse(fs.readFileSync(`./config/${robotConfig}.json`, 'utf8'));

export default Object.assign({}, config, {
  robotConfig,
  port: process.env.PORT || config.port,
  logLevel: config.logLevel || 'debug',
});
