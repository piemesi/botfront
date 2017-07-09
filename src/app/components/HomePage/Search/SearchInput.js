import React from 'react';
import Toggle from 'material-ui/Toggle';
import AnimakitExpander from 'animakit-expander';
import TextField from 'material-ui/TextField';

// REDUX
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showSearch, selectCountries} from '../../../actions'


import {ReactSelectize, SimpleSelect, MultiSelect} from 'react-selectize';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


import DatePeriod from './DatePeriod'

import SelectDuration from './SelectDuration'

import Paxes from './Paxes'

const persons = [
    {value: 0, name: 'Oliver Hansen'},
    {value: 1, name: 'Van Henry'},
    {value: 2, name: 'April Tucker'},
    {value: 3, name: 'Ralph Hubbard'},
    {value: 4, name: 'Omar Alexander'},
    {value: 5, name: 'Carlos Abbott'},
    {value: 6, name: 'Miriam Wagner'},
    {value: 7, name: 'Bradley Wilkerson'},
    {value: 8, name: 'Virginia Andrews'},
    {value: 9, name: 'Kelly Snyder'},
];


class SearchInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {expanded: false }; //values: this.props.countries.selected , countries: this.props.countries
    }

    // handleChange = (event, expanded) => {
    //     this.setState({expanded: expanded});
    // };
    handleChange = (event, index, values) => {
        //  this.setState({values});
       console.log('index', index);
        console.log('values', values);
        this.props.selectCountries(values)
     };


    selectionRenderer = (initValues) => {


        let values  = this.props.countries.selected;
         let c = this.props.countries.all;

         console.log('values',values);

        switch (values.length) {
            case 0:
                return '';
            case 1:
                //console.log('render',values[0].label)
                return  values[0].label;
            case 2:
                return values[0].label + ', ' + values[1].label;
            case 3:
                return values[0].label + ', ' + values[1].label + ', ' + values[2].label;
            default:
                return `${values.length} names selected`;
        }
    }

    menuItems(countries) {
        // return countries.all.map((country) => (
        //     <MenuItem
        //         key={country.valueKey}
        //         insetChildren={true}
        //         checked={this.state.values.indexOf(country.valueKey) > -1}
        //         value={country.valueKey}
        //         primaryText={country.label}
        //     />
        // ));

        // console.log('menuItems',this.props.countries.selected)


        // let ss = Object.assign({},this.props.countries.selected);
        // console.log('ss',ss);
        return countries.all.map((country) => {


            return (<MenuItem
                key={country.valueKey}
                insetChildren={true}
                checked={_.includes(this.props.countries.selected, country)} //indexOf(country.valueKey) > -1
                value={country.valueKey}
                primaryText={country.label}
            />)
        });



    }

    render() {

        const options = ["Россия", "Чехия", "Испания", "Италия", "Греция"].map(function (fruit) {
            return {label: fruit, value: fruit}
        });

        const {search, countries  } = this.props;



        return (




            <AnimakitExpander expanded={search.show} align="left">
                {/*<TextField*/}
                {/*defaultValue="Поиск"*/}
                {/*floatingLabelText="Floating Label Text"*/}
                {/*fullWidth={true}*/}
                {/*/>*/}
                <div className="searcher-div">
                    <SelectField

                        multiple={true}
                        fullWidth={false}
                        hintText="Select a country"
                        value={countries.selected}
                        onChange={this.handleChange}
                        selectionRenderer={this.selectionRenderer}
                    >
                        {this.menuItems(countries)}
                    </SelectField>
                    <DatePeriod />
                    <SelectDuration />
                    <Paxes />
                    {/*<MultiSelect placeholder="Select 2 fruits" options={options} maxValues={3}/>*/}
                </div>
            </AnimakitExpander>


        )
    }
}


const mapStateToProps = (state) => {
    return {
        search: state.searchReducer,
        countries: state.countriesReducer
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        // addNewUser: bindActionCreators(addNewUser, dispatch),
        // newMessage: bindActionCreators(newMessage, dispatch),
        selectCountries: bindActionCreators(selectCountries, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)



