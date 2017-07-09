import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500, purple700,  cyan500, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    purple500,
    white, darkBlack, fullBlack} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {fade} from 'material-ui/utils/colorManipulator';

import spacing from 'material-ui/styles/spacing';



import '../../css/main.less'




const styles = {
    container: {
        textAlign: 'center',
        fontFamily: "'Roboto', sans-serif"
    },
    stepper: {
        textAlign: 'left',
        paddingTop: 20,
    },
    searchDiv: {
        display: "flex",
        alignContent: "start",

    },
    footerNav: {}
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
import DatePicker from 'material-ui/DatePicker';

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


            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="page-wrap">


                    <div style={{width: "300px", margin: "5px"}}>
                        <h2>Заявка на отбор в смену</h2>
                        <SelectFieldEx />
                    </div>

                    <div style={{width: "300px", margin: "5px"}}>
                        <h2>Заявка на отбор в смену</h2>
                        <RequestSentEx />
                    </div>


                    <Dialog
                        open={this.state.open}
                        title="Hallo, Alexey"
                        actions={standardActions}
                        modal={false}
                        onRequestClose={this.handleRequestClose}
                        style={{padding:"0"}}
                    >

                        Some information for you
                        <DatePicker hintText="Date Picker" />
                    </Dialog>

                    <RaisedButton
                        label="open popup"
                        secondary={true}
                        onTouchTap={this.handleTouchTap}
                    />


                </div>
            </MuiThemeProvider>

        );
    }
}


export default StartPage;

