const { Router } = require("express");
const catchError = require("../utils/catchError");
const MovieDb = require('moviedb-promise');
const tmdb = new MovieDb(process.env.TMDB_API_KEY);
const router = Router();

router.get(
    "/api/person/popular",
    catchError(async (req, res) => {
        // logger.info(
        //     `GET /api/v1/inbox-emails offset=${offset} limit=${limit} userId=${req.session.userId}`
        // );

        const {
            page
        } = req.query;

        const params = {
            page
        };

        const people = await tmdb.personPopular(params);
        res.json(people);
    })
);

router.get(
    "/api/person/:id",
    catchError(async (req, res) => {
        const {
            id
        } = req.params;

        const params = {
            id
        };

        const person = await tmdb.personInfo(params);
        res.json(person);
    })
);

module.exports = router;
