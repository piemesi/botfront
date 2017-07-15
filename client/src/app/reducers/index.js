import { combineReducers } from 'redux'
import tasksReducer from './tasks'
// import countriesReducer from './countries'
// import mapReducer from './map'
// import searchReducer from './search'
// import footerReducer from './footer'

const myReducer = combineReducers({
    // footerReducer,
    tasksReducer,
    // searchReducer,
    // countriesReducer,
    // mapReducer
});

export default myReducer