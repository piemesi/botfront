import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';


// import createBrowserHistory from 'history/lib/createBrowserHistory';


// import {
//     BrowserRouter as Router,
//     Route,
//     Link
// } from 'react-router-dom'


import Routers  from './routing/router'


import {
    BrowserRouter,
    Route,
    Link,
    Redirect
} from 'react-router-dom';


import {Router, browserHistory} from 'react-router'
import MyRoutes from './routing/index'


import {Provider} from 'react-redux'
import myStore from './store/index'
window.store = myStore;


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

{/**/
}
{/*<BrowserRouter  routes={Routers} />,*/
}

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(
    <Provider store={myStore}>
        <MyRoutes />
    </Provider>,


    document.getElementById('app')
);
//<Router history={browserHistory} routes={Routes} />
