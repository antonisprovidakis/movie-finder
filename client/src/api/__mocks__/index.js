import { movieAPIData, searchAPIData, personAPIData } from './data';

const movieAPI = {
  getMoviesByCategory: jest
    .fn()
    .mockResolvedValue(movieAPIData.popularMoviesResponse),
  discoverMovies: jest
    .fn()
    .mockResolvedValue(movieAPIData.discoverMoviesResponse),
  getMovieInfo: jest.fn().mockResolvedValue(movieAPIData.movieInfo)
};

const personAPI = {
  getPopularPersons: jest
    .fn()
    .mockResolvedValue(personAPIData.popularPersonsResponse),
  getPersonInfo: jest.fn().mockResolvedValue(personAPIData.personInfoResponse)
};

const searchAPI = {
  searchMulti: jest.fn().mockResolvedValue(searchAPIData.matrix)
};

export { movieAPI, personAPI, searchAPI };
