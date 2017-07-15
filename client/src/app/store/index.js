import { createStore, applyMiddleware, compose } from 'redux'
import myReducer from '../reducers/index'
// import reduxThunk from 'redux-thunk'



// middlewares
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';


// polyfills
import 'babel-polyfill'
import 'isomorphic-fetch'

const loggerMiddleware = (store) => {
    return function(next) {
        return function(action) {
            console.debug('trigger', action)
            let result = next(action)
            console.debug('store after action', store.getState())
            return result
        }
    }
}

const checkUserMW = store => next => action => {
    if( action.type === 'CONNECTED_NEW_USER' ) {
        let fakeRequest = () => new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 2500)
        })

        fakeRequest().then(() => {
            store.dispatch(addNewUser())
        })
    }

    return next(action)
}

const myStore = createStore(
    myReducer,
    compose(
        applyMiddleware(thunk, promiseMiddleware()),
        // is here we mount redux-devtool
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   // applyMiddleware(reduxThunk, loggerMiddleware) //, checkUserMW
);








export default myStore;