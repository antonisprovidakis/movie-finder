import { combineReducers } from 'redux';
import moviesByCategory from './moviesByCategory';
import moviesByDiscoverOptions from './moviesByDiscoverOptions';
import personsByPage from './personsByPage';

const pagination = combineReducers({
    moviesByCategory,
    moviesByDiscoverOptions,
    personsByPage
});

export default pagination;
