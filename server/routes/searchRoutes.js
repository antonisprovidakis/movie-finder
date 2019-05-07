const { Router } = require("express");
const catchError = require("../utils/catchError");
const client = require('../client');
const router = Router();

router.get(
    "/api/search/multi",
    catchError(async (req, res) => {
        const options = req.query;
        const results = await client.get('/search/multi', options);
        res.json(results);
    })
);

module.exports = router;
