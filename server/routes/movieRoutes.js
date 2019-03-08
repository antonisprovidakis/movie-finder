const { Router } = require("express");
const catchError = require("../utils/catchError");
const MovieDb = require('moviedb-promise');
const tmdb = new MovieDb(process.env.TMDB_API_KEY);
const router = Router();

router.get(
    "/api/movie/popular",
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

        const popularMovies = await tmdb.miscPopularMovies(params);
        res.json(popularMovies);
    })
);

router.get(
    "/api/movie/upcoming",
    catchError(async (req, res) => {
        const {
            page
        } = req.query;

        const params = {
            page
        };

        const upcomingMovies = await tmdb.miscUpcomingMovies(params);
        res.json(upcomingMovies);
    })
);

router.get(
    "/api/movie/in-theaters",
    catchError(async (req, res) => {
        const {
            page
        } = req.query;

        const params = {
            page
        };

        const inTheatersMovies = await tmdb.miscNowPlayingMovies(params);
        res.json(inTheatersMovies);
    })
);

router.get(
    "/api/movie/top-rated",
    catchError(async (req, res) => {
        const {
            page
        } = req.query;

        const params = {
            page
        };

        const topRatedMovies = await tmdb.miscTopRatedMovies(params);
        res.json(topRatedMovies);
    })
);

router.get(
    "/api/movie/:id",
    catchError(async (req, res) => {
        const {
            id
        } = req.params;

        const params = {
            id
        };

        const {
            append_to_response
        } = req.query;

        const movie = await tmdb.movieInfo(params, { append_to_response });
        res.json(movie);
    })
);

router.get(
    "/api/discover/movie",
    catchError(async (req, res) => {
        const {
            page,
            primary_release_year,
            sort_by,
            with_genres
        } = req.query;

        const params = {
            page,
            primary_release_year,
            sort_by,
            with_genres
        };

        const movies = await tmdb.discoverMovie(params);
        res.json(movies);
    })
);

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
