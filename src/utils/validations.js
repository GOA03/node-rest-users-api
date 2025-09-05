const Joi = require('joi');

// Validar dados de criação de usuário
const validateUser = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

module.exports = { validateUser };