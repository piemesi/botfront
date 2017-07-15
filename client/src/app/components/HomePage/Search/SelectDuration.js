import React from 'react';
// let NumberPicker = require('react-widgets/lib/NumberPicker')
import NumberPicker from "react-number-picker";
// import "react-number-picker/dist/style.css"


class SelectDuration extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value0: 7,
            value1: 10
        }
    }


    handleChange(name, val) {
        console.log("new value", val);
        this.setState({
            ['value' + name]: val
        })
    }

    render() {
        return (
            <div>
                <NumberPicker
                    value={this.state.value0}
                    onChange={this.handleChange.bind(this,0)}

                    digits={2}
                />
                <NumberPicker
                    value={this.state.value1}

                    digits={2}
                    onChange={this.handleChange.bind(this,1)}
                    />
            </div>
        )
    }
}

export default SelectDuration;