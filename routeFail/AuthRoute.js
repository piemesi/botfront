import React from 'react';
import { Redirect, Route } from 'react-router-dom';

//Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
const isAuthenticated = () => true;

const PRIVATE_ROOT = '/private';
const PUBLIC_ROOT = '/login';
console.log('333')
const AuthRoute = ({component, ...props}) => {

    console.log('333')

    const { isPrivate } = component;
    if (isAuthenticated()) {
        console.log('User is Authenticated')
        //User is Authenticated
        if (isPrivate === true) {
            //If the route is private the user may proceed.
            return <Route { ...props } component={ component } />;
        }
        else {
            //If the route is public, the user is redirected to the app's private root.
            return <Redirect to={ PRIVATE_ROOT } />;
        }
    }
    else {
        console.log('User is not Authenticated')
        //User is not Authenticated
        if (isPrivate === true) {
            //If the route is private the user is redirected to the app's public root.
            return <Redirect to={ PUBLIC_ROOT } />;
        }
        else {
            //If the route is public, the user may proceed.
            return <Route { ...props } component={ component } />;
        }
    }
};

// AuthRoute.propTypes = {
//     component: React.PropTypes.oneOfType([
//         React.PropTypes.element,
//         React.PropTypes.func
//     ])
// };

export default AuthRoute;