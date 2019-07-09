import client from './client';
import { MovieCategory } from './config';

async function getPopularMovies(options = {}) {
  return await client.get('/movie/popular', options);
}

async function getUpcomingMovies(options = {}) {
  return await client.get('/movie/upcoming', options);
}

async function getTopRatedMovies(options = {}) {
  return await client.get('/movie/top-rated', options);
}

async function getNowPlayingMovies(options = {}) {
  return await client.get('/movie/now-playing', options);
}

// wrapper function for getPopularMovies, getUpcomingMovies
// getTopRatedMovies, getNowPlayingMovies functions
async function getMoviesByCategory(category, options = {}) {
  switch (category) {
    case MovieCategory.POPULAR:
      return await getPopularMovies(options);
    case MovieCategory.UPCOMING:
      return await getUpcomingMovies(options);
    case MovieCategory.TOP_RATED:
      return await getTopRatedMovies(options);
    case MovieCategory.NOW_PLAYING:
      return await getNowPlayingMovies(options);
    default:
      return Promise.reject(
        new Error(
          `${category} category does not exist. Use one of popular, upcoming, top-rated, in-theaters`
        )
      );
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
  getNowPlayingMovies,
  getMoviesByCategory,
  getMovieInfo,
  discoverMovies
};
