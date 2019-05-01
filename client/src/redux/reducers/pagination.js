import { combineReducers } from 'redux';
import paginate from './paginate';
import { ActionTypes } from '../actions/';

// Updates the pagination data for different actions.
const pagination = combineReducers({
    moviesByCategory: paginate({
        mapActionToKey: action => action.payload.category,
        types: [
            ActionTypes.LOAD_MOVIES_BY_CATEGORY_REQUEST,
            ActionTypes.LOAD_MOVIES_BY_CATEGORY_SUCCESS,
            ActionTypes.LOAD_MOVIES_BY_CATEGORY_FAILURE
        ]
    }),

    moviesByDiscoverOptions: combineReducers({
        currentQuery: (state = '', action) => {
            switch (action.type) {
                case ActionTypes.DISCOVER_MOVIES_CHANGE_QUERY:
                    return action.payload.query;
                default:
                    return state;
            }
        },
        byQuery: paginate({
            mapActionToKey: action => {
                const { primary_release_year, sort_by, with_genres } = action.payload.options;
                return `${primary_release_year}-${sort_by}-${with_genres.join('_')}`;
            },
            types: [
                ActionTypes.DISCOVER_MOVIES_REQUEST,
                ActionTypes.DISCOVER_MOVIES_SUCCESS,
                ActionTypes.DISCOVER_MOVIES_FAILURE
            ]
        })
    }),

    personsByPage: paginate({
        types: [
            ActionTypes.LOAD_POPULAR_PERSONS_REQUEST,
            ActionTypes.LOAD_POPULAR_PERSONS_SUCCESS,
            ActionTypes.LOAD_POPULAR_PERSONS_FAILURE
        ]
    }),
})

export default pagination;
