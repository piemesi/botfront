import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as colors from 'material-ui/styles/colors';

import Feedback from './FeedbackForm';

class AuthButton extends React.Component {
    state = {
        open: false,
    };
    handleOpen = (e) => {
        e.preventDefault();
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onClick={this.handleClose}
                // keyboardFocused={true}
            />
        ];

        return (<div>
            <div className="header-row"  >
                <a href="/"><img width={150} src="/images/logoBMT2.jpg" /></a>


                <div>
                    <h2>BotMe.TOP - сервис управления каналами Telegram </h2>
                    <p style={{color: colors.grey600}}>Для владельцев каналов и SMM-менеджеров. Пользование
                        сервисом <a href="" onClick={this.handleOpen}>бесплатно.</a>
                    </p>
                </div>
            </div>
            <Dialog
                title="BotMe.Top"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <div>
                <p>Данный сервис создавался для личных нужд и не преследует коммерческих целей. <br/>Он помогает мне
                    управлять каналами и постингами в Telegram (который стал для меня полезным инструментом
                    коммуникации).</p>
                <p>Убежден, что кому-то еще он вполне может быть полезен.  </p>
                <p>Если в процессе работы с сервисом у вас будут возникать проблемы или ошибки в работе, пожелания или
                    идеи по усовершенствованию сервиса - был бы рад если вы напишите о них через форму, указанную
                    ниже.</p>
                </div>

                <Feedback />

            </Dialog>
        </div>)
    }

}


export default AuthButton;
