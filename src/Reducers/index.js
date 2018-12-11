import status from './status';
import todosList from './todos';
import { combineReducers } from 'redux';
import visibilityFilter from './visibility';

export default combineReducers({
    todosList,
    visibilityFilter,
    status
})

