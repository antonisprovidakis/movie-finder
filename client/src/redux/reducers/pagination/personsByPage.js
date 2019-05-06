import paginate from './paginate';
import { ActionTypes } from '../../actions';

const personsByPage = paginate({
    types: [
        ActionTypes.LOAD_POPULAR_PERSONS_REQUEST,
        ActionTypes.LOAD_POPULAR_PERSONS_SUCCESS,
        ActionTypes.LOAD_POPULAR_PERSONS_FAILURE
    ]
});

export default personsByPage;
