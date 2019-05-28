import { combineReducers } from 'redux';
import { UIActionTypes } from '../../actions/uiActions';
import { MovieActionTypes } from '../../actions/movieActions';
import { PersonActionTypes } from '../../actions/personActions';

const movieCardViewStyle = (state = 'poster', action) => {
    switch (action.type) {
        case UIActionTypes.SET_MOVIE_CARD_VIEW_STYLE:
            return action.viewStyle;
        default:
            return state;
    }
}

const createIsFetchingResourceReducer = (request, success, failure) => {
    return (state = false, action) => {
        switch (action.type) {
            case request:
                return true;
            case success:
            case failure:
                return false;
            default:
                return state;
        }
    }
}

const ui = combineReducers({
    movieCardViewStyle,
    isFetchingMovieInfo: createIsFetchingResourceReducer(
        MovieActionTypes.LOAD_MOVIE_INFO_REQUEST,
        MovieActionTypes.LOAD_MOVIE_INFO_SUCCESS,
        MovieActionTypes.LOAD_MOVIE_INFO_FAILURE
    ),
    isFetchingPersonInfo: createIsFetchingResourceReducer(
        PersonActionTypes.LOAD_PERSON_INFO_REQUEST,
        PersonActionTypes.LOAD_PERSON_INFO_SUCCESS,
        PersonActionTypes.LOAD_PERSON_INFO_FAILURE
    ),
});

export default ui;
