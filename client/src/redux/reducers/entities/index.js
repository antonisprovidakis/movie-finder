import _merge from 'lodash/merge';

// Updates an entity cache in response to any action with response.entities.
const entities = (state = {
    movies: {},
    persons: {}
}, action) => {
    const entities =
        action.response &&
        action.response.data &&
        action.response.data.entities;

    if (entities) {
        return _merge({}, state, entities);
    }
    return state;
};

export default entities;
