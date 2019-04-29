const { Router } = require("express");
const catchError = require("../utils/catchError");
const { callAPI } = require('../client');
const router = Router();

router.get(
    "/api/person/popular",
    catchError(async (req, res) => {
        // logger.info(
        //     `GET /api/v1/inbox-emails offset=${offset} limit=${limit} userId=${req.session.userId}`
        // );
        const options = req.query;
        const people = await callAPI('/person/popular', options);
        res.json(people);
    })
);

router.get(
    "/api/person/:id",
    catchError(async (req, res) => {
        const { id } = req.params;
        const options = req.query;
        const person = await callAPI(`/person/${id}`, options);
        res.json(person);
    })
);

module.exports = router;
