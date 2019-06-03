const SET_MOVIE_CARD_VIEW_STYLE = 'SET_MOVIE_CARD_VIEW_STYLE';

export function setMovieCardViewStyle(viewStyle) {
  return {
    type: SET_MOVIE_CARD_VIEW_STYLE,
    viewStyle
  };
}

export const UIActionTypes = {
  SET_MOVIE_CARD_VIEW_STYLE
};
