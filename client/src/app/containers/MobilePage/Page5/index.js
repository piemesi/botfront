import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {lightBlue800,white, cyan800, cyan900} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import FontAwesome from 'react-fontawesome';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
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
export default class LoginBlock extends Component {

    nextPage() {

    }

    render() {
        return (
            <div>

                <main className="sso-form">
                    <Paper style={style} zDepth={3} rounded={false} className="sso-form__layout sso-form__login-form  sso-paper"  >
                        <h1 className="form__title">
                            Войдите как родитель ученика ОЦ "Сириус"
                        </h1>


                        <RaisedButton
                            fullWidth={true}
                            // href="https://github.com/callemall/material-ui"
                            target="_blank"
                            label="Войти как Алексей"
                            labelColor={white}
                            labelStyle={{letterSpacing:"0.7px"}}
                            buttonStyle={{border:'none', borderRadius:'0px'}}
                            // secondary={true}
                            className="login-form__vk"
                            overlayStyle={{backgroundColor:"#507298",border:'none', borderRadius:'0px'}}
                            icon={<Link to="/mobile/1"><FontAwesome spin="" onClick={this.props.nextPage} name="vk" size="2x" style={{color:white}}/></Link>}
                        />
                        <div className="login-form__line">
                            <span>или</span>
                        </div>

                        <EmailPageBtn/>


                    </Paper>
                </main>




            </div>
        );
    }
}