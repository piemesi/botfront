import React, {Component} from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import * as colors from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import  FA from 'react-fontawesome';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SaveBtn from 'material-ui/svg-icons/content/save';


import {apiUrl} from '../../config/config.json';
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


import CircularProgress from 'material-ui/CircularProgress';


import Toggle from 'material-ui/Toggle';


import _ from 'lodash'


import EditBody from './EditBody'


import IconButton from 'material-ui/IconButton';
import DateTimePicker from '../../containers/Pages/DateTimeSelect'


import ContentRemove from 'material-ui/svg-icons/content/remove';
const styles = {

    underlineStyle: {
        borderColor: colors.orange500,
    },

};
class AddPage extends Component {

    constructor(props) {
        super(props)

        this.dates = [];
        this.periodsLast = 0;
        this.state = {
            header: '',
            preview: '',
            data: null,
            days: null,
            daysArrRender: null,
            minutesToRead: null,
            need_link: false,
            isPending: false

        };


    }


    addPeriod = () => {

        let daysArr = this.state.days;
        let daysArrRender = this.state.daysRender;
        this.periodsLast = this.periodsLast + 1;
        let keyK = `periods_` + this.periodsLast;
        let itemK = this.periodsLast;

        daysArr.push(
            this.makeDaysItem(keyK, itemK))

        daysArrRender.push(
            <div key={"dr_"+keyK} className="daysRenderItem">
                {this.makeDaysItem(keyK, itemK)}
                {this.makeIconDaysDeleteBtn(itemK)}
            </div>
        )

        this.setState({
            days: daysArr,
            daysRender: daysArrRender
        })

    }


    removeDayItem = (item) => {

        let days = this.state.days
        let daysRender = this.state.daysRender

        this.setState({
            days: _.slice(days, item, item + 1),
            daysRender: _.slice(daysRender, item, item + 1),
        })


    }


    makeDaysItem = (key, i) => {
        return <DateTimePicker style={{width: '200px', 'margin': '5px'}}
                               value={null}
                               key={key}
                               ref={(r) => this.dates[i] = r}

        />
    }

    componentWillMount = () => {

        let days = [
            <DateTimePicker key="periods_0" ref={(r) => this.dates[0] = r} style={{width: '200px', 'margin': '5px'}}

            />
        ];

        let daysRender = [
            <div key="dr_0" className="daysRenderItem">
                <DateTimePicker key="periods_0" ref={(r) => this.dates[0] = r}
                                style={{width: '200px', 'margin': '5px'}}

                />
                {/*Закооментировали кнопку удаления времени поста - так как можно добавить только одно время*/}
                {/*<IconButton onClick={() => this.removeDayItem(0)}>*/}
                    {/*<ContentRemove />*/}
                {/*</IconButton>*/}
            </div>
        ];

        this.setState({
            days,
            daysRender
        })


    }

    handleChange = (event, logged) => {
        this.setState({need_link: logged});
    };

    _handleTextFieldMinutesToReadChange = (e) => {


        this.setState({
            minutesToRead: e.target.value,
            data: {...this.state.data, minutesToRead: e.target.value}
        });
    };
    _handleTextFieldPreviewChange = (e) => {


        this.setState({
            preview: e.target.value,
            data: {...this.state.data, preview: e.target.value}
        });
    };
    _handleTextFieldChange = (e) => {


        this.setState({
            header: e.target.value,
            data: {...this.state.data, header: e.target.value}
        });
    };

    saveData() {
        // http://telegram.bot:88/hb/save

        // fetch(API_URL+"/todos/store", {


        if (!this.props.channels.current) {
            this.setState({
                headerErr: 'Please choose channel in `channels`'
            })
            return false;
        }


        if (this.state.header.length < 2) {
            this.setState({
                headerErr: 'Please set header'
            })
            return false;
        }

        if (this.state.days.length < 1) {
            this.setState({
                headerErr: 'Please set dates of post publishing'
            })
            return false;
        }

        console.log('state', this.state)

        let {data} = this.state

        fetch(`${apiUrl}/get_token`, {method: 'get'});


        let bodyData = new FormData();
        // data.append("Token", token);
        bodyData.append("title", data.header);
        bodyData.append("text", this.reactQuillRef.state.text);
        bodyData.append("minutes_to_read", data.minutesToRead || 0);
        bodyData.append("preview", data.preview || null);
        bodyData.append("need_link", this.state.need_link);

        console.log("DATES are:", this.dates)

        let dates = [];
        this.dates.map((m) => {

            if (m && m.state.value) {
                console.log('dates:', m.state.value.toString())
                dates.push(m.state.value.toString())
            }

        })

        if (dates.length < 1) {
            this.setState({
                headerErr: 'Please set dates of post publishing'
            })
            return false;
        }


        bodyData.append("text", this.reactQuillRef.state.text);
        bodyData.append("dates", dates);

        // console.log('data', bodyData);

        let u = '/' + this.props.channels.current;

        this.setState({
            isPending: <CircularProgress size={60} thickness={7}/>
        });

        try{
            fetch(`${apiUrl}/savedata${u}`, {
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
                response.json().then((jsonReponse) => {
                    if (jsonReponse.success) {
                        this.setState({
                            isPending: <div style={{color: colors.green800}}>Пост успешно сохранен!</div>
                        });

                        setTimeout(()=>{
                            this.setState({
                                isPending: false
                            });
                        },2000)

                        // self.props.onTodoStore(jsonReponse.todo); // call onTodoStore
                        // self.setState({body: ''}); // empty our text input
                    }else{
                        this.setState({
                            isPending: 'Ошибка при сохранении. Напишите боту в поддержку вот это: ссылка_на_лог_ошибки' //@toDO
                        });
                    }
                }).catch(err=>{
                    console.log('err',err);
                    this.setState({
                        isPending: err
                    });
                })
            });
        }catch(e) {
            console.log('e',e);
            this.setState({
                isPending: e
            });

        }


    }

    makeIconDaysDeleteBtn = (i) => {
        return <IconButton onClick={() => this.removeDayItem(i)}>
            <ContentRemove />
        </IconButton>
    }

    render() {

        let output = this.state.isPending || <div>
                <TextField key="headerkey"
                           hintText="Введите заголовок"
                           fullWidth={true}
                           onChange={this._handleTextFieldChange.bind()}
                           value={this.state.header || ''}
                           errorText={this.state.headerErr || ''}

                />

                <EditBody ref={(el) => {
                    this.reactQuillRef = el
                }}
                />
                <TextField key="previewkey"
                           hintText="В конце этого поста добавиться ссылка на весь материал (который указывается в поле выше)"
                           multiLine={true}
                           fullWidth={true}
                           style={{display: this.state.need_link ? 'block' : 'none'}}
                           onChange={this._handleTextFieldPreviewChange.bind()}
                           value={this.state.preview || ''}
                           rows={2}
                           rowsMax={6}
                />
                <div style={{
                    display: 'flex', justifyContent: 'space-around',
                    alignItems: 'baseline'
                }} className="bottom-add-space">
                    <div style={style.flexDivStyle}>
                        <div className="datesInputs">
                            {this.state.daysRender.map((d) => d)}
                        </div>
                        {/*<FloatingActionButton mini={true} style={style.btnAdd}*/}
                                              {/*onClick={this.addPeriod}*/}
                        {/*>*/}
                            {/*<ContentAdd />*/}
                        {/*</FloatingActionButton>*/}


                    </div>

                    <TextField
                        key="minuteskey"
                        hintText="Время прочтения поста (мин.) "
                        onChange={this._handleTextFieldMinutesToReadChange.bind()}
                        value={this.state.minutesToRead}
                        underlineStyle={styles.underlineStyle}
                        className="time-to-read"
                    />

                    <Toggle
                        label="Превью и ссылка на пост"
                        defaultToggled={false}
                        toggled={this.state.need_link}
                        onToggle={this.handleChange}
                        labelPosition="right"
                        style={{marginLeft: 20, maxWidth: '300px', fontSize: '16px'}}
                        className="preview-link"
                    />
                </div>
                <RaisedButton label="Save" onClick={this.saveData.bind(this)} rippleStyle={{
                    color: this.props.muiTheme.palette.primary1Color,
                    backgroundColor: this.props.muiTheme.palette.canvasColor
                }}
                              fullWidth={true}
                    // overlayStyle={{marginBottom: 10}}
                              style={{
                                  backgroundColor: this.props.muiTheme.palette.canvasColor,
                                  color: colors.white,
                                  marginBottom: 10
                              }}
                              primary={true} icon={<SaveBtn/>}
                              className="add-post-timer"
                />



            </div>;

        return output;
    }

}


function mapStateToProps(state) {
    return {
        tasks: state.tasksReducer.tasks,
        channels: state.channelReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPostsForChannel: bindActionCreators(actions.getPostsForChannel, dispatch)
    }
}


const withMui = muiThemeable()(AddPage);

export default connect(mapStateToProps, mapDispatchToProps)(withMui)


