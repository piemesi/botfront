import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';


import MenuItem from 'material-ui/MenuItem';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';


 const fields = [
    {id:1,title:'Наука'},
    {id:2,title:'Творчество'},
    {id:3,title:'Образование'},
    {id:4,title:'Спорт'},

];
 const items=[];
items.push(<MenuItem value={null} key={0} primaryText=""/>)
fields.map((m) => {
    items.push(<MenuItem value={m.id} key={m.id} primaryText={m.title}/>);
});

const fields2 = [
    {id:1,title:'Математическая смена'},
    {id:2,title:'Творчество'},
    {id:3,title:'Образование'},
    {id:4,title:'Спорт'},

];
const items2=[];
items2.push(<MenuItem value={null} key={0} primaryText=""/>)
fields2.map((m) => {
    items2.push(<MenuItem value={m.id} key={m.id} primaryText={m.title}/>);
});




const optionsStyle = {
    maxWidth: 255,
    marginRight: 'auto',
    display: 'flex',
    flexDirection:'row',
    justifyItems:'space-between',
    justifyContent:'space-between'
};

const datePickerItem = {
    width: 140,
    marginRight:'15px',
    textAlign: 'left'
};

/**
 * With the `maxHeight` property set, the Select Field will be scrollable
 * if the number of items causes the height to exceed this limit.
 */
export default class DatePickerEx extends Component {
    constructor(props) {
        super(props);

        const minDate = new Date();
        const maxDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 1);
        minDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        maxDate.setHours(0, 0, 0, 0);

        this.state = {
            minDate: minDate,
            maxDate: maxDate,
            autoOk: true,
            disableYearSelection: false,
        };
    }

    handleChangeMinDate = (event, date) => {
        this.setState({
            minDate: date,
        });
    };

    handleChangeMaxDate = (event, date) => {
        this.setState({
            maxDate: date,
        });
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleClick(){
        window.location = '/temp/';
    }

    render() {
        return (
            <div>

                <div style={optionsStyle}>
                    <DatePicker
                        textFieldStyle={datePickerItem}
                        onChange={this.handleChangeMinDate}
                        autoOk={this.state.autoOk}
                        floatingLabelText="С"
                        defaultDate={this.state.minDate}
                        disableYearSelection={this.state.disableYearSelection}
                    />
                    <DatePicker
                        textFieldStyle={datePickerItem}
                        onChange={this.handleChangeMaxDate}
                        autoOk={this.state.autoOk}
                        floatingLabelText="По"
                        defaultDate={this.state.maxDate}
                        disableYearSelection={this.state.disableYearSelection}
                    />

                </div>



                 <FlatButton onClick={this.handleClick} style={{marginLeft:'200px',marginTop:'30px',marginBottom:'20px'}} label="Отправить" secondary={true} />

            </div>
        );
    }
    }