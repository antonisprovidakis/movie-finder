const { Router } = require("express");
const catchError = require("../utils/catchError");
const MovieDb = require('moviedb-promise');
const tmdb = new MovieDb(process.env.TMDB_API_KEY);
const router = Router();

router.get(
    "/api/configuration",
    catchError(async (req, res) => {
        const config = await tmdb.configuration();
        res.json(config);
    })
);

module.exports = router;
