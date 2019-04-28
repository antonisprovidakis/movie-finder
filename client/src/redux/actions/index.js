import Schemas from '../schemas';
import { defaultOptions, movieAPI, personAPI, } from '../../api';

const LOAD_MOVIE_INFO_REQUEST = 'LOAD_MOVIE_INFO_REQUEST';
const LOAD_MOVIE_INFO_SUCCESS = 'LOAD_MOVIE_INFO_SUCCESS';
const LOAD_MOVIE_INFO_FAILURE = 'LOAD_MOVIE_INFO_FAILURE';

export function loadMovieInfo(movieId, requiredFields = [], options = defaultOptions.movie) {
    options = { ...defaultOptions.movie, ...options };
    return {
        types: [LOAD_MOVIE_INFO_REQUEST, LOAD_MOVIE_INFO_SUCCESS, LOAD_MOVIE_INFO_FAILURE],
        payload: { movieId, options },
        schema: Schemas.MOVIE,
        callAPI: () => movieAPI.getMovieInfo(movieId, options),
        shouldCallAPI: state => {
            const movie = state.entities.movies[movieId];

            if (movie && requiredFields.every(key => movie.hasOwnProperty(key))) {
                return false;
            }

            return true;
        },
    }
}

const LOAD_MOVIES_BY_CATEGORY_REQUEST = 'LOAD_MOVIES_BY_CATEGORY_REQUEST';
const LOAD_MOVIES_BY_CATEGORY_SUCCESS = 'LOAD_MOVIES_BY_CATEGORY_SUCCESS';
const LOAD_MOVIES_BY_CATEGORY_FAILURE = 'LOAD_MOVIES_BY_CATEGORY_FAILURE';

export function loadMoviesByCategory(category, options = defaultOptions.movieCollection) {
    options = { ...defaultOptions.movieCollection, ...options };
    return {
        types: [LOAD_MOVIES_BY_CATEGORY_REQUEST, LOAD_MOVIES_BY_CATEGORY_SUCCESS, LOAD_MOVIES_BY_CATEGORY_FAILURE],
        payload: { category, options },
        schema: Schemas.MOVIE_ARRAY,
        callAPI: () => movieAPI.getMoviesByCategory(category, options),
        shouldCallAPI: state => {
            const {
                pages = {}
            } = state.pagination.moviesByCategory[category] || {};
            const movieIdsOfSelectedPage = pages[options.page || 1];
            return !movieIdsOfSelectedPage;
        }
    }
}

const DISCOVER_MOVIES_CHANGE_QUERY = 'DISCOVER_MOVIES_CHANGE_QUERY';

export function changeQuery(query) {
    return {
        type: DISCOVER_MOVIES_CHANGE_QUERY,
        query
    };
}

const DISCOVER_MOVIES_REQUEST = 'DISCOVER_MOVIES_REQUEST';
const DISCOVER_MOVIES_SUCCESS = 'DISCOVER_MOVIES_SUCCESS';
const DISCOVER_MOVIES_FAILURE = 'DISCOVER_MOVIES_FAILURE';

export function discoverMovies(options = defaultOptions.movieCollection) {
    options = { ...defaultOptions.movieCollection, ...options };
    // TODO: turn this into a helper function
    // or use query onto payload?
    const query = `${options.primary_release_year}-${options.sort_by}-${options.with_genres.join('_')}`;
    return {
        types: [DISCOVER_MOVIES_REQUEST, DISCOVER_MOVIES_SUCCESS, DISCOVER_MOVIES_FAILURE],
        payload: { options },
        schema: Schemas.MOVIE_ARRAY,
        callAPI: () => movieAPI.discoverMovies(options),
        shouldCallAPI: state => {
            const {
                pages = {}
            } = state.pagination.moviesByDiscoverOptions.byQuery[query] || {};
            const movieIdsOfSelectedPage = pages[options.page || 1];
            return !movieIdsOfSelectedPage;
        },
    }
}

const LOAD_PERSON_INFO_REQUEST = 'LOAD_PERSON_INFO_REQUEST';
const LOAD_PERSON_INFO_SUCCESS = 'LOAD_PERSON_INFO_SUCCESS';
const LOAD_PERSON_INFO_FAILURE = 'LOAD_PERSON_INFO_FAILURE';

export function loadPersonInfo(personId, requiredFields = [], options = defaultOptions.person) {
    options = { ...defaultOptions.person, ...options };
    return {
        types: [LOAD_PERSON_INFO_REQUEST, LOAD_PERSON_INFO_SUCCESS, LOAD_PERSON_INFO_FAILURE],
        payload: { personId, options },
        schema: Schemas.PERSON,
        callAPI: () => personAPI.getPersonInfo(personId, options),
        shouldCallAPI: state => {
            const person = state.entities.persons[personId];

            if (person && requiredFields.every(key => person.hasOwnProperty(key))) {
                return false;
            }

            return true;
        }
    }
}

const LOAD_POPULAR_PERSONS_REQUEST = 'LOAD_POPULAR_PERSONS_REQUEST';
const LOAD_POPULAR_PERSONS_SUCCESS = 'LOAD_POPULAR_PERSONS_SUCCESS';
const LOAD_POPULAR_PERSONS_FAILURE = 'LOAD_POPULAR_PERSONS_FAILURE';

export function loadPopularPersons(options = defaultOptions.personCollection) {
    options = { ...defaultOptions.personCollection, ...options };
    return {
        types: [LOAD_POPULAR_PERSONS_REQUEST, LOAD_POPULAR_PERSONS_SUCCESS, LOAD_POPULAR_PERSONS_FAILURE],
        payload: { options },
        schema: Schemas.PERSON_ARRAY,
        callAPI: () => personAPI.getPopularPersons(options),
        shouldCallAPI: state => {
            const pages = state.pagination.personsByPage.pages || {};
            const personIdsOfSelectedPage = pages[options.page || 1];
            return !personIdsOfSelectedPage;
        }
    }
}

const SET_MOVIE_CARD_VIEW_STYLE = 'SET_MOVIE_CARD_VIEW_STYLE';

export function setMovieCardViewStyle(viewStyle) {
    return {
        type: SET_MOVIE_CARD_VIEW_STYLE,
        viewStyle
    };
}

export const ActionTypes = {
    LOAD_MOVIE_INFO_REQUEST,
    LOAD_MOVIE_INFO_SUCCESS,
    LOAD_MOVIE_INFO_FAILURE,
    LOAD_MOVIES_BY_CATEGORY_REQUEST,
    LOAD_MOVIES_BY_CATEGORY_SUCCESS,
    LOAD_MOVIES_BY_CATEGORY_FAILURE,
    LOAD_PERSON_INFO_REQUEST,
    LOAD_PERSON_INFO_SUCCESS,
    LOAD_PERSON_INFO_FAILURE,
    LOAD_POPULAR_PERSONS_REQUEST,
    LOAD_POPULAR_PERSONS_SUCCESS,
    LOAD_POPULAR_PERSONS_FAILURE,
    DISCOVER_MOVIES_CHANGE_QUERY,
    DISCOVER_MOVIES_REQUEST,
    DISCOVER_MOVIES_SUCCESS,
    DISCOVER_MOVIES_FAILURE,

    SET_MOVIE_CARD_VIEW_STYLE
};
