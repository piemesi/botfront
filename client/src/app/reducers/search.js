import constants from '../constants'

const search = {
    show: false
};

const searchReducer = (state = search, action) => {

    switch (action.type) {
        case constants.SHOW_SEARCH:

            let show = state.show === false;


             state = {...state,
             show: show};

            return state;
            break;
        default:

            return state;
            break;
    }

};

export default searchReducer