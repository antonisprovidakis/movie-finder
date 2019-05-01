import { combineReducers } from 'redux';
import { ActionTypes } from '../actions/';

const movieCardViewStyle = (state = 'poster', action) => {
    switch (action.type) {
        case ActionTypes.SET_MOVIE_CARD_VIEW_STYLE:
            return action.payload.viewStyle;
        default:
            return state;
    }
}

const ui = combineReducers({
    movieCardViewStyle
});

export default ui;
