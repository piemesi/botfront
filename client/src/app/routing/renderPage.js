import React, {Component} from 'react';
import Paper from 'material-ui/Paper';


//REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

const titles = {
    add: 'Добавить материал',
    list: 'Список материалов',//'Список материалов',
    calendar: 'Календарь',
    channel: 'Каналы',
};


import PropTypes from 'prop-types';
import * as funcs from '../mainFunc';
import * as colors from 'material-ui/styles/colors';
import ChoosenSnackbar from '../components/Channel/choosenChannelInfo';


import AddPage from '../components/Add'
import ListPage from '../components/List'
import ChannelPage from '../components/Channel'


import ShowPage from '../components/ShowPage'
class RenderPage extends Component {


    constructor(props) {
        super(props);

        let rP = {
            add: <AddPage />,
            list: <ListPage />,
            channel: <ChannelPage postHash={this.props.postHash}/>,
            show: <ShowPage postHash={this.props.postHash}/>
        };

        this.state = {...this.state, renderPage: rP, currentChannel: null};
    }

    ComponentWillMount(){
        let currentChannel = funcs.getCookedChannelId();

        if (currentChannel) {
            this.setState({currentChannel});
            this.props.setCurrentChannel(currentChannel);
        }
    }



    render() {


        return (
            <div style={{overflow: "auto", height: "100%", display: 'flex', justifyContent: 'center'}}>

                <div className="page-wrap"
                     style={{width: "100%", maxWidth: '800px'}}>
                    <h2 style={{fontSize: '30px', color: 'rgb(0, 188, 212)'}}>{titles[this.props.page] || ''}</h2>
                    {this.props.page === 'add' || this.props.page === 'channel' ? (
                        <Paper style={{padding: "20px"}} zDepth={2}>
                            {this.state.renderPage[this.props.page] || this.state.renderPage['add']}
                        </Paper>) : this.state.renderPage[this.props.page] ||
                        <p style={{fontSize: '18px', color: colors.grey600}}>Ограниченный доступ. Доступно владельцам подписки</p>}


                </div>

                {this.props.page !== 'show' ? <ChoosenSnackbar /> : ''}
            </div>

        )
    }


}


RenderPage.PropTypes = {
    page: PropTypes.string,
    channelId: PropTypes.number,
    postHash: PropTypes.string.isRequired,
};

RenderPage.defaultProps = {
    postHash: ''
};

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
        setCurrentChannel: bindActionCreators(actions.setCurrentChannel, dispatch),
        getCurrentChannel: bindActionCreators(actions.getCurrentChannel, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderPage)