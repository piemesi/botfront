import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import  * as colors  from 'material-ui/styles/colors';

import {Link} from 'react-router-dom';

const styles = {
    uploadButton: {
        verticalAlign: 'middle',
        border: '1px solid', borderRadius: '3px', marginTop: '35px',
        borderColor: colors.white,
        marginBottom: '27px',
        paddingBottom: '36px'
    }
}

export default class EmailPageBtn extends Component {

    render() {
        return (
            <Link to="/mobile/6"><FlatButton
                fullWidth={true}

                label="Войти по e-mail или по телефону"
                labelPosition="before"
                labelStyle={{color: colors.white, textTransform: 'initial'}}
                style={styles.uploadButton}

                containerElement="label"
            /></Link>
        );
    }
}