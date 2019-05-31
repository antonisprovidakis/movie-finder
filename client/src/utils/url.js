import qs from 'query-string';

export function parseQueryString(queryString = '') {
    return qs.parse(queryString, { arrayFormat: 'bracket' });
}

export function stringifyParams(params = {}) {
    return qs.stringify(params, { arrayFormat: 'bracket' });
}
