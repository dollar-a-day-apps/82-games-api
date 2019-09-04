const Joi = require('joi');

module.exports = {
  id: Joi.number().positive(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
};
