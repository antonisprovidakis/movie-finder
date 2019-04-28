import { normalize } from 'normalizr';

export default function apiMiddleware({ dispatch, getState }) {
    return next => action => {
        const {
            types,
            callAPI,
            shouldCallAPI = () => true,
            payload = {},
            schema
        } = action;

        if (!types) {
            // Normal action: pass it on
            return next(action);
        }

        if (
            !Array.isArray(types) ||
            types.length !== 3 ||
            !types.every(type => typeof type === 'string')
        ) {
            throw new Error('Expected an array of three string types.');
        }

        if (typeof callAPI !== 'function') {
            throw new Error('Expected callAPI to be a function.');
        }

        if (typeof schema === 'undefined') {
            throw new Error('schema parameter must be provided.');
        }

        if (!shouldCallAPI(getState())) {
            return;
        }

        const [requestType, successType, failureType] = types;

        dispatch({
            type: requestType,
            ...payload
        });

        return callAPI().then(
            response => {
                const normalizedData = normalize(
                    response.results ? response.results : response,
                    schema
                );

                const { results, ...rest } = response;

                return dispatch({
                    type: successType,
                    ...payload,
                    response: {
                        ...rest,
                        normalizedData
                    }
                })
            },
            error =>
                dispatch({
                    type: failureType,
                    error,
                    ...payload
                })
        );
    }
}
