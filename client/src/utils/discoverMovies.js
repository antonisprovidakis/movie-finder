import _memoize from 'lodash/memoize';
import { parseQueryString } from './url';
import { sortingFilters } from '../api/config/sortingFilters';

export function createQuery(primaryReleaseYear, sortBy, withGenres = []) {
    const sortedGenres = [...withGenres].sort((a, b) => a - b);
    return `primaryReleaseYear:${primaryReleaseYear}~sortBy:${sortBy}~withGenres:[${sortedGenres.join()}]`;
};

const DEFAULT_YEAR = new Date().getFullYear() - 1;
const OLDEST_YEAR = 1900;

function getPrimaryReleaseYearFromQueryString(queryString) {
    const {
        primary_release_year: primaryReleaseYearString
    } = parseQueryString(queryString);
    const primaryReleaseYear = parseInt(primaryReleaseYearString, 10);

    if (
        isNaN(primaryReleaseYear) ||
        primaryReleaseYear > DEFAULT_YEAR
    ) {
        return DEFAULT_YEAR;
    }

    if (primaryReleaseYear < OLDEST_YEAR) {
        return OLDEST_YEAR;
    }

    return primaryReleaseYear
}


const filters = sortingFilters.map(filter => filter.id);
const DEFAULT_SORTING_FILTER = filters[0];

function getSortByFromQueryString(queryString) {
    const { sort_by: sortBy } = parseQueryString(queryString);

    if (!filters.includes(sortBy)) {
        return DEFAULT_SORTING_FILTER;
    }

    return sortBy;
}

const DEFAULT_GENRES_SELECTION = [];

function getWithGenresFromQueryString(queryString) {
    const {
        with_genres: withGenres
    } = parseQueryString(queryString);

    if (!withGenres || !Array.isArray(withGenres)) {
        return DEFAULT_GENRES_SELECTION;
    }

    return withGenres;
}

export const getDiscoverMoviesOptions = _memoize(queryString => {
    const primaryReleaseYear = getPrimaryReleaseYearFromQueryString(queryString);
    const sortBy = getSortByFromQueryString(queryString);
    const withGenres = getWithGenresFromQueryString(queryString);

    return {
        primaryReleaseYear,
        sortBy,
        withGenres
    };
});
