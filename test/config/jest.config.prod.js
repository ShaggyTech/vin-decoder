const mainConfig = require('./jest.config.js');

module.exports = {
  ...mainConfig,
  collectCoverage: false
};
