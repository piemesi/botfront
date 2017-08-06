import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


//REDUX
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'

/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class VerticalLinearStepper extends React.Component {

    state = {
        finished: false,
        stepIndex: 0,
        noteState: 'none',
        tempAuth: ''
    };

    componentWillMount(){
        let promis = this.props.getUserAuthHash();

        promis.then(r=>{
            let {tempAuth} = this.props.channels;
            this.setState({
                tempAuth
            })
        })
    }


    toggleNote=()=>{
        this.setState({
            noteState: this.state.noteState === 'block' ? 'none' : 'block',

        });
    };
    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    renderStepActions(step) {
        const {stepIndex} = this.state;

        let labels=["Получить код", ""];

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this.handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Вернуться"
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

        let linkHash = `https://t.me/softmadebot?start=${this.state.tempAuth}`;

        return (
            <div className="StepperDiv" style={{maxWidth: 380,   margin: 'auto'}}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Шаг №1: Регистрация менеджера каналов</StepLabel>
                        <StepContent>
                            <p>
                                Для подтверждения аккаунта менеджера каналов (аккаунт Telegram) отправьте сообщение Telegram-боту Softmadebot:
                                <br/><span className="sense">- Просто перейдите по <a target="_blank" href={linkHash}>ссылке</a> и Вы попадете в чат с нужным Telegram-ботом Softmadebot;</span>
                            </p>

                            <h3 className="note" onClick={this.toggleNote}>*Если вы заходите через web-версию Telegram</h3>
                            <div style={{display:this.state.noteState }}>
                            <p >В открывшемся окне нажмите кнопку "OPEN IN WEB"
                                <br/>
                                <img src="/images/webTel.png" style={{maxHeight:'300px'}} /> </p>
                            </div>
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Шаг №2: Выполните команду старт в чате с Telegram-ботом Softmadebot</StepLabel>
                        <StepContent>


                            <h3>Выполните команду старт</h3>
                            <p>В чате с ботом регистратором просто выполните команду /start (<span className="sense">нажмите на кнопку "start"</span>) - И Ваш аккаунт в Telegram будет зарегистрирован в BotMe.Top как менеджер каналов </p>
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Шаг №1: Альтернативный поиск регистрационного бота </StepLabel>
                        <StepContent>
                            <p>
                                Вы также можете пройти регистрацию Вашего менеджер-аккаунта в BotMe.Top - просто найдите Telegram-бота Softmadebot:
                                <br/>В поле search введите "softmadebot" - и отправьте ему сообщение "/start {this.state.tempAuth}"
                            </p>
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>
                {finished && (
                    <p style={{margin: '20px 0', textAlign: 'center'}}>
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                this.setState({stepIndex: 0, finished: false});
                            }}
                        >
                            Click here
                        </a> to reset the example.
                    </p>
                )}
            </div>
        );
    }
}

import muiThemeable from 'material-ui/styles/muiThemeable';

function mapStateToProps(state) {
    return {
        channels: state.channelReducer,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserAuthHash: bindActionCreators(actions.getUserAuthHash, dispatch)
    }
}


const withMui = muiThemeable()(VerticalLinearStepper);

export default connect(mapStateToProps, mapDispatchToProps)(withMui)
