const Joi = require('joi');

const doctorValidationSchema = Joi.object({
  doctorType: Joi.string().valid('OP', 'IP', 'Both').required(),
  specialistType: Joi.string().valid('Physician', 'Surgeon', 'Both').required(),
  availability: Joi.string().valid('Residence', 'Visiting', 'Hide').required(),
  consultantName: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  dob: Joi.date().iso().allow(null),
  languages: Joi.array().items(Joi.string()).allow(null),
  hospital_id: Joi.number().integer().min(1).allow(null),
  
  // Professional Details
  designation: Joi.string().allow(null, ''),
  department: Joi.string().allow(null, ''),
  specialization: Joi.array().items(Joi.string()).allow(null),
  qualification: Joi.string().allow(null, ''),
  experience: Joi.number().integer().min(0).allow(null),
  registrationNumber: Joi.string().allow(null, ''),
  medicalLicenseUrl: Joi.string().allow(null, ''),
  medicalLicense: Joi.any(), // Allow file upload
  documents: Joi.any(), // Allow file upload
  
  // Other fields...
  user_id: Joi.number().integer().allow(null), // Make user_id optional in validation
}).unknown(true); // Allow unknown fields

module.exports = doctorValidationSchema; 