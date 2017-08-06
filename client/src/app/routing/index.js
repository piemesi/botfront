import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

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
}

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

const AuthButton = withRouter(({history}) => (
    fakeAuth.isAuthenticated ? (
        <p>
            Welcome!<br/>
            <button onClick={() => {
                fakeAuth.signout(() => history.push('/'))
            }}>Sign out
            </button>
            <br/>
            <Link onlyActiveOnIndex={true} to="/add/1/2">Перейти к управлению аккаунтом
            </Link>
        </p>
    ) : (
        <div><h2>Сервис управления каналами Telegram </h2>
            <p style={{color:colors.grey600}}>Для владельцев каналов и SMM-менеджеров</p>
            <span><em>Публичный доступ: осень 2017</em></span></div>
    )
))


class LoginPage extends React.Component {
    state = {
        redirectToReferrer: false
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
                <p>You must log in to view the page at {from.pathname}</p>
                {/*<button onClick={this.login}>Log in</button>*/}
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
                pathname: '/login',
                state: {from: props.location}
            }}/>
        )
    )}/>






)

const AnimationExample = () => {


    return (<Router>

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
            <AuthButton/>
            <ul style={{display: 'none', backgroundColor: '#fd9'}}>
                <li><Link to="/public">Public Page</Link></li>
                <li><Link to="/protected">Protected Page</Link></li>
            </ul>
            <Route path="/show/:s/:l" component={Protected}/>
            <Route path="/login" component={LoginPage}/>
            <PrivateRoute path="/add/:s/:l" component={Protected}/>
            <PrivateRoute path="/calendar/:s/:l" component={Protected}/>
            <PrivateRoute path="/channel/:s/:l" component={Protected}/>
            <PrivateRoute path="/protected" component={Protected}/>
            <PrivateRoute path="/list/:s/:l" component={Protected}/>

        </div>
    </Router>)
}


const NavLink = (props) => (
    <li style={styles.navItem}>
        <Link {...props} style={{color: 'inherit'}}/>
    </li>
)


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as colors from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import './routing.scss'


import AddPage from '../components/Add'
import ListPage from '../components/List'
import ChannelPage from '../components/Channel'

const muiTheme = getMuiTheme({

    palette: {
        // accent1Color: colors.deepOrange500,
        // primary1Color: colors.purple500, //cyan500,
        // primary2Color: colors.cyan700,
        // primary3Color: colors.grey400,
        // // accent1Color: pinkA200,
        // accent2Color: colors.grey100,
        alertColor: '#ccc',
        // accent3Color: colors.grey500,
        // textColor: colors.darkBlack,
        // alternateTextColor: colors.white,
        // canvasColor: colors.amber500,
        // borderColor: colors.grey300,
        // disabledColor: fade(colors.darkBlack, 0.3),
        // pickerHeaderColor: colors.cyan500,
        // clockCircleColor: fade(colors.darkBlack, 0.07),
        // shadowColor: colors.fullBlack,
    },
});


import ShowPage from '../components/ShowPage'
import Paper from 'material-ui/Paper';
class Page extends Component {


    constructor(props) {
        super(props)


        let rP = {
            'add': <AddPage />,
            'list': <ListPage />,
            channel: <ChannelPage companyId={1} postHash={this.props.postHash} />,
            show: <ShowPage postHash={this.props.postHash}/>
        };


        this.state = {...this.state, renderPage: rP}


    }


    renderPage() {
        this.setState({
            currentPage: this.props.page
        })

    }


    render() {


        return (
            <div style={{overflow: "auto", height: "100%", display: 'flex', justifyContent: 'center'}}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="page-wrap"
                         style={{width: "100%", maxWidth: '800px', fontFamily: "'Roboto', sans-serif"}}>
                        <h2 style={{fontSize: '30px', color: 'rgb(0, 188, 212)'}}>{titles[this.props.page] || ''}</h2>
                        {this.props.page === 'add' || this.props.page === 'channel' ? (
                            <Paper style={{padding: "20px"}} zDepth={2}>
                                {this.state.renderPage[this.props.page] || this.state.renderPage['add']}
                            </Paper>) : this.state.renderPage[this.props.page] || <p style={{fontSize:'18px', color:colors.grey600}}>Доступно владельцам подписки</p>}


                    </div>

                </MuiThemeProvider>
            </div>

        )
    }


}


const titles = {
    add: 'Добавить материал',
    list: 'Список материалов',//'Список материалов',
    calendar: 'Календарь',
    channel: 'Каналы',
}

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