import paginate from './paginate';
import { MovieActionTypes } from '../../actions/movieActions';
import { stringifyFilters } from '../../../utils/queryString';

const types = [
  MovieActionTypes.DISCOVER_MOVIES_REQUEST,
  MovieActionTypes.DISCOVER_MOVIES_SUCCESS,
  MovieActionTypes.DISCOVER_MOVIES_FAILURE
];

const paginateReducer = paginate({ types });

const moviesByDiscoverOptions = (state = {}, action) => {
  switch (action.type) {
    case MovieActionTypes.DISCOVER_MOVIES_REQUEST:
    case MovieActionTypes.DISCOVER_MOVIES_SUCCESS:
    case MovieActionTypes.DISCOVER_MOVIES_FAILURE:
      const { page, ...filters } = action.options;
      const query = stringifyFilters(filters);

      return {
        ...state,
        [query]: paginateReducer(state[query], action)
      };
    default:
      return state;
  }
};

export default moviesByDiscoverOptions;
