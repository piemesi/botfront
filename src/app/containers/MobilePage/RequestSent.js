import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


import MenuItem from 'material-ui/MenuItem';

const items = [];
for (let i = 0; i < 100; i++) {
    items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`}/>);
}

/**
 * With the `maxHeight` property set, the Select Field will be scrollable
 * if the number of items causes the height to exceed this limit.
 */
export default class RequestSentEx extends Component {
    state = {
        value: 10,
    };

    handleChange = (event, index, value) => {
        this.setState({value});
    };

    render() {
        return (
            <div>
                <text>Your request is sent</text><br />

                <FlatButton style={{marginLeft:'170px'}} label="Submit" pimary={true} />
            </div>
    );
    }
    }