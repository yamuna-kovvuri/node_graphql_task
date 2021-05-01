const { Sample } = require('../../services');
const { getSample: GetSampleShema } = require('../../dto-schemas');
const Validator = require('../../utils/validator');

// eslint-disable-next-line no-unused-vars
const Book = async (_, args, ctx) => {
  try {
    // const { user, headers } = ctx;
    const data = { userId: '' };

    const { errors } = Validator.isSchemaValid({ data, schema: GetSampleShema });

    if (errors) {
      return { errors };
    }

    const { errors: err, doc } = await Sample.getSample(data);
    console.log(doc);

    if (doc) {
      return {
        data: doc,
      };
    }

    return err;
  } catch (error) {
    return error;
  }
};

module.exports = {
  Query: {
    Book,
  },
};
