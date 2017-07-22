import React, {Component} from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import * as colors from 'material-ui/styles/colors';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import SaveBtn from 'material-ui/svg-icons/content/save';


import {apiUrl} from '../../../../config/config.json';
//REDUX
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'
const style = {
    btnAdd: {
        marginLeft: '20px'
    },
    flexDivStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "flex-end"
    },
    calendarInput: {
        margin: '0',
        maxWidth: '200px'

    }
}
import Toggle from 'material-ui/Toggle';


import IconButton from 'material-ui/IconButton';
import DateTimePicker from '../../containers/Pages/DateTimeSelect'


const styles = {

    underlineStyle: {
        borderColor: colors.orange500,
    },

};
import './channel.scss';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AddIcon from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';

class ChannelPage extends Component {

    constructor(props) {
        super(props)

        this.dates = [];
        this.periodsLast = 0;
        this.state = {
            title: '',
            telegramId: '',
            managerId: '',
            titleErr: '',
            telegramIdErr: '',
            managerIdErr: '',
            data: null,
            open: false,
            currentChannelId: this.props.channels.current,
            list: []

        };


    }


    getChannels(companyId) {
        let channels = this.props.getChannels(companyId);

        channels.then(r => {
            let {list, current = null} = this.props.channels;




            let {title, manager_account: manager_id, telegram_id} = list.length ? current ? _.find(list,{id:current}) : list[0] : {
                manager_account: '',
                telegram_id: '',
                title: ''
            };

            if (list.length && !current) {
                current = list[0].id;
                this.props.setCurrentChannel(current);
            }

            this.setState({
                title, managerId: manager_id, telegramId: telegram_id, currentChannelId: current,
                list: list
            })
        })
    }


    componentWillMount = () => {
        this.getChannels(1)// @toDo set companyId


    }


    _handleTextFieldMenegerIdChange = (e) => {
        this.setState({
            managerId: e.target.value,
            data: {...this.state.data, managerId: e.target.value}
        });
    };
    _handleTextFieldTelegramIdChange = (e) => {

        this.setState({
            telegramId: e.target.value,
            data: {...this.state.data, telegramId: e.target.value}
        });
    };
    _handleTextFieldTitleChange = (e) => {
        this.setState({
            title: e.target.value,
            data: {...this.state.data, title: e.target.value}
        });
    };

    toggleMenu = (channel) => {
        this.props.setCurrentChannel(channel);

        let {list} = this.props.channels;


        let {title, manager_account: manager_id, telegram_id} = channel ? _.find(list, {id: channel}) : {
            manager_account: '',
            telegram_id: '',
            title: ''
        };


        this.setState({
            title,
            managerId: manager_id, telegramId: telegram_id, currentChannelId: channel
        })

    };

    saveData() {
        // http://telegram.bot:88/hb/save

        // fetch(API_URL+"/todos/store", {

        console.log('CURRENT', this.state)


        if (this.state.title.length < 2) {
            this.setState({
                titleErr: 'укажите название канала'
            });
            return false;
        }

        if (this.state.telegramId.length < 2) {
            this.setState({
                telegramIdErr: 'Укажите id канала'
            })
            return false;
        }

        if (this.state.managerId.length < 2) {
            this.setState({
                managerIdErr: 'Укажите id менеджера - админа канала'
            })
            return false;
        }


        let {title, telegramId, managerId} = this.state


        let bodyData = new FormData();
        // data.append("Token", token);
        bodyData.append("title", title);
        bodyData.append("telegram_id", telegramId);
        bodyData.append("company_id", this.props.channels.companyId);
        bodyData.append("manager_id", managerId);


        console.log('data', bodyData);

        let upd = this.props.channels.current ? '/' + this.props.channels.current : '';


        fetch(`${apiUrl}/channel${upd}`, {
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json',
            // },
            method: 'post',
            body: bodyData

            //     JSON.stringify({
            //     data
            // })

            // body: this.state.data.header
        }).then((response) => {
            this.getChannels(this.props.channels.companyId)

        });
    }


    handleToggle = () => this.setState({open: !this.state.open});

    render() {


        return (
            <div>
                <form>


                    <div>

                        <Toggle
                            label="Список каналов"
                            defaultToggled={this.state.open}
                            onToggle={this.handleToggle}
                            labelPosition="right"
                            style={{margin: '20px 0 50px', fontSize: 14, maxWidth: '180px'}}
                        />


                    </div>


                    <div className="channel_desc">
                        <TextField
                            key="titlekey"
                            hintText="Название канала"
                            onChange={this._handleTextFieldTitleChange.bind()}
                            value={this.state.title}
                            errorText={this.state.titleErr }
                        />

                        <TextField
                            key="tikey"
                            hintText="Telegram Id канала"
                            onChange={this._handleTextFieldTelegramIdChange.bind()}
                            value={this.state.telegramId }
                            errorText={this.state.telegramIdErr  }
                        />

                        <TextField
                            key="mikey"
                            hintText="Manager Id канала"
                            onChange={this._handleTextFieldMenegerIdChange.bind()}
                            value={this.state.managerId }
                            errorText={this.state.managerIdErr }
                        />

                        <Toggle
                            label="Подтвержден"
                            disabled={true}
                            defaultToggled={false}

                            labelPosition="right"
                            style={{maxWidth: '100px', fontSize: '12px', marginRight: '30px'}}

                        />
                    </div>


                    <RaisedButton label="Сохранить"
                                  onClick={this.saveData.bind(this)}
                                  fullWidth={true}
                                  style={{margin: '50px 10px'}}
                                  primary={true} icon={<SaveBtn/>}
                                  className="channel-post-timer"
                    />

                </form>

                <Drawer width={300} openSecondary={true} open={this.state.open}>
                    <AppBar iconElementLeft={<IconButton
                        onTouchTap={this.handleToggle}><NavigationClose /></IconButton>}
                            title="Каналы"/>
                    <Menu>
                        {this.state.list.map((ch) => {

                            return <MenuItem key={ch.id}
                                             checked={this.props.channels.current === ch.id}
                                             onTouchTap={() => this.toggleMenu(ch.id)}
                                             primaryText={ch.title}/>
                        })}


                    </Menu>
                    <Divider />
                    {this.props.channels.list.length < 5 ? <MenuItem
                        key="addBtn"
                        style={{color: '#ccc'}}
                        primaryText="Добавить"
                        onTouchTap={() => this.toggleMenu(null)}
                        leftIcon={
                            <AddIcon style={{color: '#559'}}/>
                        }
                    /> : <MenuItem
                        disabled={true}
                        key="addBtn"
                        style={{color: '#ccc'}}
                        primaryText="Максимальное количество каналов для аккаунта"

                    />
                    }

                </Drawer>

            </div>

        )
    }

}


function mapStateToProps(state) {
    return {
        channels: state.channelReducer,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentChannel: bindActionCreators(actions.setCurrentChannel, dispatch),
        getChannels: bindActionCreators(actions.getChannels, dispatch)
    }
}


const withMui = muiThemeable()(ChannelPage);

export default connect(mapStateToProps, mapDispatchToProps)(withMui)


