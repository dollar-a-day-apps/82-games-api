const Joi = require('joi');
const { get } = require('lodash');
const throwError = require('../util/throw-error');

const parseError = (error, hints) => {
  const fieldName = get(error, ['details', 0, 'path', 0], null);

  if (fieldName) {
    // Use error hints if available, else return a generic field error message
    return hints[fieldName] || `Invalid input for "${fieldName}" field`;
  }

  return 'Bad Request';
};

// Wrapper for JOI's validate method
module.exports = (input, schema) => {
  const {
    rules, // Actual validation rules to be used by JOI
    hints, // Field name hints for custom error message
  } = schema;

  const { error } = Joi.validate(input, rules);

  if (error) {
    // Return the first JOI error as the error message
    return throwError(new Error(parseError(error, hints)), {
      fn: 'validateInput',
      source: 'src/joi/validate-input.js',
      payload: JSON.stringify({
        errorDetail: error.details[0].message,
      }),
    });
  }

  return true;
};
