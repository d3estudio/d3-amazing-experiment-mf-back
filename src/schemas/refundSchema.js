const joi = require('joi');

const refundSchema = joi.object({
  value: joi.number().required(),
  comment: joi.string().min(3).max(255),
});

module.exports = refundSchema;
