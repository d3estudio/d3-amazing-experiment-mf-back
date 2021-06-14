require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const refundsRouter = require('./routers/refundsRouter');
const loginRouter = require('./routers/loginRouter');

app.use(cors());
app.use(express.json());

app.use('/v1/refunds', refundsRouter);
app.use('/v1/login', loginRouter);

module.exports = app;