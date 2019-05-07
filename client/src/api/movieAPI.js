import client from './client';

async function getPopularMovies(options = {}) {
    const movies = await client.get('/movie/popular', options);
    return movies;
}

async function getUpcomingMovies(options = {}) {
    const movies = await client.get('/movie/upcoming', options);
    return movies;
}

async function getTopRatedMovies(options = {}) {
    const movies = await client.get('/movie/top-rated', options);
    return movies;
}

async function getInTheatersMovies(options = {}) {
    const movies = await client.get('/movie/in-theaters', options);
    return movies;
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
    const movie = await client.get(`/movie/${movieId}`, options);
    return movie;
}

async function discoverMovies(options = {}) {
    const movies = await client.get('/discover/movie', options);
    return movies;
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
