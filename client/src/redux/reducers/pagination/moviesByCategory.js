import paginate from './paginate';
import { MovieActionTypes } from '../../actions/movieActions';
import { combineReducers } from 'redux';

const types = [
  MovieActionTypes.LOAD_MOVIES_BY_CATEGORY_REQUEST,
  MovieActionTypes.LOAD_MOVIES_BY_CATEGORY_SUCCESS,
  MovieActionTypes.LOAD_MOVIES_BY_CATEGORY_FAILURE
];

const reducers = ['popular', 'nowPlaying', 'upcoming', 'topRated'].reduce(
  (reducers, reducerName) => {
    reducers[reducerName] = paginate({
      types,
      checkIfNeedsToRun: action => action.category === reducerName
    });

    return reducers;
  },
  {}
);

const moviesByCategory = combineReducers({ ...reducers });

export default moviesByCategory;
