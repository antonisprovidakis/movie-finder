const { Router } = require("express");
const catchError = require("../utils/catchError");
const MovieDb = require('moviedb-promise');
const tmdb = new MovieDb(process.env.TMDB_API_KEY);
const router = Router();

router.get(
    "/api/search/multi",
    catchError(async (req, res) => {
        const params = {
            query
        } = req.query;

        const results = await tmdb.searchMulti(params);
        res.json(results);
    })
);

module.exports = router;
