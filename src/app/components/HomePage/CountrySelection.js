import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus';
import DirectionsBoat from 'material-ui/svg-icons/maps/directions-boat';
import DirectionsWalk from 'material-ui/svg-icons/maps/directions-walk';
import DirectionsCar from 'material-ui/svg-icons/maps/directions-car';
import DirectionsBike from 'material-ui/svg-icons/maps/directions-bike';
import LoaclaFlorist from 'material-ui/svg-icons/maps/local-florist';

// import IconButton from 'material-ui/lib/icon-button';

import {Icon_Flag_DE, Icon_Flag_AU, Icon_Flag_BG, Icon_Flag_FR, Icon_Flag_RU, Icon_Flag_US} from 'material-ui-country-flags';

  import './flag_icons.less';
// import 'flag-icon-css';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        margin:"5px 0"
    },
};

function handleRequestDelete() {
    alert('You clicked the delete button.');
}



class CountrySelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chipData: [
                {label: 'Испания', valueKey: '1', icon : 'es'},
                {label: 'Россия', valueKey: '2', icon : 'ru'},// <Icon_Flag_RU />
                {label: 'Тайланд', valueKey: '3', icon : 'th'},//<LoaclaFlorist />},
                {label: 'Греция', valueKey: '4', icon : 'gr'},//<DirectionsBus />
                {label: 'Австрия', valueKey: '5', icon : 'at'},
                {label: 'Германия', valueKey: '6', icon : 'de'},
                {label: 'Великобритания', valueKey: '7', icon :'gb'},
                {label: 'Италия', valueKey: '8', icon : 'it'},
                {label: 'Чехия', valueKey: '9', icon : 'cz'},
                {label: 'Португалия', valueKey: '10', icon :'pt'},
                {label: 'Кипр', valueKey: '11', icon : 'cy'},
                {label: 'Египет', valueKey: '12', icon : 'eg'},
                {label: 'Турция', valueKey: '13', icon : 'tr'},
                {label: 'США', valueKey: '14', icon : 'us'},
                {label: 'Япония', valueKey: '15', icon : 'jp'},
                {label: 'Венгрия', valueKey: '16', icon : 'hu'},
                {label: 'Франция', valueKey: '17', icon : 'fr'},
                {label: 'Нидерланды', valueKey: '18', icon : 'nl'},
                {label: 'Китай', valueKey: '19', icon :'cn'},
            ],
            open: false
        };
        this.styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }

    handleRequestDelete = (valueKey) => {

        if (confirm('CONFIRM_DELETE_TOUR_TYPE?')) {
            return;
        }

        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip.valueKey).indexOf(valueKey);
        this.chipData.splice(chipToDelete, 1);
        this.setState({chipData: this.chipData});
    };

    handleTouchTap = () => {
        alert('You clicked the Chip.');
    };

    renderChip(data) {
        return (
            <Chip
                key={data.valueKey}
                onRequestDelete={() => this.handleRequestDelete(data.valueKey)}
                onTouchTap={this.handleTouchTap}
                style={styles.chip}
                // backgroundColor={blue300}
            >
                <Avatar color="#fff" backgroundColor={blue300}    ><span className={"flag-icon flag-icon-"+data.icon}></span></Avatar>
                {data.label}
            </Chip>
        );
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleTouchTapDelete = () => {
        this.setState({
            open: true,
            // tourTypeToDelete: dataKey
        });
    };

    render() {
        const standardActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleRequestClose}
            />,


        ];

        return (
            <div style={styles.wrapper}>


                <Dialog
                    open={this.state.open}
                    title="CONFIRM_DELETE_TOUR_TYPE?"
                    actions={standardActions}
                    onRequestClose={this.handleRequestClose}
                >
                    1-2-3-4-5
                </Dialog>

                {this.state.chipData.map(this.renderChip, this)}


            </div>
        );
    }
}

export default CountrySelection;
