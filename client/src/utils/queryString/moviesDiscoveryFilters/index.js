import _memoize from 'lodash/memoize';
import { stringifyParams } from '../base';
import getPrimaryReleaseYear from './getPrimaryReleaseYear';
import getSortBy from './getSortBy';
import getWithGenres from './getWithGenres';

export const stringifyFilters = _memoize(
  (filters = {}) => {
    return stringifyParams(filters);
  },
  (filters = {}) => {
    const keys = Object.keys(filters).sort();

    const filtersWithOrderedKeys = {};
    keys.forEach(key => {
      const value = filters[key];

      if (Array.isArray(value)) {
        filtersWithOrderedKeys[key] = [...value].sort();
      } else {
        filtersWithOrderedKeys[key] = filters[key];
      }
    });

    return JSON.stringify(filtersWithOrderedKeys);
  }
);

// TODO: Somehow make it more generic? As for now, the
// returned data is ad-hoc
//
// It should return all available key/value pairs and let
// the client handle the parsed value.
//
// Idea: define the name of prop you are interested
// and pass a 'validator/transformer' function that validates and
// transforms into desired type. Also, could receive a default value.
export const getFilters = _memoize((queryString = '') => {
  const primaryReleaseYear = getPrimaryReleaseYear(queryString);
  const sortBy = getSortBy(queryString);
  const withGenres = getWithGenres(queryString);

  return {
    primaryReleaseYear,
    sortBy,
    withGenres
  };
});
