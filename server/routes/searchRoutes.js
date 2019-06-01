const { Router } = require("express");
const client = require('../client');
const catchError = require("../utils/catchError");

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
