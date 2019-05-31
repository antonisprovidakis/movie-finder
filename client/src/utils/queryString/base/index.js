import qs from 'query-string';
import { decamelizeKeys, camelizeKeys } from 'humps';

export function parseQueryString(queryString = '') {
    return camelizeKeys(qs.parse(queryString, { arrayFormat: 'bracket' }));
}

export function stringifyParams(params = {}) {
    return qs.stringify(decamelizeKeys(params), { arrayFormat: 'bracket' });
}

export function updateQueryString(oldQueryString = '', override = {}) {
    const oldParams = parseQueryString(oldQueryString);
    return stringifyParams({ ...oldParams, ...override });
}
