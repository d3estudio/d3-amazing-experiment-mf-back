const refundSchema = require("../schemas/refundSchema");

function refundMiddleware(req, res, next) {
  const refundValidation = refundSchema.validate(req.body).error;

  if (refundValidation) {
    return res.status(422).send({ error: 'Verifique os dados enviados.' });
  }

  return next();
}

module.exports = refundMiddleware;