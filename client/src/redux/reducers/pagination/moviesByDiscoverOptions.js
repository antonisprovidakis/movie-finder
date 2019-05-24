import { combineReducers } from 'redux';
import paginate from './paginate';
import { MovieActionTypes } from '../../actions/movieActions';
import { createQuery } from '../../../utils/discoverMovies';

const initialState = {
    primaryReleaseYear: 2018,
    sortBy: 'popularity.desc',
    withGenres: []
};

function options(state = initialState, action) {
    switch (action.type) {
        case MovieActionTypes.CHANGE_DISCOVER_MOVIES_OPTIONS:
            return {
                ...state,
                ...action.options
            };
        case MovieActionTypes.RESET_DISCOVER_MOVIES_OPTIONS:
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
        MovieActionTypes.DISCOVER_MOVIES_REQUEST,
        MovieActionTypes.DISCOVER_MOVIES_SUCCESS,
        MovieActionTypes.DISCOVER_MOVIES_FAILURE
    ]
});

const moviesByDiscoverOptions = combineReducers({
    options,
    byQuery
});

export default moviesByDiscoverOptions;
