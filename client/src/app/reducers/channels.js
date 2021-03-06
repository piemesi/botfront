import constants from '../constants'
import _ from 'lodash'
const channels = {
    companyId: null,
    current: null,
    list: [],
    //     {id:1, title:'test',telegramId:null, managerId:null},
    //     {id:2, title:'test-second',telegramId:'soft_made', managerId:'mitino'}
    // ]
    tempAuth: null,
    authData:[]
};
import base64 from 'base-64' ;
import * as funcs from '../mainFunc';

const channelReducer = (state = channels, action) => {

    console.log("CURRENT_ACTION", action)
    switch (action.type) {

        case `GET_CHANNEL_REJECTED`:

            return {
                ...state,
                ...action.payload
            };

        case `GET_CHANNEL_FULFILLED`:

            return {
                ...state,
                list: action.payload.channels
            };

        case `GET_CHANNELS_REJECTED`:

            return {
                ...state,
                ...action.payload
            };

        case `GET_CHANNELS_FULFILLED`:

            return {
                ...state,
                list: action.payload.channels
            };
        case `GET_AUTH_HASH_FULFILLED`:

            let ls = localStorage.getItem('authKey');

            if(action.payload.auth_key !== ls){
                localStorage.setItem('authKey', action.payload.auth_key);
            }
            return {
                ...state,
                tempAuth: action.payload.auth_key
            };

        case `GET_AUTH_HASH_REJECTED`:
            return {
                ...state
            };
        case `GET_AUTH_HASH_DATA_FULFILLED`:

            let authData =  base64.decode(action.payload.data);

            return {
                ...state,
                authData
            };

        case `GET_AUTH_HASH_DATA_REJECTED`:

             return {
                ...state
            };
        case `IDENT_USER_FULFILLED`:


            funcs.setCookedSession(action.payload.company.id, action.payload.company.cooked_key);
            return {
                ...state,
                companyId:action.payload.company.id
            };

        case 'LOGOUT':
            localStorage.removeItem('bmt_token');
            localStorage.removeItem('authKey');
            return {...channels};

        case `IDENT_USER_REJECTED`:

            return {
                ...state
            };

        case 'SET_CURRENT_CHANNEL':

            return {
                ...state,
                current: action.current,

            };
        case 'SET_CURRENT_COMPANY':

            return {
                ...state,
                companyId: action.current,

            };

        default:

            return state;
            break;
    }

};

export default channelReducer