const Sample = require('./sample');
const Currencies=require('./currencies');

module.exports = {
  Query: {
    ...Sample.Query,
    ...Currencies.Query
  },
  Mutation:{
    ...Currencies.Mutation
  }
};
