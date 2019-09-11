const Joi = require('joi');

module.exports = {
  id: Joi.number().positive(),
  gameId: Joi.number().positive(),
  teamId: Joi.number().positive(),
};
