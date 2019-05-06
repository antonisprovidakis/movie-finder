import paginate from './paginate';
import { ActionTypes } from '../../actions';

const moviesByCategory  = paginate({
    mapActionToKey: action => action.payload.category,
    types: [
        ActionTypes.LOAD_MOVIES_BY_CATEGORY_REQUEST,
        ActionTypes.LOAD_MOVIES_BY_CATEGORY_SUCCESS,
        ActionTypes.LOAD_MOVIES_BY_CATEGORY_FAILURE
    ]
});

export default moviesByCategory;
