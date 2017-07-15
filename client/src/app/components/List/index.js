import React, {Component} from 'react';

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
        let promis = this.props.getPostsForChannel(this.props.channelId);

        setTimeout(() => {
            console.log('data', this.props.tasks)

            this.setState({
                tasksList:this.props.tasks
            })

        }, 550)




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

          listItems = this.props.upd ? this.props.tasks : listItems
        console.log('PROPS focused', this.props.focused )

        console.log('PROPS upd', this.props.upd )


        return (
            <div style={{textAlign:'left'}}>
                 <AppBar
                    style={{backgroundColor:this.props.muiTheme.palette.primary3Color}}
                    onLeftIconButtonTouchTap={this.handleDrawerToggle}
                    title="Полный список статей"
                />
                <Drawer width={300} openSecondary={true} open={this.state.open} >
                    <MaterialsList materials={this.state.tasksList} />
                </Drawer>
                {listItems.map((m) => {

                    // let arr =
                  console.log('PROPS focused2', this.props.focused)


                    return  <ListItem  material={m}/>
                })}


                <ListFooter />

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        tasks: state.tasksReducer.tasks,
        upd: state.tasksReducer.upd || null,
        focused: state.tasksReducer.focused || null,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPostsForChannel: bindActionCreators(actions.getPostsForChannel, dispatch)
    }
}

const withMui = muiThemeable()(Materials);
export default connect(mapStateToProps, mapDispatchToProps)(withMui)