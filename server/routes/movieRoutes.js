const { Router } = require("express");
const catchError = require("../utils/catchError");
const client = require('../client');
const router = Router();

router.get(
    "/api/movie/popular",
    catchError(async (req, res) => {
        // logger.info(
        //     `GET /api/v1/inbox-emails offset=${offset} limit=${limit} userId=${req.session.userId}`
        // );
        const options = req.query;
        const popularMovies = await client.get('/movie/popular', options);
        console.log('popularMovies');

        res.json(popularMovies);
    })
);

router.get(
    "/api/movie/upcoming",
    catchError(async (req, res) => {
        const options = req.query;
        const upcomingMovies = await client.get('/movie/upcoming', options);
        res.json(upcomingMovies);
    })
);

router.get(
    "/api/movie/in-theaters",
    catchError(async (req, res) => {
        const options = req.query;
        const inTheatersMovies = await client.get('/movie/now_playing', options);
        res.json(inTheatersMovies);
    })
);

router.get(
    "/api/movie/top-rated",
    catchError(async (req, res) => {
        const options = req.query;
        const topRatedMovies = await client.get('/movie/top_rated', options);
        console.log('top-rated');

        res.json(topRatedMovies);
    })
);

router.get(
    "/api/movie/:id",
    catchError(async (req, res) => {
        const { id } = req.params;
        const options = req.query;
        const movie = await client.get(`/movie/${id}`, options);
        res.json(movie);
    })
);

router.get(
    "/api/discover/movie",
    catchError(async (req, res) => {
        const options = req.query;
        const movies = await client.get('/discover/movie', options);
        res.json(movies);
    })
);

module.exports = router;
