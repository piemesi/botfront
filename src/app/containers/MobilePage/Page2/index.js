import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500, purple700,  cyan500, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    purple500,
    white, darkBlack, fullBlack, lightBlue800,  cyan800, cyan900} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {fade} from 'material-ui/utils/colorManipulator';

import spacing from 'material-ui/styles/spacing';



import '../../../css/main.less'


 import {} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper';
 import FontAwesome from 'react-fontawesome';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
/**
 * With the `maxHeight` property set, the Select Field will be scrollable
 * if the number of items causes the height to exceed this limit.
 */

const style = {

    width: "360px",
    padding: "0px 30px",
    background: white,
    borderRedius:"2px",

    // height: 100,
    // width: 100,
    // margin: 20,
    // textAlign: 'center',
    display: 'inline-block',
    textAlign:"left"
};
const styles = {
    uploadButton: {
        verticalAlign: 'middle',
        border:'1px solid', borderRadius:'3px', marginTop:'35px',
        borderColor: white,
        marginBottom:'27px',
        paddingBottom:'36px'
    },
    uploadInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,

    },
};




const muiTheme = getMuiTheme({
    // palette: {
    //     accent1Color: deepOrange500,
    //     textColor: cyan500,
    //
    // },
    palette: {
        accent1Color: deepOrange500,
        primary1Color: purple500, //cyan500,
        primary2Color: cyan700,
        primary3Color: grey400,
        // accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
});


import SelectFieldEx from './SelectField'
import RequestSentEx from './RequestSent'
import DatePickerEx from './DatePickerEx';

class StartPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
        };
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    };

    render() {
        const standardActions = (
            <RaisedButton
                label="Ok"
                fullWidth={true}
                primary={true}
                onTouchTap={this.handleRequestClose}
            />
        );

        return (

        <main className="sso-form">
            <Paper style={style} zDepth={3} rounded={false} className="sso-form__layout sso-form__login-form  "  >

                    <h1  >{this.props.page == 2 ? 'Заявка на отбор в смену' : 'Заявка на работу в качестве куратора в период'}</h1>
                    {this.props.page == 1 ? <SelectFieldEx /> : <DatePickerEx />}





            </Paper>
        </main>




        );
    }
}


export default StartPage;

