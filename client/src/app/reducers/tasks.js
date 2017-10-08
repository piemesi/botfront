import constants from '../constants'
import _ from 'lodash'
const tasks = {

};

const tasksReducer = (state = tasks, action) => {

    console.log("CURRENT_ACTION", action)
    switch (action.type) {


        case 'SET_FOCUSED_MATERIAL':
            console.log('SET_FOCUSED_MATERIAL', action.materialId)
            console.log('state', state)

            let arr = _.filter(state.tasks, {id: action.materialId})

            console.log('SET_FOCUSED_MATERIAL', arr)
            return {
                ...state,
                focused: action.materialId,
                tasks: arr
            }
            break;

        case `UPDATE_DATA_FULFILLED`:

            console.log('UPDATE_DATA_FULFILLED', action.payload)


            //
            // let tasks = state.tasks
            // let index = _.findIndex(tasks, ['id', action.payload.id]);
            // tasks[index] = action.payload
            //
            // console.log('UPDATE_DATA_FULFILLED',tasks)
            return {
                ...state,
                ...action.payload

            }
            break;

        case  'UPDATE_DATA_REJECTED':
            return {
                ...state,
                // hasHashOffersData: []
            }


            break;


        case `GET_POSTS_SENT_FULFILLED`:

            console.log('GET_POSTS_SENT_FULFILLED', action.payload)


            return {
                focused: null,
                tasks: action.payload.tasks,
                upd: true
            }


            break;
        // case `${constants.GET_HASH_OFFERS}_REJECTED`:
        case  'GET_POSTS_SENT_REJECTED':
            return {
                ...state,
                // hasHashOffersData: []
            }


            break;


        case `GET_POSTS_UNSENT_FULFILLED`:

            console.log('GET_POSTS_UNSENT_FULFILLED', action.payload)

            return {
                ...state,
                ...action.payload,
                upd: true
            }
            break;
        // case `${constants.GET_HASH_OFFERS}_REJECTED`:
        case  'GET_POSTS_UNSENT_REJECTED':
            return {
                ...state,
                // hasHashOffersData: []
            }


            break;
        case `POST_SHOWS_INCREASE_FULFILLED`:

            console.log('GET_POST_FULFILLED', action.payload)

            return {
                ...state,
                ...action.payload
            }
            break;
        // case `${constants.GET_HASH_OFFERS}_REJECTED`:
        case  'POST_SHOWS_INCREASE_REJECTED':
            return {
                ...state,
             }


            break;
        case `GET_POST_FULFILLED`:

            console.log('GET_POST_FULFILLED', action.payload)

            return {
                ...state,
                ...action.payload
            }
            break;
        // case `${constants.GET_HASH_OFFERS}_REJECTED`:
        case  'GET_POST_REJECTED':
            return {
                ...state,
                // hasHashOffersData: []
            }


            break;
        case `GET_POSTS_FULFILLED`:

            console.log('GET_POSTS_FULFILLED', action.payload)

            return {
                ...state,
                ...action.payload
            }
            break;
        // case `${constants.GET_HASH_OFFERS}_REJECTED`:
        case  'GET_POSTS_REJECTED':
            return {
                ...state,
                // hasHashOffersData: []
            }


            break;
        case constants.SELECT_NEW_OFFER:
            console.log(action.type)

            state = {
                ...state,
                selected: state.selected + 1
            };
            console.log(state);
            return state;
            break;

        default:

            return state;
            break;
    }

};

export default tasksReducer