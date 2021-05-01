const { Currencies } = require('../../services');
const Validator = require('../../utils/validator');

// eslint-disable-next-line no-unused-vars
const createRequest = async (_, args, ctx) => {
    try {
      const { user, headers } = ctx;
      const {id} = args;
      const response = await Currencies.createRequest(id);
      if (response) {
        return  response
      }
    } catch (error) {
      console.log(error)
      return error;
    }
  };

//get Query by passing ID
const getPriceDataById = async (_, args, ctx) => {
try {
    console.log(args.uuid)
    const result = await Currencies.getPriceDataById(args.uuid);
    if (result) {
    return result
    }

} catch (error) {
    return error;
}
};


  
module.exports = {
    Query: {
        getPriceDataById
    },
    Mutation:{
        createRequest,
    }
};
