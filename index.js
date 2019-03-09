//export { hay, HayTypes } './src/hay';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/hay.min.js');
} else {
  module.exports = require('./dist/hay.js');
}