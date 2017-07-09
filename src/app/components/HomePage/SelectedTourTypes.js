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

function handleTouchTap() {
    alert('You clicked the Chip.');
}

class SelectedTourTypes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chipData: [
                {label: 'Bus', valueKey: '1', icon : <DirectionsBus />},
                {label: 'Bicycle', valueKey: '2', icon : <DirectionsBike />},
                {label: 'Ethno', valueKey: '3', icon : <LoaclaFlorist />},
                {label: 'Excursions', valueKey: '4', icon : <DirectionsBus />},
                {label: 'Rafting', valueKey: '5', icon : <DirectionsBoat />},
                {label: 'Camping', valueKey: '6', icon : <DirectionsWalk />},
                {label: 'Horse riding', valueKey: '7', icon : <DirectionsBus />},
                {label: 'Mountain tour', valueKey: '8', icon : <DirectionsBus />},
                {label: 'Skiing', valueKey: '9', icon : <DirectionsBus />},
                {label: 'Healthy', valueKey: '10', icon : <DirectionsBus />},
                {label: 'City walking tour', valueKey: '11', icon : <DirectionsBus />},
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


    renderChip(data) {
        return (
            <Chip
                key={data.valueKey}
                onRequestDelete={() => this.handleRequestDelete(data.valueKey)}
                onTouchTap={handleTouchTap()}
                style={styles.chip}
                // backgroundColor={blue300}
            >
                <Avatar color="#fff" backgroundColor={blue300} icon={data.icon}/>
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

export default SelectedTourTypes;
