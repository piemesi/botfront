// import React from 'react';
// import Auth from '../../modules/Auth';
// import Dashboard from '../../components/Auth/Dashboard';
//
//
// class DashboardPage extends React.Component {
//
//     /**
//      * Class constructor.
//      */
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             secretData: ''
//         };
//     }
//
//     /**
//      * This method will be executed after initial rendering.
//      */
//     componentDidMount() {
//         const xhr = new XMLHttpRequest();
//         xhr.open('get', '/api/dashboard');
//         xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//         // set the authorization HTTP header
//         xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
//         xhr.responseType = 'json';
//         xhr.addEventListener('load', () => {
//             if (xhr.status === 200) {
//                 this.setState({
//                     secretData: xhr.response.message
//                 });
//             }
//         });
//         xhr.send();
//     }
//
//     /**
//      * Render the component.
//      */
//     render() {
//         return (<Dashboard secretData={this.state.secretData}/>);
//     }
//
// }
//
// export default DashboardPage;

import React from 'react';

// import injectTapEventPlugin from 'react-tap-event-plugin';


import MyRoutes from '../../routing/index'


import {Provider} from 'react-redux'
import myStore from '../../store/index'
window.store = myStore;


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();


// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
const AuthUserEntryPoint = <Provider store={myStore}>
    <MyRoutes />
</Provider>

export default AuthUserEntryPoint
