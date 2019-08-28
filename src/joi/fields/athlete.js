const Joi = require('joi');

module.exports = {
  id: Joi.number().positive(),
  teamId: Joi.number().positive(),
};
