import React, {Component} from 'react';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconDone from 'material-ui/svg-icons/action/done';
import IconList from 'material-ui/svg-icons/action/list';
import IconToSend from 'material-ui/svg-icons/content/send';


//REDUX
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class BottomMenu extends Component {
    state = {
        selectedIndex: 0,
    };

    select = (index) => {
        this.props.getPostsForChannel(this.props.channel.current, index);
        this.setState({selectedIndex: index});
    };

    render() {
        return (
            <Paper zDepth={1}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem key={0}
                        label="Список материалов"
                        icon={<IconList />}
                        onTouchTap={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        label="Отправленные" key={1}
                        icon={<IconDone />}
                        onTouchTap={() => this.select(1)}
                    />
                    <BottomNavigationItem key={2}
                                          label="Запланированные"
                                          icon={<IconToSend />}
                                          onTouchTap={() => this.select(2)}
                    />
                </BottomNavigation>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    return {
        // tasks: state.tasksReducer.tasks,
        channel: state.channelReducer,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPostsForChannel: bindActionCreators(actions.getPostsForChannel, dispatch)
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(BottomMenu)