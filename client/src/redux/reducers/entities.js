import merge from 'lodash/merge';
import get from 'lodash/get';

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { movies: {}, persons: {} }, action) => {
    const entities = get(action, 'response.normalizedData.entities');
    if (entities) {
        return merge({}, state, entities);
    }
    return state;
};

export default entities;
