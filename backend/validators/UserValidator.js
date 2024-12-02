const Joi = require('joi');

class UserValidator {
  static validateRegistration(req, res, next) {
    const schema = Joi.object({
      username: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
          'string.min': 'Username must be at least 3 characters long',
          'string.max': 'Username must not exceed 50 characters'
        }),
      email: Joi.string()
        .email()
        .required()
        .messages({
          'string.email': 'Invalid email format'
        }),
      password: Joi.string()
        .min(6)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'))
        .required()
        .messages({
          'string.min': 'Password must be at least 6 characters long',
          'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character'
        }),
      role: Joi.string()
        .valid('admin', 'doctor', 'nurse', 'receptionist', 'patient')
        .required()
        .messages({
          'any.only': 'Invalid user role'
        })
    });

    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        message: 'Validation Error', 
        error: error.details[0].message 
      });
    }

    next();
  }

  static validateLogin(req, res, next) {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        message: 'Validation Error', 
        error: error.details[0].message 
      });
    }

    next();
  }
}

module.exports = UserValidator;