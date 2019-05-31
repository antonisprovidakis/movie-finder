import { combineReducers } from 'redux';
import paginate from './paginate';
import { MovieActionTypes } from '../../actions/movieActions';
import { createQuery } from '../../../utils/discoverMovies';

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
    byQuery
});

export default moviesByDiscoverOptions;
