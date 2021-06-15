const router = require('express').Router();
const axios = require('axios');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/', verifyToken, async (req, res) => {
  
});

router.get('/', verifyToken, async (req, res) => {
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

router.get('/expenses', verifyToken, async (req, res) => {
  
});

module.exports = router;
