const Joi = require('@hapi/joi');

module.exports = {
  registerValidation: (data) => {
    const schema = Joi.object({
      username: Joi.string().min(4).max(30).required(),
      password: Joi.string().min(6).required(),
      name: Joi.string().min(3).max(50).required(),
    });

    return schema.validate(data);
  },

  loginValidation: (data) => {
    const schema = Joi.object({
      username: Joi.string().min(4).max(30).required(),
      password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
  },
};
