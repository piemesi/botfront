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

class MaterialsList extends Component {


    focusRelevantItem=(item)=>{
        console.log(item)
        this.props.setFocusedItem(item)
        console.log(item)
    }

    render() {
        return (<div>

            <List
                //style={{paddingLeft:'20px'}}
                 >
                <Subheader>Today</Subheader>
                <Divider inset={false}/>

                {this.props.materials.map((m) => {

                    let text =  striptags(m.text)
                    let textSubstr = text.substr(0, 50)
                    let per = null
                    if(m.periods[0]){
                        new Date(m.periods[0].start)

                        let options = {
                            // month: 'long',
                            // day: 'numeric',
                            // year: 'numeric',
                            hour: 'numeric',
                            minute:'numeric'
                        };
                    }


                    let label = per ? per.toLocaleString("ru", options) : ""

                    return <div><ListItem
                        onTouchTap={()=>this.focusRelevantItem(m.id)}
                        //style={{paddingLeft:'24px'}}
                        // leftAvatar={<Avatar src="images/ok-128.jpg" />}
                      //  nestedListStyle={{paddingLeft:'22px'}}
                        leftAvatar={
                            <Avatar
                                color={pinkA200} backgroundColor={transparent}
                                style={{left: 8, fontSize:'20px'}}
                            >
                                {label}
                            </Avatar>
                        }

                        primaryText={m.title}
                        secondaryText={textSubstr}
                        secondaryTextLines={2}
                    />
                        <Divider inset={true}/></div>
                })}


                <ListItem
                    // leftAvatar={<Avatar src="images/kolage-128.jpg" />}
                    leftAvatar={
                        <Avatar
                            color={pinkA200} backgroundColor={transparent}
                            style={{left: 8, fontSize:'20px'}}
                        >
                            {"19:00"}
                        </Avatar>}
                    primaryText={
                        <p>Summer BBQ&nbsp;&nbsp;<span style={{color: lightBlack}}>4</span></p>
                    }
                    secondaryText={
                        <p>
                            <span style={{color: darkBlack}}>to me, Scott, Jennifer</span> --
                            Wish I could come, but I&apos;m out of town this weekend.
                        </p>
                    }
                    secondaryTextLines={2}
                />
                <Divider inset={false}/>
                <Subheader>Tomorrow</Subheader>
                <Divider inset={false}/>
                <ListItem
                    leftAvatar={
                        <Avatar
                            color={pinkA200} backgroundColor={transparent}
                            style={{left: 8, fontSize:'20px'}}
                        >
                            {"20:00"}
                        </Avatar>}
                    primaryText="Oui oui"
                    secondaryText={
                        <p>
                            <span style={{color: darkBlack}}>Grace Ng</span> --
                            Do you have Paris recommendations? Have you ever been?
                        </p>
                    }
                    secondaryTextLines={2}
                />
                <Divider inset={true}/>
                <ListItem
                    leftAvatar={
                        <Avatar
                            color={pinkA200} backgroundColor={transparent}
                            style={{left: 8, fontSize:'20px'}}
                        >
                            {"20:00"}
                        </Avatar>}
                    primaryText="Birdthday gift"
                    secondaryText={
                        <p>
                            <span style={{color: darkBlack}}>Kerem Suer</span> --
                            Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                        </p>
                    }
                    secondaryTextLines={2}
                />
                <Divider inset={true}/>
                <ListItem
                    leftAvatar={
                        <Avatar
                            color={pinkA200} backgroundColor={transparent}
                            style={{left: 8, fontSize:'20px'}}
                        >
                            {"20:00"}
                        </Avatar>}
                    primaryText="Recipe to try"
                    secondaryText={
                        <p>
                            <span style={{color: darkBlack}}>Raquel Parrado</span> --
                            We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                    }
                    secondaryTextLines={2}
                />
                <Divider inset={false}/>
                <Subheader>Четверг</Subheader>
                <Divider inset={false}/>
                <ListItem
                    leftAvatar={
                        <Avatar
                            color={pinkA200} backgroundColor={transparent}
                            style={{left: 8, fontSize:'20px'}}
                        >
                            {"20:00"}
                        </Avatar>}
                    primaryText="Oui oui"
                    secondaryText={
                        <p>
                            <span style={{color: darkBlack}}>Grace Ng</span> --
                            Do you have Paris recommendations? Have you ever been?
                        </p>
                    }
                    secondaryTextLines={2}
                />
                <Divider inset={true}/>
                <ListItem
                    leftAvatar={
                        <Avatar
                            color={pinkA200} backgroundColor={transparent}
                            style={{left: 8, fontSize:'20px'}}
                        >
                            {"20:00"}
                        </Avatar>}
                    primaryText="Birdthday gift"
                    secondaryText={
                        <p>
                            <span style={{color: darkBlack}}>Kerem Suer</span> --
                            Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                        </p>
                    }
                    secondaryTextLines={2}
                />
                <Divider inset={true}/>
                <ListItem
                    leftAvatar={
                        <Avatar
                            color={pinkA200} backgroundColor={transparent}
                            style={{left: 8, fontSize:'20px'}}
                        >
                            {"20:00"}
                        </Avatar>}
                    primaryText="Recipe to try"
                    secondaryText={
                        <p>
                            <span style={{color: darkBlack}}>Raquel Parrado</span> --
                            We should eat this: grated squash. Corn and tomatillo tacos.
                        </p>
                    }
                    secondaryTextLines={2}
                />
            </List>


        </div>)
    }

}


function mapStateToProps(state) {
    return {
        tasks: state.tasksReducer.tasks,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        setFocusedItem: bindActionCreators(actions.setFocusedItem, dispatch)
    }
}


const withMui = muiThemeable()(MaterialsList);

export default connect(mapStateToProps, mapDispatchToProps)(withMui)