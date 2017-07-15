import constants from '../constants'

const countries = {
    all: [
        {label: 'Испания', valueKey: '1', icon: 'es'},
        {label: 'Россия', valueKey: '2', icon: 'ru'},// <Icon_Flag_RU />
        {label: 'Тайланд', valueKey: '3', icon: 'th'},//<LoaclaFlorist />},
        {label: 'Греция', valueKey: '4', icon: 'gr'},//<DirectionsBus />
        {label: 'Австрия', valueKey: '5', icon: 'at'},
        {label: 'Германия', valueKey: '6', icon: 'de'},
        {label: 'Великобритания', valueKey: '7', icon: 'gb'},
        {label: 'Италия', valueKey: '8', icon: 'it'},
        {label: 'Чехия', valueKey: '9', icon: 'cz'},
        {label: 'Португалия', valueKey: '10', icon: 'pt'},
        {label: 'Кипр', valueKey: '11', icon: 'cy'},
        {label: 'Египет', valueKey: '12', icon: 'eg'},
        {label: 'Турция', valueKey: '13', icon: 'tr'},
        {label: 'США', valueKey: '14', icon: 'us'},
        {label: 'Япония', valueKey: '15', icon: 'jp'},
        {label: 'Венгрия', valueKey: '16', icon: 'hu'},
        {label: 'Франция', valueKey: '17', icon: 'fr'},
        {label: 'Нидерланды', valueKey: '18', icon: 'nl'},
        {label: 'Китай', valueKey: '19', icon: 'cn'},

    ],
    selected: []
};

const countriesReducer = (state = countries, action) => {

    switch (action.type) {
        case constants.SELECT_COUNTRIES:

            console.log('selected', action.selected);
            let s = action.selected.map((sel) => {

                    let sub = countries.all.find((element, index) => {
                            return (element.valueKey == sel)
                        }
                    );
                    return sub;

                })
            ;

            //  Object.assign(state.selected, action.selected);
            console.log('reducer', s);

            state = {
                ...state,
                selected: s
            };
            console.log('state', state);
            return state;
            break;
        default:

            return state;
            break;
    }

};

export default countriesReducer