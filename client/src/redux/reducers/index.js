import { combineReducers } from 'redux';
import entities from './entities';
import pagination from './pagination';
import ui from './ui';

const rootReducer = combineReducers({
  entities,
  pagination,
  ui
});

export default rootReducer;
