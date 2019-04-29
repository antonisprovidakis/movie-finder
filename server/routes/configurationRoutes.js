const { Router } = require("express");
const catchError = require("../utils/catchError");
const { callAPI } = require('../client');
const router = Router();

router.get(
    "/api/configuration",
    catchError(async (req, res) => {
        const config = await callAPI('/configuration');
        res.json(config);
    })
);

module.exports = router;
