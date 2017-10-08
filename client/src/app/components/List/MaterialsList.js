import React, {Component} from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionClose from 'material-ui/svg-icons/navigation/close';

 import {pinkA200, transparent} from 'material-ui/styles/colors';

//REDUX
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'

import striptags from 'striptags'

import muiThemeable from 'material-ui/styles/muiThemeable';

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={grey400}/>
    </IconButton>
);

const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
    </IconMenu>
);
import moment from 'moment';
moment.locale('ru');
import * as funcs from '../../mainFunc';

import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import ReadIcon from "material-ui/svg-icons/action/chrome-reader-mode";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from "material-ui/FontIcon";


const renderStyles={
  dateStyle:{
      fontSize:12
  },
    dateStyle14:{
        fontSize:14
    }
};

const INDEX_DAY_TODAY = 0;
const INDEX_DAY_PAST = 1;
const INDEX_DAY_THIS_WEEK = 2;
const INDEX_DAY_NEXT_WEEK = 3;
const INDEX_DAY_LATER = 4;

class MaterialsList extends Component {


    constructor(props) {
        super(props);

        this.renderPeriods = [[], [], [], [], []];
        this.periodTitle = [<span style={{color:'green', fontWeight:'bold'}} >Сегодня</span>,
            <span style={{color:'red', fontWeight:'bold'}} >Ранее не отправленные</span>,
            <span style={{  fontWeight:'bold'}} >На этой недели</span>,
            <span style={{  fontWeight:'bold'}} >На следующей недели</span>,
            <span style={{  fontWeight:'bold'}} >Позже</span>];
        this.subjectsIcons = {mathematics: '1+1', math: '1+1'};

        this.state = {datas: [], open: false,previewBodyText:'',anchorEl:null, searchElementId:null};
    }


    renderPosts = () => {

        this.props.materials.map((d) => {
            // let {cover, subject, color, name, description, start_date, date_complete} = d;
            let {order_time,title,id} = d;


            let text =  striptags(d.text);
            let subtitle = text.substr(0, 50);
            let moreText = text.substr(0, 500);
            let o = {
                title,
                when: '',
                subtitle,
                id,
                moreText
            };



            if (!order_time) {
                // дата не указана - прочие
                o = {...o, when: ''};
                this.renderPeriods[INDEX_DAY_LATER].push(o);
            }  else if (funcs.checkToday(order_time)) {
                // today
                o = {...o, when: (<div  style={renderStyles.dateStyle14}>{moment(order_time).format("DD MMM")}<br/><span style={renderStyles.dateStyle}>{moment(order_time).format("HH:mm")}</span></div>)};
                this.renderPeriods[INDEX_DAY_TODAY].push(o);
            } else if (funcs.checkDayIsPassed(order_time)) {
                // Вчера и ранее (почему-то не отправленные)
                o = {...o, when: moment(order_time).format("HH:mm")};
                this.renderPeriods[INDEX_DAY_PAST].push(o);
            } else if (funcs.checkThisWeek(order_time)) {
                // текущая неделя
                if (funcs.checkTomorrow(order_time)) {
                    o = {...o, when: (<div style={renderStyles.dateStyle14}>Завтра<br/><span style={renderStyles.dateStyle}>{moment(order_time).format("HH:mm")}</span></div>)};
                    this.renderPeriods[INDEX_DAY_THIS_WEEK].push(o);
                } else {
                    o = {...o, when: (<div>{moment(order_time).format("DD MMM")}<br/><span style={renderStyles.dateStyle}>{moment(order_time).format("HH:mm")}</span></div>)};
                    this.renderPeriods[INDEX_DAY_THIS_WEEK].push(o);
                }

            } else if (funcs.checkNextWeek(order_time)) {
                // следующая неделя
                if (funcs.checkTomorrow(order_time)) {
                    o = {...o, when: (<div style={renderStyles.dateStyle14}>Завтра<br/><span style={renderStyles.dateStyle}>{moment(order_time).format("HH:mm")}</span></div>)};
                    this.renderPeriods[INDEX_DAY_NEXT_WEEK].push(o);
                } else {
                    o = {...o, when: (<div>{moment(order_time).format("dd")}<br/><span style={renderStyles.dateStyle}>{moment(order_time).format("HH:mm")}</span></div>)};
                    this.renderPeriods[INDEX_DAY_NEXT_WEEK].push(o);
                }

            } else {
                // прочие
                o = {...o, when: (<div  style={renderStyles.dateStyle14}>{moment(order_time).format("DD MMM")}<br/><span style={renderStyles.dateStyle}>{moment(order_time).format("HH:mm")}</span></div>)};
                this.renderPeriods[INDEX_DAY_LATER].push(o);
            }
        });


        let datas = [];
        this.renderPeriods.map((items, index) => {
            if (items.length) {
                datas.push({
                    mainItem: this.periodTitle[index], items
                });
            }
        });

        this.setState({datas});
    };

    componentWillMount() {
console.log('mmm',this.props.materials)
            this.renderPosts();
    }


    handleTouchTap = (event,itemId,moreText) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
            previewBodyText:moreText,
            searchElementId:itemId
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };


    focusRelevantItem=(item)=>{

        this.setState({
            open: false,
        });
        // this.props.getPostsForChannel(this.props.channelId, 0);
        this.props.setFocusedItem(item);

    };


    render() {

        return (<div>
            <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}
                animation={PopoverAnimationVertical}
                style={{ width:'200px'}} //marginLeft:'-80px',
            >

                <Toolbar>
                    <ToolbarGroup  >

                        <IconButton onClick={()=>this.focusRelevantItem(this.state.searchElementId)} tooltip="Найти в списке">
                            <ActionSearch color={this.props.muiTheme.palette.primary1Color}  />
                        </IconButton>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <IconButton onClick={this.handleRequestClose} tooltip="Закрыть">
                            <ActionClose color={grey400} />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
                <div style={{padding:'15px 5px'}}>
                    {this.state.previewBodyText}
                </div>
            </Popover>

            {this.props.focused ? <Toolbar>

                <ToolbarGroup>
                    <IconButton onClick={()=>this.focusRelevantItem(0)} tooltip="показать все материалы">
                        <ActionClose color={grey400} />
                    </IconButton>
                </ToolbarGroup>
            </Toolbar> : ''}
            {
                this.state.datas.map((i, rIndex) => {
                    console.log('iii',i)
                    let items = [];
                    i.items.map((item, index) => {




                        let devider = (index === i.items.length - 1) ? '' : <Divider inset={true}/>

                        items.push(<div key={"items"+ i.id+'_'+index}>
                            <ListItem key={"litem"+i.id+'_'+index}
                                      leftAvatar={<Avatar
                                          color={pinkA200} backgroundColor={transparent}
                                          style={{left: 8, fontSize:'20px'}}
                                      >
                                          {item.when}
                                      </Avatar>}

                                      // innerDivStyle={{cursor:'initial'}}



                                      primaryText={item.title}
                                      // onTouchTap={() => this.focusRelevantItem(item.id)}
                                      onTouchTap={(e)=>this.handleTouchTap(e,item.id,item.moreText)}
                                      secondaryText={
                                          <p>{item.subtitle } </p>
                                          // <a href="" style={{color:'rgba(0,0,0,0.55'}} onClick={(e)=>this.handleTouchTap(e,item.id,item.moreText)}>
                                      }
                                      secondaryTextLines={2}
                            />
                            {devider}
                        </div>);
                    });

                    console.log('items',items, "item"+ rIndex)
                    return (<div key={"item"+ rIndex}  >
                            <List>

                                <Subheader className="mob" style={{
                                    marginTop: '5px',
                                    fontFamily: 'Geometria Medium',
                                    fontSize: '16px'
                                }}>{i.mainItem}</Subheader>

                                {items}
                            </List>
                            <Divider />
                        </div>
                    )
                })
            }













        </div>)
    }

}


function mapStateToProps(state) {
    return {
        tasks: state.tasksReducer.tasks,
        focused: state.tasksReducer.focused,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        setFocusedItem: bindActionCreators(actions.setFocusedItem, dispatch),
        // getPostsForChannel: bindActionCreators(actions.getPostsForChannel, dispatch)
    }
}


const withMui = muiThemeable()(MaterialsList);

export default connect(mapStateToProps, mapDispatchToProps)(withMui)