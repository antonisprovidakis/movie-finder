import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import isError from 'lodash/isError';
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

        if (!isPlainObject(payload)) {
            throw new Error('Expected payload to be a plain object.');
        }

        const [requestType, successType, failureType] = types;

        dispatch(createAction(requestType, payload));

        return callAPI().then(
            response => {
                const processedResponse = processTMDBResponse(response, schema);
                const finalPayload = augmentPayloadWithData(payload, processedResponse);
                return dispatch(createAction(successType, finalPayload));
            },
            error => dispatch(failureType, error)
        );
    }
}

function createAction(type, payload) {
    if (isError(payload)) {
        return {
            type,
            payload,
            error: true
        };
    }

    if (isEmpty(payload)) {
        return { type };
    };

    return {
        type,
        payload
    };
}

function augmentPayloadWithData(payload, data) {
    return {
        ...payload,
        ...data
    };
}
