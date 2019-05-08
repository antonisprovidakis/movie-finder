import _merge from 'lodash/merge';
import _get from 'lodash/get';

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { movies: {}, persons: {} }, action) => {
    const entities = _get(action, 'payload.data.entities');
    if (entities) {
        return _merge({}, state, entities);
    }
    return state;
};

export default entities;
