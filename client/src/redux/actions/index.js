import Schemas from '../schemas';
import { movieAPI, personAPI, } from '../../api';
import { createQuery } from '../../utils/discoverMovies';
import { decamelizeKeys } from 'humps';

const LOAD_MOVIE_INFO_REQUEST = 'LOAD_MOVIE_INFO_REQUEST';
const LOAD_MOVIE_INFO_SUCCESS = 'LOAD_MOVIE_INFO_SUCCESS';
const LOAD_MOVIE_INFO_FAILURE = 'LOAD_MOVIE_INFO_FAILURE';

export function loadMovieInfo(movieId, requiredFields = [], options = {}) {
    return {
        types: [LOAD_MOVIE_INFO_REQUEST, LOAD_MOVIE_INFO_SUCCESS, LOAD_MOVIE_INFO_FAILURE],
        payload: { movieId, options },
        schema: Schemas.MOVIE,
        callAPI: () => movieAPI.getMovieInfo(movieId, decamelizeKeys(options)),
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

export function loadMoviesByCategory(category, options = {}) {
    return {
        types: [LOAD_MOVIES_BY_CATEGORY_REQUEST, LOAD_MOVIES_BY_CATEGORY_SUCCESS, LOAD_MOVIES_BY_CATEGORY_FAILURE],
        payload: { category, options },
        schema: Schemas.MOVIE_ARRAY,
        callAPI: () => movieAPI.getMoviesByCategory(category, decamelizeKeys(options)),
        shouldCallAPI: state => {
            const {
                pages = {}
            } = state.pagination.moviesByCategory[category] || {};
            const movieIdsOfSelectedPage = pages[options.page || 1];
            return !movieIdsOfSelectedPage;
        }
    }
}

const CHANGE_DISCOVER_MOVIES_OPTIONS = 'CHANGE_DISCOVER_MOVIES_OPTIONS';

export function changeDiscoverOptions(options) {
    return {
        type: CHANGE_DISCOVER_MOVIES_OPTIONS,
        options
    };
}

const RESET_DISCOVER_MOVIES_OPTIONS = 'RESET_DISCOVER_MOVIES_OPTIONS';

export function resetDiscoverOptions() {
    return {
        type: RESET_DISCOVER_MOVIES_OPTIONS
    };
}

const DISCOVER_MOVIES_REQUEST = 'DISCOVER_MOVIES_REQUEST';
const DISCOVER_MOVIES_SUCCESS = 'DISCOVER_MOVIES_SUCCESS';
const DISCOVER_MOVIES_FAILURE = 'DISCOVER_MOVIES_FAILURE';

export function discoverMovies(options = {}) {
    const { primaryReleaseYear, sortBy, withGenres } = options;
    const query = createQuery(primaryReleaseYear, sortBy, withGenres);
    return {
        types: [DISCOVER_MOVIES_REQUEST, DISCOVER_MOVIES_SUCCESS, DISCOVER_MOVIES_FAILURE],
        payload: { options },
        schema: Schemas.MOVIE_ARRAY,
        callAPI: () => movieAPI.discoverMovies(decamelizeKeys(options)),
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

export function loadPersonInfo(personId, requiredFields = [], options = {}) {
    return {
        types: [LOAD_PERSON_INFO_REQUEST, LOAD_PERSON_INFO_SUCCESS, LOAD_PERSON_INFO_FAILURE],
        payload: { personId, options },
        schema: Schemas.PERSON,
        callAPI: () => personAPI.getPersonInfo(personId, decamelizeKeys(options)),
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

export function loadPopularPersons(options = {}) {
    return {
        types: [LOAD_POPULAR_PERSONS_REQUEST, LOAD_POPULAR_PERSONS_SUCCESS, LOAD_POPULAR_PERSONS_FAILURE],
        payload: { options },
        schema: Schemas.PERSON_ARRAY,
        callAPI: () => personAPI.getPopularPersons(decamelizeKeys(options)),
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
    CHANGE_DISCOVER_MOVIES_OPTIONS,
    RESET_DISCOVER_MOVIES_OPTIONS,
    DISCOVER_MOVIES_REQUEST,
    DISCOVER_MOVIES_SUCCESS,
    DISCOVER_MOVIES_FAILURE,

    SET_MOVIE_CARD_VIEW_STYLE
};
