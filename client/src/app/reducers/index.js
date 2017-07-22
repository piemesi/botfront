import { combineReducers } from 'redux'
import tasksReducer from './tasks';
import channelReducer from './channels';


const myReducer = combineReducers({

    tasksReducer,
    channelReducer,

});

export default myReducer