const { Router } = require("express");
const catchError = require("../utils/catchError");
const { callAPI } = require('../client');
const router = Router();

router.get(
    "/api/movie/popular",
    catchError(async (req, res) => {
        // logger.info(
        //     `GET /api/v1/inbox-emails offset=${offset} limit=${limit} userId=${req.session.userId}`
        // );
        const options = req.query;
        const popularMovies = await callAPI('/movie/popular', options);
        res.json(popularMovies);
    })
);

router.get(
    "/api/movie/upcoming",
    catchError(async (req, res) => {
        const options = req.query;
        const upcomingMovies = await callAPI('/movie/upcoming', options);
        res.json(upcomingMovies);
    })
);

router.get(
    "/api/movie/in-theaters",
    catchError(async (req, res) => {
        const options = req.query;
        const inTheatersMovies = await callAPI('/movie/now_playing', options);
        res.json(inTheatersMovies);
    })
);

router.get(
    "/api/movie/top-rated",
    catchError(async (req, res) => {
        const options = req.query;
        const topRatedMovies = await callAPI('/movie/top_rated', options);
        res.json(topRatedMovies);
    })
);

router.get(
    "/api/movie/:id",
    catchError(async (req, res) => {
        const { id } = req.params;
        const options = req.query;
        const movie = await callAPI(`/movie/${id}`, options);
        res.json(movie);
    })
);

router.get(
    "/api/discover/movie",
    catchError(async (req, res) => {
        const options = req.query;
        const movies = await callAPI('/discover/movie', options);
        res.json(movies);
    })
);

module.exports = router;
