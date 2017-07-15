
// import React from 'react';
// import ReactDom from 'react-dom';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {
//     BrowserRouter as Router
//
// } from 'react-router-dom'
// import routes from './routes.js';
//
// // remove tap delay, essential for MaterialUI to work properly
// injectTapEventPlugin();
//
// ReactDom.render((
//     <MuiThemeProvider muiTheme={getMuiTheme()}>
//         <Router  routes={routes} />
//     </MuiThemeProvider>), document.getElementById('app'));
//
//
// // history={browserHistory}





//Usage
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; //, Route
import Route from './AuthRoute';

import Login from './Login';
import Private from './Private';

export default () =>
    <Router>
        <div>
            <Route component={ Login } path="/login" />
            <Route component={ Private } path="/private" />
        </div>
    </Router>;