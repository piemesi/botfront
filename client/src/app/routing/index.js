import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as colors from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';


const muiTheme = getMuiTheme({
    fontFamily: 'Geometria',
    palette: {
        accent1Color: colors.purple500,// colors.cyan500,//deepOrange500,
        primary1Color: '#00bfa5', //cyan500, //"#E6E6FA",
        primary2Color: colors.cyan700,
        primary3Color: colors.grey400,
        // accent1Color: pinkA200,
        accent2Color: colors.grey100,
        alertColor: '#ccc',
        // accent3Color: colors.grey500,
        textColor: colors.darkBlack,
        // alternateTextColor: colors.white,
        canvasColor: colors.white,// colors.amber500, //"#E6E6FA", //
        borderColor: colors.grey300,
        disabledColor: fade(colors.darkBlack, 0.3),
        pickerHeaderColor: colors.cyan500,
        clockCircleColor: fade(colors.darkBlack, 0.07),
        shadowColor: colors.fullBlack,
    },
});


import './routing.scss'
const Public = () => <h3>Посадочная страница</h3>
const Protected = (props) => {


    let menu = <ul style={styles.nav}>
        <NavLink to="/add/100/40">Add</NavLink>
        <NavLink to="/list/100/35">List</NavLink>
        <NavLink to="/calendar/100/30">Calendar</NavLink>
        <NavLink to="/channel/100/25">Channels</NavLink>
    </ul>

    let contentStyle = styles.content

    if (location.pathname.indexOf('show') !== -1) {
        menu = <header style={styles.navInside}>UTS Company channel</header>
        contentStyle = styles.contentInside

    }


    return <div style={styles.fill}>

        {menu}


        <div style={contentStyle}>
            <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >

                <Route
                    location={location}
                    key={location.key}
                    path="/:h/:s/:l"
                    component={HSL}
                />
            </CSSTransitionGroup>
        </div>
    </div>
};

const fakeAuth = {
    isAuthenticated: localStorage.getItem('bmt_token') || false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        localStorage.removeItem('bmt_token')
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

import AuthButton from '../components/InfoPage';

import AuthStep from '../Auth/index';
class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            redirectToReferrer: false
        }
    }


    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({redirectToReferrer: true})
        })
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}}
        const {redirectToReferrer} = this.state

        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }

        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="page-wrap"
                         >
                        {/*<p>You must log in to view the page at {from.pathname}</p>*/}
                        {/*<button onClick={this.login}>Log in</button>*/}
                        <Paper zDepth={3} rounded={true} style={{margin:'20px 0px', padding:'20px 20px 30px'}} >
                        <div className="telegram-logos"  >
                            <img src="/images/telegram_man.jpg" />
                            <img  src="/images/telegram_girl.png" />
                        </div>
                        <AuthStep />
                        </Paper>



                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/', //login
                state: {from: props.location}
            }}/>
        )
    )}/>






)

const AnimationExample = () => {


    return (<Router>
        <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>

            <AuthButton/>
            {/*<ul style={{display: 'block', backgroundColor: '#fd9'}}>*/}
                {/*<li><Link to="/public">Public Page</Link></li>*/}
                {/*<li><Link to="/protected">Protected Page</Link></li>*/}
            {/*</ul>*/}
            <Route path="/show/:s/:l" component={Protected}/>
            {/*<Route path="/login" component={LoginPage}/>*/}
            <Route exact={true} path="/" component={LoginPage}/>
            <PrivateRoute path="/add/:s/:l" component={Protected}/>
            <PrivateRoute path="/calendar/:s/:l" component={Protected}/>
            <PrivateRoute path="/channel/:s/:l" component={Protected}/>
            <PrivateRoute path="/protected" component={Protected}/>
            <PrivateRoute path="/list/:s/:l" component={Protected}/>

        </div>
        </MuiThemeProvider>
    </Router>)
}


const NavLink = (props) => (
    <li style={styles.navItem}>
        <Link {...props} style={{color: 'inherit'}}/>
    </li>
)



import Paper from 'material-ui/Paper';




import Page from './renderPage';

const HSL = ({match: {params}}) => {


    return <div style={{
        ...styles.fill,
        ...styles.hsl,
        // background: `hsl(${params.s}, ${params.s}%, ${params.l}%)`
    }}>


        <Page page={params.h} channelId={params.s} postHash={params.l}/>

    </div>
}


const styles = {}

styles.fill = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
}

styles.content = {
    ...styles.fill,
    top: '40px',
    textAlign: 'center',
    backgroundColor: muiTheme.palette.accent2Color
}
styles.contentInside = {
    ...styles.content,
    top: '50px',

}
styles.nav = {
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: 0,
    height: '40px',
    width: '100%',
    display: 'flex',
    backgroundColor: muiTheme.palette.primary1Color,
    color: colors.white
}
styles.navInside = {
    ...styles.nav,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    position: 'fixed',
    zIndex: 100,
    height: '50px'
}
styles.navItem = {
    textAlign: 'center',
    flex: 1,
    listStyleType: 'none',
    padding: '10px'
}

styles.hsl = {
    ...styles.fill,
    // color: 'white',
    // paddingTop: '20px',
    fontSize: '30px'
}

export default AnimationExample