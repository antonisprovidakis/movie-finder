const { Router } = require("express");
const catchError = require("../utils/catchError");
const tmdb = require('../api-client/tmdb');
const router = Router();

router.get(
    "/api/person/popular",
    catchError(async (req, res) => {
        // logger.info(
        //     `GET /api/v1/inbox-emails offset=${offset} limit=${limit} userId=${req.session.userId}`
        // );
        const options = req.query;
        const people = await tmdb.personPopular(options);
        res.json(people);
    })
);

router.get(
    "/api/person/:id",
    catchError(async (req, res) => {
        const params = req.params;
        const options = req.query;
        const person = await tmdb.personInfo(params, options);
        res.json(person);
    })
);

module.exports = router;
