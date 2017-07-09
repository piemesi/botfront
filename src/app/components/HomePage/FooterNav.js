import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import './font.less';
import FontAwesome from 'react-fontawesome';
import {grey300} from 'material-ui/styles/colors';

import ChoosenItems from 'material-ui/svg-icons/av/playlist-add-check';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';



// REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showMap } from '../../actions'
import { addNewUser, selectNewOffer } from '../../actions'


const favoritesIcon = <FontIcon className="material-icons"><FontAwesome name='telegram'/></FontIcon>;
const nearbyIcon = <IconLocationOn />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class FooterNav extends Component {
    state = {
        selectedIndex: -1,
    };

    select = (index) => this.setState({selectedIndex: index});

    render() {

        const recentsIcon = <FontIcon className="material-icons"><Badge
        badgeContent={this.props.offers.selected}
        secondary={false}
        primary={true}
        badgeStyle={{top: -12, left: 34}}
        style={{padding:'0px'}}
    >
        <IconButton style={{height:'0px', padding:'0px'}} tooltip="Текущий аккаунт позволяет выбрать до 10-ти предложений к сравнению">
            <ChoosenItems  />
        </IconButton>
    </Badge>
    </FontIcon>;


        return (
            <Paper zDepth={1}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Сравнить выбранные"
                        icon={recentsIcon}
                        onTouchTap={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        label="Отправить cообщение"
                        icon={favoritesIcon}
                        onTouchTap={() => this.select(1)}
                    />
                    <BottomNavigationItem
                        label={"Nearby"}
                        icon={<FontAwesome onClick={this.props.showMap} spin="" size='2x' style={{ cursor:"pointer", color:grey300}} name='globe' />}
                        onTouchTap={() => this.select(2)}
                    />
                </BottomNavigation>
            </Paper>
        );
    }
}




const mapStateToProps = (state) => {
    return {
        offers: state.offersReducer
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        // addNewUser: bindActionCreators(addNewUser, dispatch),
        // newMessage: bindActionCreators(newMessage, dispatch),
        showMap: bindActionCreators(showMap, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FooterNav)

//
//
// export default FooterNav;