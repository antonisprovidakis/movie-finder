const { Router } = require('express');
const client = require('../http-client');
const catchError = require('../utils/catchError');

const router = Router();

router.get(
  '/api/configuration',
  catchError(async (req, res) => {
    const config = await client.get('/configuration');
    res.json(config);
  })
);

module.exports = router;
