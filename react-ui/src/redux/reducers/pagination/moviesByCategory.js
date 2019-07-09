import paginate from './paginate';
import { MovieActionTypes } from '../../actions/movieActions';

const moviesByCategory = paginate({
  mapActionToKey: action => action.category,
  types: [
    MovieActionTypes.LOAD_MOVIES_BY_CATEGORY_REQUEST,
    MovieActionTypes.LOAD_MOVIES_BY_CATEGORY_SUCCESS,
    MovieActionTypes.LOAD_MOVIES_BY_CATEGORY_FAILURE
  ]
});

export default moviesByCategory;
