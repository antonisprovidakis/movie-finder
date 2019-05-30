export function getMultipleParamFromQueryString(queryString, {
    paramName = '',
    fallbackValue = [],
    transform = value => value
} = {}) {
    if (typeof paramName !== 'string') {
        throw new Error('Expected paramName to be a string.');
    }

    if (!Array.isArray(fallbackValue)) {
        throw new Error('Expected fallbackValue to be an array.');
    }

    if (typeof transform !== 'function') {
        throw new Error('Expected transform to be a function that returns a value.');
    }

    const searchParams = new URLSearchParams(queryString);

    const paramArray = searchParams.getAll(paramName);

    if (paramArray.length === 0) {
        return fallbackValue;
    }

    return paramArray.map(param => transform(param));
}

export function getSingleParamFromQueryString(queryString, {
    paramName = '',
    fallbackValue = null,
    transform = value => value
} = {}) {
    return getMultipleParamFromQueryString(queryString, {
        paramName,
        fallbackValue: [fallbackValue],
        transform
    })[0];
}

export function createQueryStringFromParams(params = {}) {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach(key => {
        const value = params[key];

        if (!isValidValue(value)) {
            return;
        }

        if (Array.isArray(value)) {
            value.forEach(item => {
                searchParams.append(key, item);
            });
            return;
        }

        searchParams.set(key, value);
    });

    return searchParams.toString();
}

function isValidValue(value) {
    if (
        value === null ||
        typeof value === 'undefined' ||
        (typeof value === 'object' && value.constructor === Object)
    ) {
        return false;
    }

    return true;
}
