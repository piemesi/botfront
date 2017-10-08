import React from 'react';
import Snackbar from 'material-ui/Snackbar';


import muiThemeable from 'material-ui/styles/muiThemeable';
import {
    Redirect
} from 'react-router-dom';
//REDUX
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'
import PropTypes from 'prop-types';
import * as funcs from '../../mainFunc';

class SnackbarChoosenChannelInfo extends React.Component {

    constructor(props) {
        super(props);
        let {current, list, companyId} = this.props.channels;
        let choosenChannel = _.find(list, {id: parseInt(current)});
        this.state = {
            autoHideDuration: this.props.autoHideDuration || null,
            msg: "Не выбран канал!",
            actionTxt: 'Выбрать',
            open: true,
        };


    }


    componentWillMount() {
        let {current, list, companyId} = this.props.channels;
        let choosenChannel = _.find(list, {id: parseInt(current)});
        this.state = {
            autoHideDuration: this.props.autoHideDuration || null,
            msg: current ? <span>Канал <span
                style={{color: 'green', fontWeight: 'bold'}}>{choosenChannel ? choosenChannel.title : "..." }</span>. <a
                href={`/channel/${companyId}/0`}
                style={{color: 'white', fontStyle: 'italic'}}>другой?</a></span> : "Не выбран канал!",
            actionTxt: current ? <span style={{color: 'green', fontWeight: 'bold'}}>Ok</span> : 'Выбрать',
            open: true,
        };
        if (choosenChannel) {

            this.setState({
                msg: current ? <span>Канал <span
                    style={{color: 'green', fontWeight: 'bold'}}>{choosenChannel.title || "..." }</span>. <a
                    href={`/channel/${companyId}/0`}
                    style={{color: 'white', fontStyle: 'italic'}}>другой?</a></span> : "Не выбран канал!",
                actionTxt: current ? <span style={{color: 'green', fontWeight: 'bold'}}>Ok</span> : 'Выбрать',

            })
        } else {

            if (!companyId) {
                let data = funcs.getCookedSession();
                if (!data) {
                    let {from} = this.props.location.state || {from: {pathname: '/'}};
                    return <Redirect to={from}/>;
                } else {
                    this.props.setCurrentCompany(data.companyId);

                    this.props.getChannels(data.companyId).then(r => {
                        let {list} = this.props.channels;
                        let choosenChannel = _.find(list, {id: parseInt(current)});
                        if (choosenChannel) {
                            this.setState({
                                msg: current ? <span>Канал <span
                                    style={{color: 'green', fontWeight: 'bold'}}>{choosenChannel.title || "..." }</span>. <a
                                    href={`/channel/${companyId}/0`}
                                    style={{
                                        color: 'white',
                                        fontStyle: 'italic'
                                    }}>другой?</a></span> : "Не выбран канал!",
                                actionTxt: current ?
                                    <span style={{color: 'green', fontWeight: 'bold'}}>Ok</span> : 'Выбрать',

                            })
                        }
                    });

                }
            }

        }
    }


    handleActionTouchTap = () => {
        this.setState({
            open: false,
        });

        let {current, companyId} = this.props.channels;

        if (!current) {
            window.location.href = `/channel/${companyId}/0`;
        }

        // alert('Event removed from your calendar.');
    };


    handleRequestClose = () => {
        if (this.props.noClose) {
            return false;
        }

        this.setState({
            open: false,
        });
    };

    render() {

        let output = <Snackbar
            open={this.state.open}
            message={this.state.msg}
            action={this.state.actionTxt}
            autoHideDuration={this.state.autoHideDuration}
            onActionTouchTap={this.handleActionTouchTap}
            onRequestClose={this.handleRequestClose}
        />;

        return output;
    }
}

SnackbarChoosenChannelInfo.PropTypes = {
    noClose: PropTypes.bool.isRequired,

};

SnackbarChoosenChannelInfo.defaultProps = {
    noClose: true
};

function mapStateToProps(state) {
    return {
        channels: state.channelReducer,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentCompany: bindActionCreators(actions.setCurrentCompany, dispatch),
        setCurrentChannel: bindActionCreators(actions.setCurrentChannel, dispatch),
        getChannels: bindActionCreators(actions.getChannels, dispatch),
    }
}


const withMui = muiThemeable()(SnackbarChoosenChannelInfo);

export default connect(mapStateToProps, mapDispatchToProps)(withMui);

