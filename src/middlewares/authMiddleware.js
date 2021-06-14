const axios = require('axios');

async function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ error: 'Token obrigatório.' });

  await axios.get(`${process.env.BASE_URL}/v1/user?token=${token}`)
  .then(() => {
    req.token = token;
    next();
  })
  .catch(error => {
    console.log(error.response);
    return res.status(401).send({ error: 'Não autorizado.' });
  })
}

module.exports = verifyToken;
