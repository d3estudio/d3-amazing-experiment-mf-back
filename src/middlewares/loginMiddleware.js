const loginSchema = require("../schemas/loginSchema");

function loginMiddleware(req, res, next) {
  const loginValidation = loginSchema.validate(req.body).error;

  if (loginValidation) {
    return res.status(422).send({ error: 'Verifique os dados enviados.' });
  }

  return next();
}

module.exports = loginMiddleware;