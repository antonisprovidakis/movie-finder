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

        const popularMovies = await tmdb.miscPopularMovies();
        res.json(popularMovies);
    })
);

router.get(
    "/api/movie/upcoming",
    catchError(async (req, res) => {
        const upcomingMovies = await tmdb.miscUpcomingMovies();
        res.json(upcomingMovies);
    })
);

router.get(
    "/api/movie/in-theaters",
    catchError(async (req, res) => {
        const inTheatersMovies = await tmdb.miscNowPlayingMovies();
        res.json(inTheatersMovies);
    })
);

router.get(
    "/api/movie/top-rated",
    catchError(async (req, res) => {
        const topRatedMovies = await tmdb.miscTopRatedMovies();
        res.json(topRatedMovies);
    })
);

router.get(
    "/api/movie/:id",
    catchError(async (req, res) => {
        const params = { id } = req.params;
        const movie = await tmdb.movieInfo(params, { append_to_response: 'credits' });
        res.json(movie);
    })
);

router.get(
    "/api/discover/movie",
    catchError(async (req, res) => {
        const params = {
            primary_release_year,
            sort_by,
            with_genres
        } = req.query;

        const movies = await tmdb.discoverMovie(params);
        res.json(movies);
    })
);

router.get(
    "/api/search/multi",
    catchError(async (req, res) => {
        const params = {
            query
        } = req.query;

        const results = await tmdb.searchMulti(params);
        res.json(results);
    })
);

module.exports = router;
