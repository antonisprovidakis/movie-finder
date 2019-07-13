import { combineReducers } from 'redux';
import moviesByCategory from './moviesByCategory';
import moviesByDiscoverOptions from './moviesByDiscoverOptions';
import persons from './persons';

const pagination = combineReducers({
  moviesByCategory,
  moviesByDiscoverOptions,
  persons
});

export default pagination;
