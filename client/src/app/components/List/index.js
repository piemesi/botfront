import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';

import muiThemeable from 'material-ui/styles/muiThemeable';

//REDUX
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'


import MaterialsList from './MaterialsList'
import ListItem from './ListItem'
import ListFooter from './ListFooter'
import ContentSend from 'material-ui/svg-icons/content/send';

import ChoosenSnackbar from '../Channel/choosenChannelInfo';
import AppBar from 'material-ui/AppBar';

import _ from 'lodash';

class Materials extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            tasksList: [],
            open: false
        };
    }

    handleDrawerToggle = () => this.setState({open: !this.state.open});

    componentWillMount() {
        if (this.props.channels.current) {
            let promis = this.props.getPostsForChannel(this.props.channels.current);

            promis.then(() => {


                this.setState({
                    tasksList: this.props.tasks
                })

            })
        }


    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    handleToggle = (event, toggle) => {
        this.setState({expanded: toggle});
    };

    handleExpand = () => {
        this.setState({expanded: true});
    };

    handleReduce = () => {
        this.setState({expanded: false});
    };

    render() {

        let listItems = this.props.focused ? [this.state.tasksList[this.props.focused]] : this.state.tasksList

        listItems = this.props.upd ? this.props.tasks : listItems;

        // let listItems1 =_.orderBy(listItems, ['sent'], ['desc']);
        let toSendlistItems =_.filter(listItems, {sent:null});
        toSendlistItems =_.orderBy(toSendlistItems, ['order_time'], ['asc']);

        let listItemsSent = _.filter(listItems, (i)=>{ return i.sent!==null});
        listItemsSent =_.orderBy(listItemsSent, ['order_time'], ['desc']);
        // _.remove(listItemsSent, {sent:null});

        let page = this.props.channels.current ? (<div><AppBar
            style={{backgroundColor: this.props.muiTheme.palette.primary3Color}}
            onLeftIconButtonTouchTap={this.handleDrawerToggle}
            title="Полный список статей"
        /><Drawer width={300} openSecondary={true} open={this.state.open}>
            <MaterialsList materials={this.state.tasksList}/>
        </Drawer>
            {toSendlistItems.map((m) => {





            return <ListItem  key={m.id} material={m}/>
        }) }
            {listItemsSent.map((m) => {





                return <ListItem key={m.id} material={m}/>
            }) } <ListFooter /></div> ) : <Paper style={{
            fontSize: '25px',
            lineHeight: '30px',
            padding: '50px',
            color: this.props.muiTheme.palette.alertColor
        }}><span>Для отображения списка постов - выберите канал</span></Paper>;

        return (
            <div style={{textAlign: 'left'}}>


                {page}

                <ChoosenSnackbar noClose={true}/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        tasks: state.tasksReducer.tasks,
        upd: state.tasksReducer.upd || null,
        focused: state.tasksReducer.focused || null,
        channels: state.channelReducer,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPostsForChannel: bindActionCreators(actions.getPostsForChannel, dispatch)
    }
}

const withMui = muiThemeable()(Materials);
export default connect(mapStateToProps, mapDispatchToProps)(withMui)