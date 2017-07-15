import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import FontAwesome from 'react-fontawesome';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';



import Slider from 'material-ui/Slider';


import TextField from 'material-ui/TextField';

/**
 * With the `maxHeight` property set, the Select Field will be scrollable
 * if the number of items causes the height to exceed this limit.
 */
import EmailPageBtn from '../EmailPageBtn';

const style = {

    width: "360px",
    padding: "0px 30px",
    background: "linear-gradient(-125deg, #792B8E, #532F91)",
    borderRadius:"2px",
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
        border:'none', borderRadius:'3px', marginTop:'35px',
        borderColor: colors.white,
        marginBottom:'27px',
        paddingBottom:'36px',
        letterSpacing:'0.7px',
        fontSize: '12px'

    },
    reSendButton: {
        verticalAlign: 'middle',
        border:'none', borderRadius:'3px', marginTop:'5px',
        borderColor: colors.white,
        marginBottom:'27px',
        paddingBottom:'36px',
        letterSpacing:'0.7px',
        fontSize: '12px'

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


const coolDownSecs = 5;


export default class EmailPage extends Component {

    constructor(props, context) {
        super(props, context);



        this.sendOnceAgain = <FlatButton
            fullWidth={true}
            onTouchTap={this.handleTouchTap}
            label="Отправить пароль еще раз"
            labelPosition="before"
            labelStyle={{color: colors.deepOrangeA400}}
            style={styles.reSendButton}
            containerElement="label"
        />;




        this.state = {
            h1 : <h1 className="form__title">
                Войдите <br/> для оформления заявки<br/>
            </h1>,
            open: false,
            userEmail: "",
            errorText: '',
            floatingLabel: "E-mail или телефон",
            textFieldType: null,
            rbTitle: 'Далее',
            cooldownSeconds: coolDownSecs,
            displayBottomText: false,
            bottomInfo:null
        };
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };


    timer = () => {
        let s = this.state.cooldownSeconds
        if(s > 1) {
            this.setState({
                cooldownSeconds: s-1,
            });
        }else{
            clearInterval(this.timer);
            this.setState({
                displayBottomText: false,
                cooldownSeconds: coolDownSecs,
                bottomInfo:this.sendOnceAgain
            });


        }


    }

    handleTouchTap = () => {

        if(this.state.userEmail.length < 7) {
            this.setState({ errorText: 'Неверный формат' })
        }else{
            this.setState({
                h1: <h1 className="form__title">
                    Введите пароль<br/>
                    <span >который мы отправили вам на {this.state.userEmail}</span>
                </h1>,
                open: true,
                errorText:'',
                textFieldType:'password',
                floatingLabel: 'Пароль',
                rbTitle: "Войти",
                displayBottomText: true,
                bottomInfo:null

            });

            this.timer = setInterval(this.timer, 1000);

        }


    };

    _handleTextFieldChange= (e) => {
        this.setState({
            userEmail: e.target.value
        });
    };

    render() {

        const standardActions = (


            <FlatButton label="Ok" secondary={true} onTouchTap={this.handleRequestClose} />

        );



        return (
            <div>

                <main className="sso-form">
                    <Paper style={style} zDepth={3} rounded={false} className="sso-form__layout sso-form__login-form  sso-paper"  >


                        {this.state.h1}

                        <TextField
                            hintText=""
                            floatingLabelText={this.state.floatingLabel}
                            // floatingLabelFixed={true}
                            floatingLabelStyle={{color:colors.grey500}}
                            hintStyle={{color:colors.white}}
                            fullWidth={true}
                            inputStyle={{color:colors.white}}
                            value={this.state.userEmail}
                            onChange={this._handleTextFieldChange}
                            type={this.state.textFieldType}
                            errorText= {this.state.errorText}
                        />

                        <RaisedButton
                            label={this.state.rbTitle}
                            secondary={true}
                            fullWidth={true}
                            onTouchTap={this.handleTouchTap}
                            style={{border:'none', borderRadius:'5px', marginTop: "32px",
                                marginBottom:'30px'
                               }}
                        />


                        <Dialog
                            open={this.state.open}
                            title="Пароль отправлен"
                            actions={standardActions}
                            modal={false}
                            onRequestClose={this.handleRequestClose}
                            style={{padding: "0" }}
                        >на указанный e-mail<br /><u>{this.state.userEmail}</u>

                        </Dialog>



                        <div onClick={this.handleTouchTap} style={{
                            marginBottom: "35px",
                            color: colors.grey500,
                            display:this.state.displayBottomText ? '' : 'none'}}>Отправить пароль еще раз можно через {this.state.cooldownSeconds} секунд</div>
                        {this.state.bottomInfo}

                    </Paper>
                </main>




            </div>
        );
    }
}