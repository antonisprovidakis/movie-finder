import { combineReducers } from 'redux';
import paginate from './paginate';
import { ActionTypes } from '../../actions';
import { createQuery } from '../../../utils/discoverMovies';

const initialState = {
    primaryReleaseYear: 2018,
    sortBy: 'popularity.desc',
    withGenres: []
};

function currentOptions(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CHANGE_DISCOVER_MOVIES_OPTIONS:
            return {
                ...state,
                ...action.options
            };
        case ActionTypes.RESET_DISCOVER_MOVIES_OPTIONS:
            return { ...initialState };
        default:
            return state;
    }
};

const byQuery = paginate({
    mapActionToKey: action => {
        const { primaryReleaseYear, sortBy, withGenres } = action.options;
        return createQuery(primaryReleaseYear, sortBy, withGenres);
    },
    types: [
        ActionTypes.DISCOVER_MOVIES_REQUEST,
        ActionTypes.DISCOVER_MOVIES_SUCCESS,
        ActionTypes.DISCOVER_MOVIES_FAILURE
    ]
});

const moviesByDiscoverOptions = combineReducers({
    currentOptions,
    byQuery
});

export default moviesByDiscoverOptions;
