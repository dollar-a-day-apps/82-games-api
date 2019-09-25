const Joi = require('joi');

module.exports = {
  id: Joi.string().regex(/^[-+]?(?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?$/), // Allow comma separated numbers only
  athleteId: Joi.number().positive(),
};
