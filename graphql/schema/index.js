const { mergeTypeDefs } = require('@graphql-tools/merge');

const Scaler = require('./scaler');
const Comman = require('./comman');
const Sample = require('./sample');
// const Assaignment=require('./assaignment');
const Currencies=require('./currencies')

const types = [
  Scaler,
  Comman,
  Sample,
  // Assaignment,
  Currencies
];

module.exports = mergeTypeDefs(types);
