import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'


const AnimationExample = () => {


    let menu = <ul style={styles.nav}>
        <NavLink to="/add/100/40">Add</NavLink>
        <NavLink to="/list/100/35">List</NavLink>
        <NavLink to="/calendar/100/30">Calendar</NavLink>
        <NavLink to="/channel/100/25">Channels</NavLink>
    </ul>

    let contentStyle = styles.content

    if (location.pathname.indexOf('show') !== -1) {
        menu =            <header style={styles.navInside}>UTS Company channel</header>
        contentStyle = styles.contentInside

    }



    return (<Router>
        <Route render={({location, match}) => (
            <div style={styles.fill}>
                {/*<Route exact path="*" render={() => (*/}
                {/*<Redirect to="/add/90/50"/>*/}
                {/*)}/>*/}
                {/*{console.log('MATCHES', match)}*/}
                {/*{console.log('location', location)}*/}
                {menu}


                <div style={contentStyle}>
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >
                        {/* no different than other usage of
                         CSSTransitionGroup, just make
                         sure to pass `location` to `Route`
                         so it can match the old location
                         as it animates out
                         */}
                        <Route
                            location={location}
                            key={location.key}
                            path="/:h/:s/:l"
                            component={HSL}
                        />
                    </CSSTransitionGroup>
                </div>
            </div>
        )}/>
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


const muiTheme = getMuiTheme({
    // palette: {
    //     accent1Color: deepOrange500,
    //     textColor: cyan500,
    //
    // },
    palette: {
        // accent1Color: colors.deepOrange500,
        // primary1Color: colors.purple500, //cyan500,
        // primary2Color: colors.cyan700,
        // primary3Color: colors.grey400,
        // // accent1Color: pinkA200,
        // accent2Color: colors.grey100,
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

class Page extends Component {


    constructor(props) {
        super(props)


        let rP = {
            'add': <AddPage />,
            'list': <ListPage channelId={1}/>,
            show: <ShowPage postHash={this.props.postHash} />
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
            <div style={{ overflow: "auto",  height: "100%"}}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="page-wrap" style={{width: "100%", fontFamily: "'Roboto', sans-serif"}}>
                        {/*{this.renderPage()}*/}

                        {this.state.renderPage[this.props.page] || this.state.renderPage['add']}

                    </div>

                </MuiThemeProvider>
            </div>

        )
    }


}


const titles = {
    add: 'Добавить материал',
    list: '',//'Список материалов',
    calendar: 'Календарь',
    channel: 'Каналы',
}

const HSL = ({match: {params}}) => {


    return <div style={{
        ...styles.fill,
        ...styles.hsl,
        // background: `hsl(${params.s}, ${params.s}%, ${params.l}%)`
    }}>


        {titles[params.h]}

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
    justifyContent:'center',
    alignItems:'center',
    fontSize: '20px',
    position: 'fixed',
    zIndex:100,
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