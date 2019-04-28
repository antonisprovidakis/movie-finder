const { Router } = require("express");
const catchError = require("../utils/catchError");
const tmdb = require('../api-client/tmdb');
const router = Router();

router.get(
    "/api/search/multi",
    catchError(async (req, res) => {
        const options = req.query;
        const results = await tmdb.searchMulti(options);
        res.json(results);
    })
);

module.exports = router;
