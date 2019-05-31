import { combineReducers } from 'redux';
import paginate from './paginate';
import { MovieActionTypes } from '../../actions/movieActions';
import { stringifyFilters } from '../../../utils/queryString';

const byQuery = paginate({
    mapActionToKey: action => {
        const { page, ...filters } = action.options;
        return stringifyFilters(filters);
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
