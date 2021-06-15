const router = require('express').Router();
const axios = require('axios');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/', verifyToken, async (req, res) => {
  
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

router.get('/list', verifyToken, async (req, res) => {
  
});

router.get('/expenses', verifyToken, async (req, res) => {
  
});

module.exports = router;
