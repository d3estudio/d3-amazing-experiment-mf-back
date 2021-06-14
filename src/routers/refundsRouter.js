const router = require('express').Router();
const axios = require('axios');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/', verifyToken, async (req, res) => {
  
});

router.get('/date', verifyToken, async (req, res) => {
  const token = req.token;
  console.log(token);
});

router.get('/list', verifyToken, async (req, res) => {
  
});

router.get('/expenses', verifyToken, async (req, res) => {
  
});

module.exports = router;
