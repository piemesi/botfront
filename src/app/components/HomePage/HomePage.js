import React, {Component} from 'react';

// import SelectedTourTypes from './SelectedTourTypes';
import RegionsTabs from './RegionsTabs';

import CountrySelection from './CountrySelection';

import InstantSearch from './InstantSearch';
import Mapper from './Mapper/Mapper';


// REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNewUser, getHashOffers } from '../../actions'

const hashOffers = [];



const contentStyle = {
    resultsDiv: {
        float: "left", maxWidth: "1000px"
    }
};

 class HomePage extends Component {

    constructor(props){
        super(props)

        this.props.getHashOffers();
    }


    render() {

        console.log('HOME_OFFERS',this.props.offers);

        return (


                <div className="workspace">
                    <div style={contentStyle.resultsDiv} className="searchDiv">
                        <Mapper />
                        <CountrySelection />
                        {/*<SelectedTourTypes />*/}
                        <RegionsTabs hashOffers={hashOffers} />
                    </div>
                    <div className="instantSearch">
                        <InstantSearch />
                    </div>
                </div>

        );

    }

}

const mapStateToProps = (state) => {
    return {
        offers: state.offersReducer
    }
};



const mapDispatchToProps = (dispatch) => {
    return {

         getHashOffers: bindActionCreators(getHashOffers, dispatch),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)