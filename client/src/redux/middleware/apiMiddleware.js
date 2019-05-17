import _isPlainObject from 'lodash/isPlainObject';
import processTMDBResponse from './processTMDBResponse';

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

        if (typeof shouldCallAPI !== 'function') {
            throw new Error('Expected shouldCallAPI to be a function.');
        }

        if (!shouldCallAPI(getState())) {
            return;
        }

        if (!_isPlainObject(payload)) {
            throw new Error('Expected payload to be a plain object.');
        }

        const [requestType, successType, failureType] = types;

        dispatch({
            type: requestType,
            ...payload
        });

        return callAPI().then(
            response => {
                const processedResponse = processTMDBResponse(response, schema);
                return dispatch({
                    type: successType,
                    ...payload,
                    response: processedResponse
                });
            },
            error =>
                dispatch({
                    type: failureType,
                    ...payload,
                    error
                })
        );
    }
}
