import paginate from './paginate';
import { PersonActionTypes } from '../../actions/personActions';

const personsByPage = paginate({
  types: [
    PersonActionTypes.LOAD_POPULAR_PERSONS_REQUEST,
    PersonActionTypes.LOAD_POPULAR_PERSONS_SUCCESS,
    PersonActionTypes.LOAD_POPULAR_PERSONS_FAILURE
  ]
});

export default personsByPage;
