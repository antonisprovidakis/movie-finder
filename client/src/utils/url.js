import qs from 'query-string';

export function parseQueryString(queryString = '') {
    return qs.parse(queryString, { arrayFormat: 'bracket' });
}

export function stringifyParams(params = {}) {
    return qs.stringify(params, { arrayFormat: 'bracket' });
}

export function updateQueryString(oldQueryString = '', override = {}) {
    const oldParams = parseQueryString(oldQueryString);
    return qs.stringify(
        { ...oldParams, ...override },
        { arrayFormat: 'bracket' }
    );
}
