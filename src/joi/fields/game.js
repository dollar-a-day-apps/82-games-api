const Joi = require('joi');

module.exports = {
  teamId: Joi.number().positive(),
};
