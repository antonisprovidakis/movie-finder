import client from './client';

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
        case 'popular':
            return await getPopularMovies(options);
        case 'upcoming':
            return await getUpcomingMovies(options);
        case 'top-rated':
            return await getTopRatedMovies(options);
        case 'in-theaters':
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
