import constants from '../constants'
import _ from 'lodash'
const channels = {
    companyId: 1,
    current: null,
    list: []
    //     {id:1, title:'test',telegramId:null, managerId:null},
    //     {id:2, title:'test-second',telegramId:'soft_made', managerId:'mitino'}
    // ]
};

const channelReducer = (state = channels, action) => {

    console.log("CURRENT_ACTION", action)
    switch (action.type) {
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


        case 'SET_CURRENT_CHANNEL':

            return {
                ...state,
                current: action.current,

            };


        default:

            return state;
            break;
    }

};

export default channelReducer