import axios from 'axios';

async function getPopularMovies(params = {}) {
    const movies = await axios.get('/api/movie/popular', { params });
    return movies.data;
}

async function getUpcomingMovies(params = {}) {
    const movies = await axios.get('/api/movie/upcoming', { params });
    return movies.data;
}

async function getTopRatedMovies(params = {}) {
    const movies = await axios.get('/api/movie/top-rated', { params });
    return movies.data;
}

async function getInTheatersMovies(params = {}) {
    const movies = await axios.get('/api/movie/in-theaters', { params });
    return movies.data;
}

// wrapper function for getPopularMovies, getUpcomingMovies
// getTopRatedMovies, getInTheatersMovies functions
async function getMoviesByCategory(category, params = {}) {
    switch (category) {
        case 'popular':
            return await getPopularMovies(params);
        case 'upcoming':
            return await getUpcomingMovies(params);
        case 'top-rated':
            return await getTopRatedMovies(params);
        case 'in-theaters':
            return await getInTheatersMovies(params);
        default:
            throw new Error(`${category} category does not exist. Use one of popular, upcoming, top-rated, in-theaters`);
    }
}

async function getMovieInfo(movieId, params = {}) {
    const movie = await axios.get(`/api/movie/${movieId}`, { params });
    return movie.data;
}

async function discoverMovies(params = {}) {
    const movies = await axios.get(
        '/api/discover/movie',
        { params }
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
