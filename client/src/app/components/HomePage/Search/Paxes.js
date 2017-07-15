import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import {blue300, grey300, green500, indigo900} from 'material-ui/styles/colors';


import Group from 'material-ui/svg-icons/social/group';
import Person from 'material-ui/svg-icons/social/person';
import PeopleOutline from 'material-ui/svg-icons/social/people-outline';
import People from 'material-ui/svg-icons/social/people';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';

import Child from 'material-ui/svg-icons/social/school';

import '../font.less';
import FontAwesome from 'react-fontawesome';
import Subheader from 'material-ui/Subheader';

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        // marginBottom: 5,
        maxWidth:20,
    },
};


const labels = {
    sngl: "Один",
    dbl: "Вдвоем",
    child: "С детьми"
}

class Paxes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            label: "Вдвоем",
            val: "dbl"
        }
    }


    handlerChange(event,element) {
        console.log('radio', element);
        this.setState({
            val: element,
            label: labels[element]

        })
    }

    render() {
        return (<div>
            <Subheader> {this.state.label} </Subheader>
            <RadioButtonGroup style={{
                display: "flex",
                flexDirection: "row",
                flexShrink: "0",
                // width: "300px",
                alignItems: "center",
                justifyContent: "flex-start",
            }}
                              valueSelected={this.state.val}
                              onChange={this.handlerChange.bind(this)}
                              name="shipSpeed"
                              defaultSelected="not_light">


                <RadioButton
                    value="sngl"
                    label=""
                    checkedIcon={<Person  />}
                    uncheckedIcon={<PersonOutline  />}
                    style={styles.radioButton}
                />
                <RadioButton
                    value="dbl"
                    label=""
                    checkedIcon={<People    />}
                    uncheckedIcon={<PeopleOutline  />}
                    style={styles.radioButton}
                />
                <RadioButton
                    value="child"
                    label=""
                    style={styles.radioButton}
                    checkedIcon={<Child  />}
                    uncheckedIcon={<Child color={grey300}/>}
                />
            </RadioButtonGroup>

        </div>)
    }


}

export default Paxes;