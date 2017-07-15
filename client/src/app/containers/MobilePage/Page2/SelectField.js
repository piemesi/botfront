import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


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

/**
 * With the `maxHeight` property set, the Select Field will be scrollable
 * if the number of items causes the height to exceed this limit.
 */
export default class SelectFieldEx extends Component {
    state = {
        value: null,
        value2: 1
    };

    handleChange = (event, index, value) => {
        this.setState({value});
    };

    render() {
        return (
            <div>
                <SelectField
                    floatingLabelText="Направление"
                    value={this.state.value}
                    onChange={this.handleChange}
                    maxHeight={200}
                    fullWidth={true}
                >
                    {items}
                </SelectField><br />
                <SelectField
                    floatingLabelText="Смена"
                    value={this.state.value2}
                    onChange={this.handleChange}
                    maxHeight={200}
                    fullWidth={true}
                >
                    {items2}
                </SelectField>
                {/*<TextField*/}
                    {/*hintText="Hint Text"*/}
                    {/*floatingLabelText="Floating Label Text"*/}
                {/*/><br />*/}
                <Link to="/start/2"><FlatButton style={{marginLeft:'200px',marginTop:'30px',marginBottom:'20px'}} label="Отправить" secondary={true} /></Link>
            </div>
    );
    }
    }