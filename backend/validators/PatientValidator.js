const Joi = require('joi');

class PatientValidator {
  static validateCreateProfile(req, res, next) {
    const schema = Joi.object({
      name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
          'string.min': 'Name must be at least 2 characters long',
          'string.max': 'Name must not exceed 100 characters'
        }),
      date_of_birth: Joi.date()
        .max('now')
        .required()
        .messages({
          'date.max': 'Date of birth cannot be in the future'
        }),
      contact_number: Joi.string()
        .pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
        .required()
        .messages({
          'string.pattern.base': 'Invalid phone number format'
        }),
      address: Joi.string()
        .allow(null, '')
        .max(500)
        .messages({
          'string.max': 'Address must not exceed 500 characters'
        }),
      medical_history: Joi.string()
        .allow(null, '')
        .max(1000)
        .messages({
          'string.max': 'Medical history must not exceed 1000 characters'
        }),
      blood_type: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .allow(null),
      gender: Joi.string()
        .valid('Male', 'Female', 'Other')
        .required()
        .messages({
          'any.only': 'Invalid gender selection'
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

  static validateUpdateProfile(req, res, next) {
    const schema = Joi.object({
      name: Joi.string()
        .min(2)
        .max(100)
        .optional()
        .messages({
          'string.min': 'Name must be at least 2 characters long',
          'string.max': 'Name must not exceed 100 characters'
        }),
      contact_number: Joi.string()
        .pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
        .optional()
        .messages({
          'string.pattern.base': 'Invalid phone number format'
        }),
      address: Joi.string()
        .allow(null, '')
        .max(500)
        .optional()
        .messages({
          'string.max': 'Address must not exceed 500 characters'
        }),
      medical_history: Joi.string()
        .allow(null, '')
        .max(1000)
        .optional()
        .messages({
          'string.max': 'Medical history must not exceed 1000 characters'
        }),
      blood_type: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .allow(null)
        .optional()
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

module.exports = PatientValidator;