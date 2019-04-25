const { Router } = require("express");
const catchError = require("../utils/catchError");
const tmdb = require('../api-client/tmdb');
const router = Router();

router.get(
    "/api/search/multi",
    catchError(async (req, res) => {
        const {
            query,
            page
        } = req.query;
        
        const params = {
            query,
            page
        };

        const results = await tmdb.searchMulti(params);
        res.json(results);
    })
);

module.exports = router;
