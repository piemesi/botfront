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

    getPostForCh=(current)=>{
        if (current) {
            let promis = this.props.getPostsForChannel(current);
            promis.then(() => {
                this.setState({
                    tasksList: this.props.tasks
                })

            })
        }
    };

    componentWillMount() {
        if (this.props.channels.current) {
            this.getPostForCh(this.props.channels.current);
        }else {
            // let current = funcs.getCookedChannelId();
            // console.log('CCCCCCC',current)
            // if(current){
            //     this.props.getCurrentChannel(current).
            //     then(r=>{
            //         this.getPostForCh(this.props.channels.current);
            //     })
            //
            //     //this.getPostForCh(current);
            // }
            this.getPostForCh(1);
        }


    }

    closeDrawer = ()=>{
        this.setState({open:false})
    };



    render() {

        let listItems = this.props.focused ? _.filter(this.state.tasksList, {id: this.props.focused}) : this.state.tasksList //[this.state.tasksList[this.props.focused]]
        console.log('listItems', listItems,this.state.tasksList)
        listItems = this.props.upd ? this.props.tasks : listItems;

        // let listItems1 =_.orderBy(listItems, ['sent'], ['desc']);
        let toSendlistItems = _.filter(listItems, {sent: null});
        toSendlistItems = _.orderBy(toSendlistItems, ['order_time'], ['asc']);


        let listItemsSent = _.filter(listItems, (i) => {
            console.log(i, listItems)
            return i.sent !== null
        });
        listItemsSent = _.orderBy(listItemsSent, ['order_time'], ['desc']);
        // _.remove(listItemsSent, {sent:null});


        console.log('this.props.channels.current',this.props.channels.current)
        console.log('this.state.tasksList',this.state.tasksList)

        let page = this.props.channels.current ? (<div><AppBar
            style={{backgroundColor: this.props.muiTheme.palette.primary3Color}}
            onLeftIconButtonTouchTap={this.handleDrawerToggle}
            title="Полный список статей"
        /><Drawer width={300} openSecondary={true} open={this.state.open}>
            {this.state.tasksList.length ? <MaterialsList channelId={this.props.channels.current} materials={toSendlistItems}/> : ''}
            {/*//this.state.tasksList*/}
        </Drawer>
            <ListFooter />
            {toSendlistItems.map((m) => {


                return <ListItem  closeDrawer={()=>this.closeDrawer()} key={m.id} material={m}/>
            }) }
            {listItemsSent.map((m) => {


                return <ListItem isSent={true} closeDrawer={()=>this.closeDrawer()}  key={m.id} material={m}/>
            }) } </div> ) : <Paper style={{
            fontSize: '25px',
            lineHeight: '30px',
            padding: '50px',
            color: this.props.muiTheme.palette.alertColor
        }}><span>Для отображения списка постов - выберите канал</span></Paper>;

        return (
            <div style={{textAlign: 'left'}}>


                {page}


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
        getPostsForChannel: bindActionCreators(actions.getPostsForChannel, dispatch),
    }
}

const withMui = muiThemeable()(Materials);
export default connect(mapStateToProps, mapDispatchToProps)(withMui)