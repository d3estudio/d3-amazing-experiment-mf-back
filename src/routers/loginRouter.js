const express = require('express');
const axios = require('axios');
const sha1 = require('js-sha1');
const loginMiddleware = require('../middlewares/loginMiddleware');

const router = express.Router();

router.post('/', loginMiddleware, async (req, res) => {
  const secret = process.env.SECRET;
  const app_id = process.env.KEY;
  const authToken = `${Buffer.from(app_id, 'binary').toString('base64')}:${secret}`;
  const { email, password } = req.body;

  function toSha1(data) {
    const toHash = `app_id=${app_id}&${data}${app_id}${secret}`;
    return sha1(encodeURIComponent(toHash));
  }

  const sendData = {
    app_id,
    email,
    password,
    signature: toSha1(`email=${email}&password=${password}`)
  }

  await axios.post(`${process.env.BASE_URL}/oauth/token`, sendData, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    console.log(response.data);
    return res.sendStatus(200);
  })
  .catch(error => {
    console.log(error.response.data);
    return res.status(500).json(error);
  });
});

module.exports = router;
