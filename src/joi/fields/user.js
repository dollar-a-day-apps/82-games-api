const Joi = require('joi');

module.exports = {
  id: Joi.number().positive(),
  fullName: Joi.string(),
  userType: Joi.string(),
  profilePictureUrl: Joi.string().uri(),
  profileTagLine: Joi.string(),
};
