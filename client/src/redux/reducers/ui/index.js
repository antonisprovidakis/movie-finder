import { combineReducers } from 'redux';
import { ActionTypes } from '../../actions';

const movieCardViewStyle = (state = 'poster', action) => {
    switch (action.type) {
        case ActionTypes.SET_MOVIE_CARD_VIEW_STYLE:
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
        ActionTypes.LOAD_MOVIE_INFO_REQUEST,
        ActionTypes.LOAD_MOVIE_INFO_SUCCESS,
        ActionTypes.LOAD_MOVIE_INFO_FAILURE
    ),
    isFetchingPersonInfo: createIsFetchingResourceReducer(
        ActionTypes.LOAD_PERSON_INFO_REQUEST,
        ActionTypes.LOAD_PERSON_INFO_SUCCESS,
        ActionTypes.LOAD_PERSON_INFO_FAILURE
    ),
});

export default ui;
