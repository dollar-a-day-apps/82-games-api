const Joi = require('joi');

module.exports = {
  id: Joi.number().positive(),
  gameId: Joi.number().positive(),
  teamId: Joi.number().positive(),
  dateTime: Joi.string().length(14), // Date format: YYYYMMDDHHmmss
  page: Joi.number().positive(),
  size: Joi.number().positive().max(100), // Max 100 records for a single request
};
