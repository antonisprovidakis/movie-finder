import { combineReducers } from 'redux';
import pagination from './pagination';
import entities from './entities';
import ui from './ui';

const rootReducer = combineReducers({
    entities,
    pagination,
    ui
});

export default rootReducer;
