import axios from 'axios';

async function getPopularMovies(options = {}) {
    const movies = await axios.get('/api/movie/popular', { params: options });
    return movies.data;
}

async function getUpcomingMovies(options = {}) {
    const movies = await axios.get('/api/movie/upcoming', { params: options });
    return movies.data;
}

async function getTopRatedMovies(options = {}) {
    const movies = await axios.get('/api/movie/top-rated', { params: options });
    return movies.data;
}

async function getInTheatersMovies(options = {}) {
    const movies = await axios.get('/api/movie/in-theaters', { params: options });
    return movies.data;
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
    const movie = await axios.get(`/api/movie/${movieId}`, { params: options });
    return movie.data;
}

async function discoverMovies(options = {}) {
    const movies = await axios.get(
        '/api/discover/movie',
        { params: options }
    );
    return movies.data;
}

export {
    getPopularMovies,
    getUpcomingMovies,
    getTopRatedMovies,
    getInTheatersMovies,
    getMoviesByCategory,
    getMovieInfo,
    discoverMovies,
};
