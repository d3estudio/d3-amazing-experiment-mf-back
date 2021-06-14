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
  const params = new URLSearchParams();


  params.append('app_id', `${app_id}`);
  params.append('email', `${email}`);
  params.append('password', `${password}`);
  params.append('signature', `${toSha1(`email=${email}&password=${password}`)}`);

  function toSha1(data) {
    const toHash = `app_id=${app_id}&${data}${app_id}${secret}`;
    return sha1(toHash);
  }

  await axios.post(`${process.env.BASE_URL}/oauth/token`, params, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
  .then(response => {
    return res.status(200).send(response.data);
  })
  .catch(error => {
    console.log(error.response.data);
    return res.status(500).json(error);
  });
});

module.exports = router;
