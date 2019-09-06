import { UIActionTypes } from '../../actions/uiActions';

const ui = (state = { movieCardViewStyle: 'poster' }, action) => {
  switch (action.type) {
    case UIActionTypes.SET_MOVIE_CARD_VIEW_STYLE:
      return {
        ...state,
        movieCardViewStyle: action.viewStyle
      };
    default:
      return state;
  }
};

export default ui;
