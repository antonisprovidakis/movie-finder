import client from './client';
import { MovieCategory } from './config/movieCategories';

async function getPopularMovies(options = {}) {
    return await client.get('/movie/popular', options);
}

async function getUpcomingMovies(options = {}) {
    return await client.get('/movie/upcoming', options);
}

async function getTopRatedMovies(options = {}) {
    return await client.get('/movie/top-rated', options);
}

async function getInTheatersMovies(options = {}) {
    return await client.get('/movie/in-theaters', options);
}

// wrapper function for getPopularMovies, getUpcomingMovies
// getTopRatedMovies, getInTheatersMovies functions
async function getMoviesByCategory(category, options = {}) {
    switch (category) {
        case MovieCategory.POPULAR:
            return await getPopularMovies(options);
        case MovieCategory.UPCOMING:
            return await getUpcomingMovies(options);
        case MovieCategory.TOP_RATED:
            return await getTopRatedMovies(options);
        case MovieCategory.IN_THEATERS:
            return await getInTheatersMovies(options);
        default:
            throw new Error(`${category} category does not exist. Use one of popular, upcoming, top-rated, in-theaters`);
    }
}

async function getMovieInfo(movieId, options = {}) {
    return await client.get(`/movie/${movieId}`, options);
}

async function discoverMovies(options = {}) {
    return await client.get('/discover/movie', options);
}

export default {
    getPopularMovies,
    getUpcomingMovies,
    getTopRatedMovies,
    getInTheatersMovies,
    getMoviesByCategory,
    getMovieInfo,
    discoverMovies,
};
