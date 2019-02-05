const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'bundle.js': [
      path.resolve(__dirname, 'src/hay.js'),
    ]
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist'),
  }
};