import axios from 'axios';

async function getPopularMovies() {
    const movies = await axios.get('/api/movie/popular');
    return movies;
}

async function getUpcomingMovies() {
    const movies = await axios.get('/api/movie/upcoming');
    return movies;
}

async function getTopRatedMovies() {
    const movies = await axios.get('/api/movie/top-rated');
    return movies;
}

async function getInTheatersMovies() {
    const movies = await axios.get('/api/movie/in-theaters');
    return movies;
}

// wrapper function for getPopularMovies, getUpcomingMovies
// getTopRatedMovies, getInTheatersMovies functions
async function getMoviesByCategory(category) {
    switch (category) {
        case 'popular':
            return await getPopularMovies();
        case 'upcoming':
            return await getUpcomingMovies();
        case 'top-rated':
            return await getTopRatedMovies();
        case 'in-theaters':
            return await getInTheatersMovies();
        default:
            throw new Error(`${category} category does not exist. Use one of popular, upcoming, top-rated, in-theaters`);
    }
}

async function getMovieInfo(movieId) {
    const movie = await axios.get(`/api/movie/${movieId}`);
    return movie;
}

async function discoverMovies(year, sortBy, genres) {
    const movies = await axios.get('/api/discover/movie', {
        params: {
            primary_release_year: year,
            sort_by: sortBy,
            with_genres: genres,
        }
    });
    return movies;
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
