import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import TextField from 'material-ui/TextField';

import ContentSend from 'material-ui/svg-icons/content/send';

const style = {
    margin: 12,
};

//REDUX
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'

class FeedbackForm extends React.Component {


    state = {
        msg: null, errorTxt: null, isSuccess: null
    };


    sendFeedback = () => {
        console.log('this.props', this.props)
        if (!this.props.companyId) {
            this.setState({
                errorTxt: 'Для отправки сообщения необходимо авторизоваться через Telegram (первый пункт "ВОЙТИ")'
            });

            return false;
        }

        if (!this.state.msg || this.state.msg.toString().length < 3) {
            this.setState({
                errorTxt: 'Сообщение не информативно'
            });

            return false;
        }

        if (this.state.msg.toString().length > 500) {
            this.setState({
                errorTxt: 'Сообщение слишком большое [' + this.state.msg.toString().length + ' символов]. Максимум 500 символов'
            });

            return false;
        }


        this.props.sendFeedback(this.state.msg.toString().trim(), this.props.companyId).then(r => {
            if (r.value && r.value.success && r.value.success === true) {
                this.setState({
                    isSuccess: <span style={{fontWeight:'bold',color:'green'}}>Ваше сообщения отправлено. Я отвечу вам в Telegram</span>
                });
            } else {
                this.setState({
                    isSuccess: false,
                    errorTxt: 'Ваше сообщения НЕ отправлено! Поробуйте, пожалуйста, позже'
                });
            }

        });

    };

    changeMsg = (e, msg) => {
        this.setState({
            msg, errorTxt: null
        });
    };

    render() {


        return (
            <div>
                {this.state.isSuccess ||
                <div
                    style={{display: 'flex', alignItems: 'flex-end', flexWrap: 'nowrap'}}>
                    <TextField
                        hintText="Для отправки сообщения нажмите на кнопку справа"
                        multiLine={true}
                        rows={2}
                        rowsMax={8}
                        onChange={this.changeMsg}
                        floatingLabelText="Введите ваше сообщение..."
                        fullWidth={true}
                        value={this.state.msg}
                        errorText={this.state.errorTxt}
                    />

                    <FlatButton
                        onClick={this.sendFeedback}
                        backgroundColor="#a4c639"
                        hoverColor="#8AA62F"
                        icon={<ContentSend color={"white"}/>}
                        style={style}
                    /></div>}
            </div>)
    }

}

function mapStateToProps(state) {
    return {
        companyId: state.channelReducer.companyId,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendFeedback: bindActionCreators(actions.sendFeedback, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm)

