const { Router } = require("express");
const catchError = require("../utils/catchError");
const tmdb = require('../api-client/tmdb');
const router = Router();

router.get(
    "/api/movie/popular",
    catchError(async (req, res) => {
        // logger.info(
        //     `GET /api/v1/inbox-emails offset=${offset} limit=${limit} userId=${req.session.userId}`
        // );
        const options = req.query;
        const popularMovies = await tmdb.miscPopularMovies(options);
        res.json(popularMovies);
    })
);

router.get(
    "/api/movie/upcoming",
    catchError(async (req, res) => {
        const options = req.query;
        const upcomingMovies = await tmdb.miscUpcomingMovies(options);
        res.json(upcomingMovies);
    })
);

router.get(
    "/api/movie/in-theaters",
    catchError(async (req, res) => {
        const options = req.query;
        const inTheatersMovies = await tmdb.miscNowPlayingMovies(options);
        res.json(inTheatersMovies);
    })
);

router.get(
    "/api/movie/top-rated",
    catchError(async (req, res) => {
        const options = req.query;
        const topRatedMovies = await tmdb.miscTopRatedMovies(options);
        res.json(topRatedMovies);
    })
);

router.get(
    "/api/movie/:id",
    catchError(async (req, res) => {
        const params = req.params;
        const options = req.query;
        const movie = await tmdb.movieInfo(params, options);
        res.json(movie);
    })
);

router.get(
    "/api/discover/movie",
    catchError(async (req, res) => {
        const options = req.query;
        const movies = await tmdb.discoverMovie(options);
        res.json(movies);
    })
);

router.get(
    "/api/search/multi",
    catchError(async (req, res) => {
        const options = req.query;
        const results = await tmdb.searchMulti(options);
        res.json(results);
    })
);

module.exports = router;
