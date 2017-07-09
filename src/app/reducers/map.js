import constants from '../constants'

const map = {
    show: false
};

const mapReducer = (state = map, action) => {

    switch (action.type) {
        case constants.SHOW_MAP:

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

export default mapReducer