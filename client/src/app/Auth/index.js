import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {botName} from '../config/config.json';

import {withRouter} from 'react-router-dom';

//REDUX
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/index'
import muiThemeable from 'material-ui/styles/muiThemeable';
import {Link, Redirect} from "react-router-dom";
import {Toggle} from "material-ui";
/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class VerticalLinearStepper extends React.Component {

    constructor(props) {
        super(props);


        this.endTs = 0;
        this.state = {
            finished: false,
            stepIndex: this.props.channels.companyId || 0,
            noteState: 'none',
            tempAuth: null,
            successLogout: false,
            loading: true
        };
    }


    signOut(cb) {
        this.setState({stepIndex: 0, successLogout: true, loading: true, tempAuth: null});


        this.props.logout();

        setTimeout(() => {
            this.getUserAuthHash();
        }, 200);

        setTimeout(cb, 2200);
    }

    askSoftmade(ls) {
        let promis = this.props.getUserAuthHashData(ls);
        let d = new Date();
        if (this.endTs < d.getTime()) {
            this.stopAskWebhook(true)

        } else {
            console.log('endTs', this.endTs)
        }

        promis.then(r => {
            let decodedData;

            try {
                decodedData = JSON.parse(this.props.channels.authData);
                let {id, username} = decodedData;
                if (id && username) {
                    this.setState({
                        managerId: username,
                        data: {...this.state.data, managerId: username}
                    })

                    this.stopAskWebhook()
                    //сохранить

                    this.props.identUser(decodedData, ls, this.props.channels.authData).then(r => {

                    })
                }
            } catch (error) {
                decodedData = {};
                console.log('error is', error);
                if (this.endTs < d.getTime()) {
                    this.stopAskWebhook(true)

                } else {
                    //    this.timer = setTimeout(() => this.askSoftmade(ls), 3000);
                }

            }

            console.log('decodedData', decodedData);

            // отправляем key на сервер -> создаем или выбираем компани
            // храним мд5 от данных и проверяем в bmt_token -> и проверяем его при входе и убиваем authKey
            // если в редис уже нет этого ключа - то сообщаем о том, что опоздал -- надо отправить еще раз просим перейти по новой ссылке и опять повторяем аут
            // если все гуд - сообщаем, что все гуд
            // toDo createChannel with decodded data
        }).catch(e => {
            console.log('error is (not ready', e);
            if (this.endTs < d.getTime()) {
                this.stopAskWebhook(true)

            } else {
                this.timer = setTimeout(() => this.askSoftmade(ls), 2000);
            }
        });
    };

    stopAskWebhook(toBegin = false) {
        clearTimeout(this.timer);
        if (!this.props.channels.companyId && toBegin) {

            this.setState({stepIndex: 0});
        }
    };

    componentWillUnmount() {
        this.stopAskWebhook()
    }

    getUserAuthHash = () => {
        let promis = this.props.getUserAuthHash();

        promis.then(r => {

            let {tempAuth} = this.props.channels;

            this.setState({
                tempAuth,
                loading: false
            })
        })
    };

    componentWillMount() {
        this.props.getUserAuthHash();
    }

    beginCheckingData() {

        let ls = localStorage.getItem('authKey') || 0;
        console.log('11aithKey=', ls)
        if (ls) {

            if (!this.state.tempAuth) {

                this.setState({
                    loading: true
                });
                this.getUserAuthHash();

            }


            let d = new Date();
            let seconds = 60 * 1;
            this.endTs = d.setTime(d.getTime() + (seconds * 1000));
            this.timer = setTimeout(() => this.askSoftmade(ls), 10);
        }
    };


    toggleNote = () => {
        this.setState({
            noteState: this.state.noteState === 'block' ? 'none' : 'block',

        });
    };
    handleNext = () => {
        const {stepIndex} = this.state;

        if (stepIndex + 1 === 1) {
            this.beginCheckingData();
        } else {
            this.stopAskWebhook();
        }

        if (stepIndex + 1 === 3) {
            return (
                <Redirect to={{
                    pathname: "/add/1/2",

                }}/>
            );

        }

        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;

        let step = stepIndex - 1;

        if (step === 1) {
            this.beginCheckingData();
        } else {
            this.stopAskWebhook();
        }

        if (stepIndex > 0) {
            this.setState({stepIndex: step});
        }
    };

    renderStepActions(step) {
        const {stepIndex} = this.state;

        let labels = ["Получить код", ""];


        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={stepIndex === 0 ? 'Войти' : stepIndex === 2 ? 'Войти' : 'Далее'}
                    disabled={stepIndex === 1 ? this.props.channels.companyId ? false : true : false}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this.handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Назад"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const {finished, stepIndex} = this.state;

        let linkHash = `https://t.me/${botName}?start=${this.state.tempAuth}`;

        return (
            <div className="StepperDiv" style={{maxWidth: 550, margin: 'auto'}}>
                {this.state.successLogout ?
                    <div>
                        <h3>Вы успешно разлогинились.</h3>
                        <p>Досвидули!</p>
                    </div>
                    : <Stepper activeStep={stepIndex} orientation="vertical">
                        <Step>
                            <StepLabel>Авторизация через Telegram</StepLabel>
                            <StepContent>
                                <p>
                                    Для авторизации используйте Ваш аккаунт в телеграме.
                                </p>


                                {this.renderStepActions(0)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Войти с помощью Telegram</StepLabel>
                            <StepContent>
                                {this.props.channels.companyId ?
                                    <div><p>
                                        Вы авторизованы
                                    </p>   <p><RaisedButton disabled={this.props.channels.companyId} secondary={true}
                                                            label="Перейти"/>
                                        <br/><span style={{color: '#ccc'}}>команда СТАРТ в регистраионном боте [BotMeTop_Bot]</span>
                                    </p>


                                    </div> :
                                    <div>
                                        {!this.state.loading ? <div>
                                            <p>
                                                Если у Вас установлено приложение Telegram, перейдите по ссылке и
                                                нажмите
                                                "старт"
                                            </p>   <p><Link to={linkHash} target="_blank"><RaisedButton
                                            disabled={this.props.channels.companyId} secondary={true}
                                            label="Перейти"/></Link>
                                            <br/><span style={{color: '#ccc'}}>команда СТАРТ в регистраионном боте [BotMeTop_Bot]</span>
                                        </p>

                                            <h3>Выполните команду старт</h3>
                                            <p>В чате с ботом регистратором просто выполните команду /start (<span
                                                className="sense">нажмите на кнопку "start"</span>)
                                                - И Ваш аккаунт в Telegram будет зарегистрирован в BotMe.Top как
                                                менеджер
                                                каналов </p>

                                            <br/>
                                            <Toggle
                                                labelStyle={{textDecoration: 'underline'}}
                                                labelPosition="right"
                                                onToggle={this.toggleNote} label="*Если вы заходите через web-версию
                                Telegram"/>
                                            <br/>

                                            <div style={{display: this.state.noteState}}>
                                                <p >В открывшемся окне нажмите кнопку "OPEN IN WEB"
                                                    <br/>
                                                    <img src="/images/webTel.png" style={{maxHeight: '300px'}}/></p>
                                            </div>
                                        </div> :
                                            <img src="/images/run_rabbit_3.gif"/>
                                        }
                                    </div>
                                }


                                <br/>
                                {this.renderStepActions(1)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Перейти к управлению аккаунтом</StepLabel>
                            <StepContent>

                                <div style={{margin: '12px 0'}}><Link onlyActiveOnIndex={true} to="/add/1/2">
                                    <RaisedButton sty primary={true} label="Войти"/>
                                </Link>

                                    <FlatButton
                                        label="Выйти"
                                        style={{color: '#ccc', marginLeft: '20px'}}
                                        primare=""
                                        disableTouchRipple={true}
                                        disableFocusRipple={true}
                                        onTouchTap={() => this.signOut(() => this.setState({successLogout: false}))}
                                        // this.props.history.push('/')
                                    />
                                </div>
                            </StepContent>
                        </Step>

                    </Stepper>}

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        channels: state.channelReducer,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserAuthHash: bindActionCreators(actions.getUserAuthHash, dispatch),
        getUserAuthHashData: bindActionCreators(actions.getUserAuthHashData, dispatch),
        identUser: bindActionCreators(actions.identUser, dispatch),
        logout: bindActionCreators(actions.logout, dispatch),
    }
}


let withMui = muiThemeable()(VerticalLinearStepper);
withMui = withRouter(withMui);

export default connect(mapStateToProps, mapDispatchToProps)(withMui)
