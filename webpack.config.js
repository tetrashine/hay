const path = require('path');

module.exports = env => {
  const destName = env == 'production' ? 'hay.min.js' : 'hay.js';

  return {
    mode: env,
    entry: {
      [destName]: [
        path.resolve(__dirname, 'src/hay.js'),
      ]
    },
    output: {
      filename: '[name]',
      path: path.resolve(__dirname, 'dist'),
    }
  }
};