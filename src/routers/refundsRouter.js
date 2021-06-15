const router = require('express').Router();
const axios = require('axios');
const md5 = require('md5');

const verifyToken = require('../middlewares/authMiddleware');
const refundMiddleware = require('../middlewares/refundMiddleware');

router.post('/', verifyToken, refundMiddleware, (req, res) => {
  const token = req.token;
  req.body.tag = md5(`${req.body.value}`);

  axios.post(`${process.env.BASE_URL}/v1/refunds?token=${token}`, req.body)
  .then(() => {
    return res.sendStatus(202);
  })
  .catch(error => {
    return res.status(error.response.status).json(error.response.data);
  });
});

router.get('/', verifyToken, (req, res) => {
  const token = req.token;
  const year = req.query.year;
  const month = req.query.month;

  if (!year || !month) return res.status(400).json({ error: 'Período não especificado corretamente.'});

  axios.get(`${process.env.BASE_URL}/v1/refunds/${year}/${month}/?token=${token}`)
  .then(response => {
    return res.send(response.data);
  })
  .catch(error => {
    console.log(error);
    return res.sendStatus(500);
  });
});

router.get('/date', verifyToken, (req, res) => {
  const token = req.token;
  axios.get(`${process.env.BASE_URL}/v1/refunds?token=${token}`)
  .then(response => {
    return res.send(response.data);
  })
  .catch(error => {
    console.log(error);
    return res.sendStatus(500);
  });
});

module.exports = router;
