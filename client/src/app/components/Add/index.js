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




import _ from 'lodash'





import IconButton from 'material-ui/IconButton';
import DateTimePicker from '../../containers/Pages/DateTimeSelect'


import ContentRemove from 'material-ui/svg-icons/content/remove';

import {Tabs, Tab} from 'material-ui/Tabs';
import Material from './AddMaterial';
import ImageMaterial from './AddImageMaterial';
import GalleryMaterial from './AddGalleryMaterial';
import FlatButton from "material-ui/FlatButton";

import Dialog from "material-ui/Dialog";
import MaterialPreview from  './preview/material.js'
const styles = {
    headline: {
        fontSize: 16,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    tabHead:{
        fontSize: 11,
        fontWeight:0,
    },
    slide: {
        padding: 10,
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
            minutesToRead: 0,
            need_link: false,
            isPending: false,

            open: false,
            exampleBody:''

        };


    }



    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };



    examplePreview=(e, tab)=>{
        e.preventDefault();

        let body= [
            {text:<MaterialPreview/>, title:"Пример создания и отображения стандартного поста без картинок"},
            {text: <div>22</div>, title:""},
            {text: <div>33</div>, title:""}
        ] ;

        this.setState({
            exampleBody:body[tab].text,
            exampleTitle:body[tab].title,
        });
        this.handleOpen();
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    render() {

        const actions = [
            <FlatButton
                label="Ок"
                primary={true}
                onClick={this.handleClose}
            />,

        ];

        return (
            <div> <Dialog
                title={this.state.exampleTitle}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                {this.state.exampleBody}
            </Dialog>
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
            >



                <Tab buttonStyle={styles.tabHead} key="a" label="Стандартный пост" value="a">
                    <div>
                        <h2 style={styles.headline}>Стандартный пост</h2>
                        <p>
                            Обычное пост в Telegram c возможностью указания ссылки на материал (постоянная страница на BotMe.Top). <br/>

                            <strong>Характеристики:</strong>
                            <ul>
                                <li>Возможность отправки только поста</li>
                                <li>Возможность отправки поста с прикреплением ссылки на постоянный материал</li>
                                <li>Возможность указания времени прочтения</li>
                                <li>Выбор даты поста</li>
                                <li>Без картинок</li>
                            </ul>
                            <a href="" onClick={(e)=>this.examplePreview(e, 0)}>Пример</a>
                        </p>


                        <Material />
                    </div>
                </Tab>
                <Tab buttonStyle={styles.tabHead} key="b" label="Пост с картинкой и подписью" value="b">
                    <div>
                        <h2 style={styles.headline}>Ограниченный доступ</h2>

                        {/*<ImageMaterial />*/}
                    </div>
                </Tab>
                <Tab buttonStyle={styles.tabHead} key="c" label="Пост с галереей" value="c">
                <div>
                    <h2 style={styles.headline}>Ограниченный доступ</h2>

                    {/*<GalleryMaterial />*/}
                </div>
            </Tab>
                <Tab buttonStyle={styles.tabHead} key="d" label="Пост с голосованием" value="d">
                    <div>
                        <h2 style={styles.headline}>Ограниченный доступ</h2>

                        {/*<VoteMaterial />*/}
                    </div>
                </Tab>
            </Tabs>
            </div>
        );
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


