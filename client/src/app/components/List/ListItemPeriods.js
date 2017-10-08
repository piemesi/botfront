import React from 'react';
import Chip from 'material-ui/Chip';
import {blue300} from 'material-ui/styles/colors';

/**
 * An example of rendering multiple Chips from an array of values. Deleting a chip removes it from the array.
 * Note that since no `onTouchTap` property is defined, the Chip can be focused, but does not gain depth
 * while clicked or touched.
 */
export default class ListItemPeriods extends React.Component {

    constructor(props) {
        super(props);



        // this.state = {chipData: [
        //     {key: 0, label: '28-7-2016'},
        //     {key: 1, label: '28-7-2017'},
        //     {key: 2, label: '29-7-2017'},
        //     {key: 3, label: '30-7-2017'},
        // ]};


        let chipData = []
        if(this.props.chipData) {
            this.props.chipData.map((p, item) => {
                let per = new Date(p.start)

                let options = {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute:'numeric'
                };

                let label = per.toLocaleString("ru", options)

                chipData.push({key: p.id, label, sent: p.sent || null})
            })
        }

        this.state = {chipData};


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

    handleRequestDelete = (key) => {
        if (key === 3) {
            alert('Why would you want to delete React?! :)');
            return;
        }

        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.setState({chipData: this.chipData});
    };

    renderChip(data) {
        return (
            <Chip
                backgroundColor={data.sent ? blue300 : null}
                key={data.key}
                // onRequestDelete={() => this.handleRequestDelete(data.key)}
                style={this.styles.chip}
            >
                {data.label}
            </Chip>
        );
    }

    render() {
        return (
            <div style={this.styles.wrapper}>
                {this.state.chipData.map(this.renderChip, this)}
            </div>
        );
    }
}