const { Router } = require("express");
const catchError = require("../utils/catchError");
const tmdb = require('../api-client/tmdb');
const router = Router();

router.get(
    "/api/configuration",
    catchError(async (req, res) => {
        const config = await tmdb.configuration();
        res.json(config);
    })
);

module.exports = router;
