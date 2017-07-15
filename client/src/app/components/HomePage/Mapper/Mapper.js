import React from 'react';
import GoogleMapReact from 'google-map-react';
import Griddle, {plugins} from 'griddle-react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {showMap} from '../../../actions'

import PropTypes from 'prop-types'


import AnimakitExpander from 'animakit-expander';


const state = [{
    "guid": "146aff73-984e-42a8-954c-536e9dcbd27c",
    "name": "Wooten Richards",
    "company": "VALPREAL",
    "email": "wootenrichards@valpreal.com",
    "registered": "2016-08-23T09:28:46 +04:00",
    "latitude": 25.51231,
    "longitude": -110.878208
}, {
    "guid": "146aff73-984e-42a8-954c-536e9dcbd27b",
    "name": "Wooten Richards1",
    "company": "SOME",
    "email": "wootenrichards@valpreal.com",
    "registered": "2016-08-23T09:28:46 +04:00",
    "latitude": 25.51231,
    "longitude": -110.878208
},
    {
        "guid": "146aff73-984e-42a8-954c-536e9dcbd27a",
        "name": "Wooten Richards2",
        "company": "WHATSA",
        "email": "wootenrichards@valpreal.com",
        "registered": "2016-08-23T09:28:46 +04:00",
        "latitude": 25.51231,
        "longitude": -110.878208
    },
    {
        "guid": "146aff73-984e-42a8-954c-536e9dcbd27e",
        "name": "Houston",
        "company": "Хьюстон",
        "email": "sss@valpreal.com",
        "registered": "2016-08-23T09:28:46 +04:00",
        "latitude": 30.51231,
        "longitude": -96.878208
    }];

const fakeData = state;

const TableBody = connect((state, props) => ({
    visibleData: plugins.LocalPlugin.selectors.visibleDataSelector(state)
}))(({rowIds, Row, visibleData}) => (
    <GoogleMapReact
        defaultCenter={{lat: 42.28, lng: -83.74}}
        defaultZoom={4}
    >
        { visibleData && visibleData.toJSON().map(r =>
            <Row key={r.name} griddleKey={r.name} lat={r.latitude} lng={r.longitude} {...r} />)
        }
    </GoogleMapReact>
));


const CustomTableComponent = OriginalComponent => class CustomTableComponent extends React.Component {
    static contextTypes = {
        components: PropTypes, //React.PropTypes.object
    };

    render() {
        return (
            <div style={{height: 800, width: 800}}>
                <this.context.components.TableBody />
            </div>
        );
    }
};

class MarkerBlip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showInfo: false};
    }

    onMouseEnter = () => {
        this.setState({showInfo: true});
    };

    onMouseLeave = () => {
        this.setState({showInfo: false})
    };

    render() {
        return (
            <div>
                <div
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    style={{
                        borderRadius: 50,
                        backgroundColor: "#512DA8",
                        width: 25,
                        height: 25,
                    }}
                />
                { this.state.showInfo &&
                <div
                    style={{
                        backgroundColor: "#EDEDED",
                        border: "1px solid #777",
                        width: 150,
                        height: 70,
                        padding: 10,
                        position: 'relative',
                        zIndex: 9999
                    }}
                >
                    <h4 style={{margin: 0}}>{this.props.name}</h4>
                    <small>{this.props.company}</small>
                </div>
                }
            </div>
        )
    }
}

class Mapper extends React.Component {


    render() {
        return (
            <div>

                <AnimakitExpander expanded={this.props.map.show} align="bottom">
                    <Griddle
                        data={fakeData}
                        plugings={[plugins.LocalPlugin]}
                        pageProperties={{
                            pageSize: 50000
                        }}
                        components={{
                            TableContainer: CustomTableComponent,
                            TableBody,
                            Row: MarkerBlip,
                        }}
                    />
                </AnimakitExpander>
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        map: state.mapReducer
    }
}


const mapDispatchToProps = (dispatch) => {
    return {

        showMap: bindActionCreators(showMap, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Mapper)
