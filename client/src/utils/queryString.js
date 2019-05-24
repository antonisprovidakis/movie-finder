export function getParamFromQueryString(queryString, {
    paramName = '',
    fallbackValue = null,
    transform = value => value
} = {}) {
    if (typeof paramName !== 'string') {
        throw new Error('Expected paramName to be a string.');
    }

    if (typeof transform !== 'function') {
        throw new Error('Expected transform to be a function that returns a value.');
    }

    const params = new URLSearchParams(queryString);
    const param = params.get(paramName);

    if (!param) {
        return fallbackValue;
    }

    return transform(param);
}
